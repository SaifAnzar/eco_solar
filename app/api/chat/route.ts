import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { saveContactInquiry } from "@/lib/data-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, leadData } = body;

    // Handle Lead Submission if Lead Data is provided
    if (leadData && (leadData.fullName || leadData.mobileNumber)) {
      const fullName = leadData.fullName || "Live Chat Visitor";
      const mobileNumber = leadData.mobileNumber || "";
      const pincode = leadData.pincode || "751024";
      const district = leadData.district || "Bhubaneswar";
      const noteMessage = leadData.message || message || "Captured via Live Chat Widget";

      // 1. Persist in Prisma PostgreSQL DB (if DB available)
      try {
        await prisma.siteVisitInquiry.create({
          data: {
            fullName,
            mobileNumber,
            pincode,
            district,
            category: "RESIDENTIAL",
            systemType: "ON_GRID",
            message: noteMessage,
            status: "PENDING",
          },
        });
      } catch (dbErr) {
        console.warn("[Chat API] Prisma DB fallback active:", dbErr);
      }

      // 2. Persist in data-store JSON backup
      try {
        saveContactInquiry({
          fullName,
          phone: mobileNumber,
          email: "",
          location: `${district} (${pincode})`,
          discomRegion: "TPCODL",
          systemType: "residential",
          monthlyBill: "",
          rooftopArea: "",
          message: noteMessage,
          inquiryType: "LIVE_CHAT",
        });
      } catch (fsErr) {
        console.warn("[Chat API] Data-store error:", fsErr);
      }

      return NextResponse.json({
        success: true,
        leadSaved: true,
        reply: `Thank you, ${fullName}! 🎉 Your request has been recorded. Our solar engineer will call you shortly at ${mobileNumber} for your site assessment in ${district}.`,
      });
    }

    // Process Message Text & Generate Dynamic Bot Responses
    const msg = (message || "").toLowerCase().trim();
    let reply = "";
    let isLeadPrompt = false;

    if (!msg) {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 }
      );
    }

    if (msg.includes("subsidy") || msg.includes("surya ghar") || msg.includes("pm surya")) {
      reply = "Under the PM Surya Ghar Muft Bijli Yojana, residential solar systems up to 3 kW qualify for up to ₹78,000 in central government subsidy, plus state benefits in Odisha. Would you like us to calculate your exact subsidy? Please leave your Name, Phone Number, and Pin Code.";
      isLeadPrompt = true;
    } else if (msg.includes("cost") || msg.includes("price") || msg.includes("quote") || msg.includes("calculate") || msg.includes("rate")) {
      reply = "Solar system costs in Odisha typically start around ₹45,000/kW after subsidies for standard on-grid rooftop setups. Our team provides detailed ROI reports. Would you like a customized quote? Please share your Name, Mobile Number, and Pin Code.";
      isLeadPrompt = true;
    } else if (msg.includes("commercial") || msg.includes("factory") || msg.includes("hospital") || msg.includes("school") || msg.includes("business")) {
      reply = "Pragati EcoSolar provides commercial & industrial solar EPC (10 kW to 100 kW+) with accelerated depreciation benefits and customized CAPEX/OPEX models. Would you like to schedule an engineering consultation? Please share your Name, Company Phone, and District.";
      isLeadPrompt = true;
    } else if (msg.includes("expert") || msg.includes("call") || msg.includes("visit") || msg.includes("consult") || msg.includes("engineer")) {
      reply = "Our solar engineers in Bhubaneswar provide free on-site roof surveys across all 30 districts of Odisha. Please share your Name, Mobile Number, and Pin Code to book a visit.";
      isLeadPrompt = true;
    } else if (msg.includes("discom") || msg.includes("tpcodl") || msg.includes("tpnodl") || msg.includes("tpsodl") || msg.includes("tpwodl") || msg.includes("net meter")) {
      reply = "We are fully empanelled with all 4 Odisha DISCOMs (TPCODL, TPNODL, TPSODL, and TPWODL) and handle 100% of bi-directional net-metering approvals in-house.";
    } else if (msg.includes("location") || msg.includes("address") || msg.includes("office") || msg.includes("where")) {
      reply = "Our registered office is located at HIG/42, Aryapalli, Patia, Bhubaneswar, Odisha 751024. Working hours: Mon – Sat, 9:30 AM – 6:30 PM.";
    } else {
      reply = "Thank you for reaching out to Pragati EcoSolar! We specialize in On-Grid, Off-Grid & Hybrid Solar EPC systems with 25-year performance warranties across Odisha. How can we assist your solar transition today?";
    }

    return NextResponse.json({
      success: true,
      reply,
      isLeadPrompt,
    });
  } catch (error: any) {
    console.error("[API Chat Error]:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process chat request" },
      { status: 500 }
    );
  }
}
