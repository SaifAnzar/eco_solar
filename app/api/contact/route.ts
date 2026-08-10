import { NextRequest, NextResponse } from "next/server";
import {
  saveContactInquiry,
  getAllContactInquiries,
  updateContactInquiryStatus,
  deleteContactInquiry,
  ContactInquiryStatus,
} from "@/lib/data-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      phone,
      email,
      location,
      discomRegion,
      systemType,
      monthlyBill,
      rooftopArea,
      message,
    } = body;

    if (!fullName || !phone || !location) {
      return NextResponse.json(
        { error: "Full Name, Phone Number, and Location are required." },
        { status: 400 }
      );
    }

    const inquiry = saveContactInquiry({
      fullName,
      phone,
      email: email || "",
      location,
      discomRegion: discomRegion || "",
      systemType: systemType || "residential",
      monthlyBill: monthlyBill || "",
      rooftopArea: rooftopArea || "",
      message: message || "",
      inquiryType: body.inquiryType || (message?.includes("SITE VISIT") ? "SITE_VISIT" : "GENERAL_CONTACT"),
    });

    return NextResponse.json({ success: true, inquiry }, { status: 201 });
  } catch (error: any) {
    console.error("[API Contact Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit contact inquiry." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const inquiries = getAllContactInquiries();
    return NextResponse.json({ success: true, inquiries }, { status: 200 });
  } catch (error: any) {
    console.error("[API Contact GET Error]:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact inquiries." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Inquiry ID and status are required." },
        { status: 400 }
      );
    }

    const validStatuses: ContactInquiryStatus[] = ["NEW", "CONTACTED", "RESOLVED"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value." },
        { status: 400 }
      );
    }

    const updated = updateContactInquiryStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { error: "Inquiry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, id, status });
  } catch (error: any) {
    console.error("[API Contact PATCH Error]:", error);
    return NextResponse.json(
      { error: "Failed to update inquiry status." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Inquiry ID is required." },
        { status: 400 }
      );
    }

    const deleted = deleteContactInquiry(id);
    if (!deleted) {
      return NextResponse.json(
        { error: "Inquiry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("[API Contact DELETE Error]:", error);
    return NextResponse.json(
      { error: "Failed to delete inquiry." },
      { status: 500 }
    );
  }
}
