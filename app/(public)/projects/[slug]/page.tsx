"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Zap,
  Sun,
  Coins,
  Leaf,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Phone,
} from "lucide-react";

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

const PROJECTS_DATA: Record<
  string,
  {
    title: string;
    status: "completed" | "in-progress";
    categoryTag: string;
    location: string;
    discom: string;
    badge: string;
    capacity: string;
    generation: string;
    annualSavings: string;
    co2Offset: string;
    description: string;
    specs: { label: string; detail: string }[];
  }
> = {
  "patia-residential-10kw": {
    title: "10 kW Residential Rooftop Solar System",
    status: "completed",
    categoryTag: "HOME SOLAR · RESIDENTIAL",
    location: "Patia, Bhubaneswar",
    discom: "TPCODL",
    badge: "PM Surya Ghar",
    capacity: "10 kW",
    generation: "~1,200 Units/Month",
    annualSavings: "₹1,00,800 / Year",
    co2Offset: "11.8 Tons / Year",
    description:
      "Complete rooftop solar installation for a family home in Patia, Bhubaneswar. Government subsidy of ₹78,000 was claimed and credited directly to the customer's bank account. Net meter was activated within 20 days of installation.",
    specs: [
      { label: "Solar Panels", detail: "Waaree 600W+ Made-in-India Solar Panels" },
      { label: "Inverter", detail: "Statcon Grid-Tied Smart Inverter with Phone Monitoring" },
      { label: "Mounting Frame", detail: "Rust-Proof Steel Frame — Cyclone-Safe (150 km/h)" },
      { label: "Safety System", detail: "IS 3043 Earthing with Lightning Protection" },
    ],
  },
  "cuttack-commercial-50kw": {
    title: "50 kW Commercial Warehouse Solar Plant",
    status: "completed",
    categoryTag: "OFFICE & FACTORY SOLAR · COMMERCIAL",
    location: "Phulnakhara, Cuttack",
    discom: "TPCODL",
    badge: "80% Tax Saving",
    capacity: "50 kW",
    generation: "~6,000 Units/Month",
    annualSavings: "₹5,04,000 / Year",
    co2Offset: "59.0 Tons / Year",
    description:
      "Large rooftop solar plant installed on a warehouse in Cuttack. The business saved 80% on income tax in year one and reduced its electricity bill by 75% from month one of operation.",
    specs: [
      { label: "Solar Panels", detail: "Adani 600W High-Power Commercial Solar Panels" },
      { label: "Inverter", detail: "Statcon Industrial Grid Inverter with Remote Monitoring" },
      { label: "Mounting Frame", detail: "Custom Heavy Steel Frame with Chemical Anchors" },
      { label: "Monitoring", detail: "Live Dashboard App — Tracks Units & Savings Daily" },
    ],
  },
  "puri-agricultural-7hp": {
    title: "7.5 HP PM-KUSUM Solar Water Pump",
    status: "completed",
    categoryTag: "FARM SOLAR PUMP · AGRICULTURAL",
    location: "Pipili, Puri District",
    discom: "TPCODL",
    badge: "PM-KUSUM Approved",
    capacity: "7.5 HP Pump",
    generation: "Full Daylight Water Supply",
    annualSavings: "₹85,000 / Year Saved",
    co2Offset: "8.5 Tons / Year",
    description:
      "Solar-powered irrigation pump installed for a paddy and vegetable farmer in Pipili, Puri. Completely eliminated diesel generator expenses and grid dependency. The farmer now gets free water supply using sunlight all day.",
    specs: [
      { label: "Solar Panels", detail: "600W Government-Approved Solar Panels" },
      { label: "Pump Controller", detail: "Weatherproof MPPT Controller with Dry-Run Safety" },
      { label: "Mounting Frame", detail: "Rust-Proof Steel Frame — Outdoor Safe" },
      { label: "Safety System", detail: "IS 3043 Earthing with Lightning Arrestor" },
    ],
  },
  "bbsr-residential-5kw": {
    title: "5 kW Residential Rooftop System",
    status: "completed",
    categoryTag: "HOME SOLAR · RESIDENTIAL",
    location: "Nayapalli, Bhubaneswar",
    discom: "TPCODL",
    badge: "PM Surya Ghar",
    capacity: "5 kW",
    generation: "~600 Units/Month",
    annualSavings: "₹50,400 / Year",
    co2Offset: "5.9 Tons / Year",
    description:
      "Home solar installation for a 2BHK residence in Nayapalli. Monthly electricity bill dropped from ₹3,500 to under ₹400. Government subsidy of ₹78,000 claimed successfully.",
    specs: [
      { label: "Solar Panels", detail: "Waaree 540W+ Made-in-India Solar Panels" },
      { label: "Inverter", detail: "Sunora Grid-Tied Inverter with App Monitoring" },
      { label: "Mounting Frame", detail: "Rust-Proof Steel Frame — Roof-Safe Installation" },
      { label: "Safety System", detail: "IS 3043 Chemical Earthing System" },
    ],
  },
  "sambalpur-school-25kw": {
    title: "25 kW School Rooftop Solar Plant",
    status: "completed",
    categoryTag: "INSTITUTIONAL SOLAR · COMMERCIAL",
    location: "Sambalpur City",
    discom: "TPWODL",
    badge: "Institutional Solar",
    capacity: "25 kW",
    generation: "~3,000 Units/Month",
    annualSavings: "₹2,52,000 / Year",
    co2Offset: "29.5 Tons / Year",
    description:
      "Rooftop solar installed for a private school in Sambalpur. Annual electricity savings of over ₹2.4 Lakhs. The school now uses clean solar energy during school hours — zero electricity cost in the day.",
    specs: [
      { label: "Solar Panels", detail: "Waaree 600W+ Government-Approved Panels" },
      { label: "Inverter", detail: "Statcon 25 kW 3-Phase Grid-Tied Inverter" },
      { label: "Mounting Frame", detail: "Custom Steel Rooftop Structure" },
      { label: "Monitoring", detail: "Live Remote Monitoring App for Management" },
    ],
  },
  "balasore-residential-3kw": {
    title: "3 kW Home Solar — First in TPNODL",
    status: "completed",
    categoryTag: "HOME SOLAR · RESIDENTIAL",
    location: "Balasore Town",
    discom: "TPNODL",
    badge: "PM Surya Ghar",
    capacity: "3 kW",
    generation: "~360 Units/Month",
    annualSavings: "₹30,240 / Year",
    co2Offset: "3.5 Tons / Year",
    description:
      "One of the first PM Surya Ghar installations in Balasore district under TPNODL. Full government subsidy of ₹78,000 was disbursed within 45 days. Net meter activated and customer now earns bill credits.",
    specs: [
      { label: "Solar Panels", detail: "Waaree 540W DCR Made-in-India Panels" },
      { label: "Inverter", detail: "Sunora 3 kW Grid-Tied Inverter" },
      { label: "Mounting Frame", detail: "Rust-Proof Steel Frame — Wind Safe" },
      { label: "Safety System", detail: "IS 3043 Earthing with Surge Protection" },
    ],
  },
  "berhampur-factory-100kw": {
    title: "100 kW Factory Solar Plant",
    status: "in-progress",
    categoryTag: "OFFICE & FACTORY SOLAR · COMMERCIAL",
    location: "Berhampur, Ganjam",
    discom: "TPSODL",
    badge: "Large C&I",
    capacity: "100 kW",
    generation: "~12,000 Units/Month",
    annualSavings: "₹10,08,000 / Year",
    co2Offset: "118 Tons / Year",
    description:
      "Large-scale solar installation for a manufacturing unit in Berhampur. DISCOM approval has been received from TPSODL. Panel mounting is in progress. Expected to be live within 2 weeks.",
    specs: [
      { label: "Solar Panels", detail: "Adani 600W+ High-Power Commercial Panels" },
      { label: "Inverter", detail: "Statcon 100 kW 3-Phase Industrial Inverter" },
      { label: "Mounting Frame", detail: "Industrial Heavy Steel Rooftop Structure" },
      { label: "Status", detail: "Mounting underway — net meter application submitted" },
    ],
  },
  "rourkela-residential-8kw": {
    title: "8 kW Residential Rooftop System",
    status: "in-progress",
    categoryTag: "HOME SOLAR · RESIDENTIAL",
    location: "Rourkela, Sundargarh",
    discom: "TPWODL",
    badge: "PM Surya Ghar",
    capacity: "8 kW",
    generation: "~960 Units/Month",
    annualSavings: "₹80,640 / Year",
    co2Offset: "9.4 Tons / Year",
    description:
      "Home solar installation in progress in Rourkela. Panels have been mounted and inverter is connected. Net meter application has been submitted to TPWODL. Activation expected within 2 weeks.",
    specs: [
      { label: "Solar Panels", detail: "Waaree 600W DCR Made-in-India Panels" },
      { label: "Inverter", detail: "Statcon 8 kW Grid-Tied Smart Inverter" },
      { label: "Mounting Frame", detail: "Rust-Proof Steel Frame — Installed" },
      { label: "Status", detail: "Net meter application submitted to TPWODL" },
    ],
  },
  "koraput-pump-5hp": {
    title: "5 HP Solar Irrigation Pump",
    status: "in-progress",
    categoryTag: "FARM SOLAR PUMP · AGRICULTURAL",
    location: "Koraput District",
    discom: "TPSODL",
    badge: "PM-KUSUM",
    capacity: "5 HP Pump",
    generation: "Full Daylight Pumping",
    annualSavings: "₹55,000 / Year Saved",
    co2Offset: "5.6 Tons / Year",
    description:
      "PM-KUSUM solar pump for a tribal farming community in Koraput. Government subsidy of 90% has been approved. Panels and pump have been installed. Final testing and handover in progress.",
    specs: [
      { label: "Solar Panels", detail: "600W Government-Approved Solar Panels" },
      { label: "Pump Controller", detail: "IP65 Weatherproof MPPT Controller" },
      { label: "Mounting Frame", detail: "Outdoor-Safe Galvanized Steel Frame" },
      { label: "Status", detail: "Final testing underway — handover this week" },
    ],
  },
};

