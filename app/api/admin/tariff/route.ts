import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { DEFAULT_ODISHA_TARIFF, TariffConfigData } from "@/lib/solar-calculations";

export async function GET() {
  try {
    const db = prisma as any;
    const config = await db.tariffConfig.findUnique({
      where: { category: "ODISHA_DOMESTIC_LT" },
    });

    if (!config) {
      // Fallback default Odisha 2026-27 OERC configuration
      return NextResponse.json({
        success: true,
        tariff: DEFAULT_ODISHA_TARIFF,
        isDefaultFallback: true,
      });
    }

    return NextResponse.json({
      success: true,
      tariff: {
        id: config.id,
        category: config.category,
        slabs: typeof config.slabs === "string" ? JSON.parse(config.slabs) : config.slabs,
        dutyRate: config.dutyRate,
        fixedRatePerKw: config.fixedRatePerKw,
        basePricePerKw: config.basePricePerKw,
        subsidyCap: config.subsidyCap,
        updatedAt: config.updatedAt,
      },
      isDefaultFallback: false,
    });
  } catch (error: any) {
    console.error("[API Tariff GET Error]:", error);
    // Return fallback constants on database connection error
    return NextResponse.json({
      success: true,
      tariff: DEFAULT_ODISHA_TARIFF,
      isDefaultFallback: true,
      error: error.message,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, slabs, dutyRate, fixedRatePerKw, basePricePerKw, subsidyCap } = body;

    const cat = category || "ODISHA_DOMESTIC_LT";

    if (!Array.isArray(slabs) || slabs.length === 0) {
      return NextResponse.json(
        { error: "At least one valid tariff slab is required." },
        { status: 400 }
      );
    }

    // Validate slabs
    for (const slab of slabs) {
      if (typeof slab.rate !== "number" || isNaN(slab.rate) || slab.rate < 0) {
        return NextResponse.json(
          { error: "All slab rates must be valid non-negative numbers." },
          { status: 400 }
        );
      }
    }

    const db = prisma as any;
    const updated = await db.tariffConfig.upsert({
      where: { category: cat },
      update: {
        slabs: slabs,
        dutyRate: typeof dutyRate === "number" ? dutyRate : 0.06,
        fixedRatePerKw: typeof fixedRatePerKw === "number" ? fixedRatePerKw : 20.0,
        basePricePerKw: typeof basePricePerKw === "number" ? basePricePerKw : 75000.0,
        subsidyCap: typeof subsidyCap === "number" ? subsidyCap : 78000.0,
      },
      create: {
        category: cat,
        slabs: slabs,
        dutyRate: typeof dutyRate === "number" ? dutyRate : 0.06,
        fixedRatePerKw: typeof fixedRatePerKw === "number" ? fixedRatePerKw : 20.0,
        basePricePerKw: typeof basePricePerKw === "number" ? basePricePerKw : 75000.0,
        subsidyCap: typeof subsidyCap === "number" ? subsidyCap : 78000.0,
      },
    });

    return NextResponse.json({
      success: true,
      tariff: {
        id: updated.id,
        category: updated.category,
        slabs: typeof updated.slabs === "string" ? JSON.parse(updated.slabs) : updated.slabs,
        dutyRate: updated.dutyRate,
        fixedRatePerKw: updated.fixedRatePerKw,
        basePricePerKw: updated.basePricePerKw,
        subsidyCap: updated.subsidyCap,
        updatedAt: updated.updatedAt,
      },
      message: "Tariff configuration updated successfully.",
    });
  } catch (error: any) {
    console.error("[API Tariff POST Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update tariff configuration." },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  return POST(req);
}
