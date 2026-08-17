"use server";

import prisma from "@/lib/prisma";
import {
  getAllPartnerships,
  updatePartnershipStatus,
  deletePartnership,
  ApplicationStatus,
  PartnerApplication,
} from "@/lib/data-store";
import { revalidatePath } from "next/cache";

export async function getPartnershipsAction() {
  try {
    const jsonList = getAllPartnerships();
    let partnerAppList: any[] = [];
    let legacyAppList: any[] = [];

    try {
      partnerAppList = await (prisma as any).partnerApplication.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (err) {
      console.warn("[PartnershipActions] DB fetch partnerApplication notice:", err);
    }

    try {
      legacyAppList = await (prisma as any).partnershipApplication.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (err) {
      console.warn("[PartnershipActions] DB fetch partnershipApplication notice:", err);
    }

    const combined: PartnerApplication[] = [];
    const seenIds = new Set<string>();

    // 1. Process PartnerApplication DB records
    for (const item of partnerAppList) {
      if (item.id && !seenIds.has(item.id)) {
        seenIds.add(item.id);
        combined.push({
          id: item.id,
          type: item.type || "FRANCHISE",
          tier: item.tier || null,
          applicantName: item.applicantName || "N/A",
          businessName: item.businessName || null,
          phone: item.phone || "N/A",
          email: item.email || "N/A",
          location: item.location || "N/A",
          investmentRange: item.investmentRange || "N/A",
          experience: item.experience || null,
          status: item.status || "PENDING",
          notes: item.notes || null,
          createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : String(item.createdAt),
          updatedAt: item.updatedAt instanceof Date ? item.updatedAt.toISOString() : String(item.updatedAt || item.createdAt),
          // Fallbacks for UI
          fullName: item.applicantName || "N/A",
          mobileNumber: item.phone || "N/A",
          emailAddress: item.email || "N/A",
          proposedCity: item.location || "N/A",
          primaryDistrict: item.location || "N/A",
          investmentCapacity: item.investmentRange || "N/A",
          businessBackground: item.experience || undefined,
        });
      }
    }

    // 2. Process legacy PartnershipApplication DB records
    for (const item of legacyAppList) {
      if (item.id && !seenIds.has(item.id)) {
        seenIds.add(item.id);
        const legacyType = item.type === "DEALERSHIP" ? "PARTNER" : "FRANCHISE";
        combined.push({
          id: item.id,
          type: legacyType as any,
          tier: legacyType === "PARTNER" ? "TIER_2_AUTHORIZED_DEALER" : null,
          applicantName: item.fullName || "N/A",
          businessName: item.businessName || null,
          phone: item.phone || "N/A",
          email: item.email || "N/A",
          location: item.district || "N/A",
          investmentRange: item.investmentCapacity || "N/A",
          experience: item.businessExperience || item.notes || null,
          status: (item.status || "PENDING") as any,
          notes: item.notes || null,
          createdAt: item.createdAt instanceof Date ? item.createdAt.toISOString() : String(item.createdAt),
          updatedAt: item.updatedAt instanceof Date ? item.updatedAt.toISOString() : String(item.updatedAt || item.createdAt),
          // Fallbacks
          fullName: item.fullName || "N/A",
          mobileNumber: item.phone || "N/A",
          emailAddress: item.email || "N/A",
          proposedCity: item.district || "N/A",
          primaryDistrict: item.district || "N/A",
          investmentCapacity: item.investmentCapacity || "N/A",
          businessBackground: item.businessExperience || item.notes || undefined,
          showroomSpace: item.showroomSpaceSqFt || undefined,
        });
      }
    }

    // 3. Process JSON file records
    for (const item of jsonList) {
      if (item.id && !seenIds.has(item.id)) {
        seenIds.add(item.id);
        combined.push(item);
      }
    }

    // Sort by createdAt descending
    combined.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return { success: true, data: combined };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updatePartnershipStatusAction(
  id: string,
  status: ApplicationStatus,
  notes?: string
) {
  try {
    let ok = false;

    // 1. Try updating in partnerApplication
    try {
      await (prisma as any).partnerApplication.update({
        where: { id },
        data: {
          status,
          ...(notes !== undefined ? { notes } : {}),
        },
      });
      ok = true;
    } catch {}

    // 2. Try updating in legacy partnershipApplication
    try {
      await (prisma as any).partnershipApplication.update({
        where: { id },
        data: {
          status,
          ...(notes !== undefined ? { notes } : {}),
        },
      });
      ok = true;
    } catch {}

    // 3. Try updating in JSON data store
    const fileOk = updatePartnershipStatus(id, status, notes);
    if (fileOk) ok = true;

    revalidatePath("/admin/partnerships");
    return { success: ok };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deletePartnershipAction(id: string) {
  try {
    let ok = false;

    // 1. Try deleting from partnerApplication
    try {
      await (prisma as any).partnerApplication.delete({
        where: { id },
      });
      ok = true;
    } catch {}

    // 2. Try deleting from partnershipApplication
    try {
      await (prisma as any).partnershipApplication.delete({
        where: { id },
      });
      ok = true;
    } catch {}

    // 3. Try deleting from data store
    const fileOk = deletePartnership(id);
    if (fileOk) ok = true;

    revalidatePath("/admin/partnerships");
    return { success: ok };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
