"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Home, Building2, Sprout } from "lucide-react";
import { RESIDENTIAL_IMAGE, COMMERCIAL_IMAGE, AGRICULTURAL_IMAGE } from "@/lib/constants";
import SolarImageFallback from "@/components/common/SolarImageFallback";
import KusumModal from "@/components/forms/KusumModal";

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<"all" | "residential" | "commercial">("all");
  const [isKusumOpen, setIsKusumOpen] = useState(false);

  const services = [
    {
      id: "residential",
      title: "Solar for Your Home",
      capacityBadge: "1-10 kW PACKAGES",
      description:
        "Rooftop solar panel installation for your home with complete setup — from site inspection to net-metering approval. Cut your monthly electricity bill by up to 90% and claim up to ₹78,000 government subsidy.",
      image: RESIDENTIAL_IMAGE,
      alt: "Rooftop solar panel installation on a home in Odisha",
      icon: Home,
      category: "residential" as const,
      type: "residential" as const,
      features: [
        "Up to ₹78,000 direct bank subsidy",
        "Tier-1 Waaree & Adani panels with 25-yr warranty",
        "Complete DISCOM net-metering hassle-free",
      ],
      ctaText: "Calculate Home Savings →",
      ctaHref: "/calculator?type=residential",
      isModalTrigger: false,
    },
    {
      id: "commercial",
      title: "Solar for Offices & Factories",
      capacityBadge: "10-500 kW+ PACKAGES",
      description:
        "High-efficiency commercial solar installations designed for offices, factories, and commercial buildings. Slash business operational costs by 60–80% with 80% first-year accelerated depreciation tax benefits.",
      image: COMMERCIAL_IMAGE,
      alt: "Commercial rooftop solar plant on an office building in Odisha",
      icon: Building2,
      category: "commercial" as const,
      type: "commercial" as const,
      features: [
        "80% first-year tax depreciation benefit",
        "Smart online solar monitoring app",
        "Full ROI payback within 3 to 4 years",
      ],
      ctaText: "Calculate Business ROI →",
      ctaHref: "/calculator?type=commercial",
      isModalTrigger: false,
    },
    {
      id: "agricultural",
      title: "Solar Water Pumps for Farmers",
      capacityBadge: "3-10 HP PUMP SYSTEMS",
      description:
        "Government-subsidized solar powered water pumps under PM-KUSUM scheme for reliable farm irrigation. Zero electricity bills and zero diesel expenses for Odisha agricultural land.",
      image: AGRICULTURAL_IMAGE,
      alt: "Solar water pump installation on a farm in Odisha",
      icon: Sprout,
      category: "pumps" as const,
      type: "residential" as const,
      features: [
        "Up to 90% government subsidy under PM-KUSUM",
        "Heavy-duty surface & borewell pump integration",
        "All-weather cyclone resistant structure",
      ],
      ctaText: "Pre-Register PM-KUSUM Interest →",
      ctaHref: "#",
      isModalTrigger: true,
    },
  ];

  const displayedServices = services.filter((service) => {
    if (activeTab === "all") return true;
    if (activeTab === "residential") return service.type === "residential";
    if (activeTab === "commercial") return service.type === "commercial";
    return true;
  });

  return (
    <section id="services" className="py-16 md:py-24 bg-[#FAFAFA] relative font-sans border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold px-3.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full inline-block">
            WHAT WE INSTALL
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Solar Solutions for Every Home &amp; Business
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Select a solution to calculate savings directly or pre-register for government subsidy programs.
          </p>
        </div>

        {/* Segmented Showcase Toggle Control */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300/80 gap-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "all"
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-300/50"
              }`}
            >
              All Solutions ({services.length})
            </button>
            <button
              onClick={() => setActiveTab("residential")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                activeTab === "residential"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-700 hover:text-emerald-700 hover:bg-slate-300/50"
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Residential Solar</span>
            </button>
            <button
              onClick={() => setActiveTab("commercial")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                activeTab === "commercial"
                  ? "bg-amber-600 text-white shadow-md"
                  : "text-slate-700 hover:text-amber-700 hover:bg-slate-300/50"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Commercial &amp; Industrial</span>
            </button>
          </div>
        </div>

        {/* Minimalist Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Card Image */}
                  <div className="aspect-[16/10] w-full overflow-hidden relative bg-slate-950">
                    <img
                      src={service.image}
                      alt={service.alt}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback to root path if /images/ alias has an issue
                        if (service.image.startsWith("/images/")) {
                          e.currentTarget.src = service.image.replace("/images/", "/");
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/20 pointer-events-none" />

                    {/* Capacity Badge */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="bg-slate-900/90 text-amber-400 font-extrabold text-[10px] font-mono px-3 py-1 rounded-full shadow-md border border-slate-700/80 backdrop-blur-xs">
                        {service.capacityBadge}
                      </span>
                    </div>

                    <div className="absolute bottom-3.5 left-3.5">
                      <div className="p-2.5 rounded-xl bg-emerald-600/90 backdrop-blur-xs text-white shadow-md border border-emerald-500/30">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Minimalist Card Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {service.description}
                    </p>

                    {/* 3 Bullet Points */}
                    <div className="space-y-2 pt-3 border-t border-slate-100">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action CTA Button */}
                <div className="p-6 pt-0">
                  {service.isModalTrigger ? (
                    <button
                      type="button"
                      onClick={() => setIsKusumOpen(true)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-xs cursor-pointer shadow-sm"
                    >
                      <span>{service.ctaText}</span>
                    </button>
                  ) : (
                    <Link
                      href={service.ctaHref}
                      className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-extrabold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-xs shadow-sm"
                    >
                      <span>{service.ctaText}</span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Pre-Register PM-KUSUM Interest Modal Popup */}
      <KusumModal isOpen={isKusumOpen} onClose={() => setIsKusumOpen(false)} />
    </section>
  );
}
