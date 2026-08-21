"use server";

import {
  saveContactInquiry,
  getAllContactInquiries,
  getAllLeads,
  updateContactInquiryStatus,
  deleteContactInquiry,
  deleteContactInquiryByPhone,
  deleteLead,
  deleteLeadByPhone,
  ContactInquiryStatus,
  ContactInquiry,
} from "@/lib/data-store";

export async function deleteContactInquiryAction(id: string) {
  try {
    let ok = false;
    let targetPhone: string | null = null;

    // 1. Check PostgreSQL DB first
    try {
      if (prisma) {
        const dbItem = await prisma.siteVisitInquiry.findUnique({ where: { id } });
        if (dbItem) {
          targetPhone = dbItem.mobileNumber;
          await prisma.siteVisitInquiry.delete({ where: { id } });
          ok = true;
        }
      }
    } catch (dbErr) {
      console.warn("[Delete Contact Action] DB delete notice (non-fatal):", dbErr);
    }

    // 2. Check contact-inquiries.json for matching ID
    const fileStore = getAllContactInquiries();
    const targetInquiry = fileStore.find((item) => item.id === id);
    if (targetInquiry && targetInquiry.phone) {
      targetPhone = targetInquiry.phone;
    }

    // 3. Check leads.json for matching ID
    const leadStore = getAllLeads();
    const targetLead = leadStore.find((l) => l.leadId === id);
    if (targetLead && targetLead.phone) {
      targetPhone = targetLead.phone;
    }

    // Direct deletion by ID
    if (deleteContactInquiry(id)) ok = true;
    if (deleteLead(id)) ok = true;

    // Cross-deletion by phone across ALL file stores to ensure zero reappearance
    if (targetPhone) {
      deleteContactInquiryByPhone(targetPhone);
      deleteLeadByPhone(targetPhone);
      ok = true;
    }

    revalidatePath("/admin/contact-leads");
    return { success: ok || true };
  } catch (error: any) {
    console.error("[Delete Contact Error]:", error);
    return { success: false, error: error.message || "Failed to delete inquiry." };
  }
}
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface SubmitInquiryInput {
  fullName: string;
  phone: string;
  email?: string;
  location: string;
  discomRegion?: string;
  systemType?: string;
  monthlyBill?: string;
  rooftopArea?: string;
  message?: string;
  inquiryType?: "SITE_VISIT" | "GENERAL_CONTACT";
}

export async function submitContactInquiryAction(input: SubmitInquiryInput) {
  try {
    // 1. Try saving to PostgreSQL DB first as primary storage
    let dbRecord;
    try {
      if (prisma) {
        dbRecord = await prisma.siteVisitInquiry.create({
          data: {
            fullName: input.fullName,
            mobileNumber: input.phone,
            email: input.email,
            pincode: input.location.match(/\d{6}/)?.[0] || "751024",
            district: input.discomRegion || input.location || "Khordha",
            message: input.message || "Contact Inquiry",
            status: "NEW",
          },
        });
      }
    } catch (dbErr) {
      console.warn("[Contact Action] Prisma DB save notice (falling back to file store):", dbErr);
    }

    // 2. Fallback to File DataStore ONLY if DB save failed
    let saved: any = dbRecord;
    if (!saved) {
      saved = saveContactInquiry({
        fullName: input.fullName,
        phone: input.phone,
        email: input.email || "",
        location: input.location,
        discomRegion: input.discomRegion || "",
        systemType: input.systemType || "Rooftop Solar",
        monthlyBill: input.monthlyBill || "",
        rooftopArea: input.rooftopArea || "",
        message: input.message || "",
        inquiryType: input.inquiryType || (input.message?.includes("SITE VISIT") ? "SITE_VISIT" : "GENERAL_CONTACT"),
      });
    }

    revalidatePath("/admin");
    revalidatePath("/admin/contact-leads");
    return { success: true, data: saved };
  } catch (error: any) {
    console.error("[Contact Action Error]:", error);
    return { success: false, error: error.message || "Failed to submit inquiry." };
  }
}

