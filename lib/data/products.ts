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
    // Close-up of solar panels being installed on a home rooftop
    image: "https://images.unsplash.com/photo-1559302504-64aae6ca6890?w=800&auto=format&fit=crop&q=80",
    alt: "Waaree solar panel installation on rooftop",
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
    // Massive commercial solar farm — wide aerial view of large installation
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&auto=format&fit=crop&q=80",
    alt: "Adani commercial solar panel array on a factory rooftop",
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
    // Electrical power inverter / control panel equipment — indoor technical
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
    alt: "Statcon solar inverter connected to rooftop solar system",
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
    // Power control room / hybrid inverter panel with wiring — technical setup
    image: "https://images.unsplash.com/photo-1624397640148-949b1732bb0a?w=800&auto=format&fit=crop&q=80",
    alt: "Servotech hybrid solar inverter for home with battery backup",
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
    // Steel mounting structure / solar panel racking on rooftop
    image: "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&auto=format&fit=crop&q=80",
    alt: "Galvanized steel mounting structure for rooftop solar panels",
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
    // Electrical cables and wires — close-up of colorful wiring/terminals
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=800&auto=format&fit=crop&q=80",
    alt: "Polycab solar DC cable for rooftop solar system",
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
    badge: "IS 3043 Certified Safety",
    // Ground rod / earthing / grounding pit — electrical safety
    image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&auto=format&fit=crop&q=80",
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
    // Street light / LED lamp post at night or dusk — outdoor lighting
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
    alt: "Solar street light pole installed on a road in Odisha",
    description: "A complete solar street light that charges during the day and turns on automatically at night. No electricity wires needed. Perfect for roads, parking areas, and villages.",
    features: [
      "Long-life battery — provides light for 5+ years",
      "Automatically switches on at sunset, off at sunrise",
      "Weatherproof and safe for outdoor use in all weather",
      "Approved for government-funded road lighting projects",
    ],
  },
];
