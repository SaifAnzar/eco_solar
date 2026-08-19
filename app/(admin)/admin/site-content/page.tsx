"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  CheckCircle2,
  FileText,
  Phone,
  MapPin,
  Award,
  Loader2,
  Eye,
  RefreshCw,
  Clock,
  Sparkles,
  Building,
  Plus,
  Trash2,
  Layers,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { getSiteSettings, updateSiteSettings } from "@/lib/actions/admin-actions";
import { showToast, scrollToTop, showConfirmDialog } from "@/lib/toast";

const DEFAULT_SETTINGS = {
  heroHeadline:
    "Odisha's Trusted Solar EPC Partner — Powering Homes & Businesses with On-Grid, Off-Grid & Hybrid Solutions",
  heroSubline:
    "Government-authorized installer under PM Surya Ghar Muft Bijli Yojana, empanelled across all four Odisha DISCOMs. From design to commissioning — we handle it all.",
  typewriterWords: [
    "On-Grid, Off-Grid & Hybrid Solutions.",
    "Powering Homes & Businesses.",
    "PM Surya Ghar Subsidy Authorized.",
    "Save Up to 90% Electricity Bills.",
  ],
  contactAddress: "HIG/42, Aryapalli, Patia, Bhubaneswar, Odisha 751024",
  contactPhone: "+91 91243 18222",
  contactEmail: "solarbee.bbsr@gmail.com",
  workingHours: "Mon – Sat: 9:30 AM – 6:30 PM",
  systemsInstalled: "500+",
  capacityDelivered: "5+ MW",
  discomZonesCovered: "4 Zones",
  epcScope: "100% EPC",
};

