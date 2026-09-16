/**
 * PostgreSQL Database persistence layer for Pragati EcoSolar.
 * Uses Prisma ORM to persist all leads, partner applications, contact inquiries,
 * approved partners, eligibility leads, and solar engine configuration directly
 * in PostgreSQL for 100% data preservation across Hostinger VPS deployments.
 */

import prisma from "@/lib/prisma";
import type { LeadSubmissionPayload } from "./actions/lead-action";
import type { EquipmentBand } from "./solar-engine";

// ─────────────────────────────────────────────────────────────────────────────
// Solar Config Types & Defaults
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
  // Central Subsidy tiers (PM Surya Ghar)
  subsidyTier1Kw: number;
  subsidyTier1Amount: number;
  subsidyTier2Kw: number;
  subsidyTier2Amount: number;
  subsidyTier3PlusAmount: number;
  // Odisha State Subsidy tiers
  stateSubsidyTier1Kw: number;
  stateSubsidyTier1Amount: number;
  stateSubsidyTier2Kw: number;
  stateSubsidyTier2Amount: number;
  stateSubsidyTier3PlusAmount: number;
  // Equipment bands
  equipmentBands: EquipmentBand[];
}

export const DEFAULT_CONFIG: SolarConfigOverride = {
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
  stateSubsidyTier1Kw: 1,
  stateSubsidyTier1Amount: 20000,
  stateSubsidyTier2Kw: 2,
  stateSubsidyTier2Amount: 40000,
  stateSubsidyTier3PlusAmount: 60000,
  equipmentBands: [
    {
      minKw: 1,
      maxKw: 3,
      acdbDcdbSpec: "1-Phase 1000V DCDB + 240V ACDB with Type-II SPD & MCB",
      dcCableSpec: "4 sq.mm Tinned Copper XLPO Solar DC Cable",
      acCableSpec: "2.5 sq.mm 2-Core Copper Armoured AC Cable",
      earthingPitsCount: 2,
      laSpec: "Conventional Pure Copper Spike Lightning Arrestor",
    },
    {
      minKw: 4,
      maxKw: 10,
      acdbDcdbSpec: "3-Phase 1000V DCDB (2-In/2-Out) + 415V ACDB with Type-II SPD",
      dcCableSpec: "6 sq.mm Tinned Copper XLPO Solar DC Cable",
      acCableSpec: "6 sq.mm 4-Core Copper Armoured AC Cable",
      earthingPitsCount: 3,
      laSpec: "Class-A Heavy Duty Copper Spike Lightning Arrestor",
    },
    {
      minKw: 11,
      maxKw: 25,
      acdbDcdbSpec: "3-Phase Multi-String DCDB + ACDB with 63A MCCB & SPD",
      dcCableSpec: "6 sq.mm Tinned Copper XLPO Solar DC Cable",
      acCableSpec: "16 sq.mm 4-Core Aluminium Armoured AC Cable",
      earthingPitsCount: 3,
      laSpec: "Early Streamer Emission (ESE) Lightning Arrestor",
    },
    {
      minKw: 26,
      maxKw: 50,
      acdbDcdbSpec: "Industrial Weatherproof DCDB + AC Panel with 125A MCCB",
      dcCableSpec: "10 sq.mm Tinned Copper XLPO Solar DC Cable",
      acCableSpec: "35 sq.mm 4-Core Aluminium Armoured AC Cable",
      earthingPitsCount: 4,
      laSpec: "Active ESE Lightning Arrestor with 107m Coverage Radius",
    },
    {
      minKw: 51,
      maxKw: 75,
      acdbDcdbSpec: "Heavy Industrial Distribution Panel with 200A MCCB & Surge Suppressor",
      dcCableSpec: "10 sq.mm Tinned Copper XLPO Solar DC Cable",
      acCableSpec: "70 sq.mm 4-Core Aluminium Armoured AC Cable",
      earthingPitsCount: 5,
      laSpec: "Active ESE Lightning Arrestor + Mast Pole",
    },
    {
      minKw: 76,
      maxKw: 100,
      acdbDcdbSpec: "Mega Industrial LT Distribution Panel with 250A Main MCCB",
      dcCableSpec: "10 sq.mm Tinned Copper XLPO Solar DC Cable",
      acCableSpec: "120 sq.mm 3.5-Core Aluminium Armoured Cable",
      earthingPitsCount: 6,
      laSpec: "Active ESE Dual Arrestor Array with Digital Strike Counter",
    },
  ],
};

