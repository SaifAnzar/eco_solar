"use client";

import React, { useState } from "react";
import {
  Sprout,
  Clock,
  CheckCircle2,
  Send,
  X,
  Sparkles,
  Phone,
  MapPin,
  HelpCircle,
} from "lucide-react";

const ODISHA_DISTRICTS = [
  "Khordha",
  "Cuttack",
  "Puri",
  "Ganjam",
  "Sambalpur",
  "Balasore",
  "Sundargarh",
  "Bhadrak",
  "Jajpur",
  "Mayurbhanj",
  "Angul",
  "Jharsuguda",
  "Rayagada",
  "Koraput",
  "Kalahandi",
];

export default function SolarPumpCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    district: "Khordha",
    pumpHp: "5 HP",
    pumpType: "Borewell Submersible",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          phone: formData.phone,
          location: `${formData.district}, Odisha`,
          systemType: "agricultural",
          message: `[PM-KUSUM PRE-REGISTRATION] Requested ${formData.pumpHp} ${formData.pumpType} pump in ${formData.district} district.`,
          inquiryType: "SITE_VISIT",
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Failed to submit PM-KUSUM pre-registration:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 font-sans relative overflow-hidden">
      
      {/* Top Banner Status (Task 8) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-slate-900 text-[11px] font-mono font-extrabold px-3 py-1 rounded-full shadow flex items-center gap-1.5 animate-pulse">
              <Clock className="w-3.5 h-3.5" />
              <span>IN PROGRESS / COMING SOON</span>
            </span>
            <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-800">
              PM-KUSUM SCHEME
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight pt-1">
            PM-KUSUM Solar Water Pumps for Odisha Farmers
          </h2>
        </div>

        <button
          onClick={() => {
            setSubmitted(false);
            setIsOpen(true);
          }}
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-2xl shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <Sprout className="w-4 h-4" />
          <span>Pre-Register My Farm →</span>
        </button>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2">
          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-wider block">
            GOVERNMENT SUBSIDY
          </span>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">Up to 90% Cost Paid</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Central & Odisha state subsidies cover up to 90% of total installation costs under PM-KUSUM component B & C.
          </p>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2">
          <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-wider block">
            CAPACITY RANGE
          </span>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">3 HP to 10 HP Systems</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Submersible and surface solar pumps engineered for deep borewells, rivers, and canal irrigation.
          </p>
        </div>

        <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/60 space-y-2">
          <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block">
            ZERO DIESEL COST
          </span>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">Daytime Free Water</h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Operates directly on sunlight without expensive diesel fuel or grid power outages.
          </p>
        </div>
      </div>

      {/* Pre-Registration Trigger Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    PM-KUSUM Farmer Pre-Registration
                  </h3>
                  <p className="text-xs text-slate-500">
                    Register early to get notified when Odisha pump portal opens.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  Pre-Registration Submitted!
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-slate-900 dark:text-white">{formData.fullName}</span>! Our agricultural solar specialist will call you at <span className="font-mono text-emerald-600 font-bold">{formData.phone}</span> when PM-KUSUM farmer allotments open in {formData.district}.
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 px-6 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Farmer / Applicant Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ramesh Chandra Das"
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit mobile"
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      District in Odisha *
                    </label>
                    <select
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      {ODISHA_DISTRICTS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Required Pump Power (HP)
                    </label>
                    <select
                      value={formData.pumpHp}
                      onChange={(e) => setFormData({ ...formData, pumpHp: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="3 HP">3 HP (Small Farms)</option>
                      <option value="5 HP">5 HP (Medium Farms)</option>
                      <option value="7.5 HP">7.5 HP (Large Farmland)</option>
                      <option value="10 HP">10 HP (High Capacity)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Pump Installation Type
                    </label>
                    <select
                      value={formData.pumpType}
                      onChange={(e) => setFormData({ ...formData, pumpType: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      <option value="Borewell Submersible">Borewell Submersible</option>
                      <option value="Surface Monoblock">Surface Monoblock (Pond/River)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Submitting..." : "Submit PM-KUSUM Pre-Registration"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
