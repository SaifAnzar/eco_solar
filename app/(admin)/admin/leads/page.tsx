"use client";

import React, { useState, useEffect } from "react";
import { Users, Filter, Download, MessageSquare, CheckCircle2, Search, Loader2, Trash2 } from "lucide-react";
import { getLeads, updateLeadStatus, deleteLeadAction } from "@/lib/actions/admin-actions";
import { showToast, showConfirmDialog } from "@/lib/toast";

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [discomFilter, setDiscomFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchLeads();
  }, [discomFilter, statusFilter]);

  const fetchLeads = async () => {
    setLoading(true);
    const res = await getLeads({ discom: discomFilter, status: statusFilter });
    if (res.success) {
      setLeads(res.data || []);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    const res = await updateLeadStatus(id, newStatus);
    if (res.success) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l)));
      showToast(`Lead status updated to ${newStatus}.`, "info");
    } else {
      showToast(res.error || "Failed to update lead status.", "error");
    }
  };

  const handleDeleteLead = async (id: string) => {
    const confirmed = await showConfirmDialog(
      "Delete Lead Record?",
      "Are you sure you want to delete this lead inquiry record?",
      "Yes, Delete"
    );
    if (!confirmed) return;

    const targetItem = leads.find((l) => l.id === id);
    const targetPhone = targetItem?.mobileNumber?.replace(/\D/g, "");

    setLeads((prev) =>
      prev.filter(
        (l) => l.id !== id && (!targetPhone || (l.mobileNumber || "").replace(/\D/g, "") !== targetPhone)
      )
    );
    const res = await deleteLeadAction(id);
    if (res.success) {
      showToast("Lead record deleted successfully!", "success");
      fetchLeads();
    } else {
      showToast(res.error || "Failed to delete lead record.", "error");
      fetchLeads();
    }
  };



  const exportCSV = () => {
    if (leads.length === 0) return;
    const headers = ["ID", "Customer Name", "Mobile Number", "Email", "Pincode", "District", "DISCOM", "Category", "System Type", "Monthly Bill", "Status", "Date"];
    const rows = leads.map((l) => [
      l.id,
      `"${l.fullName}"`,
      `"${l.mobileNumber}"`,
      `"${l.email || ""}"`,
      `"${l.pincode}"`,
      `"${l.district}"`,
      `"${l.discom || ""}"`,
      `"${l.category}"`,
      `"${l.systemType}"`,
      l.monthlyBill || 0,
      `"${l.status}"`,
      `"${new Date(l.createdAt).toLocaleDateString()}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `pragati_ecosolar_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${leads.length} lead records to CSV file!`, "success");
  };

  const filteredLeads = leads.filter((l) => {
    const query = searchQuery.toLowerCase();
    return (
      l.fullName.toLowerCase().includes(query) ||
      l.mobileNumber.includes(query) ||
      l.district.toLowerCase().includes(query) ||
      l.pincode.includes(query)
    );
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold">MODULE 2</span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">Leads &amp; Site Visit Management</h1>
          <p className="text-xs text-slate-600 mt-1">
            View customer inquiries, filter by Odisha DISCOM zone (`TPCODL`, `TPNODL`, `TPSODL`, `TPWODL`), contact via WhatsApp, and export CSV.
          </p>
        </div>

        <button
          onClick={exportCSV}
          disabled={leads.length === 0}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 shrink-0"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Export CSV ({leads.length})</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, mobile, district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-emerald-600"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs font-bold text-slate-600">DISCOM Zone:</span>
            <select
              value={discomFilter}
              onChange={(e) => setDiscomFilter(e.target.value)}
              className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
            >
              <option value="ALL">All Odisha Zones</option>
              <option value="TPCODL">TPCODL (Central)</option>
              <option value="TPNODL">TPNODL (North)</option>
              <option value="TPSODL">TPSODL (South)</option>
              <option value="TPWODL">TPWODL (West)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="CONTACTED">Contacted</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-slate-500 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
            Fetching lead records...
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-slate-500">
            No lead inquiries found matching the selected filters.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Customer Name</th>
                  <th className="p-3.5">Mobile</th>
                  <th className="p-3.5">District / Pincode</th>
                  <th className="p-3.5">DISCOM Zone</th>
                  <th className="p-3.5">System &amp; Category</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((l) => {
                  const cleanPhone = l.mobileNumber.replace(/[^0-9]/g, "");
                  const whatsappMsg = encodeURIComponent(
                    `Hi ${l.fullName}, thank you for contacting Pragati EcoSolar! We received your site visit inquiry for ${l.district} (${l.discom || "Odisha DISCOM"}). When is a suitable time for our solar engineering team to visit your site?`
                  );
                  const whatsappUrl = `https://wa.me/91${cleanPhone}?text=${whatsappMsg}`;

                  return (
                    <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{l.fullName}</div>
                        {l.email && <div className="text-[10px] text-slate-400">{l.email}</div>}
                      </td>
                      <td className="p-3.5 font-mono text-slate-800 font-bold">{l.mobileNumber}</td>
                      <td className="p-3.5 text-slate-700">
                        <div>{l.district}</div>
                        <div className="text-[10px] text-slate-400 font-mono">PIN: {l.pincode}</div>
                      </td>
                      <td className="p-3.5 font-mono">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                          {l.discom || "ODISHA"}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600">
                        <div className="font-bold">{l.systemType}</div>
                        <div className="text-[10px] text-slate-400">{l.category}</div>
                      </td>
                      <td className="p-3.5">
                        <select
                          value={l.status}
                          onChange={(e) => handleStatusChange(l.id, e.target.value)}
                          className={`px-2 py-1 rounded text-[10px] font-mono font-bold border focus:outline-none ${
                            l.status === "PENDING"
                              ? "bg-amber-50 text-amber-800 border-amber-300"
                              : l.status === "CONTACTED"
                              ? "bg-blue-50 text-blue-800 border-blue-300"
                              : l.status === "APPROVED"
                              ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                              : "bg-slate-100 text-slate-600 border-slate-300"
                          }`}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="APPROVED">APPROVED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg transition-all shadow-sm"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>

                          <button
                            onClick={() => handleDeleteLead(l.id)}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors border border-rose-200 cursor-pointer"
                            title="Delete Lead Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
