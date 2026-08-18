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
  Sparkles,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { lookupPincodeAndCalculate, PincodeLookupResponse } from "@/lib/actions/pincode-action";
import { saveLeadAndNotifyWhatsApp } from "@/lib/actions/lead-action";
import { calculateSolarQuote, SolarCalculationResult } from "@/lib/solar-engine";
import {
  unitsToBill,
  billToUnits,
  estimateKwFromBill,
  calculateBillToSolarMath,
} from "@/lib/solar-calculations";
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

  // Mode: "bill" | "units" | "kw"
  const [calcMode, setCalcMode] = useState<"bill" | "units" | "kw">("bill");
  const [propertyType, setPropertyType] = useState<"residential" | "commercial">("residential");

  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam === "residential") {
      setPropertyType("residential");
    } else if (typeParam === "commercial") {
      setPropertyType("commercial");
    }
    const billParam = searchParams.get("bill");
    if (billParam && !isNaN(Number(billParam))) {
      const billVal = Number(billParam);
      if (billVal > 0) {
        setMonthlyBill(billVal);
      }
    }
  }, [searchParams]);

  const [monthlyBill, setMonthlyBill] = useState<number>(3500);
  const [rawUnitsInput, setRawUnitsInput] = useState<number>(500);
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
        }
      });

      return () => {
        isMounted = false;
      };
    } else {
      setIsFallbackMode(false);
    }
  }, [pincode]);

  // Recalculate quote in real-time when inputs change
  useEffect(() => {
    startTransition(async () => {
      try {
        const isRes = propertyType === "residential";
        const mDistrict = isFallbackMode ? manualDistrict : undefined;
        const mDiscom = isFallbackMode ? manualDiscom : undefined;

        let targetBill = monthlyBill;
        let targetKwInput: number | undefined = undefined;

        if (calcMode === "units") {
          targetBill = unitsToBill(rawUnitsInput);
        } else if (calcMode === "kw") {
          targetKwInput = directKw;
        }

        const res = await lookupPincodeAndCalculate(
          pincode,
          targetBill,
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
  }, [calcMode, propertyType, monthlyBill, rawUnitsInput, pincode, directKw, pincodeDetails, manualDistrict, manualDiscom, isFallbackMode]);

  const calc: SolarCalculationResult = calcData.calculation;

  // Real-time Bill-to-Solar math
  const billMath = calculateBillToSolarMath(
    calcMode === "units" ? unitsToBill(rawUnitsInput) : monthlyBill,
    propertyType === "residential"
  );

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
          email={leadForm.email || undefined}
          address={leadForm.address || undefined}
          pincode={pincode}
          locationLabel={calcData.locationLabel}
          discom={calcData.discom}
          quotationRef={quotationRef}
          quotationDate={dateStr}
          dateStr={dateStr}
          calculation={calc}
        />
      );

      const { pdf } = await import("@react-pdf/renderer");
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Pragati_EcoSolar_Quotation_${quotationRef}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setLastRef(quotationRef);
      setLeadSubmitted(true);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
      alert("Quotation PDF generation encountered an issue. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const residentialPresetChips = [1500, 2500, 4000, 6000, 10000];
  const commercialPresetChips = [15000, 30000, 50000, 100000];
  const activePresetChips = propertyType === "residential" ? residentialPresetChips : commercialPresetChips;

  return (
    <div className="space-y-8 font-sans">
      {/* Header Container */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-xs font-mono uppercase tracking-wider font-bold mb-2">
              <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>Odisha 2026-27 OERC LT Slab Tariff Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Solar Yield &amp; PM Surya Ghar Subsidy Calculator
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Enter your monthly electricity bill (₹) to instantly estimate capacity, PM Surya Ghar subsidy (up to ₹78,000), net bill reduction, and 15-item BOM breakdown.
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
            
            {/* 1. Sizing Mode Segmented Switcher */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold">
                1. Select Sizing Mode
              </label>
              <div className="grid grid-cols-3 gap-2 p-1.5 bg-[#FAFAFA] border border-slate-200 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setCalcMode("bill")}
                  className={`py-2.5 px-3 text-[11px] sm:text-xs font-bold rounded-xl transition-all ${
                    calcMode === "bill"
                      ? "bg-slate-900 text-amber-400 shadow-md"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Enter Monthly Bill (₹)
                </button>
                <button
                  type="button"
                  onClick={() => setCalcMode("units")}
                  className={`py-2.5 px-3 text-[11px] sm:text-xs font-bold rounded-xl transition-all ${
                    calcMode === "units"
                      ? "bg-emerald-600 text-white shadow-md"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Enter Units (kWh)
                </button>
                <button
                  type="button"
                  onClick={() => setCalcMode("kw")}
                  className={`py-2.5 px-3 text-[11px] sm:text-xs font-bold rounded-xl transition-all ${
                    calcMode === "kw"
                      ? "bg-amber-600 text-white shadow-md"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Direct Capacity (kW)
                </button>
              </div>
            </div>

            {/* 2. Property Classification Switcher */}
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
                      ? "bg-amber-50 text-amber-900 border border-amber-300 shadow-sm"
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
                      ? "bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Commercial &amp; Industrial</span>
                </button>
              </div>
            </div>

            {/* 3. Odisha Pincode Verification */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold flex justify-between">
                <span>3. Odisha Pincode (India Post API)</span>
                <span className="text-emerald-700 font-bold">PSH: {calcData.peakSunHours} Hrs/Day</span>
              </label>

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

              {isFallbackMode && (
                <div className="mt-2.5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs space-y-2.5 font-sans shadow-sm">
                  <div className="flex items-start space-x-2 text-amber-800 font-medium">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>
                      Unable to verify pincode &quot;{pincode}&quot; via Postal API. Select district manually to proceed:
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

            {/* 4. Main Dynamic Input Field Section */}
            {calcMode === "bill" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold flex justify-between">
                    <span>4. ENTER MONTHLY ELECTRICITY BILL (₹)</span>
                    <span className="text-amber-700 font-bold font-mono">₹{monthlyBill.toLocaleString("en-IN")} / MO</span>
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
                      className="w-full pl-4 pr-16 py-3 bg.white border border-slate-300 rounded-xl text-base font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors shadow-sm"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                      <span className="text-xs font-mono text-slate-400 font-bold">₹ / Mo</span>
                    </div>
                  </div>
                </div>

                {/* Preset Amount Quick Chips */}
                <div className="space-y-2 pt-1">
                  <label className="block text-[11px] font-mono text-slate-500 uppercase font-semibold">
                    Preset Amount Quick Chips:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {activePresetChips.map((chipVal) => (
                      <button
                        key={chipVal}
                        type="button"
                        onClick={() => setMonthlyBill(chipVal)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                          monthlyBill === chipVal
                            ? "bg-slate-900 text-amber-400 border-slate-900 shadow-md"
                            : "bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:bg-amber-50/50"
                        }`}
                      >
                        ₹{chipVal >= 100000 ? `${(chipVal / 100000).toFixed(1)} Lakh+` : chipVal.toLocaleString("en-IN")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Range Slider */}
                <div>
                  <input
                    type="range"
                    min={1000}
                    max={100000}
                    step={500}
                    value={monthlyBill || 1000}
                    onChange={(e) => setMonthlyBill(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-1">
                    <span>₹1,000</span>
                    <span>₹50,000</span>
                    <span>₹1,00,000+</span>
                  </div>
                </div>
              </div>
            )}

            {calcMode === "units" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold flex justify-between">
                    <span>4. ENTER MONTHLY CONSUMPTION (kWh)</span>
                    <span className="text-emerald-700 font-bold font-mono">{rawUnitsInput} Units / Mo</span>
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={rawUnitsInput === 0 ? "" : rawUnitsInput}
                      onChange={(e) => {
                        const clean = e.target.value.replace(/\D/g, "");
                        const val = clean === "" ? 0 : Number(clean);
                        setRawUnitsInput(val);
                      }}
                      placeholder="e.g. 500"
                      className="w-full pl-4 pr-20 py-3 bg-white border border-slate-300 rounded-xl text-base font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors shadow-sm"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                      <span className="text-xs font-mono text-slate-400 font-bold">kWh / Mo</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-mono">
                  Calculated Monthly Bill from OERC Slabs: <strong>₹{unitsToBill(rawUnitsInput).toLocaleString("en-IN")}</strong>
                </div>
              </div>
            )}

            {calcMode === "kw" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold flex justify-between">
                    <span>4. TARGET SOLAR CAPACITY</span>
                    <span className="text-amber-700 font-bold font-mono">{directKw} kW System</span>
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
                      className="w-full pl-4 pr-16 py-3 bg-white border border-slate-300 rounded-xl text-base font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors shadow-sm"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                      <span className="text-xs font-mono text-slate-400 font-bold">kW</span>
                    </div>
                  </div>
                </div>

                <div>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    step={1}
                    value={directKw || 1}
                    onChange={(e) => setDirectKw(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
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
                <span>Rooftop Area Required:</span>
                <strong className="text-amber-700">{calc.requiredRoofAreaSqFt || calc.systemKw * 100} Sq. Ft.</strong>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated Monthly Gen:</span>
                <strong className="text-emerald-700">~{calc.monthlyGenerationKwh || Math.round(calc.systemKw * 120)} Units / Month</strong>
              </div>
            </div>

          </div>

          {/* Real-Time Dynamic Output Display Column */}
          <div className="lg:col-span-6 bg-[#FAFAFA] p-6 sm:p-8 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-inner">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  REAL-TIME QUOTATION SUMMARY
                </span>
                {isPending ? (
                  <span className="flex items-center space-x-1 text-xs text-amber-700 font-mono">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Calculating...</span>
                  </span>
                ) : (
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                    PM SURYA GHAR EMPANELED
                  </span>
                )}
              </div>

              {/* Core Output Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                
                {/* Recommended System Size */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Recommended System Size</div>
                  <div className="text-xl font-black text-slate-900">
                    {calc.systemKw} kW Rooftop
                  </div>
                  <div className="text-[11px] text-slate-400">~{calc.panelCount} ALMM Panels</div>
                </div>

                {/* Rooftop Area Required */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Rooftop Area Required</div>
                  <div className="text-xl font-black text-amber-600">
                    {calc.requiredRoofAreaSqFt} Sq. Ft.
                  </div>
                  <div className="text-[11px] text-slate-400">~100 sq. ft. per kW</div>
                </div>

                {/* Estimated Monthly Generation */}
                <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Est. Monthly Generation</div>
                  <div className="text-xl font-black text-emerald-600">
                    {calc.monthlyGenerationKwh} Units
                  </div>
                  <div className="text-[11px] text-slate-400">~120 units / kW / mo</div>
                </div>

                {/* New Monthly Bill After Solar */}
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                  <div className="text-[10px] text-emerald-800 uppercase font-bold">New Bill After Solar</div>
                  <div className="text-xl font-black text-emerald-700">
                    ₹{billMath.newBillAfterSolar.toLocaleString("en-IN")}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-bold">Estimated ~90% Reduction</div>
                </div>

              </div>

              {/* Cost & Subsidy Breakdown Table */}
              <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 font-mono text-xs">
                
                <div className="flex justify-between items-center text-slate-700">
                  <span>Total System Cost (@ ₹75k/kW benchmark):</span>
                  <span className="font-bold text-slate-900 text-sm">₹{calc.grossSystemCost.toLocaleString("en-IN")}</span>
                </div>

                {propertyType === "residential" ? (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex justify-between items-center text-emerald-900 bg-emerald-50/90 p-2.5 rounded-xl border border-emerald-200 font-bold">
                      <span>PM Surya Ghar Govt Subsidy (Up to ₹78k):</span>
                      <span className="text-sm">- ₹{(calc.centralSubsidy || calc.pmSuryaGharSubsidy).toLocaleString("en-IN")}</span>
                    </div>

                    <div className="flex justify-between items-center text-amber-950 bg-amber-50/90 p-2.5 rounded-xl border border-amber-200/80 font-bold">
                      <span>Odisha State Top-up Subsidy:</span>
                      <span className="text-sm">- ₹{(calc.stateSubsidy || 0).toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center text-emerald-900 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 font-bold">
                    <span>80% Tax Depreciation Benefit:</span>
                    <span>- ₹{calc.taxBenefit80AD.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="flex justify-between items-center text-sm font-bold text-slate-900 pt-3 border-t border-slate-200">
                  <span className="text-xs uppercase font-sans text-slate-600">Net Payable Amount:</span>
                  <span className="text-2xl text-amber-700">₹{calc.netPayableCost.toLocaleString("en-IN")}</span>
                </div>

              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-slate-200 space-y-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 px-6 bg-slate-900 hover:bg-amber-600 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-slate-900/10 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download Official 15-Item BOM Quotation (PDF)</span>
              </button>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 px-1">
                <span>DISCOM Net-Metering Ready</span>
                <span>•</span>
                <span>25-Yr Panel Warranty</span>
                <span>•</span>
                <span>Odisha EPC empaneled</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Download PDF Lead Capture Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in font-sans">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-6 animate-in zoom-in-95">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!leadSubmitted ? (
              <>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded-full text-xs font-mono uppercase tracking-wider font-bold mb-2">
                    <FileText className="w-3.5 h-3.5 text-amber-600" />
                    <span>Download Official Quotation PDF</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    Get Customized Solar Quotation
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Enter your contact details to download the 15-item Bill of Materials (BOM) &amp; PM Surya Ghar subsidy application breakdown.
                  </p>
                </div>

                <form onSubmit={handleLeadSubmitAndDownloadPdf} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      placeholder="e.g. Subhashish Swain"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      placeholder="10-digit mobile number"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                      placeholder="your.name@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Installation Address (Optional)
                    </label>
                    <input
                      type="text"
                      value={leadForm.address}
                      onChange={(e) => setLeadForm({ ...leadForm, address: e.target.value })}
                      placeholder="e.g. House No. 42, Patia, Bhubaneswar"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isGeneratingPdf}
                    className="w-full py-3.5 bg-slate-900 hover:bg-amber-600 text-white font-black text-sm rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isGeneratingPdf ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                        <span>Generating Official PDF...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 text-amber-400" />
                        <span>Download Quotation PDF Instantly</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center space-y-4 py-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">Quotation PDF Downloaded!</h3>
                  <p className="text-xs text-slate-500">
                    Reference ID: <strong className="text-slate-900 font-mono">{lastRef}</strong>
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 border border-slate-200 p-3.5 rounded-xl font-medium">
                  Your customized solar quote has been generated. Our Odisha technical engineer will review your DISCOM net-metering feasibility and reach out shortly.
                </p>

                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setLeadSubmitted(false);
                  }}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
