"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ArrowRight, MapPin, Shield, TrendingDown } from "lucide-react";

// ── CSS keyframe animations injected into document ────────────────────────────
const HERO_CSS = `
  @keyframes flow-em  { to { stroke-dashoffset: -24; } }
  @keyframes flow-cy  { to { stroke-dashoffset: -28; } }
  @keyframes flow-am  { to { stroke-dashoffset: -18; } }
  @keyframes sun-glo  { 0%,100% { opacity:.18; } 50% { opacity:.52; } }
  @keyframes sun-rot  { to { transform: rotate(360deg); } }
  @keyframes led-bl   { 0%,80%,100% { opacity:1; } 40% { opacity:.08; } }
  @keyframes pg-glow  { 0%,100% { opacity:0; } 50% { opacity:.07; } }
  @keyframes svg-float{ 0%,100% { transform:translateY(0px); } 50% { transform:translateY(-8px); } }
  @keyframes hero-bg-pan { 0%,100% { background-position:0% 50%; } 50% { background-position:100% 50%; } }
  @keyframes beacon-ring {
    0%   { transform:scale(1);   opacity:.7; }
    70%  { transform:scale(2.4); opacity:0; }
    100% { transform:scale(1);   opacity:0; }
  }
  @keyframes tab-slide {
    0%   { transform:translateX(-100%); opacity:0; }
    5%   { transform:translateX(0);     opacity:1; }
    90%  { transform:translateX(0);     opacity:1; }
    100% { transform:translateX(100%);  opacity:0; }
  }
`;

