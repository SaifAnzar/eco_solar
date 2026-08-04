import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PartnershipType, ApplicationStatus } from "@prisma/client";

/**
/ * GET /api/admin/partnerships
 * Query Parameters:
 *  - type?: "FRANCHISE" | "DEALERSHIP"
 *  - status?: "PENDING" | "CONTACTED" | "REVIEWED" | "APPROVED" | "REJECTED"
 *  - search?: string (matches fullName, district, phone, or email)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const typeParam = searchParams.get("type");
    const statusParam = searchParams.get("status");
    const searchParam = searchParams.get("search");

    // Build filter criteria dynamically
    const where: any = {};

    if (typeParam && Object.values(PartnershipType).includes(typeParam as PartnershipType)) {
      where.type = typeParam as PartnershipType;
    }

    if (statusParam && Object.values(ApplicationStatus).includes(statusParam as ApplicationStatus)) {
      where.status = statusParam as ApplicationStatus;
    }

    if (searchParam && searchParam.trim().length > 0) {
      const query = searchParam.trim();
      where.OR = [
        { fullName: { contains: query, mode: "insensitive" } },
        { district: { contains: query, mode: "insensitive" } },
        { phone: { contains: query, mode: "insensitive" } },
        { email: { contains: query, mode: "insensitive" } },
        { businessName: { contains: query, mode: "insensitive" } },
      ];
    }

    const applications = await prisma.partnershipApplication.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        success: true,
        count: applications.length,
        data: applications,
        applications: applications,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Admin Partnerships GET Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch partnership applications" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/partnerships
 * Body: { id: string, status: ApplicationStatus }
 */
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, error: "Application ID is required and must be a string." },
        { status: 400 }
      );
    }

    if (!status || !Object.values(ApplicationStatus).includes(status as ApplicationStatus)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid status. Must be one of: ${Object.values(ApplicationStatus).join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Check if application exists
    const existing = await prisma.partnershipApplication.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Partnership application not found." },
        { status: 404 }
      );
    }

    const updatedRecord = await prisma.partnershipApplication.update({
      where: { id },
      data: { status: status as ApplicationStatus },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Status updated successfully",
        data: updatedRecord,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Admin Partnerships PATCH Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update partnership status" },
      { status: 500 }
    );
  }
}
