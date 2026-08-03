import { ProductCategory } from "@/components/products/ProductFilterTabs";

export interface ProductItem {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  badge: string;
  image: string;
  alt: string;
  description: string;
  features: string[];
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "waaree-dcr-600w",
    name: "Waaree 540W - 600W+ DCR MonoPERC Module",
    category: "modules",
    brand: "Waaree Solar (DCR Mandatory)",
    badge: "PM Surya Ghar Approved",
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=80",
    alt: "Waaree DCR solar module with Made in India solar cells",
    description: "MNRE ALMM List-I approved DCR (Domestic Content Requirement) solar panel with indigenous Indian solar cells required for central subsidy approval.",
    features: [
      "Mandatory DCR Compliant (Made in India Solar Cells & Modules)",
      "22.5%+ Module Efficiency with N-Type TOPCon / PERC Tech",
      "Qualifies for full ₹78,000 Central Subsidy under PM Surya Ghar",
      "IP68 Junction Box with 25-Year Linear Performance Guarantee",
    ],
  },
  {
    id: "adani-non-dcr-600w",
    name: "Adani Shine 600W+ Non-DCR TOPCon Bifacial Panel",
    category: "modules",
    brand: "Adani Solar (C&I Commercial)",
    badge: "22.8% Module Efficiency",
    image: "https://images.unsplash.com/photo-1592833159057-651427233c1d?w=800&auto=format&fit=crop&q=80",
    alt: "Adani Non-DCR commercial solar module array",
    description: "High-yield Non-DCR bifacial solar module designed for commercial & industrial power plants seeking maximum kWh generation per square foot.",
    features: [
      "High-Density Bifacial Generation Gain up to 25% from rear reflection",
      "Low temperature coefficient (-0.30%/°C) for extreme summer heat",
      "Ideal for CAPEX & OPEX Commercial Solar Plants in Odisha",
      "80% Accelerated Depreciation tax benefit eligible",
    ],
  },
  {
    id: "statcon-grid-inverter",
    name: "Statcon 3-Phase Grid-Tied Inverter (1 kW - 100 kW)",
    category: "inverters",
    brand: "Statcon Power",
    badge: "IP65 Rated Dual MPPT",
    image: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?w=800&auto=format&fit=crop&q=80",
    alt: "Statcon 3-Phase grid tied inverter with dual MPPT",
    description: "Industrial-grade grid-tied string inverter with dual independent MPPT trackers and Wi-Fi telemetry for 100% DISCOM net-metering synchronization.",
    features: [
      "98.6% Maximum Peak Conversion Efficiency",
      "Dual Independent MPPT Trackers with wide input voltage range",
      "Built-in AC & DC Type-II Surge Protection Devices (SPD)",
      "Real-time Mobile App Remote Cloud Telemetry Dongle",
    ],
  },
  {
    id: "servotech-hybrid-inverter",
    name: "Servotech Dual MPPT Hybrid Power Conditioning Unit",
    category: "inverters",
    brand: "Servotech Power",
    badge: "Grid + Battery Sync",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    alt: "Servotech hybrid inverter unit",
    description: "DSP-controlled hybrid solar power conditioning unit engineered for seamless grid, solar, and battery bank synchronization during Odisha power outages.",
    features: [
      "Seamless Solar, Grid, and Battery Bank Intelligent Auto-Sync",
      "Pure Sine Wave Output with <3% THD Power Quality",
      "Smart Load Prioritization & Anti-Islanding Safety Protection",
      "High surge power capability for heavy inductive motor loads",
    ],
  },
  {
    id: "custom-hdg-mms",
    name: "Custom Hot-Dip Galvanized Mounting Structure (MMS)",
    category: "structures",
    brand: "Pragati MMS",
    badge: "150 km/h Cyclone Rated",
    image: "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&auto=format&fit=crop&q=80",
    alt: "Hot dip galvanized structural steel solar mounting frame",
    description: "Custom engineered heavy-gauge structural steel mounting legs with 80-micron zinc coating designed to withstand 150 km/h coastal Odisha tropical cyclones.",
    features: [
      "80-Micron Hot-Dip Galvanized Zinc Coating (IS 4759 Standard)",
      "Tested for 150 km/h Coastal Cyclone Wind-Load Capacity",
      "20° South Fixed Tilt angle for maximum annual Odisha solar yield",
      "Hilti / Fischer Chemical Anchors for 100% zero roof leakage",
    ],
  },
  {
    id: "polycab-xlpo-dc-cable",
    name: "Polycab 1500V XLPO Solar DC Cable & ACDB/DCDB",
    category: "cables-earthing",
    brand: "Polycab & KEI",
    badge: "1500V UV-Resistant",
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=800&auto=format&fit=crop&q=80",
    alt: "Polycab 1500V XLPO solar DC cable wire",
    description: "Cross-linked Polyolefin tinned copper solar DC cable combined with IP65 ACDB/DCDB protection boxes with Type-II SPDs.",
    features: [
      "Halogen-free low smoke Flame Retardant material (HFFR)",
      "High thermal stability from -40°C to +120°C operating temp",
      "Tinned copper conductor for maximum corrosion prevention",
      "TUV & IS 17293 Certified Solar Cable with 25-Year Outdoor Life",
    ],
  },
  {
    id: "is-3043-chemical-earthing",
    name: "IS 3043 Chemical Maintenance-Free Earthing System",
    category: "cables-earthing",
    brand: "Pragati Earthing",
    badge: "IS 3043 Certified",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80",
    alt: "Chemical earthing rod grounding pit",
    description: "Dedicated chemical grounding system with copper-bonded rods and bentonite moisture retention backfill compound for low soil resistivity.",
    features: [
      "50mm Dia 3-Meter Copper Bonded Rods (IS 3043 Standard)",
      "Conductive Carbon Bentonite Earth Enhancement Compound",
      "Separate Grounding Pits for AC, DC, and Lightning Arrestor",
      "Dissipates high fault currents instantly to protect inverter & panels",
    ],
  },
  {
    id: "integrated-solar-street-light",
    name: "Integrated All-in-One Solar Street Light (30W - 100W LED)",
    category: "street-lights",
    brand: "Pragati Solar Lighting",
    badge: "IP65 LiFePO4 Battery",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=800&auto=format&fit=crop&q=80",
    alt: "All-in-one solar street light pole with LiFePO4 battery and MPPT controller",
    description: "Heavy-duty integrated solar LED street lighting system with built-in LiFePO4 lithium battery, dusk-to-dawn motion sensor, and MPPT charge controller for municipal, industrial, and rural lighting in Odisha.",
    features: [
      "High-efficiency LiFePO4 Lithium Battery (5+ Year Battery Lifespan)",
      "Dusk-to-Dawn Motion Sensor & Smart Dimming Telemetry",
      "IP65 Weatherproof & Heavy-Duty Galvanized Pole Mounting",
      "MNRE & Odisha DISCOM Approved Municipal / Rural Lighting Standard",
    ],
  },
];
