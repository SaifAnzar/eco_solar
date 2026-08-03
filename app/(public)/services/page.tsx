import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Home, Building2, Sprout, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Solar EPC Services Odisha | Pragati EcoSolar Bhubaneswar",
  description: "Turnkey rooftop solar installation services under PM Surya Ghar (Residential), C&I CAPEX/OPEX (80% AD), and PM-KUSUM (Solar Pumps) across Odisha.",
};

export default function ServicesPage() {
  const services = [
    {
      id: "residential",
      title: "Residential Rooftop Solar (PM Surya Ghar)",
      capacity: "1 kW to 10 kW Packages",
      subsidy: "Up to ₹78,000 Direct Central Subsidy",
      href: "/services/residential",
      description: "Complete turnkey solar installation for Odisha homeowners. Includes 3D roof analysis, Waaree/Adani TOPCon panels, and full DISCOM net-metering liaison.",
      features: ["₹30,000 for 1 kW | ₹60,000 for 2 kW | ₹78,000 for 3–10 kW", "150 km/h Wind Load Hot-Dip Galvanized Mounting", "TPCODL / TPNODL / TPSODL / TPWODL Meter Approval"],
    },
    {
      id: "commercial",
      title: "Commercial & Industrial (C&I) EPC",
      capacity: "10 kW to 500 kW+ CAPEX & OPEX",
      subsidy: "80% Accelerated Depreciation Tax Write-Off",
      href: "/services/commercial",
      description: "High-yield solar power plant installation for factories, warehouses, schools, and commercial buildings across Odisha with 2.8 to 3.5 year payback horizon.",
      features: ["CAPEX & Zero Upfront OPEX / PPA Financing Models", "80% Accelerated Depreciation Tax Benefits", "Statcon / Servotech Grid Inverters with Telemetry"],
    },
    {
      id: "solar-pumps",
      title: "Agricultural Solar Water Pumps (PM-KUSUM)",
      capacity: "3 HP to 10 HP Solar Pumps",
      subsidy: "Up to 90% Combined Govt Subsidy",
      href: "/services/solar-pumps",
      description: "Empowering farmers across Odisha with reliable off-grid and grid-tied solar irrigation pumps under the PM-KUSUM scheme.",
      features: ["High-head Submersible & Surface Solar DC/AC Pumps", "IS 3043 Chemical Earthing & Surge Protection", "Eliminates Diesel Generator Costs"],
    },
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold px-3.5 py-1 bg-amber-50 border border-amber-200 rounded-full inline-block">
            ENGINEERING SERVICES & CAPABILITIES
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Turnkey Solar EPC Engineering Across Odisha
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            From quick-payback home solar under PM Surya Ghar to industrial rooftop power plants and agricultural irrigation solar pumps.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="inline-block text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-md border border-amber-200 uppercase">
                  {svc.subsidy}
                </div>
                <h2 className="text-xl font-bold text-slate-900">{svc.title}</h2>
                <div className="text-xs font-mono font-bold text-emerald-700">{svc.capacity}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{svc.description}</p>
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  {svc.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <Link
                  href={svc.href}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all"
                >
                  <span>Explore Service Specs</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
