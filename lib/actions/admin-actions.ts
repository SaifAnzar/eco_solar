"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getAllLeads, getAllContactInquiries } from "@/lib/data-store";

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 1: SITE CONTENT & HERO CMS ACTIONS
// ─────────────────────────────────────────────────────────────────────────────

export async function getSiteSettings() {
  try {
    const db = prisma as any;
    let settings = await db.siteSettings.findUnique({
      where: { id: "default" },
    });

    if (!settings) {
      settings = await db.siteSettings.create({
        data: {
          id: "default",
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
          typewriterWords: [
            "On-Grid, Off-Grid & Hybrid Solutions.",
            "Powering Homes & Businesses.",
            "PM Surya Ghar Subsidy Authorized.",
            "Save Up to 90% Electricity Bills.",
          ],
        },
      });
    }

    // Try fetching typewriterWords via raw SQL query if Prisma Client didn't return it
    if (!settings.typewriterWords || !Array.isArray(settings.typewriterWords) || settings.typewriterWords.length === 0) {
      try {
        const rawRes: any = await (prisma as any).$queryRaw`
          SELECT "typewriterWords" FROM "SiteSettings" WHERE "id" = 'default'
        `;
        if (rawRes && rawRes[0] && Array.isArray(rawRes[0].typewriterWords) && rawRes[0].typewriterWords.length > 0) {
          settings.typewriterWords = rawRes[0].typewriterWords;
        }
      } catch (e) {
        // Fallback default array if column or query isn't ready
      }
    }

    return { success: true, data: settings };
  } catch (error: any) {
    console.error("Error getting site settings:", error);
    return {
      success: false,
      data: {
        id: "default",
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
        typewriterWords: [
          "On-Grid, Off-Grid & Hybrid Solutions.",
          "Powering Homes & Businesses.",
          "PM Surya Ghar Subsidy Authorized.",
          "Save Up to 90% Electricity Bills.",
        ],
      },
    };
  }
}

