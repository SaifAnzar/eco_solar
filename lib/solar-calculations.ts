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
 * Calculate estimated monthly consumed units from total monthly electricity bill
 */
export function billToUnits(
  monthlyBill: number,
  config: TariffConfigData = DEFAULT_ODISHA_TARIFF,
  systemKw: number = 3
): number {
  if (monthlyBill <= 0) return 0;

  const fixedCharge = (systemKw || 3) * (config.fixedRatePerKw ?? 20);
  const netEnergyBill = Math.max(0, monthlyBill - fixedCharge);
  
  // Exclude electricity duty (6%) to get net energy charge
  const dutyRate = config.dutyRate ?? 0.06;
  let remainingEnergyCharge = netEnergyBill / (1 + dutyRate);

  const sortedSlabs = [...(config.slabs || DEFAULT_ODISHA_TARIFF.slabs)].sort((a, b) => {
    if (a.upto === null) return 1;
    if (b.upto === null) return -1;
    return a.upto - b.upto;
  });

  let totalUnits = 0;
  let previousLimit = 0;

  for (const slab of sortedSlabs) {
    if (remainingEnergyCharge <= 0) break;

    const slabLimit = slab.upto;
    const slabCapacity = slabLimit === null ? Infinity : slabLimit - previousLimit;
    const maxSlabCost = slabCapacity === Infinity ? Infinity : slabCapacity * slab.rate;

    if (remainingEnergyCharge >= maxSlabCost) {
      totalUnits += slabCapacity;
      remainingEnergyCharge -= maxSlabCost;
    } else {
      totalUnits += remainingEnergyCharge / slab.rate;
      remainingEnergyCharge = 0;
      break;
    }

    if (slabLimit !== null) {
      previousLimit = slabLimit;
    }
  }

  return Math.round(totalUnits);
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
    ? billToUnits(monthlyBillOrUnits, config)
    : monthlyBillOrUnits;

  // Monthly generation per kW = Peak Sun Hours * 30 days * 0.78 (Performance Ratio)
  const monthlyGenPerKw = psh * 30 * 0.78;
  const rawKw = units / (monthlyGenPerKw || 1);

  // Round to nearest 0.5 kW, minimum 1 kW, maximum 100 kW
  const roundedKw = Math.max(1, Math.min(100, Math.ceil(rawKw * 2) / 2));
  return roundedKw;
}
