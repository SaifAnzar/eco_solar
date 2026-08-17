"use client";

import React, { useState } from "react";
import {
  Building2,
  Package,
  User,
  Phone,
  Mail,
  MapPin,
  IndianRupee,
  Briefcase,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Send,
  X,
  Award,
  Crown,
  Handshake,
} from "lucide-react";

export interface PartnerApplicationFormProps {
  defaultType?: "FRANCHISE" | "PARTNER";
  onSuccess?: () => void;
  className?: string;
}

const ODISHA_DISTRICTS = [
  "Bhubaneswar (Khurda)",
  "Cuttack",
  "Sambalpur",
  "Rourkela (Sundargarh)",
  "Balasore",
  "Berhampur (Ganjam)",
  "Puri",
  "Angul",
  "Jharsuguda",
  "Bhadrak",
  "Jajpur",
  "Baripada (Mayurbhanj)",
  "Rayagada",
  "Koraput",
  "Kendrapara",
  "Dhenkanal",
  "Bargarh",
  "Bolangir",
  "Other District / Location",
];

const PARTNER_TIERS = [
  {
    id: "TIER_1_EXCLUSIVE_DISTRIBUTOR",
    title: "Tier-1: Exclusive Distributor",
    badge: "District Master Hub",
    desc: "Exclusive regional inventory hub, sub-dealer management, highest margins.",
    recommendedInvestment: "₹10 Lakhs+",
    icon: Crown,
  },
  {
    id: "TIER_2_AUTHORIZED_DEALER",
    title: "Tier-2: Authorized Dealer",
    badge: "Retail & Wholesale",
    desc: "Direct equipment supply, component retail sales, wholesale pricing.",
    recommendedInvestment: "₹5 Lakhs – ₹10 Lakhs",
    icon: Package,
  },
  {
    id: "TIER_3_REFERRAL_AGENT",
    title: "Tier-3: Referral Agent",
    badge: "Zero Inventory Model",
    desc: "Solar project referral, zero inventory burden, commission payouts.",
    recommendedInvestment: "₹2 Lakhs – ₹5 Lakhs",
    icon: Handshake,
  },
];

