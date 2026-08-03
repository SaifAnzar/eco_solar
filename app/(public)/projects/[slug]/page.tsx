"use client";

import React, { useState } from "react";
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
} from "lucide-react";

interface ProjectDetailProps {
  params: Promise<{ slug: string }>;
}

const PROJECTS_DATA: Record<
  string,
  {
    title: string;
    categoryTag: string;
    location: string;
    discomBadge: string;
    capacity: string;
    dutyCycle: string;
    annualSavings: string;
    co2Offset: string;
    image: string;
    description: string;
    specs: { label: string; detail: string }[];
  }
> = {
  "patia-residential-10kw": {
    title: "10 kW Residential Rooftop Solar System",
    categoryTag: "10 KW RESIDENTIAL ROOFTOP SOLAR EPC",
    location: "Patia, Bhubaneswar",
    discomBadge: "TPCODL Net-Metered",
    capacity: "10 kW TOPCon",
    dutyCycle: "~1,200 Units/Month",
    annualSavings: "₹1,00,800 / Year",
    co2Offset: "11.8 Tons / Year",
    image:
      "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?q=80&w=1200&auto=format&fit=crop",
    description:
      "Turnkey 10 kW residential rooftop solar installation engineered for high-wind coastal conditions in Patia, Bhubaneswar. Eliminates monthly electricity bills under PM Surya Ghar Muft Bijli Yojana with 100% net-metering synchronization.",
    specs: [
      { label: "PV Modules", detail: "Waaree Tier-1 ALMM 600W+ TOPCon Bifacial Panels" },
      { label: "String Inverter", detail: "Statcon 3-Phase IP65 Grid-Tied Inverter with Wi-Fi" },
      { label: "Mounting MMS", detail: "80-Micron Hot-Dip Galvanized HDG Steel (150 km/h Rated)" },
      { label: "Protection", detail: "IS 3043 Chemical Earthing & AC/DC SPD Arrestors" },
    ],
  },
  "cuttack-commercial-50kw": {
    title: "50 kW Commercial Warehouse Solar Power Plant",
    categoryTag: "50 KW COMMERCIAL & INDUSTRIAL SOLAR EPC",
    location: "Phulnakhara, Cuttack",
    discomBadge: "80% AD Tax Benefits",
    capacity: "50 kW MonoPERC",
    dutyCycle: "~6,000 Units/Month",
    annualSavings: "₹5,04,000 / Year",
    co2Offset: "59.0 Tons / Year",
    image:
      "https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=1200&auto=format&fit=crop",
    description:
      "Megawatt-capable commercial warehouse rooftop solar installation leveraging 80% Accelerated Depreciation tax write-off in Year 1. The system achieves a rapid 2.9-year payback with ~32% annual ROI for industrial operations in Cuttack.",
    specs: [
      { label: "PV Modules", detail: "Adani Shine 600W High-Efficiency MonoPERC Modules" },
      { label: "String Inverter", detail: "Statcon Dual MPPT Industrial String Inverter" },
      { label: "Mounting MMS", detail: "Custom Structural HDG Steel Rafters with Hilti Anchors" },
      { label: "Telemetry", detail: "24/7 Mobile App Cloud Telemetry & SCADA Monitoring" },
    ],
  },
  "puri-agricultural-7hp": {
    title: "7.5 HP PM-KUSUM Solar Water Pump",
    categoryTag: "7.5 HP AGRICULTURAL SOLAR WATER PUMP EPC",
    location: "Pipili, Puri District, Odisha",
    discomBadge: "PM-KUSUM Scheme Approved",
    capacity: "7.5 HP Submersible",
    dutyCycle: "100% Daylight Pumping",
    annualSavings: "₹85,000 / Year Saved",
    co2Offset: "8.5 Tons / Year",
    image:
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    description:
      "PM-KUSUM scheme agricultural solar water pump supplying reliable, zero-cost irrigation to 15 acres of paddy and vegetable farmland in Pipili, Puri. Completely eliminates diesel generator expenses and grid power dependence.",
    specs: [
      { label: "PV Modules", detail: "Tier-1 ALMM Listed 600W MonoPERC Panels" },
      { label: "Pump Controller", detail: "IP65 Off-Grid MPPT Controller with Dry-Run Protection" },
      { label: "Mounting Structure", detail: "Hot-Dip Galvanized HDG Steel (150 km/h Wind Rated)" },
      { label: "Earthing & Protection", detail: "IS 3043 Chemical Earthing with Lightning Arrestor" },
    ],
  },
};

export default function ProjectDetailPage({ params }: ProjectDetailProps) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams.slug;
  const project = PROJECTS_DATA[slug] || PROJECTS_DATA["puri-agricultural-7hp"];
  const [imgError, setImgError] = useState(false);

  const fallbackImage =
    "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-10 md:py-16 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Sleek Back Button */}
        <div>
          <Link
            href="/projects"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects Portfolio</span>
          </Link>
        </div>

        {/* Hero Image Container (16:9 aspect ratio, clean, no overlapping text) */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden">
          <div className="aspect-[21/9] sm:aspect-[16/7] w-full relative bg-slate-100 overflow-hidden">
            <img
              src={imgError ? fallbackImage : project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
              onError={() => setImgError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-black/10"></div>

            {/* Floating Location Pill (Top Left) */}
            <div className="absolute top-4 left-4">
              <span className="bg-slate-900/85 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>📍 {project.location}</span>
              </span>
            </div>

            {/* Status Pill (Top Right) */}
            <div className="absolute top-4 right-4">
              <span className="bg-emerald-600/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                {project.discomBadge}
              </span>
            </div>
          </div>

          {/* Project Overview Header */}
          <div className="p-6 sm:p-10 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-600 tracking-wider uppercase block">
                {project.categoryTag}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight">
                {project.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed pt-2">
                {project.description}
              </p>
            </div>

            {/* Key Metrics Dashboard (4-Card Grid) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
              <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm space-y-1">
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>System Capacity</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-900">
                  {project.capacity}
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm space-y-1">
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>Duty Cycle</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-emerald-700">
                  {project.dutyCycle}
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm space-y-1">
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
                  <Coins className="w-4 h-4 text-emerald-600" />
                  <span>Annual Savings</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-amber-700">
                  {project.annualSavings}
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm space-y-1">
                <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <span>Carbon Offset</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-900">
                  {project.co2Offset}
                </div>
              </div>
            </div>

            {/* Two-Column Details & Technical Specifications */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 border-t border-slate-100">
              
              {/* Left 2 Columns (Technical Specs Table) */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Deployed Engineering Hardware</span>
                </h3>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl overflow-hidden divide-y divide-slate-200/80">
                  {project.specs.map((spec, idx) => (
                    <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                      <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px] sm:w-1/3">
                        {spec.label}
                      </span>
                      <span className="font-medium text-slate-900 sm:w-2/3">
                        {spec.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 1 Column (High-Impact CTA Card) */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-xl space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                      PRAGATI ECOSOLAR EPC
                    </span>
                    <h3 className="text-xl font-bold leading-snug">
                      Ready to Solarize Your Farm or Factory?
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Get a site feasibility survey and customized ROI report from Pragati EcoSolar engineers.
                    </p>
                  </div>

                  <Link
                    href="/calculator"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 rounded-xl shadow-md transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Calculate ROI for Your Site</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
