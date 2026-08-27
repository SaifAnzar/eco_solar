"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Home, Building2, Sprout } from "lucide-react";
import KusumModal from "@/components/forms/KusumModal";

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<"all" | "residential" | "commercial" | "agricultural">("all");
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isKusumOpen, setIsKusumOpen] = useState(false);

  const services = [
    {
      id: "residential",
      title: "Solar for Your Home (On-Grid)",
      capacityBadge: "1-10 kW PACKAGES",
      description:
        "Rooftop solar panel installation for your home with complete setup — from site inspection to net-metering approval. Cut your monthly electricity bill by up to 90% and claim up to ₹78,000 government subsidy.",
      image: "/services/on-grid.png",
      alt: "On-Grid rooftop solar panel installation on a home in Odisha",
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
      image: "/services/hybrid.png",
      alt: "Commercial rooftop solar plant on an office building in Odisha",
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
      image: "/services/solar-pump.png",
      alt: "Solar water pump installation on a farm in Odisha",
      category: "pumps" as const,
      type: "agricultural" as const,
      features: [
        "Up to 90% government subsidy under PM-KUSUM",
        "Heavy-duty surface & borewell pump integration",
        "All-weather cyclone resistant structure",
      ],
      ctaText: "Pre-Register PM-KUSUM Interest →",
      ctaHref: "#",
      isModalTrigger: true,
    },
    {
      id: "off-grid",
      title: "Off-Grid Solar (Battery Storage)",
      capacityBadge: "2-50 kW BATTERY SYSTEMS",
      description:
        "Standalone solar power systems with long-life Lithium/Tubular battery backup. Enjoy uninterrupted 24/7 electricity during severe weather and grid blackouts.",
      image: "/services/off-grid.png",
      alt: "Off-Grid solar system with battery storage",
      category: "residential" as const,
      type: "residential" as const,
      features: [
        "100% power independence from electricity grid",
        "Fast-charging Lithium battery storage options",
        "Perfect for farmhouses, shops, & remote areas",
      ],
      ctaText: "Get Battery Solar Quote →",
      ctaHref: "/contact?type=quote",
      isModalTrigger: false,
    },
    {
      id: "street-lights",
      title: "Solar Street Lights",
      capacityBadge: "12W - 120W AUTOMATIC",
      description:
        "All-in-one solar street lights with integrated solar panels and automatic dusk-to-dawn sensors. Ideal for housing colonies, village roads, and campus premises.",
      image: "/services/street-lights.png",
      alt: "Automatic solar street lights system",
      category: "commercial" as const,
      type: "commercial" as const,
      features: [
        "Automatic ON at sunset & OFF at sunrise",
        "Zero cabling, wiring or monthly electric bills",
        "Rust-proof steel poles & IP65 waterproof rating",
      ],
      ctaText: "Request Lighting Quote →",
      ctaHref: "/contact?type=quote",
      isModalTrigger: false,
    },
    {
      id: "net-metering",
      title: "Net Metering & Govt Subsidy Help",
      capacityBadge: "100% DISCOM LIAISON",
      description:
        "Complete paperwork and DISCOM permission handling for TPCODL, TPNODL, TPSODL & TPWODL. We ensure bi-directional meter fitting & direct bank subsidy payout.",
      image: "/services/net-metering.png",
      alt: "Net metering approval and government subsidy assistance",
      category: "residential" as const,
      type: "residential" as const,
      features: [
        "PM Surya Ghar portal filing & verification",
        "DISCOM bi-directional net meter installation",
        "Direct bank subsidy transfer guarantee",
      ],
      ctaText: "Start Subsidy Process →",
      ctaHref: "/contact?type=site-visit",
      isModalTrigger: false,
    },
    {
      id: "maintenance",
      title: "Solar Care & Maintenance",
      capacityBadge: "ANNUAL MAINTENANCE (AMC)",
      description:
        "Professional solar panel cleaning and health checkups to keep your solar plant running at peak power output for 25 years across Odisha.",
      image: "/services/maintenance.png",
      alt: "Solar panel cleaning and AMC service",
      category: "commercial" as const,
      type: "commercial" as const,
      features: [
        "High-pressure de-mineralized panel washing",
        "Thermal scanning & inverter health inspection",
        "Fast 24-hour technician dispatch support",
      ],
      ctaText: "Book Maintenance Inspection →",
      ctaHref: "/contact?type=site-visit",
      isModalTrigger: false,
    },
  ];

  const handleCardSelect = (id: string) => {
    setSelectedCardId((prev) => (prev === id ? null : id));
  };

  const displayedServices = services.filter((service) => {
    if (activeTab === "all") return true;
    if (activeTab === "residential") return service.type === "residential";
    if (activeTab === "commercial") return service.type === "commercial";
    if (activeTab === "agricultural") return service.type === "agricultural";
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
          <div className="inline-flex flex-wrap items-center justify-center p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300/80 gap-1">
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
            <button
              onClick={() => setActiveTab("agricultural")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                activeTab === "agricultural"
                  ? "bg-cyan-600 text-white shadow-md"
                  : "text-slate-700 hover:text-cyan-700 hover:bg-slate-300/50"
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>Agriculture &amp; Pumps</span>
            </button>
          </div>
        </div>

        {/* Minimalist Cards Grid with Click Selection & Tiny Corner Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service) => {
            const isSelected = selectedCardId === service.id;
            return (
              <div
                key={service.id}
                onClick={() => handleCardSelect(service.id)}
                className={`bg-white border rounded-2xl p-6 shadow-sm transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? "ring-4 ring-emerald-500/80 border-emerald-500 shadow-xl scale-[1.02] z-10 bg-emerald-50/10"
                    : "border-slate-200/80 hover:shadow-lg hover:border-emerald-500/30"
                }`}
              >
                <div>
                  {/* Header Row: Tiny Image Thumbnail on Left Side Corner */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-slate-200/90 shadow-2xs bg-slate-100 p-1 group-hover:border-emerald-400/50 transition-colors">
                      <img
                        src={service.image}
                        alt={service.alt}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex-1 space-y-1">
                      <span className="inline-block bg-slate-900 text-amber-400 font-extrabold text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-slate-700 shadow-2xs">
                        {service.capacityBadge}
                      </span>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Minimalist Card Description */}
                  <p className="text-xs text-slate-600 leading-relaxed font-normal mb-4">
                    {service.description}
                  </p>

                  {/* Feature Bullet Points */}
                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action CTA Button */}
                <div className="pt-5 mt-4 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
                  {service.isModalTrigger ? (
                    <button
                      type="button"
                      onClick={() => setIsKusumOpen(true)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-xs cursor-pointer shadow-2xs"
                    >
                      <span>{service.ctaText}</span>
                    </button>
                  ) : (
                    <Link
                      href={service.ctaHref}
                      className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-extrabold py-2.5 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-xs shadow-2xs"
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
