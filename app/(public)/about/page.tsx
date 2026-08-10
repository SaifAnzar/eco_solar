"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Award,
  Zap,
  CheckCircle2,
  UserCheck,
  Layers,
  ArrowRight,
  Sparkles,
  MapPin,
  Building2,
  Sun,
  Calendar,
  PhoneCall,
  Check,
  Clock,
  History,
  Users,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "values" | "timeline" | "leadership">("overview");

  const stats = [
    { label: "Rooftops Installed", value: SITE_CONFIG.stats.systemsInstalled, color: "text-amber-500" },
    { label: "Total Capacity", value: SITE_CONFIG.stats.capacityDelivered, color: "text-emerald-600" },
    { label: "Empanelled DISCOMs", value: "4 Zones", color: "text-blue-600" },
    { label: "Central Subsidy", value: "Up to ₹78,000", color: "text-purple-600" },
  ];

  const discomZones = [
    { code: "TPCODL", region: "Central Zone", city: "Bhubaneswar, Cuttack, Puri, Dhenkanal" },
    { code: "TPNODL", region: "North Zone", city: "Balasore, Bhadrak, Mayurbhanj, Keonjhar" },
    { code: "TPSODL", region: "South Zone", city: "Berhampur, Ganjam, Koraput, Kandhamal" },
    { code: "TPWODL", region: "West Zone", city: "Sambalpur, Jharsuguda, Rourkela, Bargarh" },
  ];

  const coreValues = [
    {
      title: "Vendor-Agnostic EPC",
      desc: "Optimal Tier-1 ALMM modules & top-tier inverters tailored to site specs rather than single-brand inventory.",
      icon: Layers,
    },
    {
      title: "Zero Bureaucracy",
      desc: "100% DISCOM paperwork, net-metering approvals, and national portal subsidy claims managed in-house.",
      icon: ShieldCheck,
    },
    {
      title: "Cyclone-Resistant Engineering",
      desc: "Hot-dip galvanized steel mounting structures engineered to withstand coastal Odisha wind speeds up to 200 km/h.",
      icon: Sun,
    },
    {
      title: "Single Accountable Partner",
      desc: "From initial rooftop survey to grid commissioning and 25-year O&M support — one accountable team.",
      icon: UserCheck,
    },
  ];

  const milestones = [
    { year: "2021", title: "Founded in Bhubaneswar", desc: "Started as a dedicated solar engineering firm in Patia." },
    { year: "2022", title: "4-Zone DISCOM Licensing", desc: "Authorized net-metering installer across TPCODL, TPNODL, TPSODL & TPWODL." },
    { year: "2023", title: "100+ C&I Rooftops", desc: "Delivered commercial & industrial solar plants state-wide." },
    { year: "2024-26", title: "PM Surya Ghar Partner", desc: "Empanelled national partner surpassing 500+ systems & 15 MW+ capacity." },
  ];

  const leadership = [
    {
      name: "Er. Deepak Kumar Mohapatra",
      role: "Founder & Principal EPC Director",
      experience: "12+ Yrs Exp",
      desc: "Electrical grid engineering and solar execution lead across Odisha.",
    },
    {
      name: "Er. Soumya Ranjan Nayak",
      role: "Head of Solar Projects & DISCOM Liaison",
      experience: "10+ Yrs Exp",
      desc: "Net metering regulatory compliance & PM Surya Ghar portal lead.",
    },
    {
      name: "Er. Subrat Kumar Jena",
      role: "Lead Systems Engineer & O&M",
      experience: "8+ Yrs Exp",
      desc: "Hybrid battery storage design & commercial rooftop commissioning lead.",
    },
  ];

  return (
    <div className="w-full font-sans bg-[#FAFAFA] text-slate-900 pb-12">
      
      {/* 1. MINIMALIST HERO & COMPACT METRICS */}
      <section className="bg-slate-900 text-white py-10 sm:py-14 border-b border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-400 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full inline-block">
                ABOUT PRAGATI ECOSOLAR
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Odisha&apos;s Authorized Solar EPC Partner
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Empanelled installer under PM Surya Ghar Muft Bijli Yojana & licensed across TPCODL, TPNODL, TPSODL & TPWODL.
              </p>
            </div>

            {/* Compact Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0 bg-slate-800/80 p-3 rounded-2xl border border-slate-700/80 backdrop-blur-sm">
              {stats.map((s, i) => (
                <div key={i} className="text-center px-2">
                  <span className={`text-base sm:text-lg font-extrabold font-mono block ${s.color}`}>
                    {s.value}
                  </span>
                  <span className="text-[10px] text-slate-300 block font-medium">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 2. MINIMALIST BENTO DASHBOARD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Navigation Tabs (Overview, Values, Timeline, Team) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          {[
            { id: "overview", label: "Company Overview", icon: Building2 },
            { id: "values", label: "4 Core Values", icon: ShieldCheck },
            { id: "timeline", label: "Our Milestones", icon: History },
            { id: "leadership", label: "Engineering Leadership", icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW & DISCOM INFO */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Story Card */}
            <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  OUR MISSION & IDENTITY
                </span>
                <span className="text-xs text-slate-500 font-mono">Bhubaneswar, Odisha</span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900">
                End-to-End Rooftop & Commercial Solar EPC Solutions
              </h3>

              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <p>
                  Pragati EcoSolar is a full-service Solar EPC company based in Patia, Bhubaneswar. We manage the full project lifecycle — site assessment, structural design, procurement, installation, bi-directional DLMS net-metering approvals, and PM Surya Ghar central subsidy processing up to ₹78,000.
                </p>
                <p>
                  Rather than dealing with multiple third-party contractors, our customers benefit from a single accountable team handling engineering, DISCOM clearance, and long-term after-sales O&M support across Odisha.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs font-medium text-slate-800">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Authorized PM Surya Ghar Rooftop Installer</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Empanelled Across All 4 Odisha DISCOMs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Tier-1 ALMM Module & Inverter Selection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>In-House Electrical & Civil Engineering Team</span>
                </div>
              </div>
            </div>

            {/* Office & DISCOM Card */}
            <div className="lg:col-span-4 bg-slate-900 text-white rounded-2xl p-6 space-y-4 shadow-sm border border-slate-800 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                    HEADQUARTERS & LICENSING
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                    VERIFIED
                  </span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Patia, Bhubaneswar, Odisha</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    HIG/42, Aryapalli, Patia, Bhubaneswar, Odisha 751024
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                    EMPANELLED DISCOM ZONES:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                    {discomZones.map((z) => (
                      <div key={z.code} className="p-2 bg-slate-800 rounded border border-slate-700">
                        <span className="text-amber-400 font-bold block">{z.code}</span>
                        <span className="text-[10px] text-slate-300 block">{z.region}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Working: Mon–Sat (9 AM–7 PM)</span>
                <Link href="/contact" className="text-emerald-400 font-bold hover:underline">
                  Contact →
                </Link>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: 4 CORE VALUES */}
        {activeTab === "values" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {coreValues.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
                  <div className="p-2.5 bg-slate-900 text-amber-400 rounded-xl w-fit">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{v.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: MILESTONES & TIMELINE */}
        {activeTab === "timeline" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {milestones.map((m, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-sm relative">
                <span className="text-xl font-extrabold text-amber-500 font-mono block">{m.year}</span>
                <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: ENGINEERING LEADERSHIP */}
        {activeTab === "leadership" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {leadership.map((t, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-900 text-amber-400 font-bold rounded-xl flex items-center justify-center font-mono text-sm shrink-0">
                    {t.name[4]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                    <span className="text-[11px] text-emerald-700 font-mono font-bold block">{t.role}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">{t.desc}</p>
                <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{t.experience}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 3. MINIMALIST CTA STRIP */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold">Ready for a Free Solar Site Assessment?</h4>
            <p className="text-xs text-slate-300">
              Get an in-house engineer survey, load calculation, and subsidy proposal anywhere in Odisha.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact?type=site-visit"
              className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Site Visit</span>
            </Link>
            <Link
              href="/contact?type=quote"
              className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Get Quote</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
