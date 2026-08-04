export interface EquipmentBand {
  minKw: number;
  maxKw: number;
  acdbDcdbSpec: string;
  dcCableSpec: string;
  acCableSpec: string;
  earthingPitsCount: number;
  laSpec: string;
}

export interface BOMItem {
  slNo: number;
  itemCategory: string;
  description: string;
  specification: string;
  quantity: number;
  unit: string;
  unitRate: number;
  totalAmount: number;
}

export interface SolarCalculationResult {
  systemKw: number;
  propertyType: "residential" | "commercial";
  panelCount: number;
  panelWp: number;
  panelUnitPrice: number;
  totalPanelCost: number;
  requiredRoofAreaSqFt: number;
  benchmarkRatePerKw: number;
  grossSystemCost: number;
  pmSuryaGharSubsidy: number;
  taxBenefit80AD: number;
  netPayableCost: number;
  pshUsed: number;
  annualGenerationKwh: number;
  monthlyGenerationKwh: number;
  avoidedTariffPerUnit: number;
  annualSavingsRs: number;
  monthlySavingsRs: number;
  paybackPeriodYears: number;
  co2OffsetTonsPerYear: number;
  equipmentBand: EquipmentBand;
  bom: BOMItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Hardcoded fallback defaults (used if no config override is saved)
// ─────────────────────────────────────────────────────────────────────────────
export const PANEL_WP = 600; // 600 Wp MonoPERC/TOPCon
export const DEFAULT_PANEL_UNIT_RATE = 14033.25; // ₹14,033.25 / panel incl. GST & margin
export const ROOF_AREA_PER_KW = 90; // 90 sq.ft per kW
export const RESIDENTIAL_BENCHMARK_RATE = 65000; // ₹65,000 / kW (<= 10 kW)
export const COMMERCIAL_BENCHMARK_RATE = 55000; // ₹55,000 / kW (> 10 kW)
export const GRID_TARIFF_RATE = 7.0; // ₹7.00 / unit in Odisha

// Dynamic Equipment Bands Lookup Table
export const EQUIPMENT_BANDS: EquipmentBand[] = [
  {
    minKw: 1,
    maxKw: 3,
    acdbDcdbSpec: "1-Phase 1000V DCDB + 240V ACDB with Type-II SPD & MCB",
    dcCableSpec: "4 sq.mm Tinned Copper XLPO Solar DC Cable",
    acCableSpec: "2.5 sq.mm 2-Core Copper Armoured AC Cable",
    earthingPitsCount: 2,
    laSpec: "Conventional Pure Copper Spike Lightning Arrestor",
  },
  {
    minKw: 4,
    maxKw: 10,
    acdbDcdbSpec: "3-Phase 1000V DCDB (2-In/2-Out) + 415V ACDB with Type-II SPD",
    dcCableSpec: "6 sq.mm Tinned Copper XLPO Solar DC Cable",
    acCableSpec: "6 sq.mm 4-Core Copper Armoured AC Cable",
    earthingPitsCount: 3,
    laSpec: "Class-A Heavy Duty Copper Spike Lightning Arrestor",
  },
  {
    minKw: 11,
    maxKw: 25,
    acdbDcdbSpec: "3-Phase Multi-String DCDB + ACDB with 63A MCCB & SPD",
    dcCableSpec: "6 sq.mm Tinned Copper XLPO Solar DC Cable",
    acCableSpec: "16 sq.mm 4-Core Aluminium Armoured AC Cable",
    earthingPitsCount: 3,
    laSpec: "Early Streamer Emission (ESE) Lightning Arrestor",
  },
  {
    minKw: 26,
    maxKw: 50,
    acdbDcdbSpec: "Industrial Weatherproof DCDB + AC Panel with 125A MCCB",
    dcCableSpec: "10 sq.mm Tinned Copper XLPO Solar DC Cable",
    acCableSpec: "35 sq.mm 4-Core Aluminium Armoured AC Cable",
    earthingPitsCount: 4,
    laSpec: "Active ESE Lightning Arrestor with 107m Coverage Radius",
  },
  {
    minKw: 51,
    maxKw: 75,
    acdbDcdbSpec: "Heavy Industrial Distribution Panel with 200A MCCB & Surge Suppressor",
    dcCableSpec: "10 sq.mm Tinned Copper XLPO Solar DC Cable",
    acCableSpec: "70 sq.mm 4-Core Aluminium Armoured AC Cable",
    earthingPitsCount: 5,
    laSpec: "Active ESE Lightning Arrestor + Mast Pole",
  },
  {
    minKw: 76,
    maxKw: 100,
    acdbDcdbSpec: "Mega Industrial LT Distribution Panel with 250A Main MCCB",
    dcCableSpec: "10 sq.mm Tinned Copper XLPO Solar DC Cable",
    acCableSpec: "120 sq.mm 3.5-Core Aluminium Armoured Cable",
    earthingPitsCount: 6,
    laSpec: "Active ESE Dual Arrestor Array with Digital Strike Counter",
  },
];

export function getEquipmentBand(systemKw: number, bands?: EquipmentBand[]): EquipmentBand {
  const activeBands = bands || EQUIPMENT_BANDS;
  const roundedKw = Math.max(1, Math.min(100, Math.round(systemKw)));
  const found = activeBands.find(
    (b) => roundedKw >= b.minKw && roundedKw <= b.maxKw
  );
  return (
    found ||
    activeBands[activeBands.length - 1] // Fallback to highest band
  );
}

export function calculatePMSuryaGharSubsidy(
  systemKw: number,
  isResidential: boolean,
  subsidyConfig?: {
    tier1Kw?: number;
    tier1Amount?: number;
    tier2Kw?: number;
    tier2Amount?: number;
    tier3PlusAmount?: number;
  }
): number {
  if (!isResidential) return 0;
  const kw = Math.round(systemKw);
  const t1Kw = subsidyConfig?.tier1Kw ?? 1;
  const t1Amount = subsidyConfig?.tier1Amount ?? 30000;
  const t2Kw = subsidyConfig?.tier2Kw ?? 2;
  const t2Amount = subsidyConfig?.tier2Amount ?? 60000;
  const t3PlusAmount = subsidyConfig?.tier3PlusAmount ?? 78000;

  if (kw <= t1Kw) return t1Amount;
  if (kw === t2Kw) return t2Amount;
  if (kw >= 3) return t3PlusAmount; // Flat cap for 3kW to 10kW residential
  return 0;
}

/**
 * Core solar quote calculation engine.
 * Accepts an optional `config` override from the admin panel.
 * Falls back to hardcoded defaults if no override provided.
 */
export function calculateSolarQuote(
  systemKwInput: number,
  pshInput = 4.5,
  isResidentialInput = true,
  config?: {
    panelWp?: number;
    panelUnitRate?: number;
    roofAreaPerKw?: number;
    residentialBenchmarkRate?: number;
    commercialBenchmarkRate?: number;
    gridTariffRate?: number;
    performanceRatio?: number;
    subsidyTier1Kw?: number;
    subsidyTier1Amount?: number;
    subsidyTier2Kw?: number;
    subsidyTier2Amount?: number;
    subsidyTier3PlusAmount?: number;
    equipmentBands?: EquipmentBand[];
  }
): SolarCalculationResult {
  // Resolve config values (admin overrides take precedence over defaults)
  const panelWp = config?.panelWp ?? PANEL_WP;
  const panelUnitRate = config?.panelUnitRate ?? DEFAULT_PANEL_UNIT_RATE;
  const roofAreaPerKw = config?.roofAreaPerKw ?? ROOF_AREA_PER_KW;
  const residentialBenchmarkRate = config?.residentialBenchmarkRate ?? RESIDENTIAL_BENCHMARK_RATE;
  const commercialBenchmarkRate = config?.commercialBenchmarkRate ?? COMMERCIAL_BENCHMARK_RATE;
  const gridTariffRate = config?.gridTariffRate ?? GRID_TARIFF_RATE;
  const performanceRatio = config?.performanceRatio ?? 0.78;
  const activeBands = config?.equipmentBands ?? EQUIPMENT_BANDS;

  // Normalize kW to 1 - 100 range
  const systemKw = Math.max(1, Math.min(100, Number(systemKwInput.toFixed(1))));
  const isResidential = isResidentialInput && systemKw <= 10;
  const propertyType: "residential" | "commercial" = isResidential ? "residential" : "commercial";

  // 1. Panel calculation
  const panelCount = Math.ceil((systemKw * 1000) / panelWp);
  const panelUnitPrice = panelUnitRate;
  const totalPanelCost = Math.round(panelCount * panelUnitPrice);

  // 2. Roof Area & Benchmark Costs
  const requiredRoofAreaSqFt = Math.round(systemKw * roofAreaPerKw);
  const benchmarkRatePerKw = isResidential ? residentialBenchmarkRate : commercialBenchmarkRate;
  const grossSystemCost = Math.round(systemKw * benchmarkRatePerKw);

  // 3. Subsidies & Financial Write-offs
  const pmSuryaGharSubsidy = calculatePMSuryaGharSubsidy(systemKw, isResidential, {
    tier1Kw: config?.subsidyTier1Kw,
    tier1Amount: config?.subsidyTier1Amount,
    tier2Kw: config?.subsidyTier2Kw,
    tier2Amount: config?.subsidyTier2Amount,
    tier3PlusAmount: config?.subsidyTier3PlusAmount,
  });
  const taxBenefit80AD = !isResidential ? Math.round(grossSystemCost * 0.25) : 0; // ~25% tax benefit under 80% AD
  const netPayableCost = Math.max(0, grossSystemCost - pmSuryaGharSubsidy - taxBenefit80AD);

  // 4. Generation & Annual Returns
  const pshUsed = pshInput;
  const annualGenerationKwh = Math.round(systemKw * pshUsed * 365 * performanceRatio);
  const monthlyGenerationKwh = Math.round(annualGenerationKwh / 12);
  const avoidedTariffPerUnit = gridTariffRate;
  const annualSavingsRs = Math.round(annualGenerationKwh * avoidedTariffPerUnit);
  const monthlySavingsRs = Math.round(annualSavingsRs / 12);
  const paybackPeriodYears = Number(
    (netPayableCost / (annualSavingsRs || 1)).toFixed(1)
  );
  const co2OffsetTonsPerYear = Number((annualGenerationKwh * 0.00082).toFixed(2)); // ~0.82 kg CO2 per kWh

  // 5. Equipment Band Lookup
  const equipmentBand = getEquipmentBand(systemKw, activeBands);

  // 6. Generate 15-Item Bill of Materials (BOM)
  const bomCostRatio = grossSystemCost;
  const bom: BOMItem[] = [
    {
      slNo: 1,
      itemCategory: "Solar PV Modules",
      description: "600 Wp MonoPERC / TOPCon Bifacial Solar Panels",
      specification: `Waaree/Adani Tier-1 ALMM ${panelWp}W Wp (${panelCount} panels, 22.8% efficiency)`,
      quantity: panelCount,
      unit: "Nos",
      unitRate: panelUnitPrice,
      totalAmount: totalPanelCost,
    },
    {
      slNo: 2,
      itemCategory: "Solar String Inverter",
      description: "On-Grid Dual MPPT String Inverter with Wi-Fi Dongle",
      specification: `Statcon / Sunora ${Math.ceil(systemKw)}kW 3-Phase/1-Phase Grid-Tied Inverter (IP65)`,
      quantity: 1,
      unit: "Set",
      unitRate: Math.round(bomCostRatio * 0.15),
      totalAmount: Math.round(bomCostRatio * 0.15),
    },
    {
      slNo: 3,
      itemCategory: "Mounting Structure (MMS)",
      description: "Hot-Dip Galvanized Iron Structural Steel Mounting Legs",
      specification: "80-Micron HDG Coating, 150 km/h Wind Load Rating, 20° South Tilt",
      quantity: systemKw,
      unit: "kW",
      unitRate: 4500,
      totalAmount: Math.round(systemKw * 4500),
    },
    {
      slNo: 4,
      itemCategory: "Solar DC Cable",
      description: "Cross-linked Polyolefin (XLPO) Tinned Copper DC Wire",
      specification: equipmentBand.dcCableSpec,
      quantity: Math.round(systemKw * 15 + 20),
      unit: "Mtrs",
      unitRate: 95,
      totalAmount: Math.round((systemKw * 15 + 20) * 95),
    },
    {
      slNo: 5,
      itemCategory: "AC Armoured Cable",
      description: "Heavy Duty Armoured AC Power Cable to LT Panel",
      specification: equipmentBand.acCableSpec,
      quantity: Math.round(systemKw * 10 + 15),
      unit: "Mtrs",
      unitRate: 185,
      totalAmount: Math.round((systemKw * 10 + 15) * 185),
    },
    {
      slNo: 6,
      itemCategory: "DC Distribution Box",
      description: "Weatherproof DCDB with Fuse Protection & Type-II Surge Suppressor",
      specification: equipmentBand.acdbDcdbSpec.split("+")[0] || "1000V DCDB IP65",
      quantity: 1,
      unit: "Set",
      unitRate: 6500,
      totalAmount: 6500,
    },
    {
      slNo: 7,
      itemCategory: "AC Distribution Box",
      description: "ACDB Box with MCB/MCCB & Class B+C Surge Protection Device",
      specification: equipmentBand.acdbDcdbSpec.split("+")[1] || "415V ACDB IP65",
      quantity: 1,
      unit: "Set",
      unitRate: 7500,
      totalAmount: 7500,
    },
    {
      slNo: 8,
      itemCategory: "Chemical Earthing Electrodes",
      description: "Maintenance-Free Gel Filled Grounding Rods (IS 3043 Standard)",
      specification: "50mm dia 3-Meter Copper-Bonded Chemical Earthing Rods",
      quantity: equipmentBand.earthingPitsCount,
      unit: "Pits",
      unitRate: 5200,
      totalAmount: equipmentBand.earthingPitsCount * 5200,
    },
    {
      slNo: 9,
      itemCategory: "Earthing Pit Backfill Compound",
      description: "Conductive Carbon Bentonite Earth Enhancement Compound",
      specification: "25kg Moisture Retention Backfill Compound Bags",
      quantity: equipmentBand.earthingPitsCount * 2,
      unit: "Bags",
      unitRate: 850,
      totalAmount: equipmentBand.earthingPitsCount * 2 * 850,
    },
    {
      slNo: 10,
      itemCategory: "Lightning Protection System",
      description: "High-Altitude Lightning Arrestor System with Spike/ESE Pole",
      specification: equipmentBand.laSpec,
      quantity: 1,
      unit: "Set",
      unitRate: 8500,
      totalAmount: 8500,
    },
    {
      slNo: 11,
      itemCategory: "Net Metering Equipment",
      description: "DISCOM Approved Bi-Directional Net Meter & Generation Meter Box",
      specification: "0.2s / 0.5s Accuracy Class DLMS Net Meter as per TPCODL Specs",
      quantity: 1,
      unit: "Set",
      unitRate: 12500,
      totalAmount: 12500,
    },
    {
      slNo: 12,
      itemCategory: "Balance of System (BOS)",
      description: "UV Conduits, Cable Trays, Glands, Lugs & SS Fasteners",
      specification: "Heavy Duty UPVC UV-Protected Conduit Pipes & Cable Trays",
      quantity: 1,
      unit: "Lot",
      unitRate: Math.round(bomCostRatio * 0.04),
      totalAmount: Math.round(bomCostRatio * 0.04),
    },
    {
      slNo: 13,
      itemCategory: "Civil Works & Installation",
      description: "Roof Piercing Chemical Anchoring, Civil Foundations & Commissioning",
      specification: "Hilti/Fischer Chemical Anchors, Concrete Grouting & Structural Testing",
      quantity: 1,
      unit: "Job",
      unitRate: Math.round(bomCostRatio * 0.08),
      totalAmount: Math.round(bomCostRatio * 0.08),
    },
    {
      slNo: 14,
      itemCategory: "DISCOM Liaison & Feasibility",
      description: "End-to-End Feasibility Filing, Sanctioned Load Sync & Testing Fee",
      specification: "Full Paperwork Liaison for TPCODL / TPNODL / TPSODL / TPWODL",
      quantity: 1,
      unit: "Service",
      unitRate: 9500,
      totalAmount: 9500,
    },
    {
      slNo: 15,
      itemCategory: "Remote Telemetry & Monitoring",
      description: "Real-time Solar Generation IoT Wi-Fi/GPRS Data Logger",
      specification: "Cloud Telemetry, Mobile App Sync & 24/7 Remote Diagnostics",
      quantity: 1,
      unit: "Unit",
      unitRate: 4500,
      totalAmount: 4500,
    },
  ];

  return {
    systemKw,
    propertyType,
    panelCount,
    panelWp,
    panelUnitPrice,
    totalPanelCost,
    requiredRoofAreaSqFt,
    benchmarkRatePerKw,
    grossSystemCost,
    pmSuryaGharSubsidy,
    taxBenefit80AD,
    netPayableCost,
    pshUsed,
    annualGenerationKwh,
    monthlyGenerationKwh,
    avoidedTariffPerUnit,
    annualSavingsRs,
    monthlySavingsRs,
    paybackPeriodYears,
    co2OffsetTonsPerYear,
    equipmentBand,
    bom,
  };
}
