import React from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Home, Calculator, ShieldCheck } from "lucide-react";
import { RESIDENTIAL_IMAGE, COMMERCIAL_IMAGE } from "@/lib/constants";
import SolarImageFallback from "@/components/common/SolarImageFallback";
import PricingDisclaimer from "@/components/common/PricingDisclaimer";
import SystemTypeComparison from "@/components/services/SystemTypeComparison";

export const metadata = {
  title: "PM Surya Ghar Residential Rooftop Solar | Pragati EcoSolar Odisha",
  description: "Get up to ₹78,000 direct central subsidy for 1 kW to 10 kW residential rooftop solar in Bhubaneswar, Cuttack & Odisha under PM Surya Ghar Muft Bijli Yojana.",
};

export default function ResidentialServicesPage() {
  const subsidyTiers = [
    { kw: "1 kW", cost: "₹65,000", subsidy: "₹30,000", net: "₹35,000", units: "~120 Units", payback: "2.4 Years" },
    { kw: "2 kW", cost: "₹1,25,000", subsidy: "₹60,000", net: "₹65,000", units: "~240 Units", payback: "2.3 Years" },
    { kw: "3 kW", cost: "₹1,80,000", subsidy: "₹78,000", net: "₹1,02,000", units: "~360 Units", payback: "2.3 Years" },
    { kw: "5 kW", cost: "₹2,85,000", subsidy: "₹78,000 (Cap)", net: "₹2,07,000", units: "~600 Units", payback: "2.8 Years" },
    { kw: "10 kW", cost: "₹5,50,000", subsidy: "₹78,000 (Cap)", net: "₹4,72,000", units: "~1,200 Units", payback: "3.2 Years" },
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Banner */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono font-bold">
            <Home className="w-3.5 h-3.5" />
            <span>PM SURYA GHAR MUFT BIJLI YOJANA</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Residential Rooftop Solar Systems in Odisha
          </h1>

          <p className="text-slate-600 text-base max-w-3xl leading-relaxed">
            Eliminate your monthly electricity bill with high-efficiency rooftop solar under PM Surya Ghar. Pragati EcoSolar handles 100% of your National Portal subsidy registration, Tier-1 Waaree/Adani TOPCon hardware supply, structural installation, and net-metering.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/calculator"
              className="inline-flex items-center space-x-2 py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-600/20 transition-all font-mono"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Solar ROI</span>
            </Link>
            <a
              href="tel:+919124318222"
              className="inline-flex items-center space-x-2 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl transition-all font-mono"
            >
              <span>Call Technical Team (+91 9124318222)</span>
            </a>
          </div>
        </div>

        {/* Pricing Disclaimer Banner (Task 14) */}
        <PricingDisclaimer />

        {/* Modern Service Showcase Image Grid (Task 13) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
            <div className="aspect-video w-full overflow-hidden rounded-2xl relative bg-slate-900">
              <SolarImageFallback
                src={RESIDENTIAL_IMAGE}
                alt="Rooftop solar installation on residential home in Bhubaneswar"
                category="residential"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Residential Rooftop Solar Array</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              High-yield 540W to 600W+ MonoPERC and TOPCon modules mounted on cyclone-rated galvanized steel structures designed specifically for Odisha wind conditions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
            <div className="aspect-video w-full overflow-hidden rounded-2xl relative bg-slate-900">
              <SolarImageFallback
                src={COMMERCIAL_IMAGE}
                alt="Commercial rooftop solar array in Odisha"
                category="commercial"
              />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Elevated Structural Solar Canopies</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Elevated 8ft to 10ft roof structures preserving 100% usable rooftop terrace space for family gatherings while generating clean solar power.
            </p>
          </div>
        </div>

        {/* Subsidy Table */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono uppercase text-emerald-700 font-bold tracking-wider">
                CENTRAL FINANCIAL ASSISTANCE (CFA)
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                PM Surya Ghar Subsidy Breakdown Table
              </h2>
            </div>
            <span className="text-xs font-mono bg-emerald-50 text-emerald-800 px-3 py-1 rounded-md border border-emerald-200 font-bold mt-2 sm:mt-0">
              Direct Bank Transfer (DBT)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] bg-[#FAFAFA]">
                  <th className="py-3 px-4">System Size</th>
                  <th className="py-3 px-4">Turnkey System Cost</th>
                  <th className="py-3 px-4 text-emerald-700">Central Subsidy</th>
                  <th className="py-3 px-4 text-amber-700">Net Cost Payable</th>
                  <th className="py-3 px-4">Est. Generation</th>
                  <th className="py-3 px-4">Payback Horizon</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {subsidyTiers.map((tier, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-slate-900 text-sm font-sans">{tier.kw}</td>
                    <td className="py-4 px-4">{tier.cost}</td>
                    <td className="py-4 px-4 font-bold text-emerald-700 bg-emerald-50/50">{tier.subsidy}</td>
                    <td className="py-4 px-4 font-bold text-amber-700 text-sm">{tier.net}</td>
                    <td className="py-4 px-4 text-slate-700">{tier.units}</td>
                    <td className="py-4 px-4 font-bold text-slate-900">{tier.payback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* On-Grid vs Hybrid System Visual Comparison (Task 16) */}
        <SystemTypeComparison />

        {/* DCR vs Non-DCR Solar Modules Comparison Cards */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-emerald-700 font-bold tracking-wider">
              TECHNICAL HARDWARE COMPLIANCE
            </span>
            <h2 className="text-2xl font-bold text-slate-900">
              Understanding DCR vs Non-DCR Solar Panels
            </h2>
            <p className="text-xs text-slate-600">
              PM Surya Ghar subsidy eligibility strictly requires MNRE ALMM List-I DCR (Domestic Content Requirement) modules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DCR Card */}
            <div className="bg-slate-50 border border-emerald-300 rounded-2xl p-6 space-y-4 relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded">
                MANDATORY FOR SUBSIDY
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">DCR Solar Modules (Waaree / Adani)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Both solar cells and solar modules are manufactured 100% in India. Mandatory for claiming PM Surya Ghar subsidy up to ₹78,000.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>MNRE ALMM List-I Certified & Registered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>540W to 600W+ MonoPERC & TOPCon Tech</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>25-Year Linear Performance Guarantee</span>
                </div>
              </div>
            </div>

            {/* Non-DCR Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-slate-900 text-amber-400 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded">
                COMMERCIAL & INDUSTRIAL
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Non-DCR Bifacial Solar Modules</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  High-efficiency modules utilizing imported solar cells. Ideal for commercial power plants where subsidy is not required.
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>22.8%+ Peak Conversion Efficiency</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Bifacial rear gain up to 25% extra generation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Eligible for 80% Accelerated Depreciation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-slate-900 p-8 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Ready to claim your ₹78,000 PM Surya Ghar Subsidy?</h3>
            <p className="text-xs text-slate-400">Our Patia team files your National Portal application within 24 hours.</p>
          </div>
          <Link
            href="/calculator"
            className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center space-x-2 shrink-0 font-mono"
          >
            <span>Launch Solar ROI Calculator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
