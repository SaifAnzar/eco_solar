"use client";

import React from "react";
import { motion } from "framer-motion";

const BRAND_LOGOS = [
  {
    name: "Waaree Solar",
    logo: "/images/brands/waaree.png",
  },
  {
    name: "Adani Solar",
    logo: "/images/brands/adani.png",
  },
  {
    name: "Sunora Power",
    logo: "/images/brands/sunora.png",
  },
  {
    name: "Statcon Power",
    logo: "/images/brands/statcon.jpg",
  },
  {
    name: "Servotech Solar",
    logo: "/images/brands/servotech.png",
  },
  {
    name: "Polycab Wires",
    logo: "/images/brands/polycab.jpg",
  },
  {
    name: "KEI Cables",
    logo: "/images/brands/kei.jpg",
  },
];

export default function BrandLogos() {
  // Duplicate 4 times for seamless infinite looping
  const carouselItems = [
    ...BRAND_LOGOS,
    ...BRAND_LOGOS,
    ...BRAND_LOGOS,
    ...BRAND_LOGOS,
  ];

  return (
    <div className="mt-12 py-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden relative font-sans">
      {/* Centered Section Label */}
      <div className="text-center mb-6">
        <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          OUR TRUSTED BRAND PARTNERS
        </span>
      </div>

      {/* Gradient Fade Edge Overlays */}
      <div className="absolute left-0 top-12 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white dark:from-slate-900 via-white/80 dark:via-slate-900/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-12 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white dark:from-slate-900 via-white/80 dark:via-slate-900/80 to-transparent z-10 pointer-events-none" />

      {/* Infinite Smooth Carousel Track */}
      <div className="flex overflow-hidden select-none">
        <motion.div
          className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 25,
            repeat: Infinity,
          }}
        >
          {carouselItems.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="h-16 sm:h-20 px-6 sm:px-8 bg-slate-50/80 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center shrink-0 shadow-2xs hover:bg-white dark:hover:bg-slate-800 hover:border-emerald-500/40 hover:shadow-md transition-all duration-300 group"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-9 sm:h-11 w-auto max-w-[130px] sm:max-w-[160px] object-contain transition-all duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
