import React from "react";
import SolarCalculator from "@/components/calculator/SolarCalculator";

export const metadata = {
  title: "Solar Subsidy & Yield Calculator | Pragati EcoSolar Bhubaneswar",
  description: "Calculate rooftop solar capacity, PM Surya Ghar subsidy (up to ₹78,000), 15-item BOM quotation breakdown, and Odisha DISCOM net metering ROI.",
};

export default function CalculatorPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <SolarCalculator />
      </div>
    </div>
  );
}
