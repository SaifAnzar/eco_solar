import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ApplicationStatus } from "@prisma/client";

/**
 * GET /api/admin/quotes
 * Query Parameters:
 *  - status?: "PENDING" | "CONTACTED" | "REVIEWED" | "APPROVED" | "REJECTED"
 *  - search?: string (matches fullName, phone, or pincode)
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const statusParam = searchParams.get("status");
    const searchParam = searchParams.get("search");

    const where: any = {};

    if (statusParam && Object.values(ApplicationStatus).includes(statusParam as ApplicationStatus)) {
      where.status = statusParam as ApplicationStatus;
    }

    if (searchParam && searchParam.trim().length > 0) {
      const query = searchParam.trim();
      where.OR = [
        { fullName: { contains: query, mode: "insensitive" } },
        { phone: { contains: query, mode: "insensitive" } },
        { pincode: { contains: query, mode: "insensitive" } },
      ];
    }

    const quotes = await prisma.solarQuoteRequest.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(
      {
        success: true,
        count: quotes.length,
        data: quotes,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Admin Quotes GET Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch solar quote requests" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/admin/quotes
 * Body: { id: string, status: ApplicationStatus }
 */
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, error: "Quote ID is required and must be a string." },
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

    const existing = await prisma.solarQuoteRequest.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Solar quote request not found." },
        { status: 404 }
      );
    }

    const updatedQuote = await prisma.solarQuoteRequest.update({
      where: { id },
      data: { status: status as ApplicationStatus },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Quote status updated successfully",
        data: updatedQuote,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[Admin Quotes PATCH Error]:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update quote status" },
      { status: 500 }
    );
  }
}
