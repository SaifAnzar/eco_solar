export interface PincodeDetails {
  success: boolean;
  pincode: string;
  district: string;
  state: string;
  postOfficeName?: string;
  discom: string;
  discomCode: "TPCODL" | "TPNODL" | "TPSODL" | "TPWODL" | "OTHER";
  isOdisha: boolean;
  error?: string;
}

export type DiscomCode = "TPCODL" | "TPNODL" | "TPSODL" | "TPWODL" | "OTHER";

export const DISCOM_DESCRIPTIONS: Record<DiscomCode, string> = {
  TPCODL: "TPCODL (Central Odisha — Khordha, Cuttack, Puri, etc.)",
  TPNODL: "TPNODL (North Odisha — Balasore, Bhadrak, Mayurbhanj, Keonjhar)",
  TPSODL: "TPSODL (South Odisha — Ganjam, Gajapati, Rayagada, Koraput, etc.)",
  TPWODL: "TPWODL (West Odisha — Sambalpur, Jharsuguda, Sundargarh, etc.)",
  OTHER: "State DISCOM Utility",
};

export const ODISHA_DISTRICTS_BY_DISCOM = {
  TPCODL: [
    "Khordha",
    "Cuttack",
    "Puri",
    "Nayagarh",
    "Dhenkanal",
    "Angul",
    "Kendrapara",
    "Jagatsinghpur",
  ],
  TPNODL: ["Balasore", "Bhadrak", "Mayurbhanj", "Keonjhar"],
  TPSODL: [
    "Ganjam",
    "Gajapati",
    "Rayagada",
    "Koraput",
    "Malkangiri",
    "Nabarangpur",
    "Kandhamal",
    "Boudh",
  ],
  TPWODL: [
    "Sambalpur",
    "Jharsuguda",
    "Bargarh",
    "Sundargarh",
    "Bolangir",
    "Subarnapur",
    "Nuapada",
    "Kalahandi",
    "Deogarh",
  ],
};

export const ALL_ODISHA_DISTRICTS = Array.from(
  new Set([
    ...ODISHA_DISTRICTS_BY_DISCOM.TPCODL,
    ...ODISHA_DISTRICTS_BY_DISCOM.TPNODL,
    ...ODISHA_DISTRICTS_BY_DISCOM.TPSODL,
    ...ODISHA_DISTRICTS_BY_DISCOM.TPWODL,
  ])
).sort();

/**
 * Maps a given district and state to the appropriate Odisha DISCOM utility.
 */
