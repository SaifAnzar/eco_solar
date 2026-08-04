import type { Metadata } from "next";
import { getAllPartnerships } from "@/lib/data-store";
import { PartnershipsManager } from "@/components/admin/PartnershipsManager";

export const metadata: Metadata = {
  title: "Partnership Applications",
};

export const dynamic = "force-dynamic";

export default async function AdminPartnershipsPage() {
  const partnerships = getAllPartnerships();

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 className="admin-page-title">Partnership Applications</h1>
            <p className="admin-page-subtitle">
              Manage franchise signups and dealership requests from the public site
            </p>
          </div>
          <div className="admin-badge admin-badge-amber" style={{ fontSize: "0.85rem", padding: "0.4rem 0.875rem" }}>
            {partnerships.length} Applications Total
          </div>
        </div>
      </div>

      <PartnershipsManager initialPartnerships={partnerships} />
    </div>
  );
}
