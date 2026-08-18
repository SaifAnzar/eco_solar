import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAllApprovedPartners } from "@/lib/data-store";

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

    // Merge DB and File Store
    const combinedMap = new Map();
    [...filePartners, ...dbPartners].forEach((item) => {
      if (item && item.id) {
        combinedMap.set(item.id, item);
      }
    });

    let partners = Array.from(combinedMap.values()).filter((p) => p.isActive);

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
