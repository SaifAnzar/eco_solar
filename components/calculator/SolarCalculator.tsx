"use client";

import React, { useState, useEffect, useTransition } from "react";
import {
  Calculator,
  Zap,
  ShieldCheck,
  ArrowRight,
  ChevronDown,
  Download,
  MapPin,
  Building2,
  Home,
  CheckCircle2,
  Layers,
  FileText,
  X,
  Phone,
  Mail,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { pdf } from "@react-pdf/renderer";
import { lookupPincodeAndCalculate, PincodeLookupResponse } from "@/lib/actions/pincode-action";
import { saveLeadAndNotifyWhatsApp } from "@/lib/actions/lead-action";
import { calculateSolarQuote, SolarCalculationResult } from "@/lib/solar-engine";
import { QuotationPdfDocument } from "../pdf/QuotationPdfDocument";

export default function SolarCalculator() {
  const [calcMode, setCalcMode] = useState<"bill" | "kw">("bill");
  const [propertyType, setPropertyType] = useState<"residential" | "commercial">("residential");
  const [monthlyBill, setMonthlyBill] = useState<number>(3500);
  const [pincode, setPincode] = useState<string>("751024"); // Default Patia, BBSR
  const [directKw, setDirectKw] = useState<number>(3);
  const [showBom, setShowBom] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  const [calcData, setCalcData] = useState<PincodeLookupResponse>({
    success: true,
    pincode: "751024",
    locationLabel: "Patia / Kalarahanga / KIIT, Khordha (Bhubaneswar), Odisha",
    discom: "TPCODL (Central Discom)",
    latitude: 20.3548,
    longitude: 85.8173,
    peakSunHours: 4.6,
    calculation: calculateSolarQuote(3, 4.6, true),
    message: "Solar sizing ready.",
  });

  // Lead form state
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [lastRef, setLastRef] = useState("");

  // Recalculate on input change
  useEffect(() => {
    startTransition(async () => {
      const isRes = propertyType === "residential";
      const targetKwInput = calcMode === "kw" ? directKw : undefined;
      const res = await lookupPincodeAndCalculate(pincode, monthlyBill, targetKwInput, isRes);
      setCalcData(res);
    });
  }, [calcMode, propertyType, monthlyBill, pincode, directKw]);

  const calc: SolarCalculationResult = calcData.calculation;

  // PDF Generation & Lead Action Submission
  const handleLeadSubmitAndDownloadPdf = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;

    setIsGeneratingPdf(true);
    const quotationRef = `PES-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const dateStr = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    try {
      await saveLeadAndNotifyWhatsApp({
        customerName: leadForm.name,
        phone: leadForm.phone,
        email: leadForm.email,
        address: leadForm.address,
        pincode,
        locationLabel: calcData.locationLabel,
        discom: calcData.discom,
        calculation: calc,
        quotationRef,
      });

      const doc = (
        <QuotationPdfDocument
          customerName={leadForm.name}
          phone={leadForm.phone}
          email={leadForm.email}
          address={leadForm.address}
          pincode={pincode}
          locationLabel={calcData.locationLabel}
          discom={calcData.discom}
          calculation={calc}
          quotationRef={quotationRef}
          dateStr={dateStr}
        />
      );

      const asPdf = pdf(doc);
      const blob = await asPdf.toBlob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `Pragati_EcoSolar_Quotation_${quotationRef}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setLastRef(quotationRef);
      setLeadSubmitted(true);
    } catch (err) {
      console.error("PDF generation or lead submission failed:", err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Top Header Card (Light Solar Theme) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-100 pb-6 mb-8">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-600">
                <Calculator className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
                PRAGATI ECOSOLAR SIZING ENGINE v2.5
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Interactive Rooftop Solar & Subsidy Calculator
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Odisha DISCOM Net-Metering Sizing • PM Surya Ghar Subsidies • 15-Item Itemized BOM Quotation
            </p>
          </div>

          {/* Location Badge */}
          <div className="flex items-center space-x-3 px-4 py-3 bg-[#FAFAFA] border border-slate-200 rounded-2xl font-mono text-xs text-slate-700">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-slate-500 block text-[10px]">PINCODE LOCATION:</span>
              <strong className="text-slate-900 font-bold">{calcData.locationLabel}</strong>
            </div>
          </div>
        </div>

        {/* Input Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Mode Switcher */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold">
                1. Select Sizing Mode
              </label>
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#FAFAFA] border border-slate-200 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setCalcMode("bill")}
                  className={`py-2.5 px-4 text-xs font-bold rounded-xl transition-all ${
                    calcMode === "bill"
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  By Monthly Bill (₹)
                </button>
                <button
                  type="button"
                  onClick={() => setCalcMode("kw")}
                  className={`py-2.5 px-4 text-xs font-bold rounded-xl transition-all ${
                    calcMode === "kw"
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  By Direct Capacity (kW)
                </button>
              </div>
            </div>

            {/* Property Classification Switcher */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold">
                2. Property Classification
              </label>
              <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#FAFAFA] border border-slate-200 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setPropertyType("residential")}
                  className={`py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-2 ${
                    propertyType === "residential"
                      ? "bg-amber-50 text-amber-800 border border-amber-300 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Residential (PM Surya Ghar)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPropertyType("commercial")}
                  className={`py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center space-x-2 ${
                    propertyType === "commercial"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Commercial & Industrial</span>
                </button>
              </div>
            </div>

            {/* Odisha Pincode Input */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold flex justify-between">
                <span>3. Odisha Pincode (Irradiance Lookup)</span>
                <span className="text-emerald-700">PSH: {calcData.peakSunHours} Hrs/Day</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="e.g. 751024 (Patia)"
                  className="w-full px-4 py-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:border-emerald-600 transition-colors"
                />
                <span className="absolute right-3 top-3 text-[11px] font-mono text-slate-500 uppercase">
                  {calcData.discom}
                </span>
              </div>
            </div>

            {/* Dynamic Inputs */}
            {calcMode === "bill" ? (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold">
                    Current Monthly Power Bill
                  </label>
                  <span className="text-sm font-bold text-amber-700 font-mono">
                    ₹{monthlyBill.toLocaleString()} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={50000}
                  step={500}
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                  <span>₹1,000</span>
                  <span>₹25,000</span>
                  <span>₹50,000+</span>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold">
                    Target Plant Capacity (kW)
                  </label>
                  <span className="text-sm font-bold text-emerald-700 font-mono">
                    {directKw} kW System
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  step={1}
                  value={directKw}
                  onChange={(e) => setDirectKw(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                  <span>1 kW</span>
                  <span>50 kW</span>
                  <span>100 kW</span>
                </div>
              </div>
            )}

            {/* Live Technical Quick Summary Box */}
            <div className="p-4 bg-[#FAFAFA] border border-slate-200 rounded-xl space-y-2 font-mono text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Calculated Panel Count:</span>
                <strong className="text-slate-900">{calc.panelCount} × 600W MonoPERC/TOPCon</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Roof Area Needed:</span>
                <strong className="text-amber-700">{calc.requiredRoofAreaSqFt} Sq. Ft.</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Discom Net-Metering:</span>
                <strong className="text-emerald-700">{calcData.discom}</strong>
              </div>
            </div>
          </div>

          {/* Output Display Column */}
          <div className="lg:col-span-6 bg-[#FAFAFA] p-6 sm:p-8 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-inner">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold">
                  OFFICIAL QUOTATION SUMMARY
                </span>
                {isPending ? (
                  <span className="flex items-center space-x-1 text-xs text-amber-700 font-mono">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Recalculating...</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                    ODISHA TARIFF: ₹7.0 / UNIT
                  </span>
                )}
              </div>

              {/* Financial Calculations */}
              <div className="space-y-4 font-mono">
                <div className="flex justify-between items-center text-sm text-slate-700">
                  <span>Turnkey System Capacity:</span>
                  <span className="font-bold text-slate-900 text-base">{calc.systemKw} kW Rooftop</span>
                </div>

                <div className="flex justify-between items-center text-sm text-slate-700">
                  <span>Gross EPC Project Cost:</span>
                  <span className="font-semibold text-slate-900">₹{calc.grossSystemCost.toLocaleString()}</span>
                </div>

                {propertyType === "residential" ? (
                  <div className="flex justify-between items-center text-sm text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200 font-bold">
                    <span>PM Surya Ghar Central Subsidy:</span>
                    <span>- ₹{calc.pmSuryaGharSubsidy.toLocaleString()}</span>
                  </div>
                ) : (
                  <div className="flex justify-between items-center text-sm text-emerald-800 bg-emerald-50 p-3 rounded-xl border border-emerald-200 font-bold">
                    <span>80% Accelerated Depreciation Benefit:</span>
                    <span>- ₹{calc.taxBenefit80AD.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-base font-bold text-slate-900 pt-3 border-t border-slate-200">
                  <span className="text-xs uppercase font-sans text-slate-600">Net Out-of-Pocket Cost:</span>
                  <span className="text-2xl text-amber-700">₹{calc.netPayableCost.toLocaleString()}</span>
                </div>
              </div>

              {/* ROI & Savings Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                  <div className="text-[10px] font-mono uppercase text-slate-500">Monthly Solar Units</div>
                  <div className="text-lg font-bold text-slate-900 font-mono mt-0.5">
                    ~{calc.monthlyGenerationKwh} Units
                  </div>
                </div>
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                  <div className="text-[10px] font-mono uppercase text-slate-500">Annual Power Savings</div>
                  <div className="text-lg font-bold text-emerald-700 font-mono mt-0.5">
                    ₹{calc.annualSavingsRs.toLocaleString()}
                  </div>
                </div>
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                  <div className="text-[10px] font-mono uppercase text-slate-500">Payback Horizon</div>
                  <div className="text-lg font-bold text-amber-700 font-mono mt-0.5">
                    {calc.paybackPeriodYears} Years
                  </div>
                </div>
                <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                  <div className="text-[10px] font-mono uppercase text-slate-500">Annual CO2 Saved</div>
                  <div className="text-lg font-bold text-slate-700 font-mono mt-0.5">
                    {calc.co2OffsetTonsPerYear} Tons
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-8 pt-4 border-t border-slate-200 space-y-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full flex items-center justify-center space-x-2 py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Quotation & Proposal (PDF)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion for 15-Item Itemized BOM Breakdown */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl">
        <button
          type="button"
          onClick={() => setShowBom(!showBom)}
          className="w-full p-6 text-left flex justify-between items-center bg-[#FAFAFA] hover:bg-slate-100 transition-colors border-b border-slate-200"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-bold">
                PRAGATI ECOSOLAR OFFICIAL BOM STRUCTURE
              </span>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                View 15-Item Bill of Materials (BOM) & Equipment Specs
              </h3>
            </div>
          </div>
          <div className={`p-2 rounded-xl bg-white border border-slate-200 text-slate-700 transition-transform ${showBom ? "rotate-180 text-amber-700 border-amber-300" : ""}`}>
            <ChevronDown className="w-5 h-5" />
          </div>
        </button>

        <AnimatePresence>
          {showBom && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-6 overflow-x-auto"
            >
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-2">SL</th>
                    <th className="py-3 px-3">Item Category</th>
                    <th className="py-3 px-3">Technical Specification</th>
                    <th className="py-3 px-2 text-center">Qty</th>
                    <th className="py-3 px-2">Unit</th>
                    <th className="py-3 px-3 text-right">Estimated Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {calc.bom.map((item) => (
                    <tr key={item.slNo} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-2 font-bold text-amber-700">{item.slNo}</td>
                      <td className="py-3 px-3 font-bold text-slate-900 font-sans">{item.itemCategory}</td>
                      <td className="py-3 px-3 text-slate-600 font-sans text-[11px] leading-snug">
                        {item.specification}
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-slate-900">{item.quantity}</td>
                      <td className="py-3 px-2 text-slate-500">{item.unit}</td>
                      <td className="py-3 px-3 text-right font-bold text-emerald-700">
                        ₹{item.totalAmount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-200 text-sm font-bold text-slate-900 bg-[#FAFAFA]">
                    <td colSpan={5} className="py-4 px-4 uppercase text-slate-600 font-sans text-xs">
                      Gross Turnkey EPC Estimation (Excl. Subsidy):
                    </td>
                    <td className="py-4 px-3 text-right text-xl text-amber-700 font-mono">
                      ₹{calc.grossSystemCost.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Proposal Download Lead Capture Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 my-8"
            >
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
                    <Download className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold">
                      OFFICIAL PROPOSAL GENERATOR
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">Download Solar Proposal PDF</h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {leadSubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900">Proposal PDF Downloaded!</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Thank you, <strong className="text-slate-900">{leadForm.name}</strong>. Your customized <strong className="text-amber-700">{calc.systemKw} kW Solar Proposal</strong> (Ref: <strong className="text-mono text-emerald-700">{lastRef}</strong>) with 15-item BOM breakdown for <strong className="text-slate-800">{calcData.locationLabel}</strong> has been downloaded to your device and dispatched to WhatsApp at <strong className="text-mono text-slate-900">{leadForm.phone}</strong>.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setLeadSubmitted(false);
                        setIsModalOpen(false);
                      }}
                      className="w-full py-3 px-4 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md"
                    >
                      Done & Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmitAndDownloadPdf} className="space-y-4">
                  <p className="text-xs text-slate-600">
                    Enter your details to generate and download the official Pragati EcoSolar stamped PDF quotation with DISCOM net-metering details.
                  </p>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-600 mb-1 font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kalpna Sahoo"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAFAFA] border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-600 mb-1 font-semibold">
                      WhatsApp Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 91243XXXXX"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAFAFA] border border-slate-200 rounded-xl text-sm text-slate-900 font-mono focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-600 mb-1 font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAFAFA] border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-600 mb-1 font-semibold">
                      Rooftop Installation Address
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. House 42, Patia, Bhubaneswar"
                      value={leadForm.address}
                      onChange={(e) => setLeadForm({ ...leadForm, address: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#FAFAFA] border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isGeneratingPdf}
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isGeneratingPdf ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Rendering Official PDF Quotation...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Generate & Download PDF Proposal</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
