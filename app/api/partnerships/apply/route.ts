import { NextRequest, NextResponse } from "next/server";
import {
  savePartnershipApplication,
  getAllPartnerships,
  updatePartnershipStatus,
  deletePartnership,
  PartnershipType,
  PartnershipStatus
} from "@/lib/data-store";

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
      const {
        fullName,
        mobileNumber,
        emailAddress,
        proposedCity,
        showroomSpace,
        investmentCapacity,
        businessBackground
      } = body;

      if (!fullName || !mobileNumber || !emailAddress || !proposedCity) {
        return NextResponse.json(
          { error: "Full Name, Mobile, Email, and Proposed City are required for Franchise." },
          { status: 400 }
        );
      }

      const application = savePartnershipApplication({
        type,
        fullName,
        mobileNumber,
        emailAddress,
        proposedCity,
        showroomSpace: showroomSpace || "",
        investmentCapacity: investmentCapacity || "",
        businessBackground: businessBackground || ""
      });

      return NextResponse.json({ success: true, data: application }, { status: 201 });
    } else {
      // DEALERSHIP
      const {
        businessName,
        contactPersonName,
        mobileNumber,
        emailAddress,
        gstin,
        primaryDistrict,
        productsInterested
      } = body;

      if (!businessName || !contactPersonName || !mobileNumber || !emailAddress || !primaryDistrict) {
        return NextResponse.json(
          { error: "Business Name, Contact Person, Mobile, Email, and Primary District are required for Dealership." },
          { status: 400 }
        );
      }

      const application = savePartnershipApplication({
        type,
        businessName,
        contactPersonName,
        mobileNumber,
        emailAddress,
        gstin: gstin || "",
        primaryDistrict,
        productsInterested: productsInterested || []
      });

      return NextResponse.json({ success: true, data: application }, { status: 201 });
    }
  } catch (error: any) {
    console.error("Error in partnership application API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// GET /api/partnerships/apply (Used by admin panel to fetch all applications)
export async function GET() {
  try {
    const list = getAllPartnerships();
    return NextResponse.json({ success: true, data: list });
  } catch (error) {
    console.error("Error fetching partnerships:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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

    const validStatuses: PartnershipStatus[] = ["PENDING", "CONTACTED", "APPROVED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value." },
        { status: 400 }
      );
    }

    const updated = updatePartnershipStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { error: "Application not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating partnership status:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
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

    const deleted = deletePartnership(id);
    if (!deleted) {
      return NextResponse.json({ error: "Application not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting partnership:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
