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
          <div className="admin-stat-value text-amber-500 font-extrabold">{totalLeads}</div>
          <div className="admin-stat-note">All-time lead records</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Total Capacity Quoted</div>
          <div className="admin-stat-value text-emerald-500 dark:text-emerald-400 font-extrabold">{totalKw.toFixed(1)}</div>
          <div className="admin-stat-note">kW across all leads</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Avg System Size</div>
          <div className="admin-stat-value text-slate-900 dark:text-slate-100 font-extrabold">{avgKw}</div>
          <div className="admin-stat-note">kW per lead</div>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-label">Residential</div>
          <div className="admin-stat-value text-blue-500 dark:text-blue-400 font-extrabold">{residentialCount}</div>
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
                  <span className="dash-muted-label text-xs font-semibold">{d.label}</span>
                  <span className="dash-value-label text-xs font-bold">{d.count}</span>
                </div>
                <div className="dash-track" style={{ height: "6px", borderRadius: "9999px", overflow: "hidden" }}>
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
              <p className="dash-table-sub text-xs text-center py-4">
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
                <span className="dash-muted-label text-xs font-medium">{label}</span>
                <span className="dash-value-label text-xs font-bold">{value}</span>
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
          <Link href="/admin/leads" className="admin-btn dash-subtle-btn text-xs px-3 py-1.5 rounded-lg font-semibold">
            View All →
          </Link>
        </div>
        {recentLeads.length === 0 ? (
          <p className="dash-table-sub text-sm text-center py-8">
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
                    <td className="dash-table-title font-semibold text-sm">{lead.customerName}</td>
                    <td className="font-mono text-xs text-amber-600 dark:text-amber-400">{lead.phone}</td>
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
                    <td className="dash-table-sub font-mono text-xs">
                      {lead.quotationRef}
                    </td>
                    <td className="dash-table-sub text-xs">
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
