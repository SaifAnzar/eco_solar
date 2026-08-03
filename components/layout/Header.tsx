"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ChevronRight, Zap } from "lucide-react";
import SolarCalculatorModal from "../home/SolarCalculatorModal";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Projects", href: "/projects" },
    { name: "Calculator", href: "/calculator" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Outer Floating Container Wrapper */}
      <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6 font-sans">
        {/* Navbar Surface */}
        <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md rounded-2xl px-5 py-3 flex items-center justify-between gap-4">
          
          {/* Logo Integration */}
          <Link className="flex items-center gap-3 shrink-0" href="/">
            <img
              src="/logo.png"
              alt="Pragati EcoSolar Logo"
              className="h-10 md:h-11 w-auto object-contain transition-transform hover:scale-105"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-slate-50/80 p-1.5 rounded-xl border border-slate-100">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? "font-bold text-emerald-700 bg-white shadow-sm"
                      : "font-semibold text-slate-600 hover:text-emerald-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            
            {/* Phone CTA */}
            <a
              href="tel:+919124318222"
              className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2.5 rounded-xl transition-all border border-slate-200/60 font-mono"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>+91 9124318222</span>
            </a>

            {/* Primary CTA Button */}
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="bg-slate-900 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-1.5 font-mono"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>Instant ROI Calculator ⚡</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-slate-700 bg-slate-100 border border-slate-200/80 rounded-xl lg:hidden hover:bg-slate-200 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border border-slate-200/80 mt-2 px-4 pt-3 pb-6 rounded-2xl space-y-3 shadow-xl">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-2.5 text-xs rounded-xl transition-colors flex items-center justify-between ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 font-bold"
                        : "font-semibold text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                );
              })}
            </nav>
            <div className="pt-3 border-t border-slate-100 grid grid-cols-1 gap-2">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCalculatorOpen(true);
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-md font-mono"
              >
                <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>Instant ROI Calculator ⚡</span>
              </button>
              <a
                href="tel:+919124318222"
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-slate-100 text-slate-800 border border-slate-200 text-xs font-semibold rounded-xl font-mono"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call Technical Team (+91 9124318222)</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Solar Calculator Modal */}
      <SolarCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </>
  );
}
