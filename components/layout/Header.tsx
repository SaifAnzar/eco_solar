"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Phone,
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Zap,
  Sun,
  Home,
  Building2,
  Droplets,
  ShieldCheck,
  Layers,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import SolarCalculatorModal from "../home/SolarCalculatorModal";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Mobile accordion state
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solarPackages = [
    {
      name: "Solar for Your Home",
      desc: "1 kW – 10 kW Systems (PM Surya Ghar Subsidy)",
      href: "/services/residential",
      icon: Home,
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      name: "Offices & Factories",
      desc: "10 kW – 500 kW+ Systems (80% AD Tax Benefit)",
      href: "/services/commercial",
      icon: Building2,
      iconBg: "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
      name: "Solar Water Pumps",
      desc: "3 HP – 10 HP PM-KUSUM Pumps (Up to 90% Subsidy)",
      href: "/services/solar-pumps",
      icon: Droplets,
      iconBg: "bg-blue-50 text-blue-600 border-blue-200",
    },
  ];

  const solarProducts = [
    {
      name: "Solar Modules & Panels",
      desc: "Waaree & Adani Tier-1 ALMM Panels (540W – 600W+)",
      href: "/products?category=modules",
      icon: Sun,
      iconBg: "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
      name: "Solar Inverters",
      desc: "Statcon & Servotech On-Grid & Off-Grid Hybrid Inverters",
      href: "/products?category=inverters",
      icon: Zap,
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      name: "Mounting Structures (MMS)",
      desc: "150 km/h Cyclone-Resistant HDG Galvanized Frames",
      href: "/products?category=structures",
      icon: ShieldCheck,
      iconBg: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      name: "Accessories & Net Meters",
      desc: "DLMS Net Meters, Lightning Arrestors & Solar DC Wires",
      href: "/products?category=accessories",
      icon: Layers,
      iconBg: "bg-purple-50 text-purple-600 border-purple-200",
    },
  ];

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
              <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
                {/* 1. Solar Packages (Dropdown) */}
                <div className="relative group py-5">
                  <Link
                    href="/services"
                    className={`inline-flex items-center gap-1 px-3.5 py-2 text-[13px] rounded-lg transition-all duration-150 ${
                      pathname.startsWith("/services")
                        ? "text-emerald-700 font-bold bg-emerald-50/50"
                        : "text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <span>Solar Packages</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200 group-hover:rotate-180 group-hover:text-emerald-600" />
                  </Link>

                  {/* Dropdown Card */}
                  <div className="absolute top-full left-0 w-96 bg-white border border-slate-200/90 rounded-2xl shadow-2xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                    <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700">
                        SOLAR PACKAGES & SERVICES
                      </span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    </div>

                    <div className="py-1.5 space-y-1">
                      {solarPackages.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                          >
                            <div
                              className={`p-2 rounded-xl border shrink-0 mt-0.5 ${item.iconBg}`}
                            >
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="space-y-0.5">
                              <div className="text-xs font-bold text-slate-900 group-hover/item:text-emerald-600 transition-colors flex items-center gap-1">
                                <span>{item.name}</span>
                                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                              </div>
                              <p className="text-[11px] text-slate-500 leading-snug">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-slate-100 px-3 py-2 bg-slate-50/70 rounded-xl flex items-center justify-between">
                      <span className="text-[11px] text-slate-600 font-medium">
                        Looking for all services?
                      </span>
                      <Link
                        href="/services"
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                      >
                        <span>View All</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* 2. Our Products (Dropdown) */}
                <div className="relative group py-5">
                  <Link
                    href="/products"
                    className={`inline-flex items-center gap-1 px-3.5 py-2 text-[13px] rounded-lg transition-all duration-150 ${
                      pathname.startsWith("/products")
                        ? "text-emerald-700 font-bold bg-emerald-50/50"
                        : "text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <span>Our Products</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200 group-hover:rotate-180 group-hover:text-emerald-600" />
                  </Link>

                  {/* Dropdown Card */}
                  <div className="absolute top-full left-0 w-96 bg-white border border-slate-200/90 rounded-2xl shadow-2xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto z-50">
                    <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700">
                        HARDWARE & HARDWARE CATALOG
                      </span>
                      <Zap className="w-3.5 h-3.5 text-emerald-600" />
                    </div>

                    <div className="py-1.5 space-y-1">
                      {solarProducts.map((item) => {
                        const IconComponent = item.icon;
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                          >
                            <div
                              className={`p-2 rounded-xl border shrink-0 mt-0.5 ${item.iconBg}`}
                            >
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div className="space-y-0.5">
                              <div className="text-xs font-bold text-slate-900 group-hover/item:text-emerald-600 transition-colors flex items-center gap-1">
                                <span>{item.name}</span>
                                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                              </div>
                              <p className="text-[11px] text-slate-500 leading-snug">
                                {item.desc}
                              </p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-slate-100 px-3 py-2 bg-slate-50/70 rounded-xl flex items-center justify-between">
                      <span className="text-[11px] text-slate-600 font-medium">
                        Browse all product models?
                      </span>
                      <Link
                        href="/products"
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                      >
                        <span>Catalog</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* 3. Projects */}
                <Link
                  href="/projects"
                  className={`px-3.5 py-2 text-[13px] rounded-lg transition-all duration-150 ${
                    pathname === "/projects"
                      ? "text-emerald-700 font-bold bg-emerald-50/50"
                      : "text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  Projects
                </Link>

                {/* 4. Calculator */}
                <Link
                  href="/calculator"
                  className={`px-3.5 py-2 text-[13px] rounded-lg transition-all duration-150 ${
                    pathname === "/calculator"
                      ? "text-emerald-700 font-bold bg-emerald-50/50"
                      : "text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  Calculator
                </Link>

                {/* 5. About Us */}
                <Link
                  href="/about"
                  className={`px-3.5 py-2 text-[13px] rounded-lg transition-all duration-150 ${
                    pathname === "/about"
                      ? "text-emerald-700 font-bold bg-emerald-50/50"
                      : "text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  About Us
                </Link>

                {/* 6. Contact */}
                <Link
                  href="/contact"
                  className={`px-3.5 py-2 text-[13px] rounded-lg transition-all duration-150 ${
                    pathname === "/contact"
                      ? "text-emerald-700 font-bold bg-emerald-50/50"
                      : "text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  Contact
                </Link>
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
                <div className="text-[10px] text-slate-400 font-medium">
                  Official Solar Installer · Odisha
                </div>
              </div>
            </div>

            <nav className="px-3 py-3 space-y-1">
              {/* Solar Packages Mobile Accordion */}
              <div>
                <div className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-800 rounded-xl hover:bg-slate-50">
                  <Link
                    href="/services"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1"
                  >
                    Solar Packages
                  </Link>
                  <button
                    onClick={() => setMobilePackagesOpen(!mobilePackagesOpen)}
                    className="p-1 text-slate-400 hover:text-slate-700"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobilePackagesOpen ? "rotate-180 text-emerald-600" : ""
                      }`}
                    />
                  </button>
                </div>

                {mobilePackagesOpen && (
                  <div className="ml-4 border-l-2 border-slate-100 pl-3 py-1 space-y-1">
                    {solarPackages.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 px-3 text-xs font-medium text-slate-600 hover:text-emerald-700 rounded-lg hover:bg-emerald-50/60"
                      >
                        <div className="font-bold text-slate-900">{item.name}</div>
                        <div className="text-[10px] text-slate-400 leading-tight">{item.desc}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Our Products Mobile Accordion */}
              <div>
                <div className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-800 rounded-xl hover:bg-slate-50">
                  <Link
                    href="/products"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1"
                  >
                    Our Products
                  </Link>
                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="p-1 text-slate-400 hover:text-slate-700"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileProductsOpen ? "rotate-180 text-emerald-600" : ""
                      }`}
                    />
                  </button>
                </div>

                {mobileProductsOpen && (
                  <div className="ml-4 border-l-2 border-slate-100 pl-3 py-1 space-y-1">
                    {solarProducts.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 px-3 text-xs font-medium text-slate-600 hover:text-emerald-700 rounded-lg hover:bg-emerald-50/60"
                      >
                        <div className="font-bold text-slate-900">{item.name}</div>
                        <div className="text-[10px] text-slate-400 leading-tight">{item.desc}</div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Regular Mobile Links */}
              <Link
                href="/projects"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-800 rounded-xl hover:bg-slate-50"
              >
                <span>Projects</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </Link>

              <Link
                href="/calculator"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-800 rounded-xl hover:bg-slate-50"
              >
                <span>Calculator</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </Link>

              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-800 rounded-xl hover:bg-slate-50"
              >
                <span>About Us</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </Link>

              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 text-sm font-semibold text-slate-800 rounded-xl hover:bg-slate-50"
              >
                <span>Contact</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </Link>
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
