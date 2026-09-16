import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkDatabase() {
  console.log("=== LIVE DATABASE HEALTH & DATA VERIFICATION ===");

  const solarConfigs = await prisma.solarConfig.findMany();
  console.log(`\n1. [SolarConfig Table] Count: ${solarConfigs.length}`);
  if (solarConfigs[0]) {
    console.log(`   - Default Config ID: ${solarConfigs[0].id}`);
    console.log(`   - Residential Benchmark: ₹${solarConfigs[0].residentialBenchmarkRate}/kW`);
    console.log(`   - Commercial Benchmark: ₹${solarConfigs[0].commercialBenchmarkRate}/kW`);
    console.log(`   - Central Subsidy Cap: ₹${solarConfigs[0].subsidyTier3PlusAmount}`);
    console.log(`   - Odisha State Subsidy Cap: ₹${solarConfigs[0].stateSubsidyTier3PlusAmount}`);
  }

  const approvedPartners = await prisma.approvedPartner.findMany();
  console.log(`\n2. [ApprovedPartner Table] Count: ${approvedPartners.length}`);
  approvedPartners.forEach((p) => {
    console.log(`   - Partner: ${p.name} (${p.type}) | Phone: ${p.phone} | District: ${p.district}`);
  });

  const siteVisitInquiries = await prisma.siteVisitInquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  console.log(`\n3. [SiteVisitInquiry Table] Count: ${await prisma.siteVisitInquiry.count()}`);
  siteVisitInquiries.forEach((s) => {
    console.log(`   - Inquiry: ${s.fullName} | Phone: ${s.mobileNumber} | District: ${s.district} | Msg: ${s.message}`);
  });

  const partnerApplications = await prisma.partnerApplication.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  console.log(`\n4. [PartnerApplication Table] Count: ${await prisma.partnerApplication.count()}`);
  partnerApplications.forEach((p) => {
    console.log(`   - Application: ${p.applicantName} | Phone: ${p.phone} | Location: ${p.location} | Investment: ${p.investmentRange}`);
  });

  const eligibilityLeads = await prisma.eligibilityLead.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  console.log(`\n5. [EligibilityLead Table] Count: ${await prisma.eligibilityLead.count()}`);
  eligibilityLeads.forEach((e) => {
    console.log(`   - CA Lead: ${e.fullName} | CA Number: ${e.consumerNumber} | Phone: ${e.phone}`);
  });

  console.log("\n================================================");
}

checkDatabase()
  .catch((e) => console.error("Database check error:", e))
  .finally(async () => {
    await prisma.$disconnect();
  });
