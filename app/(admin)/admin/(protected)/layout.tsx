import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard | Pragati EcoSolar",
    template: "%s | Admin — Pragati EcoSolar",
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="admin-shell">
      <AdminSidebar adminEmail={session.email} />
      <main className="admin-main">{children}</main>

      <style>{`
        .admin-shell {
          display: flex;
          min-height: 100vh;
          background: #0A0F1E;
          font-family: var(--font-sans, system-ui, sans-serif);
        }
        .admin-main {
          flex: 1;
          overflow-x: hidden;
          overflow-y: auto;
        }

        /* ─── Sidebar ─── */
        .admin-sidebar {
          width: 260px;
          min-height: 100vh;
          background: rgba(255,255,255,0.03);
          border-right: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          padding: 1.5rem 1rem;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          flex-shrink: 0;
        }
        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0 0.5rem 1.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          margin-bottom: 1.5rem;
        }
        .sidebar-logo {
          width: 36px;
          height: 36px;
          flex-shrink: 0;
        }
        .sidebar-brand-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: #F9FAFB;
          line-height: 1.2;
        }
        .sidebar-brand-sub {
          font-size: 0.7rem;
          color: #F59E0B;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.7rem 0.875rem;
          border-radius: 10px;
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          transition: all 0.15s;
        }
        .sidebar-link:hover {
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.85);
        }
        .sidebar-link.active {
          background: rgba(245,158,11,0.12);
          color: #F59E0B;
          font-weight: 600;
        }
        .sidebar-icon {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .sidebar-footer {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding-top: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .sidebar-user {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          min-width: 0;
        }
        .sidebar-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #F59E0B, #D97706);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          color: #0A0F1E;
          flex-shrink: 0;
        }
        .sidebar-user-info { min-width: 0; }
        .sidebar-user-role {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          font-weight: 600;
        }
        .sidebar-user-email {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.55);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .sidebar-logout {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 0.4rem;
          color: rgba(255,255,255,0.35);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
          flex-shrink: 0;
        }
        .sidebar-logout:hover { background: rgba(239,68,68,0.12); color: #FCA5A5; border-color: rgba(239,68,68,0.2); }

        /* Shared admin utilities */
        .admin-page { padding: 2rem 2.5rem; }
        .admin-page-header { margin-bottom: 2rem; }
        .admin-page-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #F9FAFB;
          margin: 0 0 0.25rem;
          letter-spacing: -0.02em;
        }
        .admin-page-subtitle {
          font-size: 0.875rem;
          color: rgba(255,255,255,0.45);
          margin: 0;
        }
        .admin-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.5rem;
        }
        .admin-stat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .admin-stat-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 1.25rem 1.5rem;
        }
        .admin-stat-label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: rgba(255,255,255,0.4);
          margin-bottom: 0.5rem;
        }
        .admin-stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: #F9FAFB;
          line-height: 1;
        }
        .admin-stat-note {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.3);
          margin-top: 0.25rem;
        }
        .admin-section-title {
          font-size: 1rem;
          font-weight: 600;
          color: #F9FAFB;
          margin: 0 0 1rem;
        }
        .admin-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .admin-badge-amber {
          background: rgba(245,158,11,0.15);
          color: #FCD34D;
          border: 1px solid rgba(245,158,11,0.2);
        }
        .admin-badge-green {
          background: rgba(16,185,129,0.12);
          color: #6EE7B7;
          border: 1px solid rgba(16,185,129,0.2);
        }
        .admin-badge-blue {
          background: rgba(59,130,246,0.12);
          color: #93C5FD;
          border: 1px solid rgba(59,130,246,0.2);
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
        }
        .admin-table th {
          text-align: left;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.35);
          padding: 0 0.75rem 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .admin-table td {
          padding: 0.875rem 0.75rem;
          font-size: 0.875rem;
          color: rgba(255,255,255,0.75);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          vertical-align: middle;
        }
        .admin-table tr:last-child td { border-bottom: none; }
        .admin-table tr:hover td { background: rgba(255,255,255,0.02); }
        .admin-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1.25rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: all 0.15s;
          border: none;
          text-decoration: none;
        }
        .admin-btn-primary {
          background: linear-gradient(135deg, #F59E0B, #D97706);
          color: #0A0F1E;
        }
        .admin-btn-primary:hover:not(:disabled) { opacity: 0.88; transform: translateY(-1px); }
        .admin-btn-danger {
          background: rgba(239,68,68,0.1);
          color: #FCA5A5;
          border: 1px solid rgba(239,68,68,0.2);
        }
        .admin-btn-danger:hover:not(:disabled) { background: rgba(239,68,68,0.2); }
        .admin-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .admin-success-banner {
          display: flex; align-items: center; gap: 0.5rem;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.2);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          color: #6EE7B7;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
        }
        .admin-error-banner {
          display: flex; align-items: center; gap: 0.5rem;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          color: #FCA5A5;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
        }
        .admin-spinner-sm {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.2);
          border-top-color: #F59E0B;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .admin-sidebar { display: none; }
          .admin-page { padding: 1.25rem; }
        }
      `}</style>
    </div>
  );
}
