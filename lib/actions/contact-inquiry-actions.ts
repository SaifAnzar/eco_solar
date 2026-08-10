"use server";

import {
  getAllContactInquiries,
  updateContactInquiryStatus,
  deleteContactInquiry,
  ContactInquiryStatus,
} from "@/lib/data-store";
import { revalidatePath } from "next/cache";

export async function getContactInquiriesAction() {
  try {
    const list = getAllContactInquiries();
    return { success: true, data: list };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateContactInquiryStatusAction(id: string, status: ContactInquiryStatus) {
  try {
    const ok = updateContactInquiryStatus(id, status);
    revalidatePath("/admin/contact-leads");
    return { success: ok };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteContactInquiryAction(id: string) {
  try {
    const ok = deleteContactInquiry(id);
    revalidatePath("/admin/contact-leads");
    return { success: ok };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
