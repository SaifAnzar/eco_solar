"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Zap, FileCheck, MapPin } from "lucide-react";
import EligibilityModal from "@/components/forms/EligibilityModal";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function DiscomLiaison() {
  const [isEligibilityOpen, setIsEligibilityOpen] = useState(false);

  const steps = [
    {
      step: "01",
      title: "We Apply on Your Behalf",
      description: "We fill and submit your application on the PM Surya Ghar portal and your local electricity office within 24 hours of installation.",
      color: "from-emerald-500 to-teal-500",
      glow: "rgba(16,185,129,0.3)",
    },
    {
      step: "02",
      title: "Electricity Office Inspection",
      description: "The electricity department sends their team to inspect your system. We coordinate and handle this for you — no stress on your end.",
      color: "from-cyan-500 to-sky-500",
      glow: "rgba(6,182,212,0.3)",
    },
    {
      step: "03",
      title: "Panel & Inverter Installation",
      description: "Our trained team installs your solar panels, inverter, and all connections to the highest safety standards.",
      color: "from-amber-400 to-orange-500",
      glow: "rgba(245,158,11,0.3)",
    },
    {
      step: "04",
      title: "New Meter Fitted — You Start Saving",
      description: "A two-way meter is fitted so extra electricity your panels make goes back to the grid, reducing your next bill further.",
      color: "from-violet-500 to-purple-600",
      glow: "rgba(139,92,246,0.3)",
    },
  ];

  const discoms = [
    { name: "TPCODL", region: "Central Odisha — Bhubaneswar, Cuttack, Puri, Khordha, Nayagarh" },
    { name: "TPNODL", region: "North Odisha — Balasore, Bhadrak, Mayurbhanj, Keonjhar" },
    { name: "TPSODL", region: "South Odisha — Ganjam, Gajapati, Rayagada, Koraput" },
    { name: "TPWODL", region: "West Odisha — Sambalpur, Jharsuguda, Rourkela, Bargarh" },
  ];

  return (
    <section id="discom" className="relative py-20 sm:py-28 overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 90% 10%, rgba(16,185,129,0.05) 0%, transparent 50%), radial-gradient(circle at 10% 90%, rgba(6,182,212,0.05) 0%, transparent 50%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-start">

          {/* ── LEFT */}
          <motion.div className="lg:col-span-5 space-y-7" {...fadeUp(0.05)}>
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full">
                <FileCheck className="w-3.5 h-3.5" />
                We Handle All Paperwork
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                We Get Your Meter Approved.{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg,#10b981,#06b6d4)" }}>
                  You Relax.
                </span>
              </h2>
              <p className="text-slate-500 text-base leading-relaxed">
                Getting meter approval from the electricity office can be confusing. We handle all of it — forms, inspections, and follow-ups — across all parts of Odisha.
              </p>
            </div>

            {/* DISCOM zones card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 uppercase tracking-widest">
                <MapPin className="w-3.5 h-3.5" />
                We Serve All Odisha Electricity Zones
              </div>
              <div className="space-y-2.5">
                {discoms.map((d, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-md bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                      <Zap className="w-3 h-3 text-white" />
                    </span>
                    <div>
                      <span className="font-bold text-slate-900 text-xs">{d.name}: </span>
                      <span className="text-slate-500 text-xs">{d.region}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button type="button" onClick={() => setIsEligibilityOpen(true)}
              className="inline-flex items-center gap-2.5 py-4 px-7 rounded-xl font-bold text-sm text-white cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.99]"
              style={{
                background: "linear-gradient(135deg,#10b981 0%,#059669 100%)",
                boxShadow: "0 0 24px rgba(16,185,129,0.4), 0 4px 16px rgba(0,0,0,0.15)",
              }}>
              Check If I Am Eligible
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* ── RIGHT: Process Steps */}
          <motion.div className="lg:col-span-7" {...fadeUp(0.15)}>
            <div className="relative rounded-3xl border border-slate-200 bg-white p-8 shadow-xl overflow-hidden">
              {/* Subtle background gradient */}
              <div className="absolute inset-0 pointer-events-none rounded-3xl"
                style={{ background: "radial-gradient(ellipse at 100% 0%, rgba(16,185,129,0.04) 0%, transparent 60%)" }} />

              <div className="relative flex items-center justify-between pb-5 mb-7 border-b border-slate-100">
                <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                  How We Get Your Meter Approved
                </h3>
                <span className="text-xs font-mono text-emerald-700 font-bold px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-200">
                  Done in 15–30 Days
                </span>
              </div>

              <div className="relative space-y-0">
                {steps.map((item, idx) => (
                  <div key={idx} className="relative flex items-start gap-5 pb-8 last:pb-0">
                    {/* Connector line */}
                    {idx !== steps.length - 1 && (
                      <div className="absolute left-5 top-12 bottom-0 w-0.5"
                        style={{ background: "linear-gradient(to bottom, rgba(16,185,129,0.3), rgba(226,232,240,0.5))" }} />
                    )}

                    {/* Step number badge */}
                    <div className={`relative shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md z-10`}
                      style={{ boxShadow: `0 4px 14px ${item.glow}` }}>
                      <span className="text-white text-xs font-bold font-mono">{item.step}</span>
                    </div>

                    <div className="pt-1 space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative mt-6 pt-5 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-700">
                <FileCheck className="w-4 h-4 shrink-0" />
                We also handle your entire government subsidy claim process
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <EligibilityModal isOpen={isEligibilityOpen} onClose={() => setIsEligibilityOpen(false)} />
    </section>
  );
}
