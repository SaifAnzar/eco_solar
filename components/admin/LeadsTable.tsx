"use client";

import { useActionState, useTransition } from "react";
import { deleteLeadAction } from "@/lib/actions/admin-action";
import type { LeadRecord } from "@/lib/data-store";

export function LeadsTable({ leads }: { leads: LeadRecord[] }) {
  const [state, formAction] = useActionState(deleteLeadAction, { success: false, message: "" });
  const [isPending, startTransition] = useTransition();

  const handleDelete = (leadId: string) => {
    if (!confirm(`Delete lead ${leadId}? This cannot be undone.`)) return;
    const fd = new FormData();
    fd.append("leadId", leadId);
    startTransition(() => {
      formAction(fd);
    });
  };

  if (leads.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem 0", color: "rgba(255,255,255,0.25)" }}>
        <svg viewBox="0 0 48 48" fill="none" width="48" height="48" style={{ margin: "0 auto 1rem" }}>
          <circle cx="24" cy="24" r="24" fill="rgba(255,255,255,0.04)" />
          <path d="M16 20h16M16 24h10M16 28h8" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p style={{ fontSize: "0.95rem" }}>No quotation submissions yet.</p>
        <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>When customers submit via the solar calculator, leads appear here.</p>
      </div>
    );
  }

  return (
    <>
      {state.message && (
        <div className={state.success ? "admin-success-banner" : "admin-error-banner"}>
          {state.success ? (
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          ) : (
            <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
          )}
          {state.message}
        </div>
      )}

      <div style={{ overflowX: "auto" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Lead ID</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Location</th>
              <th>DISCOM</th>
              <th>System</th>
              <th>Type</th>
              <th>Net Cost</th>
              <th>Savings/Mo</th>
              <th>Quotation Ref</th>
              <th>Submitted</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.leadId}>
                <td style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.72rem", color: "rgba(255,255,255,0.3)" }}>
                  {lead.leadId}
                </td>
                <td style={{ fontWeight: 600, color: "#F9FAFB", whiteSpace: "nowrap" }}>
                  {lead.customerName}
                </td>
                <td style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.8rem", whiteSpace: "nowrap" }}>
                  {lead.phone}
                </td>
                <td style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
                  {lead.email || "—"}
                </td>
                <td style={{ fontSize: "0.8rem", maxWidth: "160px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {lead.locationLabel}
                </td>
                <td style={{ fontSize: "0.75rem" }}>
                  <span className="admin-badge admin-badge-blue">{lead.discom?.split(" ")[0] || "—"}</span>
                </td>
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
                <td style={{ fontWeight: 600, color: "#F9FAFB", whiteSpace: "nowrap" }}>
                  ₹{lead.calculation?.netPayableCost?.toLocaleString() ?? "—"}
                </td>
                <td style={{ color: "#6EE7B7", fontWeight: 600, whiteSpace: "nowrap" }}>
                  ₹{lead.calculation?.monthlySavingsRs?.toLocaleString() ?? "—"}
                </td>
                <td style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>
                  {lead.quotationRef}
                </td>
                <td style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", whiteSpace: "nowrap" }}>
                  {new Date(lead.createdAt).toLocaleString("en-IN", {
                    day: "2-digit", month: "short", year: "numeric",
                    hour: "2-digit", minute: "2-digit",
                  })}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(lead.leadId)}
                    disabled={isPending}
                    className="admin-btn admin-btn-danger"
                    style={{ padding: "0.35rem 0.75rem", fontSize: "0.78rem" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
