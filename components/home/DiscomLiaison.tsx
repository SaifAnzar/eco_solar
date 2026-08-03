import React from "react";
import { CheckCircle2, ArrowRight, Zap, FileCheck } from "lucide-react";

export default function DiscomLiaison() {
  const discomSteps = [
    {
      step: "01",
      title: "Technical Feasibility Application",
      description: "We file the rooftop solar application on the National PM Surya Ghar Portal / DISCOM Unified Portal within 24 hours.",
    },
    {
      step: "02",
      title: "DISCOM Feasibility Approval",
      description: "Discom engineers verify local transformer capacity and issue formal technical approval (15-30 day SLA).",
    },
    {
      step: "03",
      title: "Precision EPC Installation",
      description: "Our certified engineering team installs hot-dip MMS, Tier-1 TOPCon panels, and chemical earthing to DISCOM standards.",
    },
    {
      step: "04",
      title: "Bi-Directional Meter Sync",
      description: "DISCOM safety inspection, bi-directional net-meter testing, and commissioning certificate issuance for solar bill credits.",
    },
  ];

  const discoms = [
    { name: "TPCODL", region: "Central Odisha (Bhubaneswar, Cuttack, Puri, Khordha, Nayagarh)" },
    { name: "TPNODL", region: "Northern Odisha (Balasore, Bhadrak, Mayurbhanj, Keonjhar)" },
    { name: "TPSODL", region: "Southern Odisha (Ganjam, Gajapati, Rayagada, Koraput)" },
    { name: "TPWODL", region: "Western Odisha (Sambalpur, Jharsuguda, Rourkela, Bargarh)" },
  ];

  return (
    <section id="discom" className="py-24 bg-[#FAFAFA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Information */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full inline-block">
              ZERO-HASSLE NET METERING
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Complete Odisha DISCOM Liaison & Approval Guarantee
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Navigating utility net-metering approvals can be daunting for homeowners and business owners. Pragati EcoSolar manages 100% of the DISCOM paperwork, meter procurement, testing, and grid synchronization.
            </p>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
              <div className="text-xs font-mono font-bold text-amber-700 uppercase">
                COVERED UTILITY DISCOMS IN ODISHA:
              </div>
              <div className="space-y-2 text-xs">
                {discoms.map((d, i) => (
                  <div key={i} className="flex items-start space-x-2 text-slate-700">
                    <Zap className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900">{d.name}:</strong> {d.region}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a
                href="/calculator"
                className="inline-flex items-center space-x-2 py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all"
              >
                <span>Check Net Metering Feasibility</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Process Workflow Timeline */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl relative">
            <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Net-Metering Approval Timeline
              </h3>
              <span className="text-xs font-mono text-emerald-800 font-bold px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200">
                15 - 30 Days SLA
              </span>
            </div>

            <div className="space-y-6">
              {discomSteps.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4 relative">
                  {idx !== discomSteps.length - 1 && (
                    <div className="absolute left-5 top-10 bottom-0 w-0.5 bg-slate-200"></div>
                  )}
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 font-mono font-bold text-sm flex items-center justify-center shrink-0 z-10">
                    {item.step}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-slate-900">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-mono">
              <span className="flex items-center space-x-1 font-bold text-emerald-700">
                <FileCheck className="w-4 h-4" />
                <span>100% Subsidy Direct Bank Credit Assistance</span>
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
