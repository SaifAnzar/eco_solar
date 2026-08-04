/**
 * File-based JSON persistence layer for the admin panel.
 * Stores leads and solar config overrides in the /data directory.
 * Works for development and low-traffic production. Swap for a DB if needed.
 */

import path from "path";
import fs from "fs";
import type { LeadSubmissionPayload } from "./actions/lead-action";
import type { EquipmentBand } from "./solar-engine";

// ─────────────────────────────────────────────────────────────────────────────
// Paths
// ─────────────────────────────────────────────────────────────────────────────
const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");
const CONFIG_FILE = path.join(DATA_DIR, "solar-config.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Lead Store
// ─────────────────────────────────────────────────────────────────────────────

export interface LeadRecord extends LeadSubmissionPayload {
  leadId: string;
  createdAt: string;
}

function readLeads(): Record<string, LeadRecord> {
  ensureDataDir();
  if (!fs.existsSync(LEADS_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(LEADS_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function writeLeads(store: Record<string, LeadRecord>) {
  ensureDataDir();
  fs.writeFileSync(LEADS_FILE, JSON.stringify(store, null, 2), "utf-8");
}

export function saveLead(leadId: string, payload: LeadSubmissionPayload): void {
  const store = readLeads();
  store[leadId] = {
    ...payload,
    leadId,
    createdAt: new Date().toISOString(),
  };
  writeLeads(store);
}

export function getAllLeads(): LeadRecord[] {
  const store = readLeads();
  return Object.values(store).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function deleteLead(leadId: string): boolean {
  const store = readLeads();
  if (!store[leadId]) return false;
  delete store[leadId];
  writeLeads(store);
  return true;
}

// ─────────────────────────────────────────────────────────────────────────────
// Solar Config Store
// ─────────────────────────────────────────────────────────────────────────────

export interface SolarConfigOverride {
  panelWp: number;
  panelUnitRate: number;
  roofAreaPerKw: number;
  residentialBenchmarkRate: number;
  commercialBenchmarkRate: number;
  gridTariffRate: number;
  defaultPsh: number;
  performanceRatio: number;
  // Subsidy tiers
  subsidyTier1Kw: number;   // e.g. 1 kW -> ₹30,000
  subsidyTier1Amount: number;
  subsidyTier2Kw: number;   // e.g. 2 kW -> ₹60,000
  subsidyTier2Amount: number;
  subsidyTier3PlusAmount: number; // 3 kW+ -> ₹78,000
  // Equipment bands
  equipmentBands: EquipmentBand[];
}

const DEFAULT_CONFIG: SolarConfigOverride = {
  panelWp: 600,
  panelUnitRate: 14033.25,
  roofAreaPerKw: 90,
  residentialBenchmarkRate: 65000,
  commercialBenchmarkRate: 55000,
  gridTariffRate: 7.0,
  defaultPsh: 4.5,
  performanceRatio: 0.78,
  subsidyTier1Kw: 1,
  subsidyTier1Amount: 30000,
  subsidyTier2Kw: 2,
  subsidyTier2Amount: 60000,
  subsidyTier3PlusAmount: 78000,
  equipmentBands: [
    {
      minKw: 1, maxKw: 3,
      acdbDcdbSpec: "1-Phase 1000V DCDB + 240V ACDB with Type-II SPD & MCB",
      dcCableSpec: "4 sq.mm Tinned Copper XLPO Solar DC Cable",
      acCableSpec: "2.5 sq.mm 2-Core Copper Armoured AC Cable",
      earthingPitsCount: 2,
      laSpec: "Conventional Pure Copper Spike Lightning Arrestor",
    },
    {
      minKw: 4, maxKw: 10,
      acdbDcdbSpec: "3-Phase 1000V DCDB (2-In/2-Out) + 415V ACDB with Type-II SPD",
      dcCableSpec: "6 sq.mm Tinned Copper XLPO Solar DC Cable",
      acCableSpec: "6 sq.mm 4-Core Copper Armoured AC Cable",
      earthingPitsCount: 3,
      laSpec: "Class-A Heavy Duty Copper Spike Lightning Arrestor",
    },
    {
      minKw: 11, maxKw: 25,
      acdbDcdbSpec: "3-Phase Multi-String DCDB + ACDB with 63A MCCB & SPD",
      dcCableSpec: "6 sq.mm Tinned Copper XLPO Solar DC Cable",
      acCableSpec: "16 sq.mm 4-Core Aluminium Armoured AC Cable",
      earthingPitsCount: 3,
      laSpec: "Early Streamer Emission (ESE) Lightning Arrestor",
    },
    {
      minKw: 26, maxKw: 50,
      acdbDcdbSpec: "Industrial Weatherproof DCDB + AC Panel with 125A MCCB",
      dcCableSpec: "10 sq.mm Tinned Copper XLPO Solar DC Cable",
      acCableSpec: "35 sq.mm 4-Core Aluminium Armoured AC Cable",
      earthingPitsCount: 4,
      laSpec: "Active ESE Lightning Arrestor with 107m Coverage Radius",
    },
    {
      minKw: 51, maxKw: 75,
      acdbDcdbSpec: "Heavy Industrial Distribution Panel with 200A MCCB & Surge Suppressor",
      dcCableSpec: "10 sq.mm Tinned Copper XLPO Solar DC Cable",
      acCableSpec: "70 sq.mm 4-Core Aluminium Armoured AC Cable",
      earthingPitsCount: 5,
      laSpec: "Active ESE Lightning Arrestor + Mast Pole",
    },
    {
      minKw: 76, maxKw: 100,
      acdbDcdbSpec: "Mega Industrial LT Distribution Panel with 250A Main MCCB",
      dcCableSpec: "10 sq.mm Tinned Copper XLPO Solar DC Cable",
      acCableSpec: "120 sq.mm 3.5-Core Aluminium Armoured Cable",
      earthingPitsCount: 6,
      laSpec: "Active ESE Dual Arrestor Array with Digital Strike Counter",
    },
  ],
};

export function getSolarConfig(): SolarConfigOverride {
  ensureDataDir();
  if (!fs.existsSync(CONFIG_FILE)) return DEFAULT_CONFIG;
  try {
    const stored = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8")) as Partial<SolarConfigOverride>;
    // Merge with defaults so new fields always have fallbacks
    return { ...DEFAULT_CONFIG, ...stored };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveSolarConfig(config: SolarConfigOverride): void {
  ensureDataDir();
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
}
