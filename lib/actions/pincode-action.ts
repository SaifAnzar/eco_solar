"use server";

import { calculateSolarQuote, SolarCalculationResult } from "../solar-engine";
import { getSolarConfig } from "../data-store";
import { fetchPincodeDetails, mapDistrictToDiscom, PincodeDetails } from "../pincode";

export interface PincodeLookupResponse {
  success: boolean;
  pincode: string;
  locationLabel: string;
  district?: string;
  state?: string;
  postOfficeName?: string;
  discom: string;
  discomCode?: string;
  latitude: number;
  longitude: number;
  peakSunHours: number;
  calculation: SolarCalculationResult;
  message: string;
  isFallback?: boolean;
}

/**
 * Server action to verify pincode dynamically via India Post API
 * and calculate solar quote & ROI metrics. Wraps execution in try/catch
 * to guarantee no unhandled Server Action rejections occur on production VPS.
 */
export async function lookupPincodeAndCalculate(
  pincodeInput: string,
  monthlyBillAmount: number,
  directKwInput?: number,
  isResidential = true,
  manualDistrict?: string,
  manualDiscom?: string
): Promise<PincodeLookupResponse> {
  const cleanPincode = (pincodeInput || "751024").trim();

  try {
    // Validate pincode format (6 digits)
    if (!/^\d{6}$/.test(cleanPincode)) {
      const fallbackDiscomInfo = manualDistrict
        ? mapDistrictToDiscom(manualDistrict, "Odisha")
        : { discom: manualDiscom || "TPCODL (Central Odisha)", discomCode: "TPCODL" as const };

      return {
        success: false,
        pincode: cleanPincode,
        locationLabel: manualDistrict ? `${manualDistrict}, Odisha` : "Invalid Pincode",
        district: manualDistrict || "",
        state: "Odisha",
        discom: fallbackDiscomInfo.discom,
        discomCode: fallbackDiscomInfo.discomCode,
        latitude: 20.3548,
        longitude: 85.8173,
        peakSunHours: 4.5,
        calculation: calculateSolarQuote(3, 4.5, isResidential),
        message: "Please enter a valid 6-digit Indian pincode (e.g. 751024).",
        isFallback: true,
      };
    }

    // Fetch real-time postal details dynamically from India Post API
    const details: PincodeDetails = await fetchPincodeDetails(cleanPincode);

    let district = details.district;
    let state = details.state;
    let discom = details.discom;
    let isOdisha = details.isOdisha;

    // Fallback for manual overrides if India Post API record is missing or failed
    if (!details.success && manualDistrict) {
      district = manualDistrict;
      state = "Odisha";
      const mapped = mapDistrictToDiscom(manualDistrict, "Odisha");
      discom = manualDiscom || mapped.discom;
      isOdisha = true;
    }

    const locationLabel = details.success
      ? `${details.postOfficeName ? details.postOfficeName + ", " : ""}${district}, ${state}`
      : manualDistrict
      ? `${manualDistrict}, Odisha`
      : `Pincode ${cleanPincode}`;

    const peakSunHours = isOdisha ? 4.6 : 4.5;

    // Load admin-configurable solar parameters
    const solarConfig = getSolarConfig();

    // Calculate target system capacity (kW)
    let targetKw = directKwInput || 3;
    if (!directKwInput && monthlyBillAmount > 0) {
      const monthlyUnits = monthlyBillAmount / (solarConfig.gridTariffRate || 7.0);
      const estimatedKw = monthlyUnits / 120;
      targetKw = Math.max(1, Math.min(100, Math.round(estimatedKw)));
    }

    // Execute calculation engine
    const calculation = calculateSolarQuote(targetKw, peakSunHours, isResidential, {
      panelWp: solarConfig.panelWp,
      panelUnitRate: solarConfig.panelUnitRate,
      roofAreaPerKw: solarConfig.roofAreaPerKw,
      residentialBenchmarkRate: solarConfig.residentialBenchmarkRate,
      commercialBenchmarkRate: solarConfig.commercialBenchmarkRate,
      gridTariffRate: solarConfig.gridTariffRate,
      performanceRatio: solarConfig.performanceRatio,
      subsidyTier1Kw: solarConfig.subsidyTier1Kw,
      subsidyTier1Amount: solarConfig.subsidyTier1Amount,
      subsidyTier2Kw: solarConfig.subsidyTier2Kw,
      subsidyTier2Amount: solarConfig.subsidyTier2Amount,
      subsidyTier3PlusAmount: solarConfig.subsidyTier3PlusAmount,
      stateSubsidyTier1Kw: solarConfig.stateSubsidyTier1Kw,
      stateSubsidyTier1Amount: solarConfig.stateSubsidyTier1Amount,
      stateSubsidyTier2Kw: solarConfig.stateSubsidyTier2Kw,
      stateSubsidyTier2Amount: solarConfig.stateSubsidyTier2Amount,
      stateSubsidyTier3PlusAmount: solarConfig.stateSubsidyTier3PlusAmount,
      equipmentBands: solarConfig.equipmentBands,
    });

    return {
      success: details.success || Boolean(manualDistrict),
      pincode: cleanPincode,
      locationLabel,
      district,
      state,
      postOfficeName: details.postOfficeName,
      discom: discom || "TPCODL (Central Odisha)",
      discomCode: details.discomCode,
      latitude: 20.2961,
      longitude: 85.8245,
      peakSunHours,
      calculation,
      message: details.success
        ? `Real-time location verified for ${locationLabel} under ${discom}.`
        : details.error || "Pincode verification error.",
      isFallback: !details.success,
    };
  } catch (err: any) {
    console.error("[Pincode Action Server Error]:", err);
    
    // Safe fallback calculation to guarantee Server Action never throws on VPS
    const fallbackDiscomInfo = mapDistrictToDiscom(manualDistrict || "Khordha", "Odisha");
    const peakSunHours = 4.6;
    const targetKw = directKwInput || Math.max(1, Math.min(100, Math.round((monthlyBillAmount || 3500) / 7.0 / 120)));
    const calculation = calculateSolarQuote(targetKw, peakSunHours, isResidential);

    return {
      success: false,
      pincode: cleanPincode,
      locationLabel: manualDistrict ? `${manualDistrict}, Odisha` : "Bhubaneswar, Odisha",
      district: manualDistrict || "Khordha",
      state: "Odisha",
      discom: fallbackDiscomInfo.discom,
      discomCode: fallbackDiscomInfo.discomCode,
      latitude: 20.3548,
      longitude: 85.8173,
      peakSunHours,
      calculation,
      message: "Using fallback solar calculation mode.",
      isFallback: true,
    };
  }
}