// In-memory cache for synchronous operations (refreshed automatically)
let cachedSolarConfig: SolarConfigOverride = { ...DEFAULT_CONFIG };

// ─────────────────────────────────────────────────────────────────────────────
// 1. Solar Configuration Database Store
// ─────────────────────────────────────────────────────────────────────────────

export async function getSolarConfigAsync(): Promise<SolarConfigOverride> {
  try {
    const db = prisma as any;
    if (db?.solarConfig) {
      const dbConfig = await db.solarConfig.findUnique({
        where: { id: "default" },
      });
      if (dbConfig) {
        cachedSolarConfig = {
          panelWp: dbConfig.panelWp ?? DEFAULT_CONFIG.panelWp,
          panelUnitRate: dbConfig.panelUnitRate ?? DEFAULT_CONFIG.panelUnitRate,
          roofAreaPerKw: dbConfig.roofAreaPerKw ?? DEFAULT_CONFIG.roofAreaPerKw,
          residentialBenchmarkRate: dbConfig.residentialBenchmarkRate ?? DEFAULT_CONFIG.residentialBenchmarkRate,
          commercialBenchmarkRate: dbConfig.commercialBenchmarkRate ?? DEFAULT_CONFIG.commercialBenchmarkRate,
          gridTariffRate: dbConfig.gridTariffRate ?? DEFAULT_CONFIG.gridTariffRate,
          defaultPsh: dbConfig.defaultPsh ?? DEFAULT_CONFIG.defaultPsh,
          performanceRatio: dbConfig.performanceRatio ?? DEFAULT_CONFIG.performanceRatio,
          subsidyTier1Kw: dbConfig.subsidyTier1Kw ?? DEFAULT_CONFIG.subsidyTier1Kw,
          subsidyTier1Amount: dbConfig.subsidyTier1Amount ?? DEFAULT_CONFIG.subsidyTier1Amount,
          subsidyTier2Kw: dbConfig.subsidyTier2Kw ?? DEFAULT_CONFIG.subsidyTier2Kw,
          subsidyTier2Amount: dbConfig.subsidyTier2Amount ?? DEFAULT_CONFIG.subsidyTier2Amount,
          subsidyTier3PlusAmount: dbConfig.subsidyTier3PlusAmount ?? DEFAULT_CONFIG.subsidyTier3PlusAmount,
          stateSubsidyTier1Kw: dbConfig.stateSubsidyTier1Kw ?? DEFAULT_CONFIG.stateSubsidyTier1Kw,
          stateSubsidyTier1Amount: dbConfig.stateSubsidyTier1Amount ?? DEFAULT_CONFIG.stateSubsidyTier1Amount,
          stateSubsidyTier2Kw: dbConfig.stateSubsidyTier2Kw ?? DEFAULT_CONFIG.stateSubsidyTier2Kw,
          stateSubsidyTier2Amount: dbConfig.stateSubsidyTier2Amount ?? DEFAULT_CONFIG.stateSubsidyTier2Amount,
          stateSubsidyTier3PlusAmount: dbConfig.stateSubsidyTier3PlusAmount ?? DEFAULT_CONFIG.stateSubsidyTier3PlusAmount,
          equipmentBands: dbConfig.equipmentBands ?? DEFAULT_CONFIG.equipmentBands,
        };
        return cachedSolarConfig;
      }
    }
  } catch (err) {
    console.warn("[DataStore] DB query for SolarConfig notice:", err);
  }
  return cachedSolarConfig;
}

export function getSolarConfig(): SolarConfigOverride {
  // Trigger background async refresh while returning immediate active config
  getSolarConfigAsync().catch(() => {});
  return cachedSolarConfig;
}

