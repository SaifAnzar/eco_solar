import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { SolarCalculationResult } from "@/lib/solar-engine";

// Create PDF Styles matching Pragati EcoSolar brand identity
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 9,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#00A86B",
    borderBottomStyle: "solid",
    paddingBottom: 10,
    marginBottom: 15,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0B132B",
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    fontSize: 8,
    color: "#00A86B",
    fontWeight: "bold",
    marginTop: 2,
  },
  brandAddress: {
    fontSize: 7.5,
    color: "#475569",
    marginTop: 2,
  },
  headerRight: {
    textAlign: "right",
  },
  docLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFB703",
    backgroundColor: "#0B132B",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
  },
  metaText: {
    fontSize: 7.5,
    color: "#475569",
    marginTop: 3,
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#0B132B",
    backgroundColor: "#F1F5F9",
    padding: 5,
    marginBottom: 6,
    borderLeftWidth: 3,
    borderLeftColor: "#00A86B",
    borderLeftStyle: "solid",
  },
  infoGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
  },
  infoBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "solid",
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#F8FAFC",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  infoLabel: {
    fontSize: 8,
    color: "#64748B",
  },
  infoValue: {
    fontSize: 8,
    fontWeight: "bold",
    color: "#0F172A",
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderStyle: "solid",
    borderRadius: 4,
    marginBottom: 12,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#0B132B",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 8,
    paddingVertical: 5,
    paddingHorizontal: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    borderBottomStyle: "solid",
    paddingVertical: 4,
    paddingHorizontal: 4,
    fontSize: 7.5,
  },
  tableRowAlternate: {
    backgroundColor: "#F8FAFC",
  },
  colSl: { width: "5%", textAlign: "center" },
  colCategory: { width: "20%" },
  colSpec: { width: "40%" },
  colQty: { width: "8%", textAlign: "center" },
  colUnit: { width: "7%", textAlign: "center" },
  colRate: { width: "10%", textAlign: "right" },
  colAmount: { width: "10%", textAlign: "right", fontWeight: "bold" },
  financialSummaryBox: {
    borderWidth: 1,
    borderColor: "#00A86B",
    borderStyle: "solid",
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#F0FDF4",
    marginBottom: 12,
  },
  financialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#00A86B",
    borderTopStyle: "solid",
    paddingTop: 4,
    marginTop: 2,
  },
  totalText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#00A86B",
  },
  bankBox: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderStyle: "solid",
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#FFFBEB",
    marginBottom: 10,
  },
  bankTitle: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#B45309",
    marginBottom: 3,
  },
  termsBox: {
    fontSize: 7,
    color: "#64748B",
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    borderTopStyle: "solid",
    paddingTop: 6,
  },
  footer: {
    position: "absolute",
    bottom: 15,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 7,
    color: "#94A3B8",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    borderTopStyle: "solid",
    paddingTop: 4,
  },
});

export interface QuotationPdfProps {
  customerName: string;
  phone: string;
  email?: string;
  address?: string;
  pincode: string;
  locationLabel: string;
  discom: string;
  calculation: SolarCalculationResult;
  quotationRef: string;
  dateStr: string;
}

