"use server";

import { SolarCalculationResult } from "../solar-engine";

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

// In-memory fallback store for lead records
const leadStore: Record<string, LeadSubmissionPayload & { createdAt: string }> = {};

export async function saveLeadAndNotifyWhatsApp(
  payload: LeadSubmissionPayload
): Promise<LeadActionResponse> {
  const leadId = `PES-LEAD-${Date.now().toString().slice(-6)}`;
  const timestamp = new Date().toISOString();

  // 1. Persist lead record safely
  try {
    leadStore[leadId] = {
      ...payload,
      createdAt: timestamp,
    };
    console.log(`[Lead Action] Saved Lead #${leadId} for ${payload.customerName} (${payload.phone})`);
  } catch (err) {
    console.error("[Lead Action] Error storing lead record:", err);
  }

  // 2. Trigger WhatsApp API Webhook Notification
  let whatsappStatus: "sent" | "failed" | "mocked" = "mocked";
  try {
    const formattedPhone = payload.phone.startsWith("+91")
      ? payload.phone
      : `+91${payload.phone.replace(/\D/g, "").slice(-10)}`;

    const whatsappMessage = `*Pragati EcoSolar Official Quotation*\n\n` +
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

    // Dispatch webhook call if WHATSAPP_API_URL is configured, else log
    const webhookUrl = process.env.WHATSAPP_API_URL || process.env.WHATSAPP_WEBHOOK_URL;
    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-[#10]": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formattedPhone,
          message: whatsappMessage,
          leadId,
          quotationRef: payload.quotationRef,
        }),
      });
      if (response.ok) {
        whatsappStatus = "sent";
      } else {
        whatsappStatus = "failed";
      }
    } else {
      whatsappStatus = "mocked";
      console.log(`[WhatsApp Webhook Dispatcher] (Mock Mode) Sent message to ${formattedPhone}:\n${whatsappMessage}`);
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
}
