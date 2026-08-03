"use client";

import React, { useState } from "react";
import ProductFilterTabs, { ProductCategory } from "@/components/products/ProductFilterTabs";
import ProductCard from "@/components/products/ProductCard";
import SolarCalculatorModal from "@/components/home/SolarCalculatorModal";
import { PRODUCTS } from "@/lib/data/products";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const filteredProducts = PRODUCTS.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12 md:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Editorial Showcase Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">
            ALMM & BIS APPROVED HARDWARE
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tier-1 Hardware Specifications
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            Precision-engineered solar PV modules, string inverters, HDG mounting structures, and BOS protection components deployed across Odisha.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <ProductFilterTabs
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
        />

        {/* 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onRequestQuote={() => setIsCalculatorOpen(true)}
            />
          ))}
        </div>

        {/* OEM Partner Strip */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-100 pb-4 gap-2">
            <span className="text-xs font-semibold text-slate-900 uppercase tracking-wider font-mono">
              ALMM LIST-I APPROVED OEM PARTNERS
            </span>
            <div className="flex gap-2 text-[11px] font-medium text-slate-600 font-mono">
              <span>ALMM Approved</span>
              <span>•</span>
              <span>BIS Certified</span>
              <span>•</span>
              <span>ISO 9001:2015</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center text-xs text-slate-700 font-medium font-mono">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">Waaree Solar</div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">Adani Solar</div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">Sunora Power</div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">Statcon Power</div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">Servotech</div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">Polycab Wires</div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">KEI Cables</div>
          </div>
        </div>

      </div>

      {/* Solar Calculator Modal */}
      <SolarCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </div>
  );
}
