"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Package, 
  Search, 
  Filter, 
  Phone, 
  Mail, 
  Calendar, 
  FileText, 
  Trash2, 
  RefreshCw, 
  MapPin, 
  DollarSign, 
  Layers
} from "lucide-react";
import type { PartnershipApplication, PartnershipStatus, PartnershipType } from "@/lib/data-store";

interface PartnershipsManagerProps {
  initialPartnerships: PartnershipApplication[];
}

export function PartnershipsManager({ initialPartnerships }: PartnershipsManagerProps) {
  const [partnerships, setPartnerships] = useState<PartnershipApplication[]>(initialPartnerships);
  const [activeTab, setActiveTab] = useState<string>("FRANCHISE");
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  
  // Loading & UI Action State
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "SUCCESS" | "ERROR"; text: string } | null>(null);

  const fetchPartnerships = async () => {
    setIsRefreshing(true);
    setMessage(null);
    try {
      const res = await fetch("/api/partnerships/apply");
      const result = await res.json();
      if (res.ok && result.success) {
        setPartnerships(result.data);
      } else {
        throw new Error(result.error || "Failed to load applications.");
      }
    } catch (err: any) {
      setMessage({ type: "ERROR", text: err.message || "Failed to refresh list." });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: PartnershipStatus) => {
    setLoadingId(id);
    setMessage(null);
    try {
      const res = await fetch("/api/partnerships/apply", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      
      const result = await res.json();
      if (res.ok && result.success) {
        setPartnerships((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        setMessage({ type: "SUCCESS", text: "Status updated successfully." });
      } else {
        throw new Error(result.error || "Failed to update status.");
      }
    } catch (err: any) {
      setMessage({ type: "ERROR", text: err.message || "Failed to update status." });
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application? This action cannot be undone.")) return;
    setLoadingId(id);
    setMessage(null);
    try {
      const res = await fetch(`/api/partnerships/apply?id=${id}`, {
        method: "DELETE",
      });
      
      const result = await res.json();
      if (res.ok && result.success) {
        setPartnerships((prev) => prev.filter((item) => item.id !== id));
        setMessage({ type: "SUCCESS", text: "Application deleted successfully." });
      } else {
        throw new Error(result.error || "Failed to delete application.");
      }
    } catch (err: any) {
      setMessage({ type: "ERROR", text: err.message || "Failed to delete application." });
    } finally {
      setLoadingId(null);
    }
  };

  // Filter and Search Applications
  const filteredApplications = partnerships.filter((app) => {
    // 1. Filter by tab type
    if (activeTab === "FRANCHISE" && app.type !== "FRANCHISE") return false;
    if (activeTab === "DEALERSHIP" && app.type !== "PARTNER" && (app.type as any) !== "DEALERSHIP") return false;

    // 2. Filter by status
    if (statusFilter !== "ALL" && app.status !== statusFilter) return false;

    // 3. Filter by search query (case-insensitive)
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      if (activeTab === "FRANCHISE") {
        const nameMatch = app.fullName?.toLowerCase().includes(query);
        const cityMatch = app.proposedCity?.toLowerCase().includes(query);
        const phoneMatch = app.mobileNumber?.includes(query);
        const emailMatch = app.emailAddress?.toLowerCase().includes(query);
        return nameMatch || cityMatch || phoneMatch || emailMatch;
      } else {
        // DEALERSHIP
        const bizMatch = app.businessName?.toLowerCase().includes(query);
        const personMatch = app.contactPersonName?.toLowerCase().includes(query);
        const distMatch = app.primaryDistrict?.toLowerCase().includes(query);
        const phoneMatch = app.mobileNumber?.includes(query);
        return bizMatch || personMatch || distMatch || phoneMatch;
      }
    }

    return true;
  });

  const getStatusBadgeClass = (status: PartnershipStatus) => {
    switch (status) {
      case "PENDING":
        return "admin-badge-amber";
      case "CONTACTED":
        return "admin-badge-blue";
      case "APPROVED":
        return "admin-badge-green";
      default:
        return "admin-badge-amber";
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Messages */}
      {message && (
        <div className={message.type === "SUCCESS" ? "admin-success-banner" : "admin-error-banner"}>
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="ml-auto text-xs opacity-50 hover:opacity-100">✕</button>
        </div>
      )}

      {/* Tabs Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800/80">
          <button
            onClick={() => {
              setActiveTab("FRANCHISE");
              setSearchQuery("");
            }}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === "FRANCHISE"
                ? "bg-amber-500 text-slate-950 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Building2 className="w-4 h-4" />
            Franchise Applications
            <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
              activeTab === "FRANCHISE" ? "bg-amber-600/25 text-amber-950" : "bg-slate-900 text-slate-500"
            }`}>
              {partnerships.filter(p => p.type === "FRANCHISE").length}
            </span>
          </button>
          
          <button
            onClick={() => {
              setActiveTab("DEALERSHIP");
              setSearchQuery("");
            }}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeTab === "DEALERSHIP"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Package className="w-4 h-4" />
            Dealership Applications
            <span className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
              activeTab === "DEALERSHIP" ? "bg-emerald-850 text-emerald-250" : "bg-slate-900 text-slate-500"
            }`}>
              {partnerships.filter(p => p.type === "PARTNER" || (p.type as any) === "DEALERSHIP").length}
            </span>
          </button>
        </div>

        {/* Refresh Button */}
        <button
          onClick={fetchPartnerships}
          disabled={isRefreshing}
          className="admin-btn flex items-center justify-center p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all disabled:opacity-50"
          title="Refresh Data"
        >
          <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Search & Filters Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/80">
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeTab === "FRANCHISE"
                ? "Search by applicant name, city, phone..."
                : "Search by shop name, contact, district..."
            }
            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-300 placeholder-slate-500 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 focus:outline-none"
          />
        </div>

        {/* Status Filter */}
        <div className="relative flex items-center">
          <Filter className="absolute left-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-350 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 focus:outline-none appearance-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="CONTACTED">Contacted</option>
            <option value="APPROVED">Approved</option>
          </select>
        </div>
        
        {/* Status Counts */}
        <div className="flex items-center justify-around text-[10px] uppercase tracking-wider font-bold text-slate-500 border border-slate-850 bg-slate-900/20 rounded-xl px-2">
          <div>Pending: <span className="text-amber-400">{filteredApplications.filter(a => a.status === "PENDING").length}</span></div>
          <div className="text-slate-800">|</div>
          <div>Contacted: <span className="text-blue-400">{filteredApplications.filter(a => a.status === "CONTACTED").length}</span></div>
          <div className="text-slate-800">|</div>
          <div>Approved: <span className="text-emerald-400">{filteredApplications.filter(a => a.status === "APPROVED").length}</span></div>
        </div>

      </div>

      {/* Applications Table */}
      <div className="admin-card overflow-hidden">
        {filteredApplications.length === 0 ? (
          <div className="text-center py-16 text-slate-500 space-y-3">
            <Layers className="w-12 h-12 text-slate-700 mx-auto animate-pulse" />
            <p className="text-sm font-semibold">No applications found matching the search criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {activeTab === "FRANCHISE" ? (
              /* FRANCHISE TABLE */
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Applicant Name</th>
                    <th>City / District</th>
                    <th>Investment</th>
                    <th>Space (sq ft)</th>
                    <th>Contact Info</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="group">
                      {/* Date */}
                      <td style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
                        <div className="flex items-center gap-1.5 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-slate-600" />
                          {new Date(app.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit", month: "short", year: "numeric",
                          })}
                        </div>
                      </td>

                      {/* Applicant Name */}
                      <td style={{ color: "#F9FAFB", fontWeight: 600 }}>
                        <div className="font-semibold">{app.fullName}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">ID: {app.id}</div>
                      </td>

                      {/* Proposed City */}
                      <td>
                        <div className="flex items-center gap-1 text-slate-300 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{app.proposedCity}</span>
                        </div>
                      </td>

                      {/* Investment */}
                      <td>
                        <span className="admin-badge admin-badge-blue text-[10px]">
                          {app.investmentCapacity}
                        </span>
                      </td>

                      {/* Showroom Space */}
                      <td className="font-mono text-slate-350 font-medium">
                        {app.showroomSpace ? `${app.showroomSpace} sq ft` : "—"}
                      </td>

                      {/* Contact Info */}
                      <td>
                        <div className="space-y-1">
                          <a href={`tel:${app.mobileNumber}`} className="flex items-center gap-1 text-xs font-mono font-bold text-slate-400 hover:text-amber-500 transition-colors">
                            <Phone className="w-3 h-3 text-slate-600" />
                            {app.mobileNumber}
                          </a>
                          <a href={`mailto:${app.emailAddress}`} className="flex items-center gap-1 text-xs text-slate-400 hover:text-amber-500 transition-colors">
                            <Mail className="w-3 h-3 text-slate-600" />
                            {app.emailAddress}
                          </a>
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <span className={`admin-badge ${getStatusBadgeClass(app.status)}`}>
                          {app.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="flex items-center justify-end gap-2">
                          {/* Action Selector */}
                          <select
                            value={app.status}
                            disabled={loadingId === app.id}
                            onChange={(e) => handleStatusChange(app.id, e.target.value as PartnershipStatus)}
                            className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-300 focus:outline-none cursor-pointer disabled:opacity-50"
                          >
                            <option value="PENDING">Pending</option>
                            <option value="CONTACTED">Contacted</option>
                            <option value="APPROVED">Approved</option>
                          </select>

                          {/* Delete Action */}
                          <button
                            onClick={() => handleDelete(app.id)}
                            disabled={loadingId === app.id}
                            className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-500 hover:text-rose-400 hover:border-rose-950 transition-colors disabled:opacity-50"
                            title="Delete Application"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              /* DEALERSHIP TABLE */
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Business / Shop</th>
                    <th>Contact Person</th>
                    <th>District Coverage</th>
                    <th>GSTIN</th>
                    <th>Selected Products</th>
                    <th>Contact Info</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="group">
                      {/* Date */}
                      <td style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" }}>
                        <div className="flex items-center gap-1.5 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-slate-600" />
                          {new Date(app.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit", month: "short", year: "numeric",
                          })}
                        </div>
                      </td>

                      {/* Business Name */}
                      <td style={{ color: "#F9FAFB", fontWeight: 600 }}>
                        <div className="font-semibold text-amber-500">{app.businessName}</div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">ID: {app.id}</div>
                      </td>

                      {/* Contact Person Name */}
                      <td className="text-slate-300 font-semibold">
                        {app.contactPersonName}
                      </td>

                      {/* District Coverage */}
                      <td>
                        <div className="flex items-center gap-1 text-slate-300 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{app.primaryDistrict}</span>
                        </div>
                      </td>

                      {/* GSTIN */}
                      <td className="font-mono text-xs text-slate-350">
                        {app.gstin ? app.gstin : <span className="text-slate-600">None</span>}
                      </td>

                      {/* Selected Products */}
                      <td className="max-w-[150px]">
                        <div className="flex flex-wrap gap-1">
                          {app.productsInterested?.map((p, idx) => (
                            <span key={idx} className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-300 rounded text-[9px] font-bold">
                              {p}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td>
                        <div className="space-y-1">
                          <a href={`tel:${app.mobileNumber}`} className="flex items-center gap-1 text-xs font-mono font-bold text-slate-400 hover:text-emerald-500 transition-colors">
                            <Phone className="w-3 h-3 text-slate-600" />
                            {app.mobileNumber}
                          </a>
                          <a href={`mailto:${app.emailAddress}`} className="flex items-center gap-1 text-xs text-slate-400 hover:text-emerald-500 transition-colors">
                            <Mail className="w-3 h-3 text-slate-600" />
                            {app.emailAddress}
                          </a>
                        </div>
                      </td>

                      {/* Status */}
                      <td>
                        <span className={`admin-badge ${getStatusBadgeClass(app.status)}`}>
                          {app.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td>
                        <div className="flex items-center justify-end gap-2">
                          {/* Action Selector */}
                          <select
                            value={app.status}
                            disabled={loadingId === app.id}
                            onChange={(e) => handleStatusChange(app.id, e.target.value as PartnershipStatus)}
                            className="bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-xs text-slate-300 focus:outline-none cursor-pointer disabled:opacity-50"
                          >
                            <option value="PENDING">Pending</option>
                            <option value="CONTACTED">Contacted</option>
                            <option value="APPROVED">Approved</option>
                          </select>

                          {/* Delete Action */}
                          <button
                            onClick={() => handleDelete(app.id)}
                            disabled={loadingId === app.id}
                            className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-500 hover:text-rose-400 hover:border-rose-950 transition-colors disabled:opacity-50"
                            title="Delete Application"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
