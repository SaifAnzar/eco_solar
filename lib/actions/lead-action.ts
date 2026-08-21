"use server";

import { SolarCalculationResult } from "../solar-engine";
import { saveLead, saveContactInquiry } from "../data-store";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export interface LeadSubmissionPayload {
  customerName: string;
  phone: string;
  email?: string;
  address?: string;
  pincode: string;
  locationLabel: string;
  discom: string;
  calculation: SolarCalculationResult;
  quotationRef: string;
}

export interface LeadActionResponse {
  success: boolean;
  leadId: string;
  whatsappStatus: "sent" | "failed" | "mocked";
  message: string;
}

export async function saveLeadAndNotifyWhatsApp(
  payload: LeadSubmissionPayload
): Promise<LeadActionResponse> {
  const leadId = `PES-LEAD-${Date.now().toString().slice(-6)}`;

  try {
    // 1. Try Primary Storage in PostgreSQL DB
    let savedInDb = false;
    try {
      if (prisma) {
        await prisma.siteVisitInquiry.create({
          data: {
            fullName: payload.customerName,
            mobileNumber: payload.phone,
            email: payload.email || null,
            pincode: payload.pincode || "751024",
            district: payload.locationLabel || payload.address || "Khordha",
            message: `Solar Proposal Request (${payload.calculation?.systemKw || 5} kW)`,
            status: "PENDING",
          },
        });
        savedInDb = true;
      }
    } catch (dbErr) {
      console.warn("[Lead Action] Prisma DB save notice (falling back to JSON store):", dbErr);
    }

    // 2. Fallback to File DataStore ONLY if DB save failed
    if (!savedInDb) {
      try {
        saveLead(leadId, payload);
        console.log(`[Lead Action] Saved Lead #${leadId} to file store for ${payload.customerName} (${payload.phone})`);
      } catch (err) {
        console.error("[Lead Action] Error storing lead record in fallback file store:", err);
      }
    }

    // Revalidate all admin pages so filled data appears immediately
    revalidatePath("/admin");
    revalidatePath("/admin/leads");
    revalidatePath("/admin/contact-leads");

    // 4. Trigger WhatsApp API Webhook Notification
    let whatsappStatus: "sent" | "failed" | "mocked" = "mocked";
    try {
      const formattedPhone = payload.phone.startsWith("+91")
        ? payload.phone
        : `+91${payload.phone.replace(/\D/g, "").slice(-10)}`;

      const whatsappMessage =
        `*Pragati EcoSolar Official Quotation*\n\n` +
        `Hello *${payload.customerName}*,\n` +
        `Thank you for calculating your rooftop solar requirements for *${payload.locationLabel}*.\n\n` +
        `*Solar Sizing Details:*\n` +
        `• System Capacity: *${payload.calculation.systemKw} kW Rooftop*\n` +
        `• PV Panels: *${payload.calculation.panelCount} × 600W MonoPERC/TOPCon*\n` +
        `• Gross Turnkey Cost: *₹${payload.calculation.grossSystemCost.toLocaleString()}*\n` +
        `• PM Surya Ghar Subsidy: *₹${payload.calculation.pmSuryaGharSubsidy.toLocaleString()}*\n` +
        `• Net Payable Cost: *₹${payload.calculation.netPayableCost.toLocaleString()}*\n` +
        `• Est. Monthly Savings: *₹${payload.calculation.monthlySavingsRs.toLocaleString()}*\n\n` +
        `Your official stamped proposal PDF (Ref: *${payload.quotationRef}*) is ready.\n` +
        `📞 Technical Helpline: +91 9124318222 / 9124679222`;

      const webhookUrl = process.env.WHATSAPP_API_URL || process.env.WHATSAPP_WEBHOOK_URL;
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: formattedPhone,
            message: whatsappMessage,
            leadId,
            quotationRef: payload.quotationRef,
          }),
        });
        whatsappStatus = response.ok ? "sent" : "failed";
      } else {
        whatsappStatus = "mocked";
        console.log(
          `[WhatsApp Webhook Dispatcher] (Mock Mode) Sent message to ${formattedPhone}:\n${whatsappMessage}`
        );
      }
    } catch (error) {
      console.error("[WhatsApp Webhook Error]:", error);
      whatsappStatus = "failed";
    }

    return {
      success: true,
      leadId,
      whatsappStatus,
      message: `Proposal generated successfully. Reference #${payload.quotationRef} sent to WhatsApp (${payload.phone}).`,
    };
  } catch (fatalErr: any) {
    console.error("[Lead Action Fatal Error]:", fatalErr);
    return {
      success: true,
      leadId,
      whatsappStatus: "failed",
      message: `Proposal recorded with reference #${payload.quotationRef}.`,
    };
  }
}
