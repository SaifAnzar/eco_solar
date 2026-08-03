"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How much government subsidy will I get for solar?",
      answer:
        "Under the PM Surya Ghar scheme, the government gives you money directly into your bank account: ₹30,000 for a 1 kW system, ₹60,000 for a 2 kW system, and ₹78,000 for systems of 3 kW or more. Pragati EcoSolar handles your entire application from our Bhubaneswar office — you don't have to do anything.",
    },
    {
      question: "How long does it take to get electricity meter approval in Odisha?",
      answer:
        "Meter approval from the electricity office (TPCODL, TPNODL, TPSODL, or TPWODL) usually takes 15 to 30 working days. We handle all the forms, technical drawings, inspections, and follow-ups on your behalf. You just sit back and wait for the good news.",
    },
    {
      question: "Are solar panels safe during Odisha's cyclones?",
      answer:
        "Yes, absolutely. We use custom-made heavy steel mounting frames with a rust-proof zinc coating, designed and tested to withstand winds up to 150 km/h. We also use special chemical fasteners that attach to your roof without causing any water leakage.",
    },
    {
      question: "What tax benefit does my factory or business get from solar?",
      answer:
        "Businesses and factories can claim 80% of the solar system's cost as a tax deduction in the very first year. This means your business saves a lot on income tax while also cutting your electricity bill by 60–80% every month. It's one of the best investments a business can make.",
    },
    {
      question: "What products and warranties are included in your solar installation?",
      answer:
        "Every installation includes trusted Waaree or Adani solar panels (25–30 year performance warranty), a smart Statcon or Sunora inverter (5–10 year warranty), good quality Polycab or KEI wires, and a safety earthing system. All components are government-approved and certified.",
    },
    {
      question: "How does a solar meter work — will I get credit for extra electricity?",
      answer:
        "When your solar panels make more electricity than your home or office uses, the extra units go back into the electricity grid. Your two-way meter records this and your electricity bill is reduced accordingly. Some months your bill can come down to almost zero or even be a credit.",
    },
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-200 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold px-3.5 py-1 bg-amber-50 border border-amber-200 rounded-full inline-block">
            COMMON QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto">
            Simple answers to the most common solar questions from homeowners and businesses in Odisha.
          </p>
        </div>

        {/* Accordion */}
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
              <h4 className="text-base font-bold text-slate-900">Still have questions?</h4>
              <p className="text-xs text-slate-600">Our team in Patia, Bhubaneswar is happy to help. Call us anytime.</p>
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
