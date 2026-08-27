// Pragati EcoSolar - Centralized Solar EPC Services & Products Data

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  category: "all" | "rooftop" | "agriculture" | "liaison";
  categoryLabel: string;
  badge: string;
  badgeColor: string;
  image: string;
  alt: string;
  description: string;
  capacityRange: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  isKusumModal?: boolean;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "on-grid",
    title: "On-Grid Solar (Grid Connected)",
    subtitle: "Cut Electricity Bills by up to 90%",
    category: "rooftop",
    categoryLabel: "Rooftop Solar",
    badge: "UP TO ₹78,000 SUBSIDY",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
    image: "/services/On-Grid%20Solar%20(Grid%20Connected).png",
    alt: "On-Grid Solar Grid Connected Rooftop System",
    capacityRange: "1 kW - 500 kW+",
    description:
      "Direct grid-connected rooftop solar systems for homes, commercial offices & factories. Export surplus solar power to DISCOM via Net-Metering for maximum bill reduction.",
    features: [
      "PM Surya Ghar ₹78,000 direct bank subsidy",
      "Bi-directional DISCOM Net Metering approval",
      "Tier-1 25-year panel warranty & 3-4 year ROI",
    ],
    ctaText: "Calculate Bill Savings",
    ctaHref: "/calculator?type=residential",
  },
  {
    id: "off-grid",
    title: "Off-Grid Solar (Battery Storage)",
    subtitle: "100% Power Freedom & 24/7 Energy Backup",
    category: "rooftop",
    categoryLabel: "Rooftop Solar",
    badge: "100% INDEPENDENT",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30",
    image: "/services/Off-Grid%20Solar%20(Battery%20Storage).png",
    alt: "Off-Grid Solar Battery Storage System",
    capacityRange: "2 kW - 50 kW",
    description:
      "Standalone solar system paired with high-capacity Lithium or Lead-Acid batteries. Provides continuous 24/7 electricity during grid power outages & severe weather.",
    features: [
      "Zero dependence on DISCOM grid supply",
      "Advanced Lithium-ion / Tubular battery storage",
      "Ideal for farmhouses, shops, & remote areas",
    ],
    ctaText: "Get Battery Solar Quote",
    ctaHref: "/contact?type=quote",
  },
  {
    id: "hybrid",
    title: "Hybrid Solar (Grid + Battery)",
    subtitle: "Grid Bill Savings + Battery Power Backup",
    category: "rooftop",
    categoryLabel: "Rooftop Solar",
    badge: "SMART DUAL POWER",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30",
    image: "/services/Hybrid%20Solar%20(Grid%20+%20Battery).png",
    alt: "Hybrid Solar Grid and Battery System",
    capacityRange: "3 kW - 100 kW",
    description:
      "The ultimate smart solar configuration. Saves big on monthly bills through grid net-metering while storing backup power in batteries for seamless cutover during blackouts.",
    features: [
      "Sub-10ms automatic switchover during power cuts",
      "Feeds excess energy to grid after charging battery",
      "Smart mobile app for live yield tracking",
    ],
    ctaText: "Explore Hybrid Setup",
    ctaHref: "/calculator?type=commercial",
  },
  {
    id: "pumps",
    title: "Solar Water Pumps (For Farms)",
    subtitle: "PM-KUSUM Subsidized Agricultural Pumps",
    category: "agriculture",
    categoryLabel: "Agriculture & Lighting",
    badge: "UP TO 90% SUBSIDY",
    badgeColor: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30",
    image: "/services/Solar%20Water%20Pumps%20(For%20Farms).png",
    alt: "Solar Water Pumps for Agriculture",
    capacityRange: "3 HP - 10 HP PUMPS",
    description:
      "High-performance solar powered borewell & surface water pumps for farm irrigation. Zero diesel expenses and zero electricity bills for Odisha agricultural lands.",
    features: [
      "Up to 90% Govt subsidy under PM-KUSUM scheme",
      "Heavy-duty AC/DC surface & submersible pumps",
      "Cyclone-resistant GI structure with dry-run protection",
    ],
    ctaText: "Pre-Register PM-KUSUM",
    ctaHref: "#",
    isKusumModal: true,
  },
  {
    id: "street-lights",
    title: "Solar Street Lights",
    subtitle: "Automatic All-in-One Outdoor Lighting",
    category: "agriculture",
    categoryLabel: "Agriculture & Lighting",
    badge: "DUSK-TO-DAWN AUTO",
    badgeColor: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30",
    image: "/services/Solar%20Street%20Lights.png",
    alt: "Solar Street Lights System",
    capacityRange: "12W - 120W LED",
    description:
      "Integrated standalone solar street lights with built-in solar panels, intelligent dusk-to-dawn sensors, and long-life LiFePO4 battery packs.",
    features: [
      "Automatic switch ON at dusk & OFF at dawn",
      "Zero cabling, wiring or monthly power bills",
      "IP65 waterproof & rust-proof steel poles",
    ],
    ctaText: "Request Lighting Quote",
    ctaHref: "/contact?type=quote",
  },
  {
    id: "net-metering",
    title: "Net Metering & Govt Subsidy Help",
    subtitle: "100% DISCOM Liaison & Paperwork Approval",
    category: "liaison",
    categoryLabel: "Liaison & O&M",
    badge: "100% DISCOM APPROVAL",
    badgeColor: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30",
    image: "/services/Net%20Metering%20&%20Govt%20Subsidy%20Help.png",
    alt: "Net Metering and Government Subsidy Approval",
    capacityRange: "ALL CAPACITY SIZES",
    description:
      "Complete end-to-end liaison with TPCODL, TPNODL, TPSODL & TPWODL. Full documentation, national portal registration, net meter installation & direct subsidy disbursement.",
    features: [
      "Full PM Surya Ghar national portal filing",
      "Official bi-directional meter testing & installation",
      "Direct bank transfer subsidy guarantee",
    ],
    ctaText: "Start Subsidy Approval",
    ctaHref: "/contact?type=site-visit",
  },
  {
    id: "maintenance",
    title: "Solar Care & Maintenance",
    subtitle: "Comprehensive AMC & Module Cleaning",
    category: "liaison",
    categoryLabel: "Liaison & O&M",
    badge: "25-YEAR SYSTEM HEALTH",
    badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30",
    image: "/services/Solar%20Care%20&%20Maintenance.png",
    alt: "Solar Maintenance and Panel Cleaning Service",
    capacityRange: "ANNUAL CARE (AMC)",
    description:
      "Ensure your rooftop solar plant delivers 100% maximum energy output. Regular panel washing, electrical thermal audits, inverter health checks & fast local repairs across Odisha.",
    features: [
      "De-mineralized water high-pressure panel washing",
      "Thermal hot-spot scanning & cable safety audits",
      "Rapid local technician dispatch within 24 hours",
    ],
    ctaText: "Book Solar Inspection",
    ctaHref: "/contact?type=site-visit",
  },
];
