"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, Zap, CheckCircle2, UserCheck, Layers, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function AboutPage() {
  const credentials = [
    { label: "PM Surya Ghar Authorized", detail: "Empanelled Installer under National Solar Mission" },
    { label: "4 DISCOM Zones Empanelled", detail: "TPCODL, TPNODL, TPSODL, and TPWODL" },
    { label: "Pure EPC Positioning", detail: "Vendor-Agnostic engineering focused on high-yield specs" },
    { label: "Single Point Accountable", detail: "In-house design, execution, net metering & O&M team" },
  ];

  const whyChooseUs = [
    {
      title: "Government-Authorized PM Surya Ghar Installer",
      desc: "Empanelled installer under the national rooftop scheme facilitating seamless subsidy credit up to ₹78,000.",
      icon: Award,
    },
    {
      title: "Empanelled Across All 4 Odisha DISCOM Zones",
      desc: "Licensed for net-metering approvals and feasibility clearance across TPCODL, TPNODL, TPSODL, and TPWODL.",
      icon: ShieldCheck,
    },
    {
      title: "On-Grid, Off-Grid & Hybrid Expertise Under One Roof",
      desc: "Comprehensive technical mastery of grid-interactive net metering, battery energy storage, and hybrid backup.",
      icon: Layers,
    },
    {
      title: "End-to-End EPC Lifecycle Management",
      desc: "Site survey, structural engineering, component procurement, certified installation, net metering & after-sales maintenance.",
      icon: Zap,
    },
    {
      title: "Dedicated Project Support from Survey to Commissioning",
      desc: "Single accountable partner handling all DISCOM paperwork, site inspections, and long-term service contracts.",
      icon: UserCheck,
    },
  ];

  const coreTeam = [
    {
      name: "Er. Deepak Kumar Mohapatra",
      role: "Founder & Principal EPC Director",
      bio: "12+ years in electrical grid engineering and solar project execution across Odisha's industrial and residential sectors.",
    },
    {
      name: "Er. Soumya Ranjan Nayak",
      role: "Head of Solar Projects & DISCOM Liaison",
      bio: "Specialist in net metering regulatory compliance, structural load safety, and PM Surya Ghar portal management.",
    },
    {
      name: "Er. Subrat Kumar Jena",
      role: "Lead Systems Engineer & O&M Operations",
      bio: "Expert in hybrid battery storage design, string inverter synchronization, and commercial rooftop plant commissioning.",
    },
  ];

  return (
    <div className="w-full font-sans bg-[#FAFAFA]">
      {/* 1. Page Header / Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full inline-block">
            ABOUT PRAGATI ECOSOLAR
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Odisha&apos;s Trusted Solar EPC Partner
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {SITE_CONFIG.headline}
          </p>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
              OUR MISSION & IDENTITY
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Our Story</h2>
          </div>

          <div className="p-8 bg-[#FAFAFA] border border-slate-200 rounded-3xl text-sm text-slate-700 leading-relaxed space-y-4 shadow-sm">
            <p>
              Pragati EcoSolar is a solar EPC company based in Bhubaneswar, Odisha, delivering end-to-end rooftop and ground-mounted solar solutions across the state. We are an authorized installer under the PM Surya Ghar Muft Bijli Yojana and are empanelled across all four Odisha DISCOM zones — TPCODL, TPNODL, TPSODL, and TPWODL.
            </p>
            <p>
              From site assessment to grid commissioning, our in-house team manages the full project lifecycle — engineering, procurement, installation, subsidy processing, and after-sales support — so customers deal with a single accountable partner.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Credentials Strip */}
      <section className="py-12 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {credentials.map((c, i) => (
              <div key={i} className="p-4 bg-emerald-950/80 border border-emerald-800 rounded-2xl space-y-1">
                <strong className="text-xs font-mono font-bold text-amber-400 block">{c.label}</strong>
                <span className="text-xs text-slate-200">{c.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us (Icon Grid) */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full inline-block">
              OUR EPC ADVANTAGE
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Choose Pragati EcoSolar?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((w, i) => {
              const Icon = w.icon;
              return (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-3">
                  <div className="p-3 bg-slate-900 text-amber-400 rounded-xl w-fit">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{w.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Leadership / Core Team Cards Grid */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold px-3 py-1 bg-amber-50 border border-amber-200 rounded-full inline-block">
              ENGINEERING LEADERSHIP
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Core Technical Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreTeam.map((t, i) => (
              <div key={i} className="bg-[#FAFAFA] border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm">
                <div className="w-12 h-12 bg-slate-900 text-emerald-400 font-extrabold rounded-xl flex items-center justify-center font-mono text-lg">
                  {t.name[4]}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{t.name}</h3>
                  <span className="text-xs text-emerald-700 font-mono font-semibold block">{t.role}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-200">
                  {t.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Closing CTA */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Work with Odisha&apos;s Single Accountable EPC Partner</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Book a free site visit or request a custom technical proposal tailored to your power requirements.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/contact?type=site-visit"
              className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg"
            >
              Book Free Site Visit
            </Link>
            <Link
              href="/contact?type=quote"
              className="py-3.5 px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700"
            >
              Contact Engineering Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
