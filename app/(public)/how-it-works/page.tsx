"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Compass, ShieldCheck, HardHat, Zap, Wrench, ArrowRight, CheckCircle2 } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      num: "01",
      title: "Free Site Visit & Consultation",
      desc: "Our technical team assesses your rooftop, structural integrity, shading analysis, and historical power consumption at zero cost to you.",
      bullets: [
        "On-site shadow analysis & roof measurement",
        "Power bill audit to calculate target solar capacity",
        "Discussion on On-Grid, Off-Grid or Hybrid options",
      ],
      icon: Calendar,
    },
    {
      num: "02",
      title: "Custom System Design",
      desc: "Engineered specifically for your site — not a generic one-size-fits-all package. We optimize tilt angle, string inverter sizing, and structural safety.",
      bullets: [
        "3D rooftop engineering layout & string design",
        "Structural wind-load analysis (150 km/h cyclone proofing)",
        "Itemized Bill of Materials (BOM) & yield prediction",
      ],
      icon: Compass,
    },
    {
      num: "03",
      title: "Subsidy & DISCOM Approval Assistance",
      desc: "Complete regulatory management — national portal registration for PM Surya Ghar, DISCOM feasibility approval, and document submission.",
      bullets: [
        "Registration on national portal (pmsuryaghar.gov.in)",
        "DISCOM net-metering feasibility application submission",
        "Full documentation handling — zero hassle for customer",
      ],
      icon: ShieldCheck,
    },
    {
      num: "04",
      title: "Installation by Trained Technicians",
      desc: "Certified in-house installation teams execute the build according to strict safety standards using high-grade BIS/ALMM-compliant components.",
      bullets: [
        "Hot-dip galvanized (HDG) steel structure mounting",
        "High-efficiency solar PV module mounting & alignment",
        "ACDB/DCDB wiring, earthing pits & lightning arrestor",
      ],
      icon: HardHat,
    },
    {
      num: "05",
      title: "Net Metering & Commissioning",
      desc: "Coordinating net meter installation with DISCOM inspectors and performing final system testing for live grid synchronization.",
      bullets: [
        "Bi-directional DLMS net meter testing & fitting",
        "DISCOM official inspection & joint commissioning report",
        "Plant turn-on & real-time generation testing",
      ],
      icon: Zap,
    },
    {
      num: "06",
      title: "After-Sales Support & Maintenance",
      desc: "Comprehensive preventive maintenance plans and responsive service across all Odisha branch zones to ensure maximum 25-year energy yield.",
      bullets: [
        "Scheduled high-pressure water module cleaning",
        "Inverter diagnostic checks & thermal scanning",
        "Direct tracking for government subsidy bank disbursement",
      ],
      icon: Wrench,
    },
  ];

  return (
    <div className="w-full font-sans bg-[#FAFAFA]">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full inline-block">
            STEP-BY-STEP PROJECT TIMELINE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">How It Works</h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From initial site assessment to grid commissioning and subsidy credit — here is how Pragati EcoSolar manages your entire project seamlessly.
          </p>
        </div>
      </section>

      {/* 6-Step Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="bg-[#FAFAFA] border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row gap-6 items-start relative overflow-hidden"
              >
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-3xl font-black text-amber-500 font-mono">{s.num}</span>
                  <div className="p-3.5 bg-slate-900 text-emerald-400 rounded-2xl">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-3 flex-1">
                  <h3 className="text-xl font-extrabold text-slate-900">{s.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    {s.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Start Step 1?</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Book your free site visit today. Our engineering team will assess your rooftop and provide a free custom proposal.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact?type=site-visit"
              className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg"
            >
              Book Free Site Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
