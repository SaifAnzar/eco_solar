import { PrismaClient } from "@prisma/client";
import { saveSolarConfig, getSolarConfigAsync, saveApprovedPartner, getAllApprovedPartners, updateApprovedPartnerRecord, deleteApprovedPartnerRecord } from "../lib/data-store";

const prisma = new PrismaClient();
const BASE_URL = "http://localhost:3000";

interface TestResult {
  step: string;
  table: string;
  status: "PASSED" | "FAILED";
  details: string;
}

const results: TestResult[] = [];

async function runLiveE2ETests() {
  console.log("================================================================================");
  console.log("🚀 STARTING COMPREHENSIVE LIVE DATABASE & FORM PERSISTENCE VERIFICATION");
  console.log("================================================================================\n");

  // TEST 1: SolarConfig (PostgreSQL)
  try {
    console.log("➡️ TEST 1: Testing Solar Engine Configuration Persistence...");
    await saveSolarConfig({
      panelWp: 600,
      panelUnitRate: 14033.25,
      roofAreaPerKw: 90,
      residentialBenchmarkRate: 65000,
      commercialBenchmarkRate: 55000,
      gridTariffRate: 7.0,
      defaultPsh: 4.5,
      performanceRatio: 0.78,
      subsidyTier1Kw: 1,
      subsidyTier1Amount: 30000,
      subsidyTier2Kw: 2,
      subsidyTier2Amount: 60000,
      subsidyTier3PlusAmount: 78000,
      stateSubsidyTier1Kw: 1,
      stateSubsidyTier1Amount: 20000,
      stateSubsidyTier2Kw: 2,
      stateSubsidyTier2Amount: 40000,
      stateSubsidyTier3PlusAmount: 60000,
      equipmentBands: [
        {
          minKw: 1,
          maxKw: 3,
          acdbDcdbSpec: "1-Phase 1000V DCDB + 240V ACDB with Type-II SPD & MCB",
          dcCableSpec: "4 sq.mm Tinned Copper XLPO Solar DC Cable",
          acCableSpec: "2.5 sq.mm 2-Core Copper Armoured AC Cable",
          earthingPitsCount: 2,
          laSpec: "Conventional Pure Copper Spike Lightning Arrestor",
        },
        {
          minKw: 4,
          maxKw: 10,
          acdbDcdbSpec: "3-Phase 1000V DCDB (2-In/2-Out) + 415V ACDB with Type-II SPD",
          dcCableSpec: "6 sq.mm Tinned Copper XLPO Solar DC Cable",
          acCableSpec: "6 sq.mm 4-Core Copper Armoured AC Cable",
          earthingPitsCount: 3,
          laSpec: "Class-A Heavy Duty Copper Spike Lightning Arrestor",
        },
      ],
    });

    const dbConfig = await prisma.solarConfig.findUnique({ where: { id: "default" } });
    if (
      dbConfig &&
      dbConfig.residentialBenchmarkRate === 65000 &&
      dbConfig.subsidyTier3PlusAmount === 78000 &&
      dbConfig.stateSubsidyTier3PlusAmount === 60000
    ) {
      results.push({
        step: "Solar Configuration Save & Fetch",
        table: "SolarConfig",
        status: "PASSED",
        details: `Config ID: ${dbConfig.id}, Central Subsidy: ₹${dbConfig.subsidyTier3PlusAmount}, State Subsidy: ₹${dbConfig.stateSubsidyTier3PlusAmount}`,
      });
      console.log("   ✅ SolarConfig persistence verified in PostgreSQL.");
    } else {
      throw new Error("SolarConfig values in database do not match expected values.");
    }
  } catch (err: any) {
    results.push({
      step: "Solar Configuration Save & Fetch",
      table: "SolarConfig",
      status: "FAILED",
      details: err.message,
    });
    console.error("   ❌ Failed Test 1:", err);
  }

  // TEST 2: Approved Partners Network (PostgreSQL CRUD)
  try {
    console.log("\n➡️ TEST 2: Testing Approved Partner Network CRUD Persistence...");
    const partnerPhone = "9988776655";
    // Clean prior test
    await prisma.approvedPartner.deleteMany({ where: { phone: partnerPhone } });

    const createdPartner = await saveApprovedPartner({
      type: "DEALER",
      name: "Live Test Solar Solutions Sambalpur",
      contactPerson: "Alok Dash",
      phone: partnerPhone,
      email: "alok.sambalpur@ecosolar.in",
      district: "Sambalpur",
      fullAddress: "Plot 104, VSS Nagar, Sambalpur, Odisha",
      pincode: "768001",
      isActive: true,
    });

    const dbPartner = await prisma.approvedPartner.findFirst({ where: { phone: partnerPhone } });
    if (!dbPartner || dbPartner.name !== "Live Test Solar Solutions Sambalpur") {
      throw new Error("ApprovedPartner record not found in PostgreSQL.");
    }

    // Test Update
    await updateApprovedPartnerRecord(dbPartner.id, { isActive: false });
    const updatedPartner = await prisma.approvedPartner.findUnique({ where: { id: dbPartner.id } });
    if (updatedPartner?.isActive !== false) {
      throw new Error("ApprovedPartner update failed in PostgreSQL.");
    }

    // Clean up
    await deleteApprovedPartnerRecord(dbPartner.id);
    const deletedPartner = await prisma.approvedPartner.findUnique({ where: { id: dbPartner.id } });
    if (deletedPartner) {
      throw new Error("ApprovedPartner deletion failed in PostgreSQL.");
    }

    results.push({
      step: "Approved Partner Network CRUD",
      table: "ApprovedPartner",
      status: "PASSED",
      details: `Created, updated status, and verified complete DB lifecycle.`,
    });
    console.log("   ✅ ApprovedPartner full CRUD cycle verified in PostgreSQL.");
  } catch (err: any) {
    results.push({
      step: "Approved Partner Network CRUD",
      table: "ApprovedPartner",
      status: "FAILED",
      details: err.message,
    });
    console.error("   ❌ Failed Test 2:", err);
  }

  // TEST 3: Contact Inquiries API (/api/contact) -> SiteVisitInquiry in DB
  try {
    console.log("\n➡️ TEST 3: Testing Contact Form API (/api/contact) -> SiteVisitInquiry Table...");
    const contactTestPhone = "9861000111";
    await prisma.siteVisitInquiry.deleteMany({ where: { mobileNumber: contactTestPhone } });

    const contactPayload = {
      fullName: "Priyanka Mohapatra",
      email: "priyanka.m@example.com",
      phone: contactTestPhone,
      location: "Rourkela, Sundargarh",
      systemType: "Residential 5kW On-Grid",
      monthlyBill: "₹4,500",
      rooftopArea: "600 sq ft",
      message: "Testing contact inquiry save to PostgreSQL live database.",
    };

    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactPayload),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(`Contact API returned error: ${JSON.stringify(json)}`);
    }

    const dbContact = await prisma.siteVisitInquiry.findFirst({
      where: { mobileNumber: contactTestPhone },
      orderBy: { createdAt: "desc" },
    });

    if (!dbContact || dbContact.fullName !== "Priyanka Mohapatra") {
      throw new Error("Contact form submission not found in SiteVisitInquiry table.");
    }

    results.push({
      step: "Contact Form Submission",
      table: "SiteVisitInquiry",
      status: "PASSED",
      details: `Saved ID: ${dbContact.id} | Name: ${dbContact.fullName} | District: ${dbContact.district}`,
    });
    console.log(`   ✅ Contact submission saved in PostgreSQL: ID ${dbContact.id} (${dbContact.fullName})`);
  } catch (err: any) {
    results.push({
      step: "Contact Form Submission",
      table: "SiteVisitInquiry",
      status: "FAILED",
      details: err.message,
    });
    console.error("   ❌ Failed Test 3:", err);
  }

  // TEST 4: Solar Calculator Site Visit Inquiry (/api/inquiries) -> SiteVisitInquiry in DB
  try {
    console.log("\n➡️ TEST 4: Testing Calculator Site Visit API (/api/inquiries) -> SiteVisitInquiry Table...");
    const inquiryTestPhone = "9861222333";
    await prisma.siteVisitInquiry.deleteMany({ where: { mobileNumber: inquiryTestPhone } });

    const inquiryPayload = {
      fullName: "Debasish Samal",
      mobileNumber: inquiryTestPhone,
      email: "debasish.solar@example.com",
      pincode: "751024",
      district: "Khordha (Bhubaneswar)",
      category: "RESIDENTIAL",
      systemType: "ON_GRID",
      monthlyBill: 4500,
      message: "3kW Solar Rooftop Quote + Free Site Visit Request",
    };

    const res = await fetch(`${BASE_URL}/api/inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inquiryPayload),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(`Inquiries API returned error: ${JSON.stringify(json)}`);
    }

    const dbInquiry = await prisma.siteVisitInquiry.findFirst({
      where: { mobileNumber: inquiryTestPhone },
      orderBy: { createdAt: "desc" },
    });

    if (!dbInquiry || dbInquiry.fullName !== "Debasish Samal") {
      throw new Error("Calculator inquiry submission not found in SiteVisitInquiry table.");
    }

    results.push({
      step: "Solar Calculator Site Visit Submission",
      table: "SiteVisitInquiry",
      status: "PASSED",
      details: `Saved ID: ${dbInquiry.id} | Name: ${dbInquiry.fullName} | Pincode: ${dbInquiry.pincode}`,
    });
    console.log(`   ✅ Site Visit inquiry saved in PostgreSQL: ID ${dbInquiry.id} (${dbInquiry.fullName})`);
  } catch (err: any) {
    results.push({
      step: "Solar Calculator Site Visit Submission",
      table: "SiteVisitInquiry",
      status: "FAILED",
      details: err.message,
    });
    console.error("   ❌ Failed Test 4:", err);
  }

  // TEST 5: Franchise / Dealership Application (/api/partnerships/apply) -> PartnerApplication & PartnershipApplication
  try {
    console.log("\n➡️ TEST 5: Testing Franchise & Dealership Applications (/api/partnerships/apply)...");
    const franchisePhone = "9437000888";
    await prisma.partnerApplication.deleteMany({ where: { phone: franchisePhone } });
    await prisma.partnershipApplication.deleteMany({ where: { phone: franchisePhone } });

    const franchisePayload = {
      type: "FRANCHISE",
      fullName: "Biswajit Pattnaik",
      phone: franchisePhone,
      email: "biswajit.franchise@example.com",
      district: "Puri",
      investmentCapacity: "₹5L–₹10L",
      businessExperience: "10 years in electrical contracting & commercial equipment",
      showroomSpaceSqFt: "1200 sq ft prime retail road facing",
      notes: "Looking to establish exclusive Pragati EcoSolar Experience Center in Puri.",
    };

    const res = await fetch(`${BASE_URL}/api/partnerships/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(franchisePayload),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(`Partnership API returned error: ${JSON.stringify(json)}`);
    }

    const dbPartnerApp = await prisma.partnerApplication.findFirst({
      where: { phone: franchisePhone },
      orderBy: { createdAt: "desc" },
    });
    const dbPartnershipApp = await prisma.partnershipApplication.findFirst({
      where: { phone: franchisePhone },
      orderBy: { createdAt: "desc" },
    });

    if (!dbPartnerApp || !dbPartnershipApp) {
      throw new Error("Franchise application record missing in PartnerApplication or PartnershipApplication table.");
    }

    results.push({
      step: "Franchise Application Submission",
      table: "PartnerApplication & PartnershipApplication",
      status: "PASSED",
      details: `Saved PartnerApplication: ${dbPartnerApp.id} & PartnershipApplication: ${dbPartnershipApp.id}`,
    });
    console.log(`   ✅ Franchise application saved in PostgreSQL: ${dbPartnerApp.applicantName} (${dbPartnerApp.location})`);
  } catch (err: any) {
    results.push({
      step: "Franchise Application Submission",
      table: "PartnerApplication & PartnershipApplication",
      status: "FAILED",
      details: err.message,
    });
    console.error("   ❌ Failed Test 5:", err);
  }

  // TEST 6: PM Surya Ghar Eligibility Leads (/api/leads/eligibility) -> EligibilityLead in DB
  try {
    console.log("\n➡️ TEST 6: Testing PM Surya Ghar Eligibility Lead API (/api/leads/eligibility)...");
    const caNumber = "120934875612";
    const leadPhone = "9438111222";
    await prisma.eligibilityLead.deleteMany({ where: { consumerNumber: caNumber } });

    const eligibilityPayload = {
      consumerNumber: caNumber,
      fullName: "Sasmita Rout",
      phone: leadPhone,
      email: "sasmita.rout@example.com",
      discom: "TPCODL",
      roofOwnership: "OWNED",
      monthlyBill: "₹3,800",
      notes: "Eligible for ₹78k Central + ₹60k Odisha State Subsidy",
    };

    const res = await fetch(`${BASE_URL}/api/leads/eligibility`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eligibilityPayload),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(`Eligibility API returned error: ${JSON.stringify(json)}`);
    }

    const dbLead = await prisma.eligibilityLead.findFirst({
      where: { consumerNumber: caNumber },
      orderBy: { createdAt: "desc" },
    });

    if (!dbLead || dbLead.fullName !== "Sasmita Rout") {
      throw new Error("Eligibility lead not found in EligibilityLead table.");
    }

    results.push({
      step: "PM Surya Ghar Eligibility Lead Submission",
      table: "EligibilityLead",
      status: "PASSED",
      details: `Saved ID: ${dbLead.id} | CA: ${dbLead.consumerNumber} | Name: ${dbLead.fullName}`,
    });
    console.log(`   ✅ Eligibility lead saved in PostgreSQL: ID ${dbLead.id} (CA: ${dbLead.consumerNumber})`);
  } catch (err: any) {
    results.push({
      step: "PM Surya Ghar Eligibility Lead Submission",
      table: "EligibilityLead",
      status: "FAILED",
      details: err.message,
    });
    console.error("   ❌ Failed Test 6:", err);
  }

  // PRINT SUMMARY REPORT
  console.log("\n================================================================================");
  console.log("📊 COMPREHENSIVE LIVE DATABASE VERIFICATION SUMMARY TABLE");
  console.log("================================================================================");
  console.table(results);

  const allPassed = results.every((r) => r.status === "PASSED");
  if (allPassed) {
    console.log("\n🎉 100% OF LIVE TESTS PASSED! ALL DATA IS DIRECTLY SAVING TO POSTGRESQL DATABASE!");
  } else {
    console.log("\n⚠️ SOME TESTS FAILED. PLEASE INSPECT LOGS ABOVE.");
  }
}

runLiveE2ETests()
  .catch((e) => console.error("Test execution failed:", e))
  .finally(async () => {
    await prisma.$disconnect();
  });
