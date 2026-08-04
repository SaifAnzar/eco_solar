"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ChevronRight, Zap, Sun } from "lucide-react";
import SolarCalculatorModal from "../home/SolarCalculatorModal";

const navLinks = [
  { name: "Solar Packages", href: "/services" },
  { name: "Our Products", href: "/products" },
  { name: "Projects", href: "/projects" },
  { name: "Calculator", href: "/calculator" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full font-sans">

        {/* ── TOP ANNOUNCEMENT STRIP ── */}
        <div className="bg-slate-900 text-white text-center py-1.5 px-4 text-[11px] font-semibold tracking-wide hidden sm:block">
          <span className="text-amber-400 mr-1.5">⚡</span>
          PM Surya Ghar & Odisha Govt — Get up to{" "}
          <span className="text-emerald-400 font-bold">₹1,38,000 Combined Subsidy</span> on your
          home solar system.{" "}
          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="underline underline-offset-2 text-white hover:text-amber-300 transition-colors ml-1"
          >
            Calculate Now →
          </button>
        </div>

        {/* ── MAIN NAVBAR ── */}
        <div
          className={`w-full transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-xl shadow-md border-b border-slate-200/80"
              : "bg-white border-b border-slate-100"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 gap-6">

              {/* ── BRAND LOGO ── */}
              <Link href="/" className="flex items-center shrink-0 group">
                <img
                  src="/logo.png"
                  alt="Pragati EcoSolar"
                  className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </Link>

              {/* ── DESKTOP NAV LINKS ── */}
              <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`relative px-3.5 py-2 text-[13px] rounded-lg transition-all duration-150 ${
                        isActive
                          ? "text-emerald-700 font-bold"
                          : "text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {link.name}
                      {isActive && (
                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-emerald-500 rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* ── RIGHT ACTIONS ── */}
              <div className="flex items-center gap-2 shrink-0">

                {/* Phone number — md+ */}
                <a
                  href="tel:+919124318222"
                  className="hidden md:flex items-center gap-2 text-[12px] font-semibold text-slate-700 hover:text-emerald-600 transition-colors px-3 py-2 rounded-lg hover:bg-slate-50"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                    <Phone className="w-3 h-3 text-emerald-600" />
                  </div>
                  <span className="font-mono">9124318222</span>
                </a>

                {/* Primary CTA */}
                <button
                  onClick={() => setIsCalculatorOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.97] text-white text-[12px] font-bold px-4 py-2 rounded-lg transition-all shadow-sm shadow-emerald-600/20"
                >
                  <Zap className="w-3.5 h-3.5 fill-white" />
                  Calculate Savings
                </button>

                {/* Mobile hamburger */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg lg:hidden transition-colors"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE DRAWER ── */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl">
            {/* Brand strip in mobile menu */}
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <Sun className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-slate-900">PRAGATI ECOSOLAR</div>
                <div className="text-[10px] text-slate-400 font-medium">Official Solar Installer · Odisha</div>
              </div>
            </div>

            <nav className="px-3 py-3 space-y-0.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 text-sm rounded-xl transition-colors ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 font-bold"
                        : "text-slate-700 font-medium hover:bg-slate-50"
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300" />
                  </Link>
                );
              })}
            </nav>

            <div className="px-4 pb-5 pt-2 space-y-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCalculatorOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-all"
              >
                <Zap className="w-4 h-4 fill-white" />
                Calculate My Solar Savings
              </button>
              <a
                href="tel:+919124318222"
                className="w-full flex items-center justify-center gap-2 py-3 border border-slate-200 bg-slate-50 text-slate-800 text-sm font-semibold rounded-xl transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                Call +91 9124318222
              </a>
            </div>
          </div>
        )}
      </header>

      <SolarCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />
    </>
  );
}
