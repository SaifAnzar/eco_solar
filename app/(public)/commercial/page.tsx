"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Building2, Factory, Hospital, Hotel, Sprout, CheckCircle2, ShieldCheck, ArrowRight, FileText, Phone } from "lucide-react";
import { saveLeadAndNotifyWhatsApp } from "@/lib/actions/lead-action";

export default function CommercialSolarPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", company: "", location: "", kw: "25" });
  const [submitted, setSubmitted] = useState(false);

  const whyBusinessesChooseUs = [
    "Significant reduction in monthly electricity expenditure (cut bills by 60–80%)",
    "80% Accelerated Depreciation tax benefit in Year 1 for commercial taxpayers",
    "Customized system design based on load curve analysis & roof/ground space",
    "On-Grid, Off-Grid & Hybrid options tailored to power reliability requirements",
    "Dedicated EPC project manager handling end-to-end design to grid commissioning",
  ];

  const whoThisIsFor = [
    { title: "Factories & Manufacturing Units", desc: "High-consumption industrial units seeking steep tariff cost reduction.", icon: Factory },
    { title: "Commercial Complexes & Offices", desc: "Corporate office rooftops wanting sustainable green power & lower OpEx.", icon: Building2 },
    { title: "Hospitals & Educational Institutions", desc: "Critical healthcare & school campuses needing high reliability.", icon: Hospital },
    { title: "Hotels & Hospitality Sector", desc: "Hotels and resorts aiming to cut HVAC and lighting energy expenses.", icon: Hotel },
    { title: "Agricultural & Cold Storage Facilities", desc: "Cold chains and agro-processing units operating high daytime loads.", icon: Sprout },
  ];

  const epcProcess = [
    "Site Audit & Load Curve Analysis",
    "Custom Engineering & Structural Load Assessment",
    "Detailed Financial ROI & Payback Payoff Report",
    "Procurement of BIS/ALMM-Certified Components",
    "Execution & Installation by Trained Technical Teams",
    "Net Metering, DISCOM Inspection & Grid Synchronization",
    "Ongoing O&M Support & Annual Maintenance Contracts (AMC)",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    try {
      await saveLeadAndNotifyWhatsApp({
        customerName: form.name,
        phone: form.phone,
        email: form.email,
        address: `${form.company} - ${form.location}`,
        pincode: "751024",
        locationLabel: form.location || "Commercial Site",
        discom: "TPCODL (Central Odisha)",
        calculation: {
          systemKw: Number(form.kw) || 25,
          propertyType: "commercial",
          panelCount: Math.ceil(((Number(form.kw) || 25) * 1000) / 600),
          panelWp: 600,
          panelUnitPrice: 14000,
          totalPanelCost: (Number(form.kw) || 25) * 35000,
          requiredRoofAreaSqFt: (Number(form.kw) || 25) * 90,
          benchmarkRatePerKw: 55000,
          grossSystemCost: (Number(form.kw) || 25) * 55000,
          pmSuryaGharSubsidy: 0,
          centralSubsidy: 0,
          stateSubsidy: 0,
          totalSubsidy: 0,
          taxBenefit80AD: (Number(form.kw) || 25) * 55000 * 0.8 * 0.25,
          netPayableCost: (Number(form.kw) || 25) * 55000,
          pshUsed: 4.6,
          annualGenerationKwh: (Number(form.kw) || 25) * 1400,
          monthlyGenerationKwh: Math.round(((Number(form.kw) || 25) * 1400) / 12),
          avoidedTariffPerUnit: 7.0,
          annualSavingsRs: (Number(form.kw) || 25) * 1400 * 7.0,
          monthlySavingsRs: Math.round(((Number(form.kw) || 25) * 1400 * 7.0) / 12),
          paybackPeriodYears: 3.5,
          co2OffsetTonsPerYear: (Number(form.kw) || 25) * 1.1,
          equipmentBand: { minKw: 10, maxKw: 50, acdbDcdbSpec: "Industrial DCDB/ACDB", dcCableSpec: "6sqmm DC", acCableSpec: "16sqmm AC", earthingPitsCount: 4, laSpec: "ESE LA" },
          bom: [],
        },
        quotationRef: `C-EPC-${Date.now().toString().slice(-4)}`,
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Commercial lead submission failed:", err);
    }
  };

  return (
    <div className="w-full font-sans bg-[#FAFAFA]">
      {/* 1. Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold px-3 py-1 bg-amber-400/10 border border-amber-400/20 rounded-full inline-block">
            COMMERCIAL & INDUSTRIAL EPC
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Solar EPC for Businesses & Factories</h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            End-to-end EPC solutions for businesses, factories, and institutions engineered to cut operating costs and deliver measurable ROI.
          </p>
          <div className="pt-2 text-xs font-mono text-emerald-400 font-bold">
            CAPACITY RANGE: 5 kW – 1 MW+ (Custom-engineered per site)
          </div>
        </div>
      </section>

      {/* 2. Why Businesses Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase text-emerald-700 font-bold tracking-widest">BUSINESS BENEFITS</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Why Businesses Choose Pragati EcoSolar</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyBusinessesChooseUs.map((point, idx) => (
              <div key={idx} className="p-6 bg-[#FAFAFA] border border-slate-200 rounded-2xl flex items-start gap-3 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-800 font-medium leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Who This Is For */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase text-amber-700 font-bold tracking-widest">TARGET SECTORS</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Who This Is For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whoThisIsFor.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
                  <div className="p-3 bg-slate-900 text-amber-400 rounded-xl w-fit">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Commercial EPC Process */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">EXECUTION METHODOLOGY</span>
            <h2 className="text-3xl font-extrabold text-white">7-Step Commercial EPC Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {epcProcess.map((step, idx) => (
              <div key={idx} className="p-4 bg-slate-800 border border-slate-700 rounded-xl flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="text-slate-200 font-sans text-sm">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Custom Quote Callout & Lead Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono text-emerald-700 font-bold uppercase tracking-widest">GET IN TOUCH</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Request a Commercial Solar Proposal</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Capacity Range: <strong className="text-slate-900 font-mono">5 kW – 1 MW+</strong> (custom-engineered per site). Fill in your details below to schedule a free site audit.
            </p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="bg-[#FAFAFA] border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 text-xs font-mono shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1 uppercase">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Subhash Chandra Swain"
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1 uppercase">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="e.g. 98610 12345"
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1 uppercase">Company / Organization Name</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. Kalinga Steel Industries"
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1 uppercase">Est. Plant Capacity (kW)</label>
                  <input
                    type="number"
                    value={form.kw}
                    onChange={(e) => setForm({ ...form, kw: e.target.value })}
                    placeholder="e.g. 50"
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1 uppercase">Site Location / District</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="e.g. Choudwar Industrial Estate, Cuttack"
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all font-sans"
              >
                Submit Commercial EPC Request
              </button>
            </form>
          ) : (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-3xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="text-xl font-bold text-slate-900">Proposal Request Received!</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thank you. Our Commercial Engineering Manager will contact you within 24 hours to review site parameters and arrange a technical audit.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
