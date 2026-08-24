import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAllApprovedPartners } from "@/lib/data-store";

function getPartnerSignature(p: any): string {
  if (!p) return "";
  const type = (p.type || "").toUpperCase().trim();
  const phone = (p.phone || "").replace(/\D/g, "");
  const name = (p.name || "").toLowerCase().trim();
  const district = (p.district || "").toLowerCase().trim();
  return `${type}|${phone}|${name}|${district}`;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const typeParam = searchParams.get("type"); // FRANCHISE or DEALER
    const districtParam = searchParams.get("district");

    let dbPartners: any[] = [];
    try {
      const whereClause: any = { isActive: true };
      if (typeParam === "FRANCHISE" || typeParam === "DEALER") {
        whereClause.type = typeParam;
      }
      if (districtParam && districtParam !== "ALL") {
        whereClause.district = districtParam;
      }

      if ((prisma as any).approvedPartner) {
        dbPartners = await (prisma as any).approvedPartner.findMany({
          where: whereClause,
          orderBy: { createdAt: "desc" },
        });
      }
    } catch (dbErr) {
      console.warn("[Network API GET] DB fallback to file store:", dbErr);
    }

    const filePartners = getAllApprovedPartners().filter((p) => p.isActive);

    // Merge DB and File Store with signature deduplication
    const idMap = new Map<string, any>();
    const sigMap = new Map<string, any>();

    for (const item of filePartners) {
      if (item && item.id && item.isActive) {
        const sig = getPartnerSignature(item);
        idMap.set(item.id, item);
        if (sig && !sigMap.has(sig)) {
          sigMap.set(sig, item);
        }
      }
    }

    for (const item of dbPartners) {
      if (item && item.id && item.isActive) {
        const sig = getPartnerSignature(item);
        idMap.set(item.id, item);
        sigMap.set(sig, item);
      }
    }

    const uniqueIds = new Set(Array.from(sigMap.values()).map((item) => item.id));
    let partners = Array.from(idMap.values())
      .filter((item) => item.isActive && uniqueIds.has(item.id))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (typeParam === "FRANCHISE" || typeParam === "DEALER") {
      partners = partners.filter((p) => p.type === typeParam);
    }
    if (districtParam && districtParam !== "ALL") {
      partners = partners.filter(
        (p) => (p.district || "").toLowerCase() === districtParam.toLowerCase()
      );
    }

    return NextResponse.json({ success: true, partners });
  } catch (error: any) {
    console.error("[Network API GET Error]:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch partners" }, { status: 500 });
  }
}