export default function ProjectDetailPage({ params }: ProjectDetailProps) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  const project = PROJECTS_DATA[slug] || PROJECTS_DATA["patia-residential-10kw"];
  const isDone = project.status === "completed";

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-10 md:py-14 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Projects
        </Link>

        {/* Main Detail Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">

          {/* Card Header — Status + Title */}
          <div className={`px-6 sm:px-8 pt-6 pb-5 border-b ${isDone ? "border-slate-100" : "border-amber-100 bg-amber-50/30"}`}>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                {project.categoryTag}
              </span>
              {isDone ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
                  <CheckCircle2 className="w-3 h-3" />
                  Completed
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold">
                  <Clock className="w-3 h-3" />
                  In Progress
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                {project.badge}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {project.title}
            </h1>

            <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                {project.location}
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                {project.discom}
              </span>
            </div>
          </div>

          {/* Project Description */}
          <div className="px-6 sm:px-8 py-5 border-b border-slate-100">
            <p className="text-sm text-slate-600 leading-relaxed">{project.description}</p>
          </div>

          {/* Key Numbers — 4 Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 border-b border-slate-100">
            {[
              { icon: Zap, label: "System Size", value: project.capacity, color: "text-amber-600" },
              { icon: Sun, label: "Monthly Output", value: project.generation, color: "text-emerald-600" },
              { icon: Coins, label: "Yearly Savings", value: project.annualSavings, color: "text-emerald-700" },
              { icon: Leaf, label: "CO₂ Saved", value: project.co2Offset, color: "text-teal-600" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="px-6 py-5 space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                    <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                    {stat.label}
                  </div>
                  <div className={`text-base sm:text-lg font-extrabold ${stat.color}`}>
                    {stat.value}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Equipment / Specs Table */}
          <div className="px-6 sm:px-8 py-6 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Equipment Used in This Project
            </h2>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {project.specs.map((spec, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center px-4 py-3 gap-1 bg-slate-50 even:bg-white">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider sm:w-1/3">
                    {spec.label}
                  </span>
                  <span className="text-xs font-semibold text-slate-800 sm:w-2/3">
                    {spec.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="px-6 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50">
            <div>
              <p className="font-bold text-slate-900 text-sm">Want a similar system for your home or business?</p>
              <p className="text-xs text-slate-500 mt-0.5">Call us for a free site visit and custom quote.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="tel:+919124318222"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                Call Us
              </a>
              <Link
                href="/calculator"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-xl transition-all"
              >
                Calculate Savings
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
