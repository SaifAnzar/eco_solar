import React from "react";
import Link from "next/link";
import { Sprout, ArrowRight, Calculator } from "lucide-react";
import SolarPumpCard from "@/components/services/SolarPumpCard";

export const metadata = {
  title: "PM-KUSUM Agricultural Solar Water Pumps Odisha | Pragati EcoSolar",
  description: "Deploy 3 HP to 10 HP solar water pumps under PM-KUSUM scheme with up to 90% combined subsidy across Odisha farmland.",
};

export default function SolarPumpsPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Banner */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
            <Sprout className="w-3.5 h-3.5" />
            <span>PM-KUSUM SCHEME IMPLEMENTATION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Agricultural Solar Water Pumps in Odisha
          </h1>

          <p className="text-slate-600 text-base max-w-3xl leading-relaxed">
            Uninterrupted daytime irrigation for Odisha farmers without grid dependency or expensive diesel generators. Pragati EcoSolar installs 3 HP to 10 HP submersible and surface solar water pumps under PM-KUSUM with up to 90% combined subsidies.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/calculator"
              className="inline-flex items-center space-x-2 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all font-mono"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Solar ROI</span>
            </Link>
            <a
              href="tel:+919124318222"
              className="inline-flex items-center space-x-2 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl transition-all font-mono"
            >
              <span>Inquire Pump Subsidies (+91 9124318222)</span>
            </a>
          </div>
        </div>

        {/* Solar Pump In Progress Card & Pre-Registration (Task 8) */}
        <SolarPumpCard />

        {/* Action Bar */}
        <div className="bg-slate-900 p-8 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Inquire about PM-KUSUM Solar Water Pump eligibility?</h3>
            <p className="text-xs text-slate-400">Speak directly with our agricultural solar engineers in Bhubaneswar.</p>
          </div>
          <Link
            href="/calculator"
            className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 shrink-0 font-mono"
          >
            <span>Launch Solar ROI Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
