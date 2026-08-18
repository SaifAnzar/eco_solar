"use client";

import React from "react";

export interface StepItem {
  step: number;
  title: string;
  description: string;
  headerBg: string;
}

export const PROJECT_STEPS: StepItem[] = [
  {
    step: 1,
    title: "Documents",
    description: "Collect customer KYC, property docs, electricity bill",
    headerBg: "bg-[#1E2D42]", // Dark Navy
  },
  {
    step: 2,
    title: "Portal Login",
    description: "We register on PM Suryaghar & create WhatsApp group",
    headerBg: "bg-[#1E2D42]", // Dark Navy
  },
  {
    step: 3,
    title: "Bank Docs",
    description: "We prepare & send loan documents to bank via dealer",
    headerBg: "bg-[#1E2D42]", // Dark Navy
  },
  {
    step: 4,
    title: "Loan Approval",
    description: "Bank disburses loan — we notify you immediately",
    headerBg: "bg-[#5B9A37]", // Mid Green
  },
  {
    step: 5,
    title: "Installation",
    description: "We schedule & complete installation within 1–2 days",
    headerBg: "bg-[#5B9A37]", // Mid Green
  },
  {
    step: 6,
    title: "DISCOM & Net Metering",
    description: "Our team handles all paperwork & payments",
    headerBg: "bg-[#5B9A37]", // Mid Green
  },
  {
    step: 7,
    title: "Inspection & Subsidy",
    description: "We apply for inspection then submit subsidy claim",
    headerBg: "bg-[#2B661B]", // Dark Green
  },
  {
    step: 8,
    title: "Subsidy Released",
    description: "Customer receives subsidy in bank. Project complete!",
    headerBg: "bg-[#2B661B]", // Dark Green
  },
];

export default function StepByStepProcess() {
  return (
    <section id="step-by-step-process" className="py-16 sm:py-20 bg-slate-50/70 font-sans border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-100/80 border border-emerald-300 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-900 font-bold">
              COMPLETE PROCESS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight pt-1">
            Step-by-Step Project Process
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From initial documentation collection to final bank subsidy credit — our transparent 8-step project execution roadmap.
          </p>
        </div>

        {/* 8-Step Grid (2 Rows of 4 Cards on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROJECT_STEPS.map((item, idx) => {
            const isRowEnd = (idx + 1) % 4 === 0;

            return (
              <div key={item.step} className="relative flex flex-col group">
                {/* Step Card Container */}
                <div className="bg-white border border-slate-200/90 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  
                  {/* Step Card Header */}
                  <div className={`${item.headerBg} text-white px-4 py-3.5 flex items-center gap-3.5 font-sans`}>
                    <span className="font-extrabold text-xl font-mono leading-none tracking-tight">
                      {item.step}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base leading-snug tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Step Card Content */}
                  <div className="p-5 bg-white flex-1 flex items-center">
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Connecting Node Line (On Desktop between cards in the same row) */}
                {!isRowEnd && (
                  <div className="hidden lg:flex items-center absolute -right-3.5 top-6 z-10 translate-x-1/2 pointer-events-none">
                    <div className="w-3 h-0.5 bg-emerald-600" />
                    <div className="w-2.5 h-2.5 bg-emerald-600 border-2 border-white rounded-xs shadow-xs" />
                    <div className="w-3 h-0.5 bg-emerald-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
