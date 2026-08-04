"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, FileText, Send, CheckCircle2, CreditCard } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    discomRegion: "TPCODL (Central Odisha)",
    systemType: "residential",
    monthlyBill: "3500",
    rooftopArea: "500",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Failed to submit inquiry.");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Contact submit error:", err);
      setErrorMessage(err.message || "Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      
      {/* Hero Header */}
      <section className="relative py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold px-3 py-1 bg-amber-50 border border-amber-200 rounded-full inline-block">
              TECHNICAL CONSULTATION & SURVEY
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Contact Pragati EcoSolar Engineering Team
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Schedule an on-site rooftop solar survey, calculate PM Surya Ghar subsidies, or request a C&I CAPEX/OPEX proposal in Bhubaneswar and across Odisha.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* HQ Details Box */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                Headquarters Address
              </h2>

              <div className="space-y-5 text-sm text-slate-700">
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-base">Pragati EcoSolar HQ</strong>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      HIG 42, Aryapalli, Patia,<br />
                      Bhubaneswar, Odisha – 751024
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-base">Direct Helpline</strong>
                    <div className="flex flex-col text-xs font-mono text-slate-700 mt-1 space-y-1">
                      <a href="tel:+919124318222" className="hover:text-amber-700 transition-colors font-bold">
                        +91 9124318222 (Technical Lead)
                      </a>
                      <a href="tel:+919124679222" className="hover:text-amber-700 transition-colors font-bold">
                        +91 9124679222 (Office Desk)
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-base">Official Email</strong>
                    <a
                      href="mailto:solarbee.bbsr@gmail.com"
                      className="text-xs font-mono text-slate-700 hover:text-slate-900 mt-1 block"
                    >
                      solarbee.bbsr@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-2 border-t border-slate-100">
                  <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 shrink-0 mt-0.5">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-slate-900 block text-base">GSTIN & Governance</strong>
                    <span className="text-xs font-mono text-slate-600 block mt-0.5">
                      GSTIN: <strong className="text-slate-900">21ABIFP1344D1ZS</strong>
                    </span>
                    <span className="text-xs text-slate-600 block">
                      MD: Kalpna Sahoo
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Banking Wire Details Card */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-3 font-mono text-xs shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="flex items-center space-x-2 text-slate-900 font-bold">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <span>OFFICIAL BANK PAYMENT WIRE</span>
                </span>
                <span className="text-amber-700 font-bold">IDFC FIRST BANK</span>
              </div>
              <div className="flex justify-between py-1 text-slate-700">
                <span className="text-slate-500">Account Name:</span>
                <strong className="text-slate-900">PRAGATI ECOSOLAR</strong>
              </div>
              <div className="flex justify-between py-1 text-slate-700">
                <span className="text-slate-500">Account Number:</span>
                <strong className="text-emerald-700 font-bold">86522167402</strong>
              </div>
              <div className="flex justify-between py-1 text-slate-700">
                <span className="text-slate-500">IFSC Code:</span>
                <strong className="text-slate-900">IDFB0060241</strong>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
            
            <div className="border-b border-slate-100 pb-6 mb-6">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Request Official Solar Quotation
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Fill in your project details to get a customized solar yield analysis and DISCOM net-meter feasibility report.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4 my-8">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-300">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Quotation Request Submitted!</h3>
                <p className="text-xs text-slate-700 leading-relaxed max-w-md mx-auto">
                  Thank you, <strong className="text-slate-900">{formData.fullName}</strong>. Our senior solar engineer will review your rooftop details and contact you at <strong className="text-amber-700 font-mono">{formData.phone}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-xs font-mono font-bold text-white rounded-xl"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {errorMessage && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-xs font-medium">
                    {errorMessage}
                  </div>
                )}
                
                {/* Form Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Subhashree Dash"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXXXXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-sm text-slate-900 font-mono focus:outline-none focus:border-emerald-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Form Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold">
                      Installation District / City *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Patia, Bhubaneswar / Cuttack"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Form Row 3 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold">
                      Project Category
                    </label>
                    <select
                      value={formData.systemType}
                      onChange={(e) => setFormData({ ...formData, systemType: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600 transition-colors"
                    >
                      <option value="residential">Residential Rooftop (PM Surya Ghar)</option>
                      <option value="commercial">Commercial & Industrial EPC</option>
                      <option value="agricultural">Agricultural Solar Pump (PM-KUSUM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold">
                      DISCOM Utility Region
                    </label>
                    <select
                      value={formData.discomRegion}
                      onChange={(e) => setFormData({ ...formData, discomRegion: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600 transition-colors"
                    >
                      <option value="TPCODL">TPCODL (Bhubaneswar, Cuttack, Puri)</option>
                      <option value="TPNODL">TPNODL (Balasore, Bhadrak, Mayurbhanj)</option>
                      <option value="TPSODL">TPSODL (Ganjam, Rayagada, Koraput)</option>
                      <option value="TPWODL">TPWODL (Sambalpur, Rourkela, Jharsuguda)</option>
                    </select>
                  </div>
                </div>

                {/* Form Row 4 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold">
                      Avg Monthly Power Bill (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="3500"
                      value={formData.monthlyBill}
                      onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-sm text-slate-900 font-mono focus:outline-none focus:border-emerald-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold">
                      Approx Rooftop Area (Sq. Ft.)
                    </label>
                    <input
                      type="number"
                      placeholder="500"
                      value={formData.rooftopArea}
                      onChange={(e) => setFormData({ ...formData, rooftopArea: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-sm text-slate-900 font-mono focus:outline-none focus:border-emerald-600 transition-colors"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 mb-2 font-semibold">
                    Additional Project Details / Requirements
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Specify phase type (Single / Three Phase), roof type (RCC slab / Sheet roof), or target system capacity (e.g. 3kW / 5kW)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-emerald-600 transition-colors"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center space-x-2 py-4 px-6 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      <span>Submitting Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry to Engineering Desk</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

        {/* Location Map Embed */}
        <div className="mt-16 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl p-2">
          <div className="p-4 bg-[#FAFAFA] border-b border-slate-200 flex justify-between items-center text-xs font-mono text-slate-600">
            <span className="flex items-center space-x-2 text-slate-900 font-bold">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>HEADQUARTERS LOCATION MAP (PATIA, BHUBANESWAR)</span>
            </span>
            <span>Coordinates: 20.3548° N, 85.8173° E</span>
          </div>
          <div className="w-full h-80 bg-slate-100 relative flex items-center justify-center">
            <iframe
              title="Pragati EcoSolar Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14963.854088913963!2d85.81180295!3d20.35478475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m3!1s0x3a190938b813b52d%3A0xb3ff76c66cfdfd0!2sPatia%2C%20Bhubaneswar%2C%20Odisha!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>
        </div>

      </section>

    </div>
  );
}
