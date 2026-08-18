/**
 * Dynamic Solar & Odisha Tariff Calculation Utility
 * Odisha 2026-27 OERC Rates & Dynamic Tariff Configuration
 */

export interface TariffSlab {
  upto: number | null; // Null indicates "Above X units" unlimited slab
  rate: number; // ₹ per unit
}

export interface TariffConfigData {
  id?: string;
  category?: string;
  slabs: TariffSlab[];
  dutyRate: number; // e.g. 0.06 for 6%
  fixedRatePerKw: number; // ₹ per kW fixed charge
  basePricePerKw: number; // Benchmark price per kW before subsidy (e.g. ₹75,000)
  subsidyCap: number; // Maximum PM Surya Ghar subsidy cap (e.g. ₹78,000)
}

/**
 * Default Odisha 2026-27 OERC Domestic LT Tariff Parameters
 */
export const DEFAULT_ODISHA_TARIFF: TariffConfigData = {
  category: "ODISHA_DOMESTIC_LT",
  slabs: [
    { upto: 50, rate: 2.90 },
    { upto: 200, rate: 4.70 },
    { upto: 400, rate: 5.70 },
    { upto: null, rate: 6.10 },
  ],
  dutyRate: 0.06, // 6% electricity duty
  fixedRatePerKw: 20.0, // ₹20 / kW fixed charge
  basePricePerKw: 75000.0, // ₹75,000 / kW base cost
  subsidyCap: 78000.0, // ₹78,000 cap
};

/**
 * Calculate total monthly electricity bill from monthly consumed units
 */
export function unitsToBill(
  units: number,
  config: TariffConfigData = DEFAULT_ODISHA_TARIFF,
  systemKw: number = 3
): number {
  if (units <= 0) return 0;

  const sortedSlabs = [...(config.slabs || DEFAULT_ODISHA_TARIFF.slabs)].sort((a, b) => {
    if (a.upto === null) return 1;
    if (b.upto === null) return -1;
    return a.upto - b.upto;
  });

  let remainingUnits = units;
  let energyCharge = 0;
  let previousLimit = 0;

  for (const slab of sortedSlabs) {
    if (remainingUnits <= 0) break;

    const slabLimit = slab.upto;
    const slabCapacity = slabLimit === null ? Infinity : slabLimit - previousLimit;
    const unitsInSlab = Math.min(remainingUnits, slabCapacity);

    energyCharge += unitsInSlab * slab.rate;
    remainingUnits -= unitsInSlab;

    if (slabLimit !== null) {
      previousLimit = slabLimit;
    }
  }

  const fixedCharge = (systemKw || 3) * (config.fixedRatePerKw ?? 20);
  const duty = energyCharge * (config.dutyRate ?? 0.06);

  return Math.round(energyCharge + fixedCharge + duty);
}

/**
 * Binary Search Inverse Formula: Monthly Bill (₹) to Consumed Units (kWh)
 * Uses exact binary search to invert telescopic tariff slabs without altering forward logic.
 */
export function billToUnits(
  targetBill: number,
  sanctionedKw: number = 2,
  config: TariffConfigData = DEFAULT_ODISHA_TARIFF
): number {
  if (targetBill <= 0) return 0;

  let low = 0;
  let high = 100000;
  let bestUnits = 0;

  for (let i = 0; i < 30; i++) {
    const mid = (low + high) / 2;
    const calculatedBill = unitsToBill(mid, config, sanctionedKw);
    if (calculatedBill <= targetBill) {
      bestUnits = mid;
      low = mid;
    } else {
      high = mid;
    }
  }

  return Math.round(bestUnits);
}

/**
 * System Sizing Formula: Estimate system capacity (kW) from monthly electricity bill
 */
export function estimateKwFromBill(
  monthlyBill: number,
  sanctionedKw: number = 2,
  unitsPerKwPerDay: number = 4.2,
  config: TariffConfigData = DEFAULT_ODISHA_TARIFF
): number {
  if (monthlyBill <= 0) return 1;
  const monthlyUnits = billToUnits(monthlyBill, sanctionedKw, config);
  const dailyUnits = monthlyUnits / 30;
  const estimatedKw = Math.max(1, Math.min(10, Math.round((dailyUnits / unitsPerKwPerDay) * 2) / 2));
  return estimatedKw;
}

/**
 * Full Cost & Subsidy Calculation Breakdown
 */
export function calculateBillToSolarMath(
  monthlyBill: number,
  isResidential: boolean = true,
  sanctionedKw: number = 2,
  config: TariffConfigData = DEFAULT_ODISHA_TARIFF
) {
  const monthlyUnits = billToUnits(monthlyBill, sanctionedKw, config);
  const dailyUnits = monthlyUnits / 30;
  const estimatedKw = Math.max(1, Math.min(10, Math.round((dailyUnits / 4.2) * 2) / 2));

  const baseCost = estimatedKw * (config.basePricePerKw || 75000);
  const subsidy = isResidential
    ? estimatedKw === 1
      ? 30000
      : estimatedKw === 2
      ? 60000
      : 78000
    : 0;
  const netCost = Math.max(0, baseCost - subsidy);

  // Estimated ~90% bill reduction
  const unitsAfterSolar = Math.round(monthlyUnits * 0.1);
  const newBillAfterSolar = unitsToBill(unitsAfterSolar, config, sanctionedKw);
  const monthlySavings = Math.max(0, monthlyBill - newBillAfterSolar);

  const rooftopAreaSqFt = Math.round(estimatedKw * 100);
  const estimatedMonthlyGenKwh = Math.round(estimatedKw * 120);

  return {
    monthlyUnits,
    estimatedKw,
    baseCost,
    subsidy,
    netCost,
    newBillAfterSolar,
    monthlySavings,
    rooftopAreaSqFt,
    estimatedMonthlyGenKwh,
  };
}

/**
 * Estimate required solar system capacity (kW) from monthly bill or units
 */
export function estimateKw(
  monthlyBillOrUnits: number,
  isBill: boolean = true,
  psh: number = 4.5,
  config: TariffConfigData = DEFAULT_ODISHA_TARIFF
): number {
  if (monthlyBillOrUnits <= 0) return 1;

  const units = isBill
    ? billToUnits(monthlyBillOrUnits, 2, config)
    : monthlyBillOrUnits;

  const monthlyGenPerKw = psh * 30 * 0.78;
  const rawKw = units / (monthlyGenPerKw || 1);

  return Math.max(1, Math.min(100, Math.ceil(rawKw * 2) / 2));
}
