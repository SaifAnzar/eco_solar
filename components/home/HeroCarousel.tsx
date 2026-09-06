"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

// --- Slide data ---------------------------------------------------------------
interface Slide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  ctaLabel: string;
  ctaHref: string;
  accentColor: string;
  glowRgba: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    badge: "⚡ PM Surya Ghar Approved",
    title: "Slash Home Power Bills to Zero",
    subtitle:
      "Avail up to ₹78,000 direct Central subsidy with 25-year panel warranty across Odisha.",
    image: "/images/hero/slide-1.jpg",
    ctaLabel: "Check Subsidy",
    ctaHref: "/calculator",
    accentColor: "text-emerald-400",
    glowRgba: "rgba(16,185,129,0.7)",
  },
  {
    id: 2,
    badge: "🏢 Commercial & Industrial Solar",
    title: "Cut Factory & Office Power Bills by 60%",
    subtitle:
      "Accelerated tax depreciation with high-efficiency CAPEX/OPEX solar plants.",
    image: "/images/hero/slide-2.jpg",
    ctaLabel: "Commercial Solutions",
    ctaHref: "/services/commercial",
    accentColor: "text-cyan-400",
    glowRgba: "rgba(6,182,212,0.7)",
  },
  {
    id: 3,
    badge: "🌾 PM KUSUM Scheme",
    title: "Uninterrupted Day-Time Farm Irrigation",
    subtitle:
      "Reliable solar water pumping systems up to 10 HP backed by PM KUSUM subsidies.",
    image: "/images/hero/slide-3.jpg",
    ctaLabel: "Explore Solar Pumps",
    ctaHref: "/services/solar-pumps",
    accentColor: "text-amber-400",
    glowRgba: "rgba(245,158,11,0.7)",
  },
  {
    id: 4,
    badge: "🔋 Smart Storage & Inverters",
    title: "24/7 Smart Battery Backup & Bi-directional Metering",
    subtitle:
      "Sell excess clean electricity back to the grid and enjoy zero blackouts.",
    image: "/images/hero/slide-4.jpg",
    ctaLabel: "Book Free Survey",
    ctaHref: "/contact",
    accentColor: "text-violet-400",
    glowRgba: "rgba(139,92,246,0.7)",
  },
];

const AUTOPLAY_MS = 2000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  // Keep a ref always in sync so the interval callback never captures a stale value
  const currentRef = useRef(0);

  const goTo = useCallback((index: number) => {
    const next = (index + SLIDES.length) % SLIDES.length;
    currentRef.current = next;
    setCurrent(next);
  }, []);

  const next = useCallback(() => goTo(currentRef.current + 1), [goTo]);
  const prev = useCallback(() => goTo(currentRef.current - 1), [goTo]);

  // Autoplay: interval is set once per paused-state change only
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      goTo(currentRef.current + 1);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, goTo]);

  const slide = SLIDES[current];

  return (
    <section
      className="relative min-h-[85vh] w-full overflow-hidden flex items-center"
      aria-label="Hero carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          aria-hidden="true"
        >
          <Image
            src={s.image}
            alt=""
            fill
            priority={i === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(2,8,22,0.90) 0%, rgba(2,8,22,0.65) 45%, rgba(2,8,22,0.30) 100%), " +
            "linear-gradient(to bottom, rgba(2,8,22,0.20) 0%, rgba(2,8,22,0.55) 100%)",
        }}
      />

      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-20">
        <div className="max-w-2xl space-y-6">
          <div
            key={`badge-${current}`}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-widest text-white animate-hc-up"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.18)",
              animationDuration: "0.55s",
            }}
          >
            <span className={slide.accentColor}>{slide.badge}</span>
          </div>

          <h1
            key={`title-${current}`}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] text-white tracking-tight animate-hc-up"
            style={{
              textShadow: "0 2px 40px rgba(0,0,0,0.8)",
              animationDuration: "0.65s",
              animationDelay: "0.08s",
              animationFillMode: "both",
            }}
          >
            {slide.title}
          </h1>

          <p
            key={`sub-${current}`}
            className="text-white/75 text-base sm:text-lg leading-relaxed max-w-xl animate-hc-up"
            style={{
              textShadow: "0 1px 20px rgba(0,0,0,0.9)",
              animationDuration: "0.65s",
              animationDelay: "0.18s",
              animationFillMode: "both",
            }}
          >
            {slide.subtitle}
          </p>

          <div
            key={`cta-${current}`}
            className="flex flex-col sm:flex-row gap-4 pt-2 animate-hc-up"
            style={{
              animationDuration: "0.65s",
              animationDelay: "0.28s",
              animationFillMode: "both",
            }}
          >
            <Link
              href={slide.ctaHref}
              className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]"
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                boxShadow: "0 0 28px rgba(16,185,129,0.45), 0 4px 20px rgba(0,0,0,0.45)",
              }}
            >
              {slide.ctaLabel}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <Link
              href="/contact?type=survey"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]"
              style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border: "1px solid rgba(255,255,255,0.22)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
              }}
            >
              Book Free Roof Survey
            </Link>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-40 backdrop-blur-md bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 active:scale-95 border border-white/15"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 backdrop-blur-md bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 active:scale-95 border border-white/15"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="transition-all duration-500 rounded-full"
            style={
              i === current
                ? {
                    width: "32px",
                    height: "8px",
                    background: "#10b981",
                    boxShadow: `0 0 12px ${s.glowRgba}`,
                    opacity: 1,
                  }
                : {
                    width: "8px",
                    height: "8px",
                    background: "rgba(255,255,255,0.35)",
                    boxShadow: "none",
                    opacity: 0.6,
                  }
            }
          />
        ))}
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-30 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, #FAFAFA 100%)",
        }}
      />

      <style>{`
        @keyframes hc-fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-hc-up {
          animation-name: hc-fade-up;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
          animation-fill-mode: both;
        }
      `}</style>
    </section>
  );
}
