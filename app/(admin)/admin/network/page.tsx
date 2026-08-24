"use client";

import React, { useState, useEffect } from "react";
import {
  Store,
  Building2,
  Package,
  Plus,
  Search,
  Filter,
  MapPin,
  Phone,
  Mail,
  User,
  ExternalLink,
  Edit2,
  Trash2,
  RefreshCw,
  X,
  CheckCircle2,
  XCircle,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { showToast, scrollToTop, showConfirmDialog } from "@/lib/toast";

export interface ApprovedPartnerItem {
  id: string;
  type: "FRANCHISE" | "DEALER";
  name: string;
  contactPerson?: string | null;
  phone: string;
  email?: string | null;
  district: string;
  fullAddress: string;
  pincode?: string | null;
  googleMapUrl?: string | null;
  isActive: boolean;
  createdAt: string;
}

const DISTRICT_LIST = [
  "Khordha (Bhubaneswar)",
  "Cuttack",
  "Sambalpur",
  "Sundargarh (Rourkela)",
  "Balasore",
  "Ganjam (Berhampur)",
  "Puri",
  "Angul",
  "Jharsuguda",
  "Bhadrak",
  "Jajpur",
  "Mayurbhanj",
  "Rayagada",
  "Koraput",
  "Kendrapara",
  "Dhenkanal",
  "Bargarh",
  "Bolangir",
];

export default function AdminNetworkPage() {
  const [activeTab, setActiveTab] = useState<"ALL" | "FRANCHISE" | "DEALER">("ALL");
  const [partners, setPartners] = useState<ApprovedPartnerItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState("");
  const [districtFilter, setDistrictFilter] = useState("ALL");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<ApprovedPartnerItem | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form Fields
  const [type, setType] = useState<"FRANCHISE" | "DEALER">("FRANCHISE");
  const [name, setName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("Khordha (Bhubaneswar)");
  const [fullAddress, setFullAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [googleMapUrl, setGoogleMapUrl] = useState("");
  const [isActive, setIsActive] = useState(true);

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/network");
      const data = await res.json();
      if (res.ok && data.success) {
        setPartners(data.partners || []);
      }
    } catch (err) {
      console.error("Failed to fetch admin network partners:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleOpenAddModal = () => {
    setEditingPartner(null);
    setType(activeTab === "DEALER" ? "DEALER" : "FRANCHISE");
    setName("");
    setContactPerson("");
    setPhone("");
    setEmail("");
    setDistrict("Khordha (Bhubaneswar)");
    setFullAddress("");
    setPincode("");
    setGoogleMapUrl("");
    setIsActive(true);
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (partner: ApprovedPartnerItem) => {
    setEditingPartner(partner);
    setType(partner.type);
    setName(partner.name);
    setContactPerson(partner.contactPerson || "");
    setPhone(partner.phone);
    setEmail(partner.email || "");
    setDistrict(partner.district);
    setFullAddress(partner.fullAddress);
    setPincode(partner.pincode || "");
    setGoogleMapUrl(partner.googleMapUrl || "");
    setIsActive(partner.isActive);
    setErrorMessage(null);
    setIsModalOpen(true);
  };

  const handleSavePartner = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim() || !phone.trim() || !district.trim() || !fullAddress.trim()) {
      setErrorMessage("Please complete all required fields (Name, Phone, District, Full Address).");
      return;
    }

    setFormLoading(true);

    try {
      const payload = {
        type,
        name: name.trim(),
        contactPerson: contactPerson.trim(),
        phone: phone.trim(),
        email: email.trim(),
        district,
        fullAddress: fullAddress.trim(),
        pincode: pincode.trim(),
        googleMapUrl: googleMapUrl.trim(),
        isActive,
      };

      let res;
      if (editingPartner) {
        res = await fetch("/api/admin/network", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingPartner.id, ...payload }),
        });
      } else {
        res = await fetch("/api/admin/network", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();

      if (res.ok && data.success) {
        setIsModalOpen(false);
        fetchPartners();
        scrollToTop();
        showToast(
          editingPartner
            ? "Partner details updated successfully!"
            : "New partner saved and published!",
          "success"
        );
      } else {
        showToast(data.error || "Failed to save partner.", "error");
        throw new Error(data.error || "Failed to save partner.");
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleToggleActive = async (partner: ApprovedPartnerItem) => {
    try {
      const newActive = !partner.isActive;
      const res = await fetch("/api/admin/network", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: partner.id, isActive: newActive }),
      });
      if (res.ok) {
        setPartners((prev) =>
          prev.map((p) => (p.id === partner.id ? { ...p, isActive: newActive } : p))
        );
        showToast(
          `Partner status updated to ${newActive ? "Active" : "Hidden"}.`,
          "info"
        );
      }
    } catch (err) {
      console.error("Failed to toggle active status:", err);
      showToast("Failed to update active status.", "error");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirmDialog(
      "Delete Partner Record?",
      "Are you sure you want to delete this franchise/dealer partner record?",
      "Yes, Delete"
    );
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/admin/network?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchPartners();
        showToast("Partner record deleted successfully!", "success");
      } else {
        showToast("Failed to delete partner record.", "error");
      }
    } catch (err) {
      console.error("Failed to delete partner:", err);
      showToast("Error deleting partner record.", "error");
    }
  };

  // Metrics
  const totalActive = partners.filter((p) => p.isActive).length;
  const franchiseCount = partners.filter((p) => p.type === "FRANCHISE").length;
  const dealerCount = partners.filter((p) => p.type === "DEALER").length;
  const uniqueDistricts = new Set(partners.map((p) => p.district)).size;

  // Filtered List for Table
  const filteredPartners = partners.filter((p) => {
    if (activeTab !== "ALL" && p.type !== activeTab) return false;

    const query = searchTerm.toLowerCase();
    const matchesQuery =
      (p.name || "").toLowerCase().includes(query) ||
      (p.contactPerson || "").toLowerCase().includes(query) ||
      (p.phone || "").includes(query) ||
      (p.district || "").toLowerCase().includes(query);

    const matchesDistrict = districtFilter === "ALL" || p.district === districtFilter;

    return matchesQuery && matchesDistrict;
  });


  return (
    <div className="space-y-8 p-4 sm:p-6 md:p-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Store className="w-3.5 h-3.5 text-amber-600" />
            <span>Network Directory Admin</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Partner Directory Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage approved Franchise outlets and Authorized Channel Dealers across Odisha.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPartners}
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors cursor-pointer"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={handleOpenAddModal}
            className="py-2.5 px-4 bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Partner</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Outlets</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">{totalActive}</div>
          <div className="text-[11px] text-slate-400 font-medium">Published on public site</div>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Franchise Stores</span>
            <Building2 className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">{franchiseCount}</div>
          <div className="text-[11px] text-slate-400 font-medium">Exclusive district hubs</div>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Channel Dealers</span>
            <Package className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-600">{dealerCount}</div>
          <div className="text-[11px] text-slate-400 font-medium">Authorized distributors</div>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">District Coverage</span>
            <MapPin className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-600">{uniqueDistricts}</div>
          <div className="text-[11px] text-slate-400 font-medium">Unique districts covered</div>
        </div>
      </div>

      {/* Three-Tab Switcher & Filter Bar */}
      <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Three Tabs */}
        <div className="inline-flex flex-wrap items-center p-1 bg-slate-100 rounded-xl border border-slate-200 gap-1 w-full md:w-auto">
          <button
            onClick={() => setActiveTab("ALL")}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "ALL"
                ? "bg-slate-900 text-amber-400 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All Outlets ({partners.length})
          </button>

          <button
            onClick={() => setActiveTab("FRANCHISE")}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "FRANCHISE"
                ? "bg-amber-600 text-slate-950 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Franchise Outlets ({franchiseCount})
          </button>

          <button
            onClick={() => setActiveTab("DEALER")}
            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
              activeTab === "DEALER"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Authorized Dealers ({dealerCount})
          </button>
        </div>

        {/* Search & District Filter */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-center">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search partner name, phone..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            <option value="ALL">All Districts</option>
            {DISTRICT_LIST.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Admin Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Partner Name &amp; Type</th>
                <th className="py-3.5 px-4">Contact Person</th>
                <th className="py-3.5 px-4">District</th>
                <th className="py-3.5 px-4">Full Address</th>
                <th className="py-3.5 px-4">Phone / Email</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    Loading partners...
                  </td>
                </tr>
              ) : filteredPartners.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No partner records found for this view.
                  </td>
                </tr>
              ) : (
                filteredPartners.map((partner) => (
                  <tr key={partner.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{partner.name}</span>
                        <span
                          className={`text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded border ${
                            partner.type === "FRANCHISE"
                              ? "bg-amber-100 text-amber-900 border-amber-300"
                              : "bg-emerald-100 text-emerald-900 border-emerald-300"
                          }`}
                        >
                          {partner.type === "FRANCHISE" ? "Franchise Store" : "Authorized Dealer"}
                        </span>
                      </div>
                      <span className="block text-[10px] font-mono text-slate-400">ID: {partner.id}</span>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">{partner.contactPerson || "N/A"}</td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                        {partner.district}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs truncate" title={partner.fullAddress}>
                      {partner.fullAddress}
                      {partner.pincode && <span className="block text-[10px] text-slate-400 font-mono">PIN: {partner.pincode}</span>}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap space-y-0.5">
                      <div className="font-mono text-slate-900 font-bold">{partner.phone}</div>
                      {partner.email && <div className="text-[11px] text-slate-400">{partner.email}</div>}
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleToggleActive(partner)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold transition-colors cursor-pointer ${
                          partner.isActive
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-slate-100 text-slate-500 border border-slate-300"
                        }`}
                      >
                        {partner.isActive ? (
                          <>
                            <ToggleRight className="w-4 h-4 text-emerald-600" /> Active
                          </>
                        ) : (
                          <>
                            <ToggleLeft className="w-4 h-4 text-slate-400" /> Hidden
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {partner.googleMapUrl && (
                          <a
                            href={partner.googleMapUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded-lg transition-colors"
                            title="Open Map"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}

                        <button
                          onClick={() => handleOpenEditModal(partner)}
                          className="p-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                          title="Edit Partner"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(partner.id)}
                          className="p-1.5 bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                          title="Delete Partner"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Partner Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-5 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-2xl font-black text-slate-900">
                {editingPartner ? "Edit Partner Details" : "Add New Approved Partner"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Enter official store details to display on the public Partner Directory.
              </p>
            </div>

            <form onSubmit={handleSavePartner} className="space-y-4">
              
              {/* Partner Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Partner Type <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setType("FRANCHISE")}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      type === "FRANCHISE"
                        ? "border-amber-500 bg-amber-50 text-amber-900 ring-1 ring-amber-500"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    Franchise Store
                  </button>
                  <button
                    type="button"
                    onClick={() => setType("DEALER")}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      type === "DEALER"
                        ? "border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500"
                        : "border-slate-200 bg-slate-50 text-slate-600"
                    }`}
                  >
                    Authorized Dealer
                  </button>
                </div>
              </div>

              {/* Store / Business Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Store / Business Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Pragati EcoSolar Cuttack Experience Center"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                />
              </div>

              {/* Contact Person & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Contact Person Name
                  </label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Subhashish Swain"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Contact Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 91243 18222"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>
              </div>

              {/* Email & District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="partner@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    District / City <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium cursor-pointer"
                  >
                    {DISTRICT_LIST.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Full Address */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Store Address <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={fullAddress}
                  onChange={(e) => setFullAddress(e.target.value)}
                  placeholder="Plot No. 124, College Square, Cuttack, Odisha"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                />
              </div>

              {/* Pincode & Google Map URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="753003"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Google Maps Link
                  </label>
                  <input
                    type="url"
                    value={googleMapUrl}
                    onChange={(e) => setGoogleMapUrl(e.target.value)}
                    placeholder="https://maps.google.com/..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 rounded cursor-pointer"
                />
                <label htmlFor="isActiveToggle" className="text-xs font-bold text-slate-800 cursor-pointer">
                  Publish Active on Public Directory
                </label>
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl flex items-center gap-2">
                  <span>⚠️ {errorMessage}</span>
                </div>
              )}

              {/* Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors disabled:opacity-50"
                >
                  {formLoading ? "Saving..." : editingPartner ? "Update Partner" : "Save & Publish Partner"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
