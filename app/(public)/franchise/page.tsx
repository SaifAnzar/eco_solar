import React from "react";
import type { Metadata } from "next";
import FranchiseForm from "@/components/franchise/FranchiseForm";
import { Building2, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Apply for Franchise",
  description: "Partner with Pragati EcoSolar — Open a franchise showroom in your city. Join Odisha's leading solar network and start a high-margin clean energy business.",
  keywords: ["Pragati EcoSolar Franchise", "Solar Business Odisha", "Solar Franchise Bhubaneswar", "Solar Dealership Odisha"],
};

export default function FranchisePage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12 sm:py-16 md:py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-700 font-semibold text-xs tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
            <span>Partnership Opportunity</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Partner with Pragati EcoSolar — Open a Franchise in Your City
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 leading-relaxed">
            Join Odisha's leading solar network and start a high-margin clean energy business. Help homes and commercial spaces in your region transition to sustainable power with government-backed net metering and subsidy support.
          </p>
        </div>

        {/* Form Container */}
        <div className="relative">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />
          <FranchiseForm />
        </div>

      </div>
    </div>
  );
}
