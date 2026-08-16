"use client";

import React from "react";
import { AlertCircle, Info } from "lucide-react";

export default function PricingDisclaimer() {
  return (
    <div className="bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex items-start space-x-3 text-xs text-amber-900 dark:text-amber-200 font-sans shadow-sm">
      <div className="p-1.5 bg-amber-500 text-white rounded-lg shrink-0 mt-0.5">
        <Info className="w-4 h-4" />
      </div>
      <div className="space-y-1">
        <span className="font-bold uppercase font-mono tracking-wider text-[11px] text-amber-800 dark:text-amber-300 block">
          OFFICIAL SYSTEM PRICING DISCLAIMER
        </span>
        <p className="leading-relaxed text-amber-950 dark:text-amber-100 font-medium">
          Note: System prices may vary according to site conditions, shadow analysis, structure customization, and geographical location.
        </p>
      </div>
    </div>
  );
}
