"use client";

import React, { useState } from "react";
import { Building2, Package } from "lucide-react";
import FranchiseForm from "@/components/franchise/FranchiseForm";
import DealershipForm from "@/components/dealership/DealershipForm";

export interface PartnerApplicationFormProps {
  defaultType?: "FRANCHISE" | "DEALERSHIP";
  onSuccess?: () => void;
  className?: string;
}

export default function PartnerApplicationForm({
  defaultType = "FRANCHISE",
  className = "",
}: PartnerApplicationFormProps) {
  const [activeType, setActiveType] = useState<"FRANCHISE" | "DEALERSHIP">(defaultType);

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Application Type Selector */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setActiveType("FRANCHISE")}
          className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
            activeType === "FRANCHISE"
              ? "border-amber-500 bg-amber-50/80 shadow-md ring-2 ring-amber-500/20"
              : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${activeType === "FRANCHISE" ? "bg-amber-500 text-slate-950" : "bg-slate-100 text-slate-600"}`}>
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Franchise Application</h4>
              <p className="text-xs text-slate-500">Retail showroom &amp; exclusive district hub</p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setActiveType("DEALERSHIP")}
          className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
            activeType === "DEALERSHIP"
              ? "border-emerald-500 bg-emerald-50/80 shadow-md ring-2 ring-emerald-500/20"
              : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${activeType === "DEALERSHIP" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"}`}>
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Dealership Application</h4>
              <p className="text-xs text-slate-500">Equipment supply &amp; wholesale distribution</p>
            </div>
          </div>
        </button>
      </div>

      {/* Active Form Rendering */}
      {activeType === "FRANCHISE" ? <FranchiseForm /> : <DealershipForm />}
    </div>
  );
}
