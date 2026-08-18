"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  ShieldCheck,
  Zap,
  MapPin,
  Calculator,
} from "lucide-react";
import { calculateSolarQuote } from "@/lib/solar-engine";
import { estimateKwFromBill } from "@/lib/solar-calculations";
import { TypewriterHeadline } from "./TypewriterHeadline";
import EligibilityModal from "@/components/forms/EligibilityModal";

interface HeroProps {
  heroSubline?: string;
}

export const Hero: React.FC<HeroProps> = ({
  heroSubline = "Government-authorized installer under PM Surya Ghar Muft Bijli Yojana, empanelled across all four Odisha DISCOMs. From design to commissioning — we handle it all.",
}) => {
  const [monthlyBill, setMonthlyBill] = useState<number>(3500);
  const [openEligibility, setOpenEligibility] = useState(false);

  const estimatedKw = estimateKwFromBill(monthlyBill, 2, 4.2);
  const quote = calculateSolarQuote(estimatedKw, 4.5, true);

  const heroPresetChips = [1500, 2500, 4000, 6000, 10000];

  return (
    <section className="relative py-20 lg:py-28 border-b border-slate-100 overflow-hidden bg-white">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-white to-amber-50/30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Official Solar Installer · Odisha
              </span>
            </div>

            {/* Dynamic Typewriter Headline */}
            <TypewriterHeadline />

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg font-medium">
              {heroSubline}
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Check Eligibility Trigger Button */}
              <button
                type="button"
                onClick={() => setOpenEligibility(true)}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Check Solar Subsidy Eligibility</span>
              </button>

              <Link
                href="/contact?type=quote"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl border border-slate-200 shadow-sm transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Get a Custom Quote</span>
              </Link>
            </div>

            {/* Partnership CTAs */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
                🚀 Grow with Odisha&apos;s Leading Solar Network
              </span>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/franchise"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-bold text-sm rounded-xl transition-all shadow-md shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] border border-amber-400"
                >
                  Apply for Franchise 🏢
                </Link>
                <Link
                  href="/dealership"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-emerald-50 text-emerald-700 hover:text-emerald-800 font-bold text-sm rounded-xl border-2 border-emerald-500 shadow-sm hover:shadow-emerald-500/10 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  Become a Dealer 📦
                </Link>
              </div>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-5 pt-2 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                25-Year Warranty
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                4 DISCOM Zones Empanelled
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

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex justify-between">
                  <span>Monthly Electricity Bill (₹)</span>
                  <span className="text-amber-700 font-mono font-bold">₹{monthlyBill.toLocaleString("en-IN")} / Mo</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={monthlyBill === 0 ? "" : monthlyBill}
                    onChange={(e) => {
                      const clean = e.target.value.replace(/\D/g, "");
                      setMonthlyBill(clean === "" ? 0 : Number(clean));
                    }}
                    placeholder="e.g. 3500"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs font-mono text-slate-400 font-bold">
                    ₹ / Mo
                  </div>
                </div>
              </div>

              {/* Preset Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {heroPresetChips.map((chipVal) => (
                  <button
                    key={chipVal}
                    type="button"
                    onClick={() => setMonthlyBill(chipVal)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer border ${
                      monthlyBill === chipVal
                        ? "bg-slate-900 text-amber-400 border-slate-900 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50 hover:border-amber-300"
                    }`}
                  >
                    ₹{chipVal.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="bg-slate-900 rounded-xl p-5 space-y-3 font-mono">
              <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-3">
                <span className="text-slate-400">Recommended Size</span>
                <strong className="text-amber-400">{quote.systemKw} kW System</strong>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-slate-700 pb-2">
                <span className="text-slate-400">Central Subsidy (PM Surya Ghar)</span>
                <strong className="text-emerald-400">₹{quote.centralSubsidy.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-slate-700 pb-2">
                <span className="text-slate-400">Odisha State Subsidy</span>
                <strong className="text-amber-400">₹{quote.stateSubsidy.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-slate-700 pb-2">
                <span className="text-slate-300 font-bold">Total Govt Subsidy</span>
                <strong className="text-emerald-300 font-bold">₹{quote.totalSubsidy.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Yearly Savings</span>
                <strong className="text-white">₹{quote.annualSavingsRs.toLocaleString()} / yr</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setOpenEligibility(true)}
              className="block w-full text-center py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer"
            >
              Check My Solar Subsidy Eligibility →
            </button>
          </div>
        </div>
      </div>

      {/* Controlled Eligibility Modal Popup */}
      <EligibilityModal
        isOpen={openEligibility}
        onClose={() => setOpenEligibility(false)}
      />
    </section>
  );
};

export default Hero;