export function mapDistrictToDiscom(
  district: string,
  state: string
): { discom: string; discomCode: DiscomCode } {
  const normDistrict = (district || "").trim().toLowerCase();
  const normState = (state || "").trim().toLowerCase();

  const isOdishaState = normState.includes("odisha") || normState.includes("orissa");

  if (!isOdishaState && normState.length > 0 && !normDistrict.includes("odisha")) {
    return {
      discom: "State DISCOM Utility",
      discomCode: "OTHER",
    };
  }

  // Alias normalize helpers
  if (normDistrict.includes("khordh") || normDistrict.includes("khord") || normDistrict.includes("bhubaneswar")) {
    return { discom: "TPCODL (Central Odisha)", discomCode: "TPCODL" };
  }
  if (normDistrict.includes("cuttack")) return { discom: "TPCODL (Central Odisha)", discomCode: "TPCODL" };
  if (normDistrict.includes("puri")) return { discom: "TPCODL (Central Odisha)", discomCode: "TPCODL" };
  if (normDistrict.includes("nayagarh")) return { discom: "TPCODL (Central Odisha)", discomCode: "TPCODL" };
  if (normDistrict.includes("dhenkanal")) return { discom: "TPCODL (Central Odisha)", discomCode: "TPCODL" };
  if (normDistrict.includes("angul")) return { discom: "TPCODL (Central Odisha)", discomCode: "TPCODL" };
  if (normDistrict.includes("kendrap") || normDistrict.includes("kendrapara")) return { discom: "TPCODL (Central Odisha)", discomCode: "TPCODL" };
  if (normDistrict.includes("jagatsingh")) return { discom: "TPCODL (Central Odisha)", discomCode: "TPCODL" };

  if (normDistrict.includes("balasore") || normDistrict.includes("baleshwar") || normDistrict.includes("baleswar")) {
    return { discom: "TPNODL (North Odisha)", discomCode: "TPNODL" };
  }
  if (normDistrict.includes("bhadrak")) return { discom: "TPNODL (North Odisha)", discomCode: "TPNODL" };
  if (normDistrict.includes("mayurbhanj")) return { discom: "TPNODL (North Odisha)", discomCode: "TPNODL" };
  if (normDistrict.includes("keonjhar") || normDistrict.includes("kendujhar")) {
    return { discom: "TPNODL (North Odisha)", discomCode: "TPNODL" };
  }

  if (normDistrict.includes("ganjam") || normDistrict.includes("berhampur")) return { discom: "TPSODL (South Odisha)", discomCode: "TPSODL" };
  if (normDistrict.includes("gajapati")) return { discom: "TPSODL (South Odisha)", discomCode: "TPSODL" };
  if (normDistrict.includes("rayagada")) return { discom: "TPSODL (South Odisha)", discomCode: "TPSODL" };
  if (normDistrict.includes("koraput")) return { discom: "TPSODL (South Odisha)", discomCode: "TPSODL" };
  if (normDistrict.includes("malkangiri")) return { discom: "TPSODL (South Odisha)", discomCode: "TPSODL" };
  if (normDistrict.includes("nabarang") || normDistrict.includes("nabrang")) return { discom: "TPSODL (South Odisha)", discomCode: "TPSODL" };
  if (normDistrict.includes("kandhamal") || normDistrict.includes("phulbani")) return { discom: "TPSODL (South Odisha)", discomCode: "TPSODL" };
  if (normDistrict.includes("boudh") || normDistrict.includes("baudh")) return { discom: "TPSODL (South Odisha)", discomCode: "TPSODL" };

  if (normDistrict.includes("sambalpur")) return { discom: "TPWODL (West Odisha)", discomCode: "TPWODL" };
  if (normDistrict.includes("jharsuguda")) return { discom: "TPWODL (West Odisha)", discomCode: "TPWODL" };
  if (normDistrict.includes("bargarh") || normDistrict.includes("baragarh")) return { discom: "TPWODL (West Odisha)", discomCode: "TPWODL" };
  if (normDistrict.includes("sundargarh") || normDistrict.includes("sundergarh") || normDistrict.includes("rourkela")) {
    return { discom: "TPWODL (West Odisha)", discomCode: "TPWODL" };
  }
  if (normDistrict.includes("bolangir") || normDistrict.includes("balangir")) return { discom: "TPWODL (West Odisha)", discomCode: "TPWODL" };
  if (normDistrict.includes("subarnapur") || normDistrict.includes("sonepur")) return { discom: "TPWODL (West Odisha)", discomCode: "TPWODL" };
  if (normDistrict.includes("nuapada")) return { discom: "TPWODL (West Odisha)", discomCode: "TPWODL" };
  if (normDistrict.includes("kalahandi")) return { discom: "TPWODL (West Odisha)", discomCode: "TPWODL" };
  if (normDistrict.includes("deogarh") || normDistrict.includes("debagarh")) return { discom: "TPWODL (West Odisha)", discomCode: "TPWODL" };

  // Fallback for Odisha if district is unspecified
  return {
    discom: isOdishaState ? "Odisha Unified DISCOM Network" : "State DISCOM Utility",
    discomCode: isOdishaState ? "TPCODL" : "OTHER",
  };
}

/**
 * Async function fetchPincodeDetails(pincode: string)
 * Hits India Post Free Pincode API (https://api.postalpincode.in/pincode/${pincode})
 */
export async function fetchPincodeDetails(pincode: string): Promise<PincodeDetails> {
  const cleanPincode = (pincode || "").trim();

  // Validate 6-digit numeric input
  if (!/^\d{6}$/.test(cleanPincode)) {
    return {
      success: false,
      pincode: cleanPincode,
      district: "",
      state: "",
      discom: "",
      discomCode: "OTHER",
      isOdisha: false,
      error: "Please enter a valid 6-digit numeric Indian pincode.",
    };
  }

  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${cleanPincode}`, {
      cache: "force-cache",
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }

    const data = await res.json();

    if (
      Array.isArray(data) &&
      data[0] &&
      data[0].Status === "Success" &&
      Array.isArray(data[0].PostOffice) &&
      data[0].PostOffice.length > 0
    ) {
      const firstPo = data[0].PostOffice[0];
      const district = firstPo.District || "";
      const state = firstPo.State || "";
      const postOfficeName = firstPo.Name || "";

      const { discom, discomCode } = mapDistrictToDiscom(district, state);
      const isOdisha = state.toLowerCase().includes("odisha") || state.toLowerCase().includes("orissa");

      return {
        success: true,
        pincode: cleanPincode,
        district,
        state,
        postOfficeName,
        discom,
        discomCode,
        isOdisha,
      };
    } else {
      return {
        success: false,
        pincode: cleanPincode,
        district: "",
        state: "",
        discom: "",
        discomCode: "OTHER",
        isOdisha: false,
        error: data[0]?.Message || "No postal records found for this 6-digit pincode.",
      };
    }
  } catch (err: any) {
    console.error("India Post API fetch error:", err);
    return {
      success: false,
      pincode: cleanPincode,
      district: "",
      state: "",
      discom: "",
      discomCode: "OTHER",
      isOdisha: false,
      error: "Network error fetching postal details. Please try again or select district manually.",
    };
  }
}
