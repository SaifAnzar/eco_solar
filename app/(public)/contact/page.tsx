"use client";

import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Zap, CheckCircle2, MessageSquare, PhoneCall, Calendar } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { saveLeadAndNotifyWhatsApp } from "@/lib/actions/lead-action";

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    location: "",
    systemType: "On-Grid",
    category: "Residential",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone) return;
    setIsSubmitting(true);

    try {
      // 1. Submit to Prisma database via /api/inquiries API Route
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          mobileNumber: form.phone,
          email: form.email || null,
          pincode: "751024",
          district: form.location || "Khordha",
          discom: "TPCODL",
          category: form.category === "Residential" ? "RESIDENTIAL" : form.category === "Agricultural" ? "AGRICULTURAL" : "COMMERCIAL_INDUSTRIAL",
          systemType: form.systemType === "Off-Grid" ? "OFF_GRID" : form.systemType === "Hybrid" ? "HYBRID" : form.systemType === "Solar Water Pump" ? "SOLAR_PUMP" : form.systemType === "Solar Street Light" ? "STREET_LIGHTING" : "ON_GRID",
          message: form.message,
        }),
      });

      // 2. Also notify WhatsApp action
      await saveLeadAndNotifyWhatsApp({
        customerName: form.fullName,
        phone: form.phone,
        email: form.email,
        address: `${form.location} - ${form.message}`,
        pincode: "751024",
        locationLabel: form.location || "Patia, Bhubaneswar",
        discom: "TPCODL (Central Odisha)",
        calculation: {
          systemKw: 3,
          propertyType: form.category === "Residential" ? "residential" : "commercial",
          panelCount: 5,
          panelWp: 600,
          panelUnitPrice: 14000,
          totalPanelCost: 70000,
          requiredRoofAreaSqFt: 270,
          benchmarkRatePerKw: 65000,
          grossSystemCost: 195000,
          pmSuryaGharSubsidy: 78000,
          centralSubsidy: 78000,
          stateSubsidy: 0,
          totalSubsidy: 78000,
          taxBenefit80AD: 0,
          netPayableCost: 117000,
          pshUsed: 4.6,
          annualGenerationKwh: 4200,
          monthlyGenerationKwh: 350,
          avoidedTariffPerUnit: 7.0,
          annualSavingsRs: 29400,
          monthlySavingsRs: 2450,
          paybackPeriodYears: 3.9,
          co2OffsetTonsPerYear: 3.3,
          equipmentBand: { minKw: 1, maxKw: 3, acdbDcdbSpec: "1P DCDB/ACDB", dcCableSpec: "4sqmm DC", acCableSpec: "2.5sqmm AC", earthingPitsCount: 2, laSpec: "Copper LA" },
          bom: [],
        },
        quotationRef: `CNT-${Date.now().toString().slice(-4)}`,
      });

      setSubmitted(true);
    } catch (err) {
      console.error("Contact lead submission failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full font-sans bg-[#FAFAFA]">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 sm:py-20 text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full inline-block">
            GET IN TOUCH WITH OUR EPC TEAM
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Contact Pragati EcoSolar</h1>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Have questions about solar EPC, PM Surya Ghar subsidies, or DISCOM net metering? Contact our engineering team today.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-8">
              {/* 1. Registered Office & Contact Cards */}
              <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Registered Office Details</h3>
                
                <div className="space-y-4 text-xs font-mono text-slate-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-900 block font-sans text-sm font-bold">Bhubaneswar Head Office</strong>
                      <span>{SITE_CONFIG.contact.address}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <strong className="text-slate-900 block font-sans text-sm font-bold">Phone Number</strong>
                      <a href={`tel:${SITE_CONFIG.contact.phoneRaw}`} className="hover:text-emerald-600">{SITE_CONFIG.contact.phone}</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <strong className="text-slate-900 block font-sans text-sm font-bold">Email Address</strong>
                      <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-emerald-600">{SITE_CONFIG.contact.email}</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <strong className="text-slate-900 block font-sans text-sm font-bold">Working Hours</strong>
                      <span>{SITE_CONFIG.contact.workingHours}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Service Coverage */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-amber-400">
                  <Zap className="w-5 h-5" />
                  <h4 className="text-sm font-bold font-mono uppercase">Odisha DISCOM Service Coverage</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Empanelled across all four Odisha DISCOM branch zones — TPCODL (Central), TPNODL (North), TPSODL (South), and TPWODL (West).
                </p>
              </div>

              {/* 5. Quick Actions */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-900">Quick Actions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                  <a
                    href="tel:+919124318222"
                    className="p-3 bg-white border border-emerald-200 rounded-xl flex items-center justify-center gap-1.5 text-slate-900 font-bold hover:bg-emerald-100 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Call Us</span>
                  </a>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=Hi%20Pragati%20EcoSolar,%20I%20want%20to%20inquire%20about%20rooftop%20solar.`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-emerald-600 text-white rounded-xl flex items-center justify-center gap-1.5 font-bold hover:bg-emerald-700 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="#contact-form"
                    className="p-3 bg-slate-900 text-amber-400 rounded-xl flex items-center justify-center gap-1.5 font-bold hover:bg-slate-800 transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Site Visit</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Form Column */}
            <div id="contact-form" className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-mono uppercase text-emerald-700 font-bold">SEND A MESSAGE</span>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">Free Consultation & Quote Request</h2>
                <p className="text-xs text-slate-600 mt-1">Fill in the complete contact form fields below to reach our engineering team.</p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                  {/* Full Name & Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 uppercase font-semibold mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        placeholder="e.g. Ramesh Chandra Swain"
                        className="w-full p-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 uppercase font-semibold mb-1">Mobile Number *</label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="e.g. 98610 12345"
                        className="w-full p-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                      />
                    </div>
                  </div>

                  {/* Email & Location/District */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 uppercase font-semibold mb-1">Email Address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="e.g. ramesh@example.com"
                        className="w-full p-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 uppercase font-semibold mb-1">Location / District *</label>
                      <input
                        type="text"
                        required
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        placeholder="e.g. Patia, Bhubaneswar (Khordha)"
                        className="w-full p-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                      />
                    </div>
                  </div>

                  {/* System Type & Consumer Category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 uppercase font-semibold mb-1">System Type Interested In</label>
                      <select
                        value={form.systemType}
                        onChange={(e) => setForm({ ...form, systemType: e.target.value })}
                        className="w-full p-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                      >
                        <option value="On-Grid">Solar EPC — On-Grid Systems</option>
                        <option value="Off-Grid">Solar EPC — Off-Grid Systems</option>
                        <option value="Hybrid">Solar EPC — Hybrid Systems</option>
                        <option value="Solar Water Pump">Solar Water Pumping Systems</option>
                        <option value="Street Lighting">Solar Street Lighting Solutions</option>
                        <option value="O&M Maintenance">O&M Maintenance / AMC</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 uppercase font-semibold mb-1">Consumer Category</label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full p-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                      >
                        <option value="Residential">Residential (PM Surya Ghar)</option>
                        <option value="Commercial">Commercial & Industrial</option>
                        <option value="Institutional">Institutional / NGO</option>
                        <option value="Agricultural">Agricultural Farmer</option>
                      </select>
                    </div>
                  </div>

                  {/* Message / Requirement */}
                  <div>
                    <label className="block text-slate-700 uppercase font-semibold mb-1">Message / Requirement</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share details about your rooftop area, monthly bill amount, or specific inquiry..."
                      className="w-full p-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white font-bold text-sm rounded-xl shadow-md transition-all font-sans"
                  >
                    {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry to Engineering Team"}
                  </button>
                </form>
              ) : (
                <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-3xl text-center space-y-4 font-sans">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                    Thank you, {form.fullName}. Our Odisha DISCOM liaison engineer will review your inquiry and get back to you within 24 hours.
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
