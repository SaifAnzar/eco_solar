"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Phone } from "lucide-react";
import { useSiteSettings } from "@/components/common/SiteSettingsContext";
import { SITE_CONFIG } from "@/config/site";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { settings } = useSiteSettings();

  const phone = settings.contactPhone || SITE_CONFIG.contact.phone;
  const rawPhone = phone.replace(/\D/g, "") || SITE_CONFIG.contact.phoneRaw;

  const faqs = [
    {
      question: "How much government subsidy will I get for solar?",
      answer: "Under the PM Surya Ghar scheme, the government gives you money directly into your bank account: ₹30,000 for a 1 kW system, ₹60,000 for a 2 kW system, and ₹78,000 for systems of 3 kW or more. Pragati EcoSolar handles your entire application from our office — you don't have to do anything.",
      tag: "Subsidy",
    },
    {
      question: "How long does it take to get electricity meter approval in Odisha?",
      answer: "Meter approval from the electricity office (TPCODL, TPNODL, TPSODL, or TPWODL) usually takes 15 to 30 working days. We handle all the forms, technical drawings, inspections, and follow-ups on your behalf. You just sit back and wait for the good news.",
      tag: "Net Metering",
    },
    {
      question: "Are solar panels safe during Odisha's cyclones?",
      answer: "Yes, absolutely. We use custom-made heavy steel mounting frames with a rust-proof zinc coating, designed and tested to withstand winds up to 150 km/h. We also use special chemical fasteners that attach to your roof without causing any water leakage.",
      tag: "Safety",
    },
    {
      question: "What tax benefit does my factory or business get from solar?",
      answer: "Businesses and factories can claim 80% of the solar system's cost as a tax deduction in the very first year. This means your business saves a lot on income tax while also cutting your electricity bill by 60–80% every month. It's one of the best investments a business can make.",
      tag: "Commercial",
    },
    {
      question: "What products and warranties are included in your solar installation?",
      answer: "Every installation includes trusted Waaree or Adani solar panels (25–30 year performance warranty), a smart Statcon or Sunora inverter (5–10 year warranty), good quality Polycab or KEI wires, and a safety earthing system. All components are government-approved and certified.",
      tag: "Products",
    },
    {
      question: "How does a solar meter work — will I get credit for extra electricity?",
      answer: "When your solar panels make more electricity than your home or office uses, the extra units go back into the electricity grid. Your two-way meter records this and your electricity bill is reduced accordingly. Some months your bill can come down to almost zero or even be a credit.",
      tag: "Net Metering",
    },
  ];

  const TAG_COLORS: Record<string, string> = {
    "Subsidy":    "text-amber-700 bg-amber-50 border-amber-200",
    "Net Metering": "text-cyan-700 bg-cyan-50 border-cyan-200",
    "Safety":     "text-emerald-700 bg-emerald-50 border-emerald-200",
    "Commercial": "text-violet-700 bg-violet-50 border-violet-200",
    "Products":   "text-slate-700 bg-slate-100 border-slate-200",
  };

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)" }}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div className="text-center space-y-4 mb-14"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-amber-700 bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-full">
            <HelpCircle className="w-3.5 h-3.5" />
            Common Questions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked{" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,#f59e0b,#ef4444)" }}>
              Questions
            </span>
          </h2>
          <p className="text-slate-500 text-base">
            Simple answers to the most common solar questions from homeowners and businesses across Odisha.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-emerald-200 shadow-lg shadow-emerald-500/5 bg-white"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                }`}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 focus:outline-none"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Number badge */}
                    <span className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold font-mono mt-0.5 transition-colors ${
                      isOpen
                        ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md"
                        : "bg-slate-100 text-slate-500"
                    }`}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="space-y-1.5 min-w-0">
                      <p className={`text-sm sm:text-base font-bold leading-snug ${isOpen ? "text-emerald-800" : "text-slate-900"}`}>
                        {faq.question}
                      </p>
                      {/* Tag */}
                      <span className={`inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${TAG_COLORS[faq.tag] || TAG_COLORS["Products"]}`}>
                        {faq.tag}
                      </span>
                    </div>
                  </div>

                  {/* Chevron */}
                  <div className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 mt-0.5 ${
                    isOpen ? "bg-emerald-50 border border-emerald-200 text-emerald-600 rotate-180" : "bg-slate-100 border border-slate-200 text-slate-500"
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}>
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0 ml-10">
                        <div className="pt-3 border-t border-emerald-100">
                          <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Card */}
        <motion.div className="mt-10 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
          <div className="p-px rounded-2xl"
            style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.4) 0%, rgba(245,158,11,0.2) 100%)" }}>
            <div className="bg-white rounded-[calc(1rem-1px)] p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shrink-0">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-slate-900">Still have questions?</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Our engineering team is happy to help anytime.</p>
                </div>
              </div>
              <a href={`tel:${rawPhone}`}
                className="inline-flex items-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-white shrink-0 transition-all duration-200 hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg,#1e293b,#0f172a)", boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
                <Phone className="w-4 h-4 text-emerald-400" />
                Call {phone}
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