export async function updateSiteSettings(data: {
  heroHeadline: string;
  heroSubline: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  workingHours: string;
  systemsInstalled: string;
  capacityDelivered: string;
  discomZonesCovered: string;
  epcScope: string;
  typewriterWords?: string[];
}) {
  try {
    const db = prisma as any;
    const { typewriterWords, ...baseData } = data;

    let updated: any;
    try {
      updated = await db.siteSettings.upsert({
        where: { id: "default" },
        update: data,
        create: { id: "default", ...data },
      });
    } catch (err) {
      // Fallback: upsert base fields if Prisma Client JS hasn't recompiled typewriterWords
      updated = await db.siteSettings.upsert({
        where: { id: "default" },
        update: baseData,
        create: { id: "default", ...baseData },
      });
    }

    // Safely update typewriterWords array in PostgreSQL via raw query
    if (typewriterWords && Array.isArray(typewriterWords)) {
      try {
        await (prisma as any).$executeRaw`
          UPDATE "SiteSettings"
          SET "typewriterWords" = ${typewriterWords}
          WHERE "id" = 'default'
        `;
        updated.typewriterWords = typewriterWords;
      } catch (rawErr) {
        console.error("Note on raw typewriterWords update:", rawErr);
      }
    }

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath("/admin");
    revalidatePath("/admin/site-content");
    return { success: true, message: "Site content & settings saved successfully!", data: updated };
  } catch (error: any) {
    console.error("Error updating site settings:", error);
    return { success: false, error: error?.message || "Failed to update site settings." };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 2: LEADS & SITE VISIT MANAGEMENT ACTIONS
// ─────────────────────────────────────────────────────────────────────────────

export async function getLeads(filters?: { district?: string; discom?: string; status?: string }) {
  try {
    const db = prisma as any;
    let dbInquiries: any[] = [];
    try {
      if (db) {
        dbInquiries = await db.siteVisitInquiry.findMany({
          orderBy: { createdAt: "desc" },
        });
      }
    } catch (e) {
      console.warn("DB query notice in getLeads:", e);
    }

    const fileLeads = getAllLeads().map((l) => ({
      id: l.leadId,
      fullName: l.customerName,
      mobileNumber: l.phone,
      email: l.email || "",
      pincode: l.pincode || "751024",
      district: l.locationLabel || l.address || "Odisha",
      discom: l.discom || "TPCODL",
      category: l.calculation?.propertyType?.toUpperCase() || "COMMERCIAL",
      systemType: `${l.calculation?.systemKw || 50} kW Solar`,
      monthlyBill: l.calculation?.monthlySavingsRs || 0,
      status: "PENDING",
      createdAt: l.createdAt || new Date().toISOString(),
    }));

    const fileContactInquiries = getAllContactInquiries().map((c) => ({
      id: c.id,
      fullName: c.fullName,
      mobileNumber: c.phone,
      email: c.email || "",
      pincode: c.location.match(/\d{6}/)?.[0] || "751024",
      district: c.discomRegion || c.location,
      discom: c.discomRegion || "TPCODL",
      category: "RESIDENTIAL",
      systemType: c.systemType || "Rooftop Solar",
      monthlyBill: 0,
      status: c.status === "NEW" ? "PENDING" : c.status,
      createdAt: c.createdAt || new Date().toISOString(),
    }));

    // Deduplicate all combined leads seamlessly by composite key (Phone + Name)
    const combinedMap = new Map<string, any>();
    const seenCompositeKeys = new Set<string>();

    const makeKey = (phone?: string, name?: string) => {
      const p = (phone || "").replace(/\D/g, "");
      const n = (name || "").trim().toLowerCase();
      return p ? `${p}_${n}` : null;
    };

    // 1. Add DB items first
    dbInquiries.forEach((item) => {
      if (item && item.id) {
        combinedMap.set(item.id, item);
        const compositeKey = makeKey(item.mobileNumber, item.fullName);
        if (compositeKey) seenCompositeKeys.add(compositeKey);
      }
    });

    // 2. Merge File Leads
    fileLeads.forEach((item) => {
      if (item && item.id) {
        const compositeKey = makeKey(item.mobileNumber, item.fullName);
        if (!combinedMap.has(item.id) && (!compositeKey || !seenCompositeKeys.has(compositeKey))) {
          combinedMap.set(item.id, item);
          if (compositeKey) seenCompositeKeys.add(compositeKey);
        }
      }
    });

    // 3. Merge File Contact Inquiries
    fileContactInquiries.forEach((item) => {
      if (item && item.id) {
        const compositeKey = makeKey(item.mobileNumber, item.fullName);
        if (!combinedMap.has(item.id) && (!compositeKey || !seenCompositeKeys.has(compositeKey))) {
          combinedMap.set(item.id, item);
          if (compositeKey) seenCompositeKeys.add(compositeKey);
        }
      }
    });

    let merged = Array.from(combinedMap.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (filters?.district && filters.district !== "ALL") {
      merged = merged.filter((i) => i.district?.toLowerCase().includes(filters.district!.toLowerCase()));
    }
    if (filters?.discom && filters.discom !== "ALL") {
      merged = merged.filter((i) => i.discom === filters.discom);
    }
    if (filters?.status && filters.status !== "ALL") {
      merged = merged.filter((i) => i.status === filters.status);
    }

    return { success: true, data: merged };
  } catch (error: any) {
    console.error("Error fetching leads:", error);
    return { success: false, data: [] };
  }
}

export async function updateLeadStatus(id: string, status: string) {
  try {
    const db = prisma as any;
    const updated = await db.siteVisitInquiry.update({
      where: { id },
      data: { status },
    });

    revalidatePath("/admin/leads");
    return { success: true, message: `Status updated to ${status}`, data: updated };
  } catch (error: any) {
    console.error("Error updating lead status:", error);
    return { success: false, error: "Failed to update lead status." };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 3: SOLAR PACKAGES CMS ACTIONS
// ─────────────────────────────────────────────────────────────────────────────

export async function getSolarPackages() {
  try {
    const db = prisma as any;
    const packages = await db.solarPackage.findMany({
      orderBy: { capacityKw: "asc" },
    });
    return { success: true, data: packages };
  } catch (error: any) {
    console.error("Error fetching packages:", error);
    return { success: false, data: [] };
  }
}

export async function upsertSolarPackage(data: {
  id?: string;
  name: string;
  category: "RESIDENTIAL" | "COMMERCIAL_INDUSTRIAL" | "AGRICULTURAL";
  systemType: "ON_GRID" | "OFF_GRID" | "HYBRID" | "SOLAR_PUMP" | "STREET_LIGHTING";
  capacityKw: number;
  areaRequiredSqFt: number;
  batteryCapacityKwh?: number;
  backupHours?: number;
  costBeforeSubsidy: number;
  govtSubsidy: number;
  netPrice: number;
  isSuryaGharEligible: boolean;
  status: string;
}) {
  try {
    const db = prisma as any;
    let result;
    if (data.id) {
      result = await db.solarPackage.update({
        where: { id: data.id },
        data,
      });
    } else {
      result = await db.solarPackage.create({
        data,
      });
    }

    revalidatePath("/residential");
    revalidatePath("/commercial");
    revalidatePath("/services");
    revalidatePath("/admin/packages");
    return { success: true, message: "Package saved successfully!", data: result };
  } catch (error: any) {
    console.error("Error upserting package:", error);
    return { success: false, error: "Failed to save package." };
  }
}

export async function deleteSolarPackage(id: string) {
  try {
    const db = prisma as any;
    await db.solarPackage.delete({ where: { id } });
    revalidatePath("/admin/packages");
    revalidatePath("/residential");
    revalidatePath("/commercial");
    return { success: true, message: "Package deleted successfully!" };
  } catch (error: any) {
    console.error("Error deleting package:", error);
    return { success: false, error: "Failed to delete package." };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 4: PROJECTS PORTFOLIO MANAGER ACTIONS
// ─────────────────────────────────────────────────────────────────────────────

export async function getProjects() {
  try {
    const db = prisma as any;
    const projects = await db.projectPortfolio.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: projects };
  } catch (error: any) {
    console.error("Error fetching projects:", error);
    return { success: false, data: [] };
  }
}

export async function upsertProject(data: {
  id?: string;
  title: string;
  clientType: string;
  district: string;
  systemSizeKw: number;
  systemType: string;
  imageUrl: string;
  testimonial?: string;
  clientName?: string;
  status: string;
}) {
  try {
    const db = prisma as any;
    let result;
    if (data.id) {
      result = await db.projectPortfolio.update({
        where: { id: data.id },
        data,
      });
    } else {
      result = await db.projectPortfolio.create({
        data,
      });
    }

    revalidatePath("/projects");
    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true, message: "Project saved successfully!", data: result };
  } catch (error: any) {
    console.error("Error upserting project:", error);
    return { success: false, error: "Failed to save project." };
  }
}

export async function deleteProject(id: string) {
  try {
    const db = prisma as any;
    await db.projectPortfolio.delete({ where: { id } });
    revalidatePath("/projects");
    revalidatePath("/");
    revalidatePath("/admin/projects");
    return { success: true, message: "Project deleted successfully!" };
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project." };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 5: SERVICES & SCHEMES CMS ACTIONS
// ─────────────────────────────────────────────────────────────────────────────

export async function getSchemeAndService(sectionKey: string) {
  try {
    const db = prisma as any;
    const item = await db.schemeAndService.findUnique({
      where: { sectionKey },
    });
    return { success: true, data: item };
  } catch (error: any) {
    console.error("Error fetching scheme & service:", error);
    return { success: false, data: null };
  }
}

export async function upsertSchemeAndService(sectionKey: string, title: string, content: string, metaJson?: string) {
  try {
    const db = prisma as any;
    const result = await db.schemeAndService.upsert({
      where: { sectionKey },
      update: { title, content, metaJson },
      create: { sectionKey, title, content, metaJson },
    });

    revalidatePath("/services");
    revalidatePath("/government-schemes");
    revalidatePath("/admin/services-schemes");
    return { success: true, message: "Content updated successfully!", data: result };
  } catch (error: any) {
    console.error("Error upserting scheme & service:", error);
    return { success: false, error: "Failed to save content." };
  }
}
