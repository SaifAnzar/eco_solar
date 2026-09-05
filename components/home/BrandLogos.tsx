"use client";

import React from "react";
import { motion } from "framer-motion";

const BRAND_LOGOS = [
  { name: "Waaree Solar",     logo: "/images/brands/waaree.png" },
  { name: "Adani Solar",      logo: "/images/brands/adani.png" },
  { name: "Sunora Power",     logo: "/images/brands/sunora-logo-1.png" },
  { name: "Luminous",         logo: "/images/brands/luminous.png" },
  { name: "Statcon Powtech",  logo: "/images/brands/statcon.jpg" },
  { name: "Servotech",        logo: "/images/brands/servotech.png" },
  { name: "Polycab Solar",    logo: "/images/brands/polycab.jpg" },
  { name: "KEI Cables",       logo: "/images/brands/kei.jpg" },
];

// Quadruple for seamless loop
const TRACK = [...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS];

export default function BrandLogos() {
  return (
    <section className="relative py-14 overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400">
            Trusted Brand Partners
          </span>
          <p className="mt-2 text-sm text-slate-500">
            We only install certified Tier-1 equipment from India's most trusted manufacturers.
          </p>
        </motion.div>
      </div>

      {/* Carousel track — edge-to-edge */}
      <div className="relative overflow-hidden select-none">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #fff 0%, transparent 100%)" }} />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #fff 0%, transparent 100%)" }} />

        <motion.div
          className="flex items-center gap-4 sm:gap-6"
          style={{ width: "max-content" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {TRACK.map((brand, idx) => (
            <div key={`${brand.name}-${idx}`}
              className="group flex items-center justify-center shrink-0 h-20 sm:h-24 px-7 sm:px-10 rounded-2xl border transition-all duration-300 cursor-default"
              style={{
                background: "rgba(248,250,252,0.9)",
                border: "1px solid rgba(226,232,240,0.8)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-10 sm:h-12 w-auto max-w-[140px] object-contain opacity-60 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
