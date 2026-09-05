"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Award, Sun, Clock } from "lucide-react";

interface MetricsStripProps {
  systemsInstalled?: string;
  capacityDelivered?: string;
  discomZonesCovered?: string;
  epcScope?: string;
}

export default function MetricsStrip({
  systemsInstalled = "500+",
  capacityDelivered = "5+ MW",
  discomZonesCovered = "4 Zones",
  epcScope = "100% EPC",
}: MetricsStripProps) {
  const metrics = [
    {
      value: systemsInstalled,
      label: "Systems Installed",
      subtext: "Across Bhubaneswar, Cuttack & all of Odisha",
      icon: Award,
      gradient: "from-emerald-500 to-teal-500",
      glow: "rgba(16,185,129,0.2)",
      border: "rgba(16,185,129,0.2)",
    },
    {
      value: capacityDelivered,
      label: "Capacity Delivered",
      subtext: "High-yield rooftop & ground-mounted EPC",
      icon: Zap,
      gradient: "from-amber-400 to-orange-500",
      glow: "rgba(245,158,11,0.2)",
      border: "rgba(245,158,11,0.2)",
    },
    {
      value: discomZonesCovered,
      label: "DISCOM Zones",
      subtext: "TPCODL, TPNODL, TPSODL, TPWODL empanelled",
      icon: Sun,
      gradient: "from-cyan-500 to-sky-500",
      glow: "rgba(6,182,212,0.2)",
      border: "rgba(6,182,212,0.2)",
    },
    {
      value: epcScope,
      label: "On-Grid / Off-Grid / Hybrid",
      subtext: "Vendor-agnostic end-to-end solar expertise",
      icon: Clock,
      gradient: "from-violet-500 to-purple-600",
      glow: "rgba(139,92,246,0.2)",
      border: "rgba(139,92,246,0.2)",
    },
  ];

  return (
    <section className="relative py-16 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)" }}>
      {/* Top/bottom border lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400">
            Our Track Record
          </span>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <motion.div key={idx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.09, ease: "easeOut" }}
                whileHover={{ y: -5, boxShadow: `0 20px 40px ${m.glow}, 0 4px 16px rgba(0,0,0,0.06)` }}
                className="relative group bg-white rounded-2xl p-6 border transition-all duration-300 cursor-default overflow-hidden"
                style={{ border: `1px solid rgba(226,232,240,0.8)`, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
              >
                {/* Top accent stripe */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${m.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center mb-5 shadow-md`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Value */}
                <div className="text-4xl font-extrabold tracking-tight text-slate-900 mb-1"
                  style={{ fontVariantNumeric: "tabular-nums" }}>
                  {m.value}
                </div>
                <div className="text-sm font-bold text-slate-800 mb-1">{m.label}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{m.subtext}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