// ── SVG Solar Energy Engine ───────────────────────────────────────────────────
function SolarEnergyEngine() {
  return (
    <svg
      viewBox="0 0 480 318"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      style={{ animation: "svg-float 6s ease-in-out infinite" }}
      aria-hidden="true"
    >
      <defs>
        {/* Panel materials */}
        <linearGradient id="hp-glass" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#0d1f3c" />
          <stop offset="55%" stopColor="#0f2848" />
          <stop offset="100%" stopColor="#091628" />
        </linearGradient>
        <linearGradient id="hp-frame" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#8896a8" />
          <stop offset="100%" stopColor="#556070" />
        </linearGradient>
        <linearGradient id="hp-shim" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="45%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        {/* Sun */}
        <radialGradient id="hp-sunCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffde7" />
          <stop offset="35%" stopColor="#ffd54f" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.7" />
        </radialGradient>
        <radialGradient id="hp-sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        {/* Device boxes */}
        <linearGradient id="hp-devGrad" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#1a3358" />
          <stop offset="100%" stopColor="#0c1e38" />
        </linearGradient>
        <linearGradient id="hp-telBar" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#0d1f3a" />
          <stop offset="100%" stopColor="#07101e" />
        </linearGradient>
        {/* Glow filters */}
        <filter id="hp-emGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
          <feColorMatrix in="b" type="matrix"
            values="0 0 0 0 0.06  0 0 0 0 0.73  0 0 0 0 0.51  0 0 0 0.9 0" result="c" />
          <feMerge><feMergeNode in="c" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="hp-cyGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
          <feColorMatrix in="b" type="matrix"
            values="0 0 0 0 0.02  0 0 0 0 0.71  0 0 0 0 0.83  0 0 0 0.8 0" result="c" />
          <feMerge><feMergeNode in="c" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="hp-amGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b" />
          <feColorMatrix in="b" type="matrix"
            values="0 0 0 0 0.96  0 0 0 0 0.62  0 0 0 0 0.04  0 0 0 0.8 0" result="c" />
          <feMerge><feMergeNode in="c" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="hp-sunFx" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Ambient background glows */}
      <ellipse cx="91" cy="224" rx="70" ry="30" fill="#10b981" opacity="0.07" />
      <ellipse cx="334" cy="224" rx="80" ry="30" fill="#06b6d4" opacity="0.06" />

      {/* ─── SUN (centered group at 440,50) ─── */}
      <g transform="translate(440,50)">
        <circle r="62" fill="url(#hp-sunGlow)"
          style={{ animation: "sun-glo 3s ease-in-out infinite" }} />
        {/* Rotating rays */}
        <g style={{ animation: "sun-rot 24s linear infinite", transformBox: "fill-box", transformOrigin: "center" }}>
          {Array.from({ length: 10 }).map((_, i) => {
            const a = (i * 36) * Math.PI / 180;
            return (
              <line key={i}
                x1={+(Math.cos(a) * 26).toFixed(2)} y1={+(Math.sin(a) * 26).toFixed(2)}
                x2={+(Math.cos(a) * 46).toFixed(2)} y2={+(Math.sin(a) * 46).toFixed(2)}
                stroke="#ffd54f" strokeWidth="2" opacity="0.55" />
            );
          })}
        </g>
        <circle r="22" fill="url(#hp-sunCore)" filter="url(#hp-sunFx)" />
      </g>

      {/* ─── ROOFTOP BASE ─── */}
      <rect x="24" y="16" width="400" height="148" rx="8" fill="#060f1e" stroke="#1a2d48" strokeWidth="1" />
      <text x="224" y="12" fill="#4edea3" fontSize="7" fontFamily="'JetBrains Mono',monospace"
        textAnchor="middle" letterSpacing="3" opacity="0.8">
        SOLAR ARRAY · 15.0 kWp
      </text>

      {/* ─── PANEL GRID 4×3 (px=35+col*96, py=24+row*46, each 90×40) ─── */}
      {[0, 1, 2].map(row =>
        [0, 1, 2, 3].map(col => {
          const px = 35 + col * 96;
          const py = 24 + row * 46;
          const dur = (3.5 + col * 0.45 + row * 0.6).toFixed(1);
          const del = (col * 0.3 + row * 0.5).toFixed(1);
          return (
            <g key={`${row}-${col}`} transform={`translate(${px},${py})`}>
              {/* Aluminium frame */}
              <rect width="90" height="40" rx="2.5" fill="url(#hp-frame)" />
              {/* Dark glass face */}
              <rect x="2.5" y="2.5" width="85" height="35" rx="1.5" fill="url(#hp-glass)" />
              {/* Horizontal busbars */}
              {[12, 20, 28].map(by => (
                <line key={by} x1="5" y1={by} x2="85" y2={by}
                  stroke="#c0d0e0" strokeWidth="0.6" opacity="0.30" />
              ))}
              {/* Vertical fingers */}
              {[14, 28, 42, 56, 70, 81].map(vx => (
                <line key={vx} x1={vx} y1="5" x2={vx} y2="34"
                  stroke="#c0d0e0" strokeWidth="0.35" opacity="0.16" />
              ))}
              {/* Reflective shimmer pulse */}
              <rect x="2.5" y="2.5" width="85" height="35" rx="1.5" fill="url(#hp-shim)"
                style={{ animation: `pg-glow ${dur}s ease-in-out ${del}s infinite` }} />
              {/* Panel cable connector (top center) */}
              <rect x="38" y="0" width="14" height="2.5" rx="1.2" fill="#7888a0" />
            </g>
          );
        })
      )}

      {/* ─── FLOW PATH 1: Panel center (224,164) → Inverter top (91,184) ─── */}
      <path d="M 224 164 C 224 177, 91 177, 91 184"
        stroke="#10b981" strokeWidth="2.5" strokeDasharray="6 4" fill="none"
        filter="url(#hp-emGlow)"
        style={{ animation: "flow-em 0.55s linear infinite" }} />

      {/* ─── INVERTER (x=36, y=184, 110×52) ─── */}
      <rect x="36" y="184" width="110" height="52" rx="6" fill="url(#hp-devGrad)" stroke="#1c3860" strokeWidth="1.5" />
      <rect x="44" y="191" width="66" height="30" rx="3" fill="#050c1a" />
      <text x="77" y="200" fill="#10b981" fontSize="5.5" fontFamily="'JetBrains Mono',monospace"
        textAnchor="middle" letterSpacing="0.5">INVERTER</text>
      <text x="77" y="212" fill="#4edea3" fontSize="9.5" fontFamily="'JetBrains Mono',monospace"
        textAnchor="middle" fontWeight="bold">4.8 kW</text>
      <text x="77" y="220" fill="#4cd7f6" fontSize="4.8" fontFamily="'JetBrains Mono',monospace"
        textAnchor="middle">48V DC → AC</text>
      {/* LED status */}
      <circle cx="138" cy="192" r="4.5" fill="#10b981"
        style={{ animation: "led-bl 2s ease-in-out infinite" }} />
      <rect x="44" y="224" width="94" height="7" rx="2" fill="#0c1e38" />
      <text x="91" y="230" fill="#4a5e78" fontSize="4.2" fontFamily="monospace"
        textAnchor="middle" letterSpacing="1.5">SOLAR INVERTER</text>

      {/* ─── FLOW PATH 2: Inverter right (146,210) → Meter left (272,210) ─── */}
      <path d="M 146 210 L 272 210"
        stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="7 4" fill="none"
        filter="url(#hp-cyGlow)"
        style={{ animation: "flow-cy 0.7s linear infinite" }} />

      {/* ─── SMART METER (x=272, y=184, 124×52) ─── */}
      <rect x="272" y="184" width="124" height="52" rx="6" fill="url(#hp-devGrad)" stroke="#164868" strokeWidth="1.5" />
      <rect x="280" y="191" width="72" height="30" rx="3" fill="#050c1a" />
      <text x="316" y="200" fill="#06b6d4" fontSize="5.5" fontFamily="'JetBrains Mono',monospace"
        textAnchor="middle" letterSpacing="0.5">NET METER</text>
      <text x="316" y="211" fill="#4cd7f6" fontSize="8.5" fontFamily="'JetBrains Mono',monospace"
        textAnchor="middle" fontWeight="bold">↑ 2.3 kWh</text>
      <text x="316" y="220" fill="#10b981" fontSize="4.8" fontFamily="'JetBrains Mono',monospace"
        textAnchor="middle">EXPORT TO GRID</text>
      <circle cx="386" cy="192" r="4.5" fill="#06b6d4"
        style={{ animation: "led-bl 1.6s ease-in-out 0.5s infinite" }} />
      <rect x="280" y="224" width="108" height="7" rx="2" fill="#0c1e38" />
      <text x="334" y="230" fill="#4a5e78" fontSize="4.2" fontFamily="monospace"
        textAnchor="middle" letterSpacing="1.2">TPCODL · NET-METERING</text>

      {/* ─── FLOW PATH 3: Meter right (396,210) → Grid (428,210) ─── */}
      <path d="M 396 210 L 428 210"
        stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="5 3" fill="none"
        filter="url(#hp-amGlow)"
        style={{ animation: "flow-am 0.42s linear infinite" }} />

      {/* ─── GRID INDICATOR ─── */}
      <circle cx="445" cy="210" r="17" fill="#0a1628" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="445" y="207" fill="#f59e0b" fontSize="10" textAnchor="middle">⚡</text>
      <text x="445" y="218" fill="#f59e0b" fontSize="5" fontFamily="'JetBrains Mono',monospace" textAnchor="middle">GRID</text>

      {/* ─── Component labels ─── */}
      <text x="91"  y="246" fill="#4edea3" fontSize="7.5" fontFamily="'JetBrains Mono',monospace" textAnchor="middle" opacity="0.6">INVERTER</text>
      <text x="334" y="246" fill="#4cd7f6" fontSize="7.5" fontFamily="'JetBrains Mono',monospace" textAnchor="middle" opacity="0.6">SMART METER</text>
      <text x="445" y="246" fill="#f59e0b" fontSize="6.5" fontFamily="'JetBrains Mono',monospace" textAnchor="middle" opacity="0.6">EXPORT</text>

      {/* ─── LIVE TELEMETRY FOOTER ─── */}
      <rect x="24" y="256" width="400" height="50" rx="6" fill="url(#hp-telBar)" stroke="#1a2d48" strokeWidth="1" />
      {/* Left: current output */}
      <circle cx="44" cy="281" r="5.5" fill="#10b981"
        style={{ animation: "led-bl 1s ease-in-out infinite" }} />
      <text x="56" y="276" fill="#4a6080" fontSize="6" fontFamily="'JetBrains Mono',monospace">CURRENT OUTPUT</text>
      <text x="56" y="291" fill="#4edea3" fontSize="14" fontFamily="'JetBrains Mono',monospace" fontWeight="bold">4.8 kW</text>
      {/* Divider */}
      <line x1="224" y1="262" x2="224" y2="300" stroke="#1a2d48" strokeWidth="1" />
      {/* Right: grid status */}
      <circle cx="244" cy="281" r="5.5" fill="#06b6d4"
        style={{ animation: "led-bl 1.5s ease-in-out 0.3s infinite" }} />
      <text x="256" y="276" fill="#4a6080" fontSize="6" fontFamily="'JetBrains Mono',monospace">GRID STATUS</text>
      <text x="256" y="291" fill="#4cd7f6" fontSize="9.5" fontFamily="'JetBrains Mono',monospace" fontWeight="bold">NET-METERING ACTIVE ⚡</text>
    </svg>
  );
}

