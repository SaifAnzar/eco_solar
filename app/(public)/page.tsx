"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  ShieldCheck,
  Zap,
  MapPin,
  Sun,
  Calculator,
  Home,
  Building2,
  Sprout,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
} from "lucide-react";
import { calculateSolarQuote } from "@/lib/solar-engine";

// ─── FAQ DATA ────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "How much government subsidy will I get?",
    a: "Under PM Surya Ghar: ₹30,000 for 1 kW · ₹60,000 for 2 kW · ₹78,000 for 3 kW and above. The money comes directly into your bank account. We handle the entire application for you.",
  },
  {
    q: "How long does meter approval take in Odisha?",
    a: "Typically 15–30 working days. We manage all forms, site inspections, and follow-ups with TPCODL, TPNODL, TPSODL, and TPWODL on your behalf.",
  },
  {
    q: "Are solar panels safe during Odisha cyclones?",
    a: "Yes. We use rust-proof galvanized steel frames tested to hold at 150 km/h wind speed. Panels are fixed with chemical anchors — no roof drilling, no leakage.",
  },
  {
    q: "What tax benefit does my business get?",
    a: "Businesses can claim 80% of the solar cost as a tax deduction in year one, while cutting electricity bills by 60–80% every month.",
  },
  {
    q: "What warranty do I get?",
    a: "Waaree & Adani panels: 25-year performance warranty. Inverters: 5–10 years. All cables, earthing, and mounting structures are covered too.",
  },
];

// ─── SERVICES ────────────────────────────────────────────────────────────────
const services = [
  {
    icon: Home,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    badge: "Up to ₹78,000 Subsidy",
    title: "Solar for Your Home",
    range: "1 kW – 10 kW",
    desc: "We install solar panels on your rooftop and handle everything — site visit, panels, inverter, meter approval, and subsidy claim.",
    href: "/services/residential",
  },
  {
    icon: Building2,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "80% Tax Benefit in Year 1",
    title: "Solar for Offices & Factories",
    range: "10 kW – 500 kW+",
    desc: "Cut electricity bills by up to 80% and enjoy big tax savings. Easy payment options — pay upfront or start with zero cost.",
    href: "/services/commercial",
  },
  {
    icon: Sprout,
    color: "text-teal-600",
    bg: "bg-teal-50",
    border: "border-teal-200",
    badge: "Up to 90% Subsidy",
    title: "Solar Pumps for Farmers",
    range: "3 HP – 10 HP",
    desc: "Power your farm water pump with sunlight. No electricity bills, no diesel. Government covers up to 90% of the cost under PM-KUSUM.",
    href: "/services/solar-pumps",
  },
];

// ─── STEPS ───────────────────────────────────────────────────────────────────
const steps = [
  { n: "01", title: "Free Site Visit & Design", desc: "We visit your home or office, check the roof, and design the right solar system for you." },
  { n: "02", title: "Top-Quality Panels & Inverters", desc: "Waaree & Adani panels with 25-year warranty — no low-quality shortcuts." },
  { n: "03", title: "Meter Approval — We Handle It", desc: "We manage all DISCOM paperwork, inspections, and grid connection for you." },
  { n: "04", title: "Start Saving Every Month", desc: "Once live, your solar system reduces your electricity bill from day one." },
];

