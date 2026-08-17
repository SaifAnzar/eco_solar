"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Filter,
  Phone,
  MessageCircle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  XCircle,
  Trash2,
  RefreshCw,
  User,
  Building2,
  Calendar,
  AlertCircle,
} from "lucide-react";

export interface EligibilityLeadItem {
  id: string;
  consumerNumber: string;
  fullName: string;
  phone: string;
  email: string;
  discom: string;
  roofOwnership: string;
  monthlyBill?: string | null;
  status: "NEW" | "CONTACTED" | "VERIFIED" | "INELIGIBLE";
  notes?: string | null;
  createdAt: string;
  updatedAt?: string;
}

export default function AdminEligibilityLeadsPage() {
  const [leads, setLeads] = useState<EligibilityLeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [discomFilter, setDiscomFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedLead, setSelectedLead] = useState<EligibilityLeadItem | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads/eligibility");
      const data = await res.json();
      if (res.ok && data.success) {
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error("Failed to fetch eligibility leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/leads/eligibility", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus as any } : l))
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead({ ...selectedLead, status: newStatus as any });
        }
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this eligibility check record?")) return;
    try {
      const res = await fetch(`/api/leads/eligibility?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLeads((prev) => prev.filter((l) => l.id !== id));
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete lead:", err);
    }
  };

  // Metrics
  const totalChecks = leads.length;
  const todayCount = leads.filter((l) => {
    const todayStr = new Date().toISOString().split("T")[0];
    return (l.createdAt || "").startsWith(todayStr);
  }).length;
  const verifiedCount = leads.filter((l) => l.status === "VERIFIED").length;
  const newCount = leads.filter((l) => l.status === "NEW").length;

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const query = searchTerm.toLowerCase();
    const matchesQuery =
      (l.fullName || "").toLowerCase().includes(query) ||
      (l.consumerNumber || "").toLowerCase().includes(query) ||
      (l.phone || "").includes(query) ||
      (l.email || "").toLowerCase().includes(query);

    const matchesDiscom = discomFilter === "ALL" || l.discom === discomFilter;
    const matchesStatus = statusFilter === "ALL" || l.status === statusFilter;

    return matchesQuery && matchesDiscom && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "VERIFIED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified
          </span>
        );
      case "CONTACTED":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800 border border-blue-300">
            <Phone className="w-3.5 h-3.5 text-blue-600" /> Contacted
          </span>
        );
      case "INELIGIBLE":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-3.5 h-3.5 text-rose-600" /> Ineligible
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600" /> New
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 md:p-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>PM Surya Ghar Eligibility Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Eligibility Checks &amp; DISCOM Leads
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage consumer ID eligibility verifications submitted via the PM Surya Ghar Checker.
          </p>
        </div>

        <button
          onClick={fetchLeads}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Checks</span>
            <FileText className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">{totalChecks}</div>
          <div className="text-[11px] text-slate-400 font-medium">All consumer verifications</div>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today&apos;s Checks</span>
            <Calendar className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-600">{todayCount}</div>
          <div className="text-[11px] text-slate-400 font-medium">Submitted in last 24 hours</div>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verified Leads</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">{verifiedCount}</div>
          <div className="text-[11px] text-slate-400 font-medium">Pre-qualified &amp; confirmed</div>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Review</span>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">{newCount}</div>
          <div className="text-[11px] text-slate-400 font-medium">Requires initial callback</div>
        </div>

      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Consumer ID, Name, Phone..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">
          
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>DISCOM:</span>
          </div>
          <select
            value={discomFilter}
            onChange={(e) => setDiscomFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="ALL">All DISCOMs</option>
            <option value="TPCODL">TPCODL (Central)</option>
            <option value="TPNODL">TPNODL (Northern)</option>
            <option value="TPSODL">TPSODL (Southern)</option>
            <option value="TPWODL">TPWODL (Western)</option>
          </select>

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
            <span>Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">NEW</option>
            <option value="CONTACTED">CONTACTED</option>
            <option value="VERIFIED">VERIFIED</option>
            <option value="INELIGIBLE">INELIGIBLE</option>
          </select>

        </div>

      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Consumer ID</th>
                <th className="py-3.5 px-4">Customer Name</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">DISCOM</th>
                <th className="py-3.5 px-4">Roof Type</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading eligibility leads...
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No eligibility check records found.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const dateStr = new Date(lead.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });
                  const waText = encodeURIComponent(
                    `Hi ${lead.fullName}, we verified your PM Surya Ghar eligibility for Consumer ID ${lead.consumerNumber} under ${lead.discom}. Are you free for a 2-min call regarding your ₹78,000 subsidy?`
                  );

                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-slate-500 whitespace-nowrap">{dateStr}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                          {lead.consumerNumber}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">{lead.fullName}</td>
                      <td className="py-3.5 px-4 space-y-0.5">
                        <div className="font-mono text-slate-800">{lead.phone}</div>
                        <div className="text-[11px] text-slate-400">{lead.email}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px]">
                          {lead.discom}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {lead.roofOwnership === "OWNED" ? (
                          <span className="text-[11px] font-bold text-slate-700">🏠 Own Roof</span>
                        ) : (
                          <span className="text-[11px] font-bold text-amber-700">🏢 Rented</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">{getStatusBadge(lead.status)}</td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          {/* 1-Click WhatsApp CTA */}
                          <a
                            href={`https://wa.me/91${lead.phone}?text=${waText}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          {/* Direct Call CTA */}
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors"
                            title="Call Customer"
                          >
                            <Phone className="w-4 h-4" />
                          </a>

                          {/* Status Selector */}
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-bold text-slate-800 cursor-pointer"
                          >
                            <option value="NEW">NEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="VERIFIED">VERIFIED</option>
                            <option value="INELIGIBLE">INELIGIBLE</option>
                          </select>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(lead.id)}
                            className="p-1.5 bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
