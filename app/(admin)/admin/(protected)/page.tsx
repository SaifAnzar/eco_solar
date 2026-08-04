import type { Metadata } from "next";
import Link from "next/link";
import { getAllLeads } from "@/lib/data-store";
import { getSolarConfig } from "@/lib/data-store";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function AdminDashboardPage() {
  const leads = getAllLeads();
  const config = getSolarConfig();

  const totalLeads = leads.length;
  const totalKw = leads.reduce((sum, l) => sum + (l.calculation?.systemKw || 0), 0);
  const avgKw = totalLeads > 0 ? (totalKw / totalLeads).toFixed(1) : "0";
  const residentialCount = leads.filter(
    (l) => l.calculation?.propertyType === "residential"
  ).length;
  const commercialCount = totalLeads - residentialCount;
  const recentLeads = leads.slice(0, 8);

  // kW distribution buckets
  const buckets = [
    { label: "1–3 kW", min: 1, max: 3 },
    { label: "4–10 kW", min: 4, max: 10 },
    { label: "11–25 kW", min: 11, max: 25 },
    { label: "26–50 kW", min: 26, max: 50 },
    { label: "51–100 kW", min: 51, max: 100 },
  ];
  const distribution = buckets.map((b) => ({
    ...b,
    count: leads.filter(
      (l) => l.calculation?.systemKw >= b.min && l.calculation?.systemKw <= b.max
    ).length,
  }));
  const maxCount = Math.max(...distribution.map((d) => d.count), 1);

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <p className="admin-page-subtitle">
          Welcome back! Here&apos;s a snapshot of Pragati EcoSolar&apos;s quotation activity.
        </p>
      </div>

      {/* Stats Row */}
      <div className="admin-stat-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-label">Total Quotations</div>
          <div className="admin-stat-value" style={{ color: "#F59E0B" }}>{totalLeads}</div>
          <div className="admin-stat-note">All-time lead records</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Total Capacity Quoted</div>
          <div className="admin-stat-value" style={{ color: "#34D399" }}>{totalKw.toFixed(1)}</div>
          <div className="admin-stat-note">kW across all leads</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Avg System Size</div>
          <div className="admin-stat-value">{avgKw}</div>
          <div className="admin-stat-note">kW per lead</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Residential</div>
          <div className="admin-stat-value" style={{ color: "#60A5FA" }}>{residentialCount}</div>
          <div className="admin-stat-note">{commercialCount} commercial</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
        {/* Distribution Chart */}
        <div className="admin-card">
          <h2 className="admin-section-title">System Size Distribution</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {distribution.map((d) => (
              <div key={d.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                  <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)" }}>{d.label}</span>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{d.count}</span>
                </div>
                <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "9999px", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${(d.count / maxCount) * 100}%`,
                      background: "linear-gradient(90deg, #F59E0B, #D97706)",
                      borderRadius: "9999px",
                      transition: "width 0.4s",
                    }}
                  />
                </div>
              </div>
            ))}
            {totalLeads === 0 && (
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.85rem", textAlign: "center", padding: "1rem 0" }}>
                No quotation data yet
              </p>
            )}
          </div>
        </div>

        {/* Config Summary */}
        <div className="admin-card">
          <h2 className="admin-section-title">Active Calculator Config</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              ["Panel Capacity", `${config.panelWp} Wp`],
              ["Panel Unit Rate", `₹${config.panelUnitRate.toLocaleString()}`],
              ["Residential Rate", `₹${config.residentialBenchmarkRate.toLocaleString()} / kW`],
              ["Commercial Rate", `₹${config.commercialBenchmarkRate.toLocaleString()} / kW`],
              ["Grid Tariff", `₹${config.gridTariffRate.toFixed(2)} / unit`],
              ["Default PSH", `${config.defaultPsh} hrs/day`],
              ["Performance Ratio", `${(config.performanceRatio * 100).toFixed(0)}%`],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>{label}</span>
                <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#F9FAFB" }}>{value}</span>
              </div>
            ))}
          </div>
          <Link
            href="/admin/calculator"
            className="admin-btn admin-btn-primary"
            style={{ marginTop: "1.25rem", width: "100%", justifyContent: "center" }}
          >
            Edit Config
          </Link>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="admin-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 className="admin-section-title" style={{ margin: 0 }}>Recent Quotations</h2>
          <Link href="/admin/leads" className="admin-btn" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", padding: "0.4rem 0.875rem" }}>
            View All →
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.875rem", textAlign: "center", padding: "2rem 0" }}>
            No quotations submitted yet. They&apos;ll appear here when customers use the calculator.
          </p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>System Size</th>
                  <th>Type</th>
                  <th>Ref</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.leadId}>
                    <td style={{ color: "#F9FAFB", fontWeight: 500 }}>{lead.customerName}</td>
                    <td style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.8rem" }}>{lead.phone}</td>
                    <td>
                      <span className="admin-badge admin-badge-amber">
                        {lead.calculation?.systemKw} kW
                      </span>
                    </td>
                    <td>
                      <span className={`admin-badge ${lead.calculation?.propertyType === "residential" ? "admin-badge-green" : "admin-badge-blue"}`}>
                        {lead.calculation?.propertyType ?? "—"}
                      </span>
                    </td>
                    <td style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
                      {lead.quotationRef}
                    </td>
                    <td style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
                      {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit", month: "short", year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
