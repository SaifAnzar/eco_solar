"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Building2,
  Package,
  Search,
  Filter,
  MapPin,
  Phone,
  ExternalLink,
  Sparkles,
  User,
  ArrowRight,
  ShieldCheck,
  Store,
} from "lucide-react";

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
}

const DISTRICT_OPTIONS = [
  "ALL",
  "Khordha (Bhubaneswar)",
  "Cuttack",
  "Sambalpur",
  "Rourkela (Sundargarh)",
  "Balasore",
  "Berhampur (Ganjam)",
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

export default function PublicNetworkPage() {
  const [activeTab, setActiveTab] = useState<"ALL" | "FRANCHISE" | "DEALER">("ALL");
  const [partners, setPartners] = useState<ApprovedPartnerItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [districtFilter, setDistrictFilter] = useState("ALL");

  useEffect(() => {
    const fetchNetwork = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/network");
        const data = await res.json();
        if (res.ok && data.success) {
          setPartners(data.partners || []);
        }
      } catch (err) {
        console.error("Failed to fetch network directory:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNetwork();
  }, []);

  const totalCount = partners.length;
  const franchiseCount = partners.filter((p) => p.type === "FRANCHISE").length;
  const dealerCount = partners.filter((p) => p.type === "DEALER").length;

  // Filtered list
  const filteredPartners = partners.filter((p) => {
    if (activeTab !== "ALL" && p.type !== activeTab) return false;

    const query = searchTerm.toLowerCase();
    const matchesSearch =
      (p.name || "").toLowerCase().includes(query) ||
      (p.district || "").toLowerCase().includes(query) ||
      (p.fullAddress || "").toLowerCase().includes(query) ||
      (p.contactPerson || "").toLowerCase().includes(query);

    const matchesDistrict =
      districtFilter === "ALL" ||
      (p.district || "").toLowerCase().includes(districtFilter.toLowerCase().split(" ")[0]);

    return matchesSearch && matchesDistrict;
  });

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12 sm:py-16 md:py-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-800 font-semibold text-xs tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
            <span>Empaneled Partner Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Our Authorized Franchise &amp; Dealer Network
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-500 leading-relaxed">
            Find certified Pragati EcoSolar partners, experience centers, and authorized channel dealers across Odisha for equipment supply and solar commissioning.
          </p>
        </div>

        {/* Clean 3-Segmented Tabs: ALL, FRANCHISE, DEALER */}
        <div className="flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300/80 gap-1.5 shadow-inner">
            
            <button
              type="button"
              onClick={() => setActiveTab("ALL")}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === "ALL"
                  ? "bg-slate-900 text-amber-400 shadow-md"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-300/50"
              }`}
            >
              <Store className="w-4 h-4 text-amber-400" />
              <span>All Partners &amp; Outlets ({totalCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("FRANCHISE")}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === "FRANCHISE"
                  ? "bg-amber-600 text-slate-950 shadow-md"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-300/50"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Franchise Outlets ({franchiseCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("DEALER")}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === "DEALER"
                  ? "bg-emerald-600 text-white shadow-md"
                  : "text-slate-700 hover:text-emerald-700 hover:bg-slate-300/50"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Authorized Dealers ({dealerCount})</span>
            </button>

          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by District, City, or Partner Name..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* District Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-1 text-xs font-bold text-slate-600 shrink-0">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>District:</span>
            </div>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="w-full sm:w-auto bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
            >
              {DISTRICT_OPTIONS.map((d) => (
                <option key={d} value={d}>
                  {d === "ALL" ? "All Districts & Regions" : d}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Network Cards Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-400 font-medium">
            <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Loading partner directory...
          </div>
        ) : filteredPartners.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  
                  {/* Top Badge & District */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-extrabold uppercase font-mono px-3 py-1 rounded-full border inline-flex items-center gap-1.5 shadow-sm ${
                        partner.type === "FRANCHISE"
                          ? "bg-amber-100 text-amber-950 border-amber-300"
                          : "bg-emerald-100 text-emerald-950 border-emerald-300"
                      }`}
                    >
                      {partner.type === "FRANCHISE" ? (
                        <>
                          <Building2 className="w-3.5 h-3.5 text-amber-700" />
                          <span>FRANCHISE STORE</span>
                        </>
                      ) : (
                        <>
                          <Package className="w-3.5 h-3.5 text-emerald-700" />
                          <span>AUTHORIZED DEALER</span>
                        </>
                      )}
                    </span>

                    <span className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1 shrink-0">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {partner.district}
                    </span>
                  </div>

                  {/* Partner Name */}
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug">
                    {partner.name}
                  </h3>

                  {/* Contact Person */}
                  {partner.contactPerson && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{partner.contactPerson}</span>
                    </div>
                  )}

                  {/* Full Address */}
                  <div className="text-xs text-slate-500 leading-relaxed font-medium bg-slate-50 border border-slate-100 rounded-xl p-3">
                    {partner.fullAddress}
                    {partner.pincode && <span className="block text-[11px] font-mono text-slate-400 mt-0.5">PIN: {partner.pincode}</span>}
                  </div>

                </div>

                {/* Card CTAs */}
                <div className="pt-2 flex items-center gap-2">
                  <a
                    href={`tel:${partner.phone}`}
                    className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Partner</span>
                  </a>

                  {partner.googleMapUrl && (
                    <a
                      href={partner.googleMapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-3 bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 rounded-xl transition-colors text-xs font-bold flex items-center gap-1"
                      title="View on Google Maps"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Maps</span>
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Clean Empty State View */
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto space-y-6 shadow-sm">
            <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Store className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-900">
                Our Network is Expanding Across Odisha!
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {activeTab === "ALL"
                  ? "No active partner outlets listed in this region yet matching your search."
                  : `No active ${activeTab === "FRANCHISE" ? "Franchise Outlets" : "Authorized Dealers"} listed in this region yet.`}{" "}
                Are you interested in launching a business with Odisha&apos;s leading solar brand?
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/franchise"
                className="w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Apply for Franchise</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/dealership"
                className="w-full sm:w-auto py-3 px-6 bg-white border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <span>Become a Dealer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

