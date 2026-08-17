"use client";

import React, { useState, useEffect, useTransition } from "react";
import { useSearchParams } from "next/navigation";
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
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { lookupPincodeAndCalculate, PincodeLookupResponse } from "@/lib/actions/pincode-action";
import { saveLeadAndNotifyWhatsApp } from "@/lib/actions/lead-action";
import { calculateSolarQuote, SolarCalculationResult } from "@/lib/solar-engine";
import { QuotationPdfDocument } from "../pdf/QuotationPdfDocument";
import {
  fetchPincodeDetails,
  PincodeDetails,
  ALL_ODISHA_DISTRICTS,
  DISCOM_DESCRIPTIONS,
  DiscomCode,
  mapDistrictToDiscom,
} from "@/lib/pincode";

export default function RoiCalculator() {
  const searchParams = useSearchParams();
  const [calcMode, setCalcMode] = useState<"bill" | "kw">("bill");
  const [propertyType, setPropertyType] = useState<"residential" | "commercial">("residential");

  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam === "residential") {
      setPropertyType("residential");
    } else if (typeParam === "commercial") {
      setPropertyType("commercial");
    }
  }, [searchParams]);
  const [monthlyBill, setMonthlyBill] = useState<number>(3500);
  const [pincode, setPincode] = useState<string>("751024");
  const [directKw, setDirectKw] = useState<number>(3);
  const [showBom, setShowBom] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  // API & Verification state
  const [isPincodeLoading, setIsPincodeLoading] = useState<boolean>(false);
  const [pincodeDetails, setPincodeDetails] = useState<PincodeDetails | null>(null);
  const [manualDistrict, setManualDistrict] = useState<string>("Khordha");
  const [manualDiscom, setManualDiscom] = useState<DiscomCode>("TPCODL");
  const [isFallbackMode, setIsFallbackMode] = useState<boolean>(false);

  const [calcData, setCalcData] = useState<PincodeLookupResponse>({
    success: true,
    pincode: "751024",
    locationLabel: "Patia, Khordha (Bhubaneswar), Odisha",
    district: "Khordha",
    state: "Odisha",
    discom: "TPCODL (Central Odisha)",
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

  // Trigger Pincode API fetch on 6-digit input
  useEffect(() => {
    const clean = pincode.trim();
    if (clean.length === 6 && /^\d{6}$/.test(clean)) {
      let isMounted = true;
      setIsPincodeLoading(true);

      fetchPincodeDetails(clean).then((res) => {
        if (!isMounted) return;
        setIsPincodeLoading(false);
        setPincodeDetails(res);

        if (res.success) {
          setIsFallbackMode(false);
        } else {
          setIsFallbackMode(true);
          const mapped = mapDistrictToDiscom(manualDistrict, "Odisha");
          setManualDiscom(mapped.discomCode);
        }
      });

      return () => {
        isMounted = false;
      };
    } else {
      setIsPincodeLoading(false);
      setPincodeDetails(null);
      setIsFallbackMode(false);
    }
  }, [pincode]);

  // Recalculate quote whenever inputs or location metadata change
  useEffect(() => {
    startTransition(async () => {
      try {
        const isRes = propertyType === "residential";
        const targetKwInput = calcMode === "kw" ? directKw : undefined;
        const mDistrict = isFallbackMode ? manualDistrict : undefined;
        const mDiscom = isFallbackMode ? DISCOM_DESCRIPTIONS[manualDiscom] : undefined;

        const res = await lookupPincodeAndCalculate(
          pincode,
          monthlyBill,
          targetKwInput,
          isRes,
          mDistrict,
          mDiscom
        );
        if (res) {
          setCalcData(res);
        }
      } catch (err) {
        console.error("ROI calculation error caught safely:", err);
      }
    });
  }, [calcMode, propertyType, monthlyBill, pincode, directKw, pincodeDetails, manualDistrict, manualDiscom, isFallbackMode]);

  const calc: SolarCalculationResult = calcData.calculation;

  const handleManualDistrictSelect = (dist: string) => {
    setManualDistrict(dist);
    const mapped = mapDistrictToDiscom(dist, "Odisha");
    setManualDiscom(mapped.discomCode);
  };

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

      const { pdf } = await import("@react-pdf/renderer");
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
      {/* Top Header Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-100 pb-6 mb-8">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-600">
                <Calculator className="w-5 h-5" />
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">
                PRAGATI ECOSOLAR SIZING ENGINE v3.0
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Interactive Rooftop Solar & Subsidy ROI Calculator
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Real-time India Post API Verification • Odisha DISCOM Net-Metering • PM Surya Ghar Subsidies
            </p>
          </div>

          {/* Location Badge */}
          <div className="flex items-center space-x-3 px-4 py-3 bg-[#FAFAFA] border border-slate-200 rounded-2xl font-mono text-xs text-slate-700 shadow-sm">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="text-slate-500 block text-[10px]">VERIFIED LOCATION:</span>
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

            {/* Pincode Verification Section */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold flex justify-between">
                <span>3. Odisha Pincode (India Post Real-Time API)</span>
                <span className="text-emerald-700">PSH: {calcData.peakSunHours} Hrs/Day</span>
              </label>

              {/* Input field with inline Loader2 spinner */}
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  placeholder="e.g. 751024 (Patia, BBSR)"
                  className="w-full pl-4 pr-10 py-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:border-emerald-600 transition-colors shadow-sm"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
                  {isPincodeLoading ? (
                    <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                  ) : (pincodeDetails?.success || calcData.success) && !isFallbackMode ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <span className="text-[10px] font-mono text-slate-400">IN</span>
                  )}
                </div>
              </div>

              {/* Active Green Badge */}
              {(pincodeDetails?.success || calcData.success) && !isFallbackMode && (
                <div className="mt-2.5 p-3 bg-emerald-50/90 border border-emerald-200 rounded-xl flex items-start space-x-2 text-emerald-900 text-xs shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">
                      Service Available: {pincodeDetails?.district || calcData.district || "Khordha"},{" "}
                      {pincodeDetails?.state || calcData.state || "Odisha"}
                    </span>
                    <span className="text-[11px] text-emerald-800 flex items-center gap-1 mt-0.5 font-mono">
                      <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                      Serviced by <strong>{calcData.discom}</strong>
                    </span>
                  </div>
                </div>
              )}

              {/* Fallback Alert & Manual Selector */}
              {isFallbackMode && (
                <div className="mt-2.5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs space-y-2.5 font-sans shadow-sm">
                  <div className="flex items-start space-x-2 text-amber-800 font-medium">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      Unable to verify pincode &quot;{pincode}&quot; via Postal API. Select district manually to proceed with quotation calculation:
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <div>
                      <label className="block text-[10px] font-mono text-amber-900 uppercase font-semibold mb-1">
                        Select District:
                      </label>
                      <select
                        value={manualDistrict}
                        onChange={(e) => handleManualDistrictSelect(e.target.value)}
                        className="w-full text-xs p-2 bg-white border border-amber-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                      >
                        {ALL_ODISHA_DISTRICTS.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-amber-900 uppercase font-semibold mb-1">
                        DISCOM Utility:
                      </label>
                      <select
                        value={manualDiscom}
                        onChange={(e) => setManualDiscom(e.target.value as DiscomCode)}
                        className="w-full text-xs p-2 bg-white border border-amber-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
                      >
                        <option value="TPCODL">TPCODL (Central Odisha)</option>
                        <option value="TPNODL">TPNODL (North Odisha)</option>
                        <option value="TPSODL">TPSODL (South Odisha)</option>
                        <option value="TPWODL">TPWODL (West Odisha)</option>
                        <option value="OTHER">Other / State DISCOM</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Current Monthly Power Bill Section / System Capacity Section */}
            {calcMode === "bill" ? (
              <div className="space-y-4">
                {/* Dedicated Separate Field for Manual Bill Typing */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold flex justify-between">
                    <span>4. CURRENT MONTHLY POWER BILL</span>
                    <span className="text-amber-700 font-bold font-mono">₹{monthlyBill.toLocaleString()} / MO</span>
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={monthlyBill === 0 ? "" : monthlyBill}
                      onChange={(e) => {
                        const clean = e.target.value.replace(/\D/g, "");
                        const val = clean === "" ? 0 : Number(clean);
                        setMonthlyBill(val);
                      }}
                      placeholder="e.g. 3500"
                      className="w-full pl-4 pr-16 py-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-emerald-600 transition-colors shadow-sm"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                      <span className="text-xs font-mono text-slate-400 font-bold">₹ / Mo</span>
                    </div>
                  </div>
                </div>

                {/* Range Slider for fast adjustment */}
                <div>
                  <input
                    type="range"
                    min={1000}
                    max={50000}
                    step={500}
                    value={monthlyBill || 1000}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                    <span>₹1,000</span>
                    <span>₹25,000</span>
                    <span>₹50,000+</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Dedicated Separate Field for Manual kW Typing */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold flex justify-between">
                    <span>4. TARGET SOLAR CAPACITY</span>
                    <span className="text-emerald-700 font-bold font-mono">{directKw} kW System</span>
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={directKw === 0 ? "" : directKw}
                      onChange={(e) => {
                        const clean = e.target.value.replace(/\D/g, "");
                        const val = clean === "" ? 0 : Number(clean);
                        setDirectKw(val);
                      }}
                      placeholder="e.g. 5"
                      className="w-full pl-4 pr-16 py-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-emerald-600 transition-colors shadow-sm"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                      <span className="text-xs font-mono text-slate-400 font-bold">kW</span>
                    </div>
                  </div>
                </div>

                {/* Range Slider for fast adjustment */}
                <div>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    step={1}
                    value={directKw || 1}
                    onChange={(e) => setDirectKw(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                    <span>1 kW</span>
                    <span>50 kW</span>
                    <span>100 kW</span>
                  </div>
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
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-center text-xs text-emerald-900 bg-emerald-50/90 p-3 rounded-xl border border-emerald-200 font-bold">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                        Central Govt Subsidy (PM Surya Ghar):
                      </span>
                      <span className="font-mono text-sm">- ₹{(calc.centralSubsidy || calc.pmSuryaGharSubsidy).toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center text-xs text-amber-950 bg-amber-50/90 p-3 rounded-xl border border-amber-200/80 font-bold">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                        Odisha State Govt Subsidy Top-Up:
                      </span>
                      <span className="font-mono text-sm">- ₹{(calc.stateSubsidy || 0).toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center text-[11px] text-slate-600 px-2 py-0.5 font-semibold">
                      <span>Total Government Subsidy Benefit:</span>
                      <span className="text-emerald-700 font-bold font-mono text-xs">
                        - ₹{(calc.totalSubsidy || (calc.pmSuryaGharSubsidy + (calc.stateSubsidy || 0))).toLocaleString()}
                      </span>
                    </div>
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
                  <div className="text-lg font-extrabold text-slate-900 font-mono mt-0.5">
                    {calc.monthlyGenerationKwh} Units
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                  <div className="text-[10px] font-mono uppercase text-slate-500">Est. Monthly Savings</div>
                  <div className="text-lg font-extrabold text-emerald-600 font-mono mt-0.5">
                    ₹{calc.monthlySavingsRs.toLocaleString()}
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                  <div className="text-[10px] font-mono uppercase text-slate-500">Annual Savings</div>
                  <div className="text-lg font-extrabold text-emerald-600 font-mono mt-0.5">
                    ₹{calc.annualSavingsRs.toLocaleString()}
                  </div>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-xl">
                  <div className="text-[10px] font-mono uppercase text-slate-500">Payback Period</div>
                  <div className="text-lg font-extrabold text-amber-600 font-mono mt-0.5">
                    {calc.paybackPeriodYears} Years
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 space-y-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Stamped Quotation (PDF)</span>
              </button>

              <button
                type="button"
                onClick={() => setShowBom(!showBom)}
                className="w-full py-2.5 px-4 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1.5 font-mono"
              >
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                <span>{showBom ? "Hide 15-Item BOM Breakdown" : "View 15-Item Itemized BOM Breakdown"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 15-Item BOM Table Accordion */}
        <AnimatePresence>
          {showBom && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-8 pt-8 border-t border-slate-200 overflow-hidden"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>Itemized Bill of Materials (15-Item Technical Spec) — {calc.systemKw} kW System</span>
                </h3>
                <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-bold">
                  MNRE / DISCOM Compliant
                </span>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase">
                    <tr>
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Component Category</th>
                      <th className="py-3 px-4">Make / Specification</th>
                      <th className="py-3 px-4">Qty</th>
                      <th className="py-3 px-4">Unit Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800">
                    {(calc.bom || []).map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-4 font-bold text-slate-500">{item.slNo || idx + 1}</td>
                        <td className="py-2.5 px-4 font-semibold text-slate-900">{item.itemCategory}</td>
                        <td className="py-2.5 px-4 text-slate-700">{item.description} ({item.specification})</td>
                        <td className="py-2.5 px-4 font-bold text-emerald-800">{item.quantity} {item.unit}</td>
                        <td className="py-2.5 px-4 text-amber-700 font-semibold">₹{item.unitRate.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* PDF & Lead Submission Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 relative overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {!leadSubmitted ? (
                <div className="space-y-6">
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-700 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-200">
                      INSTANT PDF GENERATOR
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight mt-3">
                      Download Official Pragati EcoSolar Quotation
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Enter your details to generate and download the official stamped PDF quotation with DISCOM net-metering details.
                    </p>
                  </div>

                  <form onSubmit={handleLeadSubmitAndDownloadPdf} className="space-y-4 text-xs font-mono">
                    <div>
                      <label className="block text-slate-700 uppercase font-semibold mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        placeholder="e.g. Ramesh Chandra Swain"
                        className="w-full px-4 py-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 uppercase font-semibold mb-1">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        placeholder="e.g. 98610 12345"
                        className="w-full px-4 py-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 uppercase font-semibold mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        placeholder="e.g. ramesh@example.com"
                        className="w-full px-4 py-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 uppercase font-semibold mb-1">
                        Installation Address / Area
                      </label>
                      <textarea
                        rows={2}
                        value={leadForm.address}
                        onChange={(e) => setLeadForm({ ...leadForm, address: e.target.value })}
                        placeholder="e.g. Plot 412, Patia Square, Bhubaneswar"
                        className="w-full px-4 py-2.5 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isGeneratingPdf}
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2 font-sans"
                      >
                        {isGeneratingPdf ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Generating Stamped PDF Quotation...</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            <span>Download Quotation PDF Now</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Quotation Generated!</h3>
                  <p className="text-xs text-slate-600 font-mono">
                    Reference ID: <strong className="text-emerald-700">{lastRef}</strong>
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Your official Pragati EcoSolar PDF quotation has been downloaded. Our Odisha solar team will contact you shortly to arrange a free site inspection.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setLeadSubmitted(false);
                    }}
                    className="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
