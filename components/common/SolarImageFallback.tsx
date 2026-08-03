"use client";

import React, { useState } from "react";
import { Sun, Zap, ShieldCheck, Cpu, Layers, Sprout } from "lucide-react";

interface SolarImageFallbackProps {
  src: string;
  alt: string;
  className?: string;
  category?: "modules" | "inverters" | "structures" | "cables" | "pumps" | "residential" | "commercial" | "hero";
}

export default function SolarImageFallback({
  src,
  alt,
  className = "w-full h-full object-cover",
  category = "modules",
}: SolarImageFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    // Rich, enterprise industrial SVG vector graphic fallback
    return (
      <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-6 flex flex-col justify-between relative overflow-hidden group select-none">
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-amber-500/10 blur-2xl"></div>
        <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full bg-emerald-500/10 blur-2xl"></div>

        {/* Top Header Badge */}
        <div className="relative z-10 flex justify-between items-center border-b border-slate-700/60 pb-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">
            PRAGATI ECOSOLAR EPC
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold">
            25-YR WARRANTED
          </span>
        </div>

        {/* Center Graphical Vector Icon */}
        <div className="relative z-10 my-auto py-2 flex items-center space-x-4">
          <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-600 border border-amber-400/40 text-white shadow-lg shrink-0">
            {category === "pumps" && <Sprout className="w-8 h-8" />}
            {category === "inverters" && <Zap className="w-8 h-8 fill-white" />}
            {category === "structures" && <Layers className="w-8 h-8" />}
            {category === "cables" && <Cpu className="w-8 h-8" />}
            {(category === "modules" || category === "residential" || category === "commercial" || category === "hero") && (
              <Sun className="w-8 h-8" />
            )}
          </div>

          <div>
            <h4 className="text-sm font-bold text-white tracking-tight line-clamp-1">
              {alt || "Tier-1 Industrial Solar Asset"}
            </h4>
            <span className="text-xs font-mono text-slate-400 block mt-0.5">
              Odisha DISCOM Approved Hardware
            </span>
          </div>
        </div>

        {/* Bottom Technical Spec Footer */}
        <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800">
          <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 inline" />
            <span>ALMM List-I Certified</span>
          </span>
          <span>HIG 42, Patia, Bhubaneswar</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
