"use client";

import React from "react";

export type ProductCategory =
  | "all"
  | "modules"
  | "inverters"
  | "structures"
  | "street-lights"
  | "cables-earthing";

interface ProductFilterTabsProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
}

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: "all", label: "All Hardware" },
  { id: "modules", label: "PV Modules" },
  { id: "inverters", label: "Inverters" },
  { id: "structures", label: "Mounting Structures" },
  { id: "street-lights", label: "Street Lights" },
  { id: "cables-earthing", label: "Cables & Protection" },
];

export default function ProductFilterTabs({
  activeCategory,
  onSelectCategory,
}: ProductFilterTabsProps) {
  return (
    <div className="bg-slate-100 p-1 rounded-xl flex flex-wrap items-center justify-center gap-1 max-w-4xl mx-auto font-sans">
      {CATEGORIES.map((tab) => {
        const isActive = activeCategory === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectCategory(tab.id)}
            className={`px-4 py-2 text-xs rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-white text-slate-900 shadow-sm font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
