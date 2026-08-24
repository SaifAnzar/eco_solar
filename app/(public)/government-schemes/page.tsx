"use client";

import React from "react";
import Link from "next/link";
import { Award, CheckCircle2, ArrowRight, ShieldCheck, FileText, Banknote, Percent } from "lucide-react";

export default function GovernmentSchemesPage() {
  const subsidyTable = [
    { capacity: "1 kW Rooftop Solar", centralSubsidy: "₹30,000", stateSubsidy: "₹20,000", totalSubsidy: "₹50,000", estEpcCost: "₹65,000", netCost: "₹15,000" },
    { capacity: "2 kW Rooftop Solar", centralSubsidy: "₹60,000", stateSubsidy: "₹40,000", totalSubsidy: "₹1,00,000", estEpcCost: "₹1,30,000", netCost: "₹30,000" },
    { capacity: "3 kW & Above Rooftop Solar", centralSubsidy: "₹78,000 (Capped)", stateSubsidy: "₹50,000 (Capped)", totalSubsidy: "₹1,28,000", estEpcCost: "₹1,95,000", netCost: "₹67,000" },
  ];

  const eligibilityCriteria = [
    "Must be an Indian residential electricity consumer with valid consumer number",
    "Must possess suitable unshaded rooftop space or own property structure",
    "Must connect system under bi-directional net metering with local DISCOM",
    "No prior solar subsidy availed on the specific electricity consumer connection",
  ];

  const howWeHelpSteps = [
    { step: "1", title: "Free Eligibility Check & Site Assessment", desc: "Verifying consumer connection, rooftop space & DISCOM transformer feasibility." },
    { step: "2", title: "Registration on National Portal", desc: "Filing application on pmsuryaghar.gov.in portal on your behalf." },
    { step: "3", title: "DISCOM Feasibility Approval Coordination", desc: "Submitting load sanction paperwork to TPCODL / TPNODL / TPSODL / TPWODL." },
    { step: "4", title: "Installation by Certified EPC Team", desc: "Executing build using BIS/ALMM compliant solar PV modules & inverters." },
    { step: "5", title: "Net Meter Installation & Inspection", desc: "Coordinating DLMS two-way meter installation with DISCOM inspectors." },
    { step: "6", title: "Subsidy Disbursement Tracking", desc: "Filing Commissioning Report & tracking direct bank account credit." },
  ];

  const otherBenefits = [
    {
      title: "Bi-Directional Net Metering",
      desc: "Export surplus daytime electricity to the DISCOM grid and receive unit credits to offset night power usage.",
      icon: Percent,
    },
    {
      title: "80% Accelerated Depreciation (AD)",
      desc: "For commercial taxpayers & businesses to claim 80% tax depreciation benefit on solar capital investments in Year 1.",
      icon: Banknote,
    },
    {
      title: "Collateral-Free Bank Loan Assistance",
      desc: "Low-interest collateral-free solar loans from nationalized banks (SBI, Canara, PNB) with low EMIs under PM Surya Ghar.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="w-full font-sans bg-[#FAFAFA]">
      {/* 1. Explainer Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold px-3 py-1 bg-amber-400/10 border border-amber-400/20 rounded-full inline-block">
            NATIONAL SOLAR MISSION + ODISHA STATE SCHEME
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">PM Surya Ghar &amp; Odisha State Subsidy</h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Combined Central Government (up to ₹78,000) &amp; Odisha State Government (up to ₹50,000) subsidies — total benefits up to <strong>₹1,28,000</strong> for residential rooftop solar.
          </p>
        </div>
      </section>

      {/* 2. Subsidy Structure Table */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase text-emerald-700 font-bold tracking-widest">CENTRAL &amp; STATE GOVERNMENT SUBSIDY RATES</span>
            <h2 className="text-3xl font-extrabold text-slate-900">PM Surya Ghar &amp; Odisha State Subsidy Breakdown</h2>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900 text-white uppercase">
                <tr>
                  <th className="py-4 px-4">System Capacity</th>
                  <th className="py-4 px-4 text-emerald-300">Central Subsidy</th>
                  <th className="py-4 px-4 text-blue-300">Odisha State Subsidy</th>
                  <th className="py-4 px-4 text-amber-300">Total Subsidy</th>
                  <th className="py-4 px-4">Est. Gross EPC Cost</th>
                  <th className="py-4 px-4 text-emerald-400 font-extrabold">Net Out-of-Pocket Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800 font-sans">
                {subsidyTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 font-mono text-xs">
                    <td className="py-4 px-4 font-bold text-slate-900 font-sans text-sm">{row.capacity}</td>
                    <td className="py-4 px-4 text-emerald-600 font-bold text-sm">{row.centralSubsidy}</td>
                    <td className="py-4 px-4 text-blue-600 font-bold text-sm">{row.stateSubsidy}</td>
                    <td className="py-4 px-4 text-amber-600 font-extrabold text-sm">{row.totalSubsidy}</td>
                    <td className="py-4 px-4 text-slate-500 line-through">{row.estEpcCost}</td>
                    <td className="py-4 px-4 text-emerald-700 font-extrabold text-sm">{row.netCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>


      {/* 3. Eligibility Criteria */}
      <section className="py-16 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase text-amber-700 font-bold tracking-widest">WHO CAN APPLY</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Eligibility Criteria</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eligibilityCriteria.map((item, idx) => (
              <div key={idx} className="p-5 bg-white border border-slate-200 rounded-2xl flex items-start gap-3 shadow-sm text-xs text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How We Help You Apply (6 Steps) */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-widest">REGULATORY ASSISTANCE</span>
            <h2 className="text-3xl font-extrabold text-white">How We Help You Apply in 6 Steps</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {howWeHelpSteps.map((s) => (
              <div key={s.step} className="p-6 bg-slate-800 border border-slate-700 rounded-2xl space-y-2">
                <span className="text-2xl font-extrabold text-amber-400 font-mono">Step {s.step}</span>
                <h4 className="text-base font-bold text-white">{s.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Other Applicable Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase text-emerald-700 font-bold tracking-widest">ADDITIONAL ADVANTAGES</span>
            <h2 className="text-3xl font-extrabold text-slate-900">Other Applicable Financial Benefits</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherBenefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div key={idx} className="p-6 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-3 shadow-sm">
                  <div className="p-3 bg-slate-900 text-amber-400 rounded-xl w-fit">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{b.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 bg-emerald-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Check Your PM Surya Ghar Eligibility</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Book a free site visit or speak with our DISCOM liaison team to verify your eligibility for central subsidies.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/contact?type=site-visit" className="py-3.5 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow">
              Book Free Site Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
