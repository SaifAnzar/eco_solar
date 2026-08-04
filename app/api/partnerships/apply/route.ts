import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PartnershipType, ApplicationStatus } from "@prisma/client";

// POST /api/partnerships/apply
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;

    if (!type || (type !== "FRANCHISE" && type !== "DEALERSHIP")) {
      return NextResponse.json(
        { error: "Invalid partnership type. Must be FRANCHISE or DEALERSHIP." },
        { status: 400 }
      );
    }

    if (type === "FRANCHISE") {
      const fullName = body.fullName || body.contactPersonName;
      const phone = body.phone || body.mobileNumber;
      const email = body.email || body.emailAddress;
      const district = body.district || body.proposedCity || body.primaryDistrict;
      const showroomSpaceSqFt = body.showroomSpaceSqFt || body.showroomSpace;
      const investmentCapacity = body.investmentCapacity;
      const businessExperience = body.businessExperience || body.businessBackground;
      const notes = body.notes || "";

      if (!fullName || !phone || !email || !district) {
        return NextResponse.json(
          { error: "Full Name, Phone, Email, and District/City are required for Franchise application." },
          { status: 400 }
        );
      }

      const application = await prisma.partnershipApplication.create({
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

      return NextResponse.json({ success: true, data: application }, { status: 201 });
    } else {
      // DEALERSHIP
      const fullName = body.fullName || body.contactPersonName;
      const phone = body.phone || body.mobileNumber;
      const email = body.email || body.emailAddress;
      const district = body.district || body.primaryDistrict || body.proposedCity;
      const businessName = body.businessName;
      const gstin = body.gstin;
      const interestedProducts = body.interestedProducts || body.productsInterested || [];
      const notes = body.notes || "";

      if (!fullName || !phone || !email || !district) {
        return NextResponse.json(
          { error: "Contact Name, Phone, Email, and District are required for Dealership application." },
          { status: 400 }
        );
      }

      const application = await prisma.partnershipApplication.create({
        data: {
          type: PartnershipType.DEALERSHIP,
          fullName,
          phone,
          email,
          district,
          notes: notes || null,
          businessName: businessName || null,
          gstin: gstin || null,
          interestedProducts,
        },
      });

      return NextResponse.json({ success: true, data: application }, { status: 201 });
    }
  } catch (error: any) {
    console.error("Error in partnership application API:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

// GET /api/partnerships/apply (Used by admin panel to fetch all applications)
export async function GET() {
  try {
    const list = await prisma.partnershipApplication.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: list });
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

    const validStatuses: ApplicationStatus[] = ["PENDING", "CONTACTED", "REVIEWED", "APPROVED", "REJECTED"];
    if (!validStatuses.includes(status as ApplicationStatus)) {
      return NextResponse.json(
        { error: "Invalid status value." },
        { status: 400 }
      );
    }

    const updated = await prisma.partnershipApplication.update({
      where: { id },
      data: { status: status as ApplicationStatus },
    });

    return NextResponse.json({ success: true, data: updated });
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

    await prisma.partnershipApplication.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting partnership:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
