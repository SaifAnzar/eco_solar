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
    name: "Waaree High-Efficiency Solar Panel (540W – 600W)",
    category: "modules",
    brand: "Waaree Solar — Made in India",
    badge: "PM Surya Ghar Approved",
    image: "/images/products/waaree-panel.png",
    alt: "Waaree solar panel 600W mono PERC module",
    description: "Government-approved solar panel made in India. Required for getting the full ₹78,000 subsidy under the PM Surya Ghar scheme.",
    features: [
      "Made in India — qualifies for full government subsidy",
      "High-efficiency panel — more electricity from less roof space",
      "Get up to ₹78,000 central subsidy",
      "25-year performance warranty — protected from day one",
    ],
  },
  {
    id: "adani-non-dcr-600w",
    name: "Adani High-Power Solar Panel (600W+ Bifacial)",
    category: "modules",
    brand: "Adani Solar — Commercial Use",
    badge: "Extra Power from Both Sides",
    image: "/images/products/adani-panel.png",
    alt: "Adani commercial bifacial solar panel",
    description: "Ideal for offices and factories. Generates electricity from both the front and back of the panel — giving you more power per panel.",
    features: [
      "Generates extra electricity from reflected light on the back",
      "Works well in Odisha's hot summer climate",
      "Best for factories, warehouses, and large buildings",
      "Business tax benefit of 80% in year one",
    ],
  },
  {
    id: "statcon-grid-inverter",
    name: "Statcon Grid Solar Inverter (1 kW – 100 kW)",
    category: "inverters",
    brand: "Statcon Power",
    badge: "Monitor from Your Phone",
    image: "/images/products/statcon-inverter.png",
    alt: "Statcon grid tied solar inverter system",
    description: "Smart solar inverter that converts your solar energy into usable electricity. Track how much power you're making directly from your phone.",
    features: [
      "Very high efficiency — wastes almost no solar energy",
      "Monitor your system live from a mobile app",
      "Built-in safety protection — no lightning or surge damage",
      "Works with all Odisha electricity networks",
    ],
  },
  {
    id: "servotech-hybrid-inverter",
    name: "Servotech Hybrid Inverter — Solar + Battery + Grid",
    category: "inverters",
    brand: "Servotech Power",
    badge: "Keeps Working During Power Cuts",
    image: "/images/products/servotech-inverter.png",
    alt: "Servotech hybrid solar inverter with battery integration",
    description: "The best choice for areas with frequent power cuts. Works with solar panels, a battery, and the electricity grid — so your home always has power.",
    features: [
      "Switches automatically to battery during power cuts",
      "Clean, stable electricity output — safe for all appliances",
      "Protects your home from voltage fluctuations",
      "Handles heavy-duty appliances like ACs and motors",
    ],
  },
  {
    id: "custom-hdg-mms",
    name: "Heavy-Duty Steel Mounting Frame for Solar Panels",
    category: "structures",
    brand: "Pragati Custom Structures",
    badge: "Cyclone-Safe — 150 km/h Rated",
    image: "/images/products/mounting-structure.png",
    alt: "Galvanized steel mounting structure and wall mounted panel",
    description: "Strong, rust-proof steel frames designed to hold your solar panels safely on any roof — flat, sloped, or RCC. Built to survive Odisha's strongest cyclones.",
    features: [
      "Rust-proof galvanized coating — lasts 25+ years outdoors",
      "Tested safe against 150 km/h cyclone-force winds",
      "Best tilt angle set for maximum Odisha sunlight",
      "Attached without drilling holes — no roof leakage",
    ],
  },
  {
    id: "polycab-xlpo-dc-cable",
    name: "Polycab Solar Cable & Safety Protection Box",
    category: "cables-earthing",
    brand: "Polycab & KEI",
    badge: "Heat & UV Resistant",
    image: "/images/brands/polycab.jpg",
    alt: "Polycab solar DC cable and ACDB/DCDB protection box",
    description: "Heavy-duty wires that safely carry electricity from your solar panels to your inverter. Built for outdoor use in Odisha's hot and humid weather.",
    features: [
      "Withstands extreme heat and direct outdoor sunlight",
      "Flame-resistant and weatherproof outer coating",
      "Copper conductor — maximum electricity transfer, zero loss",
      "Certified and tested to last 25 years outdoors",
    ],
  },
  {
    id: "is-3043-chemical-earthing",
    name: "Safety Earthing System for Solar Panels",
    category: "cables-earthing",
    brand: "Pragati Earthing",
    badge: "BIS Certified Safety",
    image: "/images/products/chemical-earthing.png",
    alt: "Chemical earthing rod installation for solar system safety",
    description: "A mandatory safety system that protects your solar panels, inverter, and home from lightning strikes and electrical faults. No maintenance needed.",
    features: [
      "Protects your solar system from lightning damage",
      "No maintenance required after installation",
      "Separate safety pit for panels, inverter, and lightning rod",
      "Instantly clears electrical faults before they cause damage",
    ],
  },
  {
    id: "integrated-solar-street-light",
    name: "All-in-One Solar Street Light (30W – 100W LED)",
    category: "street-lights",
    brand: "Pragati Solar Lighting",
    badge: "Auto On/Off — No Wiring Needed",
    image: "/images/products/solar-street-light.png",
    alt: "Integrated solar LED street light system",
    description: "A complete solar street light that charges during the day and turns on automatically at night. No electricity wires needed. Perfect for roads, parking areas, and villages.",
    features: [
      "Long-life battery — provides light for 5+ years",
      "Automatically switches on at sunset, off at sunrise",
      "Weatherproof and safe for outdoor use in all weather",
      "Approved for government-funded road lighting projects",
    ],
  },
];
