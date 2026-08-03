import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Cpu, CheckCircle2, ShieldCheck, Zap, Calculator } from "lucide-react";

interface ProductDetailProps {
  params: Promise<{ slug: string }>;
}

const PRODUCTS_DATA: Record<string, {
  name: string;
  category: string;
  specs: string;
  description: string;
  features: string[];
  warranty: string;
}> = {
  "waaree-600w-topcon": {
    name: "Waaree 600W+ Wp TOPCon Bifacial Solar Module",
    category: "Solar PV Modules",
    specs: "600W Wp MonoPERC / TOPCon (22.8% Module Efficiency)",
    description: "Tier-1 MNRE ALMM listed high-efficiency TOPCon bifacial module designed for maximum power output in high-humidity coastal Odisha climates.",
    features: [
      "22.8% Maximum Module Efficiency",
      "Bifacial generation gain up to 25% from rear side albedo",
      "Low Temperature Coefficient (-0.30%/°C) for extreme summer heat",
      "PID resistant cell technology & IP68 junction box",
    ],
    warranty: "12-Year Product Warranty & 30-Year Linear Power Warranty",
  },
  "statcon-grid-inverter": {
    name: "Statcon Dual MPPT Grid-Tied Inverter",
    category: "String Inverters",
    specs: "3 kW to 100 kW 3-Phase / 1-Phase (IP65 Weatherproof)",
    description: "Heavy-duty grid-tied solar inverter equipped with dual independent MPPT trackers and Wi-Fi cloud telemetry.",
    features: [
      "98.6% Maximum Peak Efficiency",
      "Wide MPPT Operating Voltage Range",
      "Integrated AC & DC Type-II Surge Protection Devices (SPD)",
      "Wi-Fi / GPRS Remote Monitoring & Telemetry App",
    ],
    warranty: "5-Year Replacement Warranty (Extendable to 10 Years)",
  },
  "polycab-xlpo-dc-cable": {
    name: "Polycab 1500V XLPO Solar DC Cable",
    category: "Cables & Wiring",
    specs: "4 sq.mm / 6 sq.mm Tinned Copper Cross-Linked Polyolefin",
    description: "UV-resistant and flame-retardant DC solar cable designed for 1500V system voltage and 25-year outdoor durability.",
    features: [
      "Halogen-free low smoke Flame Retardant material",
      "High thermal stability from -40°C to +120°C",
      "Tinned copper conductors for maximum corrosion resistance",
      "TUV / IS 17293 Certified",
    ],
    warranty: "25-Year Outdoor Operating Guarantee",
  },
  "is-3043-chemical-earthing": {
    name: "IS 3043 Chemical Maintenance-Free Earthing Pit",
    category: "Safety & Grounding",
    specs: "50mm Dia 3-Meter Copper Bonded Rods with Bentonite Fill",
    description: "Dedicated earthing system for AC, DC, and Lightning Arrestor circuits with bentonite backfill for low soil resistivity.",
    features: [
      "Zero maintenance chemical compound fill",
      "Copper bonded high tensile carbon steel core",
      "High fault current dissipation capability",
      "IS 3043 & IEC 62561 Compliant",
    ],
    warranty: "15-Year Zero-Maintenance Performance Guarantee",
  },
};

export async function generateMetadata({ params }: ProductDetailProps) {
  const { slug } = await params;
  const product = PRODUCTS_DATA[slug];
  if (!product) return { title: "Product Not Found | Pragati EcoSolar" };
  return {
    title: `${product.name} | Pragati EcoSolar`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { slug } = await params;
  const product = PRODUCTS_DATA[slug] || PRODUCTS_DATA["waaree-600w-topcon"];

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Link
          href="/products"
          className="inline-flex items-center space-x-2 text-xs font-mono text-slate-600 hover:text-slate-900 font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hardware Catalog</span>
        </Link>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200 uppercase">
              {product.category}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight pt-2">
              {product.name}
            </h1>
            <div className="text-xs font-mono text-emerald-700 font-bold">{product.specs}</div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs text-slate-800 font-bold flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Warranty: {product.warranty}</span>
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 uppercase font-mono">Technical Specifications & Features:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
            <Link
              href="/calculator"
              className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 font-mono"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Turnkey Quote with this Component</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