// ── Glassmorphic Metric Card ──────────────────────────────────────────────────
interface MetricCardProps {
  value: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  borderColor: string;
  textClass: string;
  shadowColor: string;
  delay?: number;
}
function MetricCard({ value, label, sublabel, icon, borderColor, textClass, shadowColor, delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col gap-1 p-4 rounded-2xl"
      style={{
        background: "rgba(8,18,36,0.65)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${borderColor}`,
        boxShadow: `0 0 20px ${shadowColor}`,
      }}
    >
      <div className={`${textClass} opacity-75 mb-0.5`}>{icon}</div>
      <span className={`font-extrabold text-2xl leading-none tracking-tight ${textClass}`}
        style={{ filter: "drop-shadow(0 0 8px currentColor)" }}>
        {value}
      </span>
      <span className="text-white/70 text-sm font-semibold leading-snug">{label}</span>
      <span className="text-white/30 text-[10px] font-mono uppercase tracking-wider">{sublabel}</span>
    </motion.div>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────────
export default function AnimatedSolarHero() {
  return (
    <>
      {/* Inject keyframe animations */}
      <style dangerouslySetInnerHTML={{ __html: HERO_CSS }} />

      <section className="relative overflow-hidden bg-[#030b18] min-h-[88vh] flex items-center">

        {/* ── Atmospheric background blobs ── */}
        <div className="absolute -bottom-48 -left-48 w-[560px] h-[560px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)" }} />
        <div className="absolute -top-48 right-0 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 70%)" }} />
        <div className="absolute top-1/3 left-1/3 w-72 h-72 rounded-full blur-3xl pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)" }} />

        {/* Dot grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />

        {/* ── Content ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center">

            {/* ═══════════════ LEFT COLUMN ═══════════════ */}
            <div className="lg:col-span-6 flex flex-col gap-7">

              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="inline-flex self-start items-center gap-3 px-4 py-2 rounded-full"
                style={{
                  background: "rgba(16,185,129,0.09)",
                  border: "1px solid rgba(16,185,129,0.32)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                {/* Pulsing beacon */}
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"
                    style={{ animation: "beacon-ring 1.8s ease-out infinite" }} />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-emerald-300 text-[11px] font-mono uppercase tracking-[0.14em] leading-tight">
                  ⚡ PM Surya Ghar Muft Bijli Yojana Approved | Odisha
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.18 }}
                className="text-4xl sm:text-5xl xl:text-[3.6rem] font-extrabold leading-[1.07] text-white tracking-tight"
              >
                Smart Solar Solutions{" "}
                <span className="block mt-1">
                  for a{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #10b981 0%, #06b6d4 100%)",
                      filter: "drop-shadow(0 0 22px rgba(16,185,129,0.38))",
                    }}
                  >
                    Zero-Bill Future
                  </span>
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.32 }}
                className="text-slate-400 text-base sm:text-[1.05rem] leading-relaxed max-w-lg"
              >
                Generate your own clean power, claim up to{" "}
                <span className="text-amber-400 font-semibold">₹78,000 Central subsidy</span>, and
                cut electricity bills by up to{" "}
                <span className="text-emerald-400 font-semibold">90%</span> with net-metering and a
                25-year panel warranty.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {/* Primary */}
                <Link
                  href="/calculator"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-slate-900 transition-all duration-300 hover:scale-[1.03] active:scale-[0.99]"
                  style={{
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    boxShadow: "0 0 30px rgba(16,185,129,0.42), 0 4px 16px rgba(0,0,0,0.4)",
                  }}
                >
                  <Zap className="w-4 h-4 fill-slate-900" />
                  Calculate Savings
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>

                {/* Secondary */}
                <Link
                  href="/contact?type=survey"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-[1.03] active:scale-[0.99]"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(6,182,212,0.38)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                  }}
                >
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  Book Free Roof Survey
                </Link>
              </motion.div>

              {/* Metric Cards Row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.58 }}
                className="grid grid-cols-3 gap-3"
              >
                <MetricCard
                  value="₹78K"
                  label="Max Subsidy"
                  sublabel="Central + State"
                  icon={<Shield className="w-4 h-4" />}
                  borderColor="rgba(245,158,11,0.25)"
                  textClass="text-amber-400"
                  shadowColor="rgba(245,158,11,0.06)"
                  delay={0.65}
                />
                <MetricCard
                  value="90%"
                  label="Bill Reduction"
                  sublabel="Net Metering"
                  icon={<TrendingDown className="w-4 h-4" />}
                  borderColor="rgba(16,185,129,0.25)"
                  textClass="text-emerald-400"
                  shadowColor="rgba(16,185,129,0.06)"
                  delay={0.78}
                />
                <MetricCard
                  value="25 Yr"
                  label="Warranty"
                  sublabel="Performance"
                  icon={<Zap className="w-4 h-4" />}
                  borderColor="rgba(6,182,212,0.25)"
                  textClass="text-cyan-400"
                  shadowColor="rgba(6,182,212,0.06)"
                  delay={0.91}
                />
              </motion.div>
            </div>

            {/* ═══════════════ RIGHT COLUMN ═══════════════ */}
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            >
              {/* Gradient border wrapper */}
              <div
                className="relative rounded-3xl p-px"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(16,185,129,0.55) 0%, rgba(6,182,212,0.22) 50%, rgba(16,185,129,0.12) 100%)",
                }}
              >
                {/* Card inner */}
                <div
                  className="relative rounded-[calc(1.5rem-1px)] p-5 sm:p-6 overflow-hidden"
                  style={{
                    background: "rgba(5,14,30,0.85)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                  }}
                >
                  {/* Inner ambient glows */}
                  <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)" }} />
                  <div className="absolute -bottom-24 -left-24 w-60 h-60 rounded-full blur-3xl pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)" }} />

                  {/* Card header label */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono text-emerald-400/70 uppercase tracking-[0.18em]">
                      Live Energy Monitor
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      REC LIVE
                    </span>
                  </div>

                  {/* SVG Engine */}
                  <SolarEnergyEngine />
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── Section bottom fade to page background ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent 0%, #FAFAFA 100%)" }}
        />
      </section>
    </>
  );
}
