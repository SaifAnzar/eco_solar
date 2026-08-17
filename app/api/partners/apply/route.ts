import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { savePartnershipApplication, getAllPartnerships } from "@/lib/data-store";

// POST /api/partners/apply
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const applicantName = (body.applicantName || body.fullName || "").trim();
    const businessName = (body.businessName || "").trim();
    const phone = (body.phone || body.mobileNumber || "").trim();
    const email = (body.email || body.emailAddress || "").trim();
    const location = (body.location || body.district || body.proposedCity || "").trim();
    
    // Parse ApplicationType: FRANCHISE or PARTNER
    let rawType = (body.type || body.partnerType || "FRANCHISE").toUpperCase();
    const type = rawType === "DEALERSHIP" ? "PARTNER" : (rawType === "PARTNER" ? "PARTNER" : "FRANCHISE");
    
    // Parse PartnerTier
    let tier = body.tier || null;
    if (type === "PARTNER" && !tier) {
      tier = "TIER_2_AUTHORIZED_DEALER";
    }

    const investmentRange = (body.investmentRange || body.investmentCapacity || "₹2L–₹5L").trim();
    const experience = (body.experience || body.businessExperience || "").trim();

    if (!applicantName || !phone || !email || !location) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Full Name, Phone Number, Email Address, and Location/District are required." 
        },
        { status: 400 }
      );
    }

    // Always save to file data-store for immediate resilience
    const fileRecord = savePartnershipApplication({
      type,
      tier,
      applicantName,
      businessName: businessName || undefined,
      phone,
      email,
      location,
      investmentRange,
      experience: experience || undefined,
      status: "PENDING",
    });

    let dbRecord;
    try {
      // Attempt Prisma DB insertion
      dbRecord = await (prisma as any).partnerApplication.create({
        data: {
          type,
          tier: type === "PARTNER" ? tier : null,
          applicantName,
          businessName: businessName || null,
          phone,
          email,
          location,
          investmentRange,
          experience: experience || null,
          status: "PENDING",
        },
      });
    } catch (dbError) {
      console.warn("[PartnersApply API] DB insertion notice (using file store):", dbError);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Partner application submitted successfully! Our expansion team will contact you within 24 hours.",
        data: dbRecord || fileRecord,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error submitting partner application:", error);
    return NextResponse.json(
      { success: false, error: error.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

// GET /api/partners/apply
export async function GET() {
  try {
    const jsonList = getAllPartnerships();
    let dbList: any[] = [];
    try {
      dbList = await (prisma as any).partnerApplication.findMany({
        orderBy: { createdAt: "desc" },
      });
    } catch (dbError) {
      console.warn("[PartnersApply API] DB fetch notice:", dbError);
    }
    
    // Combine both DB and JSON store records
    const combined = [...dbList, ...jsonList];
    return NextResponse.json({ success: true, data: combined });
  } catch (error: any) {
    console.error("Error fetching partner applications:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
