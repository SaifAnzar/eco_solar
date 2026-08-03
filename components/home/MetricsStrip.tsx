import React from "react";
import { Zap, Award, Sun, Clock } from "lucide-react";

export default function MetricsStrip() {
  const metrics = [
    {
      value: "400+",
      label: "Executed Plant Installations",
      subtext: "Across Patia, Bhubaneswar, Cuttack & Coastal Odisha",
      icon: Award,
      accent: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      value: "₹78,000",
      label: "Max Central Subsidy Deduction",
      subtext: "PM Surya Ghar Direct Bank Transfer (DBT)",
      icon: Zap,
      accent: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      value: "1,460 Units",
      label: "Annual Generation per kW",
      subtext: "Based on 4.5 Peak Sun Hours (Odisha Average)",
      icon: Sun,
      accent: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      value: "15-Day",
      label: "DISCOM Net-Metering Turnaround",
      subtext: "TPCODL, TPNODL, TPSODL & TPWODL Liaison",
      icon: Clock,
      accent: "text-amber-600 bg-amber-50 border-amber-200",
    },
  ];

  return (
    <section className="py-12 bg-[#FAFAFA] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 shadow-sm rounded-xl p-6 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl border ${m.accent}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                    BENCHMARK
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
                    {m.value}
                  </div>
                  <div className="text-sm font-bold text-slate-800 mt-1">
                    {m.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 leading-normal">
                    {m.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
