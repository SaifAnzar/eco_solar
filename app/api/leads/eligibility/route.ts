import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  saveEligibilityLead,
  getAllEligibilityLeads,
  updateEligibilityLeadStatus,
  deleteEligibilityLead,
} from "@/lib/data-store";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { consumerNumber, fullName, phone, email, discom, roofOwnership, monthlyBill } = body;

    // Validation
    if (!consumerNumber || typeof consumerNumber !== "string" || !consumerNumber.trim()) {
      return NextResponse.json({ success: false, error: "Consumer Number (CA Number) is required." }, { status: 400 });
    }

    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json({ success: false, error: "Full Name is required." }, { status: 400 });
    }

    const cleanPhone = (phone || "").replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      return NextResponse.json({ success: false, error: "Please enter a valid 10-digit mobile number." }, { status: 400 });
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, error: "A valid email address is required." }, { status: 400 });
    }

    const payload = {
      consumerNumber: consumerNumber.trim(),
      fullName: fullName.trim(),
      phone: cleanPhone,
      email: email.trim(),
      discom: discom || "TPCODL",
      roofOwnership: roofOwnership || "OWNED",
      monthlyBill: monthlyBill || "₹2,000 - ₹4,000",
      status: "NEW",
    };

    // Save to File Store fallback
    const fileRecord = saveEligibilityLead(payload);

    // Save to Prisma DB
    let dbRecord;
    try {
      dbRecord = await (prisma as any).eligibilityLead.create({
        data: payload,
      });
    } catch (dbError) {
      console.warn("[EligibilityLead API] DB insertion notice (file store active):", dbError);
    }

    return NextResponse.json({
      success: true,
      message: "Congratulations! Your Consumer ID is pre-qualified for PM Surya Ghar Subsidy.",
      data: dbRecord || fileRecord,
    });
  } catch (error: any) {
    console.error("[EligibilityLead API Error]:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    let dbLeads: any[] = [];
    try {
      dbLeads = await (prisma as any).eligibilityLead.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (dbErr) {
      console.warn("[EligibilityLead GET] Prisma fallback to file store:", dbErr);
    }

    const fileLeads = getAllEligibilityLeads();

    // Merge DB and File Store leads seamlessly without duplicates
    const combinedMap = new Map();
    [...fileLeads, ...dbLeads].forEach((item) => {
      if (item && item.id) {
        combinedMap.set(item.id, item);
      }
    });

    const list = Array.from(combinedMap.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ success: true, leads: list });
  } catch (error: any) {
    console.error("[EligibilityLead GET Error]:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch eligibility leads" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, status, notes } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "Lead ID is required" }, { status: 400 });
    }

    updateEligibilityLeadStatus(id, status, notes);

    try {
      await (prisma as any).eligibilityLead.update({
        where: { id },
        data: { status, notes, updatedAt: new Date() },
      });
    } catch (dbErr) {
      console.warn("[EligibilityLead PATCH] Prisma update notice:", dbErr);
    }

    return NextResponse.json({ success: true, message: "Lead updated successfully" });
  } catch (error: any) {
    console.error("[EligibilityLead PATCH Error]:", error);
    return NextResponse.json({ success: false, error: "Failed to update lead" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Lead ID is required" }, { status: 400 });
    }

    deleteEligibilityLead(id);

    try {
      await (prisma as any).eligibilityLead.delete({
        where: { id },
      });
    } catch (dbErr) {
      console.warn("[EligibilityLead DELETE] Prisma delete notice:", dbErr);
    }

    return NextResponse.json({ success: true, message: "Lead deleted successfully" });
  } catch (error: any) {
    console.error("[EligibilityLead DELETE Error]:", error);
    return NextResponse.json({ success: false, error: "Failed to delete lead" }, { status: 500 });
  }
}
