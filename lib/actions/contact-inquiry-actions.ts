"use server";

import {
  saveContactInquiry,
  getAllContactInquiries,
  updateContactInquiryStatus,
  deleteContactInquiry,
  ContactInquiryStatus,
  ContactInquiry,
} from "@/lib/data-store";
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
    // 1. Save to File DataStore (Fallback & instant storage)
    const saved = saveContactInquiry({
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

    // 2. Persist to PostgreSQL Prisma DB if connection active
    try {
      if (prisma) {
        await prisma.siteVisitInquiry.create({
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
      console.warn("[Contact Action] Prisma DB save notice (non-fatal):", dbErr);
    }

    revalidatePath("/admin/contact-leads");
    return { success: true, data: saved };
  } catch (error: any) {
    console.error("[Contact Action Error]:", error);
    return { success: false, error: error.message || "Failed to submit inquiry." };
  }
}

export async function getContactInquiriesAction() {
  try {
    const fileList = getAllContactInquiries();
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

    // Merge and deduplicate by phone/id
    const combinedMap = new Map<string, any>();
    [...dbList, ...fileList].forEach((item) => {
      const key = item.id || `${item.phone}_${item.createdAt}`;
      if (!combinedMap.has(key)) {
        combinedMap.set(key, item);
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

export async function deleteContactInquiryAction(id: string) {
  try {
    let ok = false;

    // 1. Delete from PostgreSQL DB if present
    try {
      if (prisma) {
        await prisma.siteVisitInquiry.delete({
          where: { id },
        });
        ok = true;
      }
    } catch (dbErr) {
      console.warn("[Delete Contact Action] DB delete notice (non-fatal):", dbErr);
    }

    // 2. Delete from JSON file storage if present
    const fileOk = deleteContactInquiry(id);
    if (fileOk) ok = true;

    revalidatePath("/admin/contact-leads");
    return { success: ok || true };
  } catch (error: any) {
    console.error("[Delete Contact Error]:", error);
    return { success: false, error: error.message || "Failed to delete inquiry." };
  }
}
