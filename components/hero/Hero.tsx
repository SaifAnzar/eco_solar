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
import { TypewriterHeadline } from "./TypewriterHeadline";

export const Hero: React.FC = () => {
  const [monthlyBill, setMonthlyBill] = useState<number>(3500);

  const estimatedKw = Math.max(1, Math.min(10, Math.round(monthlyBill / 1000)));
  const quote = calculateSolarQuote(estimatedKw, 4.5, true);

  return (
    <section className="relative py-20 lg:py-28 border-b border-slate-100 overflow-hidden">
      {/* Subtle background accent */}
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

            {/* Dynamic Typewriter Headline */}
            <TypewriterHeadline />

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
  );
};

export default Hero;
