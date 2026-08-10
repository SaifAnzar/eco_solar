import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export type ConsumerCategory = "RESIDENTIAL" | "COMMERCIAL_INDUSTRIAL" | "AGRICULTURAL";
export type SystemType = "ON_GRID" | "OFF_GRID" | "HYBRID" | "SOLAR_PUMP" | "STREET_LIGHTING";
export type OdishaDiscom = "TPCODL" | "TPNODL" | "TPSODL" | "TPWODL";

const VALID_DISCOMS: OdishaDiscom[] = ["TPCODL", "TPNODL", "TPSODL", "TPWODL"];
const VALID_CATEGORIES: ConsumerCategory[] = ["RESIDENTIAL", "COMMERCIAL_INDUSTRIAL", "AGRICULTURAL"];
const VALID_SYSTEM_TYPES: SystemType[] = ["ON_GRID", "OFF_GRID", "HYBRID", "SOLAR_PUMP", "STREET_LIGHTING"];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      mobileNumber,
      email,
      pincode,
      district,
      discom,
      category,
      systemType,
      monthlyBill,
      roofAreaSqFt,
      message,
    } = body;

    // Basic Input Validations
    if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: "Full Name is required." },
        { status: 400 }
      );
    }

    if (!mobileNumber || typeof mobileNumber !== "string" || !/^[0-9]{10}$/.test(mobileNumber.trim())) {
      return NextResponse.json(
        { success: false, error: "A valid 10-digit mobile number is required." },
        { status: 400 }
      );
    }

    if (!pincode || typeof pincode !== "string" || !/^[0-9]{6}$/.test(pincode.trim())) {
      return NextResponse.json(
        { success: false, error: "A valid 6-digit pincode is required." },
        { status: 400 }
      );
    }

    if (!district || typeof district !== "string" || !district.trim()) {
      return NextResponse.json(
        { success: false, error: "District is required." },
        { status: 400 }
      );
    }

    // Validate Enums if provided
    let parsedDiscom: OdishaDiscom | null = null;
    if (discom && VALID_DISCOMS.includes(discom as OdishaDiscom)) {
      parsedDiscom = discom as OdishaDiscom;
    }

    let parsedCategory: ConsumerCategory = "RESIDENTIAL";
    if (category && VALID_CATEGORIES.includes(category as ConsumerCategory)) {
      parsedCategory = category as ConsumerCategory;
    }

    let parsedSystemType: SystemType = "ON_GRID";
    if (systemType && VALID_SYSTEM_TYPES.includes(systemType as SystemType)) {
      parsedSystemType = systemType as SystemType;
    }

    // Save to PostgreSQL via Prisma Client
    const prismaClient = prisma as any;
    const newInquiry = await prismaClient.siteVisitInquiry.create({
      data: {
        fullName: fullName.trim(),
        mobileNumber: mobileNumber.trim(),
        email: email ? email.trim() : null,
        pincode: pincode.trim(),
        district: district.trim(),
        discom: parsedDiscom,
        category: parsedCategory,
        systemType: parsedSystemType,
        monthlyBill: monthlyBill ? Number(monthlyBill) : null,
        roofAreaSqFt: roofAreaSqFt ? Number(roofAreaSqFt) : null,
        message: message ? message.trim() : null,
        status: "PENDING",
      },
    });

    // Also persist to JSON file store to guarantee visibility in Admin Panel
    try {
      const { saveContactInquiry } = await import("@/lib/data-store");
      saveContactInquiry({
        fullName: fullName.trim(),
        phone: mobileNumber.trim(),
        email: email ? email.trim() : "",
        location: `${district.trim()} (Pincode: ${pincode.trim()})`,
        discomRegion: parsedDiscom || district.trim(),
        systemType: parsedSystemType,
        monthlyBill: monthlyBill ? `₹${monthlyBill}/month` : "",
        rooftopArea: roofAreaSqFt ? `${roofAreaSqFt} sq.ft` : "",
        message: message || "Site Visit Inquiry",
        inquiryType: "SITE_VISIT",
      });
    } catch (fsErr) {
      console.warn("[Inquiries Route] File store sync notice:", fsErr);
    }

    return NextResponse.json(
      {
        success: true,
        message: "Site visit & quote inquiry booked successfully. Our team will contact you within 24 hours.",
        data: newInquiry,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating site visit inquiry:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const district = searchParams.get("district");
    const mobileNumber = searchParams.get("mobileNumber");

    const whereClause: any = {};
    if (district) whereClause.district = district;
    if (mobileNumber) whereClause.mobileNumber = mobileNumber;

    const prismaClient = prisma as any;
    const inquiries = await prismaClient.siteVisitInquiry.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({
      success: true,
      count: inquiries.length,
      data: inquiries,
    });
  } catch (error: any) {
    console.error("Error fetching site visit inquiries:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
