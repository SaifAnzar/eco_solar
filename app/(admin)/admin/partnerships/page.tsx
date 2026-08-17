"use client";

import React, { useState, useEffect } from "react";
import {
  Building2,
  Package,
  Search,
  Filter,
  Phone,
  Mail,
  MapPin,
  Trash2,
  RefreshCw,
  Eye,
  CheckCircle2,
  IndianRupee,
  X,
  MessageSquare,
  Building,
  User,
  Crown,
  Handshake,
  Award,
  Save,
  StickyNote,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import {
  getPartnershipsAction,
  updatePartnershipStatusAction,
  deletePartnershipAction,
} from "@/lib/actions/partnership-actions";

export interface NormalizedPartnerApp {
  id: string;
  type: "FRANCHISE" | "PARTNER";
  tier?: "TIER_1_EXCLUSIVE_DISTRIBUTOR" | "TIER_2_AUTHORIZED_DEALER" | "TIER_3_REFERRAL_AGENT" | null;
  applicantName: string;
  businessName?: string | null;
  phone: string;
  email: string;
  location: string;
  investmentRange: string;
  experience?: string | null;
  status: "PENDING" | "REVIEWED" | "CONTACTED" | "APPROVED" | "REJECTED";
  notes?: string | null;
  createdAt: string;

  // Fallbacks
  fullName?: string;
  mobileNumber?: string;
  emailAddress?: string;
  proposedCity?: string;
  primaryDistrict?: string;
  investmentCapacity?: string;
  businessBackground?: string;
  showroomSpace?: string;
}

export default function AdminPartnershipsPage() {
  const [applications, setApplications] = useState<NormalizedPartnerApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Section Navigation: "ALL" | "FRANCHISE" | "PARTNER"
  const [sectionTab, setSectionTab] = useState<"ALL" | "FRANCHISE" | "PARTNER">("ALL");
  
  // Sub-Tier Filter under Partnership Section: "ALL_TIERS" | "TIER_1" | "TIER_2" | "TIER_3"
  const [tierSubFilter, setTierSubFilter] = useState<"ALL_TIERS" | "TIER_1" | "TIER_2" | "TIER_3">("ALL_TIERS");

  // Search & Status Filter
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Feedback & Selected Detail Modal State
  const [actionMessage, setActionMessage] = useState<{ type: "SUCCESS" | "ERROR"; text: string } | null>(null);
  const [selectedApp, setSelectedApp] = useState<NormalizedPartnerApp | null>(null);
  const [adminNotesText, setAdminNotesText] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await getPartnershipsAction();
      if (res.success && res.data) {
        setApplications(res.data as any[]);
      } else {
        setActionMessage({ type: "ERROR", text: res.error || "Failed to load partner applications." });
      }
    } catch (err: any) {
      setActionMessage({ type: "ERROR", text: err.message || "Failed to fetch data." });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    setActionMessage(null);
    try {
      const res = await updatePartnershipStatusAction(id, newStatus as any);
      if (res.success) {
        setApplications((prev) =>
          prev.map((app) => (app.id === id ? { ...app, status: newStatus as any } : app))
        );
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp({ ...selectedApp, status: newStatus as any });
        }
        setActionMessage({ type: "SUCCESS", text: `Status updated to ${newStatus}.` });
      } else {
        throw new Error(res.error || "Failed to update status.");
      }
    } catch (err: any) {
      setActionMessage({ type: "ERROR", text: err.message || "Failed to update status." });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedApp) return;
    setSavingNotes(true);
    setActionMessage(null);
    try {
      const res = await updatePartnershipStatusAction(selectedApp.id, selectedApp.status as any, adminNotesText);
      if (res.success) {
        setApplications((prev) =>
          prev.map((app) => (app.id === selectedApp.id ? { ...app, notes: adminNotesText } : app))
        );
        setSelectedApp({ ...selectedApp, notes: adminNotesText });
        setActionMessage({ type: "SUCCESS", text: "Internal admin notes saved!" });
      } else {
        throw new Error(res.error || "Failed to save notes.");
      }
    } catch (err: any) {
      setActionMessage({ type: "ERROR", text: err.message || "Failed to save notes." });
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application record?")) return;
    setUpdatingId(id);
    setActionMessage(null);
    try {
      const res = await deletePartnershipAction(id);
      if (res.success) {
        setApplications((prev) => prev.filter((app) => app.id !== id));
        if (selectedApp?.id === id) setSelectedApp(null);
        setActionMessage({ type: "SUCCESS", text: "Application record deleted." });
      } else {
        throw new Error(res.error || "Failed to delete application.");
      }
    } catch (err: any) {
      setActionMessage({ type: "ERROR", text: err.message || "Failed to delete." });
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter Logic
  const filteredApps = applications.filter((app) => {
    // 1. Section Tab Filter
    if (sectionTab === "FRANCHISE" && app.type !== "FRANCHISE") return false;
    if (sectionTab === "PARTNER") {
      if (app.type !== "PARTNER") return false;
      // Sub-tier filtering inside Partnership Section
      if (tierSubFilter === "TIER_1" && app.tier !== "TIER_1_EXCLUSIVE_DISTRIBUTOR") return false;
      if (tierSubFilter === "TIER_2" && app.tier !== "TIER_2_AUTHORIZED_DEALER" && app.tier !== null) return false;
      if (tierSubFilter === "TIER_3" && app.tier !== "TIER_3_REFERRAL_AGENT") return false;
    }

    // 2. Status Filter
    if (statusFilter !== "ALL" && app.status !== statusFilter) return false;

    // 3. Text Search
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const nameMatch = (app.applicantName || app.fullName || "").toLowerCase().includes(q);
      const bizMatch = (app.businessName || "").toLowerCase().includes(q);
      const phoneMatch = (app.phone || app.mobileNumber || "").includes(q);
      const emailMatch = (app.email || app.emailAddress || "").toLowerCase().includes(q);
      const locationMatch = (app.location || app.proposedCity || "").toLowerCase().includes(q);
      const expMatch = (app.experience || app.businessBackground || "").toLowerCase().includes(q);
      const notesMatch = (app.notes || "").toLowerCase().includes(q);
      return nameMatch || bizMatch || phoneMatch || emailMatch || locationMatch || expMatch || notesMatch;
    }

    return true;
  });

  const totalCount = applications.length;
  const franchiseCount = applications.filter((a) => a.type === "FRANCHISE").length;
  const partnerCount = applications.filter((a) => a.type === "PARTNER").length;
  const tier1Count = applications.filter((a) => a.type === "PARTNER" && a.tier === "TIER_1_EXCLUSIVE_DISTRIBUTOR").length;
  const tier2Count = applications.filter((a) => a.type === "PARTNER" && (a.tier === "TIER_2_AUTHORIZED_DEALER" || !a.tier)).length;
  const tier3Count = applications.filter((a) => a.type === "PARTNER" && a.tier === "TIER_3_REFERRAL_AGENT").length;
  const pendingCount = applications.filter((a) => a.status === "PENDING").length;

  const getTierPill = (app: NormalizedPartnerApp) => {
    if (app.type === "FRANCHISE") {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
          <Building2 className="w-3 h-3 text-amber-600 shrink-0" />
          Franchise Outlet
        </span>
      );
    }

    if (app.tier === "TIER_1_EXCLUSIVE_DISTRIBUTOR") {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
          <Crown className="w-3 h-3 text-purple-600 shrink-0" />
          Tier-1 Distributor
        </span>
      );
    }

    if (app.tier === "TIER_3_REFERRAL_AGENT") {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
          <Handshake className="w-3 h-3 text-blue-600 shrink-0" />
          Tier-3 Referral
        </span>
      );
    }

    // Default Tier-2
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
        <Package className="w-3 h-3 text-emerald-600 shrink-0" />
        Tier-2 Dealer
      </span>
    );
  };

  return (
    <div className="space-y-6 font-sans max-w-7xl mx-auto pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-slate-100 border border-slate-200 rounded-full text-slate-700 text-[11px] font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-amber-600" />
            <span>PARTNER NETWORK CONSOLE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1.5">
            Franchise &amp; Partnership Applications
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review incoming requests, filter by partnership tier, and manage onboarding status.
          </p>
        </div>

        <button
          onClick={() => {
            setRefreshing(true);
            fetchApplications();
          }}
          disabled={loading || refreshing}
          className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all disabled:opacity-50 cursor-pointer shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing || loading ? "animate-spin text-amber-400" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Action Notification Banner */}
      {actionMessage && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between animate-in fade-in ${
            actionMessage.type === "SUCCESS"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionMessage.text}</span>
          </div>
          <button
            onClick={() => setActionMessage(null)}
            className="text-xs font-bold opacity-60 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      )}

      {/* Metrics Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-sm">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Submissions</div>
          <div className="text-xl font-black text-slate-900 mt-0.5">{totalCount}</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-sm">
          <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Franchise Outlets</div>
          <div className="text-xl font-black text-amber-700 mt-0.5">{franchiseCount}</div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-xl p-3.5 shadow-sm">
          <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Partnership Program</div>
          <div className="text-xl font-black text-emerald-700 mt-0.5">{partnerCount}</div>
        </div>

        <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3.5 shadow-sm">
          <div className="text-[10px] font-bold text-amber-900 uppercase tracking-wider flex items-center justify-between">
            <span>Pending Review</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          </div>
          <div className="text-xl font-black text-amber-800 mt-0.5">{pendingCount}</div>
        </div>
      </div>

      {/* MINIMALIST FILTER & SECTION BAR */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-3 shadow-sm space-y-3">
        
        {/* Row 1: Primary Section Tabs + Search & Status Filter */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
          
          {/* Main Section Navigation */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl w-full lg:w-auto">
            <button
              onClick={() => {
                setSectionTab("ALL");
                setTierSubFilter("ALL_TIERS");
              }}
              className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                sectionTab === "ALL"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Submissions ({totalCount})
            </button>

            <button
              onClick={() => {
                setSectionTab("FRANCHISE");
                setTierSubFilter("ALL_TIERS");
              }}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                sectionTab === "FRANCHISE"
                  ? "bg-amber-500 text-slate-950 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Franchise Outlets ({franchiseCount})</span>
            </button>

            <button
              onClick={() => {
                setSectionTab("PARTNER");
              }}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                sectionTab === "PARTNER"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Partnership Program ({partnerCount})</span>
            </button>
          </div>

          {/* Search & Status Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full lg:w-auto">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, phone, city..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
              />
            </div>

            {/* Status Dropdown */}
            <div className="relative w-full sm:w-40">
              <Filter className="w-3 h-3 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="PENDING">PENDING ({pendingCount})</option>
                <option value="REVIEWED">REVIEWED</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </div>

          </div>

        </div>

        {/* Row 2: Sub-Tier Categories inside Partnership Program Section */}
        {sectionTab === "PARTNER" && (
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 flex-wrap animate-in fade-in">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
              Filter By Tier:
            </span>

            <button
              onClick={() => setTierSubFilter("ALL_TIERS")}
              className={`px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                tierSubFilter === "ALL_TIERS"
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              All Tiers ({partnerCount})
            </button>

            <button
              onClick={() => setTierSubFilter("TIER_1")}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                tierSubFilter === "TIER_1"
                  ? "bg-purple-100 text-purple-900 border-purple-300"
                  : "bg-purple-50/50 text-purple-700 border-purple-200 hover:bg-purple-100/60"
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-purple-600" />
              <span>Tier-1 Exclusive Distributor ({tier1Count})</span>
            </button>

            <button
              onClick={() => setTierSubFilter("TIER_2")}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                tierSubFilter === "TIER_2"
                  ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                  : "bg-emerald-50/50 text-emerald-700 border-emerald-200 hover:bg-emerald-100/60"
              }`}
            >
              <Package className="w-3.5 h-3.5 text-emerald-600" />
              <span>Tier-2 Authorized Dealer ({tier2Count})</span>
            </button>

            <button
              onClick={() => setTierSubFilter("TIER_3")}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                tierSubFilter === "TIER_3"
                  ? "bg-blue-100 text-blue-900 border-blue-300"
                  : "bg-blue-50/50 text-blue-700 border-blue-200 hover:bg-blue-100/60"
              }`}
            >
              <Handshake className="w-3.5 h-3.5 text-blue-600" />
              <span>Tier-3 Referral Agent ({tier3Count})</span>
            </button>
          </div>
        )}

      </div>

      {/* MINIMALIST APPLICATIONS TABLE */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-slate-500 flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            Loading partner records...
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="p-16 text-center text-slate-500 space-y-2">
            <Building className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold">No applications found matching the selected criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                  <th className="p-3.5 pl-5">Applicant &amp; Firm</th>
                  <th className="p-3.5">Category &amp; Tier</th>
                  <th className="p-3.5">Contact Details</th>
                  <th className="p-3.5">Location</th>
                  <th className="p-3.5">Capital Range</th>
                  <th className="p-3.5 text-center">Status</th>
                  <th className="p-3.5 text-right pr-5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.map((app) => {
                  const name = app.applicantName || app.fullName || "N/A";
                  const business = app.businessName;
                  const phone = app.phone || app.mobileNumber || "";
                  const email = app.email || app.emailAddress || "";
                  const location = app.location || app.proposedCity || app.primaryDistrict || "N/A";
                  const capitalRange = app.investmentRange || app.investmentCapacity || "N/A";
                  const hasNotes = Boolean(app.notes && app.notes.trim() !== "");

                  return (
                    <tr
                      key={app.id}
                      className="hover:bg-slate-50/90 transition-colors group cursor-pointer"
                      onClick={() => {
                        setSelectedApp(app);
                        setAdminNotesText(app.notes || "");
                      }}
                    >
                      
                      {/* Column 1: Applicant & Firm */}
                      <td className="p-3.5 pl-5 align-middle space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-slate-900 text-xs">
                            {name}
                          </span>
                          {hasNotes && (
                            <span
                              title="Internal staff notes added"
                              className="w-2 h-2 rounded-full bg-amber-500 shrink-0"
                            />
                          )}
                        </div>

                        {business && (
                          <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                            <Building className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate max-w-[180px]">{business}</span>
                          </div>
                        )}
                      </td>

                      {/* Column 2: Category & Tier Pill */}
                      <td className="p-3.5 align-middle">
                        {getTierPill(app)}
                      </td>

                      {/* Column 3: Contact Details */}
                      <td className="p-3.5 align-middle space-y-0.5 text-slate-600 text-[11px]">
                        <div className="font-mono font-medium text-slate-900">{phone}</div>
                        <div className="text-slate-500 truncate max-w-[160px]">{email}</div>
                      </td>

                      {/* Column 4: Location */}
                      <td className="p-3.5 align-middle">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700">
                          <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                          {location}
                        </span>
                      </td>

                      {/* Column 5: Capital Range */}
                      <td className="p-3.5 align-middle">
                        <span className="text-[11px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {capitalRange}
                        </span>
                      </td>

                      {/* Column 6: Status Selector */}
                      <td className="p-3.5 align-middle text-center" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={app.status}
                          disabled={updatingId === app.id}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className={`text-[11px] font-extrabold px-2.5 py-1 rounded-xl border focus:outline-none cursor-pointer ${
                            app.status === "PENDING"
                              ? "bg-amber-100 text-amber-950 border-amber-300"
                              : app.status === "REVIEWED"
                              ? "bg-purple-100 text-purple-950 border-purple-300"
                              : app.status === "CONTACTED"
                              ? "bg-blue-100 text-blue-950 border-blue-300"
                              : app.status === "APPROVED"
                              ? "bg-emerald-100 text-emerald-950 border-emerald-300"
                              : "bg-rose-100 text-rose-950 border-rose-300"
                          }`}
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="REVIEWED">REVIEWED</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="APPROVED">APPROVED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </td>

                      {/* Column 7: Actions */}
                      <td className="p-3.5 pr-5 align-middle text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          {/* View Modal Action */}
                          <button
                            onClick={() => {
                              setSelectedApp(app);
                              setAdminNotesText(app.notes || "");
                            }}
                            className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors border border-slate-200 cursor-pointer"
                            title="View Application Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* WhatsApp Action */}
                          {phone && (
                            <a
                              href={`https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                `Hello ${name}, regarding your request for a Pragati EcoSolar ${app.type === "FRANCHISE" ? "Franchise Outlet" : "Partner Program"}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors border border-emerald-200"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {/* Delete Action */}
                          <button
                            onClick={() => handleDelete(app.id)}
                            disabled={updatingId === app.id}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition-colors border border-rose-200 cursor-pointer disabled:opacity-50"
                            title="Delete Record"
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

      {/* FULL CATEGORIZED DETAIL MODAL DRAWER WITH ADMIN NOTES */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-5 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4 pr-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {getTierPill(selectedApp)}
                  <span className="text-[10px] font-mono text-slate-400">Ref ID: {selectedApp.id}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {selectedApp.applicantName || selectedApp.fullName}
                </h3>
                {selectedApp.businessName && (
                  <p className="text-xs font-semibold text-amber-700 mt-0.5">
                    Firm: {selectedApp.businessName}
                  </p>
                )}
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categorized Content Grid */}
            <div className="space-y-4 text-xs">
              
              {/* Category 1: Applicant & Business Profile */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
                <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-2 border-b border-slate-200/60 pb-2">
                  <User className="w-4 h-4 text-amber-600" />
                  <span>Category 1: Applicant &amp; Business Profile</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Full Applicant Name:</span>
                    <span className="font-bold text-slate-900 text-sm">{selectedApp.applicantName || selectedApp.fullName}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Business / Firm Name:</span>
                    <span className="font-bold text-slate-900 text-sm">{selectedApp.businessName || "Not Specified"}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Application Type &amp; Tier:</span>
                    <span className="font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                      {selectedApp.type === "FRANCHISE"
                        ? "Franchise Outlet (Exclusive Showroom & Hub)"
                        : `Partner Program (${selectedApp.tier || "TIER_2_AUTHORIZED_DEALER"})`}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Submission Timestamp:</span>
                    <span className="font-mono text-slate-800">
                      {new Date(selectedApp.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Category 2: Contact & Territory Details */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
                <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-2 border-b border-slate-200/60 pb-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Category 2: Contact &amp; Location Territory</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Mobile Phone Number:</span>
                    <span className="font-mono font-bold text-slate-900 text-xs">{selectedApp.phone || selectedApp.mobileNumber}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Email Address:</span>
                    <span className="font-medium text-slate-900 text-xs">{selectedApp.email || selectedApp.emailAddress}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Target City / District:</span>
                    <span className="font-bold text-emerald-700 text-xs">{selectedApp.location || selectedApp.proposedCity}</span>
                  </div>
                </div>

                {/* Communication Action Bar */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <a
                    href={`tel:${selectedApp.phone || selectedApp.mobileNumber}`}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-[11px] inline-flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Applicant</span>
                  </a>

                  <a
                    href={`https://wa.me/${(selectedApp.phone || selectedApp.mobileNumber || "").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Hello ${selectedApp.applicantName || selectedApp.fullName}, regarding your application for a Pragati EcoSolar ${selectedApp.type === "FRANCHISE" ? "Franchise Outlet" : "Partner Program"}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl text-[11px] inline-flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${selectedApp.email || selectedApp.emailAddress}`}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-[11px] inline-flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Email</span>
                  </a>
                </div>
              </div>

              {/* Category 3: Financial & Commercial Specifications */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
                <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-2 border-b border-slate-200/60 pb-2">
                  <IndianRupee className="w-4 h-4 text-purple-600" />
                  <span>Category 3: Capital &amp; Space Commitments</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Investment Capacity Bracket:</span>
                    <span className="font-bold text-purple-800 text-xs">{selectedApp.investmentRange || selectedApp.investmentCapacity || "N/A"}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block text-[10px]">Showroom Commercial Space:</span>
                    <span className="font-bold text-slate-800 text-xs">{selectedApp.showroomSpace || "No space mandate specified"}</span>
                  </div>
                </div>
              </div>

              {/* Category 4: Solar & Business Background Experience */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-2 border-b border-slate-200/60 pb-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Category 4: Prior Business &amp; Solar Experience Notes</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium bg-white p-3 rounded-xl border border-slate-200 whitespace-pre-wrap">
                  {selectedApp.experience || selectedApp.businessBackground || "No prior background notes submitted."}
                </p>
              </div>

              {/* Category 5: Admin Internal Notes Editor */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-3">
                <div className="font-bold text-amber-900 uppercase tracking-wider text-[11px] flex items-center justify-between border-b border-amber-200/80 pb-2">
                  <div className="flex items-center gap-2">
                    <StickyNote className="w-4 h-4 text-amber-600" />
                    <span>Category 5: Admin Internal Staff Notes</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-700 font-semibold">Private (Internal Only)</span>
                </div>

                <textarea
                  rows={3}
                  value={adminNotesText}
                  onChange={(e) => setAdminNotesText(e.target.value)}
                  placeholder="Type internal staff notes (e.g. Territory verified, callback completed, follow-up scheduled)..."
                  className="w-full bg-white border border-amber-200 rounded-xl p-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />

                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNotes}
                    disabled={savingNotes}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{savingNotes ? "Saving Notes..." : "Save Internal Notes"}</span>
                  </button>
                </div>
              </div>

              {/* Status Update Control Footer */}
              <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="text-xs font-bold text-slate-700">Update Status:</span>
                  <select
                    value={selectedApp.status}
                    onChange={(e) => handleStatusChange(selectedApp.id, e.target.value)}
                    className="bg-slate-900 text-white font-bold px-3 py-1.5 rounded-xl text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="REVIEWED">REVIEWED</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => handleDelete(selectedApp.id)}
                    className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl border border-rose-200 transition-colors cursor-pointer"
                  >
                    Delete Record
                  </button>

                  <button
                    onClick={() => setSelectedApp(null)}
                    className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Close Window
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
