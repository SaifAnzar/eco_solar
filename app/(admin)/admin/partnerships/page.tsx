"use client";

import React, { useState, useEffect } from "react";
import { Handshake, Trash2, MessageSquare, CheckCircle2, Search, Filter, Loader2, Building, Package } from "lucide-react";
import { getPartnershipsAction, updatePartnershipStatusAction, deletePartnershipAction } from "@/lib/actions/partnership-actions";

export default function AdminPartnershipsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    const res = await getPartnershipsAction();
    if (res.success) {
      setApplications(res.data || []);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const res = await updatePartnershipStatusAction(id, newStatus as any);
    if (res.success) {
      setMessage("Application status updated!");
      fetchApplications();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application record?")) return;
    const res = await deletePartnershipAction(id);
    if (res.success) {
      setMessage("Record deleted.");
      fetchApplications();
    }
  };

  const filtered = applications.filter((item) => {
    const matchesType = typeFilter === "ALL" || item.type === typeFilter;
    const nameMatch = (item.fullName || item.businessName || item.contactPersonName || "").toLowerCase().includes(search.toLowerCase());
    const phoneMatch = (item.mobileNumber || "").includes(search);
    const cityMatch = (item.proposedCity || item.primaryDistrict || "").toLowerCase().includes(search.toLowerCase());
    return matchesType && (nameMatch || phoneMatch || cityMatch);
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold">PARTNER NETWORK</span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">Franchise &amp; Dealership Applications</h1>
          <p className="text-xs text-slate-600 mt-1">
            View and manage prospective solar franchise partners and equipment dealer inquiries across Odisha.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-600 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
            Total Applications: {applications.length}
          </span>
        </div>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Type Tabs */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setTypeFilter("ALL")}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              typeFilter === "ALL"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            All Applications
          </button>
          <button
            onClick={() => setTypeFilter("FRANCHISE")}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              typeFilter === "FRANCHISE"
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Franchise Requests</span>
          </button>
          <button
            onClick={() => setTypeFilter("DEALERSHIP")}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              typeFilter === "DEALERSHIP"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Dealership Requests</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by name, city, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-sans focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* Applications Table / Cards */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-slate-500 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
            Loading partner applications...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-slate-500 space-y-2">
            <p>No partnership applications match your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Applicant / Business</th>
                  <th className="p-3.5">Contact Details</th>
                  <th className="p-3.5">City / District</th>
                  <th className="p-3.5">Business Specs / Investment</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => {
                  const isFranchise = item.type === "FRANCHISE";
                  const phone = item.mobileNumber || item.contactPersonPhone || "";

                  return (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                            isFranchise
                              ? "bg-amber-50 text-amber-800 border-amber-200"
                              : "bg-emerald-50 text-emerald-800 border-emerald-200"
                          }`}
                        >
                          {item.type}
                        </span>
                      </td>

                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">
                          {isFranchise ? item.fullName : item.businessName || item.contactPersonName}
                        </div>
                        {!isFranchise && item.contactPersonName && (
                          <div className="text-[10px] text-slate-500">Contact: {item.contactPersonName}</div>
                        )}
                        {item.gstin && (
                          <div className="text-[10px] font-mono text-slate-400">GST: {item.gstin}</div>
                        )}
                      </td>

                      <td className="p-3.5">
                        <div className="font-mono text-slate-900 font-bold">{phone}</div>
                        <div className="text-[10px] text-slate-500">{item.emailAddress || item.email || "—"}</div>
                      </td>

                      <td className="p-3.5 font-bold text-slate-700">
                        {isFranchise ? item.proposedCity : item.primaryDistrict || "—"}
                      </td>

                      <td className="p-3.5">
                        {isFranchise ? (
                          <div className="space-y-0.5 text-[11px]">
                            <div className="text-slate-700">Space: <strong>{item.showroomSpace || "N/A"}</strong></div>
                            <div className="text-amber-700 font-mono font-bold">Cap: {item.investmentCapacity || "N/A"}</div>
                          </div>
                        ) : (
                          <div className="text-[11px] text-slate-700 font-mono">
                            {Array.isArray(item.productsInterested) ? item.productsInterested.join(", ") : item.productsInterested || "Solar Products"}
                          </div>
                        )}
                      </td>

                      <td className="p-3.5">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value)}
                          className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                            item.status === "PENDING"
                              ? "bg-amber-50 text-amber-800 border-amber-300"
                              : item.status === "CONTACTED"
                              ? "bg-blue-50 text-blue-800 border-blue-300"
                              : "bg-emerald-50 text-emerald-800 border-emerald-300"
                          }`}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="APPROVED">APPROVED</option>
                        </select>
                      </td>

                      <td className="p-3.5 text-[11px] font-mono text-slate-500 whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </td>

                      <td className="p-3.5 flex items-center gap-2">
                        {phone && (
                          <a
                            href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              `Hello ${isFranchise ? item.fullName : item.contactPersonName || item.businessName}, thank you for your interest in a Pragati EcoSolar ${item.type.toLowerCase()}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors border border-emerald-200"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors border border-rose-200"
                          title="Delete Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
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
