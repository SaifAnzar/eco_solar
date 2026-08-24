"use server";

import prisma from "@/lib/prisma";
import { ApplicationStatus } from "@prisma/client";

export interface CreateSolarQuoteInput {
  fullName: string;
  phone: string;
  pincode: string;
  monthlyBill: number;
  calculatedKw: number;
  estimatedCost: number;
  subsidyAmount: number;
}

export async function createSolarQuoteRequest(input: CreateSolarQuoteInput) {
  try {
    const quoteRequest = await prisma.solarQuoteRequest.create({
      data: {
        fullName: input.fullName,
        phone: input.phone,
        pincode: input.pincode,
        monthlyBill: input.monthlyBill,
        calculatedKw: input.calculatedKw,
        estimatedCost: input.estimatedCost,
        subsidyAmount: input.subsidyAmount,
      },
    });

    return { success: true, data: quoteRequest };
  } catch (error: any) {
    console.error("[Solar Quote Action Error]:", error);
    return { success: false, error: error.message || "Failed to create quote request" };
  }
}

export async function getSolarQuoteRequests() {
  try {
    const quoteRequests = await prisma.solarQuoteRequest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: quoteRequests };
  } catch (error: any) {
    console.error("[Get Solar Quotes Error]:", error);
    return { success: false, error: error.message || "Failed to fetch quote requests" };
  }
}

export async function updateSolarQuoteStatusAction(id: string, status: ApplicationStatus) {
  try {
    const updated = await prisma.solarQuoteRequest.update({
      where: { id },
      data: { status },
    });
    return { success: true, data: updated };
  } catch (error: any) {
    console.error("[Update Solar Quote Status Error]:", error);
    return { success: false, error: error.message || "Failed to update quote status" };
  }
}

export async function deleteSolarQuoteRequestAction(id: string) {
  try {
    let targetPhone: string | null = null;
    if (prisma) {
      try {
        const item = await prisma.solarQuoteRequest.findUnique({ where: { id } });
        if (item?.phone) targetPhone = item.phone;
        await prisma.solarQuoteRequest.delete({ where: { id } }).catch(() => {});
      } catch (e) {
        console.warn("[Delete Quote Action] DB notice:", e);
      }
    }

    const { deleteLeadByPhone, deleteContactInquiryByPhone, deleteLead, deleteContactInquiry } = await import(
      "@/lib/data-store"
    );
    deleteLead(id);
    deleteContactInquiry(id);

    if (targetPhone) {
      const cleanPhone = targetPhone.replace(/\D/g, "");
      if (cleanPhone && prisma) {
        try {
          await prisma.solarQuoteRequest.deleteMany({
            where: { phone: { contains: cleanPhone } },
          });
          await prisma.siteVisitInquiry.deleteMany({
            where: { mobileNumber: { contains: cleanPhone } },
          });
        } catch (e) {
          console.warn("[Delete Quote Action] DB purge notice:", e);
        }
      }
      deleteLeadByPhone(targetPhone);
      deleteContactInquiryByPhone(targetPhone);
    }

    return { success: true };
  } catch (error: any) {
    console.error("[Delete Solar Quote Error]:", error);
    return { success: false, error: error.message || "Failed to delete quote request" };
  }
}

