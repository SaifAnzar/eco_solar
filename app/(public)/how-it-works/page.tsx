"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Calendar, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import StepByStepProcess from "@/components/common/StepByStepProcess";

export default function HowItWorksPage() {
  return (
    <div className="w-full font-sans bg-[#FAFAFA] text-slate-900 pb-16">
      {/* 1. HERO HEADER */}
      <section className="bg-slate-900 text-white py-14 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full inline-block shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 inline mr-1.5" />
            OFFICIAL SOLAR EXECUTION ROADMAP
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            How Your Solar Project Works
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From documentation collection to direct bank subsidy credit — our transparent 8-step project execution process.
          </p>
        </div>
      </section>

      {/* 2. STEP-BY-STEP PROCESS GRID (Official 8-Step Project Process) */}
      <StepByStepProcess />

      {/* 3. MINIMALIST KEY HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full inline-block">
            OUR COMMITMENT TO YOU
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Turnkey Execution — Zero Stress
          </h2>
          <p className="text-slate-600 text-sm">
            We handle 100% of paperwork, loan processing, DISCOM approvals, installation, and subsidy sanctioning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Paperwork &amp; Approvals</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Full DISCOM feasibility clearance, net-metering setup, and PM Surya Ghar portal submission within 24 hours.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Fast 1-2 Day Build</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Certified in-house electrical and civil engineers complete mounting, cabling, earthing, and testing smoothly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Direct Subsidy Credit</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Government subsidy (up to ₹78,000 central + ₹60,000 state) credited directly into your bank account.
            </p>
          </div>
        </div>
      </section>

      {/* 4. MINIMALIST CLOSING CTA */}
      <section className="py-16 bg-slate-900 text-white text-center border-t border-slate-800">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Start Step 1 with a Free Site Visit?</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Book your zero-cost engineer rooftop survey today. We calculate your exact solar savings and manage all government paperwork.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/contact?type=site-visit"
              className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Site Visit</span>
            </Link>
            <Link
              href="/calculator"
              className="py-3.5 px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Calculate Instant ROI</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
