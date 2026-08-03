"use server";

import { calculateSolarQuote, SolarCalculationResult } from "../solar-engine";

export interface PincodeSolarMasterRecord {
  pincode: string;
  area: string;
  district: string;
  state: string;
  discom: string;
  latitude: number;
  longitude: number;
  peakSunHours: number;
}

// Odisha Pincode Irradiance Master Database
const PINCODE_SOLAR_MASTER: Record<string, PincodeSolarMasterRecord> = {
  "751024": {
    pincode: "751024",
    area: "Patia / Kalarahanga / KIIT",
    district: "Khordha (Bhubaneswar)",
    state: "Odisha",
    discom: "TPCODL (Central Discom)",
    latitude: 20.3548,
    longitude: 85.8173,
    peakSunHours: 4.6,
  },
  "751001": {
    pincode: "751001",
    area: "Master Canteen / Unit-4",
    district: "Khordha (Bhubaneswar)",
    state: "Odisha",
    discom: "TPCODL (Central Discom)",
    latitude: 20.2667,
    longitude: 85.8333,
    peakSunHours: 4.5,
  },
  "751010": {
    pincode: "751010",
    area: "Chandrasekharpur / Infocity",
    district: "Khordha (Bhubaneswar)",
    state: "Odisha",
    discom: "TPCODL (Central Discom)",
    latitude: 20.3242,
    longitude: 85.8189,
    peakSunHours: 4.6,
  },
  "753001": {
    pincode: "753001",
    area: "Choudhury Bazar / Buxi Bazar",
    district: "Cuttack",
    state: "Odisha",
    discom: "TPCODL (Central Discom)",
    latitude: 20.4625,
    longitude: 85.8828,
    peakSunHours: 4.5,
  },
  "752001": {
    pincode: "752001",
    area: "Grand Road / Sea Beach",
    district: "Puri",
    state: "Odisha",
    discom: "TPCODL (Central Discom)",
    latitude: 19.8135,
    longitude: 85.8312,
    peakSunHours: 4.7,
  },
  "768001": {
    pincode: "768001",
    area: "VSS Marg / Budharaja",
    district: "Sambalpur",
    state: "Odisha",
    discom: "TPWODL (Western Discom)",
    latitude: 21.4669,
    longitude: 83.9812,
    peakSunHours: 4.8,
  },
  "769001": {
    pincode: "769001",
    area: "Civil Township / Sector 5",
    district: "Sundargarh (Rourkela)",
    state: "Odisha",
    discom: "TPWODL (Western Discom)",
    latitude: 22.2604,
    longitude: 84.8536,
    peakSunHours: 4.6,
  },
  "760001": {
    pincode: "760001",
    area: "Gandhi Nagar / Courtpeta",
    district: "Ganjam (Berhampur)",
    state: "Odisha",
    discom: "TPSODL (Southern Discom)",
    latitude: 19.315,
    longitude: 84.7941,
    peakSunHours: 4.7,
  },
  "756001": {
    pincode: "756001",
    area: "FM Circle / Motiganj",
    district: "Balasore",
    state: "Odisha",
    discom: "TPNODL (Northern Discom)",
    latitude: 21.4934,
    longitude: 86.9135,
    peakSunHours: 4.5,
  },
};

export interface PincodeLookupResponse {
  success: boolean;
  pincode: string;
  locationLabel: string;
  discom: string;
  latitude: number;
  longitude: number;
  peakSunHours: number;
  calculation: SolarCalculationResult;
  message: string;
}

export async function lookupPincodeAndCalculate(
  pincodeInput: string,
  monthlyBillAmount: number,
  directKwInput?: number,
  isResidential = true
): Promise<PincodeLookupResponse> {
  const cleanPincode = (pincodeInput || "751024").trim();

  // Validate pincode format (6 digits)
  if (!/^\d{6}$/.test(cleanPincode)) {
    return {
      success: false,
      pincode: cleanPincode,
      locationLabel: "Invalid Pincode",
      discom: "TPCODL (Central Discom)",
      latitude: 20.3548,
      longitude: 85.8173,
      peakSunHours: 4.5,
      calculation: calculateSolarQuote(3, 4.5, isResidential),
      message: "Please enter a valid 6-digit Indian pincode (e.g. 751024).",
    };
  }

  // Lookup record from master or generate fallback for Odisha pincodes (75x, 76x, 77x)
  let record = PINCODE_SOLAR_MASTER[cleanPincode];
  if (!record) {
    const isOdisha = cleanPincode.startsWith("75") || cleanPincode.startsWith("76") || cleanPincode.startsWith("77");
    record = {
      pincode: cleanPincode,
      area: isOdisha ? "Regional Odisha Zone" : "All-India Solar Grid",
      district: isOdisha ? "Odisha Region" : "National Grid",
      state: isOdisha ? "Odisha" : "India",
      discom: isOdisha ? "Odisha Unified DISCOM Network" : "State DISCOM Utility",
      latitude: 20.2961,
      longitude: 85.8245,
      peakSunHours: isOdisha ? 4.55 : 4.5,
    };
  }

  // Calculate target system capacity (kW)
  let targetKw = directKwInput || 3;
  if (!directKwInput && monthlyBillAmount > 0) {
    // Tariff ~ ₹7.0 / unit. Units needed/month = bill / 7.0
    const monthlyUnits = monthlyBillAmount / 7.0;
    // 1 kW yields ~120 units per month in Odisha
    const estimatedKw = monthlyUnits / 120;
    targetKw = Math.max(1, Math.min(100, Math.round(estimatedKw)));
  }

  // Execute calculation engine
  const calculation = calculateSolarQuote(targetKw, record.peakSunHours, isResidential);

  return {
    success: true,
    pincode: record.pincode,
    locationLabel: `${record.area}, ${record.district}, ${record.state}`,
    discom: record.discom,
    latitude: record.latitude,
    longitude: record.longitude,
    peakSunHours: record.peakSunHours,
    calculation,
    message: `Solar sizing successfully calculated for ${record.area} (${record.district}) under ${record.discom}.`,
  };
}
