"use client";

import React, { useState, useEffect } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
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
  websiteUrl?: string;
}

interface ProductCardProps {
  product: ProductItem;
  onRequestQuote: (product: ProductItem) => void;
}

// Per-category fallback images using local asset paths
const CATEGORY_FALLBACKS: Record<string, string> = {
  modules: "/images/products/waaree-panel.png",
  inverters: "/images/products/statcon-inverter.png",
  structures: "/images/products/mounting-structure.png",
  "cables-earthing": "/images/brands/polycab.jpg",
  "street-lights": "/images/products/solar-street-light.png",
};

export default function ProductCard({ product, onRequestQuote }: ProductCardProps) {
  const defaultFallback =
    CATEGORY_FALLBACKS[product.category] ??
    "/images/products/waaree-panel.png";

  const [imgSrc, setImgSrc] = useState(product.image);

  useEffect(() => {
    setImgSrc(product.image);
  }, [product.image]);

  const getBrandWebsiteUrl = (): string => {
    if (product.websiteUrl) return product.websiteUrl;
    const b = product.brand.toLowerCase();
    if (b.includes("waaree")) return "https://www.waaree.com/";
    if (b.includes("adani")) return "https://www.adanisolar.com/";
    if (b.includes("sunora")) return "http://sunorapower.com/";
    if (b.includes("statcon")) return "https://statconpowtech.com/";
    if (b.includes("servotech")) return "https://servotech.in/";
    if (b.includes("polycab")) return "https://polycab.com/";
    if (b.includes("kei")) return "https://www.kei-ind.com/";
    return "/about";
  };

  const handleKnowMore = () => {
    const url = getBrandWebsiteUrl();
    if (url.startsWith("http")) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = url;
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between font-sans group">
      <div>
        {/* 16:10 Premium Image Frame */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950/5 flex items-center justify-center p-3">
          <img
            src={imgSrc}
            alt={product.name}
            onError={() => {
              if (imgSrc.startsWith("/images/products/")) {
                setImgSrc(imgSrc.replace("/images/products/", "/"));
              } else {
                setImgSrc(defaultFallback);
              }
            }}
            className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badge Overlay */}
          {product.badge && (
            <span className="absolute top-3 right-3 rounded-full bg-slate-900/90 border border-slate-700/80 backdrop-blur-md px-3 py-1 text-[11px] font-mono font-bold text-amber-400 shadow-sm">
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
            onClick={handleKnowMore}
            className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors font-mono cursor-pointer"
            title={`Visit ${product.brand} official website`}
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>Know More</span>
          </button>

          <button
            type="button"
            onClick={() => onRequestQuote(product)}
            className="bg-slate-900 hover:bg-emerald-600 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1.5 font-mono cursor-pointer"
          >
            <span>Request Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
