"use client";

import React, { useState, useEffect } from "react";
import { Mail, Trash2, MessageSquare, CheckCircle2, Search, Loader2, Calendar, MapPin, Phone, Filter } from "lucide-react";
import { getContactInquiriesAction, updateContactInquiryStatusAction, deleteContactInquiryAction } from "@/lib/actions/contact-inquiry-actions";
import { showToast, scrollToTop, showConfirmDialog } from "@/lib/toast";

export default function AdminContactLeadsPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"SITE_VISIT" | "GENERAL_CONTACT">("SITE_VISIT");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    const res = await getContactInquiriesAction();
    if (res.success) {
      setInquiries(res.data || []);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus as any } : item))
    );
    const res = await updateContactInquiryStatusAction(id, newStatus as any);
    if (res.success) {
      showToast(`Status updated to ${newStatus}.`, "info");
      fetchInquiries();
    } else {
      showToast(res.error || "Failed to update status.", "error");
      fetchInquiries();
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirmDialog(
      "Delete Inquiry Record?",
      "Are you sure you want to delete this inquiry record?",
      "Yes, Delete"
    );
    if (!confirmed) return;
    const targetItem = inquiries.find((item) => item.id === id);
    const targetPhone = targetItem?.phone?.replace(/\D/g, "");
    const targetIsGeneral = targetItem ? isGeneralInquiry(targetItem) : false;

    setInquiries((prev) =>
      prev.filter((item) => {
        if (item.id === id) return false;
        const itemPhone = (item.phone || "").replace(/\D/g, "");
        const itemIsGeneral = isGeneralInquiry(item);
        // Only remove matching phone IF it belongs to the SAME inquiry category
        if (targetPhone && itemPhone === targetPhone && itemIsGeneral === targetIsGeneral) {
          return false;
        }
        return true;
      })
    );

    const res = await deleteContactInquiryAction(id);
    if (res.success) {
      showToast("Record deleted successfully!", "success");
      fetchInquiries();
    } else {
      showToast(res.error || "Failed to delete record.", "error");
      fetchInquiries();
    }
  };



  const isGeneralInquiry = (item: any) =>
    item.inquiryType === "GENERAL_CONTACT" ||
    (item.message || "").includes("GENERAL CONTACT INQUIRY");

  const siteVisits = inquiries.filter((item) => !isGeneralInquiry(item));
  const generalContacts = inquiries.filter((item) => isGeneralInquiry(item));

  const currentTabItems = activeTab === "SITE_VISIT" ? siteVisits : generalContacts;

  const filtered = currentTabItems.filter((item) => {
    const nameMatch = (item.fullName || "").toLowerCase().includes(search.toLowerCase());
    const phoneMatch = (item.phone || "").includes(search);
    const locationMatch = (item.location || item.discomRegion || "").toLowerCase().includes(search.toLowerCase());
    return nameMatch || phoneMatch || locationMatch;
  });


  return (
    <div className="space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">
            SITE VISITS &amp; CONTACT INQUIRIES
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Customer Inspection &amp; Contact Requests
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Individually track free rooftop solar site visit bookings and contact form messages across Odisha.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200 font-bold">
            Site Visits: {siteVisits.length}
          </span>
          <span className="bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 font-bold">
            General: {generalContacts.length}
          </span>
        </div>
      </div>



      {/* Tabs & Search Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
        {/* 2-Tab Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("SITE_VISIT")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "SITE_VISIT"
                ? "bg-slate-900 text-white shadow"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>📍 Free Site Visit Requests ({siteVisits.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("GENERAL_CONTACT")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "GENERAL_CONTACT"
                ? "bg-slate-900 text-white shadow"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <Mail className="w-4 h-4 text-amber-400" />
            <span>✉️ General Contact Inquiries ({generalContacts.length})</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by name, phone, district..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-600 font-sans"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-slate-500 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
            Loading inspection records...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-slate-500 space-y-2">
            <p>No records found in this category.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Customer Name</th>
                  <th className="p-3.5">Mobile &amp; Email</th>
                  <th className="p-3.5">Site Location</th>
                  <th className="p-3.5">System Specs / Bill</th>
                  <th className="p-3.5">Details &amp; Notes</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div>{item.fullName}</div>
                      {isGeneralInquiry(item) ? (
                        <span className="inline-block mt-1 text-[9px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                          FREE CONSULTATION
                        </span>
                      ) : (
                        <span className="inline-block mt-1 text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
                          FREE SITE VISIT
                        </span>
                      )}

                    </td>

                    <td className="p-3.5">
                      <div className="font-mono text-slate-900 font-bold flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{item.phone}</span>
                      </div>
                      <div className="text-[10px] text-slate-500">{item.email || "No email provided"}</div>
                    </td>

                    <td className="p-3.5 font-bold text-slate-700">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item.location}</span>
                      </div>
                    </td>

                    <td className="p-3.5 text-slate-700">
                      <div className="font-semibold text-slate-900">{item.systemType || "Rooftop Solar"}</div>
                      {item.monthlyBill && (
                        <div className="text-[10px] font-mono text-amber-700 font-bold">{item.monthlyBill}</div>
                      )}
                    </td>

                    <td className="p-3.5 max-w-xs">
                      <p className="text-[11px] text-slate-600 line-clamp-3">{item.message || "Site Visit Inspection Request"}</p>
                    </td>

                    <td className="p-3.5">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none ${
                          item.status === "NEW"
                            ? "bg-amber-50 text-amber-800 border-amber-300"
                            : item.status === "CONTACTED"
                            ? "bg-blue-50 text-blue-800 border-blue-300"
                            : "bg-emerald-50 text-emerald-800 border-emerald-300"
                        }`}
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">SCHEDULED / CONTACTED</option>
                        <option value="RESOLVED">COMPLETED</option>
                      </select>
                    </td>

                    <td className="p-3.5 text-[11px] font-mono text-slate-500 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        {item.phone && (
                          <a
                            href={`https://wa.me/${item.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              `Hello ${item.fullName}, regarding your ${activeTab === "SITE_VISIT" ? "Free Solar Site Visit" : "Solar Inquiry"} with Pragati EcoSolar...`
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
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
