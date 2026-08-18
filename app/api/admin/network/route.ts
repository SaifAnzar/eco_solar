import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  saveApprovedPartner,
  getAllApprovedPartners,
  updateApprovedPartnerRecord,
  deleteApprovedPartnerRecord,
} from "@/lib/data-store";

export async function GET() {
  try {
    let dbPartners: any[] = [];
    try {
      if ((prisma as any).approvedPartner) {
        dbPartners = await (prisma as any).approvedPartner.findMany({
          orderBy: { createdAt: "desc" },
        });
      }
    } catch (dbErr) {
      console.warn("[Admin Network API GET] DB fallback to file store:", dbErr);
    }

    const filePartners = getAllApprovedPartners();

    // Merge DB and File Store
    const combinedMap = new Map();
    [...filePartners, ...dbPartners].forEach((item) => {
      if (item && item.id) {
        combinedMap.set(item.id, item);
      }
    });

    const partners = Array.from(combinedMap.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json({ success: true, partners });
  } catch (error: any) {
    console.error("[Admin Network API GET Error]:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch admin network partners" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, name, contactPerson, phone, email, district, fullAddress, pincode, googleMapUrl, isActive } = body;

    if (!type || !name || !phone || !district || !fullAddress) {
      return NextResponse.json(
        { success: false, error: "Required fields missing (type, name, phone, district, fullAddress)" },
        { status: 400 }
      );
    }

    const payload = {
      type: type === "FRANCHISE" ? "FRANCHISE" : "DEALER",
      name: name.trim(),
      contactPerson: contactPerson ? contactPerson.trim() : null,
      phone: phone.trim(),
      email: email ? email.trim() : null,
      district: district.trim(),
      fullAddress: fullAddress.trim(),
      pincode: pincode ? pincode.trim() : null,
      googleMapUrl: googleMapUrl ? googleMapUrl.trim() : null,
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    };

    const fileRecord = saveApprovedPartner(payload as any);

    let dbRecord;
    try {
      dbRecord = await (prisma as any).approvedPartner.create({
        data: payload,
      });
    } catch (dbErr) {
      console.warn("[Admin Network API POST] DB insertion notice:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Partner added successfully",
      partner: dbRecord || fileRecord,
    });
  } catch (error: any) {
    console.error("[Admin Network API POST Error]:", error);
    return NextResponse.json({ success: false, error: "Failed to create partner" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: "Partner ID is required" }, { status: 400 });
    }

    updateApprovedPartnerRecord(id, updates);

    try {
      await (prisma as any).approvedPartner.update({
        where: { id },
        data: {
          ...updates,
          updatedAt: new Date(),
        },
      });
    } catch (dbErr) {
      console.warn("[Admin Network API PATCH] DB update notice:", dbErr);
    }

    return NextResponse.json({ success: true, message: "Partner updated successfully" });
  } catch (error: any) {
    console.error("[Admin Network API PATCH Error]:", error);
    return NextResponse.json({ success: false, error: "Failed to update partner" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Partner ID is required" }, { status: 400 });
    }

    deleteApprovedPartnerRecord(id);

    try {
      await (prisma as any).approvedPartner.delete({
        where: { id },
      });
    } catch (dbErr) {
      console.warn("[Admin Network API DELETE] DB delete notice:", dbErr);
    }

    return NextResponse.json({ success: true, message: "Partner deleted successfully" });
  } catch (error: any) {
    console.error("[Admin Network API DELETE Error]:", error);
    return NextResponse.json({ success: false, error: "Failed to delete partner" }, { status: 500 });
  }
}
