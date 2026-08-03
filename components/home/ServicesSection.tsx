"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Home, Building2, Sprout } from "lucide-react";
import { RESIDENTIAL_IMAGE, COMMERCIAL_IMAGE, AGRICULTURAL_IMAGE } from "@/lib/constants";
import SolarImageFallback from "@/components/common/SolarImageFallback";

export default function ServicesSection() {
  const services = [
    {
      id: "residential",
      badgeText: "Up to ₹78,000 Central Subsidy",
      badgeStyle: "bg-emerald-600 text-white font-semibold text-xs px-3 py-1 rounded-full shadow",
      title: "Residential Rooftop Solar",
      capacity: "1 kW TO 10 kW CUSTOM PACKAGES",
      description:
        "Complete turnkey solar rooftop solutions under PM Surya Ghar. We handle site survey, 3D shadow modeling, tier-1 hardware supply, installation, and 100% DISCOM net-metering liaison.",
      image: RESIDENTIAL_IMAGE,
      alt: "Rooftop solar panel installation on residential concrete home in Bhubaneswar Odisha",
      icon: Home,
      category: "residential" as const,
      features: [
        "Up to ₹78,000 Direct Central Subsidy via National Portal",
        "Waaree / Adani TOPCon 600W+ High Efficiency Modules",
        "Hot-Dip Galvanized Mounting Structures (150 km/h Wind Rating)",
        "Zero-Hassle TPCODL / TPNODL / TPSODL / TPWODL Net Metering",
      ],
      ctaText: "Calculate Residential Subsidy",
      ctaHref: "/services/residential",
    },
    {
      id: "commercial",
      badgeText: "80% Accelerated Depreciation",
      badgeStyle: "bg-amber-500 text-slate-900 font-bold text-xs px-3 py-1 rounded-full shadow",
      title: "Commercial & Industrial (C&I) EPC",
      capacity: "10 kW TO 500 kW+ CAPEX & OPEX",
      description:
        "Turnkey solar power plant installation for factories, warehouses, educational institutes, and commercial complexes in Odisha with 80% Accelerated Depreciation tax benefits.",
      image: COMMERCIAL_IMAGE,
      alt: "Commercial industrial rooftop solar power plant setup in Cuttack Odisha",
      icon: Building2,
      category: "commercial" as const,
      features: [
        "CAPEX (Direct Purchase) & OPEX/PPA Zero Upfront Investment Options",
        "80% Accelerated Depreciation Tax Write-Off in Year 1",
        "Statcon / Servotech Grid-Tied Inverters with Remote Telemetry",
        "Payback Period: 2.8 to 3.5 Years with ~30% Annual ROI",
      ],
      ctaText: "Request C&I Energy Audit",
      ctaHref: "/services/commercial",
    },
    {
      id: "agricultural",
      badgeText: "PM-KUSUM Approved",
      badgeStyle: "bg-teal-600 text-white font-semibold text-xs px-3 py-1 rounded-full shadow",
      title: "Agricultural Solar Water Pumps",
      capacity: "3 HP TO 10 HP SOLAR PUMP SETS",
      description:
        "Empowering farmers across Odisha with reliable solar irrigation pumps under PM-KUSUM for uninterrupted daytime water supply without diesel generator dependency.",
      image: AGRICULTURAL_IMAGE,
      alt: "Agricultural PM-KUSUM solar water pump installation on Odisha farmland in Pipili Puri",
      icon: Sprout,
      category: "pumps" as const,
      features: [
        "Up to 90% Subsidy combining Central & Odisha Govt grants",
        "High-head Submersible & Surface Solar DC/AC Controllers",
        "IS 3043 Chemical Earthing & Lightning Protection Systems",
        "Eliminates Diesel Generator cost & reliance on erratic grid supply",
      ],
      ctaText: "Inquire PM-KUSUM Eligibility",
      ctaHref: "/services/solar-pumps",
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-[#FAFAFA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full inline-block">
            ENGINEERING SPECIALIZATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Turnkey Solar EPC Services Tailored for Odisha
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From quick-payback home solar installations under PM Surya Ghar to megawatt-scale industrial solar power plants with full DISCOM liaisoning.
          </p>
        </div>

        {/* Services Premium Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white border border-slate-200/80 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Card Header Image Frame (16:9 Aspect Ratio) */}
                  <div className="aspect-video w-full overflow-hidden relative bg-slate-900">
                    <SolarImageFallback
                      src={service.image}
                      alt={service.alt}
                      category={service.category}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none"></div>
                    
                    {/* Floating Overlay Badge on Image */}
                    <div className="absolute top-3 left-3">
                      <span className={service.badgeStyle}>
                        {service.badgeText}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 flex items-center space-x-2">
                      <div className="p-2 rounded-xl bg-slate-900 text-amber-400 shadow-md">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Card Body Content */}
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

                {/* Card CTA Button */}
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
