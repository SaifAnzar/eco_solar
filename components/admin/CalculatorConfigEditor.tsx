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
    <form onSubmit={handleSubmit}>
      {state.message && (
        <div className={state.success ? "admin-success-banner" : "admin-error-banner"}>
          {state.success ? (
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
          )}
          {state.message}
        </div>
      )}

      {/* ─── Section 1: Panel & Pricing ─── */}
      <section className="cfg-section">
        <h2 className="cfg-section-title">
          <span className="cfg-section-num">01</span>
          Panel & Pricing Parameters
        </h2>
        <div className="cfg-grid">
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
      <section className="cfg-section">
        <h2 className="cfg-section-title">
          <span className="cfg-section-num">02</span>
          Generation Parameters
        </h2>
        <div className="cfg-grid">
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
      <section className="cfg-section">
        <h2 className="cfg-section-title">
          <span className="cfg-section-num">03A</span>
          Central Govt Subsidy Tiers (PM Surya Ghar)
        </h2>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "1rem" }}>
          Central Government subsidy tiers for residential rooftop solar systems (≤ 10 kW).
        </p>
        <div className="cfg-grid">
          <CfgField name="subsidyTier1Kw" label="Tier 1 — Max kW" hint="e.g. 1 kW" defaultValue={initialConfig.subsidyTier1Kw} step="1" min="1" />
          <CfgField name="subsidyTier1Amount" label="Tier 1 — Central Subsidy (₹)" hint="e.g. 30000" defaultValue={initialConfig.subsidyTier1Amount} step="500" min="0" />
          <CfgField name="subsidyTier2Kw" label="Tier 2 — Max kW" hint="e.g. 2 kW" defaultValue={initialConfig.subsidyTier2Kw} step="1" min="1" />
          <CfgField name="subsidyTier2Amount" label="Tier 2 — Central Subsidy (₹)" hint="e.g. 60000" defaultValue={initialConfig.subsidyTier2Amount} step="500" min="0" />
          <CfgField name="subsidyTier3PlusAmount" label="Tier 3+ — Central Subsidy (₹)" hint="Flat central cap for 3kW+ residential" defaultValue={initialConfig.subsidyTier3PlusAmount} step="500" min="0" />
        </div>
      </section>

      {/* ─── Section 3B: State Govt Subsidy Top-Up ─── */}
      <section className="cfg-section">
        <h2 className="cfg-section-title">
          <span className="cfg-section-num" style={{ background: "rgba(16,185,129,0.15)", color: "#10B981" }}>03B</span>
          State Govt Subsidy Tiers (Odisha Top-Up)
        </h2>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "1rem" }}>
          State Government top-up subsidy tiers for residential rooftop solar systems (≤ 10 kW).
        </p>
        <div className="cfg-grid">
          <CfgField name="stateSubsidyTier1Kw" label="Tier 1 — Max kW" hint="e.g. 1 kW" defaultValue={initialConfig.stateSubsidyTier1Kw ?? 1} step="1" min="1" />
          <CfgField name="stateSubsidyTier1Amount" label="Tier 1 — State Subsidy (₹)" hint="e.g. 20000" defaultValue={initialConfig.stateSubsidyTier1Amount ?? 20000} step="500" min="0" />
          <CfgField name="stateSubsidyTier2Kw" label="Tier 2 — Max kW" hint="e.g. 2 kW" defaultValue={initialConfig.stateSubsidyTier2Kw ?? 2} step="1" min="1" />
          <CfgField name="stateSubsidyTier2Amount" label="Tier 2 — State Subsidy (₹)" hint="e.g. 40000" defaultValue={initialConfig.stateSubsidyTier2Amount ?? 40000} step="500" min="0" />
          <CfgField name="stateSubsidyTier3PlusAmount" label="Tier 3+ — State Subsidy (₹)" hint="Flat state cap for 3kW+ residential" defaultValue={initialConfig.stateSubsidyTier3PlusAmount ?? 60000} step="500" min="0" />
        </div>
      </section>

      {/* ─── Section 4: Equipment Bands ─── */}
      <section className="cfg-section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 className="cfg-section-title" style={{ margin: 0 }}>
            <span className="cfg-section-num">04</span>
            Equipment Bands
          </h2>
          <button
            type="button"
            onClick={handleAddBand}
            className="admin-btn"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", padding: "0.4rem 0.875rem" }}
          >
            + Add Band
          </button>
        </div>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "1.25rem" }}>
          Define DCDB/ACDB specs, cable types, earthing pit count, and lightning arrestor spec for each kW range.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {bands.map((band, idx) => (
            <div key={idx} className="band-card">
              <div className="band-header">
                <span className="band-label">Band {idx + 1}</span>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
                    {band.minKw}–{band.maxKw} kW
                  </span>
                  {bands.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveBand(idx)}
                      style={{ background: "none", border: "none", color: "rgba(239,68,68,0.5)", cursor: "pointer", padding: "0.15rem", fontSize: "0.8rem" }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
              <div className="band-grid">
                <BandField label="Min kW" value={band.minKw} onChange={(v) => handleBandChange(idx, "minKw", v)} type="number" />
                <BandField label="Max kW" value={band.maxKw} onChange={(v) => handleBandChange(idx, "maxKw", v)} type="number" />
                <BandField label="Earthing Pits" value={band.earthingPitsCount} onChange={(v) => handleBandChange(idx, "earthingPitsCount", v)} type="number" />
                <div style={{ gridColumn: "1 / -1" }}>
                  <BandField label="DCDB + ACDB Spec" value={band.acdbDcdbSpec} onChange={(v) => handleBandChange(idx, "acdbDcdbSpec", v)} type="text" />
                </div>
                <BandField label="DC Cable Spec" value={band.dcCableSpec} onChange={(v) => handleBandChange(idx, "dcCableSpec", v)} type="text" />
                <BandField label="AC Cable Spec" value={band.acCableSpec} onChange={(v) => handleBandChange(idx, "acCableSpec", v)} type="text" />
                <div style={{ gridColumn: "1 / -1" }}>
                  <BandField label="Lightning Arrestor Spec" value={band.laSpec} onChange={(v) => handleBandChange(idx, "laSpec", v)} type="text" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Save Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2rem" }}>
        <button
          type="submit"
          disabled={isPending}
          className="admin-btn admin-btn-primary"
          style={{ padding: "0.75rem 2rem", fontSize: "1rem" }}
        >
          {isPending ? (
            <><span className="admin-spinner-sm" style={{ borderTopColor: "#0A0F1E" }} /> Saving…</>
          ) : (
            "💾 Save Configuration"
          )}
        </button>
      </div>

      <style>{`
        .cfg-section {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .cfg-section-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
          color: #F9FAFB;
          margin: 0 0 1.25rem;
        }
        .cfg-section-num {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 6px;
          background: rgba(245,158,11,0.15);
          color: #F59E0B;
          font-size: 0.7rem;
          font-weight: 700;
          font-family: var(--font-mono, monospace);
          flex-shrink: 0;
        }
        .cfg-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1rem;
        }
        .cfg-field { display: flex; flex-direction: column; gap: 0.35rem; }
        .cfg-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.03em;
        }
        .cfg-hint {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.25);
          margin-top: 0.2rem;
        }
        .cfg-input {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 0.6rem 0.875rem;
          color: #F9FAFB;
          font-size: 0.9rem;
          font-family: var(--font-mono, monospace);
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
          box-sizing: border-box;
        }
        .cfg-input:focus { border-color: #F59E0B; box-shadow: 0 0 0 2px rgba(245,158,11,0.1); }
        .band-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          padding: 1rem;
        }
        .band-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.875rem;
        }
        .band-label {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #F59E0B;
        }
        .band-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.75rem;
        }

        /* ─── Light Mode Theme Overrides ─── */
        html:not(.dark) .cfg-section {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        html:not(.dark) .cfg-section-title {
          color: #0F172A;
        }
        html:not(.dark) .cfg-label {
          color: #475569;
        }
        html:not(.dark) .cfg-hint {
          color: #94A3B8;
        }
        html:not(.dark) .cfg-input {
          background: #F8FAFC;
          border: 1px solid #CBD5E1;
          color: #0F172A;
        }
        html:not(.dark) .cfg-input:focus {
          background: #FFFFFF;
          border-color: #F59E0B;
          box-shadow: 0 0 0 2px rgba(245,158,11,0.15);
        }
        html:not(.dark) .band-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
        }
        html:not(.dark) .band-label {
          color: #D97706;
        }
      `}</style>
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
    <div className="cfg-field">
      <label htmlFor={`cfg-${name}`} className="cfg-label">{label}</label>
      <input
        id={`cfg-${name}`}
        name={name}
        type="number"
        step={step ?? "any"}
        min={min}
        max={max}
        defaultValue={defaultValue}
        required
        className="cfg-input"
      />
      <span className="cfg-hint">{hint}</span>
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
    <div className="cfg-field">
      <label className="cfg-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cfg-input"
        style={{ fontFamily: type === "number" ? "var(--font-mono, monospace)" : "inherit" }}
      />
    </div>
  );
}
