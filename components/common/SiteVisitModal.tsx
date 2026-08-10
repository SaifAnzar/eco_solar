"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, MapPin, CheckCircle2, ShieldCheck, Zap, Phone, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitContactInquiryAction } from "@/lib/actions/contact-inquiry-actions";

interface SiteVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SiteVisitModal({ isOpen, onClose }: SiteVisitModalProps) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    pincode: "751024",
    district: "Khordha (Bhubaneswar)",
    category: "Residential",
    systemType: "On-Grid Solar",
    monthlyBill: "3500",
    preferredDate: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone) {
      setError("Please provide your full name and mobile number.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await submitContactInquiryAction({
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        location: `${form.district} (Pincode: ${form.pincode})`,
        discomRegion: form.district,
        systemType: form.systemType,
        monthlyBill: form.monthlyBill ? `₹${form.monthlyBill}/month` : undefined,
        rooftopArea: `${form.category} Site`,
        message: `FREE SITE VISIT REQUEST — Category: ${form.category}. Preferred Date: ${form.preferredDate || "Earliest Available"}. ${form.message}`,
        inquiryType: "SITE_VISIT",
      });

      if (res.success) {
        setSubmitted(true);
      } else {
        setError(res.error || "Submission failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Site visit submission error:", err);
      setError("An unexpected error occurred. Please call helpline directly.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-md font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[#FAFAFA] border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col font-sans"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white shrink-0">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 font-bold">
                  PRAGATI ECOSOLAR ODISHA
                </span>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  Book Free Solar Site Inspection
                </h3>
              </div>
            </div>
            <button
              onClick={handleResetAndClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Intro Banner */}
                <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-xs text-slate-800">
                  <Sparkles className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p>
                    A certified solar design engineer will visit your location anywhere in Odisha for <strong>shadow analysis, load calculation &amp; DISCOM net-metering feasibility</strong> — 100% Free &amp; No Obligation.
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-bold">
                    {error}
                  </div>
                )}

                {/* Grid Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder="e.g. Rajesh Kumar Mohanty"
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">District / City *</label>
                    <input
                      type="text"
                      required
                      value={form.district}
                      onChange={(e) => setForm({ ...form, district: e.target.value })}
                      placeholder="e.g. Cuttack, Puri, Sambalpur"
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={form.pincode}
                      onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                      placeholder="6-digit pincode"
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Property Category</label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                    >
                      <option value="Residential Home">Residential Home / Villa</option>
                      <option value="Apartment Society">Housing Society / Apartment</option>
                      <option value="Commercial Factory">Commercial / Factory</option>
                      <option value="Hospital / School">Hospital / School / Hotel</option>
                      <option value="Agricultural Pump">Agricultural Solar Pump</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-slate-700">Avg. Monthly Bill (₹)</label>
                    <input
                      type="number"
                      value={form.monthlyBill}
                      onChange={(e) => setForm({ ...form, monthlyBill: e.target.value })}
                      placeholder="e.g. 3500"
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <label className="font-bold text-slate-700">Preferred Inspection Date (Optional)</label>
                  <input
                    type="date"
                    value={form.preferredDate}
                    onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 font-sans"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Scheduling Inspection...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Confirm Free Site Visit Booking</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="p-8 bg-white border border-emerald-200 rounded-2xl text-center space-y-4 shadow-sm font-sans">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-extrabold text-slate-900">Site Inspection Booked!</h4>
                  <p className="text-xs text-slate-600">
                    Thank you, <strong>{form.fullName}</strong>. Your free rooftop inspection has been scheduled for <strong>{form.district}</strong>.
                  </p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 font-mono">
                  Our solar engineer will contact you at <strong>+91 {form.phone}</strong> shortly to confirm arrival time.
                </div>
                <button
                  onClick={handleResetAndClose}
                  className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition-all font-sans"
                >
                  Done &amp; Close
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/**
 * Global Interceptor component that listens for any click on "Book Free Site Visit"
 * buttons/links across the entire application and displays the popup modal instantly.
 */
export function SiteVisitModalGlobal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a, button");
      if (anchor) {
        const href = anchor.getAttribute("href") || "";
        const text = ((anchor as HTMLElement).innerText || anchor.textContent || "").trim().toLowerCase();
        
        const isSiteVisitTrigger =
          href.includes("type=site-visit") ||
          text.includes("book free visit") ||
          text.includes("book free site visit") ||
          text.includes("book site visit") ||
          anchor.getAttribute("data-site-visit") === "true";

        if (isSiteVisitTrigger) {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }
      }
    };

    window.addEventListener("open-site-visit", handleOpen);
    document.addEventListener("click", handleGlobalClick, true);

    return () => {
      window.removeEventListener("open-site-visit", handleOpen);
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, []);

  return <SiteVisitModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
