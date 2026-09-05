"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ArrowRight, MapPin, Shield, TrendingDown, ChevronDown } from "lucide-react";

// ─── Video sources (both from /public) ────────────────────────────────────────
const VIDEOS = [
  "/A_hyper_realistic_K_fps_ci.mp4",
  "/f04ef214-0000-424c-8398-438f8c1c69a6.mp4",
] as const;

// ─── Inject keyframes once into document head (avoids dangerouslySetInnerHTML) ─
const HERO_CSS = `
  @keyframes vh-beacon {
    0%   { transform: scale(1);   opacity: .75; }
    70%  { transform: scale(2.6); opacity: 0;   }
    100% { transform: scale(1);   opacity: 0;   }
  }
  @keyframes vh-float {
    0%,100% { transform: translateY(0);   }
    50%     { transform: translateY(-6px); }
  }
  @keyframes vh-scroll {
    0%,100% { transform: translateY(0);   opacity: 1; }
    50%     { transform: translateY(8px);  opacity: .4; }
  }
`;

function useInjectCSS(css: string) {
  useEffect(() => {
    const id = "vh-keyframes";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id;
    el.textContent = css;
    document.head.appendChild(el);
    return () => { el.remove(); };
  }, [css]);
}

// ─── Seamless dual-video crossfade background ─────────────────────────────────
function VideoBackground() {
  useInjectCSS(HERO_CSS);
  const ref0 = useRef<HTMLVideoElement>(null);
  const ref1 = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const switching = useRef(false);

  // Cross-fade: when the active video is near its end, fade to the other one
  const handleTimeUpdate = useCallback(
    (idx: number) => () => {
      const vid = idx === 0 ? ref0.current : ref1.current;
      if (!vid || switching.current) return;
      // Start cross-fade 1.8 s before the end
      if (vid.duration && vid.currentTime >= vid.duration - 1.8) {
        switching.current = true;

        const next = idx === 0 ? 1 : 0;
        const nextRef = next === 0 ? ref0.current : ref1.current;

        if (nextRef) {
          nextRef.currentTime = 0;
          nextRef.play().catch(() => {});
        }

        setActive(next);

        // After the CSS transition (1.6 s), reset the old video
        setTimeout(() => {
          if (vid) {
            vid.pause();
            vid.currentTime = 0;
          }
          switching.current = false;
        }, 1700);
      }
    },
    []
  );

  useEffect(() => {
    // Auto-play first video on mount
    if (ref0.current) {
      ref0.current.play().catch(() => {});
    }
  }, []);

  const videoClass = (idx: number) =>
    [
      "absolute inset-0 w-full h-full object-cover transition-opacity duration-[1600ms] ease-in-out",
      active === idx ? "opacity-100 z-10" : "opacity-0 z-0",
    ].join(" ");

  return (
    <>

      {/* Dark gradient overlay — makes text readable on any video content */}
      <div className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: [
            "linear-gradient(to bottom, rgba(2,8,22,0.55) 0%, rgba(2,8,22,0.32) 40%, rgba(2,8,22,0.55) 100%)",
            "linear-gradient(to right,  rgba(2,8,22,0.72) 0%, rgba(2,8,22,0.10) 55%, transparent 100%)",
          ].join(", "),
        }}
      />

      {/* Video 0 */}
      <video
        ref={ref0}
        className={videoClass(0)}
        src={VIDEOS[0]}
        muted
        playsInline
        preload="auto"
        loop={false}
        onTimeUpdate={handleTimeUpdate(0)}
        aria-hidden="true"
      />

      {/* Video 1 */}
      <video
        ref={ref1}
        className={videoClass(1)}
        src={VIDEOS[1]}
        muted
        playsInline
        preload="auto"
        loop={false}
        onTimeUpdate={handleTimeUpdate(1)}
        aria-hidden="true"
      />
    </>
  );
}

// ─── Glassmorphic stat badge ──────────────────────────────────────────────────
interface StatBadgeProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  border: string;
  glow: string;
  text: string;
  delay?: number;
}
function StatBadge({ icon, value, label, border, glow, text, delay = 0 }: StatBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay }}
      className="flex flex-col gap-1.5 px-4 py-3 rounded-2xl"
      style={{
        background: "rgba(2,8,22,0.55)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: `1px solid ${border}`,
        boxShadow: `0 0 22px ${glow}, 0 4px 20px rgba(0,0,0,0.4)`,
      }}
    >
      <div className={`${text} opacity-75`}>{icon}</div>
      <span className={`font-extrabold text-xl leading-none ${text}`}
        style={{ filter: "drop-shadow(0 0 7px currentColor)" }}>
        {value}
      </span>
      <span className="text-white/50 text-[10px] font-mono uppercase tracking-widest leading-tight">
        {label}
      </span>
    </motion.div>
  );
}