export default function HomePage() {
  const [monthlyBill, setMonthlyBill] = useState<number>(3500);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const estimatedKw = Math.max(1, Math.min(10, Math.round(monthlyBill / 1000)));
  const quote = calculateSolarQuote(estimatedKw, 4.5, true);

  return (
    <div className="bg-white font-sans">

      {/* ══════════════════════════════════════════════════════
          HERO — Clean two-column, no images
      ══════════════════════════════════════════════════════ */}
      <section className="relative py-20 lg:py-28 border-b border-slate-100">
        {/* subtle background accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-white to-amber-50/30 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* LEFT */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                  Official Solar Installer · Odisha
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Cut Your<br />
                Electricity Bill<br />
                <span className="text-emerald-600">to Almost Zero.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
                Rooftop solar for homes, offices & farms across Odisha. We take care of panels, installation, government subsidy, and meter approval — start to finish.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/calculator"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition-all shadow-lg"
                >
                  Calculate Solar Savings
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+919124318222"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl border border-slate-200 shadow-sm transition-all"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  Call Our Team
                </a>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap gap-5 pt-2 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  25-Year Warranty
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Meter Approval Included
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-500" />
                  Patia, Bhubaneswar
                </span>
              </div>
            </div>

            {/* RIGHT — Savings Calculator Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Calculator className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-lg font-bold text-slate-900">How Much Can You Save?</h2>
                </div>
                <p className="text-sm text-slate-500">Enter your monthly bill to get an instant estimate.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Monthly Electricity Bill (₹)
                  </label>
                  <input
                    type="number"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(Number(e.target.value) || 0)}
                    step="500"
                    min="500"
                    max="50000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Results */}
              <div className="bg-slate-900 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-3">
                  <span className="text-slate-400">Recommended Size</span>
                  <strong className="text-amber-400">{quote.systemKw} kW System</strong>
                </div>
                <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-3">
                  <span className="text-slate-400">Government Subsidy</span>
                  <strong className="text-emerald-400">₹{quote.pmSuryaGharSubsidy.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Yearly Savings</span>
                  <strong className="text-white">₹{quote.annualSavingsRs.toLocaleString()} / yr</strong>
                </div>
              </div>

              <Link
                href="/calculator"
                className="block w-full text-center py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all"
              >
                Get My Full Solar Plan →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          NUMBERS STRIP
      ══════════════════════════════════════════════════════ */}
      <section className="py-14 border-b border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { value: "400+", label: "Solar Systems Installed", sub: "Across Odisha" },
            { value: "₹78,000", label: "Max Government Subsidy", sub: "Direct to your bank" },
            { value: "90%", label: "Bill Savings Possible", sub: "For homes & businesses" },
            { value: "15 Days", label: "Meter Approval Time", sub: "We handle everything" },
          ].map((m, i) => (
            <div key={i}>
              <div className="text-3xl lg:text-4xl font-extrabold text-slate-900">{m.value}</div>
              <div className="text-sm font-bold text-slate-700 mt-1">{m.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{m.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SERVICES — Clean icon cards, no images
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">What We Offer</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
              Solar for Every Need
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-emerald-300 hover:shadow-lg transition-all group flex flex-col">
                  <div className={`inline-flex p-3 rounded-xl ${s.bg} border ${s.border} mb-5 w-fit`}>
                    <Icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <div className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${s.color}`}>{s.badge}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">{s.title}</h3>
                  <div className="text-xs font-mono text-slate-400 mb-3">{s.range}</div>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">{s.desc}</p>
                  <Link
                    href={s.href}
                    className="mt-6 flex items-center gap-1.5 text-sm font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS — 4 steps horizontal
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">Going Solar is Easy with Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.n} className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 font-mono font-black text-sm flex items-center justify-center mb-4">
                  {step.n}
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          DISCOM COVERAGE — Ultra-minimal
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">We Serve All of Odisha</p>
          <h2 className="text-3xl font-extrabold text-slate-900">
            Meter Approval in Every District
          </h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">
            We handle electricity meter paperwork for all four Odisha electricity zones — so you don't have to deal with any office.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            {[
              { code: "TPCODL", region: "Central Odisha", cities: "Bhubaneswar, Cuttack, Puri" },
              { code: "TPNODL", region: "North Odisha", cities: "Balasore, Bhadrak, Keonjhar" },
              { code: "TPSODL", region: "South Odisha", cities: "Ganjam, Rayagada, Koraput" },
              { code: "TPWODL", region: "West Odisha", cities: "Sambalpur, Rourkela, Bargarh" },
            ].map((d) => (
              <div key={d.code} className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-black text-slate-900">{d.code}</span>
                </div>
                <div className="text-xs font-semibold text-slate-600 mb-0.5">{d.region}</div>
                <div className="text-xs text-slate-400">{d.cities}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ — Minimal accordion
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl font-extrabold text-slate-900">Common Questions</h2>
          </div>
          <div className="divide-y divide-slate-200 bg-white border border-slate-200 rounded-2xl overflow-hidden">
            {faqs.map((faq, idx) => (
              <div key={idx}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left gap-4 hover:bg-slate-50 transition-colors"
                >
                  <span className="font-semibold text-slate-900 text-sm">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openFaq === idx ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="flex flex-col sm:flex-row items-center justify-between bg-white border border-slate-200 rounded-2xl p-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <HelpCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">Still have questions?</p>
                <p className="text-xs text-slate-500">Our team in Bhubaneswar is happy to help.</p>
              </div>
            </div>
            <a
              href="tel:+919124318222"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl whitespace-nowrap transition-all"
            >
              Call +91 9124318222
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FINAL CTA BANNER
      ══════════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <Sun className="w-10 h-10 text-amber-500 mx-auto" />
          <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
            Ready to Switch to Solar?
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Get a free quote in minutes. Our team will call you, visit your site, and show you exactly how much you can save.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-600/20"
            >
              Calculate My Savings <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+919124318222"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 font-bold text-sm rounded-xl border border-slate-200 shadow-sm transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              +91 9124318222
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
