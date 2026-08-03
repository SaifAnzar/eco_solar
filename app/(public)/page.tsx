"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone, ShieldCheck, Zap, MapPin, Sun, Calculator, CheckCircle2 } from "lucide-react";
import MetricsStrip from "@/components/home/MetricsStrip";
import ServicesSection from "@/components/home/ServicesSection";
import HardwarePartners from "@/components/home/HardwarePartners";
import DiscomLiaison from "@/components/home/DiscomLiaison";
import FaqAccordion from "@/components/home/FaqAccordion";
import { calculateSolarQuote } from "@/lib/solar-engine";

export default function HomePage() {
  const [monthlyBill, setMonthlyBill] = useState<number>(3500);
  const [pincode, setPincode] = useState<string>("751024");

  // Calculate dynamic capacity based on monthly bill (approx ₹1,000 = ~1 kW)
  const estimatedKw = Math.max(1, Math.min(10, Math.round(monthlyBill / 1000)));
  const quote = calculateSolarQuote(estimatedKw, 4.5, true);

  return (
    <div className="space-y-0 bg-[#FAFAFA] font-sans">
      
      {/* ASYMMETRIC DUAL COLUMN HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-slate-50 border-b border-slate-200/80 py-16 lg:py-24">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: Editorial Copywriting & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Authorized Pill Badge */}
              <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100/80 to-emerald-100/80 border border-amber-300/80 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-800">
                  AUTHORIZED EPC CONTRACTOR | TPCODL • TPNODL • TPSODL • TPWODL
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Engineering High-Yield{" "}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                  Rooftop Solar
                </span>{" "}
                Across Odisha
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                From 3 kW home systems under PM Surya Ghar (up to ₹78,000 direct central subsidy) to 100 kW commercial power plants. Complete DISCOM net-metering liaison, Tier-1 Waaree/Adani TOPCon hardware, and 25-year performance warranties across Bhubaneswar, Cuttack & all Odisha districts.
              </p>

              {/* Primary Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/calculator"
                  className="inline-flex items-center justify-center space-x-2.5 px-7 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] font-mono"
                >
                  <span>Explore Solar Packages</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="tel:+919124318222"
                  className="inline-flex items-center justify-center space-x-2 px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 shadow-sm transition-all font-mono"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Call Technical Team (+91 9124318222)</span>
                </a>
              </div>

              {/* Trust Badges Strip */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono font-bold text-slate-700 text-left">
                <div className="flex items-center space-x-2 bg-white/80 p-2.5 rounded-lg border border-slate-200/60 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>25-Year Panel Linear Warranty</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 p-2.5 rounded-lg border border-slate-200/60 shadow-xs">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>100% DISCOM Net-Meter Approval</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/80 p-2.5 rounded-lg border border-slate-200/60 shadow-xs">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Patia, Bhubaneswar HQ</span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Interactive Sizing Terminal Widget */}
            <div className="lg:col-span-5 relative">
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-mono font-bold px-3 py-1 rounded-bl-xl">
                  LIVE SIZING TERMINAL
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-5 h-5 text-emerald-600" />
                    <h3 className="text-lg font-bold text-slate-900">Instant Solar ROI Estimator</h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    Estimate system capacity, central subsidy, & net costs for your roof.
                  </p>
                </div>

                {/* Input Fields Grid */}
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Avg. Monthly Electricity Bill (₹)
                    </label>
                    <input
                      type="number"
                      value={monthlyBill}
                      onChange={(e) => setMonthlyBill(Number(e.target.value) || 0)}
                      step="500"
                      min="1000"
                      max="50000"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Odisha Pincode (e.g., Patia 751024)
                    </label>
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      maxLength={6}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                {/* Output Metrics Grid */}
                <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3 font-mono">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
                    <span className="text-slate-400">Recommended Capacity:</span>
                    <strong className="text-amber-400 text-sm font-bold">{quote.systemKw} kW System</strong>
                  </div>

                  <div className="flex justify-between items-center border-b border-slate-800 pb-2 text-xs">
                    <span className="text-slate-400">PM Surya Ghar Subsidy:</span>
                    <strong className="text-emerald-400 text-sm font-bold">₹{quote.pmSuryaGharSubsidy.toLocaleString()}</strong>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-1">
                    <span className="text-slate-400">Est. Annual Bill Savings:</span>
                    <strong className="text-white text-sm font-bold">₹{quote.annualSavingsRs.toLocaleString()} / Year</strong>
                  </div>
                </div>

                {/* Submit Action */}
                <Link
                  href="/calculator"
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 font-mono"
                >
                  <span>Get Full BOM & Turnkey Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* HIGH-CONTRAST LIGHT METRICS STRIP */}
      <MetricsStrip />

      {/* SERVICES GRID */}
      <ServicesSection />

      {/* HARDWARE & VENDOR PARTNERS */}
      <HardwarePartners />

      {/* DISCOM NET-METERING LIAISON */}
      <DiscomLiaison />

      {/* LOCAL FAQ ACCORDION */}
      <FaqAccordion />

    </div>
  );
}
