"use client";

import React, { useState, useEffect } from "react";
import { Mail, Trash2, MessageSquare, CheckCircle2, Search, Loader2 } from "lucide-react";
import { getContactInquiriesAction, updateContactInquiryStatusAction, deleteContactInquiryAction } from "@/lib/actions/contact-inquiry-actions";

export default function AdminContactLeadsPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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
    const res = await updateContactInquiryStatusAction(id, newStatus as any);
    if (res.success) {
      setMessage("Inquiry status updated!");
      fetchInquiries();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this contact inquiry?")) return;
    const res = await deleteContactInquiryAction(id);
    if (res.success) {
      setMessage("Inquiry deleted.");
      fetchInquiries();
    }
  };

  const filtered = inquiries.filter((item) => {
    const nameMatch = (item.fullName || "").toLowerCase().includes(search.toLowerCase());
    const phoneMatch = (item.phone || "").includes(search);
    const locationMatch = (item.location || item.discomRegion || "").toLowerCase().includes(search.toLowerCase());
    return nameMatch || phoneMatch || locationMatch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">CONTACT FORM INQUIRIES</span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">General Contact &amp; Site Visit Requests</h1>
          <p className="text-xs text-slate-600 mt-1">
            View customer messages submitted via the /contact page and site visit modal forms across Odisha.
          </p>
        </div>

        <span className="text-xs font-mono font-bold text-slate-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          Total Inquiries: {inquiries.length}
        </span>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by customer name, phone, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-sans focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs font-mono text-slate-500 flex items-center justify-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
            Loading contact inquiries...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs font-mono text-slate-500 space-y-2">
            <p>No contact form inquiries recorded yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3.5">Customer Name</th>
                  <th className="p-3.5">Mobile &amp; Email</th>
                  <th className="p-3.5">Location / DISCOM</th>
                  <th className="p-3.5">System Specs / Bill</th>
                  <th className="p-3.5">Message / Request</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{item.fullName}</td>
                    <td className="p-3.5">
                      <div className="font-mono text-slate-900 font-bold">{item.phone}</div>
                      <div className="text-[10px] text-slate-500">{item.email || "—"}</div>
                    </td>
                    <td className="p-3.5 font-bold text-slate-700">
                      {item.location}
                      {item.discomRegion && (
                        <div className="text-[10px] font-mono text-emerald-700">{item.discomRegion}</div>
                      )}
                    </td>
                    <td className="p-3.5 text-slate-700">
                      <div>{item.systemType || "Rooftop Solar"}</div>
                      {item.monthlyBill && (
                        <div className="text-[10px] font-mono text-amber-700">Bill: {item.monthlyBill}</div>
                      )}
                    </td>
                    <td className="p-3.5 max-w-xs">
                      <p className="text-[11px] text-slate-600 line-clamp-2">{item.message || "Site Visit Request"}</p>
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
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="RESOLVED">RESOLVED</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-[11px] font-mono text-slate-500 whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </td>
                    <td className="p-3.5 flex items-center gap-2">
                      {item.phone && (
                        <a
                          href={`https://wa.me/${item.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                            `Hello ${item.fullName}, thank you for contacting Pragati EcoSolar.`
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
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
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