export async function saveSolarConfig(config: SolarConfigOverride): Promise<void> {
  cachedSolarConfig = { ...DEFAULT_CONFIG, ...config };
  try {
    const db = prisma as any;
    if (db?.solarConfig) {
      await db.solarConfig.upsert({
        where: { id: "default" },
        update: {
          panelWp: config.panelWp,
          panelUnitRate: config.panelUnitRate,
          roofAreaPerKw: config.roofAreaPerKw,
          residentialBenchmarkRate: config.residentialBenchmarkRate,
          commercialBenchmarkRate: config.commercialBenchmarkRate,
          gridTariffRate: config.gridTariffRate,
          defaultPsh: config.defaultPsh,
          performanceRatio: config.performanceRatio,
          subsidyTier1Kw: config.subsidyTier1Kw,
          subsidyTier1Amount: config.subsidyTier1Amount,
          subsidyTier2Kw: config.subsidyTier2Kw,
          subsidyTier2Amount: config.subsidyTier2Amount,
          subsidyTier3PlusAmount: config.subsidyTier3PlusAmount,
          stateSubsidyTier1Kw: config.stateSubsidyTier1Kw,
          stateSubsidyTier1Amount: config.stateSubsidyTier1Amount,
          stateSubsidyTier2Kw: config.stateSubsidyTier2Kw,
          stateSubsidyTier2Amount: config.stateSubsidyTier2Amount,
          stateSubsidyTier3PlusAmount: config.stateSubsidyTier3PlusAmount,
          equipmentBands: config.equipmentBands as any,
        },
        create: {
          id: "default",
          panelWp: config.panelWp,
          panelUnitRate: config.panelUnitRate,
          roofAreaPerKw: config.roofAreaPerKw,
          residentialBenchmarkRate: config.residentialBenchmarkRate,
          commercialBenchmarkRate: config.commercialBenchmarkRate,
          gridTariffRate: config.gridTariffRate,
          defaultPsh: config.defaultPsh,
          performanceRatio: config.performanceRatio,
          subsidyTier1Kw: config.subsidyTier1Kw,
          subsidyTier1Amount: config.subsidyTier1Amount,
          subsidyTier2Kw: config.subsidyTier2Kw,
          subsidyTier2Amount: config.subsidyTier2Amount,
          subsidyTier3PlusAmount: config.subsidyTier3PlusAmount,
          stateSubsidyTier1Kw: config.stateSubsidyTier1Kw,
          stateSubsidyTier1Amount: config.stateSubsidyTier1Amount,
          stateSubsidyTier2Kw: config.stateSubsidyTier2Kw,
          stateSubsidyTier2Amount: config.stateSubsidyTier2Amount,
          stateSubsidyTier3PlusAmount: config.stateSubsidyTier3PlusAmount,
          equipmentBands: config.equipmentBands as any,
        },
      });
      console.log("[DataStore] SolarConfig saved successfully in PostgreSQL database.");
    }
  } catch (err) {
    console.error("[DataStore] Error saving SolarConfig to DB:", err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. Partnerships & Franchise/Dealer Store
// ─────────────────────────────────────────────────────────────────────────────

export type ApplicationType = "FRANCHISE" | "DEALERSHIP" | "PARTNER";
export type PartnerTier =
  | "TIER_1_EXCLUSIVE_DISTRIBUTOR"
  | "TIER_2_AUTHORIZED_DEALER"
  | "TIER_3_REFERRAL_AGENT";
export type ApplicationStatus = "PENDING" | "REVIEWED" | "CONTACTED" | "APPROVED" | "REJECTED";

export interface PartnerApplication {
  id: string;
  type: ApplicationType;
  tier?: PartnerTier | null;
  applicantName: string;
  businessName?: string | null;
  phone: string;
  email: string;
  location: string;
  investmentRange: string;
  experience?: string | null;
  status: ApplicationStatus;
  notes?: string | null;
  createdAt: string;
  updatedAt?: string;

  // Legacy fallback compatibility fields
  fullName?: string;
  contactPersonName?: string;
  mobileNumber?: string;
  emailAddress?: string;
  proposedCity?: string;
  primaryDistrict?: string;
  investmentCapacity?: string;
  businessBackground?: string;
  showroomSpace?: string;
  gstin?: string;
  productsInterested?: string[];
}

export type PartnershipApplication = PartnerApplication;
export type PartnershipType = ApplicationType;
export type PartnershipStatus = ApplicationStatus;

export async function savePartnershipApplication(
  payload: Omit<PartnerApplication, "id" | "status" | "createdAt"> & { status?: ApplicationStatus }
): Promise<PartnerApplication> {
  const applicantName = payload.applicantName || payload.fullName || "Partner Applicant";
  const phone = payload.phone || payload.mobileNumber || "";
  const email = payload.email || payload.emailAddress || "";
  const location = payload.location || payload.proposedCity || payload.primaryDistrict || "Odisha";
  const investmentRange = payload.investmentRange || payload.investmentCapacity || "₹2L–₹5L";
  const experience = payload.experience || payload.businessBackground || null;
  const status = (payload.status as any) || "PENDING";

  try {
    const db = prisma as any;
    if (db?.partnerApplication) {
      const record = await db.partnerApplication.create({
        data: {
          type: payload.type === "DEALERSHIP" ? "PARTNER" : (payload.type === "PARTNER" ? "PARTNER" : "FRANCHISE"),
          applicantName,
          businessName: payload.businessName || null,
          phone,
          email,
          location,
          investmentRange,
          experience,
          status,
          notes: payload.notes || null,
        },
      });
      return {
        id: record.id,
        type: payload.type,
        applicantName: record.applicantName,
        businessName: record.businessName,
        phone: record.phone,
        email: record.email,
        location: record.location,
        investmentRange: record.investmentRange,
        experience: record.experience,
        status: record.status,
        notes: record.notes,
        createdAt: record.createdAt.toISOString(),
        updatedAt: record.updatedAt.toISOString(),
      };
    }
  } catch (err) {
    console.error("[DataStore] Error saving partnership application to DB:", err);
  }

  return {
    id: "part_" + Math.random().toString(36).substring(2, 11),
    type: payload.type,
    applicantName,
    phone,
    email,
    location,
    investmentRange,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  };
}

export async function getAllPartnerships(): Promise<PartnerApplication[]> {
  try {
    const db = prisma as any;
    if (db?.partnerApplication) {
      const records = await db.partnerApplication.findMany({
        orderBy: { createdAt: "desc" },
      });
      return records.map((r: any) => ({
        id: r.id,
        type: r.type,
        tier: r.tier,
        applicantName: r.applicantName,
        businessName: r.businessName,
        phone: r.phone,
        email: r.email,
        location: r.location,
        investmentRange: r.investmentRange,
        experience: r.experience,
        status: r.status,
        notes: r.notes,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
        // Legacy compatibility
        fullName: r.applicantName,
        mobileNumber: r.phone,
        emailAddress: r.email,
      }));
    }
  } catch (err) {
    console.error("[DataStore] Error fetching partnerships from DB:", err);
  }
  return [];
}

export async function updatePartnershipStatus(
  id: string,
  status: ApplicationStatus,
  notes?: string
): Promise<boolean> {
  try {
    const db = prisma as any;
    if (db?.partnerApplication) {
      await db.partnerApplication.update({
        where: { id },
        data: {
          status,
          ...(notes !== undefined ? { notes } : {}),
        },
      });
      return true;
    }
  } catch (err) {
    console.error("[DataStore] Error updating partnership status:", err);
  }
  return false;
}

export async function deletePartnership(id: string): Promise<boolean> {
  try {
    const db = prisma as any;
    if (db?.partnerApplication) {
      await db.partnerApplication.delete({ where: { id } });
      return true;
    }
  } catch (err) {
    console.error("[DataStore] Error deleting partnership:", err);
  }
  return false;
}

export async function deletePartnershipByPhone(phone: string): Promise<boolean> {
  const clean = (phone || "").replace(/\D/g, "");
  if (!clean) return false;
  try {
    const db = prisma as any;
    if (db?.partnerApplication) {
      await db.partnerApplication.deleteMany({
        where: {
          phone: { contains: clean.slice(-10) },
        },
      });
      return true;
    }
  } catch (err) {
    console.error("[DataStore] Error deleting partnership by phone:", err);
  }
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Contact Inquiries & Site Visits Store
// ─────────────────────────────────────────────────────────────────────────────

export type ContactInquiryStatus = "NEW" | "CONTACTED" | "RESOLVED";

export interface ContactInquiry {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  location: string;
  discomRegion?: string;
  systemType?: string;
  monthlyBill?: string;
  rooftopArea?: string;
  message?: string;
  inquiryType?: "SITE_VISIT" | "GENERAL_CONTACT" | "LIVE_CHAT";
  status: ContactInquiryStatus;
  createdAt: string;
}

export async function saveContactInquiry(
  payload: Omit<ContactInquiry, "id" | "status" | "createdAt">
): Promise<ContactInquiry> {
  try {
    const db = prisma as any;
    if (db?.siteVisitInquiry) {
      const record = await db.siteVisitInquiry.create({
        data: {
          fullName: payload.fullName,
          mobileNumber: payload.phone,
          email: payload.email || null,
          pincode: payload.location?.match(/\d{6}/)?.[0] || "751024",
          district: payload.discomRegion || payload.location || "Khordha",
          category: "RESIDENTIAL",
          systemType: "ON_GRID",
          message: payload.message || payload.systemType || "Contact Inquiry",
          status: "PENDING",
        },
      });
      return {
        id: record.id,
        fullName: record.fullName,
        phone: record.mobileNumber,
        email: record.email || "",
        location: record.district,
        discomRegion: record.district,
        systemType: payload.systemType,
        message: record.message,
        status: "NEW",
        createdAt: record.createdAt.toISOString(),
      };
    }
  } catch (err) {
    console.error("[DataStore] Error saving contact inquiry to DB:", err);
  }

  return {
    id: "inq_" + Math.random().toString(36).substring(2, 11),
    ...payload,
    status: "NEW",
    createdAt: new Date().toISOString(),
  };
}

export async function getAllContactInquiries(): Promise<ContactInquiry[]> {
  try {
    const db = prisma as any;
    if (db?.siteVisitInquiry) {
      const records = await db.siteVisitInquiry.findMany({
        orderBy: { createdAt: "desc" },
      });
      return records.map((r: any) => ({
        id: r.id,
        fullName: r.fullName,
        phone: r.mobileNumber,
        email: r.email || "",
        location: r.district || "",
        discomRegion: r.district || "",
        systemType: r.message || "Rooftop Solar",
        status: r.status === "PENDING" ? "NEW" : (r.status as any),
        createdAt: r.createdAt.toISOString(),
      }));
    }
  } catch (err) {
    console.error("[DataStore] Error getting contact inquiries from DB:", err);
  }
  return [];
}

export async function updateContactInquiryStatus(
  id: string,
  status: ContactInquiryStatus
): Promise<boolean> {
  try {
    const db = prisma as any;
    if (db?.siteVisitInquiry) {
      await db.siteVisitInquiry.update({
        where: { id },
        data: { status: status === "NEW" ? "PENDING" : status },
      });
      return true;
    }
  } catch (err) {
    console.error("[DataStore] Error updating contact inquiry status:", err);
  }
  return false;
}

export async function deleteContactInquiry(id: string): Promise<boolean> {
  try {
    const db = prisma as any;
    if (db?.siteVisitInquiry) {
      await db.siteVisitInquiry.delete({ where: { id } });
      return true;
    }
  } catch (err) {
    console.error("[DataStore] Error deleting contact inquiry:", err);
  }
  return false;
}

export async function deleteContactInquiryByPhone(phone: string): Promise<boolean> {
  const clean = (phone || "").replace(/\D/g, "");
  if (!clean) return false;
  try {
    const db = prisma as any;
    if (db?.siteVisitInquiry) {
      await db.siteVisitInquiry.deleteMany({
        where: {
          mobileNumber: { contains: clean.slice(-10) },
        },
      });
      return true;
    }
  } catch (err) {
    console.error("[DataStore] Error deleting contact inquiry by phone:", err);
  }
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Leads & Solar Proposals Store
// ─────────────────────────────────────────────────────────────────────────────

export interface LeadRecord extends LeadSubmissionPayload {
  leadId: string;
  createdAt: string;
}

export async function saveLead(leadId: string, payload: LeadSubmissionPayload): Promise<void> {
  try {
    const db = prisma as any;
    if (db?.siteVisitInquiry) {
      await db.siteVisitInquiry.create({
        data: {
          fullName: payload.customerName,
          mobileNumber: payload.phone,
          email: payload.email || null,
          pincode: payload.pincode || "751024",
          district: payload.locationLabel || payload.address || "Khordha",
          category: payload.calculation?.propertyType?.toUpperCase() === "COMMERCIAL" ? "COMMERCIAL_INDUSTRIAL" : "RESIDENTIAL",
          systemType: "ON_GRID",
          monthlyBill: payload.calculation?.monthlySavingsRs || null,
          message: `Proposal Ref: ${payload.quotationRef || leadId} (${payload.calculation?.systemKw || 5} kW System)`,
          status: "PENDING",
        },
      });
      console.log(`[DataStore] Saved Lead #${leadId} to PostgreSQL DB.`);
    }
  } catch (err) {
    console.error("[DataStore] Error saving lead to DB:", err);
  }
}

export async function getAllLeads(): Promise<LeadRecord[]> {
  try {
    const db = prisma as any;
    if (db?.siteVisitInquiry) {
      const records = await db.siteVisitInquiry.findMany({
        orderBy: { createdAt: "desc" },
      });
      return records.map((r: any) => ({
        leadId: r.id,
        customerName: r.fullName,
        phone: r.mobileNumber,
        email: r.email || "",
        pincode: r.pincode || "751024",
        locationLabel: r.district || "Odisha",
        discom: "TPCODL",
        quotationRef: r.message?.includes("Proposal Ref:") ? r.message.split("(")[0].replace("Proposal Ref:", "").trim() : r.id,
        calculation: {
          systemKw: 5,
          propertyType: "residential",
          panelCount: 8,
          panelWp: 600,
          panelUnitPrice: 14033.25,
          totalPanelCost: 112266,
          requiredRoofAreaSqFt: 450,
          benchmarkRatePerKw: 65000,
          grossSystemCost: 325000,
          pmSuryaGharSubsidy: 78000,
          centralSubsidy: 78000,
          stateSubsidy: 60000,
          totalSubsidy: 138000,
          taxBenefit80AD: 0,
          netPayableCost: 187000,
          pshUsed: 4.5,
          annualGenerationKwh: 7500,
          monthlyGenerationKwh: 625,
          avoidedTariffPerUnit: 7.0,
          annualSavingsRs: 52500,
          monthlySavingsRs: 4375,
          paybackPeriodYears: 3.5,
          co2OffsetTonsPerYear: 6.0,
          equipmentBand: DEFAULT_CONFIG.equipmentBands[1],
          bom: [],
        },
        createdAt: r.createdAt.toISOString(),
      }));
    }
  } catch (err) {
    console.error("[DataStore] Error getting leads from DB:", err);
  }
  return [];
}

export async function deleteLead(leadId: string): Promise<boolean> {
  try {
    const db = prisma as any;
    if (db?.siteVisitInquiry) {
      await db.siteVisitInquiry.delete({ where: { id: leadId } });
      return true;
    }
  } catch (err) {
    console.error("[DataStore] Error deleting lead:", err);
  }
  return false;
}

export async function deleteLeadByPhone(phone: string): Promise<boolean> {
  const clean = (phone || "").replace(/\D/g, "");
  if (!clean) return false;
  try {
    const db = prisma as any;
    if (db?.siteVisitInquiry) {
      await db.siteVisitInquiry.deleteMany({
        where: {
          mobileNumber: { contains: clean.slice(-10) },
        },
      });
      return true;
    }
  } catch (err) {
    console.error("[DataStore] Error deleting lead by phone:", err);
  }
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. PM Surya Ghar Eligibility Leads Store
// ─────────────────────────────────────────────────────────────────────────────

export interface EligibilityLeadRecord {
  id: string;
  consumerNumber: string;
  fullName: string;
  phone: string;
  email: string;
  discom: string;
  roofOwnership: string;
  monthlyBill?: string | null;
  status: string;
  notes?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export async function saveEligibilityLead(
  payload: Omit<EligibilityLeadRecord, "id" | "status" | "createdAt"> & { status?: string }
): Promise<EligibilityLeadRecord> {
  try {
    const db = prisma as any;
    if (db?.eligibilityLead) {
      const record = await db.eligibilityLead.create({
        data: {
          consumerNumber: payload.consumerNumber,
          fullName: payload.fullName,
          phone: payload.phone,
          email: payload.email || "info@pragatiecosolar.in",
          discom: payload.discom || "TPCODL",
          roofOwnership: payload.roofOwnership || "OWNED",
          monthlyBill: payload.monthlyBill || null,
          status: payload.status || "NEW",
          notes: payload.notes || null,
        },
      });
      return {
        id: record.id,
        consumerNumber: record.consumerNumber,
        fullName: record.fullName,
        phone: record.phone,
        email: record.email,
        discom: record.discom,
        roofOwnership: record.roofOwnership,
        monthlyBill: record.monthlyBill,
        status: record.status,
        notes: record.notes,
        createdAt: record.createdAt.toISOString(),
        updatedAt: record.updatedAt.toISOString(),
      };
    }
  } catch (err) {
    console.error("[DataStore] Error saving eligibility lead to DB:", err);
  }

  return {
    id: "el_" + Math.random().toString(36).substring(2, 11),
    ...payload,
    status: payload.status || "NEW",
    createdAt: new Date().toISOString(),
  };
}

export async function getAllEligibilityLeads(): Promise<EligibilityLeadRecord[]> {
  try {
    const db = prisma as any;
    if (db?.eligibilityLead) {
      const records = await db.eligibilityLead.findMany({
        orderBy: { createdAt: "desc" },
      });
      return records.map((r: any) => ({
        id: r.id,
        consumerNumber: r.consumerNumber,
        fullName: r.fullName,
        phone: r.phone,
        email: r.email,
        discom: r.discom,
        roofOwnership: r.roofOwnership,
        monthlyBill: r.monthlyBill,
        status: r.status,
        notes: r.notes,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
      }));
    }
  } catch (err) {
    console.error("[DataStore] Error getting eligibility leads from DB:", err);
  }
  return [];
}

export async function updateEligibilityLeadStatus(
  id: string,
  status: string,
  notes?: string
): Promise<boolean> {
  try {
    const db = prisma as any;
    if (db?.eligibilityLead) {
      await db.eligibilityLead.update({
        where: { id },
        data: {
          status,
          ...(notes !== undefined ? { notes } : {}),
        },
      });
      return true;
    }
  } catch (err) {
    console.error("[DataStore] Error updating eligibility lead status:", err);
  }
  return false;
}

export async function deleteEligibilityLead(id: string): Promise<boolean> {
  try {
    const db = prisma as any;
    if (db?.eligibilityLead) {
      await db.eligibilityLead.delete({ where: { id } });
      return true;
    }
  } catch (err) {
    console.error("[DataStore] Error deleting eligibility lead:", err);
  }
  return false;
}

export async function deleteEligibilityLeadByPhone(phone: string, consumerNumber?: string): Promise<boolean> {
  const cleanPhone = (phone || "").replace(/\D/g, "");
  const cleanCa = (consumerNumber || "").trim();
  if (!cleanPhone && !cleanCa) return false;

  try {
    const db = prisma as any;
    if (db?.eligibilityLead) {
      await db.eligibilityLead.deleteMany({
        where: {
          OR: [
            ...(cleanPhone ? [{ phone: { contains: cleanPhone.slice(-10) } }] : []),
            ...(cleanCa ? [{ consumerNumber: cleanCa }] : []),
          ],
        },
      });
      return true;
    }
  } catch (err) {
    console.error("[DataStore] Error deleting eligibility lead by phone/CA:", err);
  }
  return false;
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. Approved Partner Network Store
// ─────────────────────────────────────────────────────────────────────────────

export interface ApprovedPartnerRecord {
  id: string;
  type: "FRANCHISE" | "DEALER";
  name: string;
  contactPerson?: string | null;
  phone: string;
  email?: string | null;
  district: string;
  fullAddress: string;
  pincode?: string | null;
  googleMapUrl?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export async function saveApprovedPartner(
  payload: Omit<ApprovedPartnerRecord, "id" | "createdAt"> & { id?: string }
): Promise<ApprovedPartnerRecord> {
  try {
    const db = prisma as any;
    if (db?.approvedPartner) {
      const record = payload.id
        ? await db.approvedPartner.upsert({
            where: { id: payload.id },
            update: {
              type: payload.type,
              name: payload.name,
              contactPerson: payload.contactPerson || null,
              phone: payload.phone,
              email: payload.email || null,
              district: payload.district,
              fullAddress: payload.fullAddress,
              pincode: payload.pincode || null,
              googleMapUrl: payload.googleMapUrl || null,
              isActive: payload.isActive !== undefined ? payload.isActive : true,
            },
            create: {
              id: payload.id,
              type: payload.type,
              name: payload.name,
              contactPerson: payload.contactPerson || null,
              phone: payload.phone,
              email: payload.email || null,
              district: payload.district,
              fullAddress: payload.fullAddress,
              pincode: payload.pincode || null,
              googleMapUrl: payload.googleMapUrl || null,
              isActive: payload.isActive !== undefined ? payload.isActive : true,
            },
          })
        : await db.approvedPartner.create({
            data: {
              type: payload.type,
              name: payload.name,
              contactPerson: payload.contactPerson || null,
              phone: payload.phone,
              email: payload.email || null,
              district: payload.district,
              fullAddress: payload.fullAddress,
              pincode: payload.pincode || null,
              googleMapUrl: payload.googleMapUrl || null,
              isActive: payload.isActive !== undefined ? payload.isActive : true,
            },
          });
      return {
        id: record.id,
        type: record.type,
        name: record.name,
        contactPerson: record.contactPerson,
        phone: record.phone,
        email: record.email,
        district: record.district,
        fullAddress: record.fullAddress,
        pincode: record.pincode,
        googleMapUrl: record.googleMapUrl,
        isActive: record.isActive,
        createdAt: record.createdAt.toISOString(),
        updatedAt: record.updatedAt.toISOString(),
      };
    }
  } catch (err) {
    console.error("[DataStore] Error saving approved partner to DB:", err);
  }

  return {
    id: payload.id || "ap_" + Math.random().toString(36).substring(2, 11),
    ...payload,
    isActive: payload.isActive !== undefined ? payload.isActive : true,
    createdAt: new Date().toISOString(),
  };
}

export async function getAllApprovedPartners(): Promise<ApprovedPartnerRecord[]> {
  try {
    const db = prisma as any;
    if (db?.approvedPartner) {
      const records = await db.approvedPartner.findMany({
        orderBy: { createdAt: "desc" },
      });
      return records.map((r: any) => ({
        id: r.id,
        type: r.type,
        name: r.name,
        contactPerson: r.contactPerson,
        phone: r.phone,
        email: r.email,
        district: r.district,
        fullAddress: r.fullAddress,
        pincode: r.pincode,
        googleMapUrl: r.googleMapUrl,
        isActive: r.isActive,
        createdAt: r.createdAt.toISOString(),
        updatedAt: r.updatedAt.toISOString(),
      }));
    }
  } catch (err) {
    console.error("[DataStore] Error getting approved partners from DB:", err);
  }
  return [];
}

export async function updateApprovedPartnerRecord(
  id: string,
  payload: Partial<ApprovedPartnerRecord>
): Promise<boolean> {
  try {
    const db = prisma as any;
    if (db?.approvedPartner) {
      await db.approvedPartner.update({
        where: { id },
        data: {
          ...(payload.type ? { type: payload.type } : {}),
          ...(payload.name ? { name: payload.name } : {}),
          ...(payload.contactPerson !== undefined ? { contactPerson: payload.contactPerson } : {}),
          ...(payload.phone ? { phone: payload.phone } : {}),
          ...(payload.email !== undefined ? { email: payload.email } : {}),
          ...(payload.district ? { district: payload.district } : {}),
          ...(payload.fullAddress ? { fullAddress: payload.fullAddress } : {}),
          ...(payload.pincode !== undefined ? { pincode: payload.pincode } : {}),
          ...(payload.googleMapUrl !== undefined ? { googleMapUrl: payload.googleMapUrl } : {}),
          ...(payload.isActive !== undefined ? { isActive: payload.isActive } : {}),
        },
      });
      return true;
    }
  } catch (err) {
    console.error("[DataStore] Error updating approved partner in DB:", err);
  }
  return false;
}

export async function deleteApprovedPartnerRecord(id: string): Promise<boolean> {
  try {
    const db = prisma as any;
    if (db?.approvedPartner) {
      await db.approvedPartner.delete({ where: { id } });
      return true;
    }
  } catch (err) {
    console.error("[DataStore] Error deleting approved partner from DB:", err);
  }
  return false;
}
