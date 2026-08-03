import React from "react";
import { Cpu, ShieldCheck, Zap, Layers, Check, Wrench } from "lucide-react";

export default function HardwarePartners() {
  const hardwareItems = [
    {
      category: "SOLAR PV MODULES",
      brand: "Waaree & Adani Solar",
      specs: "600W+ Wp MonoPERC / TOPCon Bifacial",
      description: "Tier-1 ALMM listed panels with 22.8% module efficiency and 30-year linear performance warranty.",
      icon: Cpu,
    },
    {
      category: "STRING INVERTERS",
      brand: "Sunora & Statcon",
      specs: "Grid-Tied Dual MPPT with Wi-Fi Telemetry",
      description: "98.6% peak efficiency inverters with IP65 weatherproofing, anti-islanding protection, and online monitoring.",
      icon: Zap,
    },
    {
      category: "POWER ELECTRONICS",
      brand: "Servotech Power",
      specs: "Heavy-Duty Hybrid & Off-Grid PCUs",
      description: "DSP controlled power units designed for harsh coastal Odisha voltage fluctuations and grid outages.",
      icon: ShieldCheck,
    },
    {
      category: "SOLAR CABLE & CABLING",
      brand: "Polycab & KEI Cables",
      specs: "Tinned Copper Cross-Linked Polyolefin (XLPO)",
      description: "UV-resistant, flame-retardant DC cables rated for 1500V system voltage and 25-year outdoor durability.",
      icon: Layers,
    },
    {
      category: "MOUNTING STRUCTURES (MMS)",
      brand: "Custom Industrial MMS",
      specs: "Hot-Dip Galvanized Iron (80 Micron Coating)",
      description: "Engineered specifically for coastal Odisha cyclone conditions with 150 km/h wind load capacity.",
      icon: Wrench,
    },
    {
      category: "SAFETY & GROUNDING",
      brand: "IS 3043 Chemical Earthing",
      specs: "Maintenance-Free Gel Fill Grounding Rods",
      description: "Dedicated earthing pits for AC, DC, and Type-II Surge Protection Devices (SPD) with lightning arrestors.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="hardware" className="py-20 bg-white border-y border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-6 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
              TIER-1 HARDWARE SPECIFICATIONS
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Industrial-Grade Components Only
            </h2>
          </div>
          <p className="text-xs text-slate-600 max-w-md mt-3 md:mt-0">
            Pragati EcoSolar exclusively deploys ALMM-approved Tier-1 equipment to guarantee maximum solar yield and uninterrupted 25-year plant operation in Odisha weather.
          </p>
        </div>

        {/* Vendor & Specs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hardwareItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAFAFA] p-6 rounded-2xl border border-slate-200 hover:border-emerald-500/50 transition-all flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                      {item.category}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-900 text-amber-400">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {item.brand}
                  </h3>
                  <div className="inline-block mt-1 text-xs font-mono text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 font-bold">
                    {item.specs}
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center space-x-1 text-[11px] text-slate-600 font-mono">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>25-Year Performance Guarantee Deployed</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Component Vendor Badges Bar */}
        <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
          <span className="text-[11px] font-mono uppercase text-slate-500 tracking-wider block mb-4 font-bold">
            APPROVED OEM & VENDOR PARTNERS IN ODISHA
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs font-bold text-slate-800">
            {["WAAREE SOLAR", "ADANI SOLAR", "SUNORA", "STATCON POWER", "SERVOTECH", "POLYCAB", "KEI CABLE", "IS 3043 EARTHING"].map((partner, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-white rounded-xl border border-slate-200 hover:border-slate-300 text-slate-900 shadow-sm"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
