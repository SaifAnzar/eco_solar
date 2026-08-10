"use client";

import React, { useState } from "react";
import { MapPin, Filter, Zap, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "residential" | "commercial" | "industrial" | "institutional">("all");

  const projects = [
    {
      title: "10 kW Residential Rooftop Plant",
      clientType: "Residential",
      location: "Patia, Bhubaneswar (Khordha)",
      size: "10 kW On-Grid",
      discom: "TPCODL",
      img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "50 kW Commercial Rooftop Solar",
      clientType: "Commercial",
      location: "Infocity, Bhubaneswar (Khordha)",
      size: "50 kW On-Grid",
      discom: "TPCODL",
      img: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "100 kW Industrial Manufacturing Rooftop",
      clientType: "Industrial",
      location: "Choudwar, Cuttack",
      size: "100 kW On-Grid",
      discom: "TPCODL",
      img: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "25 kW Off-Grid Solar & Storage",
      clientType: "Institutional",
      location: "Phulbani, Kandhamal",
      size: "25 kW Off-Grid",
      discom: "TPSODL",
      img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "15 kW Hybrid Solar Backup System",
      clientType: "Residential",
      location: "Berhampur, Ganjam",
      size: "15 kW Hybrid",
      discom: "TPSODL",
      img: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "75 kW Commercial Roof Plant",
      clientType: "Commercial",
      location: "VSS Marg, Sambalpur",
      size: "75 kW On-Grid",
      discom: "TPWODL",
      img: "https://images.unsplash.com/photo-1548337138-e87d889cc369?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const filteredProjects = filter === "all" ? projects : projects.filter((p) => p.clientType.toLowerCase() === filter);

  return (
    <div className="w-full font-sans bg-[#FAFAFA]">
      {/* Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full inline-block">
            PROVEN TRACK RECORD
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Projects & Portfolio</h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Delivering high-yield solar EPC installations across residential homes, offices, factories, and institutions in Odisha.
          </p>
        </div>
      </section>

      {/* 1. Summary Stats Bar */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-around text-center gap-4 text-xs font-mono text-slate-700">
            <div>
              <strong className="text-xl sm:text-2xl font-extrabold text-slate-900 block font-mono">{SITE_CONFIG.stats.systemsInstalled}</strong>
              <span className="text-slate-500">Systems Installed</span>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
            <div>
              <strong className="text-xl sm:text-2xl font-extrabold text-emerald-600 block font-mono">{SITE_CONFIG.stats.capacityDelivered}</strong>
              <span className="text-slate-500">Total Capacity Delivered</span>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
            <div>
              <strong className="text-xl sm:text-2xl font-extrabold text-amber-600 block font-mono">4 DISCOM Zones</strong>
              <span className="text-slate-500">TPCODL, TPNODL, TPSODL, TPWODL</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filter Tabs & 3. Project Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {(["all", "residential", "commercial", "industrial", "institutional"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`py-2 px-4 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all ${
                  filter === tab
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((p, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                <div className="aspect-video w-full overflow-hidden bg-slate-900 relative">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 bg-slate-900/90 text-amber-400 text-[10px] font-mono px-2.5 py-1 rounded-full border border-slate-700 font-bold">
                    {p.size}
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                    {p.discom}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {p.clientType} Category
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{p.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-slate-600 font-mono pt-2 border-t border-slate-100">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Location: {p.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
