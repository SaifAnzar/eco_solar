"use server";

import {
  getAllPartnerships,
  updatePartnershipStatus,
  deletePartnership,
  PartnershipStatus,
} from "@/lib/data-store";
import { revalidatePath } from "next/cache";

export async function getPartnershipsAction() {
  try {
    const list = getAllPartnerships();
    return { success: true, data: list };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updatePartnershipStatusAction(id: string, status: PartnershipStatus) {
  try {
    const ok = updatePartnershipStatus(id, status);
    revalidatePath("/admin/partnerships");
    return { success: ok };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deletePartnershipAction(id: string) {
  try {
    const ok = deletePartnership(id);
    revalidatePath("/admin/partnerships");
    return { success: ok };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
