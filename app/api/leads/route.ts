import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, mobileNumber, pincode, monthlyBill, calculatedKw, estimatedCost, subsidyAmount } = body;

    const userPhone = mobileNumber || phone;

    if (!fullName || !userPhone || !pincode) {
      return NextResponse.json(
        { success: false, error: "Full name, phone/mobile number, and pincode are required." },
        { status: 400 }
      );
    }

    const lead = await prisma.solarQuoteRequest.create({
      data: {
        fullName: fullName.trim(),
        phone: userPhone.trim(),
        pincode: pincode.trim(),
        monthlyBill: monthlyBill ? Number(monthlyBill) : 0,
        calculatedKw: calculatedKw ? Number(calculatedKw) : 0,
        estimatedCost: estimatedCost ? Number(estimatedCost) : 0,
        subsidyAmount: subsidyAmount ? Number(subsidyAmount) : 0,
        status: "PENDING",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Solar quote lead captured successfully.",
        data: lead,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating solar quote lead:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
