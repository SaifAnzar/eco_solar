import type { Metadata } from "next";
import { getAllLeads } from "@/lib/data-store";
import { LeadsTable } from "@/components/admin/LeadsTable";

export const metadata: Metadata = { title: "Leads & Quotations" };

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = getAllLeads();

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 className="admin-page-title">Leads & Quotations</h1>
            <p className="admin-page-subtitle">
              {leads.length} quotation{leads.length !== 1 ? "s" : ""} submitted via the solar calculator
            </p>
          </div>
          <div className="admin-badge admin-badge-amber" style={{ fontSize: "0.85rem", padding: "0.4rem 0.875rem" }}>
            {leads.length} Total
          </div>
        </div>
      </div>

      <div className="admin-card">
        <LeadsTable leads={leads} />
      </div>
    </div>
  );
}
