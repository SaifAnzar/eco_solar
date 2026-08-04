import type { Metadata } from "next";
import { AdminPartnershipsConsole } from "@/components/admin/AdminPartnershipsConsole";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Partnership Applications",
};

export const dynamic = "force-dynamic";

export default async function AdminPartnershipsPage() {
  const totalCount = await prisma.partnershipApplication.count();

  return (
    <div className="admin-page space-y-6">
      {/* Admin Page Top Header */}
      <div className="admin-page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 className="admin-page-title">Partnership Applications</h1>
            <p className="admin-page-subtitle">
              Manage franchise signups and dealership requests submitted from the public site.
            </p>
          </div>
          <div className="admin-badge admin-badge-amber" style={{ fontSize: "0.85rem", padding: "0.4rem 0.875rem" }}>
            {totalCount} APPLICATIONS TOTAL
          </div>
        </div>
      </div>

      {/* Main Partnerships Console */}
      <AdminPartnershipsConsole />
    </div>
  );
}
