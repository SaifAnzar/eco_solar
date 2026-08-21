import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { SolarCalculationResult } from "@/lib/solar-engine";

const styles = StyleSheet.create({
  page: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 24,
    fontSize: 7.5,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
  },
  // Header section
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1.5,
    borderBottomColor: "#00A86B",
    borderBottomStyle: "solid",
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  logoBox: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderStyle: "solid",
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justify: "center",
    padding: 2,
  },
  logoImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0B132B",
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    fontSize: 8.5,
    color: "#00A86B",
    fontWeight: "bold",
    fontStyle: "italic",
    marginTop: 1,
  },
  brandAddress: {
    fontSize: 7,
    color: "#475569",
    marginTop: 1.5,
    lineHeight: 1.2,
  },
  headerRight: {
    textAlign: "right",
  },
  docLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0B132B",
    letterSpacing: 1,
  },
  metaText: {
    fontSize: 7.5,
    color: "#475569",
    marginTop: 2,
  },

  // Main Banner
  systemBanner: {
    backgroundColor: "#1E293B",
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    borderRadius: 2,
  },
  bannerTitle: {
    fontSize: 10.5,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  bannerSubtitle: {
    fontSize: 7.5,
    color: "#CBD5E1",
    marginTop: 2,
  },
  bannerBadge: {
    backgroundColor: "#15803D",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
  },
  bannerBadgeText: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  // Client & Spec 2-Column Info Grid
  infoGrid: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  infoBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderStyle: "solid",
    padding: 6,
    backgroundColor: "#FFFFFF",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 3,
    alignItems: "flex-start",
  },
  infoLabel: {
    width: "35%",
    fontSize: 7.5,
    fontWeight: "bold",
    color: "#0F172A",
  },
  infoValue: {
    width: "65%",
    fontSize: 7.5,
    color: "#1E293B",
  },
  underlineField: {
    borderBottomWidth: 1,
    borderBottomColor: "#94A3B8",
    borderBottomStyle: "solid",
    minHeight: 10,
  },

  // Section Headers
  sectionHeader: {
    backgroundColor: "#1E293B",
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  sectionSub: {
    fontSize: 7,
    color: "#94A3B8",
  },

  // Item Table
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderStyle: "solid",
    marginBottom: 4,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1E293B",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 7.5,
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#CBD5E1",
    borderBottomStyle: "solid",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
    borderBottomStyle: "solid",
    paddingVertical: 3.5,
    paddingHorizontal: 4,
    fontSize: 7.5,
    alignItems: "center",
  },
  tableRowAlt: {
    backgroundColor: "#F8FAFC",
  },

  // Columns
  colSl: { width: "5%", textAlign: "center" },
  colDesc: { width: "47%" },
  colUnit: { width: "8%", textAlign: "center" },
  colQty: { width: "7%", textAlign: "center" },
  colRate: { width: "16.5%", textAlign: "right" },
  colAmount: { width: "16.5%", textAlign: "right", fontWeight: "bold" },

  // Subtotal Bar
  subtotalBar: {
    backgroundColor: "#1E293B",
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  subtotalLabel: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  subtotalValue: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  // Grand Total Box
  grandTotalContainer: {
    borderWidth: 1.5,
    borderColor: "#0F172A",
    borderStyle: "solid",
    flexDirection: "row",
    marginTop: 6,
    marginBottom: 8,
    height: 38,
  },
  grandTotalLeft: {
    width: "55%",
    padding: 6,
    justifyContent: "center",
    borderRightWidth: 1.5,
    borderRightColor: "#0F172A",
    borderRightStyle: "solid",
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  grandTotalRight: {
    width: "45%",
    backgroundColor: "#15803D",
    justify: "center",
    alignItems: "center",
    padding: 4,
  },
  grandTotalTitle: {
    fontSize: 12.5,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },

  // Top Yellow Box (Page 2)
  highlightBox: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#F59E0B",
    borderStyle: "solid",
    borderRadius: 2,
    padding: 6,
    marginBottom: 10,
  },
  highlightText: {
    fontSize: 7.5,
    color: "#78350F",
    lineHeight: 1.3,
  },

  // Bank & Terms 2-Column Section (Page 2)
  bottomGrid: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },
  bankColumn: {
    width: "38%",
  },
  termsColumn: {
    width: "60%",
  },
  boxHeaderBar: {
    backgroundColor: "#1E293B",
    paddingHorizontal: 6,
    paddingVertical: 3.5,
  },
  boxHeaderTitle: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  boxBody: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderStyle: "solid",
    padding: 6,
    backgroundColor: "#F8FAFC",
  },
  termItem: {
    fontSize: 7,
    color: "#334155",
    marginBottom: 3.5,
    lineHeight: 1.25,
  },

  // Signoff Block (Page 2)
  signoffRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 20,
    paddingTop: 10,
  },
  signoffTextLeft: {
    fontSize: 8,
    fontStyle: "italic",
    color: "#475569",
  },
  signoffTextRight: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#0F172A",
  },

  // Page Footer
  pageFooter: {
    position: "absolute",
    bottom: 12,
    left: 24,
    right: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
    borderTopStyle: "solid",
    paddingTop: 4,
    fontSize: 7,
    color: "#64748B",
  },
});

