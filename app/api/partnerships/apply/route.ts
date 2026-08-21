import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PartnershipType, ApplicationStatus } from "@prisma/client";
import { savePartnershipApplication, ApplicationType } from "@/lib/data-store";
import { getPartnershipsAction } from "@/lib/actions/partnership-actions";

// POST /api/partnerships/apply
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const type = (body.type || body.partnerType || "FRANCHISE").toUpperCase();

    if (!type || (type !== "FRANCHISE" && type !== "DEALERSHIP")) {
      return NextResponse.json(
        { error: "Invalid partnership type. Must be FRANCHISE or DEALERSHIP." },
        { status: 400 }
      );
    }

    const fullName = body.fullName || body.applicantName || body.contactPersonName;
    const phone = body.phone || body.mobileNumber;
    const email = body.email || body.emailAddress;
    const district = body.district || fontDistrict(body);
    const showroomSpaceSqFt = body.showroomSpaceSqFt || body.showroomSpace;
    const investmentCapacity = body.investmentCapacity || body.investmentRange;
    const businessExperience = body.businessExperience || body.experience || body.businessBackground;
    const notes = body.notes || "";

    if (!fullName || !phone || !email || !district) {
      return NextResponse.json(
        { error: "Full Name, Phone, Email, and District/City are required." },
        { status: 400 }
      );
    }

    const appType: ApplicationType = (type === "DEALERSHIP" || type === "PARTNER") ? "DEALERSHIP" : "FRANCHISE";

    // Primary: Try saving to Prisma DB first
    let dbRecord;
    try {
      if (type === "FRANCHISE") {
        dbRecord = await prisma.partnershipApplication.create({
          data: {
            type: PartnershipType.FRANCHISE,
            fullName,
            phone,
            email,
            district,
            notes: notes || null,
            showroomSpaceSqFt: showroomSpaceSqFt || null,
            investmentCapacity: investmentCapacity || null,
            businessExperience: businessExperience || null,
          },
        });
      } else {
        dbRecord = await prisma.partnershipApplication.create({
          data: {
            type: PartnershipType.DEALERSHIP,
            fullName,
            phone,
            email,
            district,
            notes: notes || null,
            businessName: body.businessName || null,
            gstin: body.gstin || null,
            interestedProducts: body.interestedProducts || body.productsInterested || [],
          },
        });
      }
    } catch (err) {
      console.warn("[PartnershipsApply API] DB insertion notice (falling back to JSON store):", err);
    }

    // Fallback to file data-store ONLY if DB save failed
    let record: any = dbRecord;
    if (!record) {
      record = savePartnershipApplication({
        type: appType,
        tier: appType === "DEALERSHIP" ? "TIER_2_AUTHORIZED_DEALER" : null,
        applicantName: fullName,
        businessName: body.businessName || undefined,
        phone,
        email,
        location: district,
        investmentRange: investmentCapacity || "₹2L–₹5L",
        experience: businessExperience || undefined,
        status: "PENDING",
        fullName,
        contactPersonName: body.contactPersonName || fullName,
        mobileNumber: phone,
        emailAddress: email,
        proposedCity: district,
        primaryDistrict: district,
        investmentCapacity,
        businessBackground: businessExperience,
        showroomSpace: showroomSpaceSqFt,
        gstin: body.gstin,
        productsInterested: body.interestedProducts || body.productsInterested,
      });
    }

    return NextResponse.json({ success: true, data: record }, { status: 201 });
  } catch (error: any) {
    console.error("Error in partnership application API:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

function fontDistrict(body: any): string {
  return body.location || body.proposedCity || body.primaryDistrict || "";
}

// GET /api/partnerships/apply (Used by admin panel to fetch all applications)
export async function GET() {
  try {
    const res = await getPartnershipsAction();
    if (res.success) {
      return NextResponse.json({ success: true, data: res.data });
    }
    return NextResponse.json({ success: false, error: res.error }, { status: 500 });
  } catch (error: any) {
    console.error("Error fetching partnerships:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

// PATCH /api/partnerships/apply (Used by admin panel to update status)
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Application ID and status are required." },
        { status: 400 }
      );
    }

    try {
      await prisma.partnershipApplication.update({
        where: { id },
        data: { status: status as ApplicationStatus },
      });
    } catch {}

    try {
      await (prisma as any).partnerApplication.update({
        where: { id },
        data: { status },
      });
    } catch {}

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating partnership status:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

// DELETE /api/partnerships/apply (Used by admin panel to delete applications)
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Application ID is required." }, { status: 400 });
    }

    try {
      await prisma.partnershipApplication.delete({
        where: { id },
      });
    } catch {}

    try {
      await (prisma as any).partnerApplication.delete({
        where: { id },
      });
    } catch {}

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting partnership:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
