"use client";

import React, { useState, useEffect } from "react";
import { Save, CheckCircle2, FileText, Phone, MapPin, Award, Loader2 } from "lucide-react";
import { getSiteSettings, updateSiteSettings } from "@/lib/actions/admin-actions";

export default function SiteContentCmsPage() {
  const [form, setForm] = useState({
    heroHeadline: "Odisha's Trusted Solar EPC Partner — Powering Homes & Businesses with On-Grid, Off-Grid & Hybrid Solutions",
    heroSubline: "Government-authorized installer under PM Surya Ghar Muft Bijli Yojana, empanelled across all four Odisha DISCOMs. From design to commissioning — we handle it all.",
    contactAddress: "HIG/42, Aryapalli, Patia, Bhubaneswar, Odisha 751024",
    contactPhone: "+91 91243 18222",
    contactEmail: "solarbee.bbsr@gmail.com",
    workingHours: "Mon – Sat: 9:30 AM – 6:30 PM",
    systemsInstalled: "500+",
    capacityDelivered: "5+ MW",
    discomZonesCovered: "4 Zones",
    epcScope: "100% EPC",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const res = await getSiteSettings();
      if (res.success && res.data) {
        setForm({
          heroHeadline: res.data.heroHeadline || "",
          heroSubline: res.data.heroSubline || "",
          contactAddress: res.data.contactAddress || "",
          contactPhone: res.data.contactPhone || "",
          contactEmail: res.data.contactEmail || "",
          workingHours: res.data.workingHours || "",
          systemsInstalled: res.data.systemsInstalled || "",
          capacityDelivered: res.data.capacityDelivered || "",
          discomZonesCovered: res.data.discomZonesCovered || "",
          epcScope: res.data.epcScope || "",
        });
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const res = await updateSiteSettings(form);
    if (res.success) {
      setMessage("Site content and settings saved & revalidated successfully!");
    } else {
      setMessage("Error updating settings. Please try again.");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-slate-500 font-mono text-xs">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-600 mr-2" />
        Loading Site Settings CMS...
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Page Header */}
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold">MODULE 1</span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">Site Content &amp; Hero CMS</h1>
        <p className="text-xs text-slate-600 mt-1">
          Manage homepage Hero copy, trust strip counter badges, registered address, phone, email, and working hours.
        </p>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* SECTION 1: HERO COPY */}
        <div className="space-y-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <FileText className="w-4 h-4 text-emerald-600" />
            <span>Homepage Hero Section Copy</span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Hero Main Headline</label>
            <input
              type="text"
              required
              value={form.heroHeadline}
              onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-semibold focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Hero Sub-line / Description</label>
            <textarea
              rows={3}
              required
              value={form.heroSubline}
              onChange={(e) => setForm({ ...form, heroSubline: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm leading-relaxed focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        {/* SECTION 2: TRUST STRIP COUNTERS */}
        <div className="space-y-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Trust Strip Metrics &amp; Badges</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Systems Installed Counter</label>
              <input
                type="text"
                required
                value={form.systemsInstalled}
                onChange={(e) => setForm({ ...form, systemsInstalled: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Capacity Delivered</label>
              <input
                type="text"
                required
                value={form.capacityDelivered}
                onChange={(e) => setForm({ ...form, capacityDelivered: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">DISCOM Zones Covered</label>
              <input
                type="text"
                required
                value={form.discomZonesCovered}
                onChange={(e) => setForm({ ...form, discomZonesCovered: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">EPC Scope Badge</label>
              <input
                type="text"
                required
                value={form.epcScope}
                onChange={(e) => setForm({ ...form, epcScope: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: REGISTERED CONTACT DETAILS */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Registered Office &amp; Contact Info</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Registered Address</label>
              <input
                type="text"
                required
                value={form.contactAddress}
                onChange={(e) => setForm({ ...form, contactAddress: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Phone</label>
              <input
                type="text"
                required
                value={form.contactPhone}
                onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Email</label>
              <input
                type="email"
                required
                value={form.contactEmail}
                onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-mono font-bold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Working Hours</label>
              <input
                type="text"
                required
                value={form.workingHours}
                onChange={(e) => setForm({ ...form, workingHours: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save &amp; Publish Site Content</span>
          </button>
        </div>
      </form>
    </div>
  );
}
