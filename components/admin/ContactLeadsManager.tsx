"use client";

import React, { useState } from "react";
import { ContactInquiry, ContactInquiryStatus } from "@/lib/data-store";
import {
  Search,
  Mail,
  Phone,
  MapPin,
  Trash2,
  CheckCircle2,
  Clock,
  MessageSquare,
  Building2,
  Home,
  RefreshCw,
  Sparkles,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

interface ContactLeadsManagerProps {
  initialInquiries: ContactInquiry[];
}

export default function ContactLeadsManager({ initialInquiries }: ContactLeadsManagerProps) {
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(initialInquiries);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [sourceFilter, setSourceFilter] = useState<string>("ALL");
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const fetchInquiries = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data.success) {
        setInquiries(data.inquiries);
      }
    } catch (error) {
      console.error("Failed to refresh contact inquiries:", error);
    }
  };

  const handleStatusChange = async (id: string, newStatus: ContactInquiryStatus) => {
    setIsUpdating(id);
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact inquiry?")) return;
    setIsUpdating(id);
    try {
      const res = await fetch(`/api/contact?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete inquiry:", error);
    } finally {
      setIsUpdating(null);
    }
  };

  // Helper to check if lead is from Live Chat
  const isLiveChatLead = (inq: ContactInquiry) => {
    return (
      inq.inquiryType === "LIVE_CHAT" ||
      (inq.message || "").toLowerCase().includes("live chat")
    );
  };

  // Filter inquiries
  const filteredInquiries = inquiries.filter((inq) => {
    const query = searchTerm.toLowerCase();
    const nameMatch = inq.fullName.toLowerCase().includes(query);
    const phoneMatch = inq.phone.toLowerCase().includes(query);
    const emailMatch = (inq.email || "").toLowerCase().includes(query);
    const locationMatch = inq.location.toLowerCase().includes(query);
    const messageMatch = (inq.message || "").toLowerCase().includes(query);

    const matchesSearch = nameMatch || phoneMatch || emailMatch || locationMatch || messageMatch;
    const matchesStatus = statusFilter === "ALL" || inq.status === statusFilter;
    
    let matchesSource = true;
    if (sourceFilter === "LIVE_CHAT") {
      matchesSource = isLiveChatLead(inq);
    } else if (sourceFilter === "SITE_VISIT") {
      matchesSource = inq.inquiryType === "SITE_VISIT";
    } else if (sourceFilter === "GENERAL_CONTACT") {
      matchesSource = !isLiveChatLead(inq) && inq.inquiryType !== "SITE_VISIT";
    }

    return matchesSearch && matchesStatus && matchesSource;
  });

  const totalCount = inquiries.length;
  const newCount = inquiries.filter((i) => i.status === "NEW").length;
  const contactedCount = inquiries.filter((i) => i.status === "CONTACTED").length;
  const resolvedCount = inquiries.filter((i) => i.status === "RESOLVED").length;
  const liveChatCount = inquiries.filter(isLiveChatLead).length;

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="admin-stat-card">
          <div className="admin-stat-label">Total Inquiries</div>
          <div className="admin-stat-value" style={{ color: "#F59E0B" }}>
            {totalCount}
          </div>
          <div className="admin-stat-note">Website & Live Chat</div>
        </div>

        <div className="admin-stat-card border-emerald-500/30">
          <div className="admin-stat-label flex items-center justify-between">
            <span>Live Chat Requests</span>
            <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="admin-stat-value" style={{ color: "#10B981" }}>
            {liveChatCount}
          </div>
          <div className="admin-stat-note">Captured via Live Chat Widget</div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-label">New & Pending</div>
          <div className="admin-stat-value" style={{ color: "#EF4444" }}>
            {newCount}
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
          <div className="admin-stat-label">Resolved</div>
          <div className="admin-stat-value" style={{ color: "#10B981" }}>
            {resolvedCount}
          </div>
          <div className="admin-stat-note">Site survey / quote closed</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-card space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, phone, email, location, or message..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700/60 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            {/* Source Filter */}
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-3 py-2.5 bg-white dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700/60 rounded-xl text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer font-semibold"
            >
              <option value="ALL">All Sources ({totalCount})</option>
              <option value="LIVE_CHAT">💬 Live Chat Widget ({liveChatCount})</option>
              <option value="SITE_VISIT">📋 Site Visit Form</option>
              <option value="GENERAL_CONTACT">✉️ General Contact</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2.5 bg-white dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700/60 rounded-xl text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer font-semibold"
            >
              <option value="ALL">All Statuses ({totalCount})</option>
              <option value="NEW">New ({newCount})</option>
              <option value="CONTACTED">Contacted ({contactedCount})</option>
              <option value="RESOLVED">Resolved ({resolvedCount})</option>
            </select>

            <button
              onClick={fetchInquiries}
              title="Refresh Inquiries"
              className="p-2.5 bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 rounded-xl transition-colors cursor-pointer shrink-0"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="admin-card overflow-hidden">
        {filteredInquiries.length === 0 ? (
          <div className="text-center py-12 text-slate-400 space-y-3">
            <MessageSquare className="w-10 h-10 mx-auto text-slate-400 dark:text-slate-600 opacity-60" />
            <p className="text-sm">No contact inquiries found matching your filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="admin-table w-full text-left text-xs">
              <thead>
                <tr>
                  <th className="py-3 px-4">Status & Source</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Customer Info</th>
                  <th className="py-3 px-4">Location & Pin</th>
                  <th className="py-3 px-4">Project Type</th>
                  <th className="py-3 px-4">Message / Requirements</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                {filteredInquiries.map((inq) => {
                  const isChat = isLiveChatLead(inq);
                  const cleanPhone = inq.phone.replace(/\+/g, "").replace(/\s+/g, "");

                  return (
                    <tr key={inq.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      {/* Status & Source Badge */}
                      <td className="py-3.5 px-4 align-top space-y-1.5">
                        <select
                          value={inq.status}
                          onChange={(e) =>
                            handleStatusChange(inq.id, e.target.value as ContactInquiryStatus)
                          }
                          disabled={isUpdating === inq.id}
                          className={`text-[11px] font-bold rounded-lg px-2.5 py-1 border focus:outline-none cursor-pointer block w-full ${
                            inq.status === "NEW"
                              ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                              : inq.status === "CONTACTED"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30"
                              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                          }`}
                        >
                          <option value="NEW" className="bg-white dark:bg-slate-900 text-rose-600 dark:text-rose-400">
                            NEW
                          </option>
                          <option value="CONTACTED" className="bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400">
                            CONTACTED
                          </option>
                          <option value="RESOLVED" className="bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400">
                            RESOLVED
                          </option>
                        </select>

                        {/* Source Badge Tag */}
                        {isChat ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                            <MessageSquare className="w-3 h-3" />
                            <span>LIVE CHAT</span>
                          </span>
                        ) : inq.inquiryType === "SITE_VISIT" ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                            <span>SITE VISIT</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            <span>WEBSITE FORM</span>
                          </span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-4 align-top dash-table-sub font-mono text-[11px] whitespace-nowrap">
                        {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                        <br />
                        <span className="text-[10px]">
                          {new Date(inq.createdAt).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>

                      {/* Contact Info */}
                      <td className="py-3.5 px-4 align-top space-y-1">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">{inq.fullName}</div>
                        <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-mono">
                          <Phone className="w-3 h-3 text-amber-500" />
                          <a href={`tel:${inq.phone}`} className="hover:underline">
                            {inq.phone}
                          </a>
                        </div>
                        {inq.email && (
                          <div className="flex items-center gap-1.5 dash-table-sub text-[11px]">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <a href={`mailto:${inq.email}`} className="hover:underline">
                              {inq.email}
                            </a>
                          </div>
                        )}
                      </td>

                      {/* Location & DISCOM */}
                      <td className="py-3.5 px-4 align-top space-y-1">
                        <div className="flex items-start gap-1.5 text-slate-800 dark:text-slate-200 font-semibold">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{inq.location}</span>
                        </div>
                        {inq.discomRegion && (
                          <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                            {inq.discomRegion}
                          </span>
                        )}
                      </td>

                      {/* Project Scope */}
                      <td className="py-3.5 px-4 align-top space-y-1">
                        <div className="capitalize font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                          {inq.systemType === "commercial" ? (
                            <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <Home className="w-3.5 h-3.5 text-amber-500" />
                          )}
                          <span>{inq.systemType || "Residential"}</span>
                        </div>
                        {inq.monthlyBill && (
                          <div className="text-[11px] dash-table-sub">
                            Bill: <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">₹{Number(inq.monthlyBill).toLocaleString()}/mo</span>
                          </div>
                        )}
                        {inq.rooftopArea && (
                          <div className="text-[11px] dash-table-sub">
                            Area: <span className="font-mono text-amber-600 dark:text-amber-300 font-semibold">{inq.rooftopArea} Sq. Ft.</span>
                          </div>
                        )}
                      </td>

                      {/* Message / Requirements */}
                      <td className="py-3.5 px-4 align-top max-w-xs">
                        {inq.message ? (
                          <div className="text-slate-800 dark:text-slate-300 text-[11px] bg-slate-100 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 leading-relaxed max-h-24 overflow-y-auto">
                            {inq.message}
                          </div>
                        ) : (
                          <span className="dash-table-sub italic">No message provided</span>
                        )}
                      </td>

                      {/* Admin Quick Action Buttons */}
                      <td className="py-3.5 px-4 align-top text-right space-y-1.5">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Direct WhatsApp Response Button */}
                          <a
                            href={`https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone}?text=Hi%20${encodeURIComponent(inq.fullName)}%2C%20thank%20you%20for%20contacting%20Pragati%20EcoSolar.%20How%20can%20we%20assist%20you%20with%20your%20solar%20inquiry%3F`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Chat with customer on WhatsApp"
                            className="p-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] rounded-lg border border-[#25D366]/30 transition-colors inline-flex items-center gap-1 text-[10px] font-bold"
                          >
                            <MessageCircle className="w-3.5 h-3.5 fill-current" />
                            <span className="hidden lg:inline">WhatsApp</span>
                          </a>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(inq.id)}
                            disabled={isUpdating === inq.id}
                            title="Delete Inquiry"
                            className="p-1.5 text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors border border-transparent hover:border-rose-200 dark:hover:border-rose-500/20 disabled:opacity-50 cursor-pointer"
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
