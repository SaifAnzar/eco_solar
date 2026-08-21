"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Factory,
  Hospital,
  Hotel,
  Sprout,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  FileText,
  Phone,
  Calculator,
  TrendingUp,
  Sparkles,
  Check,
  Clock,
  PieChart,
  Briefcase,
  BadgeCheck,
  Receipt,
  Layers,
} from "lucide-react";
import { saveLeadAndNotifyWhatsApp } from "@/lib/actions/lead-action";

export default function CommercialSolarPage() {
  const [activeTab, setActiveTab] = useState<"calculator" | "industries" | "tax" | "process">("calculator");
  const [selectedKw, setSelectedKw] = useState<number>(50);
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", location: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Commercial ROI Calculation Logic
  const costPerKw = 55000;
  const grossCost = selectedKw * costPerKw;
  const adTaxSavings = grossCost * 0.8 * 0.25;
  const netInvestment = grossCost - adTaxSavings;
  const annualKwh = selectedKw * 1400;
  const commercialTariff = 7.5;
  const annualSavings = Math.round(annualKwh * commercialTariff);
  const paybackYears = (netInvestment / annualSavings).toFixed(1);
  const lifetimeSavings = Math.round((annualSavings * 25) / 100000);

  const presetCapacities = [10, 25, 50, 100, 250, 500];

  const whoThisIsFor = [
    { title: "Factories & Manufacturing", desc: "Offset heavy motor & machinery daytime loads.", icon: Factory, badge: "80% Bill Savings" },
    { title: "Commercial Offices", desc: "Lower HVAC air conditioning & lighting expenses.", icon: Building2, badge: "Tax Depreciation" },
    { title: "Hospitals & Healthcare", desc: "Ensure 24/7 power continuity with hybrid storage.", icon: Hospital, badge: "Blackout Continuity" },
    { title: "Hotels & Hospitality", desc: "Cut peak tariff charges for water heating & kitchens.", icon: Hotel, badge: "Green Branding" },
    { title: "Cold Storage & Agro", desc: "Offset high daytime refrigeration compressor loads.", icon: Sprout, badge: "High Daytime Sync" },
  ];

  const taxBenefits = [
    { step: "01", title: "80% Accelerated Depreciation", desc: "Claim 80% tax depreciation write-off in Year 1 under Section 32 of IT Act." },
    { step: "02", title: "Instant Tax Reduction", desc: "Save 20%–25% of total plant capital in corporate income tax write-offs." },
    { step: "03", title: "Fast 3-Year Payback", desc: "Bill savings + Year 1 tax write-offs recover capital in under 3.5 years." },
  ];

  const epcProcess = [
    { num: "01", title: "Site Audit & Load Curve", desc: "Roof load analysis & 15-min energy logging." },
    { num: "02", title: "Custom Financial Report", desc: "Itemized BOM, yield & tax calculation." },
    { num: "03", title: "DISCOM Feasibility", desc: "Transformer sanction & net meter application." },
    { num: "04", title: "Procurement & QC", desc: "Tier-1 ALMM panels & HDG steel frames." },
    { num: "05", title: "Certified Installation", desc: "Safety-compliant electrical & civil build." },
    { num: "06", title: "Net Metering Sync", desc: "DLMS net-meter fitting & grid turn-on." },
    { num: "07", title: "25-Year O&M Support", desc: "Routine panel washing & thermal audits." },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading || !form.name || !form.phone) return;
    setLoading(true);
    try {
      await saveLeadAndNotifyWhatsApp({
        customerName: form.name,
        phone: form.phone,
        email: form.email,
        address: `${form.company || "Commercial Client"} - ${form.location || "Odisha"}`,
        pincode: "751024",
        locationLabel: form.location || "Commercial Site",
        discom: "TPCODL (Central Odisha)",
        calculation: {
          systemKw: selectedKw,
          propertyType: "commercial",
          panelCount: Math.ceil((selectedKw * 1000) / 600),
          panelWp: 600,
          panelUnitPrice: 14000,
          totalPanelCost: grossCost,
          requiredRoofAreaSqFt: selectedKw * 90,
          benchmarkRatePerKw: costPerKw,
          grossSystemCost: grossCost,
          pmSuryaGharSubsidy: 0,
          centralSubsidy: 0,
          stateSubsidy: 0,
          totalSubsidy: 0,
          taxBenefit80AD: adTaxSavings,
          netPayableCost: netInvestment,
          pshUsed: 4.6,
          annualGenerationKwh: annualKwh,
          monthlyGenerationKwh: Math.round(annualKwh / 12),
          avoidedTariffPerUnit: commercialTariff,
          annualSavingsRs: annualSavings,
          monthlySavingsRs: Math.round(annualSavings / 12),
          paybackPeriodYears: Number(paybackYears),
          co2OffsetTonsPerYear: selectedKw * 1.1,
          equipmentBand: { minKw: 10, maxKw: 500, acdbDcdbSpec: "Industrial DCDB/ACDB", dcCableSpec: "6sqmm DC", acCableSpec: "25sqmm AC", earthingPitsCount: 6, laSpec: "ESE LA" },
          bom: [],
        },
        quotationRef: `C-EPC-${Date.now().toString().slice(-4)}`,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Commercial lead submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full font-sans bg-[#FAFAFA] text-slate-900 pb-12">
      
      {/* 1. COMPACT HERO HEADER */}
      <section className="bg-slate-900 text-white py-10 sm:py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full inline-block">
                COMMERCIAL & INDUSTRIAL SOLAR EPC (10 kW – 1 MW+)
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Cut Factory & Commercial Energy Bills by 80%
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                80% Accelerated Depreciation tax benefits & fast 3.2-year payback across Odisha.
              </p>
            </div>

            {/* Quick Metrics Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0 bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80">
              <div className="text-center px-2">
                <span className="text-base font-extrabold text-amber-400 font-mono block">80% AD</span>
                <span className="text-[10px] text-slate-300 block">Tax Write-Off</span>
              </div>
              <div className="text-center px-2">
                <span className="text-base font-extrabold text-emerald-400 font-mono block">3.2 Yrs</span>
                <span className="text-[10px] text-slate-300 block">Avg Payback</span>
              </div>
              <div className="text-center px-2">
                <span className="text-base font-extrabold text-blue-400 font-mono block">₹7.5/Unit</span>
                <span className="text-[10px] text-slate-300 block">Tariff Offset</span>
              </div>
              <div className="text-center px-2">
                <span className="text-base font-extrabold text-purple-400 font-mono block">25 Yrs</span>
                <span className="text-[10px] text-slate-300 block">Plant Life</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COMPACT TABBED DASHBOARD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
        
        {/* Nav Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          {[
            { id: "calculator", label: "Live ROI Calculator", icon: Calculator },
            { id: "industries", label: "Industry Solutions", icon: Briefcase },
            { id: "tax", label: "80% Tax Advantage", icon: Receipt },
            { id: "process", label: "7-Step EPC Process", icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: LIVE ROI CALCULATOR */}
        {activeTab === "calculator" && (
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  SELECT PLANT CAPACITY:
                </span>
                <div className="flex flex-wrap gap-2">
                  {presetCapacities.map((kw) => (
                    <button
                      key={kw}
                      onClick={() => setSelectedKw(kw)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        selectedKw === kw
                          ? "bg-emerald-500 text-slate-950 ring-2 ring-emerald-400 scale-105"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                      }`}
                    >
                      {kw} kW
                    </button>
                  ))}
                </div>
              </div>
              <span className="text-base font-mono font-extrabold text-amber-400 shrink-0">
                {selectedKw} kW Commercial Solar Plant
              </span>
            </div>

            {/* Metrics Output Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-mono">
              <div className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase block">Gross System Cost</span>
                <span className="text-lg font-bold text-white block">₹{(grossCost / 100000).toFixed(2)} Lakhs</span>
              </div>
              <div className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                <span className="text-[10px] text-emerald-400 font-bold uppercase block">Year 1 Tax Credit (80% AD)</span>
                <span className="text-lg font-bold text-emerald-400 block">- ₹{(adTaxSavings / 100000).toFixed(2)} Lakhs</span>
              </div>
              <div className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                <span className="text-[10px] text-amber-400 font-bold uppercase block">Annual Savings</span>
                <span className="text-lg font-bold text-amber-400 block">₹{(annualSavings / 100000).toFixed(2)} Lakhs/yr</span>
              </div>
              <div className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
                <span className="text-[10px] text-purple-400 font-bold uppercase block">25-Yr Lifetime Savings</span>
                <span className="text-lg font-bold text-purple-400 block">₹{lifetimeSavings} Lakhs</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300 font-mono">
              <span>Payback Period: <strong className="text-emerald-400 font-bold">{paybackYears} Years</strong></span>
              <a href="#proposal-form" className="text-emerald-400 font-bold hover:underline">Request Proposal →</a>
            </div>
          </div>
        )}

        {/* TAB 2: INDUSTRY SOLUTIONS */}
        {activeTab === "industries" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whoThisIsFor.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-slate-900 text-amber-400 rounded-xl">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: 80% TAX ADVANTAGE */}
        {activeTab === "tax" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {taxBenefits.map((b) => (
              <div key={b.step} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-sm">
                <span className="text-lg font-extrabold text-amber-500 font-mono block">STEP {b.step}</span>
                <h4 className="text-sm font-bold text-slate-900">{b.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: 7-STEP EPC PROCESS */}
        {activeTab === "process" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs">
            {epcProcess.map((step) => (
              <div key={step.num} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-1 shadow-sm">
                <span className="text-emerald-700 font-bold block">STEP {step.num}</span>
                <h5 className="font-bold text-slate-900 font-sans text-xs">{step.title}</h5>
                <p className="text-[11px] text-slate-600 font-sans leading-normal">{step.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* 3. COMPACT PROPOSAL REQUEST FORM */}
        <section id="proposal-form" className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 scroll-mt-28">
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold">Request a Commercial Solar Proposal</h3>
              <p className="text-xs text-slate-300">
                Selected Plant Size: <strong className="text-amber-400 font-mono">{selectedKw} kW</strong>. Schedule a free engineer rooftop audit anywhere in Odisha.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full Name *"
                    className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-sans"
                  />
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Mobile Number *"
                    className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Company / Factory Name"
                    className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-sans"
                  />
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Site Location / District"
                    className="p-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow transition-all font-sans flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>Submit {selectedKw} kW Proposal Request</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="p-6 bg-slate-800 border border-emerald-500/50 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Proposal Request Received!</h4>
                <p className="text-xs text-slate-300">
                  Thank you, {form.name}. Our senior EPC director will contact you within 24 hours.
                </p>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
