import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();
const DATA_DIR = path.join(process.cwd(), "data");

async function migrateData() {
  console.log("=== Starting Migration from JSON Files to PostgreSQL Database ===");

  // 1. Migrate Solar Configuration (data/solar-config.json)
  const solarConfigFile = path.join(DATA_DIR, "solar-config.json");
  if (fs.existsSync(solarConfigFile)) {
    try {
      const config = JSON.parse(fs.readFileSync(solarConfigFile, "utf-8"));
      await (prisma as any).solarConfig.upsert({
        where: { id: "default" },
        update: {
          panelWp: config.panelWp ?? 600,
          panelUnitRate: config.panelUnitRate ?? 14033.25,
          roofAreaPerKw: config.roofAreaPerKw ?? 90,
          residentialBenchmarkRate: config.residentialBenchmarkRate ?? 65000,
          commercialBenchmarkRate: config.commercialBenchmarkRate ?? 55000,
          gridTariffRate: config.gridTariffRate ?? 7.0,
          defaultPsh: config.defaultPsh ?? 4.5,
          performanceRatio: config.performanceRatio ?? 0.78,
          subsidyTier1Kw: config.subsidyTier1Kw ?? 1,
          subsidyTier1Amount: config.subsidyTier1Amount ?? 30000,
          subsidyTier2Kw: config.subsidyTier2Kw ?? 2,
          subsidyTier2Amount: config.subsidyTier2Amount ?? 60000,
          subsidyTier3PlusAmount: config.subsidyTier3PlusAmount ?? 78000,
          stateSubsidyTier1Kw: config.stateSubsidyTier1Kw ?? 1,
          stateSubsidyTier1Amount: config.stateSubsidyTier1Amount ?? 20000,
          stateSubsidyTier2Kw: config.stateSubsidyTier2Kw ?? 2,
          stateSubsidyTier2Amount: config.stateSubsidyTier2Amount ?? 40000,
          stateSubsidyTier3PlusAmount: config.stateSubsidyTier3PlusAmount ?? 60000,
          equipmentBands: config.equipmentBands ?? null,
        },
        create: {
          id: "default",
          panelWp: config.panelWp ?? 600,
          panelUnitRate: config.panelUnitRate ?? 14033.25,
          roofAreaPerKw: config.roofAreaPerKw ?? 90,
          residentialBenchmarkRate: config.residentialBenchmarkRate ?? 65000,
          commercialBenchmarkRate: config.commercialBenchmarkRate ?? 55000,
          gridTariffRate: config.gridTariffRate ?? 7.0,
          defaultPsh: config.defaultPsh ?? 4.5,
          performanceRatio: config.performanceRatio ?? 0.78,
          subsidyTier1Kw: config.subsidyTier1Kw ?? 1,
          subsidyTier1Amount: config.subsidyTier1Amount ?? 30000,
          subsidyTier2Kw: config.subsidyTier2Kw ?? 2,
          subsidyTier2Amount: config.subsidyTier2Amount ?? 60000,
          subsidyTier3PlusAmount: config.subsidyTier3PlusAmount ?? 78000,
          stateSubsidyTier1Kw: config.stateSubsidyTier1Kw ?? 1,
          stateSubsidyTier1Amount: config.stateSubsidyTier1Amount ?? 20000,
          stateSubsidyTier2Kw: config.stateSubsidyTier2Kw ?? 2,
          stateSubsidyTier2Amount: config.stateSubsidyTier2Amount ?? 40000,
          stateSubsidyTier3PlusAmount: config.stateSubsidyTier3PlusAmount ?? 60000,
          equipmentBands: config.equipmentBands ?? null,
        },
      });
      console.log("✓ SolarConfig migrated successfully to PostgreSQL.");
    } catch (e) {
      console.error("Error migrating solar-config.json:", e);
    }
  }

  // 2. Migrate Approved Partners (data/approved-partners.json)
  const partnersFile = path.join(DATA_DIR, "approved-partners.json");
  if (fs.existsSync(partnersFile)) {
    try {
      const partnersObj = JSON.parse(fs.readFileSync(partnersFile, "utf-8"));
      const partnersList = Object.values(partnersObj) as any[];
      for (const p of partnersList) {
        if (!p.name || !p.phone) continue;
        await (prisma as any).approvedPartner.upsert({
          where: { id: p.id },
          update: {
            type: p.type === "DEALER" ? "DEALER" : "FRANCHISE",
            name: p.name,
            contactPerson: p.contactPerson || null,
            phone: p.phone,
            email: p.email || null,
            district: p.district || "Khordha (Bhubaneswar)",
            fullAddress: p.fullAddress || "Odisha",
            pincode: p.pincode || null,
            googleMapUrl: p.googleMapUrl || null,
            isActive: p.isActive !== undefined ? p.isActive : true,
          },
          create: {
            id: p.id,
            type: p.type === "DEALER" ? "DEALER" : "FRANCHISE",
            name: p.name,
            contactPerson: p.contactPerson || null,
            phone: p.phone,
            email: p.email || null,
            district: p.district || "Khordha (Bhubaneswar)",
            fullAddress: p.fullAddress || "Odisha",
            pincode: p.pincode || null,
            googleMapUrl: p.googleMapUrl || null,
            isActive: p.isActive !== undefined ? p.isActive : true,
            createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
          },
        });
      }
      console.log(`✓ ApprovedPartners migrated successfully (${partnersList.length} records).`);
    } catch (e) {
      console.error("Error migrating approved-partners.json:", e);
    }
  }

  // 3. Migrate Leads (data/leads.json)
  const leadsFile = path.join(DATA_DIR, "leads.json");
  if (fs.existsSync(leadsFile)) {
    try {
      const leadsObj = JSON.parse(fs.readFileSync(leadsFile, "utf-8"));
      const leadsList = Object.values(leadsObj) as any[];
      for (const l of leadsList) {
        if (!l.customerName || !l.phone) continue;
        await (prisma as any).siteVisitInquiry.create({
          data: {
            fullName: l.customerName,
            mobileNumber: l.phone,
            email: l.email || null,
            pincode: l.pincode || "751024",
            district: l.locationLabel || l.address || "Khordha",
            category: "RESIDENTIAL",
            systemType: "ON_GRID",
            monthlyBill: l.calculation?.monthlySavingsRs || null,
            message: `Proposal Ref: ${l.quotationRef || "N/A"} (${l.calculation?.systemKw || 5} kW)`,
            status: "PENDING",
            createdAt: l.createdAt ? new Date(l.createdAt) : new Date(),
          },
        });
      }
      console.log(`✓ Leads migrated successfully (${leadsList.length} records).`);
    } catch (e) {
      console.error("Error migrating leads.json:", e);
    }
  }

  // 4. Migrate Contact Inquiries (data/contact-inquiries.json)
  const contactFile = path.join(DATA_DIR, "contact-inquiries.json");
  if (fs.existsSync(contactFile)) {
    try {
      const contactObj = JSON.parse(fs.readFileSync(contactFile, "utf-8"));
      const contactList = Object.values(contactObj) as any[];
      for (const c of contactList) {
        if (!c.fullName || !c.phone) continue;
        await (prisma as any).siteVisitInquiry.create({
          data: {
            fullName: c.fullName,
            mobileNumber: c.phone,
            email: c.email || null,
            pincode: c.location?.match(/\d{6}/)?.[0] || "751024",
            district: c.discomRegion || c.location || "Khordha",
            message: c.message || `Inquiry: ${c.systemType || "Solar Inquiry"}`,
            status: c.status || "PENDING",
            createdAt: c.createdAt ? new Date(c.createdAt) : new Date(),
          },
        });
      }
      console.log(`✓ Contact Inquiries migrated successfully (${contactList.length} records).`);
    } catch (e) {
      console.error("Error migrating contact-inquiries.json:", e);
    }
  }

  // 5. Migrate Partnerships (data/partnerships.json)
  const partnershipsFile = path.join(DATA_DIR, "partnerships.json");
  if (fs.existsSync(partnershipsFile)) {
    try {
      const pObj = JSON.parse(fs.readFileSync(partnershipsFile, "utf-8"));
      const pList = Object.values(pObj) as any[];
      for (const p of pList) {
        if (!p.applicantName && !p.fullName) continue;
        await (prisma as any).partnerApplication.create({
          data: {
            type: p.type === "DEALERSHIP" ? "PARTNER" : (p.type === "PARTNER" ? "PARTNER" : "FRANCHISE"),
            applicantName: p.applicantName || p.fullName || "Partner Applicant",
            businessName: p.businessName || null,
            phone: p.phone || p.mobileNumber || "0000000000",
            email: p.email || p.emailAddress || "partner@pragatiecosolar.in",
            location: p.location || p.proposedCity || p.primaryDistrict || "Odisha",
            investmentRange: p.investmentRange || p.investmentCapacity || "₹2L–₹5L",
            experience: p.experience || p.businessBackground || null,
            status: p.status || "PENDING",
            notes: p.notes || null,
            createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
          },
        });
      }
      console.log(`✓ Partnerships migrated successfully (${pList.length} records).`);
    } catch (e) {
      console.error("Error migrating partnerships.json:", e);
    }
  }

  // 6. Migrate Eligibility Leads (data/eligibility-leads.json)
  const eligFile = path.join(DATA_DIR, "eligibility-leads.json");
  if (fs.existsSync(eligFile)) {
    try {
      const eObj = JSON.parse(fs.readFileSync(eligFile, "utf-8"));
      const eList = Object.values(eObj) as any[];
      for (const el of eList) {
        if (!el.consumerNumber || !el.phone) continue;
        await (prisma as any).eligibilityLead.create({
          data: {
            consumerNumber: el.consumerNumber,
            fullName: el.fullName,
            phone: el.phone,
            email: el.email || "info@pragatiecosolar.in",
            discom: el.discom || "TPCODL",
            roofOwnership: el.roofOwnership || "OWNED",
            monthlyBill: el.monthlyBill || null,
            status: el.status || "NEW",
            notes: el.notes || null,
            createdAt: el.createdAt ? new Date(el.createdAt) : new Date(),
          },
        });
      }
      console.log(`✓ Eligibility Leads migrated successfully (${eList.length} records).`);
    } catch (e) {
      console.error("Error migrating eligibility-leads.json:", e);
    }
  }

  console.log("=== All JSON Data Migration Completed! ===");
}

migrateData()
  .catch((err) => {
    console.error("Migration fatal error:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