export async function getContactInquiriesAction() {
  try {
    let dbList: any[] = [];

    try {
      if (prisma) {
        const rawDb = await prisma.siteVisitInquiry.findMany({
          orderBy: { createdAt: "desc" },
          take: 100,
        });

        dbList = rawDb.map((item) => ({
          id: item.id,
          fullName: item.fullName,
          phone: item.mobileNumber,
          email: item.email || "",
          location: `${item.district} (Pincode: ${item.pincode})`,
          discomRegion: item.discom || item.district,
          systemType: item.systemType || "Rooftop Solar",
          monthlyBill: item.monthlyBill ? `₹${item.monthlyBill}/month` : "",
          rooftopArea: item.roofAreaSqFt ? `${item.roofAreaSqFt} sq.ft` : "",
          message: item.message || "Site Visit Request",
          inquiryType: "SITE_VISIT" as const,
          status: (item.status === "PENDING" ? "NEW" : item.status) as ContactInquiryStatus,
          createdAt: item.createdAt.toISOString(),
        }));
      }
    } catch (dbErr) {
      console.warn("[Get Contact Action] Prisma DB query notice:", dbErr);
    }

    const fileList = getAllContactInquiries();
    const leadList = getAllLeads().map((l) => ({
      id: l.leadId,
      fullName: l.customerName,
      phone: l.phone,
      email: l.email || "",
      location: l.locationLabel || l.address || "Odisha",
      discomRegion: l.discom || "TPCODL",
      systemType: `${l.calculation?.systemKw || 50} kW Commercial / Solar Plant`,
      monthlyBill: l.calculation?.monthlySavingsRs ? `₹${l.calculation.monthlySavingsRs.toLocaleString()}/month savings` : "",
      rooftopArea: l.calculation?.requiredRoofAreaSqFt ? `${l.calculation.requiredRoofAreaSqFt} sq.ft` : "",
      message: `Solar / Commercial Proposal Request for ${l.calculation?.systemKw || 50} kW (${l.address || l.locationLabel || "Odisha"})`,
      inquiryType: "SITE_VISIT" as const,
      status: "NEW" as ContactInquiryStatus,
      createdAt: l.createdAt || new Date().toISOString(),
    }));

    // Merge and deduplicate DB, Lead, and File records seamlessly
    const combinedMap = new Map<string, any>();
    const seenCompositeKeys = new Set<string>();

    const makeKey = (phone?: string, name?: string) => {
      const p = (phone || "").replace(/\D/g, "");
      const n = (name || "").trim().toLowerCase();
      return p ? `${p}_${n}` : null;
    };

    dbList.forEach((item) => {
      if (item && item.id) {
        combinedMap.set(item.id, item);
        const key = makeKey(item.phone, item.fullName);
        if (key) seenCompositeKeys.add(key);
      }
    });

    leadList.forEach((item) => {
      if (item && item.id) {
        const key = makeKey(item.phone, item.fullName);
        if (!combinedMap.has(item.id) && (!key || !seenCompositeKeys.has(key))) {
          combinedMap.set(item.id, item);
          if (key) seenCompositeKeys.add(key);
        }
      }
    });

    fileList.forEach((item) => {
      if (item && item.id) {
        const key = makeKey(item.phone, item.fullName);
        if (!combinedMap.has(item.id) && (!key || !seenCompositeKeys.has(key))) {
          combinedMap.set(item.id, item);
          if (key) seenCompositeKeys.add(key);
        }
      }
    });

    const mergedList = Array.from(combinedMap.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return { success: true, data: mergedList };
  } catch (error: any) {
    console.error("[Get Contact Inquiries Error]:", error);
    return { success: false, error: error.message || "Failed to fetch inquiries." };
  }
}

export async function updateContactInquiryStatusAction(id: string, status: ContactInquiryStatus) {
  try {
    let ok = false;

    // 1. Update in PostgreSQL DB if present
    try {
      if (prisma) {
        await prisma.siteVisitInquiry.update({
          where: { id },
          data: { status: (status === "NEW" ? "PENDING" : status) as any },
        });
        ok = true;
      }
    } catch (dbErr) {
      console.warn("[Update Contact Status] DB notice (non-fatal):", dbErr);
    }

    // 2. Update in JSON file storage if present
    const fileOk = updateContactInquiryStatus(id, status);
    if (fileOk) ok = true;

    revalidatePath("/admin/contact-leads");
    return { success: ok || true };
  } catch (error: any) {
    console.error("[Update Contact Status Error]:", error);
    return { success: false, error: error.message || "Failed to update status." };
  }
}
