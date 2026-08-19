"use client";

import React, { useState, useEffect } from "react";
import { Award, Save, CheckCircle2, FileText, Loader2 } from "lucide-react";
import { getSchemeAndService, upsertSchemeAndService } from "@/lib/actions/admin-actions";
import { showToast, scrollToTop } from "@/lib/toast";

export default function AdminServicesSchemesPage() {
  const [activeSection, setActiveSection] = useState("services_intro");

  const [form, setForm] = useState({
    title: "Solar EPC Engineering Services",
    content: "Pragati EcoSolar delivers end-to-end solar EPC solutions across Odisha, empanelled under TPCODL, TPNODL, TPSODL, and TPWODL.",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const sections = [
    { key: "services_intro", label: "Services Overview Intro" },
    { key: "pm_surya_ghar_info", label: "PM Surya Ghar Scheme Rules" },
    { key: "net_metering_info", label: "Odisha Net Metering Process" },
    { key: "om_info", label: "O&M Maintenance Terms" },
  ];

  useEffect(() => {
    loadSectionData(activeSection);
  }, [activeSection]);

  const loadSectionData = async (key: string) => {
    setLoading(true);
    setMessage(null);
    const res = await getSchemeAndService(key);
    if (res.success && res.data) {
      setForm({
        title: res.data.title || "",
        content: res.data.content || "",
      });
    } else {
      if (key === "services_intro") {
        setForm({
          title: "Solar EPC Engineering Services in Odisha",
          content: "Comprehensive vendor-agnostic EPC services covering design, procurement, DISCOM approvals, net metering, and installation.",
        });
      } else if (key === "pm_surya_ghar_info") {
        setForm({
          title: "PM Surya Ghar Muft Bijli Yojana Central Subsidy Guide",
          content: "Government solar subsidy rates: ₹30,000 for 1 kW, ₹60,000 for 2 kW, and ₹78,000 max subsidy for 3 kW and above directly credited to beneficiary bank account.",
        });
      } else {
        setForm({
          title: "Odisha DISCOM Net Metering Guidelines",
          content: "15-day guaranteed net meter testing and commissioning across TPCODL, TPNODL, TPSODL, and TPWODL utility zones.",
        });
      }
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const res = await upsertSchemeAndService(activeSection, form.title, form.content);
    if (res.success) {
      const sectionLabel = sections.find((s) => s.key === activeSection)?.label || "Section";
      scrollToTop();
      showToast(`"${sectionLabel}" updated successfully!`, "success");
      setMessage(`"${sectionLabel}" content updated successfully!`);
    } else {
      showToast(res.error || "Error updating section.", "error");
      setMessage("Error updating section.");
    }
    setSaving(false);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-rose-700 font-bold">MODULE 5</span>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">Services &amp; Schemes CMS</h1>
        <p className="text-xs text-slate-600 mt-1">
          Manage service descriptions, PM Surya Ghar subsidy rules, net metering steps, and O&amp;M maintenance terms.
        </p>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeSection === s.key
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Form Container */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-slate-500 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
            Loading section text...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Section Heading / Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-bold focus:outline-none focus:border-emerald-600 font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Section Content Text</label>
              <textarea
                rows={8}
                required
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs leading-relaxed focus:outline-none focus:border-emerald-600 font-mono"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Section Copy</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
