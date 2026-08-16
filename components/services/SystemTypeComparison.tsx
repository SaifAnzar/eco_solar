"use client";

import React from "react";
import {
  Sun,
  Zap,
  BatteryCharging,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Home,
  Building2,
  RefreshCw,
} from "lucide-react";

export default function SystemTypeComparison() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-8 font-sans">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold px-3 py-1 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-full inline-block">
          SOLAR ARCHITECTURE COMPARISON
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          On-Grid vs Hybrid Solar Systems
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Understand the structural differences, battery backup capabilities, and grid interactions before selecting your solar system.
        </p>
      </div>

      {/* Comparative Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. On-Grid Solar System */}
        <div className="bg-slate-50 dark:bg-slate-800/60 border-2 border-emerald-500/40 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-emerald-600 text-white font-mono text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                100% SUBSIDY ELIGIBLE
              </span>
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                GRID-TIED ARCHITECTURE
              </span>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-emerald-500" />
                <span>On-Grid Solar System</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Directly connected to the DISCOM grid (TPCODL/TPNODL/TPSODL/TPWODL) via a bidirectional net-meter. Unused solar power exported to grid converts to billing credits.
              </p>
            </div>

            {/* Visual Flow Diagram */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3 font-mono text-[11px]">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                SYSTEM POWER FLOW DIAGRAM:
              </span>
              <div className="flex flex-wrap items-center justify-between gap-2 text-slate-800 dark:text-slate-200">
                <div className="flex items-center gap-1.5 p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>Solar Panels</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <div className="flex items-center gap-1.5 p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                  <Zap className="w-4 h-4 text-emerald-500" />
                  <span>Grid Inverter</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <div className="flex items-center gap-1.5 p-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <RefreshCw className="w-4 h-4 text-blue-500" />
                  <span>Net Meter</span>
                </div>
              </div>
            </div>

            {/* Bullet Points */}
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Eligible for full PM Surya Ghar subsidy up to ₹78,000</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Lowest upfront cost & fastest payback (2 to 3 years)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Zero battery replacement maintenance cost for 25 years</span>
              </div>
              <div className="flex items-start gap-2 text-slate-500">
                <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Shuts down during utility grid power outages (Anti-islanding safety)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Hybrid Solar System */}
        <div className="bg-slate-50 dark:bg-slate-800/60 border-2 border-blue-500/40 rounded-2xl p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="bg-blue-600 text-white font-mono text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                24x7 BATTERY BACKUP
              </span>
              <span className="text-xs font-mono text-blue-700 dark:text-blue-400 font-bold">
                GRID-TIED + STORAGE
              </span>
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <BatteryCharging className="w-5 h-5 text-blue-500" />
                <span>Hybrid Solar System</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                Combines grid net-metering with a high-capacity LiFePO4 battery bank. Supplies continuous power during DISCOM power cuts and runs night-time home loads on stored solar energy.
              </p>
            </div>

            {/* Visual Flow Diagram */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3 font-mono text-[11px]">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                SYSTEM POWER FLOW DIAGRAM:
              </span>
              <div className="flex flex-wrap items-center justify-between gap-2 text-slate-800 dark:text-slate-200">
                <div className="flex items-center gap-1.5 p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>Solar Array</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <div className="flex items-center gap-1.5 p-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <BatteryCharging className="w-4 h-4 text-blue-500" />
                  <span>LiFePO4 Battery</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <div className="flex items-center gap-1.5 p-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                  <Zap className="w-4 h-4 text-emerald-500" />
                  <span>Home & Grid</span>
                </div>
              </div>
            </div>

            {/* Bullet Points */}
            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Uninterrupted 24x7 electricity supply during Odisha storms/cyclones</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Powers refrigerators, fans, lights, and TVs when grid fails</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>Long-life LiFePO4 battery technology (10+ year lifespan)</span>
              </div>
              <div className="flex items-start gap-2 text-slate-500">
                <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Higher upfront cost due to battery storage integration</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
