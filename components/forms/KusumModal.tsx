"use client";

import React, { useState } from "react";
import {
  Sprout,
  CheckCircle2,
  X,
  User,
  Phone,
  MapPin,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Award,
} from "lucide-react";

export interface KusumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DISTRICTS = [
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
  "Other District",
];

export default function KusumModal({ isOpen, onClose }: KusumModalProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [applicantName, setApplicantName] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("Sambalpur");
  const [pumpCapacity, setPumpCapacity] = useState("5 HP");
  const [waterSource, setWaterSource] = useState("Borewell");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const cleanMobile = phone.replace(/\D/g, "").trim();

    if (!applicantName.trim()) {
      setErrorMessage("Please enter Farmer / Applicant Name.");
      return;
    }
    if (cleanMobile.length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: applicantName.trim(),
          mobileNumber: cleanMobile,
          district,
          category: "AGRICULTURAL",
          systemType: "SOLAR_PUMP",
          message: `PM-KUSUM Pre-Registration: ${pumpCapacity} Solar Pump for ${waterSource} irrigation.`,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        throw new Error(data.error || "Failed to submit PM-KUSUM pre-registration.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in font-sans">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        
        {/* Top Accent Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            
            {/* Header */}
            <div className="pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-teal-100 dark:bg-teal-950/50 border border-teal-300 dark:border-teal-800 text-teal-800 dark:text-teal-300 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2">
                <Award className="w-3.5 h-3.5 text-teal-600" />
                <span>PM-KUSUM Odisha Solar Agriculture Scheme</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Pre-Register PM-KUSUM Interest
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                Get up to 90% government subsidy for solar water pump installation on farm lands across Odisha.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Applicant Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Farmer / Applicant Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra Sahoo"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Contact Mobile Number <span className="text-rose-500">*</span>
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
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                  />
                </div>
              </div>

              {/* District Select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                  Farm District / Location <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium cursor-pointer"
                  >
                    {DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pump Capacity & Water Source */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Required Pump Capacity
                  </label>
                  <select
                    value={pumpCapacity}
                    onChange={(e) => setPumpCapacity(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium cursor-pointer"
                  >
                    <option value="3 HP">3 HP Solar Pump</option>
                    <option value="5 HP">5 HP Solar Pump</option>
                    <option value="7.5 HP">7.5 HP Solar Pump</option>
                    <option value="10 HP">10 HP Solar Pump</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Water Source Type
                  </label>
                  <select
                    value={waterSource}
                    onChange={(e) => setWaterSource(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium cursor-pointer"
                  >
                    <option value="Borewell">Borewell / Deep Well</option>
                    <option value="Open Well">Open Well / Pond</option>
                    <option value="River / Canal">River / Canal Surface</option>
                  </select>
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
                className="w-full py-4 px-6 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-black text-base rounded-xl shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Registering PM-KUSUM Interest...</span>
                  </>
                ) : (
                  <>
                    <span>Submit PM-KUSUM Pre-Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
                  Authorized Solar EPC Partner
                </span>
                <span>•</span>
                <span>Up to 90% Govt Subsidy</span>
              </div>

            </form>
          </div>
        ) : (
          /* Instant Success Screen */
          <div className="space-y-6 text-center animate-in zoom-in-95 py-4">
            <div className="w-16 h-16 bg-teal-100 dark:bg-teal-950/60 text-teal-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 bg-teal-500/10 border border-teal-500/30 text-teal-700 dark:text-teal-400 text-xs font-bold font-mono rounded-full uppercase tracking-wider">
                🌱 Registration Received
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
                Thank You, {applicantName}!
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                Your PM-KUSUM pre-registration for a <strong className="text-teal-600 font-bold">{pumpCapacity} Solar Pump</strong> in <strong className="text-slate-900 dark:text-white font-bold">{district}</strong> has been logged.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 rounded-2xl p-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed text-left space-y-1 font-medium">
              <div className="font-bold text-slate-900 dark:text-white mb-1">What happens next?</div>
              <p>• Our Agricultural Solar Officer will contact you at <strong className="text-slate-900 dark:text-white font-mono">{phone}</strong> within 24 business hours.</p>
              <p>• We will assist with government subsidy paperwork, site feasibility assessment, and pump installation setup.</p>
            </div>

            <div className="space-y-3 pt-2">
              <a
                href={`https://wa.me/919124318222?text=Hi%20Pragati%20EcoSolar%2C%20I%20pre-registered%20for%20PM-KUSUM%20Solar%20Pump%20(${pumpCapacity}%2C%20${district}).%20Please%20guide%20me.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-teal-600 hover:bg-teal-500 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat with Agricultural Solar Officer on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
