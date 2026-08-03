"use client";

import React, { useState, useEffect } from "react";
import { Download, ArrowRight } from "lucide-react";
import { ProductCategory } from "./ProductFilterTabs";

export interface ProductItem {
  id: string;
  name: string;
  category: ProductCategory;
  brand: string;
  badge: string;
  image: string;
  alt: string;
  description: string;
  features: string[];
}

interface ProductCardProps {
  product: ProductItem;
  onRequestQuote: (product: ProductItem) => void;
}

// Per-category fallback images — each product type shows a relevant photo
const CATEGORY_FALLBACKS: Record<string, string> = {
  modules:
    "https://images.unsplash.com/photo-1559302504-64aae6ca6890?w=800&auto=format&fit=crop&q=80",
  inverters:
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
  structures:
    "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?w=800&auto=format&fit=crop&q=80",
  "cables-earthing":
    "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=800&auto=format&fit=crop&q=80",
  "street-lights":
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop&q=80",
};

export default function ProductCard({ product, onRequestQuote }: ProductCardProps) {
  const defaultFallback =
    CATEGORY_FALLBACKS[product.category] ??
    "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=80";

  const [imgSrc, setImgSrc] = useState(product.image);

  useEffect(() => {
    setImgSrc(product.image);
  }, [product.image]);

  const handleDownloadSpecSheet = () => {
    const specContent = `PRAGATI ECOSOLAR - OFFICIAL SPECIFICATION SHEET\n` +
      `------------------------------------------------------------\n` +
      `Product Name: ${product.name}\n` +
      `Brand / OEM: ${product.brand}\n` +
      `Specification: ${product.badge}\n\n` +
      `Features:\n` +
      product.features.map((f, i) => `${i + 1}. ${f}`).join("\n") +
      `\n\n------------------------------------------------------------\n` +
      `Pragati EcoSolar HQ: HIG 42, Aryapalli, Patia, Bhubaneswar – 751024\n` +
      `Technical Helpline: +91 9124318222 / 9124679222\n`;

    const blob = new Blob([specContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${product.id}_Spec_Sheet.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between font-sans group">
      <div>
        {/* 16:9 Image Frame */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
          <img
            src={imgSrc}
            alt={product.name}
            onError={() => setImgSrc(defaultFallback)}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badge Overlay Sitting Cleanly */}
          {product.badge && (
            <span className="absolute top-3 right-3 rounded-full bg-slate-900/80 backdrop-blur-md px-3 py-1 text-xs font-medium text-white shadow-sm">
              {product.badge}
            </span>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Brand Tag */}
          <div className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase mb-1">
            {product.brand}
          </div>

          {/* Product Name */}
          <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2">
            {product.name}
          </h3>

          {/* Subtitle / Description */}
          <p className="text-xs text-slate-600 line-clamp-2 mb-4">
            {product.description}
          </p>

          {/* Spec Bullets */}
          <div className="space-y-2 pt-3 border-t border-slate-100">
            {product.features.slice(0, 3).map((feat, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                <span className="bg-emerald-500 w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"></span>
                <span className="line-clamp-1">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="p-5 pt-0">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleDownloadSpecSheet}
            className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors font-mono"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Spec Sheet</span>
          </button>

          <button
            type="button"
            onClick={() => onRequestQuote(product)}
            className="bg-slate-900 hover:bg-emerald-600 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 font-mono"
          >
            <span>Request Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
