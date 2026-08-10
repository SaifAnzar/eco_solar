"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  Sun,
  Zap,
  Layers,
  Droplets,
  Lightbulb,
  ShieldCheck,
  Wrench,
  CheckCircle2,
  ArrowRight,
  Home,
  Building2,
  Calendar,
  FileText,
  BadgeCheck,
  Clock,
  Sparkles,
  PhoneCall,
} from "lucide-react";

export default function ServicesPage() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          const yOffset = -84;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 150);
    }
  }, []);

  const quickNav = [
    { label: "On-Grid EPC", href: "#on-grid", icon: Sun, color: "text-amber-500 bg-amber-50 border-amber-200" },
    { label: "Off-Grid EPC", href: "#off-grid", icon: Zap, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { label: "Hybrid EPC", href: "#hybrid", icon: Layers, color: "text-blue-600 bg-blue-50 border-blue-200" },
    { label: "Water Pumps", href: "#pumps", icon: Droplets, color: "text-cyan-600 bg-cyan-50 border-cyan-200" },
    { label: "Street Lights", href: "#lighting", icon: Lightbulb, color: "text-yellow-600 bg-yellow-50 border-yellow-200" },
    { label: "Net Metering", href: "#net-metering", icon: ShieldCheck, color: "text-purple-600 bg-purple-50 border-purple-200" },
    { label: "O&M Maintenance", href: "#om", icon: Wrench, color: "text-rose-600 bg-rose-50 border-rose-200" },
  ];

  return (
    <div className="w-full font-sans bg-[#FAFAFA] text-slate-900">
      {/* 1. Page Header & Quick Section Jump Navigation */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full inline-block shadow-sm">
            END-TO-END SOLAR EPC SERVICES IN ODISHA
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Our Solar EPC Services & Solutions
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From residential rooftops to large-scale commercial plants, agricultural water pumps, and municipal street lights — Pragati EcoSolar provides total turnkey EPC engineering, net-metering approvals, and PM Surya Ghar subsidy disbursement.
          </p>

          {/* Quick Jump Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto">
            {quickNav.map((q) => {
              const Icon = q.icon;
              return (
                <a
                  key={q.href}
                  href={q.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(q.href.replace("#", ""));
                    if (el) {
                      const yOffset = -84;
                      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border shadow-sm transition-all hover:scale-105 ${q.color}`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{q.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* 2. ON-GRID SOLAR EPC */}
        <section id="on-grid" className="scroll-mt-28 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-xs font-mono font-bold">
                <Sun className="w-4 h-4 text-amber-600" />
                <span>1 kW TO 500 kW+ NET-METERED SYSTEMS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Solar EPC — On-Grid Systems
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                On-Grid solar power systems are connected directly to your utility DISCOM grid (TPCODL, TPNODL, TPSODL, TPWODL). Power generated during the day powers your load directly, and surplus electricity is exported to the grid through a bi-directional DLMS net meter to earn bill credits.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact?type=quote"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Get On-Grid Quote</span>
              </Link>
              <Link
                href="/contact?type=site-visit"
                className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Book Site Survey</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                PM Surya Ghar Subsidies
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Eligible for central subsidies up to ₹78,000 for residential rooftops up to 3kW+, plus additional Odisha state incentives.
              </p>
            </div>

            <div className="p-5 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                Zero Battery Expense
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Uses DISCOM grid as virtual storage. Lowest capital outlay per kW with fastest payback period (usually 3–4 years).
              </p>
            </div>

            <div className="p-5 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                25-Year Performance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tier-1 ALMM approved Mono PERC / TOPCon panels with 25-year linear performance warranty and high wind-resistant structure.
              </p>
            </div>
          </div>
        </section>

        {/* 3. OFF-GRID SOLAR EPC */}
        <section id="off-grid" className="scroll-mt-28 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-xs font-mono font-bold">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>2 kW TO 50 kW BATTERY-BACKED INDEPENDENT POWER</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Solar EPC — Off-Grid Systems
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                Off-Grid solar systems operate completely independent of the power grid. Integrated with high-capacity Lithium (LiFePO4) or Tubular Gel battery banks, off-grid systems store daytime solar energy to power your facility 24/7 without DISCOM grid reliance.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact?type=quote"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Get Off-Grid Quote</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                100% Power Independence
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero electricity bills and zero vulnerability to grid power cuts, voltage drops, or DISCOM transformer breakdowns.
              </p>
            </div>

            <div className="p-5 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                LiFePO4 Smart Battery Tech
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Long life lithium iron phosphate battery banks with 4,000+ charge cycles, fast charging, and zero maintenance.
              </p>
            </div>

            <div className="p-5 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                Ideal for Remote Locations
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Perfect for rural farmhouses, resorts, telecom towers, eco-lodges, and sites where DISCOM grid power line extensions are unviable.
              </p>
            </div>
          </div>
        </section>

        {/* 4. HYBRID SOLAR EPC */}
        <section id="hybrid" className="scroll-mt-28 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-xs font-mono font-bold">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>3 kW TO 100 kW SMART HYBRID ARCHITECTURE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Solar EPC — Hybrid Systems
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                Hybrid systems deliver the best of both worlds: utility net-metering bill savings PLUS lithium battery power backup during power outages. Smart hybrid inverters intelligently prioritize power sources to maximize savings while guaranteeing emergency power backup.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact?type=quote"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Get Hybrid Proposal</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                Blackout-Proof Continuity
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Switches seamlessly to battery power in less than 10 milliseconds during load shedding or grid power failure.
              </p>
            </div>

            <div className="p-5 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                Net Meter Export + Storage
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fills battery storage first for peak load security, then exports all excess solar generation back to DISCOM grid for credits.
              </p>
            </div>

            <div className="p-5 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                Smart Load Management
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Configurable power priorities via Wi-Fi app — set battery discharge thresholds, grid feed rates, and emergency reserves.
              </p>
            </div>
          </div>
        </section>

        {/* 5. SOLAR WATER PUMPING SYSTEMS */}
        <section id="pumps" className="scroll-mt-28 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 border border-cyan-200 rounded-full text-cyan-700 text-xs font-mono font-bold">
                <Droplets className="w-4 h-4 text-cyan-600" />
                <span>3 HP TO 10 HP AGRICULTURAL & COMMUNITY PUMPS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Solar Water Pumping Systems
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                High-yield solar water pump solutions designed specifically for agricultural irrigation, livestock farms, fish ponds, and rural community water distribution across Odisha under PM-KUSUM scheme guidelines.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact?type=quote"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Inquire Pump System</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                Zero Electricity & Fuel Costs
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Operates completely on free solar energy during daylight hours — eliminating expensive diesel generator costs and electricity bills.
              </p>
            </div>

            <div className="p-5 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                MPPT Pump Drive Technology
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Advanced Maximum Power Point Tracking VFD controllers ensure smooth pump startup even on overcast days and early mornings.
              </p>
            </div>

            <div className="p-5 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                Submersible & Surface Pumps
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Supports deep borewell submersibles, open well pumps, and surface centrifugal pumps with dry-run and overvoltage protection.
              </p>
            </div>
          </div>
        </section>

        {/* 6. SOLAR STREET LIGHTING SOLUTIONS */}
        <section id="lighting" className="scroll-mt-28 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-50 border border-yellow-200 rounded-full text-yellow-700 text-xs font-mono font-bold">
                <Lightbulb className="w-4 h-4 text-yellow-600" />
                <span>STANDALONE ALL-IN-ONE & CENTRALIZED LIGHTING</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Solar Street Lighting Solutions
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                Standalone All-In-One (AIO) and modular solar street lights for institutions, panchayats, housing societies, industrial parks, resorts, and municipal roads across Odisha.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact?type=quote"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Get Street Lighting Proposal</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                Automatic Dusk-to-Dawn Operation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Smart optical sensors turn lights on automatically at dusk and off at dawn, with motion sensors to conserve battery during late night hours.
              </p>
            </div>

            <div className="p-5 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                Integrated LiFePO4 Battery Pack
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Built-in lithium batteries mounted directly inside weatherproof luminaire housings for anti-theft security and long service life.
              </p>
            </div>

            <div className="p-5 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                Hot-Dip Galvanized Poles
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cyclone-resistant octagonal or tubular steel poles coated with anti-corrosion paint designed for coastal Odisha weather conditions.
              </p>
            </div>
          </div>
        </section>

        {/* 7. NET METERING & SUBSIDY ASSISTANCE */}
        <section id="net-metering" className="scroll-mt-28 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-50 border border-purple-200 rounded-full text-purple-700 text-xs font-mono font-bold">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>TPCODL • TPNODL • TPSODL • TPWODL EMPANELLED</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Net Metering & Subsidy Assistance
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                Navigating utility approvals can be complicated. Pragati EcoSolar manages 100% of the DISCOM paperwork, technical inspections, DLMS net-meter commissioning, and national portal subsidy claims on your behalf.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact?type=site-visit"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Start Subsidy Process</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <span className="text-xs font-mono text-emerald-700 font-bold">STEP 1</span>
              <h4 className="text-xs font-bold text-slate-900">Portal Registration</h4>
              <p className="text-[11px] text-slate-600 leading-normal">
                Submission of consumer details on PM Surya Ghar portal & DISCOM online portal within 24 hours.
              </p>
            </div>

            <div className="p-4 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <span className="text-xs font-mono text-emerald-700 font-bold">STEP 2</span>
              <h4 className="text-xs font-bold text-slate-900">Feasibility Sanction</h4>
              <p className="text-[11px] text-slate-600 leading-normal">
                Technical feasibility approval from local DISCOM section officer and transformer load verification.
              </p>
            </div>

            <div className="p-4 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <span className="text-xs font-mono text-emerald-700 font-bold">STEP 3</span>
              <h4 className="text-xs font-bold text-slate-900">DLMS Meter Sync</h4>
              <p className="text-[11px] text-slate-600 leading-normal">
                Installation and testing of government-approved bi-directional net meter and plant commissioning.
              </p>
            </div>

            <div className="p-4 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <span className="text-xs font-mono text-emerald-700 font-bold">STEP 4</span>
              <h4 className="text-xs font-bold text-slate-900">Direct Bank Credit</h4>
              <p className="text-[11px] text-slate-600 leading-normal">
                Upload of commissioning report for direct central subsidy deposit into your bank account.
              </p>
            </div>
          </div>
        </section>

        {/* 8. OPERATION & MAINTENANCE (O&M) */}
        <section id="om" className="scroll-mt-28 bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 border border-rose-200 rounded-full text-rose-700 text-xs font-mono font-bold">
                <Wrench className="w-4 h-4 text-rose-600" />
                <span>ANNUAL AMC & PREVENTIVE MAINTENANCE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                O&M (Operation & Maintenance) Services
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                Protect your solar investment and guarantee peak kilowatt-hour (kWh) generation year after year. We offer routine high-pressure panel washing, string inverter diagnostic checks, thermal imaging hotspot scans, and emergency breakdown support across Odisha.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact?type=quote"
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2"
              >
                <Wrench className="w-4 h-4" />
                <span>Book O&M Service</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                Periodic Panel Cleaning
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Scheduled pure-water pressure washing to remove dust, soot, and bird droppings, restoring full light absorption and yield.
              </p>
            </div>

            <div className="p-5 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                Thermal Hotspot Audits
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Infrared thermography scans to detect micro-cracks, loose contacts, and cell hotspots before they cause generation loss or damage.
              </p>
            </div>

            <div className="p-5 bg-[#FAFAFA] border border-slate-200 rounded-2xl space-y-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                Inverter Firmware & Health
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete AC/DC distribution box inspections, earthing resistance checks, surge arrester testing, and inverter software updates.
              </p>
            </div>
          </div>
        </section>

        {/* 9. RESIDENTIAL & COMMERCIAL QUICK ANCHORS */}
        <section id="residential" className="scroll-mt-28 bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              RESIDENTIAL & COMMERCIAL PORTFOLIO
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">Looking for Tailored Rooftop Solutions?</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Explore our specialized dedicated pages for detailed system sizes, pricing calculators, commercial tax benefit details, and photo galleries of completed installations across Odisha.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/residential"
              className="py-3 px-5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow transition-all flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Explore Residential Solar</span>
            </Link>
            <Link
              href="/commercial"
              className="py-3 px-5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>Explore Commercial Solar</span>
            </Link>
          </div>
        </section>
      </div>

      {/* Closing CTA */}
      <section className="py-16 bg-slate-900 text-white text-center border-t border-slate-800">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Have Questions About Which Solar System Suits You Best?</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Our solar technical advisors are ready to inspect your site, evaluate roof load, and calculate your exact return on investment.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/contact?type=site-visit"
              className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Site Visit</span>
            </Link>
            <Link
              href="/contact?type=quote"
              className="py-3.5 px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Contact Solar Expert</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
