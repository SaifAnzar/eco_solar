"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Save,
  RotateCcw,
  Zap,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Coins,
  Layers,
} from "lucide-react";
import { DEFAULT_ODISHA_TARIFF, TariffConfigData, TariffSlab } from "@/lib/solar-calculations";
import { showToast, scrollToTop, showConfirmDialog } from "@/lib/toast";

export function TariffConfigEditor() {
  const [tariff, setTariff] = useState<TariffConfigData>(DEFAULT_ODISHA_TARIFF);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch initial tariff config from /api/admin/tariff
  useEffect(() => {
    fetchTariffConfig();
  }, []);

  const fetchTariffConfig = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/tariff");
      const data = await res.json();
      if (data.success && data.tariff) {
        setTariff(data.tariff);
      } else {
        setTariff(DEFAULT_ODISHA_TARIFF);
      }
    } catch (err) {
      console.error("Failed to fetch tariff config:", err);
      setTariff(DEFAULT_ODISHA_TARIFF);
    } finally {
      setLoading(false);
    }
  };

  const handleSlabChange = (index: number, field: "upto" | "rate", value: string) => {
    const updatedSlabs = [...tariff.slabs];
    if (field === "upto") {
      const parsed = value === "" || value === "null" || value === "Unlimited" ? null : parseFloat(value);
      updatedSlabs[index] = { ...updatedSlabs[index], upto: isNaN(parsed as any) ? null : parsed };
    } else {
      const parsed = parseFloat(value);
      updatedSlabs[index] = { ...updatedSlabs[index], rate: isNaN(parsed) ? 0 : parsed };
    }
    setTariff({ ...tariff, slabs: updatedSlabs });
  };

  const handleAddSlab = () => {
    const lastSlab = tariff.slabs[tariff.slabs.length - 1];
    const newLimit = lastSlab && lastSlab.upto !== null ? lastSlab.upto + 100 : 500;
    const newRate = lastSlab ? Number((lastSlab.rate + 0.5).toFixed(2)) : 6.5;

    // Insert before the last unlimited slab if it exists
    if (lastSlab && lastSlab.upto === null) {
      const slabsWithoutLast = tariff.slabs.slice(0, -1);
      const newSlabs = [
        ...slabsWithoutLast,
        { upto: newLimit, rate: lastSlab.rate },
        { upto: null, rate: newRate },
      ];
      setTariff({ ...tariff, slabs: newSlabs });
    } else {
      setTariff({
        ...tariff,
        slabs: [...tariff.slabs, { upto: newLimit, rate: newRate }],
      });
    }
  };

  const handleRemoveSlab = (index: number) => {
    if (tariff.slabs.length <= 1) {
      setStatusMessage({ type: "error", text: "At least one tariff slab must remain." });
      return;
    }
    const updated = tariff.slabs.filter((_, i) => i !== index);
    setTariff({ ...tariff, slabs: updated });
  };

  const handleResetDefaults = async () => {
    const confirmed = await showConfirmDialog(
      "Reset Tariff Defaults?",
      "Are you sure you want to reset all OERC tariff slabs to standard Odisha defaults?",
      "Yes, Reset"
    );
    if (confirmed) {
      setTariff(DEFAULT_ODISHA_TARIFF);
      scrollToTop();
      showToast("Reset to default Odisha 2026-27 OERC rates.", "info");
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/admin/tariff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tariff),
      });

      const data = await res.json();
      setSaving(false);

      if (res.ok && data.success) {
        setTariff(data.tariff);
        scrollToTop();
        showToast("Tariff configuration saved successfully!", "success");
        setStatusMessage({ type: "success", text: "Tariff configuration saved successfully!" });
      } else {
        showToast(data.error || "Failed to save tariff settings.", "error");
        setStatusMessage({ type: "error", text: data.error || "Failed to save tariff settings." });
      }
    } catch (err: any) {
      setSaving(false);
      showToast(err.message || "Network error while saving.", "error");
      setStatusMessage({ type: "error", text: err.message || "Network error while saving." });
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center gap-3 text-slate-600">
        <Loader2 className="w-5 h-5 animate-spin text-amber-500" />
        <span className="text-sm font-medium">Loading OERC Tariff Configuration...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 font-sans">
      
      {/* Toast Notification Banner */}
      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between shadow-sm animate-in fade-in duration-200 ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>
      )}

      {/* 1. Dynamic Tariff Slabs Editor Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Electricity Consumption Slabs (Odisha OERC)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Define consumption unit brackets and per-unit billing rates (₹/unit).
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddSlab}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Slab Row</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-700 font-mono text-[11px] uppercase border-b border-slate-200">
                <th className="py-3 px-4 font-bold">Slab #</th>
                <th className="py-3 px-4 font-bold">Upper Limit (Units)</th>
                <th className="py-3 px-4 font-bold">Rate (₹ / Unit)</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {tariff.slabs.map((slab, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4 text-slate-500 font-mono font-bold">
                    Slab {idx + 1}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2 max-w-[200px]">
                      <input
                        type="text"
                        value={slab.upto === null ? "Unlimited" : slab.upto}
                        onChange={(e) => handleSlabChange(idx, "upto", e.target.value)}
                        placeholder="e.g. 50 or Unlimited"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono font-semibold"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 max-w-[160px]">
                      <span className="text-slate-400 font-mono">₹</span>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={slab.rate}
                        onChange={(e) => handleSlabChange(idx, "rate", e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono font-semibold"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemoveSlab(idx)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remove Slab"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Additional Tariff Parameters (Duty, Fixed Charge, Base Price, Subsidy Cap) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Coins className="w-4 h-4 text-emerald-600" />
            <span>Electricity Duty, Fixed Charges & System Pricing</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure state tax rates, demand charges, and default solar project pricing caps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Duty Rate */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Electricity Duty (%)
            </label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={Number((tariff.dutyRate * 100).toFixed(1))}
                onChange={(e) =>
                  setTariff({
                    ...tariff,
                    dutyRate: (parseFloat(e.target.value) || 0) / 100,
                  })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
              />
              <span className="text-xs text-slate-500 font-mono">%</span>
            </div>
            <span className="text-[10px] text-slate-400 block">State electricity tax (6%)</span>
          </div>

          {/* Fixed Rate per kW */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Fixed Charge (₹ / kW)
            </label>
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-400 font-mono">₹</span>
              <input
                type="number"
                step="1"
                min="0"
                value={tariff.fixedRatePerKw}
                onChange={(e) =>
                  setTariff({
                    ...tariff,
                    fixedRatePerKw: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
              />
            </div>
            <span className="text-[10px] text-slate-400 block">Monthly fixed demand charge</span>
          </div>

          {/* Base Price per kW */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Base Price (₹ / kW)
            </label>
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-400 font-mono">₹</span>
              <input
                type="number"
                step="1000"
                min="0"
                value={tariff.basePricePerKw}
                onChange={(e) =>
                  setTariff({
                    ...tariff,
                    basePricePerKw: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
              />
            </div>
            <span className="text-[10px] text-slate-400 block">System cost before subsidy (₹75,000)</span>
          </div>

          {/* Subsidy Cap */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              Max Subsidy Cap (₹)
            </label>
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-400 font-mono">₹</span>
              <input
                type="number"
                step="1000"
                min="0"
                value={tariff.subsidyCap}
                onChange={(e) =>
                  setTariff({
                    ...tariff,
                    subsidyCap: parseFloat(e.target.value) || 0,
                  })
                }
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
              />
            </div>
            <span className="text-[10px] text-slate-400 block">PM Surya Ghar max limit (₹78,000)</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={handleResetDefaults}
          className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reset to Odisha Defaults</span>
        </button>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Changes...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Tariff Changes</span>
            </>
          )}
        </button>
      </div>

    </form>
  );
}
