"use client";

import React, { useState, useEffect } from "react";
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
  Sparkles,
  PhoneCall,
  ChevronRight,
} from "lucide-react";
import KusumModal from "@/components/forms/KusumModal";

export default function ServicesPage() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [isKusumOpen, setIsKusumOpen] = useState(false);

  const handleSelectService = (targetId: string) => {
    setActiveCardId((prev) => (prev === targetId ? null : targetId));
    if (typeof window !== "undefined") {
      const el = document.getElementById(targetId);
      if (el) {
        const yOffset = -84;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveCardId(hash);
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            const yOffset = -84;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }, 150);
      }
    }
  }, []);

  const quickNav = [
    { id: "on-grid", label: "On-Grid EPC", icon: Sun, color: "text-amber-500 bg-amber-50 border-amber-200" },
    { id: "off-grid", label: "Off-Grid EPC", icon: Zap, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { id: "hybrid", label: "Hybrid EPC", icon: Layers, color: "text-blue-600 bg-blue-50 border-blue-200" },
    { id: "pumps", label: "Water Pumps", icon: Droplets, color: "text-cyan-600 bg-cyan-50 border-cyan-200" },
    { id: "lighting", label: "Street Lights", icon: Lightbulb, color: "text-yellow-600 bg-yellow-50 border-yellow-200" },
    { id: "net-metering", label: "Net Metering", icon: ShieldCheck, color: "text-purple-600 bg-purple-50 border-purple-200" },
    { id: "om", label: "O&M Maintenance", icon: Wrench, color: "text-rose-600 bg-rose-50 border-rose-200" },
  ];

  const servicesData = [
    {
      id: "on-grid",
      badge: "BEST FOR HOMES & LOW BILLS",
      badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
      title: "On-Grid Solar (Grid Connected)",
      subtitle: "Cut Your Monthly Electricity Bill up to 90%",
      desc: "Powers your home using free solar energy during the day. Any extra solar power your panels generate goes straight to the government electricity grid, giving you money-saving bill credits.",
      image: "/services/On-Grid%20Solar%20(Grid%20Connected).png",
      bullets: [
        "Get up to ₹78,000 direct bank subsidy under PM Surya Ghar scheme",
        "Reduces your monthly electricity bills by up to 90%",
        "No battery needed — lowest price & fastest money back in 3 years",
        "25-year panel guarantee with strong storm-proof roof fitting",
      ],
      primaryBtn: { text: "Get Price Quote", href: "/contact?type=quote" },
      secondaryBtn: { text: "Book Free Survey", href: "/contact?type=site-visit" },
    },
    {
      id: "off-grid",
      badge: "24/7 POWER WITH BATTERIES",
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      title: "Off-Grid Solar (Battery Storage)",
      subtitle: "100% Free From Power Cuts & Electricity Bills",
      desc: "Generates solar power and stores it in batteries. Gives you non-stop 24/7 electricity even during long power cuts, storms, or in villages with no power lines.",
      image: "/services/Off-Grid%20Solar%20(Battery%20Storage).png",
      bullets: [
        "100% power freedom — zero reliance on government electricity",
        "Includes fast-charging long-life Lithium batteries",
        "Runs lights, fans, TV, & fridge day and night without interruption",
        "Ideal for farmhouses, shops, villages, & remote locations",
      ],
      primaryBtn: { text: "Get Price Quote", href: "/contact?type=quote" },
      secondaryBtn: { text: "Book Site Survey", href: "/contact?type=site-visit" },
    },
    {
      id: "hybrid",
      badge: "BILL SAVINGS + POWER BACKUP",
      badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
      title: "Hybrid Solar (Grid + Battery)",
      subtitle: "Save Big on Bills + Stay Powered During Power Cuts",
      desc: "The ultimate combination! Reduces your monthly electricity bill like On-Grid solar AND keeps your lights and fans running smoothly when the grid power fails.",
      image: "/services/Hybrid%20Solar%20(Grid%20+%20Battery).png",
      bullets: [
        "Automatic switch to battery backup in less than a second during power cuts",
        "Fills battery first, then sells extra solar power to grid for bill savings",
        "Simple mobile phone app to track your daily solar power generation & savings",
        "Approved by all Odisha electricity boards (TPCODL, TPNODL, TPSODL, TPWODL)",
      ],
      primaryBtn: { text: "Get Price Quote", href: "/contact?type=quote" },
      secondaryBtn: { text: "Book Free Survey", href: "/contact?type=site-visit" },
    },
    {
      id: "pumps",
      badge: "FOR FARMS & AGRICULTURE",
      badgeBg: "bg-cyan-50 text-cyan-700 border-cyan-200",
      title: "Solar Water Pumps (For Farms)",
      subtitle: "Free Water Pumping for Crops, Farms & Borewells",
      desc: "Runs your water pump directly using free sunlight. Perfect for watering crops, filling fish ponds, and supplying water to farms without spending money on diesel or electricity.",
      image: "/services/Solar%20Water%20Pumps%20(For%20Farms).png",
      bullets: [
        "Zero electricity bill & zero expensive diesel engine fuel costs",
        "Pumps water automatically from morning to evening using sunlight",
        "Works with borewell pumps, open well pumps & surface water tanks",
        "Built-in automatic safety to protect motor from damage or dry running",
      ],
      primaryBtn: { text: "Inquire Solar Pump", href: "/contact?type=quote" },
      secondaryBtn: { text: "Consult Engineer", href: "/contact?type=site-visit" },
    },
    {
      id: "lighting",
      badge: "AUTOMATIC OUTDOOR LIGHTS",
      badgeBg: "bg-yellow-50 text-yellow-700 border-yellow-200",
      title: "Solar Street Lights",
      subtitle: "Automatic Outdoor Lighting for Roads & Colonies",
      desc: "All-in-one solar lights with built-in solar panels and batteries. Charges automatically during the day and turns ON automatically at night.",
      image: "/services/Solar%20Street%20Lights.png",
      bullets: [
        "Turns ON at sunset & turns OFF at sunrise automatically",
        "No electric wiring or cabling required — easy setup anywhere outdoors",
        "Strong rain-proof & rust-proof steel poles",
        "Zero electricity bill for village roads, housing colonies, & grounds",
      ],
      primaryBtn: { text: "Get Lighting Quote", href: "/contact?type=quote" },
      secondaryBtn: { text: "Request Catalog", href: "/contact?type=site-visit" },
    },
    {
      id: "net-metering",
      badge: "100% PAPERWORK HANDLED",
      badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
      title: "Net Metering & Govt Subsidy Help",
      subtitle: "We Handle 100% Paperwork & Bank Subsidy Clearance",
      desc: "Don't worry about government forms or office visits! Our team handles 100% of the paperwork, electric board permissions, net meter fitting, and subsidy money transfer.",
      image: "/services/Net%20Metering%20&%20Govt%20Subsidy%20Help.png",
      bullets: [
        "We register your subsidy application on the PM Surya Ghar national portal",
        "We get official permission from your local electricity department office",
        "We fit the official bi-directional meter that tracks your bill savings",
        "Govt subsidy money deposited directly into your savings bank account",
      ],
      primaryBtn: { text: "Start Subsidy Process", href: "/contact?type=site-visit" },
      secondaryBtn: { text: "Check Eligibility", href: "/contact?type=quote" },
    },
    {
      id: "om",
      badge: "CLEANING & HEALTH CHECKUPS",
      badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
      title: "Solar Care & Maintenance",
      subtitle: "Keep Your Solar System Running at 100% Power",
      desc: "Regular cleaning, health checkups, and fast repair services so your solar panels keep generating maximum electricity every single day for 25 years.",
      image: "/services/Solar%20Care%20&%20Maintenance.png",
      bullets: [
        "Professional washing to clean dust & bird dirt off solar panels",
        "Regular safety checks to find & fix any problem before power drops",
        "Full inverter, wiring, & earthing health testing by expert local team",
        "Quick repair support anywhere in Odisha whenever you call",
      ],
      primaryBtn: { text: "Book Maintenance", href: "/contact?type=quote" },
      secondaryBtn: { text: "Schedule Inspection", href: "/contact?type=site-visit" },
    },
  ];

  return (
    <div className="w-full font-sans bg-[#FAFAFA] text-slate-900">
      
      {/* 1. PAGE HERO HEADER */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>SOLAR SERVICES FOR EVERY NEED</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Easy &amp; Simple Solar Services
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Whether you want to cut your home electricity bill, get 24/7 power for your farm, or set up outdoor lights — we make solar simple, affordable, and hassle-free.
          </p>

          {/* Quick Jump Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2 max-w-5xl mx-auto">
            {quickNav.map((q) => {
              const Icon = q.icon;
              const isSelected = activeCardId === q.id;
              return (
                <button
                  key={q.id}
                  onClick={() => handleSelectService(q.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border shadow-sm transition-all duration-300 ${
                    isSelected
                      ? "bg-emerald-600 text-white border-emerald-400 ring-2 ring-emerald-400/80 scale-105 shadow-lg font-extrabold"
                      : `${q.color} hover:scale-105`
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{q.label}</span>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 2. SERVICE CARDS GRID WITH CARD CLICK SELECTION & TINY LEFT CORNER IMAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {servicesData.map((s) => {
            const isSelected = activeCardId === s.id;

            return (
              <div
                key={s.id}
                id={s.id}
                onClick={() => handleSelectService(s.id)}
                className={`scroll-mt-28 group bg-white border rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-500 cursor-pointer ${
                  isSelected
                    ? "ring-4 ring-emerald-500/80 border-emerald-500 shadow-2xl -translate-y-2 z-20 bg-emerald-50/10"
                    : "border-slate-200/90 shadow-sm hover:shadow-2xl hover:border-emerald-500/40 hover:-translate-y-1.5"
                }`}
              >
                {/* Top Animated Accent Bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-500 transition-opacity duration-300 ${
                    isSelected ? "opacity-100 animate-pulse" : "opacity-0 group-hover:opacity-100"
                  }`}
                />

                <div className="space-y-6">
                  {/* Card Header: Tiny Image in Left Side Corner + Title & Badges */}
                  <div className="flex items-start gap-4">
                    {/* Tiny Image Thumbnail on Left Side Corner */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-slate-200/90 shadow-2xs bg-slate-100 p-1 group-hover:border-emerald-400/50 transition-colors">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-3 py-0.5 rounded-full text-[11px] font-mono font-bold border shadow-2xs ${s.badgeBg}`}>
                          {s.badge}
                        </span>
                      </div>

                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                        {s.title}
                      </h2>
                      <p className="text-xs font-mono font-bold text-amber-700">
                        {s.subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {s.desc}
                  </p>

                  {/* Bullet Specs List */}
                  <div className="space-y-2.5 pt-4 border-t border-slate-100">
                    {s.bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <BadgeCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Respective Action Buttons Inside Card Footer */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3" onClick={(e) => e.stopPropagation()}>
                  <Link
                    href={s.primaryBtn.href}
                    className="w-full sm:w-auto flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{s.primaryBtn.text}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href={s.secondaryBtn.href}
                    className="w-full sm:w-auto py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>{s.secondaryBtn.text}</span>
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

        {/* 3. RESIDENTIAL & COMMERCIAL PORTFOLIO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          
          {/* Residential Card */}
          <div
            id="residential"
            className={`scroll-mt-28 group bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-950 text-white rounded-3xl p-8 shadow-xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
              activeCardId === "residential"
                ? "ring-4 ring-amber-500 border-amber-500 -translate-y-2.5"
                : "border-slate-800 hover:border-emerald-500/50 hover:-translate-y-2"
            }`}
          >
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-amber-500 text-slate-950 rounded-2xl font-bold group-hover:scale-110 transition-transform">
                  <Home className="w-5 h-5" />
                </div>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-mono font-bold">
                  FOR HOMES &amp; HOUSES
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white">Solar for Homes</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Put solar on your roof, get up to ₹78,000 government subsidy, and reduce your monthly electricity bills to near zero.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-3 relative z-10">
              <Link
                href="/services/residential"
                className="flex-1 py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>Explore Home Solar</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact?type=quote"
                className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-2"
              >
                <span>Get Subsidy Quote</span>
              </Link>
            </div>
          </div>

          {/* Commercial Card */}
          <div
            id="commercial"
            className={`scroll-mt-28 group bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950 text-white rounded-3xl p-8 shadow-xl border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
              activeCardId === "commercial"
                ? "ring-4 ring-emerald-500 border-emerald-500 -translate-y-2.5"
                : "border-slate-800 hover:border-emerald-500/50 hover:-translate-y-2"
            }`}
          >
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-emerald-500 text-white rounded-2xl font-bold group-hover:scale-110 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-mono font-bold">
                  FOR BUSINESSES &amp; FACTORIES
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-white">Solar for Businesses &amp; Factories</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Lower your monthly business running costs for offices, factories, schools &amp; hospitals with big tax saving benefits.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-3 relative z-10">
              <Link
                href="/services/commercial"
                className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>Explore Business Solar</span>
                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contact?type=quote"
                className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 flex items-center justify-center gap-2"
              >
                <span>Get Business Proposal</span>
              </Link>
            </div>
          </div>

        </div>

      </section>

      {/* 4. CLOSING CTA */}
      <section className="py-16 bg-slate-900 text-white text-center border-t border-slate-800">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Discuss Your Solar Requirements?</h2>
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

      {/* Pre-Register PM-KUSUM Interest Modal Popup */}
      <KusumModal isOpen={isKusumOpen} onClose={() => setIsKusumOpen(false)} />
    </div>
  );
}
