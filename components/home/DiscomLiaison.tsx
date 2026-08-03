import React from "react";
import { CheckCircle2, ArrowRight, Zap, FileCheck } from "lucide-react";

export default function DiscomLiaison() {
  const steps = [
    {
      step: "01",
      title: "We Apply on Your Behalf",
      description: "We fill and submit your solar application on the PM Surya Ghar portal and your local electricity office within 24 hours of installation.",
    },
    {
      step: "02",
      title: "Electricity Office Inspection",
      description: "The electricity department sends their team to inspect your solar system. We coordinate and handle this for you — no stress.",
    },
    {
      step: "03",
      title: "Panel & Inverter Installation",
      description: "Our trained team installs your solar panels, inverter, and all connections to the highest safety standards.",
    },
    {
      step: "04",
      title: "New Meter Fitted — You Start Saving",
      description: "A two-way meter is fitted so the extra electricity your panels make goes back to the grid, reducing your next bill further.",
    },
  ];

  const discoms = [
    { name: "TPCODL", region: "Central Odisha — Bhubaneswar, Cuttack, Puri, Khordha, Nayagarh" },
    { name: "TPNODL", region: "North Odisha — Balasore, Bhadrak, Mayurbhanj, Keonjhar" },
    { name: "TPSODL", region: "South Odisha — Ganjam, Gajapati, Rayagada, Koraput" },
    { name: "TPWODL", region: "West Odisha — Sambalpur, Jharsuguda, Rourkela, Bargarh" },
  ];

  return (
    <section id="discom" className="py-24 bg-[#FAFAFA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full inline-block">
              WE HANDLE ALL PAPERWORK
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              We Get Your Electricity Meter Approved — You Relax.
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Getting meter approval from the electricity office can be confusing. We handle all of it — forms, inspections, and follow-ups — across all parts of Odisha.
            </p>

            <div className="p-5 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
              <div className="text-xs font-mono font-bold text-amber-700 uppercase">
                WE SERVE ALL ODISHA ELECTRICITY ZONES:
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
                <span>Check If I Am Eligible</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Process Steps */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl relative">
            <div className="flex justify-between items-center pb-4 mb-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                How We Get Your Meter Approved
              </h3>
              <span className="text-xs font-mono text-emerald-800 font-bold px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200">
                Done in 15–30 Days
              </span>
            </div>

            <div className="space-y-6">
              {steps.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-4 relative">
                  {idx !== steps.length - 1 && (
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
                <span>We also help you claim your government subsidy</span>
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