export default function PartnerApplicationForm({
  defaultType = "FRANCHISE",
  onSuccess,
  className = "",
}: PartnerApplicationFormProps) {
  const [type, setType] = useState<"FRANCHISE" | "PARTNER">(defaultType);
  const [tier, setTier] = useState<
    "TIER_1_EXCLUSIVE_DISTRIBUTOR" | "TIER_2_AUTHORIZED_DEALER" | "TIER_3_REFERRAL_AGENT"
  >("TIER_2_AUTHORIZED_DEALER");

  const [applicantName, setApplicantName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("Bhubaneswar (Khurda)");
  const [customLocation, setCustomLocation] = useState("");
  const [investmentRange, setInvestmentRange] = useState("₹5L–₹10L");
  const [experience, setExperience] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  // Submission Confirmation Modal State
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setToastMessage(null);

    const targetLocation =
      location === "Other District / Location" && customLocation.trim() !== ""
        ? customLocation.trim()
        : location;

    if (!applicantName.trim() || !phone.trim() || !email.trim() || !targetLocation) {
      setErrorMessage("Please complete all required fields (Name, Phone, Email, Location).");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/partners/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          tier: type === "PARTNER" ? tier : null,
          applicantName,
          businessName,
          phone,
          email,
          location: targetLocation,
          investmentRange,
          experience,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmittedData({
          id: data.data?.id || `APP-${Math.floor(100000 + Math.random() * 900000)}`,
          applicantName,
          businessName: businessName || "N/A",
          phone,
          email,
          location: targetLocation,
          type,
          tier: type === "PARTNER" ? tier : "FRANCHISE_OUTLET",
          investmentRange,
        });

        setToastMessage("Application submitted successfully!");
        setShowConfirmationModal(true);

        // Reset form fields
        setApplicantName("");
        setBusinessName("");
        setPhone("");
        setEmail("");
        setCustomLocation("");
        setExperience("");

        if (onSuccess) onSuccess();
      } else {
        throw new Error(data.error || "Failed to submit application.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      
      {/* Toast Banner */}
      {toastMessage && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-between text-emerald-700 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="text-sm font-semibold">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold px-2 py-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Form Container Card */}
      <div className="bg-white border border-slate-200/80 shadow-xl rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
        
        {/* Decorative background accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-100/60 to-emerald-100/30 rounded-bl-full pointer-events-none -z-0" />

        <div className="relative z-10 space-y-6">
          
          {/* Header */}
          <div className="border-b border-slate-100 pb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200/70 rounded-full text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
              <span>Partner With Pragati EcoSolar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Submit Application
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Join Odisha&apos;s leading solar EPC brand. Exclusive territory, marketing support &amp; high ROI.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Model & Tier Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Select Application Type <span className="text-rose-500">*</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Franchise Card */}
                <button
                  type="button"
                  onClick={() => {
                    setType("FRANCHISE");
                    setInvestmentRange("₹5L–₹10L");
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                    type === "FRANCHISE"
                      ? "border-amber-500 bg-gradient-to-br from-amber-50/90 via-amber-50/30 to-white shadow-md ring-2 ring-amber-500/20"
                      : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 text-slate-600"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${type === "FRANCHISE" ? "bg-amber-500 text-slate-950" : "bg-slate-200 text-slate-600"}`}>
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">Franchise Outlet</h4>
                        <span className="text-[11px] font-semibold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-full">
                          Exclusive Showroom Hub
                        </span>
                      </div>
                    </div>
                    {type === "FRANCHISE" && (
                      <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-3">
                    Full retail presence, exclusive district rights, EPC setup assistance &amp; direct consumer branding.
                  </p>
                </button>

                {/* Partner Program Card */}
                <button
                  type="button"
                  onClick={() => {
                    setType("PARTNER");
                    setInvestmentRange("₹2L–₹5L");
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                    type === "PARTNER"
                      ? "border-emerald-500 bg-gradient-to-br from-emerald-50/90 via-emerald-50/30 to-white shadow-md ring-2 ring-emerald-500/20"
                      : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 text-slate-600"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${type === "PARTNER" ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-600"}`}>
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">Partner Program</h4>
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                          Dealer &amp; Agent Tiers
                        </span>
                      </div>
                    </div>
                    {type === "PARTNER" && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-3">
                    Distribution, dealership, or referral partnerships with tiered margins and wholesale supply.
                  </p>
                </button>
              </div>

              {/* Sub-tier selection if Partner Program is selected */}
              {type === "PARTNER" && (
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-in fade-in">
                  <label className="block text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Select Specific Partner Tier <span className="text-rose-500">*</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {PARTNER_TIERS.map((t) => {
                      const IconComp = t.icon;
                      const isSelected = tier === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setTier(t.id as any);
                            if (t.id === "TIER_1_EXCLUSIVE_DISTRIBUTOR") setInvestmentRange("₹10L+");
                            else if (t.id === "TIER_2_AUTHORIZED_DEALER") setInvestmentRange("₹5L–₹10L");
                            else setInvestmentRange("₹2L–₹5L");
                          }}
                          className={`p-3.5 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                            isSelected
                              ? "border-emerald-600 bg-emerald-50/60 shadow-sm ring-1 ring-emerald-500"
                              : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                              <IconComp className="w-4 h-4 text-emerald-600" />
                              <span>{t.title}</span>
                            </div>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                          </div>
                          <p className="text-[11px] text-slate-500 leading-tight mb-2">{t.desc}</p>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded w-max">
                            Cap: {t.recommendedInvestment}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Step 2: Contact Details */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Applicant &amp; Business Information
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Applicant Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Rajesh Kumar Mohanty"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Business Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business / Firm Name <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Kalinga Electricals & Solar"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Contact Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. partner@example.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all font-medium"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Location & Investment */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                3. Territory &amp; Capital Commitment
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* District Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred District / Location <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all font-medium cursor-pointer"
                    >
                      {ODISHA_DISTRICTS.map((dist) => (
                        <option key={dist} value={dist}>
                          {dist}
                        </option>
                      ))}
                    </select>
                  </div>

                  {location === "Other District / Location" && (
                    <input
                      type="text"
                      required
                      value={customLocation}
                      onChange={(e) => setCustomLocation(e.target.value)}
                      placeholder="Enter city / district name"
                      className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 font-medium"
                    />
                  )}
                </div>

                {/* Investment Capacity */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Investment Capacity <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={investmentRange}
                      onChange={(e) => setInvestmentRange(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all font-medium cursor-pointer"
                    >
                      <option value="₹2L–₹5L">₹2 Lakhs – ₹5 Lakhs (Referral / Dealer Tier)</option>
                      <option value="₹5L–₹10L">₹5 Lakhs – ₹10 Lakhs (Standard Franchise / Dealer)</option>
                      <option value="₹10L+">₹10 Lakhs+ (Exclusive Master Hub / Tier-1)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Existing Business Experience */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Existing Business / Solar Experience <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <textarea
                  rows={3}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Briefly describe your existing business (e.g. electrical hardware, construction, battery showroom) or prior solar experience..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 transition-all font-medium"
                />
              </div>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                <span>⚠️ {errorMessage}</span>
              </div>
            )}

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 font-extrabold text-base rounded-2xl shadow-lg shadow-amber-500/20 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  100% Confidential
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  24-Hour Callback Guarantee
                </span>
              </div>
            </div>

          </form>
        </div>
      </div>

      {/* Submission Confirmation Modal */}
      {showConfirmationModal && submittedData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative space-y-5 animate-in zoom-in-95">
            
            <button
              onClick={() => setShowConfirmationModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Application Received!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Thank you for applying to partner with Pragati EcoSolar. Your submission is under review by our regional business development team.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs space-y-2 font-medium">
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-400">Reference ID:</span>
                <span className="font-mono font-bold text-slate-800">{submittedData.id}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-400">Applicant:</span>
                <span className="font-bold text-slate-900">{submittedData.applicantName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-400">Requested Type:</span>
                <span className="font-bold text-amber-700">{submittedData.type}</span>
              </div>
              {submittedData.tier && (
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-400">Requested Tier:</span>
                  <span className="font-bold text-emerald-700">{submittedData.tier}</span>
                </div>
              )}
              <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                <span className="text-slate-400">Location:</span>
                <span className="font-bold text-slate-900">{submittedData.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Investment Bracket:</span>
                <span className="font-bold text-emerald-700">{submittedData.investmentRange}</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                What happens next?
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Our Expansion Desk will call you at <strong className="text-slate-900">{submittedData.phone}</strong> within 24 business hours to share territory feasibility metrics and margin structures.
              </p>
            </div>

            <button
              onClick={() => setShowConfirmationModal(false)}
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Close Confirmation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
