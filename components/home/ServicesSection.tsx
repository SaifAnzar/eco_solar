"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Home, Building2, Sprout, Clock } from "lucide-react";
import { RESIDENTIAL_IMAGE, COMMERCIAL_IMAGE, AGRICULTURAL_IMAGE } from "@/lib/constants";
import SolarImageFallback from "@/components/common/SolarImageFallback";

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState<"all" | "residential" | "commercial">("all");

  const allServices = [
    {
      id: "residential",
      badgeText: "Up to ₹78,000 Government Subsidy",
      badgeStyle: "bg-emerald-600 text-white font-semibold text-xs px-3 py-1 rounded-full shadow",
      title: "Solar for Your Home",
      capacity: "1 kW TO 10 kW PACKAGES",
      description:
        "We install rooftop solar panels on your home and take care of everything — from site visit and design to installation and meter approval. Save up to 90% on your electricity bill every month.",
      image: RESIDENTIAL_IMAGE,
      alt: "Rooftop solar panel installation on a home in Bhubaneswar Odisha",
      icon: Home,
      category: "residential" as const,
      type: "residential" as const,
      features: [
        "Get up to ₹78,000 directly in your bank account",
        "Trusted Waaree & Adani panels with 25-year warranty",
        "Strong steel structure — safe during Odisha cyclones",
        "We handle all meter approvals — zero hassle for you",
      ],
      ctaText: "Check My Home Savings",
      ctaHref: "/services/residential",
    },
    {
      id: "commercial",
      badgeText: "80% Tax Benefit in Year 1",
      badgeStyle: "bg-amber-500 text-slate-900 font-bold text-xs px-3 py-1 rounded-full shadow",
      title: "Solar for Offices & Factories",
      capacity: "10 kW TO 500 kW+ SYSTEMS",
      description:
        "Cut your business electricity bill by 60–80%. We install solar systems for offices, factories, warehouses, and schools across Odisha. Easy payment options available.",
      image: COMMERCIAL_IMAGE,
      alt: "Commercial rooftop solar plant on an office building in Odisha",
      icon: Building2,
      category: "commercial" as const,
      type: "commercial" as const,
      features: [
        "Pay upfront or start with zero upfront cost",
        "80% tax benefit on your solar investment in year 1",
        "Smart inverters with phone monitoring app",
        "Typically pays for itself in 3–4 years",
      ],
      ctaText: "Get a Business Solar Quote",
      ctaHref: "/services/commercial",
    },
    {
      id: "agricultural",
      badgeText: "PM-KUSUM Approved",
      badgeStyle: "bg-teal-600 text-white font-semibold text-xs px-3 py-1 rounded-full shadow",
      isComingSoon: true,
      title: "Solar Water Pumps for Farmers",
      capacity: "3 HP TO 10 HP PUMP SYSTEMS",
      description:
        "Give your farm reliable water supply using solar energy. No electricity bills, no diesel costs. We install government-approved solar pumps under the PM-KUSUM scheme.",
      image: AGRICULTURAL_IMAGE,
      alt: "Solar water pump installation on a farm in Odisha",
      icon: Sprout,
      category: "pumps" as const,
      type: "residential" as const,
      features: [
        "Up to 90% cost paid by the government",
        "Works for both surface and borewell pumps",
        "No diesel, no electricity bills — use sunlight for free",
        "Safe and weatherproof for outdoor Odisha conditions",
      ],
      ctaText: "Pre-Register PM-KUSUM Interest",
      ctaHref: "/services/solar-pumps",
    },
  ];

  const displayedServices = allServices.filter((service) => {
    if (activeTab === "all") return true;
    if (activeTab === "residential") return service.type === "residential";
    if (activeTab === "commercial") return service.type === "commercial";
    return true;
  });

  return (
    <section id="services" className="py-16 md:py-24 bg-[#FAFAFA] relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold px-3.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full inline-block">
            WHAT WE INSTALL
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Solar Solutions for Every Home & Business
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From small home systems to large factory installations — select your category to view tailored solar packages.
          </p>
        </div>

        {/* Segmented Showcase Toggle Control (Task 7) */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center p-1.5 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl border border-slate-300/80 dark:border-slate-700/80 shadow-inner gap-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeTab === "all"
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-300/50"
              }`}
            >
              All Solutions ({allServices.length})
            </button>
            <button
              onClick={() => setActiveTab("residential")}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                activeTab === "residential"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-700 dark:text-slate-300 hover:text-emerald-700 hover:bg-slate-300/50"
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
                  : "text-slate-700 dark:text-slate-300 hover:text-amber-700 hover:bg-slate-300/50"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Commercial & Industrial</span>
            </button>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white border border-slate-200/80 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Card Image */}
                  <div className="aspect-video w-full overflow-hidden relative bg-slate-900">
                    <SolarImageFallback
                      src={service.image}
                      alt={service.alt}
                      category={service.category}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none"></div>
                    
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                      <span className={service.badgeStyle}>
                        {service.badgeText}
                      </span>

                      {/* Coming Soon Status Badge (Task 8) */}
                      {service.isComingSoon && (
                        <span className="bg-amber-500 text-slate-900 font-extrabold text-[10px] font-mono px-2.5 py-0.5 rounded-full shadow flex items-center gap-1 animate-pulse">
                          <Clock className="w-3 h-3" />
                          <span>IN PROGRESS — REGISTRATION OPEN</span>
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                      <div className="p-2 rounded-xl bg-slate-900 text-amber-400 shadow-md">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-3">
                    <span className="text-xs font-bold text-amber-600 tracking-wider uppercase block">
                      {service.capacity}
                    </span>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-2.5 pt-3 border-t border-slate-100">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="p-6 pt-2">
                  <Link
                    href={service.ctaHref}
                    className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-medium py-3 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 text-xs"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
