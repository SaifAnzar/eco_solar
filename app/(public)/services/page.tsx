import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Solar Installation Services Odisha | Pragati EcoSolar Bhubaneswar",
  description: "Solar panel installation for homes, factories, and farms in Odisha. Get government subsidy up to ₹78,000 under PM Surya Ghar. Full meter approval support included.",
};

export default function ServicesPage() {
  const services = [
    {
      id: "residential",
      title: "Solar for Your Home",
      capacity: "1 kW to 10 kW Systems",
      subsidy: "Get up to ₹78,000 Government Subsidy",
      href: "/services/residential",
      description: "We install rooftop solar panels on your home and handle everything — site visit, panels, installation, and electricity meter approval. You don't have to deal with any paperwork.",
      features: [
        "₹30,000 for 1 kW | ₹60,000 for 2 kW | ₹78,000 for 3 kW or more",
        "Strong steel frames built to survive Odisha cyclones",
        "Electricity meter approval for all Odisha districts",
      ],
    },
    {
      id: "commercial",
      title: "Solar for Offices & Factories",
      capacity: "10 kW to 500 kW+ Systems",
      subsidy: "Save 80% on Business Tax in Year 1",
      href: "/services/commercial",
      description: "Cut your factory or office electricity bill by up to 80%. We install large solar systems for businesses across Odisha with easy payment options and guaranteed returns.",
      features: [
        "Pay upfront (CAPEX) or start with zero upfront cost (OPEX/PPA)",
        "80% tax saving on solar investment in the first year",
        "Smart inverters with phone-based monitoring app",
      ],
    },
    {
      id: "solar-pumps",
      title: "Solar Water Pumps for Farmers",
      capacity: "3 HP to 10 HP Pump Systems",
      subsidy: "Up to 90% Subsidy from Government",
      href: "/services/solar-pumps",
      description: "Power your farm's water pump with solar energy. No more electricity bills or diesel costs. We install government-approved solar pumps under the PM-KUSUM scheme.",
      features: [
        "Up to 90% cost covered by government subsidy",
        "Works for both surface and borewell pumps",
        "No diesel, no electricity bill — water all day using sunlight",
      ],
    },
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold px-3.5 py-1 bg-amber-50 border border-amber-200 rounded-full inline-block">
            SOLAR SERVICES IN ODISHA
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            We Install Solar for Every Need
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Whether you are a homeowner, a business owner, or a farmer — we have the right solar solution for you. All our installations come with full government support and long-term warranty.
          </p>
        </div>

        {/* Services Cards Grid */}
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
                  <span>Learn More</span>
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
