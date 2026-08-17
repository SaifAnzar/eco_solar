import React, { Suspense } from "react";
import SolarCalculator from "@/components/calculator/SolarCalculator";

export const metadata = {
  title: "Solar Subsidy & Yield Calculator | Pragati EcoSolar Bhubaneswar",
  description: "Calculate rooftop solar capacity, PM Surya Ghar subsidy (up to ₹78,000), 15-item BOM quotation breakdown, and Odisha DISCOM net metering ROI.",
};

export default function CalculatorPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Suspense fallback={<div className="text-center py-12 text-slate-500 font-medium font-sans">Loading Solar Calculator...</div>}>
          <SolarCalculator />
        </Suspense>
      </div>
    </div>
  );
}
