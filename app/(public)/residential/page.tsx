"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sun, Zap, Layers, CheckCircle2, ShieldCheck, Calendar, ArrowRight, HelpCircle } from "lucide-react";

export default function ResidentialSolarPage() {
  const [selectedType, setSelectedType] = useState<"ongrid" | "offgrid" | "hybrid">("ongrid");

  const onGridPackages = [
    { name: "Basic Home", capacity: "1 kW", area: "~100 sq.ft", subsidy: "Up to ₹30,000", epcCost: "₹65,000", netCost: "₹35,000" },
    { name: "Standard Home", capacity: "2 kW", area: "~200 sq.ft", subsidy: "Up to ₹60,000", epcCost: "₹1,30,000", netCost: "₹70,000" },
    { name: "Premium Home", capacity: "3 kW", area: "~300 sq.ft", subsidy: "Up to ₹78,000", epcCost: "₹1,95,000", netCost: "₹1,17,000" },
    { name: "Max Power", capacity: "5 kW", area: "~500 sq.ft", subsidy: "Up to ₹78,000", epcCost: "₹3,15,000", netCost: "₹2,37,000" },
  ];

  const offGridPackages = [
    { name: "Basic Off-Grid", capacity: "1 kW", battery: "2.4 kWh", backup: "4–6 hrs", cost: "₹95,000" },
    { name: "Standard Off-Grid", capacity: "2 kW", battery: "4.8 kWh", backup: "6–8 hrs", cost: "₹1,75,000" },
    { name: "Premium Off-Grid", capacity: "3 kW", battery: "7.2 kWh", backup: "8–10 hrs", cost: "₹2,55,000" },
  ];

  const hybridPackages = [
    { name: "Basic Hybrid", capacity: "2 kW", battery: "4.8 kWh", subsidy: "Up to ₹60,000", netCost: "₹1,35,000" },
    { name: "Standard Hybrid", capacity: "3 kW", battery: "7.2 kWh", subsidy: "Up to ₹78,000", netCost: "₹1,95,000" },
    { name: "Premium Hybrid", capacity: "5 kW", battery: "9.6 kWh", subsidy: "Up to ₹78,000", netCost: "₹3,10,000" },
  ];

  return (
    <div className="w-full font-sans bg-[#FAFAFA]">
      {/* 1. Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full inline-block">
            PM SURYA GHAR AUTHORIZED
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Rooftop Solar Solutions for Homes</h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Lower your monthly electricity bill by up to 90%. We install complete rooftop solar packages across Odisha with full PM Surya Ghar subsidy processing.
          </p>
        </div>
      </section>

      {/* System Type Selector Tabs */}
      <section className="py-8 bg-white border-b border-slate-200 sticky top-20 z-40 shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl">
            <button
              onClick={() => setSelectedType("ongrid")}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                selectedType === "ongrid"
                  ? "bg-emerald-600 text-white shadow"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>On-Grid (Net Metered)</span>
            </button>
            <button
              onClick={() => setSelectedType("offgrid")}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                selectedType === "offgrid"
                  ? "bg-amber-600 text-white shadow"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Off-Grid (Battery)</span>
            </button>
            <button
              onClick={() => setSelectedType("hybrid")}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                selectedType === "hybrid"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-700 hover:text-slate-900"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Hybrid (Grid + Battery)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Package Tables Section */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-4 space-y-12">

          {/* ON-GRID PACKAGES */}
          {selectedType === "ongrid" && (
            <div className="space-y-6">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-900">
                <span className="font-bold">✨ PM Surya Ghar Subsidy Eligible: Up to ₹78,000 Direct Central Bank Credit</span>
                <span className="font-mono text-[11px] bg-white px-2.5 py-1 rounded border border-emerald-300">No Batteries Required</span>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-white uppercase">
                    <tr>
                      <th className="py-4 px-4">Package</th>
                      <th className="py-4 px-4">Capacity</th>
                      <th className="py-4 px-4">Roof Area</th>
                      <th className="py-4 px-4">Central Subsidy</th>
                      <th className="py-4 px-4">Gross EPC Cost</th>
                      <th className="py-4 px-4">Net Out-of-Pocket</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {onGridPackages.map((pkg, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-4 px-4 font-bold text-slate-900 font-sans text-sm">{pkg.name}</td>
                        <td className="py-4 px-4 font-bold text-emerald-700">{pkg.capacity}</td>
                        <td className="py-4 px-4 text-slate-600">{pkg.area}</td>
                        <td className="py-4 px-4 text-emerald-600 font-bold">{pkg.subsidy}</td>
                        <td className="py-4 px-4 text-slate-500 line-through">{pkg.epcCost}</td>
                        <td className="py-4 px-4 text-amber-700 font-bold text-sm">{pkg.netCost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* OFF-GRID PACKAGES */}
          {selectedType === "offgrid" && (
            <div className="space-y-6">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-xs text-amber-900">
                <span className="font-bold">⚡ 100% Independent Power with Heavy-Duty Battery Storage (Zero DISCOM Reliance)</span>
                <span className="font-mono text-[11px] bg-white px-2.5 py-1 rounded border border-amber-300">No Net Metering Needed</span>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-white uppercase">
                    <tr>
                      <th className="py-4 px-4">Package</th>
                      <th className="py-4 px-4">Capacity</th>
                      <th className="py-4 px-4">Battery Bank</th>
                      <th className="py-4 px-4">Est. Backup Time</th>
                      <th className="py-4 px-4">Turnkey Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {offGridPackages.map((pkg, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-4 px-4 font-bold text-slate-900 font-sans text-sm">{pkg.name}</td>
                        <td className="py-4 px-4 font-bold text-emerald-700">{pkg.capacity}</td>
                        <td className="py-4 px-4 text-amber-700 font-bold">{pkg.battery}</td>
                        <td className="py-4 px-4 text-slate-600">{pkg.backup}</td>
                        <td className="py-4 px-4 text-slate-900 font-bold text-sm">{pkg.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* HYBRID PACKAGES */}
          {selectedType === "hybrid" && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between text-xs text-blue-900">
                <span className="font-bold">🔋 Combined Net-Metering Savings + Battery Power Backup for Blackout Protection</span>
                <span className="font-mono text-[11px] bg-white px-2.5 py-1 rounded border border-blue-300">Subsidy Eligible</span>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-white uppercase">
                    <tr>
                      <th className="py-4 px-4">Package</th>
                      <th className="py-4 px-4">Capacity</th>
                      <th className="py-4 px-4">Battery Bank</th>
                      <th className="py-4 px-4">Central Subsidy</th>
                      <th className="py-4 px-4">Net Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {hybridPackages.map((pkg, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-4 px-4 font-bold text-slate-900 font-sans text-sm">{pkg.name}</td>
                        <td className="py-4 px-4 font-bold text-emerald-700">{pkg.capacity}</td>
                        <td className="py-4 px-4 text-amber-700 font-bold">{pkg.battery}</td>
                        <td className="py-4 px-4 text-emerald-600 font-bold">{pkg.subsidy}</td>
                        <td className="py-4 px-4 text-amber-700 font-bold text-sm">{pkg.netCost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Warranty & Support Block */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <h3 className="text-xl font-bold text-slate-900">Warranty & Long-Term EPC Support</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-mono">
              <div className="p-4 bg-[#FAFAFA] rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 block uppercase text-[10px]">PV Module Warranty</span>
                <strong className="text-base text-slate-900 block font-bold">25 Years</strong>
                <span className="text-[11px] text-slate-600">Linear Performance Warranty</span>
              </div>
              <div className="p-4 bg-[#FAFAFA] rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 block uppercase text-[10px]">Inverter Warranty</span>
                <strong className="text-base text-slate-900 block font-bold">5 – 10 Years</strong>
                <span className="text-[11px] text-slate-600">Manufacturer Warranty</span>
              </div>
              <div className="p-4 bg-[#FAFAFA] rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 block uppercase text-[10px]">On-Site Maintenance</span>
                <strong className="text-base text-emerald-700 block font-bold">5 Years Free</strong>
                <span className="text-[11px] text-slate-600">Preventive Maintenance</span>
              </div>
              <div className="p-4 bg-[#FAFAFA] rounded-2xl border border-slate-200 space-y-1">
                <span className="text-slate-500 block uppercase text-[10px]">DISCOM Coverage</span>
                <strong className="text-base text-slate-900 block font-bold">All 4 Zones</strong>
                <span className="text-[11px] text-slate-600">TPCODL, TPNODL, TPSODL, TPWODL</span>
              </div>
            </div>
          </div>

          {/* CTA Box */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold">Not sure which system fits your home?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Book a free site visit and our team will recommend the right solution for your budget and power needs.
            </p>
            <div className="pt-2">
              <Link
                href="/contact?type=site-visit"
                className="inline-flex items-center gap-2 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free Site Visit</span>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
