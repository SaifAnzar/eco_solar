"use client";

import React from "react";
import { ShieldCheck, Award, CheckCircle2 } from "lucide-react";

export default function BrandLogos() {
  const brandLogos = [
    {
      name: "TATA POWER SOLAR",
      tagline: "Tier-1 ALMM Approved Modules",
      color: "#00529B",
      bgGradient: "from-blue-600/10 to-indigo-600/10",
      accentBorder: "border-blue-500/30",
    },
    {
      name: "ADANI SOLAR",
      tagline: "Monocrystalline PERC Panels",
      color: "#1F2937",
      bgGradient: "from-slate-700/10 to-slate-900/10",
      accentBorder: "border-slate-500/30",
    },
    {
      name: "WAAREE ENERGIES",
      tagline: "India's Largest Solar Manufacturer",
      color: "#D97706",
      bgGradient: "from-amber-500/10 to-orange-500/10",
      accentBorder: "border-amber-500/30",
    },
    {
      name: "HAVELLS SOLAR",
      tagline: "High-Efficiency On-Grid Inverters",
      color: "#DC2626",
      bgGradient: "from-red-600/10 to-rose-600/10",
      accentBorder: "border-red-500/30",
    },
    {
      name: "GROWATT",
      tagline: "Smart String Grid Inverters",
      color: "#059669",
      bgGradient: "from-emerald-600/10 to-teal-600/10",
      accentBorder: "border-emerald-500/30",
    },
    {
      name: "MICROTEK",
      tagline: "Solar PCUs & Hybrid Inverters",
      color: "#2563EB",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      accentBorder: "border-blue-400/30",
    },
    {
      name: "LUMINOUS",
      tagline: "Solar Power Systems & Batteries",
      color: "#7C3AED",
      bgGradient: "from-purple-600/10 to-indigo-600/10",
      accentBorder: "border-purple-500/30",
    },
    {
      name: "POLYCAB",
      tagline: "Heavy Duty Solar DC Wiring",
      color: "#EA580C",
      bgGradient: "from-orange-600/10 to-amber-600/10",
      accentBorder: "border-orange-500/30",
    },
    {
      name: "STATCON POWER",
      tagline: "Commercial Solar Power Conditioning",
      color: "#0D9488",
      bgGradient: "from-teal-600/10 to-cyan-600/10",
      accentBorder: "border-teal-500/30",
    },
  ];

  return (
    <div className="mt-12 p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold px-3 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-full inline-block">
            AUTHORIZATION & HARDWARE CO-EMPANELMENT
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1.5">
            Empaneled Tier-1 Solar Panel & Inverter Partners
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-mono font-bold bg-emerald-50 dark:bg-emerald-950/40 px-4 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>MNRE & ALMM Compliant</span>
        </div>
      </div>

      {/* Brand Logos Responsive Grid with Grayscale to Color Hover Effect */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {brandLogos.map((brand, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl border ${brand.accentBorder} bg-gradient-to-br ${brand.bgGradient} bg-white dark:bg-slate-900/60 shadow-sm hover:shadow-lg filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-102 flex flex-col justify-between group cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-slate-900 text-amber-400">
                TIER-1 BRAND
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 group-hover:scale-110 transition-transform" />
            </div>

            <div className="my-2">
              <div className="text-base sm:text-lg font-black tracking-tight text-slate-900 dark:text-white group-hover:text-amber-600 transition-colors">
                {brand.name}
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium mt-0.5">
                {brand.tagline}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[10px] font-mono text-slate-500 dark:text-slate-400">
              25-Year Performance Warranty
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
