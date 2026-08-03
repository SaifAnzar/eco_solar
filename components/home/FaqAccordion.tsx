"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is the PM Surya Ghar Subsidy structure for Odisha homeowners?",
      answer:
        "Under the PM Surya Ghar: Muft Bijli Yojana, residential rooftop solar systems receive direct central financial assistance (subsidy) transferred into your bank account: ₹30,000 for 1 kW system, ₹60,000 for 2 kW system, and ₹78,000 maximum for systems between 3 kW and 10 kW. Pragati EcoSolar manages your full subsidy portal application from Patia, Bhubaneswar.",
    },
    {
      question: "How long does DISCOM Net Metering approval take in Bhubaneswar & Odisha?",
      answer:
        "Net metering approval across TPCODL (Central), TPNODL (North), TPSODL (South), and TPWODL (West) typically takes 15 to 30 working days from initial feasibility submission. Pragati EcoSolar handles all technical drawings, load sanctioning, site inspection coordination, and bi-directional meter testing.",
    },
    {
      question: "Are rooftop solar structures safe during coastal Odisha cyclones?",
      answer:
        "Yes. We use custom Hot-Dip Galvanized Module Mounting Structures (MMS) with 80-micron zinc coating and high-tensile stainless steel fasteners engineered for 150 km/h wind load resistance. Structures are anchored into RCC roof beams using chemical fasteners without causing roof leakage.",
    },
    {
      question: "What tax benefits are available for Commercial & Industrial (C&I) solar in Odisha?",
      answer:
        "Commercial and industrial businesses can claim 80% Accelerated Depreciation (AD) under Section 32 of the Income Tax Act in the first year of operation. This allows business owners to write off substantial corporate tax while reducing their monthly factory electricity bills by 60% to 80%.",
    },
    {
      question: "What hardware components and warranties are included in a Pragati EcoSolar package?",
      answer:
        "Every turnkey package includes Tier-1 ALMM listed Waaree or Adani 600W+ TOPCon panels (25-30 year performance warranty), Statcon or Sunora dual MPPT inverters (5-10 year replacement warranty), Polycab/KEI XLPO DC cables, and IS 3043 Chemical Earthing with lightning arrestors.",
    },
    {
      question: "How does net metering billing work on my TPCODL electricity bill?",
      answer:
        "Your bi-directional net meter tracks energy consumed from the grid vs solar units exported to the grid. If your solar system exports more electricity than you consume in a month, the excess units are banked and carried forward to credit your future electricity bills.",
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-200 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold px-3.5 py-1 bg-amber-50 border border-amber-200 rounded-full inline-block">
            LOCAL AUTHORITY & TECHNICAL FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Clear, transparent technical and regulatory guidance for rooftop solar projects in Bhubaneswar, Cuttack, and across Odisha.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FAFAFA] border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center space-x-4 focus:outline-none"
                >
                  <span className="text-base font-bold text-slate-900 tracking-tight flex items-center space-x-3">
                    <span className="text-xs font-mono text-emerald-700 font-bold px-2 py-0.5 bg-emerald-50 rounded border border-emerald-200">
                      Q{idx + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  <div className={`p-2 rounded-xl bg-white border border-slate-200 text-slate-700 transition-transform duration-200 ${isOpen ? "rotate-180 text-amber-600 border-amber-300" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 mt-2 space-y-2">
                        <p className="pt-3">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-center sm:text-left">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">Have specific roof structural or load questions?</h4>
              <p className="text-xs text-slate-600">Speak directly with our Chief Solar Engineers in Patia, Bhubaneswar.</p>
            </div>
          </div>
          <a
            href="tel:+919124318222"
            className="py-2.5 px-5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all font-mono"
          >
            Call +91 9124318222
          </a>
        </div>

      </div>
    </section>
  );
}
