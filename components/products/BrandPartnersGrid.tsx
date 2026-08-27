"use client";

import React from "react";

const BRAND_PARTNERS = [
  {
    name: "Waaree Solar",
    category: "Solar Modules",
    logo: "/images/brands/waaree.png",
    fallbackText: "Waaree Solar",
  },
  {
    name: "Adani Solar",
    category: "Solar Modules & Cells",
    logo: "/images/brands/adani.png",
    fallbackText: "Adani Solar",
  },
  {
    name: "Sunora Power",
    category: "Solar Panels",
    logo: "/images/brands/sunora.png",
    fallbackText: "Sunora Power",
  },
  {
    name: "Statcon Powtech",
    category: "Inverters & PCUs",
    logo: "/images/brands/statcon.jpg",
    fallbackText: "Statcon Powtech",
  },
  {
    name: "Servotech",
    category: "EV & Solar Inverters",
    logo: "/images/brands/servotech.png",
    fallbackText: "Servotech",
  },
  {
    name: "Polycab Solar",
    category: "Solar DC & AC Cables",
    logo: "/images/brands/polycab.jpg",
    fallbackText: "Polycab Solar",
  },
  {
    name: "KEI Cables",
    category: "Cabling & Transmission",
    logo: "/images/brands/kei.jpg",
    fallbackText: "KEI Cables",
  },
];

export default function BrandPartnersGrid() {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm font-sans">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-xs sm:text-sm font-mono tracking-wider text-slate-800 dark:text-slate-200 font-bold uppercase">
          OUR TRUSTED BRAND PARTNERS
        </h3>
        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Government Approved • BIS Certified • ISO 9001:2015
        </span>
      </div>

      {/* Logos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-6">
        {BRAND_PARTNERS.map((brand) => (
          <div
            key={brand.name}
            className="group flex flex-col items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md hover:border-emerald-400/40 transition-all duration-300 min-h-[115px]"
          >
            <div className="relative w-full h-11 flex items-center justify-center p-1 rounded-lg bg-white/90 dark:bg-slate-950/80 shadow-2xs group-hover:scale-105 transition-transform duration-300">
              <img
                src={brand.logo}
                alt={`${brand.name} Logo`}
                className="max-h-9 w-auto max-w-[120px] object-contain transition-all duration-300"
                onError={(e) => {
                  // Fallback to stylized text if logo fails to load
                  e.currentTarget.style.display = "none";
                  const fallbackEl = e.currentTarget.parentElement?.querySelector(".fallback-text");
                  if (fallbackEl) fallbackEl.classList.remove("hidden");
                }}
              />
              <span className="fallback-text hidden font-extrabold text-xs text-slate-900 dark:text-slate-100 text-center">
                {brand.fallbackText}
              </span>
            </div>
            <div className="flex flex-col items-center mt-2.5 gap-0.5 w-full text-center">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {brand.name}
              </span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-tight">
                {brand.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