export interface QuotationPdfProps {
  customerName: string;
  phone: string;
  email?: string;
  address?: string;
  pincode?: string;
  locationLabel?: string;
  discom?: string;
  calculation: SolarCalculationResult;
  quotationRef: string;
  quotationDate?: string;
  dateStr?: string;
}

export function QuotationPdfDocument({
  customerName,
  phone,
  email,
  address,
  pincode,
  locationLabel,
  discom = "TPCODL",
  calculation: calc,
  quotationRef,
  quotationDate,
  dateStr,
}: QuotationPdfProps) {
  const displayDate = quotationDate || dateStr || "July 2026";
  const refCode = quotationRef || `QT-HY-${calc?.systemKw || 5}KW-2607`;

  const kw = calc?.systemKw || 5;
  const isHybrid = true; // Tailored to exact Hybrid / Servotech structure requested
  const systemTitle = `${kw} kW ${isHybrid ? "HYBRID" : "ON-GRID"} SOLAR SYSTEM – SERVOTECH`;
  const panelCount = calc?.panelCount || Math.ceil((kw * 1000) / 600);
  const subtitleSpec = `${panelCount} × 600W DCR Panels | Servotech 48V Li-Ion | Single Phase`;

  // Itemized Part A Calculation (Material Bill)
  const inverterRate = 81244;
  const panelUnitPrice = 31395;
  const totalPanelCost = panelCount * panelUnitPrice; // e.g. 9 * 31395 = 282555
  const structureCost = Math.round(kw * 3200 * 1.534); // ~24544
  const batteryCost = 110876;
  const acdbCost = 4077;
  const dcdbCost = 4077;
  const dcCableCost = 15142;
  const acCableCost = 3786;
  const earthingLaCost = 7823;
  const miscCost = 10738;

  const partAItems = [
    {
      sl: 1,
      desc: `Servotech ${kw} kW Single Phase Hybrid Solar Inverter`,
      unit: "Nos",
      qty: 1,
      rate: inverterRate,
      amount: inverterRate,
    },
    {
      sl: 2,
      desc: "Sunora 600W DCR Solar Panel (PM Surya Ghar Eligible)",
      unit: "Nos",
      qty: panelCount,
      rate: panelUnitPrice,
      amount: totalPanelCost,
    },
    {
      sl: 3,
      desc: `GI Structure – Hot Dip Galvanized Mounting (${kw} kW @ Rs.3,200/kW)`,
      unit: "Set",
      qty: 1,
      rate: structureCost,
      amount: structureCost,
    },
    {
      sl: 4,
      desc: "Servotech Li-Ion Battery 48V / 100Ah",
      unit: "Nos",
      qty: 1,
      rate: batteryCost,
      amount: batteryCost,
    },
    {
      sl: 5,
      desc: "ACDB Box",
      unit: "Nos",
      qty: 1,
      rate: acdbCost,
      amount: acdbCost,
    },
    {
      sl: 6,
      desc: "DCDB Box",
      unit: "Nos",
      qty: 1,
      rate: dcdbCost,
      amount: dcdbCost,
    },
    {
      sl: 7,
      desc: "DC Cable – 100 Mtr (@Rs.104/mtr)",
      unit: "Lot",
      qty: 1,
      rate: dcCableCost,
      amount: dcCableCost,
    },
    {
      sl: 8,
      desc: "AC Cable – 20 Mtr (@Rs.130/mtr)",
      unit: "Lot",
      qty: 1,
      rate: acCableCost,
      amount: acCableCost,
    },
    {
      sl: 9,
      desc: "Earthing Kit & Lightning Arrester (LA)",
      unit: "Set",
      qty: 1,
      rate: earthingLaCost,
      amount: earthingLaCost,
    },
    {
      sl: 10,
      desc: "Miscellaneous (MC4 Connectors, MID+EndClamp, PVC Pipe)",
      unit: "Lot",
      qty: 1,
      rate: miscCost,
      amount: miscCost,
    },
  ];

  const partASubtotal = partAItems.reduce((acc, item) => acc + item.amount, 0);

  // Itemized Part B Calculation (Service Bill)
  const installCost = Math.round(kw * 3000 * 1.18); // e.g. 5 * 3000 * 1.18 = 17700 or 23010
  const netMeterCost = 7670;
  const transportCost = 4602;

  const partBItems = [
    {
      sl: 11,
      desc: `Installation Charges (${kw} kW × Rs.3,000/kW + 18% GST)`,
      unit: "Job",
      qty: 1,
      rate: installCost,
      amount: installCost,
    },
    {
      sl: 12,
      desc: "Net Metering Charges (Flat + 18% GST)",
      unit: "Job",
      qty: 1,
      rate: netMeterCost,
      amount: netMeterCost,
    },
    {
      sl: 13,
      desc: "Transportation Charges",
      unit: "Job",
      qty: 1,
      rate: transportCost,
      amount: transportCost,
    },
  ];

  const partBSubtotal = partBItems.reduce((acc, item) => acc + item.amount, 0);
  const grandTotal = partASubtotal + partBSubtotal;

  const formatCurrency = (val: number) =>
    "Rs." + val.toLocaleString("en-IN");

  return (
    <Document title={`Pragati_EcoSolar_Quotation_${refCode}`}>
      {/* ──────────────────────────────────────────────────────────────────────────
          PAGE 1: QUOTATION HEADER, SPECIFICATIONS & ITEMIZED BILL OF MATERIALS
      ────────────────────────────────────────────────────────────────────────── */}
      <Page size="A4" style={styles.page}>
        {/* Header Block */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.logoBox}>
              <Image src="/logo.png" style={styles.logoImage} />
            </View>
            <View>
              <Text style={styles.brandTitle}>PRAGATI ECOSOLAR</Text>
              <Text style={styles.brandSubtitle}>Clean Energy. Bright Future.</Text>
              <Text style={styles.brandAddress}>
                HIG/42, Aryapalli, Patia, Bhubaneswar, Odisha – 751024
              </Text>
              <Text style={styles.brandAddress}>
                +91 9124318222 / 9124679222 | GST: 21ABIFP1344D1ZS
              </Text>
              <Text style={styles.brandAddress}>
                solarbee.bbsr@gmail.com | www.pragatiecosolar.in
              </Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <Text style={styles.docLabel}>QUOTATION</Text>
            <Text style={styles.metaText}>Date: {displayDate}</Text>
            <Text style={styles.metaText}>Valid: 30 Days</Text>
            <Text style={styles.metaText}>Ref: {refCode}</Text>
          </View>
        </View>

        {/* System Banner Bar */}
        <View style={styles.systemBanner}>
          <View>
            <Text style={styles.bannerTitle}>{systemTitle}</Text>
            <Text style={styles.bannerSubtitle}>{subtitleSpec}</Text>
          </View>
          <View style={styles.bannerBadge}>
            <Text style={styles.bannerBadgeText}>HYBRID SYSTEM</Text>
          </View>
        </View>

        {/* 2-Column Info Grid */}
        <View style={styles.infoGrid}>
          {/* Customer Prepared For Box */}
          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Prepared For:</Text>
              <Text style={[styles.infoValue, !customerName ? styles.underlineField : {}]}>
                {customerName || ""}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Address:</Text>
              <Text style={[styles.infoValue, !address && !locationLabel ? styles.underlineField : {}]}>
                {address || locationLabel || ""}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone:</Text>
              <Text style={[styles.infoValue, !phone ? styles.underlineField : {}]}>
                {phone || ""}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={[styles.infoValue, !email ? styles.underlineField : {}]}>
                {email || ""}
              </Text>
            </View>
          </View>

          {/* System Spec Box */}
          <View style={styles.infoBox}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>System:</Text>
              <Text style={styles.infoValue}>{kw} kW Hybrid Solar System</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Inverter:</Text>
              <Text style={styles.infoValue}>Servotech {kw} kW Hybrid (Single Phase)</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Panels:</Text>
              <Text style={styles.infoValue}>{panelCount} × 600W DCR = {(panelCount * 600).toLocaleString()}Wp</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Battery:</Text>
              <Text style={styles.infoValue}>Servotech Li-Ion 48V / 100Ah × 1</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Est. Gen.:</Text>
              <Text style={styles.infoValue}>~20–22 Units / Day (Approx.)</Text>
            </View>
          </View>
        </View>

        {/* PART A Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>PART A – MATERIAL / ITEM BILL</Text>
          <Text style={styles.sectionSub}>Inverter · Panels · Structure · Battery · BOS</Text>
        </View>

        {/* PART A Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colSl}>Sl.</Text>
            <Text style={styles.colDesc}>Description</Text>
            <Text style={styles.colUnit}>Unit</Text>
            <Text style={styles.colQty}>Qty</Text>
            <Text style={styles.colRate}>Rate (Incl. GST)</Text>
            <Text style={styles.colAmount}>Amount (Incl. GST)</Text>
          </View>

          {partAItems.map((item, idx) => (
            <View
              key={item.sl}
              style={[styles.tableRow, idx % 2 === 1 ? styles.tableRowAlt : {}]}
            >
              <Text style={styles.colSl}>{item.sl}</Text>
              <Text style={styles.colDesc}>{item.desc}</Text>
              <Text style={styles.colUnit}>{item.unit}</Text>
              <Text style={styles.colQty}>{item.qty}</Text>
              <Text style={styles.colRate}>{formatCurrency(item.rate)}</Text>
              <Text style={styles.colAmount}>{formatCurrency(item.amount)}</Text>
            </View>
          ))}
        </View>

        {/* PART A Subtotal */}
        <View style={styles.subtotalBar}>
          <Text style={styles.subtotalLabel}>SUB TOTAL</Text>
          <Text style={styles.subtotalValue}>{formatCurrency(partASubtotal)}</Text>
        </View>

        {/* PART B Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>PART B – SERVICE BILL</Text>
          <Text style={styles.sectionSub}>Installation · Net Metering · Transportation</Text>
        </View>

        {/* PART B Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colSl}>Sl.</Text>
            <Text style={styles.colDesc}>Description</Text>
            <Text style={styles.colUnit}>Unit</Text>
            <Text style={styles.colQty}>Qty</Text>
            <Text style={styles.colRate}>Rate (Incl. GST)</Text>
            <Text style={styles.colAmount}>Amount (Incl. GST)</Text>
          </View>

          {partBItems.map((item, idx) => (
            <View
              key={item.sl}
              style={[styles.tableRow, idx % 2 === 1 ? styles.tableRowAlt : {}]}
            >
              <Text style={styles.colSl}>{item.sl}</Text>
              <Text style={styles.colDesc}>{item.desc}</Text>
              <Text style={styles.colUnit}>{item.unit}</Text>
              <Text style={styles.colQty}>{item.qty}</Text>
              <Text style={styles.colRate}>{formatCurrency(item.rate)}</Text>
              <Text style={styles.colAmount}>{formatCurrency(item.amount)}</Text>
            </View>
          ))}
        </View>

        {/* PART B Subtotal */}
        <View style={styles.subtotalBar}>
          <Text style={styles.subtotalLabel}>SUB TOTAL</Text>
          <Text style={styles.subtotalValue}>{formatCurrency(partBSubtotal)}</Text>
        </View>

        {/* Grand Total Container */}
        <View style={styles.grandTotalContainer}>
          <View style={styles.grandTotalLeft}>
            <View style={styles.grandTotalRow}>
              <Text style={{ fontSize: 7.5, color: "#475569" }}>Part A – Material Bill:</Text>
              <Text style={{ fontSize: 8, fontWeight: "bold", color: "#0F172A" }}>
                {formatCurrency(partASubtotal)}
              </Text>
            </View>
            <View style={styles.grandTotalRow}>
              <Text style={{ fontSize: 7.5, color: "#475569" }}>Part B – Service Bill:</Text>
              <Text style={{ fontSize: 8, fontWeight: "bold", color: "#0F172A" }}>
                {formatCurrency(partBSubtotal)}
              </Text>
            </View>
          </View>
          <View style={styles.grandTotalRight}>
            <Text style={styles.grandTotalTitle}>
              GRAND TOTAL {formatCurrency(grandTotal)}
            </Text>
          </View>
        </View>

        {/* Page 1 Footer */}
        <View style={styles.pageFooter}>
          <Text>
            PRAGATI ECOSOLAR | {kw} kW Hybrid Solar System – Servotech | Valid 30 Days
          </Text>
          <Text>Page 1</Text>
        </View>
      </Page>

      {/* ──────────────────────────────────────────────────────────────────────────
          PAGE 2: SYSTEM HIGHLIGHTS, BANK DETAILS & COMMERCIAL TERMS
      ────────────────────────────────────────────────────────────────────────── */}
      <Page size="A4" style={styles.page}>
        {/* Top Amber Highlight Box */}
        <View style={styles.highlightBox}>
          <Text style={styles.highlightText}>
            ✦ Hybrid System: Runs On-Grid + Off-Grid simultaneously. Exports surplus solar to grid while charging the 48V battery. Battery provides backup during grid outages (~4–6 hrs at standard load, 50% DoD). DCR panels eligible under PM Surya Ghar Muft Bijli Yojana.
          </Text>
        </View>

        {/* Bank & Terms 2-Column Grid */}
        <View style={styles.bottomGrid}>
          {/* Bank Details Column */}
          <View style={styles.bankColumn}>
            <View style={styles.boxHeaderBar}>
              <Text style={styles.boxHeaderTitle}>BANK DETAILS</Text>
            </View>
            <View style={styles.boxBody}>
              <View style={{ marginBottom: 4 }}>
                <Text style={{ fontSize: 7, color: "#64748B" }}>Bank:</Text>
                <Text style={{ fontSize: 7.5, fontWeight: "bold", color: "#0F172A" }}>
                  IDFC FIRST BANK, BHUBANESWAR
                </Text>
              </View>
              <View style={{ marginBottom: 4 }}>
                <Text style={{ fontSize: 7, color: "#64748B" }}>A/C Name:</Text>
                <Text style={{ fontSize: 7.5, fontWeight: "bold", color: "#0F172A" }}>
                  PRAGATI ECOSOLAR
                </Text>
              </View>
              <View style={{ marginBottom: 4 }}>
                <Text style={{ fontSize: 7, color: "#64748B" }}>A/C No:</Text>
                <Text style={{ fontSize: 8, fontWeight: "bold", color: "#0F172A" }}>
                  86522167402
                </Text>
              </View>
              <View>
                <Text style={{ fontSize: 7, color: "#64748B" }}>IFSC:</Text>
                <Text style={{ fontSize: 7.5, fontWeight: "bold", color: "#0F172A" }}>
                  IDFB0060241
                </Text>
              </View>
            </View>
          </View>

          {/* Terms & Conditions Column */}
          <View style={styles.termsColumn}>
            <View style={styles.boxHeaderBar}>
              <Text style={styles.boxHeaderTitle}>TERMS &amp; CONDITIONS</Text>
            </View>
            <View style={[styles.boxBody, { backgroundColor: "#FFFFFF" }]}>
              <Text style={styles.termItem}>1. This quotation is valid for 30 days from the date of issue.</Text>
              <Text style={styles.termItem}>2. DCR Panels @ 5% GST. Inverter &amp; Battery @ 18% GST. BOS items as applicable.</Text>
              <Text style={styles.termItem}>3. 80% advance required to confirm order. Balance payable before commissioning.</Text>
              <Text style={styles.termItem}>4. Installation @ Rs.3,000/kW + 18% GST. Net Metering Rs.5,000 flat + 18% GST.</Text>
              <Text style={styles.termItem}>5. Hybrid system operates On-Grid + Off-Grid; charges battery while exporting surplus.</Text>
              <Text style={styles.termItem}>6. Battery backup indicative at 50% DoD with standard residential load (~4–6 hrs).</Text>
              <Text style={styles.termItem}>7. OEM warranty on all products. Pragati EcoSolar: 1-year workmanship warranty.</Text>
              <Text style={styles.termItem}>8. PM Surya Ghar subsidy applicable; DISCOM timelines subject to authority schedule.</Text>
              <Text style={styles.termItem}>9. Subject to Bhubaneswar jurisdiction. Queries: +91 9124318222.</Text>
            </View>
          </View>
        </View>

        {/* Signoff Line */}
        <View style={styles.signoffRow}>
          <Text style={styles.signoffTextLeft}>
            Thank you for choosing Pragati EcoSolar
          </Text>
          <Text style={styles.signoffTextRight}>
            Kalpna Sahoo (MD) | Authorised Signatory
          </Text>
        </View>

        {/* Page 2 Footer */}
        <View style={styles.pageFooter}>
          <Text>
            PRAGATI ECOSOLAR | {kw} kW Hybrid Solar System – Servotech | Valid 30 Days
          </Text>
          <Text>Page 2</Text>
        </View>
      </Page>
    </Document>
  );
}
