import React from "react";
import { getSolarConfig } from "@/lib/data-store";
import { CalculatorConfigEditor } from "@/components/admin/CalculatorConfigEditor";
import { TariffConfigEditor } from "@/components/admin/TariffConfigEditor";

export const metadata = {
  title: "Solar Calculator & Tariff Settings | Admin",
};

export default async function AdminCalculatorPage() {
  const config = getSolarConfig();

  return (
    <div className="space-y-10 max-w-5xl font-sans">
      {/* Header */}
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold">SOLAR & TARIFF CONFIG ENGINE</span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">Solar Calculator & Tariff Parameters</h1>
        <p className="text-xs text-slate-600 mt-1">
          Configure panel capacity, benchmark pricing (₹/kW), grid tariffs, OERC consumption slabs, PM Surya Ghar central subsidies, Odisha state subsidies, and equipment bands.
        </p>
      </div>

      {/* 1. OERC Tariff Slabs & Billing Settings */}
      <TariffConfigEditor />

      {/* 2. Calculator Benchmark & Equipment Band Config Editor */}
      <div className="pt-6 border-t border-slate-200">
        <CalculatorConfigEditor initialConfig={config} />
      </div>
    </div>
  );
}
