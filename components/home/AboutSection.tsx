"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Zap,
  CheckCircle2,
  Building2,
  ArrowRight,
  Sun,
  MapPin,
  Sparkles,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function AboutSection() {
  const highlights = [
    {
      title: "Authorized PM Surya Ghar Partner",
      desc: "Empanelled installer under central scheme offering up to ₹78,000 direct subsidy assistance.",
      icon: Award,
    },
    {
      title: "4-Zone DISCOM Clearance",
      desc: "Full net-metering approvals across TPCODL, TPNODL, TPSODL, and TPWODL.",
      icon: ShieldCheck,
    },
    {
      title: "Vendor-Agnostic EPC",
      desc: "Optimal Tier-1 ALMM panels & high-efficiency inverters tailored to site specifications.",
      icon: Sun,
    },
    {
      title: "Cyclone-Resistant Mounting",
      desc: "Hot-dip galvanized steel structures engineered for coastal wind speeds up to 200 km/h.",
      icon: Zap,
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-slate-100 font-sans relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Story & Vision */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>ABOUT PRAGATI ECOSOLAR</span>
              </span>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Odisha&apos;s Premier Authorized <span className="text-emerald-600">Solar EPC</span> Partner
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Headquartered in Patia, Bhubaneswar, Pragati EcoSolar is a turnkey Solar EPC engineering company dedicated to powering Odisha homes, commercial complexes, and industrial plants with high-performance solar infrastructure.
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
              <p>
                We handle the entire journey — initial 3D rooftop shading analysis, civil and structural engineering, top-tier procurement, bi-directional meter DISCOM clearances, and PM Surya Ghar national portal subsidy disbursement.
              </p>
              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between font-mono text-xs">
                <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Patia, Bhubaneswar</span>
                </span>
                <span className="text-emerald-700 font-bold bg-emerald-100/70 px-2.5 py-0.5 rounded">
                  25-Yr Performance Warranty
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/about"
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 group"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold rounded-xl transition-all flex items-center gap-2 shadow-sm"
              >
                <Building2 className="w-4 h-4 text-emerald-600" />
                <span>Visit Office</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Key Feature Bento Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all space-y-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {h.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
