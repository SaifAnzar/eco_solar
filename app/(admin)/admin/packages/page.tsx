"use client";

import React, { useState, useEffect } from "react";
import { Package, Plus, Trash2, Edit3, CheckCircle2, X, Loader2 } from "lucide-react";
import { getSolarPackages, upsertSolarPackage, deleteSolarPackage } from "@/lib/actions/admin-actions";
import { showToast, scrollToTop, showConfirmDialog } from "@/lib/toast";

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    id: "",
    name: "",
    category: "RESIDENTIAL" as const,
    systemType: "ON_GRID" as const,
    capacityKw: 3,
    areaRequiredSqFt: 270,
    batteryCapacityKwh: 0,
    backupHours: 0,
    costBeforeSubsidy: 195000,
    govtSubsidy: 78000,
    netPrice: 117000,
    isSuryaGharEligible: true,
    status: "ACTIVE",
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    setLoading(true);
    const res = await getSolarPackages();
    if (res.success) {
      setPackages(res.data || []);
    }
    setLoading(false);
  };

  const handleOpenAddModal = () => {
    setForm({
      id: "",
      name: "3 kW Residential On-Grid Package",
      category: "RESIDENTIAL",
      systemType: "ON_GRID",
      capacityKw: 3,
      areaRequiredSqFt: 270,
      batteryCapacityKwh: 0,
      backupHours: 0,
      costBeforeSubsidy: 195000,
      govtSubsidy: 78000,
      netPrice: 117000,
      isSuryaGharEligible: true,
      status: "ACTIVE",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (pkg: any) => {
    setForm({
      id: pkg.id,
      name: pkg.name,
      category: pkg.category,
      systemType: pkg.systemType,
      capacityKw: pkg.capacityKw,
      areaRequiredSqFt: pkg.areaRequiredSqFt,
      batteryCapacityKwh: pkg.batteryCapacityKwh || 0,
      backupHours: pkg.backupHours || 0,
      costBeforeSubsidy: pkg.costBeforeSubsidy,
      govtSubsidy: pkg.govtSubsidy,
      netPrice: pkg.netPrice,
      isSuryaGharEligible: pkg.isSuryaGharEligible,
      status: pkg.status || "ACTIVE",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirmDialog(
      "Delete Solar Package?",
      "Are you sure you want to delete this package pricing option?",
      "Yes, Delete"
    );
    if (!confirmed) return;
    const res = await deleteSolarPackage(id);
    if (res.success) {
      showToast("Solar package deleted successfully!", "success");
      fetchPackages();
    } else {
      showToast(res.error || "Failed to delete package.", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await upsertSolarPackage(form);
    if (res.success) {
      setIsModalOpen(false);
      fetchPackages();
      scrollToTop();
      showToast(res.message || "Solar package saved successfully!", "success");
    } else {
      showToast(res.error || "Error saving package.", "error");
    }
    setSaving(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-blue-700 font-bold">MODULE 3</span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">Solar Packages Pricing CMS</h1>
          <p className="text-xs text-slate-600 mt-1">
            Manage On-Grid, Off-Grid, and Hybrid package prices, system capacities (kW), required roof area (sq.ft), and PM Surya Ghar subsidies.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Solar Package</span>
        </button>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Packages Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-slate-500 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
            Loading solar package catalog...
          </div>
        ) : packages.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-slate-500 space-y-3">
            <p>No solar packages created yet.</p>
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl inline-block"
            >
              Add First Package
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Package Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">System Type</th>
                  <th className="p-3.5">Capacity (kW)</th>
                  <th className="p-3.5">Area (sq.ft)</th>
                  <th className="p-3.5">Cost Before Subsidy</th>
                  <th className="p-3.5">PM Surya Subsidy</th>
                  <th className="p-3.5">Net Price</th>
                  <th className="p-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {packages.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{pkg.name}</div>
                      {pkg.isSuryaGharEligible && (
                        <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          PM Surya Ghar Eligible
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 font-bold text-slate-700">{pkg.category}</td>
                    <td className="p-3.5 font-mono text-emerald-700 font-bold">{pkg.systemType}</td>
                    <td className="p-3.5 font-mono text-slate-900 font-bold">{pkg.capacityKw} kW</td>
                    <td className="p-3.5 text-slate-600 font-mono">{pkg.areaRequiredSqFt} sq.ft</td>
                    <td className="p-3.5 text-slate-700 font-mono">₹{pkg.costBeforeSubsidy.toLocaleString("en-IN")}</td>
                    <td className="p-3.5 text-emerald-600 font-mono font-bold">₹{pkg.govtSubsidy.toLocaleString("en-IN")}</td>
                    <td className="p-3.5 text-slate-900 font-mono font-extrabold">₹{pkg.netPrice.toLocaleString("en-IN")}</td>
                    <td className="p-3.5 flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditModal(pkg)}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                        title="Edit Package"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(pkg.id)}
                        className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors"
                        title="Delete Package"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {form.id ? "Edit Solar Package" : "Add New Solar Package"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-700 font-bold uppercase mb-1">Package Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. 3 kW Residential On-Grid Package"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-sans text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-sans"
                  >
                    <option value="RESIDENTIAL">RESIDENTIAL</option>
                    <option value="COMMERCIAL_INDUSTRIAL">COMMERCIAL_INDUSTRIAL</option>
                    <option value="AGRICULTURAL">AGRICULTURAL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">System Type</label>
                  <select
                    value={form.systemType}
                    onChange={(e) => setForm({ ...form, systemType: e.target.value as any })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-sans"
                  >
                    <option value="ON_GRID">ON_GRID</option>
                    <option value="OFF_GRID">OFF_GRID</option>
                    <option value="HYBRID">HYBRID</option>
                    <option value="SOLAR_PUMP">SOLAR_PUMP</option>
                    <option value="STREET_LIGHTING">STREET_LIGHTING</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Capacity (kW)</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={form.capacityKw}
                    onChange={(e) => setForm({ ...form, capacityKw: Number(e.target.value) })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Area Req (sq.ft)</label>
                  <input
                    type="number"
                    required
                    value={form.areaRequiredSqFt}
                    onChange={(e) => setForm({ ...form, areaRequiredSqFt: Number(e.target.value) })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">PM Surya Eligible?</label>
                  <select
                    value={form.isSuryaGharEligible ? "YES" : "NO"}
                    onChange={(e) => setForm({ ...form, isSuryaGharEligible: e.target.value === "YES" })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-sans"
                  >
                    <option value="YES">YES</option>
                    <option value="NO">NO</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Gross Cost (₹)</label>
                  <input
                    type="number"
                    required
                    value={form.costBeforeSubsidy}
                    onChange={(e) => {
                      const cost = Number(e.target.value);
                      setForm({
                        ...form,
                        costBeforeSubsidy: cost,
                        netPrice: Math.max(0, cost - form.govtSubsidy),
                      });
                    }}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Govt Subsidy (₹)</label>
                  <input
                    type="number"
                    required
                    value={form.govtSubsidy}
                    onChange={(e) => {
                      const sub = Number(e.target.value);
                      setForm({
                        ...form,
                        govtSubsidy: sub,
                        netPrice: Math.max(0, form.costBeforeSubsidy - sub),
                      });
                    }}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Net Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={form.netPrice}
                    onChange={(e) => setForm({ ...form, netPrice: Number(e.target.value) })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Save Solar Package</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
