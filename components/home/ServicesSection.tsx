"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Home, Building2, Sprout, ArrowRight, Zap } from "lucide-react";
import KusumModal from "@/components/forms/KusumModal";

const TABS = [
  { key: "all",          label: "All Solutions",        icon: Zap,       color: "slate" },
  { key: "residential",  label: "Residential",          icon: Home,      color: "emerald" },
  { key: "commercial",   label: "Commercial & Industrial", icon: Building2, color: "amber" },
  { key: "agricultural", label: "Agriculture & Pumps",  icon: Sprout,    color: "cyan" },
] as const;

type TabKey = typeof TABS[number]["key"];

const TAB_ACTIVE: Record<string, string> = {
  all:          "bg-slate-900 text-white shadow-lg",
  residential:  "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20",
  commercial:   "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/20",
  agricultural: "bg-gradient-to-r from-cyan-500 to-sky-500 text-white shadow-lg shadow-cyan-500/20",
};

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isKusumOpen, setIsKusumOpen] = useState(false);

  const services = [
    {
      id: "residential",
      title: "Solar for Your Home (On-Grid)",
      capacityBadge: "1–10 kW",
      description: "Rooftop solar with complete setup — site inspection to net-metering approval. Cut monthly bills by 90% and claim up to ₹78,000 government subsidy.",
      image: "/services/on-grid.png",
      alt: "On-Grid rooftop solar panel installation on a home in Odisha",
      type: "residential" as const,
      features: ["Up to ₹78,000 direct bank subsidy", "Tier-1 Waaree & Adani panels, 25-yr warranty", "Complete DISCOM net-metering handled"],
      ctaText: "Calculate Home Savings",
      ctaHref: "/calculator?type=residential",
      isModalTrigger: false,
      accent: "from-emerald-500 to-teal-500",
      glow: "rgba(16,185,129,0.15)",
    },
    {
      id: "commercial",
      title: "Solar for Offices & Factories",
      capacityBadge: "10–500 kW+",
      description: "High-efficiency commercial installations for offices, factories, and buildings. Cut operational costs 60–80% with 80% first-year accelerated depreciation.",
      image: "/services/hybrid.png",
      alt: "Commercial rooftop solar plant on an office building in Odisha",
      type: "commercial" as const,
      features: ["80% first-year tax depreciation benefit", "Smart online solar monitoring app", "Full ROI payback within 3–4 years"],
      ctaText: "Calculate Business ROI",
      ctaHref: "/calculator?type=commercial",
      isModalTrigger: false,
      accent: "from-amber-400 to-orange-500",
      glow: "rgba(245,158,11,0.15)",
    },
    {
      id: "agricultural",
      title: "Solar Water Pumps for Farmers",
      capacityBadge: "3–10 HP",
      description: "Government-subsidized solar pumps under PM-KUSUM for reliable farm irrigation. Zero electricity bills, zero diesel expenses for Odisha farmland.",
      image: "/services/solar-pump.png",
      alt: "Solar water pump installation on a farm in Odisha",
      type: "agricultural" as const,
      features: ["Up to 90% subsidy under PM-KUSUM", "Heavy-duty surface & borewell pump integration", "All-weather cyclone resistant structure"],
      ctaText: "Pre-Register PM-KUSUM Interest",
      ctaHref: "#",
      isModalTrigger: true,
      accent: "from-cyan-500 to-sky-500",
      glow: "rgba(6,182,212,0.15)",
    },
    {
      id: "off-grid",
      title: "Off-Grid Solar (Battery Storage)",
      capacityBadge: "2–50 kW",
      description: "Standalone solar systems with Lithium/Tubular battery backup. Enjoy 24/7 uninterrupted electricity during severe weather and grid blackouts.",
      image: "/services/off-grid.png",
      alt: "Off-Grid solar system with battery storage",
      type: "residential" as const,
      features: ["100% power independence from grid", "Fast-charging Lithium battery options", "Perfect for farmhouses, shops & remote areas"],
      ctaText: "Get Battery Solar Quote",
      ctaHref: "/contact?type=quote",
      isModalTrigger: false,
      accent: "from-violet-500 to-purple-600",
      glow: "rgba(139,92,246,0.15)",
    },
    {
      id: "street-lights",
      title: "Solar Street Lights",
      capacityBadge: "12W–120W Auto",
      description: "All-in-one solar street lights with integrated panels and automatic dusk-to-dawn sensors for housing colonies, village roads, and campus premises.",
      image: "/services/street-lights.png",
      alt: "Automatic solar street lights system",
      type: "commercial" as const,
      features: ["Auto ON at sunset & OFF at sunrise", "Zero cabling or monthly bills", "Rust-proof steel, IP65 waterproof rating"],
      ctaText: "Request Lighting Quote",
      ctaHref: "/contact?type=quote",
      isModalTrigger: false,
      accent: "from-rose-500 to-pink-600",
      glow: "rgba(244,63,94,0.15)",
    },
    {
      id: "net-metering",
      title: "Net Metering & Govt Subsidy",
      capacityBadge: "100% DISCOM",
      description: "Complete paperwork and DISCOM handling for all Odisha zones. We ensure bi-directional meter fitting and direct bank subsidy payout.",
      image: "/services/net-metering.png",
      alt: "Net metering approval and government subsidy assistance",
      type: "residential" as const,
      features: ["PM Surya Ghar portal filing & verification", "DISCOM bi-directional net meter install", "Direct bank subsidy transfer guarantee"],
      ctaText: "Start Subsidy Process",
      ctaHref: "/contact?type=site-visit",
      isModalTrigger: false,
      accent: "from-emerald-500 to-cyan-500",
      glow: "rgba(16,185,129,0.15)",
    },
    {
      id: "maintenance",
      title: "Solar Care & Maintenance",
      capacityBadge: "Annual AMC",
      description: "Professional panel cleaning and health checkups to keep your solar plant running at peak output for 25 years across Odisha.",
      image: "/services/maintenance.png",
      alt: "Solar panel cleaning and AMC service",
      type: "commercial" as const,
      features: ["High-pressure de-mineralized panel wash", "Thermal scanning & inverter inspection", "Fast 24-hour technician dispatch support"],
      ctaText: "Book Maintenance Inspection",
      ctaHref: "/contact?type=site-visit",
      isModalTrigger: false,
      accent: "from-slate-600 to-slate-800",
      glow: "rgba(100,116,139,0.15)",
    },
  ];

  const displayed = services.filter(s => {
    if (activeTab === "all") return true;
    return s.type === activeTab;
  });

  return (
    <section id="services" className="relative py-20 sm:py-28 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)" }}>
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div className="text-center max-w-3xl mx-auto mb-14 space-y-4"
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full">
            <Zap className="w-3.5 h-3.5" />
            What We Install
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Solar Solutions for Every{" "}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg,#10b981,#06b6d4)" }}>
              Home & Business
            </span>
          </h2>
          <p className="text-slate-500 text-base leading-relaxed">
            Select a solution to calculate savings or pre-register for government subsidy programs.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${isActive ? TAB_ACTIVE[tab.key] : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"}`}>
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                  {tab.key === "all" && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${isActive ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>
                      {services.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayed.map((service, idx) => {
              const isSelected = selectedCardId === service.id;
              return (
                <motion.div key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  onClick={() => setSelectedCardId(prev => prev === service.id ? null : service.id)}
                  className={`group relative bg-white rounded-2xl border overflow-hidden cursor-pointer flex flex-col transition-all duration-300 ${
                    isSelected
                      ? "ring-2 shadow-xl border-transparent"
                      : "border-slate-200/80 hover:border-transparent hover:shadow-xl"
                  }`}
                  style={isSelected ? {
                    borderColor: service.glow,
                    boxShadow: `0 20px 40px ${service.glow}, 0 4px 16px rgba(0,0,0,0.08)`,
                  } : undefined}
                  whileHover={{ y: -4 }}
                >
                  {/* Top gradient bar */}
                  <div className={`h-1 w-full bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isSelected ? "opacity-100" : ""}`} />

                  {/* Image */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img src={service.image} alt={service.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }} />
                    {/* Badge */}
                    <span className="absolute bottom-3 left-3 text-[10px] font-mono font-bold text-white bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-white/10">
                      {service.capacityBadge}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5 gap-3">
                    <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-slate-800">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      {service.features.map((feat, fi) => (
                        <div key={fi} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-auto pt-4" onClick={e => e.stopPropagation()}>
                      {service.isModalTrigger ? (
                        <button type="button" onClick={() => setIsKusumOpen(true)}
                          className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r ${service.accent} shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer`}>
                          {service.ctaText}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <Link href={service.ctaHref}
                          className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r ${service.accent} shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]`}>
                          {service.ctaText}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <KusumModal isOpen={isKusumOpen} onClose={() => setIsKusumOpen(false)} />
    </section>
  );
}
