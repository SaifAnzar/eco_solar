import React from "react";
import Link from "next/link";
import {
  Users,
  Package,
  FolderKanban,
  FileText,
  Award,
  Calculator,
  Handshake,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import { getLeads, getSolarPackages, getProjects, getSiteSettings } from "@/lib/actions/admin-actions";
import { getContactInquiriesAction } from "@/lib/actions/contact-inquiry-actions";

export default async function AdminDashboardPage() {
  const [leadsRes, contactInquiriesRes, packagesRes, projectsRes, settingsRes] = await Promise.all([
    getLeads(),
    getContactInquiriesAction(),
    getSolarPackages(),
    getProjects(),
    getSiteSettings(),
  ]);

  const leads = leadsRes.data || [];
  const contactInquiries = contactInquiriesRes.data || [];
  const packages = packagesRes.data || [];
  const projects = projectsRes.data || [];
  const settings = settingsRes.data;

  // Combine inquiries for listing, prioritizing site visit & contact inquiries
  const displayInquiries = contactInquiries.length > 0 ? contactInquiries : leads;
  const totalInquiriesCount = Math.max(contactInquiries.length, leads.length);
  const pendingInquiriesCount = displayInquiries.filter(
    (item: any) => item.status === "NEW" || item.status === "PENDING"
  ).length;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full inline-block mb-3">
            ADMIN CMS OVERVIEW
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Pragati EcoSolar Control Panel</h1>
          <p className="text-xs text-slate-300 mt-1">
            Manage site copy, pricing tables, completed installation portfolio, solar engine parameters, and partner applications.
          </p>
        </div>

        <Link
          href="/admin/site-content"
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0"
        >
          <span>Edit Hero &amp; Site Copy</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Inquiries</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-200">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{totalInquiriesCount}</div>
          <div className="text-xs text-amber-600 font-bold">{pendingInquiriesCount} Pending Review</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Solar Packages</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl border border-amber-200">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{packages.length}</div>
          <div className="text-xs text-emerald-600 font-bold">On-Grid / Off-Grid / Hybrid</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completed Projects</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-200">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{projects.length}</div>
          <div className="text-xs text-blue-600 font-bold">Portfolio Sites</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">DISCOM Empanelment</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl border border-purple-200">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">4 Zones</div>
          <div className="text-xs text-purple-600 font-bold">TPCODL, TPNODL, TPSODL, TPWODL</div>
        </div>
      </div>

      {/* Quick Action Navigation Modules */}
      <div className="space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Admin CMS Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link
            href="/admin/site-content"
            className="bg-white border border-slate-200 hover:border-emerald-400 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200">
                <FileText className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
              Module 1: Site Content CMS
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Edit Hero headline, sub-line, trust counters (`500+`, `5+ MW`), phone number, and Bhubaneswar address.
            </p>
          </Link>

          <Link
            href="/admin/contact-leads"
            className="bg-white border border-slate-200 hover:border-amber-400 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-amber-50 text-amber-700 rounded-xl border border-amber-200">
                <Users className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 transition-colors" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
              Module 2: Leads &amp; Site Visit Inquiries
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              View customer inquiries, filter by Odisha DISCOM zone (`TPCODL`, `TPNODL`), 1-click WhatsApp, and export CSV.
            </p>
          </Link>

          <Link
            href="/admin/packages"
            className="bg-white border border-slate-200 hover:border-blue-400 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-blue-50 text-blue-700 rounded-xl border border-blue-200">
                <Package className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Module 3: Solar Package Pricing CMS
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Add/Edit On-Grid, Off-Grid, and Hybrid package pricing tables, battery capacities, and PM Surya Ghar subsidies.
            </p>
          </Link>

          <Link
            href="/admin/projects"
            className="bg-white border border-slate-200 hover:border-purple-400 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-purple-50 text-purple-700 rounded-xl border border-purple-200">
                <FolderKanban className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-purple-600 transition-colors" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
              Module 4: Projects Portfolio Manager
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Manage completed site installation photos, client testimonials, system kW size, and Odisha district locations.
            </p>
          </Link>

          <Link
            href="/admin/services-schemes"
            className="bg-white border border-slate-200 hover:border-rose-400 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-rose-50 text-rose-700 rounded-xl border border-rose-200">
                <Award className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-rose-600 transition-colors" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
              Module 5: Services &amp; Schemes CMS
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Manage EPC service text descriptions, water pump features, street lighting, and PM Surya Ghar scheme rules.
            </p>
          </Link>

          <Link
            href="/admin/calculator"
            className="bg-white border border-slate-200 hover:border-amber-400 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-amber-50 text-amber-700 rounded-xl border border-amber-200">
                <Calculator className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 transition-colors" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
              Module 6: Calculator Settings
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Configure solar benchmark rates (₹/kW), grid tariffs, PM Surya Ghar central subsidies, and Odisha state subsidies.
            </p>
          </Link>

          <Link
            href="/admin/partnerships"
            className="bg-white border border-slate-200 hover:border-emerald-400 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200">
                <Handshake className="w-6 h-6" />
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 transition-colors" />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
              Module 7: Franchise &amp; Dealership Requests
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              View and manage prospective solar franchise partners and equipment dealer applications submitted across Odisha.
            </p>
          </Link>

          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm space-y-3 border border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-mono uppercase font-bold">
              <Zap className="w-4 h-4" />
              <span>Calculator Protection</span>
            </div>
            <h3 className="text-base font-bold text-white">ROI Calculator Status</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pincode API lookup &amp; DISCOM auto-mapping algorithms are strictly isolated and 100% operational.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Lead Inquiries Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Customer Inquiries</h3>
            <p className="text-xs text-slate-500">Latest site visit and quote requests submitted via website.</p>
          </div>
          <Link
            href="/admin/contact-leads"
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            View All ({displayInquiries.length}) →
          </Link>
        </div>

        {displayInquiries.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 font-mono">
            No inquiries recorded yet. Form submissions from /contact and site visit modals will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Customer Name</th>
                  <th className="p-3.5">Mobile</th>
                  <th className="p-3.5">Location / District</th>
                  <th className="p-3.5">DISCOM / Type</th>
                  <th className="p-3.5">Details</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayInquiries.slice(0, 5).map((l: any) => {
                  const name = l.fullName || "N/A";
                  const phone = l.phone || l.mobileNumber || "N/A";
                  const location = l.location || l.district || "N/A";
                  const discomOrType = l.discomRegion || l.discom || l.systemType || "Site Visit";
                  const details = l.message || l.category || "Rooftop Solar";
                  const status = l.status || "NEW";
                  const dateStr = l.createdAt ? new Date(l.createdAt).toLocaleDateString("en-IN") : "N/A";

                  return (
                    <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5 font-bold text-slate-900">{name}</td>
                      <td className="p-3.5 font-mono text-slate-700">{phone}</td>
                      <td className="p-3.5 text-slate-700">{location}</td>
                      <td className="p-3.5 font-mono text-emerald-700 font-bold">{discomOrType}</td>
                      <td className="p-3.5 text-slate-600 max-w-xs truncate">{details}</td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            status === "NEW" || status === "PENDING"
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          }`}
                        >
                          {status}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-400 text-[11px] font-mono">{dateStr}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
