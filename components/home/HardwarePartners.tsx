import React from "react";
import { Cpu, ShieldCheck, Zap, Layers, Check, Wrench } from "lucide-react";

export default function HardwarePartners() {
  const hardwareItems = [
    {
      category: "SOLAR PANELS",
      brand: "Waaree & Adani Solar",
      specs: "600W+ High-Efficiency Glass Panels",
      description: "Top-quality solar panels made in India with 25-year performance warranty. Approved for government subsidy.",
      icon: Cpu,
    },
    {
      category: "SOLAR INVERTERS",
      brand: "Sunora & Statcon",
      specs: "Smart Grid Inverters with Phone App",
      description: "Reliable inverters that convert solar power to electricity for your home or business. Monitor from your phone anytime.",
      icon: Zap,
    },
    {
      category: "BACKUP INVERTERS",
      brand: "Servotech Power",
      specs: "Works with Battery & Grid Together",
      description: "Perfect for areas with power cuts. Keeps your home running on solar even when the grid is down.",
      icon: ShieldCheck,
    },
    {
      category: "SOLAR WIRING",
      brand: "Polycab & KEI Cables",
      specs: "Heavy-Duty UV-Resistant Cables",
      description: "Heat-proof, weatherproof wires designed for outdoor use. Safe for 25+ years in Odisha's climate.",
      icon: Layers,
    },
    {
      category: "MOUNTING FRAMES",
      brand: "Custom Steel Structures",
      specs: "Rust-Proof Cyclone-Rated Steel Frame",
      description: "Strong steel frames custom-built to hold your panels safely — even during heavy Odisha cyclones at 150 km/h winds.",
      icon: Wrench,
    },
    {
      category: "SAFETY EARTHING",
      brand: "IS 3043 Certified Earthing",
      specs: "Maintenance-Free Grounding System",
      description: "Keeps your solar system safe from lightning and electrical faults. Mandatory for all safe solar installations.",
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
              WHAT GOES INTO YOUR SYSTEM
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Only the Best Equipment — No Shortcuts
            </h2>
          </div>
          <p className="text-xs text-slate-600 max-w-md mt-3 md:mt-0">
            We only use government-approved, branded solar equipment so your system runs perfectly for 25 years or more.
          </p>
        </div>

        {/* Hardware Grid */}
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
                  <span>25-Year Warranty Included</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand Badges */}
        <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
          <span className="text-[11px] font-mono uppercase text-slate-500 tracking-wider block mb-4 font-bold">
            OUR TRUSTED BRAND PARTNERS
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
