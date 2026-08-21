"use client";

import React, { useState } from "react";
import {
  Zap,
  CheckCircle2,
  X,
  Building2,
  User,
  Phone,
  Mail,
  Home,
  FileText,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Award,
} from "lucide-react";

export interface EligibilityModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  buttonText?: string;
  badgeText?: string;
  className?: string;
  variant?: "hero" | "compact" | "banner" | "controlled";
}

const DISCOMS = [
  { id: "TPCODL", label: "TPCODL (Central Odisha - Bhubaneswar / Cuttack / Puri)" },
  { id: "TPNODL", label: "TPNODL (Northern Odisha - Balasore / Mayurbhanj)" },
  { id: "TPSODL", label: "TPSODL (Southern Odisha - Berhampur / Ganjam)" },
  { id: "TPWODL", label: "TPWODL (Western Odisha - Sambalpur / Rourkela)" },
];

export default function EligibilityModal({
  isOpen,
  onClose,
  buttonText = "Check PM Surya Ghar Subsidy Eligibility",
  badgeText = "Instant 1-Min Check • Up to ₹78,000 Subsidy",
  className = "",
  variant = "hero",
}: EligibilityModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form fields
  const [consumerNumber, setConsumerNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [discom, setDiscom] = useState("TPCODL");
  const [roofOwnership, setRoofOwnership] = useState("OWNED");

  // Submitted record state
  const [resultData, setResultData] = useState<any | null>(null);

  const isControlled = isOpen !== undefined;
  const modalVisible = isControlled ? isOpen : internalIsOpen;

  const handleOpen = () => {
    setSubmitted(false);
    setErrorMessage(null);
    if (!isControlled) {
      setInternalIsOpen(true);
    }
  };

  const handleClose = () => {
    if (isControlled && onClose) {
      onClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setErrorMessage(null);

    const cleanConsumerNumber = consumerNumber.replace(/\D/g, "").trim();
    const cleanMobile = phone.replace(/\D/g, "").trim();

    if (!cleanConsumerNumber) {
      setErrorMessage("Please enter a valid numeric DISCOM Consumer ID / CA Number.");
      return;
    }
    if (!fullName.trim()) {
      setErrorMessage("Please enter your Full Name.");
      return;
    }
    if (cleanMobile.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/leads/eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consumerNumber: cleanConsumerNumber,
          fullName: fullName.trim(),
          phone: cleanMobile,
          email: email.trim(),
          discom,
          roofOwnership,
          monthlyBill: "₹2,000 - ₹4,000",
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResultData({
          fullName: fullName.trim(),
          consumerNumber: cleanConsumerNumber,
          discom,
          phone: cleanMobile,
        });
        setSubmitted(true);
      } else {
        throw new Error(data.error || "Failed to submit eligibility check.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Uncontrolled Trigger Buttons */}
      {!isControlled && variant === "hero" && (
        <div className={`flex flex-col items-center sm:items-start gap-2 ${className}`}>
          <button
            type="button"
            onClick={handleOpen}
            className="group relative overflow-hidden py-4 px-6 sm:px-8 bg-gradient-to-r from-emerald-500 via-emerald-600 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-slate-950 font-black text-base sm:text-lg rounded-2xl shadow-xl shadow-emerald-500/25 hover:shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-3 cursor-pointer"
          >
            <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="p-2 bg-slate-950/90 text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 fill-amber-400" />
            </div>
            <span className="tracking-tight">{buttonText}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-700 dark:text-emerald-300 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>{badgeText}</span>
          </div>
        </div>
      )}

      {!isControlled && variant === "compact" && (
        <button
          type="button"
          onClick={handleOpen}
          className={`py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg transition flex items-center justify-center gap-2 cursor-pointer ${className}`}
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>{buttonText}</span>
        </button>
      )}

      {/* Modal Popup Overlay */}
      {modalVisible && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in font-sans">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-amber-500 to-emerald-500" />

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div className="space-y-6">
                
                {/* Header */}
                <div className="pr-8">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-amber-100 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>PM Surya Ghar Muft Bijli Yojana</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    Check Solar Subsidy Eligibility
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Verify your DISCOM Consumer ID for PM Surya Ghar Muft Bijli Yojana.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Consumer Number */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                        Consumer ID / CA Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          inputMode="numeric"
                          required
                          value={consumerNumber}
                          onChange={(e) => setConsumerNumber(e.target.value.replace(/\D/g, ""))}
                          placeholder="e.g. 0123456789"
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                        />
                      </div>
                    </div>

                    {/* DISCOM Select */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                        DISCOM Provider <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <select
                          value={discom}
                          onChange={(e) => setDiscom(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium cursor-pointer"
                        >
                          {DISCOMS.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Rajesh Kumar Mohanty"
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                        />
                      </div>
                    </div>

                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                        Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          inputMode="numeric"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                          placeholder="10-digit mobile number"
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                        />
                      </div>
                    </div>

                  </div>

                  {/* Roof Ownership Radio Pills */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Roof Ownership Type <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      
                      <button
                        type="button"
                        onClick={() => setRoofOwnership("OWNED")}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          roofOwnership === "OWNED"
                            ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-300 ring-1 ring-emerald-500"
                            : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Home className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="text-xs font-bold">🏠 Own Concrete Roof</span>
                        </div>
                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded-full">
                          100% Eligible
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRoofOwnership("RENTED")}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          roofOwnership === "RENTED"
                            ? "border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-300 ring-1 ring-amber-500"
                            : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-amber-600 shrink-0" />
                          <span className="text-xs font-bold">🏢 Rented / Commercial</span>
                        </div>
                        <span className="text-[10px] font-extrabold text-amber-700 bg-amber-100 dark:bg-amber-900/60 px-2 py-0.5 rounded-full">
                          Custom Evaluation
                        </span>
                      </button>

                    </div>
                  </div>

                  {/* Error Message */}
                  {errorMessage && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                      <span>⚠️ {errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-slate-950 font-black text-base rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Verifying DISCOM Consumer ID...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify Eligibility &amp; Subsidy</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      Empaneled Odisha DISCOM Installer
                    </span>
                    <span>•</span>
                    <span>Zero Obligation Check</span>
                  </div>

                </form>
              </div>
            ) : (
              /* Instant Celebration Post-Submit Result UI */
              <div className="space-y-6 text-center animate-in zoom-in-95 py-4">
                
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold font-mono rounded-full uppercase tracking-wider">
                    🎉 Pre-Qualified for Government Subsidy
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
                    Congratulations, {resultData?.fullName}!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                    Your Consumer ID <strong className="text-slate-900 dark:text-white font-mono">{resultData?.consumerNumber}</strong> under <strong className="text-emerald-600">{resultData?.discom}</strong> is pre-qualified for up to <strong className="text-emerald-600">Rs. 78,000</strong> Central &amp; State Subsidy under PM Surya Ghar.
                  </p>
                </div>

                {/* Eligibility Breakdown */}
                <div className="grid grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 text-center">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Max Subsidy</div>
                    <div className="text-sm sm:text-base font-black text-emerald-600">₹78,000</div>
                  </div>
                  <div className="border-x border-slate-200 dark:border-slate-700 px-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Net-Metering</div>
                    <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5">Supported</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Bill Reduction</div>
                    <div className="text-sm sm:text-base font-black text-amber-500">Up to 90%</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="space-y-3 pt-2">
                  <a
                    href={`https://wa.me/919124318222?text=Hi%20Pragati%20EcoSolar%2C%20I%20verified%20my%20Consumer%20ID%20${resultData?.consumerNumber}%20(${resultData?.discom})%20for%20PM%20Surya%20Ghar%20Subsidy.%20Please%20send%20my%20detailed%20system%20estimate.`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Speak with Solar Engineer on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
