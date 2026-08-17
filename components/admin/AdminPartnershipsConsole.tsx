"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Building2,
  Package,
  Search,
  Phone,
  Mail,
  MapPin,
  Trash2,
  Store,
  RefreshCw,
  Eye,
  X,
  MessageSquare,
  User,
  IndianRupee,
  Briefcase,
  Building,
} from "lucide-react";

export type ApplicationType = "FRANCHISE" | "DEALERSHIP";
export type ApplicationStatus = "PENDING" | "CONTACTED" | "APPROVED" | "REVIEWED" | "REJECTED";

export interface PartnershipApp {
  id: string;
  type: ApplicationType;
  status: ApplicationStatus;
  createdAt: string;

  fullName: string;
  phone: string;
  email: string;
  district: string;

  // Franchise specific
  showroomSpaceSqFt?: string;
  investmentCapacity?: string;
  businessExperience?: string;

  // Dealership specific
  businessName?: string;
  gstin?: string;
  interestedProducts?: string[];
}

export function AdminPartnershipsConsole() {
  const [activeTab, setActiveTab] = useState<ApplicationType>("FRANCHISE");
  const [applications, setApplications] = useState<PartnershipApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedApp, setSelectedApp] = useState<PartnershipApp | null>(null);

  const fetchApplications = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/partnerships");
      if (res.ok) {
        const data = await res.json();
        setApplications(data.data || data.applications || []);
      }
    } catch (err) {
      console.error("Failed to fetch applications", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleStatusChange = async (id: string, newStatus: ApplicationStatus) => {
    setIsUpdating(id);
    try {
      const res = await fetch("/api/admin/partnerships", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus } : app))
        );
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp({ ...selectedApp, status: newStatus });
        }
      }
    } catch (err) {
      console.error("Failed to update status", err);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    setIsUpdating(id);
    try {
      const res = await fetch(`/api/admin/partnerships?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setApplications((prev) => prev.filter((app) => app.id !== id));
        if (selectedApp?.id === id) setSelectedApp(null);
      }
    } catch (err) {
      console.error("Failed to delete application", err);
    } finally {
      setIsUpdating(null);
    }
  };

  // Filter logic
  const filteredApplications = applications.filter((app) => {
    if (app.type !== activeTab) return false;

    const query = searchTerm.toLowerCase();
    const matchesQuery =
      (app.fullName || "").toLowerCase().includes(query) ||
      (app.phone || "").toLowerCase().includes(query) ||
      (app.email || "").toLowerCase().includes(query) ||
      (app.district || "").toLowerCase().includes(query) ||
      (app.businessName && app.businessName.toLowerCase().includes(query));

    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;

    return matchesQuery && matchesStatus;
  });

  const totalCount = applications.length;
  const pendingCount = applications.filter((a) => a.status === "PENDING").length;
  const contactedCount = applications.filter((a) => a.status === "CONTACTED").length;
  const approvedCount = applications.filter((a) => a.status === "APPROVED").length;

  return (
    <div className="space-y-6">

      {/* Top Header Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="admin-stat-card">
          <div className="admin-stat-label">Total Applications</div>
          <div className="admin-stat-value" style={{ color: "#F59E0B" }}>
            {totalCount}
          </div>
          <div className="admin-stat-note">Submitted via website</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-label">Pending Review</div>
          <div className="admin-stat-value" style={{ color: "#EF4444" }}>
            {pendingCount}
          </div>
          <div className="admin-stat-note">Requires immediate response</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-label">Contacted</div>
          <div className="admin-stat-value" style={{ color: "#3B82F6" }}>
            {contactedCount}
          </div>
          <div className="admin-stat-note">In active discussion</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-label">Approved</div>
          <div className="admin-stat-value" style={{ color: "#10B981" }}>
            {approvedCount}
          </div>
          <div className="admin-stat-note">Partner onboarded</div>
        </div>
      </div>

      {/* Filter and Search Bar Card */}
      <div className="admin-card space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

          {/* Left: Tab Selector Pill */}
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/80 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab("FRANCHISE")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "FRANCHISE"
                  ? "bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-amber-500" />
              <span>Franchise Applications</span>
            </button>
            <button
              onClick={() => setActiveTab("DEALERSHIP")}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "DEALERSHIP"
                  ? "bg-blue-500/20 text-blue-700 dark:text-blue-400 border border-blue-500/30 font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Package className="w-3.5 h-3.5 text-blue-500" />
              <span>Dealership Applications</span>
            </button>
          </div>

          {/* Search Input & Dropdown Filters */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, phone, email, district..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700/60 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 bg-white dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700/60 rounded-xl text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="ALL">All Statuses ({totalCount})</option>
              <option value="PENDING">Pending ({pendingCount})</option>
              <option value="CONTACTED">Contacted ({contactedCount})</option>
              <option value="APPROVED">Approved ({approvedCount})</option>
              <option value="REVIEWED">Reviewed</option>
              <option value="REJECTED">Rejected</option>
            </select>

            <button
              onClick={() => {
                setRefreshing(true);
                fetchApplications();
              }}
              title="Refresh Applications"
              className="p-2.5 bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 rounded-xl transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin text-amber-500" : ""}`} />
            </button>
          </div>

        </div>
      </div>

      {/* Main Data Table Card */}
      <div className="admin-card overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse flex items-center justify-between gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-900/40">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                </div>
                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-28" />
              </div>
            ))}
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-12 text-slate-400 space-y-3">
            <Building2 className="w-10 h-10 mx-auto text-slate-400 dark:text-slate-600 opacity-60" />
            <p className="text-sm">No partnership applications found matching your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table w-full text-left text-xs">
              <thead>
                <tr>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Applicant Info</th>
                  <th className="py-3 px-4">District / Location</th>
                  {activeTab === "FRANCHISE" ? (
                    <>
                      <th className="py-3 px-4">Showroom Space</th>
                      <th className="py-3 px-4">Investment</th>
                      <th className="py-3 px-4">Experience</th>
                    </>
                  ) : (
                    <>
                      <th className="py-3 px-4">Firm / GSTIN</th>
                      <th className="py-3 px-4">Product Categories</th>
                    </>
                  )}
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4 align-top">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                        disabled={isUpdating === app.id}
                        className={`text-[11px] font-bold rounded-lg px-2.5 py-1 border focus:outline-none cursor-pointer ${
                          app.status === "PENDING"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                            : app.status === "CONTACTED"
                            ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30"
                            : app.status === "APPROVED"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                            : app.status === "REVIEWED"
                            ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                        }`}
                      >
                        <option value="PENDING" className="bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400">PENDING</option>
                        <option value="CONTACTED" className="bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400">CONTACTED</option>
                        <option value="REVIEWED" className="bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400">REVIEWED</option>
                        <option value="APPROVED" className="bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400">APPROVED</option>
                        <option value="REJECTED" className="bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400">REJECTED</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 align-top dash-table-sub font-mono text-[11px] whitespace-nowrap">
                      {new Date(app.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Applicant Info */}
                    <td className="py-3.5 px-4 align-top space-y-1">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{app.fullName}</div>
                      {app.businessName && (
                        <div className="text-xs font-semibold text-amber-600 dark:text-amber-400">{app.businessName}</div>
                      )}
                      <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-mono">
                        <Phone className="w-3 h-3 text-amber-500" />
                        <a href={`tel:${app.phone}`} className="hover:underline">{app.phone}</a>
                      </div>
                      <div className="flex items-center gap-1.5 dash-table-sub text-[11px]">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <a href={`mailto:${app.email}`} className="hover:underline">{app.email}</a>
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4 align-top space-y-1">
                      <div className="flex items-start gap-1.5 text-slate-800 dark:text-slate-200 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{app.district}</span>
                      </div>
                    </td>

                    {/* Franchise Columns */}
                    {activeTab === "FRANCHISE" ? (
                      <>
                        <td className="py-3.5 px-4 align-top">
                          <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-300 font-medium">
                            <Store className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            <span>{app.showroomSpaceSqFt ? `${app.showroomSpaceSqFt}` : "N/A"}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 align-top">
                          <span className="inline-block text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                            {app.investmentCapacity || "Flexible"}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 align-top max-w-xs">
                          <p className="text-slate-700 dark:text-slate-300 text-[11px] line-clamp-2">
                            {app.businessExperience || "No experience details provided."}
                          </p>
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="text-[10px] font-bold text-amber-500 hover:underline inline-flex items-center gap-1 mt-1 cursor-pointer"
                          >
                            <Eye className="w-3 h-3" />
                            <span>View Full Record</span>
                          </button>
                        </td>
                      </>
                    ) : (
                      /* Dealership Columns */
                      <>
                        <td className="py-3.5 px-4 align-top space-y-1">
                          <div className="font-semibold text-slate-900 dark:text-white text-xs">{app.businessName || app.fullName}</div>
                          <div className="text-[10px] dash-table-sub font-mono">GSTIN: {app.gstin || "N/A"}</div>
                        </td>

                        <td className="py-3.5 px-4 align-top max-w-xs">
                          {app.interestedProducts && app.interestedProducts.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {app.interestedProducts.map((p, idx) => (
                                <span
                                  key={idx}
                                  className="inline-block px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 rounded text-[11px] font-semibold text-blue-700 dark:text-blue-400"
                                >
                                  {p}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs dash-table-sub">All Products</span>
                          )}
                        </td>
                      </>
                    )}

                    {/* Actions */}
                    <td className="py-3.5 px-4 align-top text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          title="View Full Application Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(app.id)}
                          disabled={isUpdating === app.id}
                          title="Delete Application"
                          className="p-1.5 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors border border-transparent hover:border-rose-200 dark:hover:border-rose-500/20 disabled:opacity-50 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* FULL CATEGORIZED DETAIL MODAL DRAWER */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4 pr-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${
                      selectedApp.type === "FRANCHISE"
                        ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                        : "bg-blue-500/20 text-blue-400 border-blue-500/40"
                    }`}
                  >
                    {selectedApp.type} APPLICATION
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">Ref ID: {selectedApp.id}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {selectedApp.fullName}
                </h3>
                {selectedApp.businessName && (
                  <p className="text-xs font-semibold text-amber-400 mt-0.5">
                    {selectedApp.businessName}
                  </p>
                )}
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categorized Content Grid */}
            <div className="space-y-5 text-xs">
              
              {/* Category 1: Applicant Profile */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="font-bold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-2 border-b border-slate-800 pb-2">
                  <User className="w-4 h-4 text-amber-400" />
                  <span>Category 1: Applicant &amp; Business Profile</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Full Name:</span>
                    <span className="font-bold text-white text-sm">{selectedApp.fullName}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Business / Firm Name:</span>
                    <span className="font-bold text-white text-sm">{selectedApp.businessName || "N/A"}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Partnership Model:</span>
                    <span className="font-bold text-amber-400">{selectedApp.type}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Submission Date:</span>
                    <span className="font-mono text-slate-300">
                      {new Date(selectedApp.createdAt).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Category 2: Contact & Territory */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Category 2: Contact &amp; Territory Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Phone Number:</span>
                    <span className="font-mono font-bold text-white text-xs">{selectedApp.phone}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Email Address:</span>
                    <span className="font-medium text-white text-xs">{selectedApp.email}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Target Location:</span>
                    <span className="font-bold text-emerald-400 text-xs">{selectedApp.district}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <a
                    href={`tel:${selectedApp.phone}`}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-[11px] inline-flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Phone</span>
                  </a>

                  <a
                    href={`https://wa.me/${selectedApp.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Hello ${selectedApp.fullName}, regarding your Pragati EcoSolar ${selectedApp.type.toLowerCase()} application.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl text-[11px] inline-flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Category 3: Financial & Commercial */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="font-bold text-purple-400 uppercase tracking-wider text-[11px] flex items-center gap-2 border-b border-slate-800 pb-2">
                  <IndianRupee className="w-4 h-4 text-purple-400" />
                  <span>Category 3: Capital &amp; Showroom Space</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Investment Capacity:</span>
                    <span className="font-bold text-purple-400 text-xs">{selectedApp.investmentCapacity || "N/A"}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Showroom Space Sq. Ft.:</span>
                    <span className="font-bold text-slate-200 text-xs">{selectedApp.showroomSpaceSqFt || "N/A"}</span>
                  </div>

                  {selectedApp.gstin && (
                    <div>
                      <span className="text-slate-400 block text-[10px]">GSTIN:</span>
                      <span className="font-mono text-slate-200">{selectedApp.gstin}</span>
                    </div>
                  )}

                  {selectedApp.interestedProducts && selectedApp.interestedProducts.length > 0 && (
                    <div className="col-span-2">
                      <span className="text-slate-400 block text-[10px] mb-1">Products Interested:</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedApp.interestedProducts.map((p, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-slate-800 border border-slate-700 text-slate-200 rounded text-[10px]">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Category 4: Experience & Background */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="font-bold text-blue-400 uppercase tracking-wider text-[11px] flex items-center gap-2 border-b border-slate-800 pb-2">
                  <Briefcase className="w-4 h-4 text-blue-400" />
                  <span>Category 4: Business Background &amp; Solar Experience Notes</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-medium bg-slate-900 p-3.5 rounded-xl border border-slate-800 whitespace-pre-wrap">
                  {selectedApp.businessExperience || "No experience notes submitted."}
                </p>
              </div>

              {/* Status Update Control Footer */}
              <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">Status:</span>
                  <select
                    value={selectedApp.status}
                    onChange={(e) => handleStatusChange(selectedApp.id, e.target.value as ApplicationStatus)}
                    className="bg-amber-500 text-slate-950 font-black px-3 py-1.5 rounded-xl text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="REVIEWED">REVIEWED</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(selectedApp.id)}
                    className="px-4 py-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 font-bold text-xs rounded-xl border border-rose-500/40 transition-colors cursor-pointer"
                  >
                    Delete Application
                  </button>

                  <button
                    onClick={() => setSelectedApp(null)}
                    className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
