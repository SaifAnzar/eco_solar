import React from "react";
import { getSolarConfig } from "@/lib/data-store";
import { CalculatorConfigEditor } from "@/components/admin/CalculatorConfigEditor";

export const metadata = {
  title: "Solar Calculator Settings | Admin",
};

export default async function AdminCalculatorPage() {
  const config = getSolarConfig();

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold">SOLAR ENGINE CONFIG</span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">Solar Calculator Parameters</h1>
        <p className="text-xs text-slate-600 mt-1">
          Configure panel capacity, benchmark pricing (₹/kW), grid tariffs, PM Surya Ghar central subsidies, Odisha state subsidies, and equipment bands.
        </p>
      </div>

      {/* Editor Component */}
      <CalculatorConfigEditor initialConfig={config} />
    </div>
  );
}