export function QuotationPdfDocument({
  customerName,
  phone,
  email,
  address,
  pincode,
  locationLabel,
  discom,
  calculation: calc,
  quotationRef,
  dateStr,
}: QuotationPdfProps) {
  return (
    <Document title={`Pragati_EcoSolar_Quotation_${quotationRef}`}>
      <Page size="A4" style={styles.page}>
        {/* Company Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandTitle}>PRAGATI ECOSOLAR</Text>
            <Text style={styles.brandSubtitle}>
              AUTHORIZED SOLAR EPC CONTRACTOR | ODISHA
            </Text>
            <Text style={styles.brandAddress}>
              HIG 42, Aryapalli, Patia, Bhubaneswar, Odisha – 751024
            </Text>
            <Text style={styles.brandAddress}>
              GSTIN: 21ABIFP1344D1ZS | Phone: +91 9124318222 / 9124679222
            </Text>
            <Text style={styles.brandAddress}>
              Email: solarbee.bbsr@gmail.com | Web: www.pragatiecosolar.in
            </Text>
          </View>

          <View style={styles.headerRight}>
            <Text style={styles.docLabel}>TURNKEY SOLAR PROPOSAL</Text>
            <Text style={styles.metaText}>Ref: {quotationRef}</Text>
            <Text style={styles.metaText}>Date: {dateStr}</Text>
            <Text style={styles.metaText}>Valid Till: 15 Days</Text>
          </View>
        </View>

        {/* Customer & Technical Information Grid */}
        <View style={styles.infoGrid}>
          {/* Customer Info Box */}
          <View style={styles.infoBox}>
            <Text style={{ fontSize: 8.5, fontWeight: "bold", marginBottom: 4, color: "#0B132B" }}>
              CLIENT INFORMATION
            </Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Client Name:</Text>
              <Text style={styles.infoValue}>{customerName || "Valued Customer"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Contact Number:</Text>
              <Text style={styles.infoValue}>{phone}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email Address:</Text>
              <Text style={styles.infoValue}>{email || "N/A"}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Site Address:</Text>
              <Text style={styles.infoValue}>{address || locationLabel}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>DISCOM Utility:</Text>
              <Text style={styles.infoValue}>{discom}</Text>
            </View>
          </View>

          {/* Technical Summary Box */}
          <View style={styles.infoBox}>
            <Text style={{ fontSize: 8.5, fontWeight: "bold", marginBottom: 4, color: "#0B132B" }}>
              SYSTEM DESIGN SPECIFICATIONS
            </Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Plant Capacity:</Text>
              <Text style={styles.infoValue}>{calc.systemKw} kW Rooftop System</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>PV Modules:</Text>
              <Text style={styles.infoValue}>{calc.panelCount} × 600W MonoPERC/TOPCon</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Grid Inverter:</Text>
              <Text style={styles.infoValue}>{Math.ceil(calc.systemKw)} kW Dual MPPT Grid-Tied</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Est. Monthly Generation:</Text>
              <Text style={styles.infoValue}>~{calc.monthlyGenerationKwh} Units / Month</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Required Roof Area:</Text>
              <Text style={styles.infoValue}>{calc.requiredRoofAreaSqFt} Sq. Ft.</Text>
            </View>
          </View>
        </View>

        {/* 15-Item Bill of Materials Table */}
        <Text style={styles.sectionTitle}>
          ITEMIZED BILL OF MATERIALS (BOM) & TURNKEY SCOPE OF WORKS
        </Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colSl}>#</Text>
            <Text style={styles.colCategory}>Category</Text>
            <Text style={styles.colSpec}>Technical Specification</Text>
            <Text style={styles.colQty}>Qty</Text>
            <Text style={styles.colUnit}>Unit</Text>
            <Text style={styles.colRate}>Rate (₹)</Text>
            <Text style={styles.colAmount}>Amount (₹)</Text>
          </View>

          {calc.bom.map((item, index) => (
            <View
              key={item.slNo}
              style={[
                styles.tableRow,
                index % 2 === 1 ? styles.tableRowAlternate : {},
              ]}
            >
              <Text style={styles.colSl}>{item.slNo}</Text>
              <Text style={styles.colCategory}>{item.itemCategory}</Text>
              <Text style={styles.colSpec}>{item.specification}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colUnit}>{item.unit}</Text>
              <Text style={styles.colRate}>{item.unitRate.toLocaleString()}</Text>
              <Text style={styles.colAmount}>{item.totalAmount.toLocaleString()}</Text>
            </View>
          ))}
        </View>

        {/* Financial Summary & Bank Wire Grid */}
        <View style={styles.infoGrid}>
          {/* Financial Breakdown */}
          <View style={styles.financialSummaryBox}>
            <Text style={{ fontSize: 9, fontWeight: "bold", marginBottom: 4, color: "#00A86B" }}>
              FINANCIAL INVESTMENT BREAKDOWN
            </Text>
            <View style={styles.financialRow}>
              <Text style={{ fontSize: 8, color: "#334155" }}>Gross Turnkey EPC Cost (Incl. GST):</Text>
              <Text style={{ fontSize: 8, fontWeight: "bold", color: "#0F172A" }}>
                ₹{calc.grossSystemCost.toLocaleString()}
              </Text>
            </View>
            {calc.propertyType === "residential" ? (
              <>
                <View style={styles.financialRow}>
                  <Text style={{ fontSize: 8, color: "#00A86B", fontWeight: "bold" }}>
                    Less: PM Surya Ghar Central Subsidy:
                  </Text>
                  <Text style={{ fontSize: 8, fontWeight: "bold", color: "#00A86B" }}>
                    - ₹{(calc.centralSubsidy || calc.pmSuryaGharSubsidy).toLocaleString()}
                  </Text>
                </View>
                <View style={styles.financialRow}>
                  <Text style={{ fontSize: 8, color: "#B45309", fontWeight: "bold" }}>
                    Less: Odisha State Govt Subsidy Top-Up:
                  </Text>
                  <Text style={{ fontSize: 8, fontWeight: "bold", color: "#B45309" }}>
                    - ₹{(calc.stateSubsidy || 0).toLocaleString()}
                  </Text>
                </View>
              </>
            ) : (
              <View style={styles.financialRow}>
                <Text style={{ fontSize: 8, color: "#059669", fontWeight: "bold" }}>
                  Less: 80% Accelerated Depreciation Benefit:
                </Text>
                <Text style={{ fontSize: 8, fontWeight: "bold", color: "#059669" }}>
                  - ₹{calc.taxBenefit80AD.toLocaleString()}
                </Text>
              </View>
            )}
            <View style={[styles.financialRow, styles.totalRow]}>
              <Text style={styles.totalText}>Net Investment Payable by Customer:</Text>
              <Text style={styles.totalText}>₹{calc.netPayableCost.toLocaleString()}</Text>
            </View>
            <View style={{ marginTop: 4 }}>
              <Text style={{ fontSize: 7, color: "#047857" }}>
                * Est. Annual Electricity Bill Savings: ₹{calc.annualSavingsRs.toLocaleString()} | Payback Horizon: {calc.paybackPeriodYears} Years
              </Text>
            </View>
          </View>

          {/* Official Bank Account Details */}
          <View style={styles.bankBox}>
            <Text style={styles.bankTitle}>OFFICIAL BANK WIRE DETAILS (NEFT / RTGS)</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Bank Name:</Text>
              <Text style={styles.infoValue}>IDFC FIRST BANK, BHUBANESWAR</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Account Name:</Text>
              <Text style={styles.infoValue}>PRAGATI ECOSOLAR</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Account Number:</Text>
              <Text style={{ fontSize: 8.5, fontWeight: "bold", color: "#B45309" }}>
                86522167402
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>IFSC Code:</Text>
              <Text style={styles.infoValue}>IDFB0060241</Text>
            </View>
          </View>
        </View>

        {/* Commercial Terms & Warranties */}
        <View style={styles.termsBox}>
          <Text style={{ fontWeight: "bold", color: "#0F172A", marginBottom: 2 }}>
            COMMERCIAL TERMS & WARRANTY CONDITIONS:
          </Text>
          <Text>1. Quotation Validity: 15 Days from date of issuance.</Text>
          <Text>2. Warranties: 12 Years Solar Module Product Warranty & 25 Years Linear Performance Warranty; 5 Years Inverter Warranty; 1 Year Workmanship Warranty.</Text>
          <Text>3. Payment Terms: 60% Advance along with Purchase Order, 30% on Delivery of Major Equipment at site, 10% Post Commissioning & Net-Meter Testing.</Text>
          <Text>4. DISCOM Liaison: Net metering approval processed via TPCODL / TPNODL / TPSODL / TPWODL portal within 15–30 days.</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            Pragati EcoSolar • HIG 42, Aryapalli, Patia, Bhubaneswar, Odisha – 751024 • MD: Kalpna Sahoo
          </Text>
        </View>
      </Page>
    </Document>
  );
}
