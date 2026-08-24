import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  saveApprovedPartner,
  getAllApprovedPartners,
  updateApprovedPartnerRecord,
  deleteApprovedPartnerRecord,
} from "@/lib/data-store";

function getPartnerSignature(p: any): string {
  if (!p) return "";
  const type = (p.type || "").toUpperCase().trim();
  const phone = (p.phone || "").replace(/\D/g, "");
  const name = (p.name || "").toLowerCase().trim();
  const district = (p.district || "").toLowerCase().trim();
  return `${type}|${phone}|${name}|${district}`;
}

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

    // Merge DB and File Store with signature deduplication
    const idMap = new Map<string, any>();
    const sigMap = new Map<string, any>();

    // Process file partners first
    for (const item of filePartners) {
      if (item && item.id) {
        const sig = getPartnerSignature(item);
        idMap.set(item.id, item);
        if (sig && !sigMap.has(sig)) {
          sigMap.set(sig, item);
        }
      }
    }

    // Process DB partners (takes precedence)
    for (const item of dbPartners) {
      if (item && item.id) {
        const sig = getPartnerSignature(item);
        idMap.set(item.id, item);
        sigMap.set(sig, item);
      }
    }

    // Filter to unique items matching signature map values
    const uniqueIds = new Set(Array.from(sigMap.values()).map((item) => item.id));
    const partners = Array.from(idMap.values())
      .filter((item) => uniqueIds.has(item.id))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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

    let dbRecord: any = null;
    try {
      if ((prisma as any).approvedPartner) {
        dbRecord = await (prisma as any).approvedPartner.create({
          data: payload,
        });
      }
    } catch (dbErr) {
      console.warn("[Admin Network API POST] DB insertion notice:", dbErr);
    }

    // Save to file store using exact same ID if DB created it
    const fileRecord = saveApprovedPartner({
      ...payload,
      ...(dbRecord && dbRecord.id ? { id: dbRecord.id } : {}),
    } as any);

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
      if ((prisma as any).approvedPartner) {
        await (prisma as any).approvedPartner.update({
          where: { id },
          data: {
            ...updates,
            updatedAt: new Date(),
          },
        });
      }
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

    // Find record to get signature for purging legacy duplicates
    const allFilePartners = getAllApprovedPartners();
    const targetFileItem = allFilePartners.find((p) => p.id === id);
    const targetSig = targetFileItem ? getPartnerSignature(targetFileItem) : "";

    // Delete primary record from file store
    deleteApprovedPartnerRecord(id);

    // Purge any legacy duplicate file records with matching signature
    if (targetSig) {
      allFilePartners.forEach((p) => {
        if (p.id !== id && getPartnerSignature(p) === targetSig) {
          deleteApprovedPartnerRecord(p.id);
        }
      });
    }

    try {
      if ((prisma as any).approvedPartner) {
        // Delete primary record from DB
        await (prisma as any).approvedPartner.delete({
          where: { id },
        });

        // Purge legacy duplicates in DB if target info is known
        if (targetFileItem) {
          await (prisma as any).approvedPartner.deleteMany({
            where: {
              name: targetFileItem.name,
              phone: targetFileItem.phone,
              type: targetFileItem.type,
            },
          });
        }
      }
    } catch (dbErr) {
      console.warn("[Admin Network API DELETE] DB delete notice:", dbErr);
    }

    return NextResponse.json({ success: true, message: "Partner deleted successfully" });
  } catch (error: any) {
    console.error("[Admin Network API DELETE Error]:", error);
    return NextResponse.json({ success: false, error: "Failed to delete partner" }, { status: 500 });
  }
}