// ─── Main Hero ────────────────────────────────────────────────────────────────
export default function VideoHero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "640px" }}
      aria-label="Hero section"
    >
      {/* ── Dual-video crossfade background ── */}
      <VideoBackground />

      {/* ── Main content (z-30 so it sits above everything) ── */}
      <div className="absolute inset-0 z-30 flex flex-col justify-center px-4 sm:px-8 lg:px-16 xl:px-24">

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="inline-flex self-start items-center gap-3 px-4 py-2 rounded-full mb-6"
          style={{
            background: "rgba(16,185,129,0.12)",
            border: "1px solid rgba(16,185,129,0.35)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
          }}
        >
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-70"
              style={{ animation: "vh-beacon 2s ease-out infinite" }} />
            <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-emerald-300 text-[11px] font-mono uppercase tracking-[0.15em]">
            ⚡ PM Surya Ghar Muft Bijli Yojana Approved · Odisha
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22 }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.06] text-white tracking-tight max-w-3xl mb-5"
          style={{ textShadow: "0 2px 32px rgba(0,0,0,0.7)" }}
        >
          Smart Solar{" "}
          <span
            className="bg-clip-text text-transparent block sm:inline"
            style={{
              backgroundImage: "linear-gradient(90deg, #10b981 0%, #06b6d4 100%)",
              filter: "drop-shadow(0 0 18px rgba(16,185,129,0.5))",
            }}
          >
            Solutions
          </span>{" "}
          <span className="text-white">for Odisha</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.38 }}
          className="text-white/75 text-base sm:text-lg max-w-xl mb-8 leading-relaxed"
          style={{ textShadow: "0 1px 16px rgba(0,0,0,0.9)" }}
        >
          Generate clean power, claim up to{" "}
          <span className="text-amber-400 font-semibold">₹78,000 subsidy</span>, and cut bills by{" "}
          <span className="text-emerald-400 font-semibold">90%</span> with 25-year panel warranty & full DISCOM liaison.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.52 }}
          className="flex flex-col sm:flex-row gap-4 mb-10"
        >
          {/* Primary */}
          <Link
            href="/calculator"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-slate-900 transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]"
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              boxShadow: "0 0 28px rgba(16,185,129,0.5), 0 4px 18px rgba(0,0,0,0.45)",
            }}
          >
            <Zap className="w-4 h-4 fill-slate-900" />
            Calculate Savings
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>

          {/* Secondary */}
          <Link
            href="/contact?type=survey"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]"
            style={{
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(6,182,212,0.45)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
            }}
          >
            <MapPin className="w-4 h-4 text-cyan-400" />
            Book Free Roof Survey
          </Link>
        </motion.div>

        {/* Stat badges */}
        <div className="flex flex-col sm:flex-row gap-3">
          <StatBadge
            icon={<Shield className="w-4 h-4" />}
            value="₹78,000"
            label="Max Central Subsidy"
            border="rgba(245,158,11,0.28)"
            glow="rgba(245,158,11,0.08)"
            text="text-amber-400"
            delay={0.68}
          />
          <StatBadge
            icon={<TrendingDown className="w-4 h-4" />}
            value="90%"
            label="Bill Reduction"
            border="rgba(16,185,129,0.28)"
            glow="rgba(16,185,129,0.08)"
            text="text-emerald-400"
            delay={0.82}
          />
          <StatBadge
            icon={<Zap className="w-4 h-4" />}
            value="25 Yr"
            label="Panel Warranty"
            border="rgba(6,182,212,0.28)"
            glow="rgba(6,182,212,0.08)"
            text="text-cyan-400"
            delay={0.96}
          />
        </div>
      </div>

      {/* ── Bottom fade to page ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-36 z-30 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 0%, #FAFAFA 100%)" }}
      />

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5 pointer-events-none"
        style={{ animation: "vh-scroll 2.2s ease-in-out infinite" }}
      >
        <span className="text-white/30 text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-4 h-4 text-white/30" />
      </motion.div>
    </section>
  );
}
