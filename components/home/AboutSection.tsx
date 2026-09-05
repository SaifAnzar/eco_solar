"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck, Award, Zap, Building2, ArrowRight, Sun, MapPin, Sparkles,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.65, delay, ease: "easeOut" as const },
});

export default function AboutSection() {
  const highlights = [
    {
      title: "Authorized PM Surya Ghar Partner",
      desc: "Empanelled installer under central scheme offering up to ₹78,000 direct subsidy assistance.",
      icon: Award,
      accent: "from-emerald-500 to-teal-500",
      glow: "rgba(16,185,129,0.15)",
    },
    {
      title: "4-Zone DISCOM Clearance",
      desc: "Full net-metering approvals across TPCODL, TPNODL, TPSODL, and TPWODL.",
      icon: ShieldCheck,
      accent: "from-cyan-500 to-sky-500",
      glow: "rgba(6,182,212,0.15)",
    },
    {
      title: "Vendor-Agnostic EPC",
      desc: "Optimal Tier-1 ALMM panels & high-efficiency inverters tailored to site specifications.",
      icon: Sun,
      accent: "from-amber-400 to-orange-500",
      glow: "rgba(245,158,11,0.15)",
    },
    {
      title: "Cyclone-Resistant Mounting",
      desc: "Hot-dip galvanized steel structures engineered for coastal wind speeds up to 200 km/h.",
      icon: Zap,
      accent: "from-violet-500 to-purple-600",
      glow: "rgba(139,92,246,0.15)",
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden bg-white">
      {/* Subtle background texture */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 80% 20%, rgba(16,185,129,0.06) 0%, transparent 55%), radial-gradient(circle at 15% 75%, rgba(245,158,11,0.05) 0%, transparent 50%)" }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 items-center">

          {/* ── LEFT: Story */}
          <motion.div className="lg:col-span-5 space-y-7" {...fadeUp(0.05)}>
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                About Pragati EcoSolar
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                Odisha&apos;s Premier{" "}
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg,#10b981,#06b6d4)" }}>
                  Authorized Solar EPC
                </span>{" "}
                Partner
              </h2>
              <p className="text-slate-500 text-base leading-relaxed">
                Headquartered in Patia, Bhubaneswar, Pragati EcoSolar is a turnkey Solar EPC engineering company dedicated to powering Odisha homes, commercial complexes, and industrial plants with high-performance solar infrastructure.
              </p>
            </div>

            {/* Info card */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                We handle the entire journey — initial 3D rooftop shading analysis, civil and structural engineering, top-tier procurement, bi-directional meter DISCOM clearances, and PM Surya Ghar national portal subsidy disbursement.
              </p>
              <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  Patia, Bhubaneswar
                </span>
                <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-1 rounded-lg border border-emerald-200">
                  25-Yr Warranty
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link href="/about"
                className="group inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl shadow-lg transition-all duration-200 hover:scale-[1.02]">
                Read Full Story
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-sm font-bold rounded-xl shadow-sm transition-all duration-200 hover:scale-[1.02]">
                <Building2 className="w-4 h-4 text-emerald-600" />
                Visit Office
              </Link>
            </div>
          </motion.div>

          {/* ── RIGHT: Premium Feature Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div key={i} {...fadeUp(0.1 + i * 0.1)}
                  className="group relative p-6 rounded-2xl border border-slate-200/80 bg-white hover:border-transparent transition-all duration-300 hover:shadow-2xl overflow-hidden cursor-default"
                  style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
                  whileHover={{ y: -4, boxShadow: `0 20px 40px ${h.glow}, 0 4px 16px rgba(0,0,0,0.08)` }}
                >
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"
                    style={{ background: `linear-gradient(135deg, ${h.glow} 0%, transparent 70%)` }} />

                  {/* Icon */}
                  <div className={`relative w-11 h-11 rounded-xl bg-gradient-to-br ${h.accent} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <h3 className="relative text-sm font-bold text-slate-900 group-hover:text-slate-900 mb-2 leading-snug">
                    {h.title}
                  </h3>
                  <p className="relative text-xs text-slate-500 leading-relaxed">
                    {h.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
