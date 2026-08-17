"use client";

import React, { useState } from "react";
import ProductFilterTabs, { ProductCategory } from "@/components/products/ProductFilterTabs";
import ProductCard from "@/components/products/ProductCard";
import BrandPartnersGrid from "@/components/products/BrandPartnersGrid";
import dynamic from "next/dynamic";
import { PRODUCTS } from "@/lib/data/products";

const SolarCalculatorModal = dynamic(() => import("@/components/home/SolarCalculatorModal"), {
  ssr: false,
});

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const filteredProducts = PRODUCTS.filter(
    (p) => activeCategory === "all" || p.category === activeCategory
  );

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12 md:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 font-bold">
            GOVERNMENT-APPROVED SOLAR EQUIPMENT
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Solar Products We Install
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed">
            We use only trusted, certified solar panels, inverters, and accessories — all covered with long-term warranties.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <ProductFilterTabs
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
        />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onRequestQuote={() => setIsCalculatorOpen(true)}
            />
          ))}
        </div>

        {/* Brand Partners Grid */}
        <BrandPartnersGrid />

      </div>

      {/* Solar Calculator Modal */}
      <SolarCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </div>
  );
}
