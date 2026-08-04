import type { Metadata } from "next";
import { getAllContactInquiries } from "@/lib/data-store";
import ContactLeadsManager from "@/components/admin/ContactLeadsManager";

export const metadata: Metadata = {
  title: "Contact Inquiries",
};

export const dynamic = "force-dynamic";

export default function AdminContactLeadsPage() {
  const initialInquiries = getAllContactInquiries();

  return (
    <div className="admin-page space-y-6">
      <div className="admin-page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 className="admin-page-title">Contact Us Inquiries</h1>
            <p className="admin-page-subtitle">
              Manage leads, site survey requests, and customer inquiries submitted from the Contact Us page.
            </p>
          </div>
          <div className="admin-badge admin-badge-amber" style={{ fontSize: "0.85rem", padding: "0.4rem 0.875rem" }}>
            {initialInquiries.length} Inquiries
          </div>
        </div>
      </div>

      <ContactLeadsManager initialInquiries={initialInquiries} />
    </div>
  );
}
