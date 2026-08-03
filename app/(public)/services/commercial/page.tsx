import React from "react";
import Link from "next/link";
import { Building2, ArrowRight, TrendingUp, Calculator, SunMedium, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Commercial & Industrial Solar EPC Odisha | 80% AD Benefit | Pragati EcoSolar",
  description: "High-yield commercial rooftop solar for factories, hospitals, warehouses & hotels in Odisha with 80% Accelerated Depreciation tax write-off and CAPEX/OPEX models.",
};

export default function CommercialServicesPage() {
  const benefits = [
    {
      title: "80% Accelerated Depreciation (AD)",
      description: "Claim 80% depreciation write-off in Year 1 under Income Tax Act Section 32, substantially lowering corporate tax liability.",
    },
    {
      title: "60% - 80% Monthly Bill Reduction",
      description: "Replace expensive commercial grid tariff (₹7.5–₹9.0/unit) with levelized solar power cost of ~₹2.2/unit.",
    },
    {
      title: "CAPEX & OPEX/PPA Financing Models",
      description: "Choose direct ownership (CAPEX) or zero-upfront investment (OPEX/PPA) where you only pay for generated solar units.",
    },
    {
      title: "Statcon / Servotech Heavy Duty Inverters",
      description: "Grid-tied 3-phase string inverters with remote cloud telemetry, anti-islanding protection, and dual MPPT trackers.",
    },
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>COMMERCIAL & INDUSTRIAL (C&I) EPC</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Commercial Solar Power Plants in Odisha
          </h1>

          <p className="text-slate-600 text-base max-w-3xl leading-relaxed">
            Turn unused factory, hospital, warehouse, or school rooftops into high-yield power generation assets. Pragati EcoSolar delivers turnkey 10 kW to 500 kW+ CAPEX & OPEX solar projects with 80% Accelerated Depreciation tax write-offs across Odisha.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/calculator"
              className="inline-flex items-center space-x-2 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all font-mono"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Commercial Solar ROI</span>
            </Link>
            <a
              href="tel:+919124318222"
              className="inline-flex items-center space-x-2 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl transition-all font-mono"
            >
              <span>Request Energy Audit (+91 9124318222)</span>
            </a>
          </div>
        </div>

        {/* C&I Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((b, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 w-fit">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">{b.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>

        {/* Highlight Banner for Institutional & Rural Solar Street Lighting */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl">
              <SunMedium className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase text-emerald-700 font-bold tracking-wider">
                MUNICIPAL & RURAL LIGHTING SPECIALIZATION
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Institutional & All-in-One Solar Street Lighting
              </h2>
            </div>
          </div>

          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-4xl">
            Pragati EcoSolar supplies and deploys MNRE-approved integrated All-in-One Solar Street Lighting systems (30W to 100W LED) for municipal panchayats, industrial campus perimeter security, educational institutes, and highway corridors across Odisha.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <strong className="text-slate-900 block font-bold">LiFePO4 Lithium Battery</strong>
              <span className="text-slate-500 text-[11px]">5+ Year Battery Lifespan</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <strong className="text-slate-900 block font-bold">Smart Motion Sensor</strong>
              <span className="text-slate-500 text-[11px]">Dusk-to-Dawn Auto Dimming</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <strong className="text-slate-900 block font-bold">IP65 Weatherproof</strong>
              <span className="text-slate-500 text-[11px]">Heavy-Duty HDG Pole Mount</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <strong className="text-slate-900 block font-bold">DISCOM & MNRE Standard</strong>
              <span className="text-slate-500 text-[11px]">Govt Tender Compliant</span>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-slate-900 p-8 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Need a custom 50 kW to 500 kW industrial proposal?</h3>
            <p className="text-xs text-slate-400">Get a detailed engineering shadow audit & 80% AD tax report for your business in Patia, Bhubaneswar.</p>
          </div>
          <Link
            href="/calculator"
            className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 shrink-0 font-mono"
          >
            <span>Launch Solar ROI Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
