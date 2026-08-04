import React from "react";
import type { Metadata } from "next";
import DealershipForm from "@/components/dealership/DealershipForm";
import { Package, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Become an Authorized Dealer",
  description: "Become an Authorized Pragati EcoSolar Dealer. Supply Tier-1 Solar Panels, Inverters, and Solar Street Lights directly in your market. Register your business today.",
  keywords: ["Solar Dealer Odisha", "Authorized Solar Dealer Bhubaneswar", "Solar Panels Wholesale Odisha", "Solar Products Supplier Odisha"],
};

export default function DealershipPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12 sm:py-16 md:py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 font-semibold text-xs tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500 animate-pulse" />
            <span>Authorized Partner</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Become an Authorized Pragati EcoSolar Dealer
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 leading-relaxed">
            Supply Tier-1 Solar Panels, Inverters, Solar Street Lights, and Mounting Frames directly in your regional market. Expand your product range, gain access to wholesale prices, and grow with the fastest-growing solar brand in Odisha.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none -z-10" />
          <DealershipForm />
        </div>

      </div>
    </div>
  );
}