export default function SiteContentCmsPage() {
  const [form, setForm] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Live typewriter preview state for the side card
  const [previewWordIndex, setPreviewWordIndex] = useState(0);

  useEffect(() => {
    async function loadData() {
      const res = await getSiteSettings();
      if (res.success && res.data) {
        setForm({
          heroHeadline: res.data.heroHeadline || DEFAULT_SETTINGS.heroHeadline,
          heroSubline: res.data.heroSubline || DEFAULT_SETTINGS.heroSubline,
          typewriterWords:
            Array.isArray(res.data.typewriterWords) && res.data.typewriterWords.length > 0
              ? res.data.typewriterWords
              : DEFAULT_SETTINGS.typewriterWords,
          contactAddress: res.data.contactAddress || DEFAULT_SETTINGS.contactAddress,
          contactPhone: res.data.contactPhone || DEFAULT_SETTINGS.contactPhone,
          contactEmail: res.data.contactEmail || DEFAULT_SETTINGS.contactEmail,
          workingHours: res.data.workingHours || DEFAULT_SETTINGS.workingHours,
          systemsInstalled: res.data.systemsInstalled || DEFAULT_SETTINGS.systemsInstalled,
          capacityDelivered: res.data.capacityDelivered || DEFAULT_SETTINGS.capacityDelivered,
          discomZonesCovered: res.data.discomZonesCovered || DEFAULT_SETTINGS.discomZonesCovered,
          epcScope: res.data.epcScope || DEFAULT_SETTINGS.epcScope,
        });
      }
      setLoading(false);
    }
    loadData();
  }, []);

  // Timer to rotate the preview typewriter word on the side panel
  useEffect(() => {
    if (!form.typewriterWords || form.typewriterWords.length === 0) return;
    const interval = setInterval(() => {
      setPreviewWordIndex((prev) => (prev + 1) % form.typewriterWords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [form.typewriterWords]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    // Filter out empty typewriter entries
    const cleanedWords = form.typewriterWords.map((w) => w.trim()).filter(Boolean);
    const payload = {
      ...form,
      typewriterWords: cleanedWords.length > 0 ? cleanedWords : DEFAULT_SETTINGS.typewriterWords,
    };

    const res = await updateSiteSettings(payload);
    if (res.success) {
      scrollToTop();
      showToast("Site content & Hero settings published successfully!", "success");
      setMessage({
        text: "Site content, Hero settings & Typewriter phrases published successfully!",
        type: "success",
      });
      setTimeout(() => setMessage(null), 1500);
    } else {
      showToast(res.error || "Failed to update site settings.", "error");
      setMessage({
        text: res.error || "Error updating site settings. Please check your connection and try again.",
        type: "error",
      });
    }
    setSaving(false);
  };

  const handleResetDefaults = async () => {
    const confirmed = await showConfirmDialog(
      "Reset Defaults?",
      "Are you sure you want to reset all fields to standard Odisha EPC defaults?",
      "Yes, Reset All"
    );
    if (confirmed) {
      setForm(DEFAULT_SETTINGS);
      scrollToTop();
      showToast("Form reset to default settings.", "info");
    }
  };

  // Dynamic Typewriter List Manipulations
  const handleTypewriterWordChange = (index: number, val: string) => {
    const updated = [...form.typewriterWords];
    updated[index] = val;
    setForm({ ...form, typewriterWords: updated });
  };

  const handleAddTypewriterWord = () => {
    setForm({
      ...form,
      typewriterWords: [...form.typewriterWords, ""],
    });
    showToast("New phrase line added below.", "info");
  };

  const handleRemoveTypewriterWord = async (index: number) => {
    if (form.typewriterWords.length <= 1) {
      showToast("At least one typewriter phrase line is required.", "warning");
      return;
    }
    const confirmed = await showConfirmDialog(
      "Remove Phrase Line?",
      `Are you sure you want to delete phrase #${index + 1}?`,
      "Yes, Delete"
    );
    if (!confirmed) return;
    const updated = form.typewriterWords.filter((_, i) => i !== index);
    setForm({ ...form, typewriterWords: updated });
    showToast("Phrase line removed successfully.", "success");
  };

  const handleMoveTypewriterWord = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= form.typewriterWords.length) return;
    const updated = [...form.typewriterWords];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setForm({ ...form, typewriterWords: updated });
    showToast(`Phrase line moved ${direction}.`, "info");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] text-slate-500 font-mono text-xs space-y-3">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        <span>Fetching Module 1 Site Settings CMS...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-mono font-extrabold uppercase tracking-widest">
              MODULE 1
            </span>
            <span className="text-xs text-slate-500 font-mono">Homepage &amp; Global Content</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Site Content &amp; Hero CMS
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl">
            Configure homepage Hero Section headlines, dynamic rotating typewriter effect phrases, trust strip counter badges, registered office details, and operational contacts.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200 transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </a>
        </div>
      </div>

      {/* Alert Banner */}
      {message && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-xs font-bold shadow-sm transition-all ${
            message.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
              : "bg-rose-50 border border-rose-200 text-rose-900"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <Sparkles className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Main Grid: Form Left (7 Cols), Live Preview Right (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* EDIT FORM (LEFT COLUMN) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          
          {/* CARD 1: HERO COPY */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>1. Homepage Hero Main Copy</span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Hero Main Headline / Prefix
                </label>
                <span className="text-[10px] font-mono text-slate-400">
                  {form.heroHeadline.length} chars
                </span>
              </div>
              <input
                type="text"
                required
                value={form.heroHeadline}
                onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
                placeholder="e.g. Odisha's Trusted Solar EPC Partner — "
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm font-semibold focus:outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-inner"
              />
              <p className="text-[11px] text-slate-500 pt-1">
                This is the static headline text displayed on the homepage right before the rotating typewriter phrases.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="block text-xs font-bold text-slate-700 uppercase">
                  Hero Sub-line / Description
                </label>
                <span className="text-[10px] font-mono text-slate-400">
                  {form.heroSubline.length} chars
                </span>
              </div>
              <textarea
                rows={3}
                required
                value={form.heroSubline}
                onChange={(e) => setForm({ ...form, heroSubline: e.target.value })}
                placeholder="Key authorization notes, DISCOM empanelment details, PM Surya Ghar highlights..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs leading-relaxed focus:outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-inner"
              />
            </div>
          </div>

          {/* CARD 2: DYNAMIC TYPEWRITER PHRASES (SEPARATE INPUT BOX FOR EVERY PHRASE) */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>2. Dynamic Typewriter Effect Phrases</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {form.typewriterWords.length} Phrases Configured
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Every text line below will be animated and typed out one by one in a smooth, continuous loop on the homepage Hero headline. You can add N number of custom phrases below:
            </p>

            <div className="space-y-3 pt-1">
              {form.typewriterWords.map((word, idx) => (
                <div key={idx} className="flex items-center gap-2 group">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-mono font-bold text-slate-600 shrink-0">
                    {idx + 1}
                  </div>

                  <input
                    type="text"
                    required
                    value={word}
                    onChange={(e) => handleTypewriterWordChange(idx, e.target.value)}
                    placeholder={`e.g. Dynamic Phrase #${idx + 1}`}
                    className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
                  />

                  {/* Reorder Buttons */}
                  <div className="flex items-center gap-0.5 shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveTypewriterWord(idx, "up")}
                      title="Move Up"
                      className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === form.typewriterWords.length - 1}
                      onClick={() => handleMoveTypewriterWord(idx, "down")}
                      title="Move Down"
                      className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveTypewriterWord(idx)}
                    title="Delete Phrase Line"
                    className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-200 transition-colors shrink-0 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Phrase Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleAddTypewriterWord}
                className="w-full py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-dashed border-emerald-300 font-bold text-xs rounded-2xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Another Typewriter Phrase Line</span>
              </button>
            </div>
          </div>

          {/* CARD 3: TRUST STRIP METRICS */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
              <Award className="w-4 h-4 text-amber-600" />
              <span>3. Trust Strip Metrics &amp; Badges</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Systems Installed Counter
                </label>
                <input
                  type="text"
                  required
                  value={form.systemsInstalled}
                  onChange={(e) => setForm({ ...form, systemsInstalled: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold font-mono focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Capacity Delivered
                </label>
                <input
                  type="text"
                  required
                  value={form.capacityDelivered}
                  onChange={(e) => setForm({ ...form, capacityDelivered: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold font-mono focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  DISCOM Zones Covered
                </label>
                <input
                  type="text"
                  required
                  value={form.discomZonesCovered}
                  onChange={(e) => setForm({ ...form, discomZonesCovered: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold font-mono focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  EPC Scope Badge
                </label>
                <input
                  type="text"
                  required
                  value={form.epcScope}
                  onChange={(e) => setForm({ ...form, epcScope: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-bold font-mono focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* CARD 4: REGISTERED CONTACT DETAILS */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-3">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>4. Registered Office &amp; Contact Info</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Registered Address
                </label>
                <input
                  type="text"
                  required
                  value={form.contactAddress}
                  onChange={(e) => setForm({ ...form, contactAddress: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  required
                  value={form.contactPhone}
                  onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-mono font-bold focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  required
                  value={form.contactEmail}
                  onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-mono font-bold focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Working Hours
                </label>
                <input
                  type="text"
                  required
                  value={form.workingHours}
                  onChange={(e) => setForm({ ...form, workingHours: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs font-semibold focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs rounded-2xl shadow-lg hover:shadow-emerald-600/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save &amp; Publish Site Content</span>
            </button>
          </div>
        </form>

        {/* LIVE REAL-TIME PREVIEW (RIGHT COLUMN) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-24 space-y-6">
            
            {/* PREVIEW HEADER */}
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-emerald-600" />
                Live Homepage Preview
              </span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-bold">
                REAL-TIME REFLECTION
              </span>
            </div>

            {/* LIVE HERO PREVIEW CARD WITH CYCLING TYPEWRITER */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-emerald-500/30 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Official Solar Installer · Odisha</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-extrabold tracking-tight leading-snug text-white">
                  {form.heroHeadline.split("—")[0].trim()} —{" "}
                  <span className="text-emerald-400 underline decoration-emerald-500/50">
                    {form.typewriterWords[previewWordIndex % form.typewriterWords.length] ||
                      "Typewriter text..."}
                  </span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {form.heroSubline}
                </p>
              </div>

              {/* Typewriter phrases chips indicator */}
              <div className="pt-1 border-t border-slate-800 space-y-1.5">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                  Configured Typewriter Phrases:
                </span>
                <div className="flex flex-wrap gap-1">
                  {form.typewriterWords.map((word, i) => (
                    <span
                      key={i}
                      className={`px-2 py-0.5 text-[10px] font-mono rounded-md border transition-all ${
                        i === previewWordIndex % form.typewriterWords.length
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold"
                          : "bg-slate-800 text-slate-400 border-slate-700"
                      }`}
                    >
                      {word || `(Empty #${i + 1})`}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-1 flex items-center gap-2">
                <span className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-[10px] font-bold">
                  Check Subsidy Eligibility
                </span>
                <span className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-[10px] font-bold">
                  Get Quote
                </span>
              </div>
            </div>

            {/* LIVE TRUST BADGES PREVIEW */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" />
                Trust Strip Preview
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-lg font-extrabold text-slate-900">{form.systemsInstalled}</div>
                  <div className="text-[10px] text-slate-500 font-bold">Systems Installed</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-lg font-extrabold text-emerald-700">{form.capacityDelivered}</div>
                  <div className="text-[10px] text-slate-500 font-bold">Capacity Delivered</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-lg font-extrabold text-amber-600">{form.discomZonesCovered}</div>
                  <div className="text-[10px] text-slate-500 font-bold">DISCOM Zones</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-lg font-extrabold text-slate-900">{form.epcScope}</div>
                  <div className="text-[10px] text-slate-500 font-bold">EPC Scope</div>
                </div>
              </div>
            </div>

            {/* LIVE REGISTERED CONTACT CARD PREVIEW */}
            <div className="bg-emerald-950/90 text-emerald-100 rounded-3xl p-6 shadow-sm space-y-3 text-xs font-mono border border-emerald-900/60">
              <div className="flex items-center gap-2 text-amber-400 font-sans font-bold text-xs uppercase">
                <Building className="w-4 h-4" />
                <span>Contact Details Preview</span>
              </div>

              <div className="space-y-2 text-[11px] pt-1">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{form.contactAddress}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{form.contactPhone}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{form.workingHours}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
