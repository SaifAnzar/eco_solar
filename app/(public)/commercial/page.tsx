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
  DollarSign,
  Award,
  Zap,
  Sparkles,
  Check,
  Clock,
  PieChart,
  BadgeCheck,
} from "lucide-react";
import { saveLeadAndNotifyWhatsApp } from "@/lib/actions/lead-action";

export default function CommercialSolarPage() {
  const [selectedKw, setSelectedKw] = useState<number>(50);
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", location: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Commercial ROI Calculation Logic
  const costPerKw = 55000; // Benchmark commercial rate
  const grossCost = selectedKw * costPerKw;
  const adTaxSavings = grossCost * 0.8 * 0.25; // 80% AD at 25% tax bracket
  const netInvestment = grossCost - adTaxSavings;
  const annualKwh = selectedKw * 1400; // 1400 units/kW/year in Odisha
  const commercialTariff = 7.5; // Avg commercial tariff in Odisha (₹/unit)
  const annualSavings = Math.round(annualKwh * commercialTariff);
  const paybackYears = (netInvestment / annualSavings).toFixed(1);
  const lifetimeSavings = Math.round((annualSavings * 25) / 100000); // In Lakhs

  const presetCapacities = [10, 25, 50, 100, 250, 500];

  const whoThisIsFor = [
    {
      title: "Factories & Manufacturing Plants",
      desc: "High daytime heavy motor & machinery load. Drastically cut monthly industrial electricity bills.",
      icon: Factory,
      highlight: "Up to 80% Bill Savings",
      color: "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
      title: "Commercial Hubs & Office Complexes",
      desc: "Lower HVAC air conditioning and lighting operating expenses for corporate headquarters.",
      icon: Building2,
      highlight: "80% Tax Depreciation",
      color: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      title: "Hospitals & Medical Centers",
      desc: "Ensure high power reliability for 24/7 critical healthcare facilities with hybrid backup integration.",
      icon: Hospital,
      highlight: "Blackout Continuity",
      color: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      title: "Hotels & Hospitality Resorts",
      desc: "Reduce heavy electricity bills from round-the-clock water heaters, kitchens, & guest air conditioning.",
      icon: Hotel,
      highlight: "Green Hotel Branding",
      color: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      title: "Cold Storage & Agro Processing",
      desc: "Offset massive daytime refrigeration compressor loads for food processing units & agro warehouses.",
      icon: Sprout,
      highlight: "High Daytime Solar Sync",
      color: "bg-cyan-50 text-cyan-600 border-cyan-200",
    },
  ];

  const taxBenefits = [
    {
      step: "01",
      title: "80% Accelerated Depreciation (AD)",
      desc: "Under Section 32 of the Indian Income Tax Act, commercial taxpayers can claim up to 80% depreciation write-off in Year 1.",
    },
    {
      step: "02",
      title: "Instant Tax Liability Reduction",
      desc: "Drastically reduce taxable corporate income, effectively saving 20%–25% of total plant cost in corporate tax savings.",
    },
    {
      step: "03",
      title: "Fast 3-Year Capital Payback",
      desc: "Combined power bill savings + Year-1 tax write-offs recover the entire solar capital investment in just 3 to 3.5 years.",
    },
  ];

  const epcProcess = [
    { num: "01", title: "Site Audit & Load Curve Analysis", desc: "Detailed roof structural engineering & 15-minute load curve logging." },
    { num: "02", title: "Custom Financial & Technical Proposal", desc: "Itemized BOM, yield simulation report, and tax benefit breakdown." },
    { num: "03", title: "DISCOM Feasibility & Approval", desc: "Paperwork submission & section officer transformer clearance." },
    { num: "04", title: "Procurement & Quality Testing", desc: "Tier-1 ALMM panels, industrial string inverters, & HDG steel structures." },
    { num: "05", title: "Engineering Build & Safety Installation", desc: "Executed by certified in-house electrical teams following strict safety norms." },
    { num: "06", title: "DLMS Net-Metering & Grid Commissioning", desc: "Joint inspection with DISCOM officials and plant turn-on." },
    { num: "07", title: "25-Year Operations & Maintenance (O&M)", desc: "Routine panel washing, thermal audits, and 24/7 breakdown support." },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
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
    <div className="w-full font-sans bg-[#FAFAFA] text-slate-900 pb-16">
      
      {/* 1. HERO BANNER WITH METRICS */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>COMMERCIAL & INDUSTRIAL SOLAR EPC (10 kW TO 1 MW+)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto">
            Cut Factory & Commercial Operating Costs by up to 80%
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Pragati EcoSolar designs, engineers, and installs turnkey commercial solar rooftop & ground-mounted plants across Odisha. Benefit from 80% Accelerated Depreciation tax write-offs and recover your capital in under 3.5 years.
          </p>

          {/* Quick Metrics Cards */}
          <div className="pt-6 max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-2xl text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono block">80% AD</span>
              <span className="text-xs font-bold text-white block">Tax Depreciation</span>
              <span className="text-[10px] text-slate-400 font-mono block">Year 1 Write-off</span>
            </div>

            <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-2xl text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono block">3.2 Years</span>
              <span className="text-xs font-bold text-white block">Avg Payback</span>
              <span className="text-[10px] text-slate-400 font-mono block">Fast ROI Return</span>
            </div>

            <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-2xl text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono block">₹7.5 / Unit</span>
              <span className="text-xs font-bold text-white block">Tariff Offset</span>
              <span className="text-[10px] text-slate-400 font-mono block">High Industrial Rate</span>
            </div>

            <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-2xl text-center space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono block">25 Years</span>
              <span className="text-xs font-bold text-white block">Plant Lifecycle</span>
              <span className="text-[10px] text-slate-400 font-mono block">Tier-1 ALMM Panels</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. INTERACTIVE COMMERCIAL ROI & TAX SAVINGS CALCULATOR */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full inline-block">
              LIVE FINANCIAL SIMULATOR
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Commercial Solar ROI & Tax Savings Calculator
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Select your estimated plant capacity below to see live tax write-offs, annual savings, and payback period.
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 space-y-8">
            
            {/* Capacity Presets Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  SELECT PLANT CAPACITY (kW):
                </span>
                <span className="text-lg font-mono font-extrabold text-amber-400">
                  {selectedKw} kW Solar Plant
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {presetCapacities.map((kw) => (
                  <button
                    key={kw}
                    onClick={() => setSelectedKw(kw)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
                      selectedKw === kw
                        ? "bg-emerald-500 text-slate-950 ring-2 ring-emerald-400 scale-105 shadow-md"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
                    }`}
                  >
                    {kw} kW
                  </button>
                ))}
              </div>
            </div>

            {/* Live Financial Metrics Output Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-2xl space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase block">Gross System Cost</span>
                <span className="text-2xl font-extrabold text-white font-mono block">
                  ₹{(grossCost / 100000).toFixed(2)} Lakhs
                </span>
                <span className="text-[10px] text-slate-400 block">@ ₹55,000 / kW benchmark</span>
              </div>

              <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-2xl space-y-1">
                <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase block">Year 1 Tax Credit (80% AD)</span>
                <span className="text-2xl font-extrabold text-emerald-400 font-mono block">
                  - ₹{(adTaxSavings / 100000).toFixed(2)} Lakhs
                </span>
                <span className="text-[10px] text-slate-300 block">Income Tax Liability Write-Off</span>
              </div>

              <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-2xl space-y-1">
                <span className="text-[11px] font-mono text-amber-400 font-bold uppercase block">Annual Electricity Savings</span>
                <span className="text-2xl font-extrabold text-amber-400 font-mono block">
                  ₹{(annualSavings / 100000).toFixed(2)} Lakhs / yr
                </span>
                <span className="text-[10px] text-slate-300 block">{annualKwh.toLocaleString()} kWh units / year</span>
              </div>

              <div className="p-4 bg-slate-800/90 border border-slate-700 rounded-2xl space-y-1">
                <span className="text-[11px] font-mono text-purple-400 font-bold uppercase block">25-Year Lifetime Savings</span>
                <span className="text-2xl font-extrabold text-purple-400 font-mono block">
                  ₹{lifetimeSavings} Lakhs
                </span>
                <span className="text-[10px] text-slate-300 block">Payback in {paybackYears} Years</span>
              </div>

            </div>

            {/* Quick Action Bar */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-300 font-medium">
                Effective Net Investment after Year-1 Tax Benefit:{" "}
                <strong className="text-emerald-400 font-mono text-sm">₹{(netInvestment / 100000).toFixed(2)} Lakhs</strong>
              </div>
              <a
                href="#proposal-form"
                className="py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow transition-all flex items-center gap-2"
              >
                <span>Request Detailed {selectedKw} kW Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 3. TARGET SECTORS BENTO GRID */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold px-3 py-1 bg-amber-50 border border-amber-200 rounded-full inline-block">
              TAILORED INDUSTRY SOLUTIONS
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Built for Your Specific Industry Needs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We design custom solar setups for factories, offices, hospitals, hotels, and agro processing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whoThisIsFor.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm hover:shadow-md hover:border-emerald-500/40 hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl border ${item.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                      {item.highlight}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. 80% ACCELERATED DEPRECIATION TAX ADVANTAGE */}
      <section className="py-20 bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              TAX ADVANTAGE UNDER SECTION 32
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              How 80% Accelerated Depreciation Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {taxBenefits.map((b) => (
              <div key={b.step} className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 space-y-3">
                <span className="text-2xl font-extrabold text-amber-400 font-mono block">STEP {b.step}</span>
                <h4 className="text-base font-bold text-white">{b.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. 7-STEP COMMERCIAL EPC PROCESS */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full inline-block">
              TURNKEY EXECUTION METHODOLOGY
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              7-Step Commercial EPC Execution Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {epcProcess.map((step) => (
              <div key={step.num} className="bg-[#FAFAFA] border border-slate-200 rounded-2xl p-5 space-y-2">
                <span className="text-xs font-mono text-emerald-700 font-bold block">STEP {step.num}</span>
                <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. PROPOSAL LEAD FORM SECTION */}
      <section id="proposal-form" className="py-20 bg-slate-900 text-white scroll-mt-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
              SCHEDULE FREE COMMERCIAL AUDIT
            </span>
            <h2 className="text-3xl font-extrabold text-white">Request Your Custom Commercial EPC Proposal</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Selected plant size: <strong className="text-amber-400 font-mono">{selectedKw} kW</strong>. Fill in your details below to schedule a free rooftop audit & custom financial report.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-10 space-y-5 text-xs font-mono shadow-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-slate-300 font-bold mb-1 uppercase">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Rajesh Kumar Mohanty"
                    className="w-full p-3.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1 uppercase">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g. 98610 12345"
                    className="w-full p-3.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-slate-300 font-bold mb-1 uppercase">Company / Factory Name</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. Kalinga Steel & Alloys"
                    className="w-full p-3.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1 uppercase">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="e.g. rajesh@kalingasteel.com"
                    className="w-full p-3.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1 uppercase">Plant Location / Industrial Estate</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="e.g. Choudwar Industrial Estate, Cuttack"
                  className="w-full p-3.5 bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all font-sans flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Generating Commercial Proposal...</span>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Submit {selectedKw} kW Commercial EPC Request</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="p-10 bg-slate-800 border border-emerald-500/50 rounded-3xl text-center space-y-4 shadow-xl">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-2xl font-extrabold text-white">Commercial Proposal Request Received!</h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto">
                Thank you, <strong>{form.name}</strong>. Our senior EPC project director will inspect your site at {form.location || "your facility"} and present an itemized BOM & ROI analysis within 24 hours.
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 py-3 px-6 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow"
              >
                <span>View Our Completed Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

        </div>
      </section>

    </div>
  );
}
