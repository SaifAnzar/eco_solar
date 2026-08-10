"use client";

import { useActionState, useState, useTransition } from "react";
import { saveSolarConfigAction } from "@/lib/actions/admin-action";
import type { SolarConfigOverride } from "@/lib/data-store";
import type { EquipmentBand } from "@/lib/solar-engine";

interface Props {
  initialConfig: SolarConfigOverride;
}

export function CalculatorConfigEditor({ initialConfig }: Props) {
  const [state, formAction] = useActionState(saveSolarConfigAction, { success: false, message: "" });
  const [bands, setBands] = useState<EquipmentBand[]>(initialConfig.equipmentBands);
  const [isPending, startTransition] = useTransition();

  const handleBandChange = (
    idx: number,
    field: keyof EquipmentBand,
    value: string | number
  ) => {
    setBands((prev) =>
      prev.map((b, i) =>
        i === idx ? { ...b, [field]: typeof b[field] === "number" ? Number(value) : value } : b
      )
    );
  };

  const handleAddBand = () => {
    const last = bands[bands.length - 1];
    setBands((prev) => [
      ...prev,
      {
        minKw: last ? last.maxKw + 1 : 1,
        maxKw: last ? last.maxKw + 10 : 10,
        acdbDcdbSpec: "",
        dcCableSpec: "",
        acCableSpec: "",
        earthingPitsCount: 2,
        laSpec: "",
      },
    ]);
  };

  const handleRemoveBand = (idx: number) => {
    if (bands.length <= 1) return;
    setBands((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.set("equipmentBands", JSON.stringify(bands));
    startTransition(() => {
      formAction(fd);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {state.message && (
        <div
          className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-2 shadow-sm ${
            state.success
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          {state.message}
        </div>
      )}

      {/* ─── Section 1: Panel & Pricing ─── */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-mono font-bold">
            01
          </span>
          <span>Panel &amp; Pricing Parameters</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CfgField
            name="panelWp"
            label="Panel Capacity"
            hint="Wp per panel"
            defaultValue={initialConfig.panelWp}
            step="1"
            min="100"
            max="1000"
          />
          <CfgField
            name="panelUnitRate"
            label="Panel Unit Rate"
            hint="₹ per panel (incl. GST & margin)"
            defaultValue={initialConfig.panelUnitRate}
            step="0.01"
            min="1000"
          />
          <CfgField
            name="roofAreaPerKw"
            label="Roof Area per kW"
            hint="sq.ft required per kW"
            defaultValue={initialConfig.roofAreaPerKw}
            step="1"
            min="50"
          />
          <CfgField
            name="residentialBenchmarkRate"
            label="Residential Benchmark Rate"
            hint="₹ per kW (≤ 10 kW systems)"
            defaultValue={initialConfig.residentialBenchmarkRate}
            step="100"
            min="10000"
          />
          <CfgField
            name="commercialBenchmarkRate"
            label="Commercial Benchmark Rate"
            hint="₹ per kW (> 10 kW systems)"
            defaultValue={initialConfig.commercialBenchmarkRate}
            step="100"
            min="10000"
          />
          <CfgField
            name="gridTariffRate"
            label="Grid Tariff Rate"
            hint="₹ per unit (kWh) — Odisha"
            defaultValue={initialConfig.gridTariffRate}
            step="0.1"
            min="1"
          />
        </div>
      </section>

      {/* ─── Section 2: Generation Parameters ─── */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-mono font-bold">
            02
          </span>
          <span>Generation Parameters</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <CfgField
            name="defaultPsh"
            label="Default Peak Sun Hours"
            hint="hrs/day when pincode is unknown"
            defaultValue={initialConfig.defaultPsh}
            step="0.1"
            min="2"
            max="7"
          />
          <CfgField
            name="performanceRatio"
            label="Performance Ratio"
            hint="System efficiency factor (0.0 – 1.0)"
            defaultValue={initialConfig.performanceRatio}
            step="0.01"
            min="0.5"
            max="1.0"
          />
        </div>
      </section>

      {/* ─── Section 3A: Central Govt Subsidy (PM Surya Ghar) ─── */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-mono font-bold">
            03A
          </span>
          <span>Central Govt Subsidy Tiers (PM Surya Ghar)</span>
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Central Government subsidy tiers for residential rooftop solar systems (≤ 10 kW).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CfgField name="subsidyTier1Kw" label="Tier 1 — Max kW" hint="e.g. 1 kW" defaultValue={initialConfig.subsidyTier1Kw} step="1" min="1" />
          <CfgField name="subsidyTier1Amount" label="Tier 1 — Central Subsidy (₹)" hint="e.g. 30000" defaultValue={initialConfig.subsidyTier1Amount} step="500" min="0" />
          <CfgField name="subsidyTier2Kw" label="Tier 2 — Max kW" hint="e.g. 2 kW" defaultValue={initialConfig.subsidyTier2Kw} step="1" min="1" />
          <CfgField name="subsidyTier2Amount" label="Tier 2 — Central Subsidy (₹)" hint="e.g. 60000" defaultValue={initialConfig.subsidyTier2Amount} step="500" min="0" />
          <CfgField name="subsidyTier3PlusAmount" label="Tier 3+ — Central Subsidy (₹)" hint="Flat central cap for 3kW+ residential" defaultValue={initialConfig.subsidyTier3PlusAmount} step="500" min="0" />
        </div>
      </section>

      {/* ─── Section 3B: State Govt Subsidy Top-Up ─── */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <h2 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-mono font-bold">
            03B
          </span>
          <span>State Govt Subsidy Tiers (Odisha Top-Up)</span>
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          State Government top-up subsidy tiers for residential rooftop solar systems (≤ 10 kW).
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CfgField name="stateSubsidyTier1Kw" label="Tier 1 — Max kW" hint="e.g. 1 kW" defaultValue={initialConfig.stateSubsidyTier1Kw ?? 1} step="1" min="1" />
          <CfgField name="stateSubsidyTier1Amount" label="Tier 1 — State Subsidy (₹)" hint="e.g. 20000" defaultValue={initialConfig.stateSubsidyTier1Amount ?? 20000} step="500" min="0" />
          <CfgField name="stateSubsidyTier2Kw" label="Tier 2 — Max kW" hint="e.g. 2 kW" defaultValue={initialConfig.stateSubsidyTier2Kw ?? 2} step="1" min="1" />
          <CfgField name="stateSubsidyTier2Amount" label="Tier 2 — State Subsidy (₹)" hint="e.g. 40000" defaultValue={initialConfig.stateSubsidyTier2Amount ?? 40000} step="500" min="0" />
          <CfgField name="stateSubsidyTier3PlusAmount" label="Tier 3+ — State Subsidy (₹)" hint="Flat state cap for 3kW+ residential" defaultValue={initialConfig.stateSubsidyTier3PlusAmount ?? 60000} step="500" min="0" />
        </div>
      </section>

      {/* ─── Section 4: Equipment Bands ─── */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-mono font-bold">
              04
            </span>
            <span>Equipment Bands</span>
          </h2>
          <button
            type="button"
            onClick={handleAddBand}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            + Add Band
          </button>
        </div>
        <p className="text-xs text-slate-500 font-medium">
          Define DCDB/ACDB specs, cable types, earthing pit count, and lightning arrestor spec for each kW range.
        </p>

        <div className="space-y-4">
          {bands.map((band, idx) => (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-extrabold uppercase text-amber-700">
                  Band {idx + 1}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {band.minKw} – {band.maxKw} kW
                  </span>
                  {bands.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveBand(idx)}
                      className="p-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors border border-rose-200 text-xs font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <BandField label="Min kW" value={band.minKw} onChange={(v) => handleBandChange(idx, "minKw", v)} type="number" />
                <BandField label="Max kW" value={band.maxKw} onChange={(v) => handleBandChange(idx, "maxKw", v)} type="number" />
                <BandField label="Earthing Pits" value={band.earthingPitsCount} onChange={(v) => handleBandChange(idx, "earthingPitsCount", v)} type="number" />
                <div className="sm:col-span-3">
                  <BandField label="DCDB + ACDB Spec" value={band.acdbDcdbSpec} onChange={(v) => handleBandChange(idx, "acdbDcdbSpec", v)} type="text" />
                </div>
                <BandField label="DC Cable Spec" value={band.dcCableSpec} onChange={(v) => handleBandChange(idx, "dcCableSpec", v)} type="text" />
                <BandField label="AC Cable Spec" value={band.acCableSpec} onChange={(v) => handleBandChange(idx, "acCableSpec", v)} type="text" />
                <div className="sm:col-span-3">
                  <BandField label="Lightning Arrestor Spec" value={band.laSpec} onChange={(v) => handleBandChange(idx, "laSpec", v)} type="text" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
        >
          <span>{isPending ? "Saving..." : "💾 Save Configuration"}</span>
        </button>
      </div>
    </form>
  );
}

function CfgField({
  name, label, hint, defaultValue, step, min, max,
}: {
  name: string;
  label: string;
  hint: string;
  defaultValue: number;
  step?: string;
  min?: string;
  max?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={`cfg-${name}`} className="text-xs font-bold text-slate-700 uppercase tracking-wide">
        {label}
      </label>
      <input
        id={`cfg-${name}`}
        name={name}
        type="number"
        step={step ?? "any"}
        min={min}
        max={max}
        defaultValue={defaultValue}
        required
        className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono text-xs font-bold focus:outline-none focus:border-emerald-600 focus:bg-white transition-all"
      />
      <span className="text-[11px] text-slate-500 font-medium">{hint}</span>
    </div>
  );
}

function BandField({
  label, value, onChange, type,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type: "text" | "number";
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 font-mono text-xs font-bold focus:outline-none focus:border-emerald-600 transition-all"
      />
    </div>
  );
}
