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

    // Save to Prisma DB first as primary storage
    let record;
    try {
      if ((prisma as any).eligibilityLead) {
        record = await (prisma as any).eligibilityLead.create({
          data: payload,
        });
      }
    } catch (dbError) {
      console.warn("[EligibilityLead API] DB insertion notice (falling back to file store):", dbError);
    }

    // Fallback to File Store ONLY if DB save did not occur
    if (!record) {
      record = saveEligibilityLead(payload);
    }

    return NextResponse.json({
      success: true,
      message: "Congratulations! Your Consumer ID is pre-qualified for PM Surya Ghar Subsidy.",
      data: record,
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
      if ((prisma as any).eligibilityLead) {
        dbLeads = await (prisma as any).eligibilityLead.findMany({
          orderBy: { createdAt: "desc" },
        });
      }
    } catch (dbErr) {
      console.warn("[EligibilityLead GET] Prisma fallback to file store:", dbErr);
    }

    const fileLeads = getAllEligibilityLeads();

    // Smart deduplication: Merge DB and File Store leads seamlessly
    const combinedMap = new Map();
    const existingCompositeKeys = new Set();

    dbLeads.forEach((item) => {
      if (item && item.id) {
        combinedMap.set(item.id, item);
        const compKey = `${(item.consumerNumber || "").trim()}_${(item.phone || "").trim()}`;
        if (compKey !== "_") existingCompositeKeys.add(compKey);
      }
    });

    fileLeads.forEach((item) => {
      if (item && item.id) {
        const compKey = `${(item.consumerNumber || "").trim()}_${(item.phone || "").trim()}`;
        // Avoid adding duplicate file record if DB record or identical composite key exists
        if (!combinedMap.has(item.id) && !existingCompositeKeys.has(compKey)) {
          combinedMap.set(item.id, item);
          if (compKey !== "_") existingCompositeKeys.add(compKey);
        }
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

    let targetPhone: string | null = null;
    let targetConsumerNumber: string | null = null;

    try {
      if ((prisma as any).eligibilityLead) {
        const item = await (prisma as any).eligibilityLead.findUnique({ where: { id } });
        if (item) {
          targetPhone = item.phone || null;
          targetConsumerNumber = item.consumerNumber || null;
        }
      }
    } catch {}

    if (!targetPhone && !targetConsumerNumber) {
      const fileLeads = getAllEligibilityLeads();
      const item = fileLeads.find((l) => l.id === id);
      if (item) {
        targetPhone = item.phone || null;
        targetConsumerNumber = item.consumerNumber || null;
      }
    }

    deleteEligibilityLead(id);

    try {
      if ((prisma as any).eligibilityLead) {
        await (prisma as any).eligibilityLead.delete({
          where: { id },
        }).catch(() => {});
      }
    } catch (dbErr) {
      console.warn("[EligibilityLead DELETE] Prisma delete notice:", dbErr);
    }

    if (targetPhone || targetConsumerNumber) {
      const cleanPhone = (targetPhone || "").replace(/\D/g, "");
      const cleanCa = (targetConsumerNumber || "").trim();

      const orConditions: any[] = [];
      if (cleanPhone) orConditions.push({ phone: { contains: cleanPhone } });
      if (cleanCa) orConditions.push({ consumerNumber: { equals: cleanCa } });

      if (orConditions.length > 0) {
        try {
          if ((prisma as any).eligibilityLead) {
            await (prisma as any).eligibilityLead.deleteMany({
              where: { OR: orConditions },
            });
          }
        } catch {}
      }

      const { deleteEligibilityLeadByPhone } = await import("@/lib/data-store");
      deleteEligibilityLeadByPhone(targetPhone || "", targetConsumerNumber || "");
    }

    return NextResponse.json({ success: true, message: "Lead deleted successfully in 1 attempt" });
  } catch (error: any) {
    console.error("[EligibilityLead DELETE Error]:", error);
    return NextResponse.json({ success: false, error: "Failed to delete lead" }, { status: 500 });
  }
}

