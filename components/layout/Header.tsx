"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  Zap,
  Sun,
  Home,
  Building2,
  Droplets,
  ShieldCheck,
  Layers,
  Calendar,
  FileText,
  Lightbulb,
  Wrench,
  Phone,
  Info,
  Camera,
  Award,
  Package,
  Store,
  Briefcase,
  MoreHorizontal,
  Handshake,
  MapPin,
} from "lucide-react";
import dynamic from "next/dynamic";
import SiteVisitModal from "../common/SiteVisitModal";
import { SITE_CONFIG } from "@/config/site";

const WhatsAppIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.707 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const SolarCalculatorModal = dynamic(() => import("../home/SolarCalculatorModal"), {
  ssr: false,
});

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSiteVisitOpen, setIsSiteVisitOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobilePartnershipsOpen, setMobilePartnershipsOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close all menus on pathname change
  useEffect(() => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);

    if (typeof window !== "undefined") {
      const [targetPath, hash] = href.split("#");
      if (hash && (pathname === targetPath || (targetPath === "" && pathname === "/"))) {
        const el = document.getElementById(hash);
        if (el) {
          e.preventDefault();
          const yOffset = -84;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    }
  };

  const handleOpenLiveChat = () => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-live-chat"));
    }
  };

  const servicesDropdownItems = [
    {
      name: "Solar EPC — On-Grid Systems",
      desc: "Net-metered grid connected solar for maximum bill savings & subsidies",
      href: "/services#on-grid",
      icon: Sun,
      iconBg: "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
      name: "Solar EPC — Off-Grid Systems",
      desc: "100% battery-backed independent power for zero DISCOM reliance",
      href: "/services#off-grid",
      icon: Zap,
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
    {
      name: "Solar EPC — Hybrid Systems",
      desc: "Grid + battery backup for uninterrupted power & maximum savings",
      href: "/services#hybrid",
      icon: Layers,
      iconBg: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      name: "Solar Water Pumping Systems",
      desc: "High-efficiency agricultural & community solar water pumps",
      href: "/services#pumps",
      icon: Droplets,
      iconBg: "bg-cyan-50 text-cyan-600 border-cyan-200",
    },
    {
      name: "Solar Street Lighting Solutions",
      desc: "Standalone & centralized solar lighting for commercial & municipal sites",
      href: "/services#lighting",
      icon: Lightbulb,
      iconBg: "bg-yellow-50 text-yellow-600 border-yellow-200",
    },
    {
      name: "Net Metering & Subsidy Assistance",
      desc: "End-to-end DISCOM net meter approvals & PM Surya Ghar processing",
      href: "/services#net-metering",
      icon: ShieldCheck,
      iconBg: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      name: "O&M (Operation & Maintenance)",
      desc: "Preventive maintenance, routine panel washing & annual contracts",
      href: "/services#om",
      icon: Wrench,
      iconBg: "bg-rose-50 text-rose-600 border-rose-200",
    },
  ];

  const partnershipsDropdownItems = [
    {
      name: "Apply for Franchise",
      desc: "Launch an official Pragati EcoSolar retail store in your city",
      href: "/franchise",
      icon: Store,
      iconBg: "bg-rose-50 text-rose-600 border-rose-200",
    },
    {
      name: "Become a Dealer",
      desc: "Become an authorized solar equipment distributor & channel partner",
      href: "/dealership",
      icon: Briefcase,
      iconBg: "bg-teal-50 text-teal-600 border-teal-200",
    },
    {
      name: "Locate Franchise & Dealers",
      desc: "Find empaneled Pragati EcoSolar experience centers & dealers across Odisha",
      href: "/network",
      icon: MapPin,
      iconBg: "bg-amber-50 text-amber-600 border-amber-200",
    },
  ];

  const moreDropdownItems = [
    {
      name: "How It Works",
      desc: "Step-by-step solar installation & grid net-metering roadmap",
      href: "/how-it-works",
      icon: Layers,
      iconBg: "bg-amber-50 text-amber-600 border-amber-200",
    },
    {
      name: "Projects Portfolio",
      desc: "120+ real installation site photos & videos across Odisha",
      href: "/projects",
      icon: Camera,
      iconBg: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      name: "Govt Schemes & Subsidies",
      desc: "PM Surya Ghar (up to ₹78,000) & Odisha state benefits",
      href: "/government-schemes",
      icon: Award,
      iconBg: "bg-yellow-50 text-yellow-600 border-yellow-200",
    },
    {
      name: "Approved Solar Products",
      desc: "Tier-1 ALMM panels, hybrid inverters & mounting hardware",
      href: "/products",
      icon: Package,
      iconBg: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      name: "Contact Us & Support",
      desc: "Registered office, helpline numbers & site visit booking",
      href: "/contact",
      icon: Phone,
      iconBg: "bg-indigo-50 text-indigo-600 border-indigo-200",
    },
  ];

  const mainNavItems: Array<{
    label: string;
    href: string;
    isDropdown?: boolean;
    dropdownType?: "services" | "partnerships" | "more";
  }> = [
    // Non-Dropdown Navigation Group (Left Side)
    { label: "About Us", href: "/about" },
    { label: "Residential", href: "/residential" },
    { label: "Commercial", href: "/commercial" },
    // Dropdown Navigation Group (Right Side)
    {
      label: "Our Services",
      href: "/services",
      isDropdown: true,
      dropdownType: "services",
    },
    {
      label: "Partnerships",
      href: "#",
      isDropdown: true,
      dropdownType: "partnerships",
    },
    {
      label: "More",
      href: "#",
      isDropdown: true,
      dropdownType: "more",
    },
  ];






  return (
    <>
      <header className="sticky top-0 z-50 w-full font-sans">
        {/* Top Announcement Bar */}
        <div className="bg-slate-900 text-white text-center py-1.5 px-4 text-[11px] font-semibold tracking-wide hidden sm:block">
          <span className="text-amber-400 mr-1.5">⚡</span>
          PM Surya Ghar Muft Bijli Yojana — Get up to{" "}
          <span className="text-emerald-400 font-bold">₹78,000 Central</span> +{" "}
          <span className="text-amber-400 font-bold">₹60,000 Odisha State Subsidy</span>{" "}
          (<span className="text-emerald-300 font-extrabold">Total ₹1,38,000 Govt Subsidy</span>).{" "}
          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="underline underline-offset-2 text-white hover:text-amber-300 transition-colors ml-1 cursor-pointer"
          >
            Calculate Savings →
          </button>
        </div>

        {/* Main Navbar */}
        <div
          className={`w-full transition-all duration-200 ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80"
              : "bg-white border-b border-slate-100"
          }`}
        >
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 gap-4">
              
              {/* Brand Logo (Acts as Home / Landing Link) */}
              <Link href="/" onClick={() => setOpenDropdown(null)} className="flex items-center shrink-0 group">
                <img
                  src="/logo.png"
                  alt="Pragati EcoSolar"
                  className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </Link>

              {/* Desktop Nav Links */}
              <nav className="hidden xl:flex items-center gap-1.5 flex-1 justify-center">
                {mainNavItems.map((item) => {
                  const isServices = item.dropdownType === "services";
                  const isPartnerships = item.dropdownType === "partnerships";
                  const isMore = item.dropdownType === "more";

                  const dropdownItems = isServices
                    ? servicesDropdownItems
                    : isPartnerships
                    ? partnershipsDropdownItems
                    : moreDropdownItems;

                  const isOpen = openDropdown === item.dropdownType;

                  const isActive =
                    (item.href !== "#" && pathname === item.href) ||
                    (isServices && pathname.startsWith("/services")) ||
                    (isPartnerships && (pathname.startsWith("/dealership") || pathname.startsWith("/franchise"))) ||
                    (isMore &&
                      (pathname.startsWith("/how-it-works") ||
                        pathname.startsWith("/about") ||
                        pathname.startsWith("/projects") ||
                        pathname.startsWith("/government-schemes") ||
                        pathname.startsWith("/products") ||
                        pathname.startsWith("/contact")));

                  if (item.isDropdown) {
                    return (
                      <div
                        key={item.label}
                        className="relative py-4"
                        onMouseEnter={() => setOpenDropdown(item.dropdownType || null)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <button
                          type="button"
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                            isActive
                              ? "text-emerald-700 bg-emerald-50/80"
                              : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                              isOpen ? "rotate-180 text-emerald-600" : ""
                            }`}
                          />
                        </button>

                        {/* Mega / Standard Dropdown Container */}
                        <div
                          className={`absolute top-full ${
                            isServices
                              ? "left-1/2 -translate-x-1/2 w-[500px]"
                              : isPartnerships
                              ? "left-1/2 -translate-x-1/2 w-[360px]"
                              : "right-0 w-[420px]"
                          } bg-white border border-slate-200/90 rounded-2xl shadow-2xl p-3 transition-all duration-200 z-50 ${
                            isOpen
                              ? "opacity-100 visible translate-y-0 pointer-events-auto"
                              : "opacity-0 invisible translate-y-2 pointer-events-none"
                          }`}
                        >
                          <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700">
                              {isServices
                                ? "SOLAR EPC SERVICES"
                                : isPartnerships
                                ? "DEALERSHIP & FRANCHISE"
                                : "MORE RESOURCES & EXPLORE"}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                              {isServices ? "VENDOR-AGNOSTIC EPC" : isPartnerships ? "GROW WITH US" : "PRAGATI ECOSOLAR"}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 gap-1 max-h-[70vh] overflow-y-auto">
                            {dropdownItems.map((s) => {
                              const Icon = s.icon;
                              return (
                                <Link
                                  key={s.name}
                                  href={s.href}
                                  onClick={(e) => handleNavClick(e, s.href)}
                                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group/item"
                                >
                                  <div className={`p-2 rounded-lg border shrink-0 ${s.iconBg}`}>
                                    <Icon className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <div className="text-xs font-bold text-slate-900 group-hover/item:text-emerald-600 transition-colors">
                                      {s.name}
                                    </div>
                                    <div className="text-[11px] text-slate-500 leading-tight">
                                      {s.desc}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        isActive
                          ? "text-emerald-700 bg-emerald-50/80"
                          : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Desktop CTAs */}
              <div className="hidden xl:flex items-center gap-2 shrink-0">
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace(/\+/g, "")}?text=Hi%2C%20I%20am%20interested%20in%20Pragati%20EcoSolar%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setOpenDropdown(null);
                    setIsSiteVisitOpen(true);
                  }}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Free Visit</span>
                </button>

                <button
                  onClick={() => {
                    setOpenDropdown(null);
                    setIsCalculatorOpen(true);
                  }}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>Get Quote</span>
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl">
            <div className="space-y-1">
              {mainNavItems.map((item) => {
                if (item.isDropdown) {
                  const isServices = item.dropdownType === "services";
                  const isPartnerships = item.dropdownType === "partnerships";

                  const dropdownItems = isServices
                    ? servicesDropdownItems
                    : isPartnerships
                    ? partnershipsDropdownItems
                    : moreDropdownItems;

                  const isMobileSubOpen = isServices
                    ? mobileServicesOpen
                    : isPartnerships
                    ? mobilePartnershipsOpen
                    : mobileMoreOpen;

                  const toggleSub = () => {
                    if (isServices) setMobileServicesOpen(!mobileServicesOpen);
                    else if (isPartnerships) setMobilePartnershipsOpen(!mobilePartnershipsOpen);
                    else setMobileMoreOpen(!mobileMoreOpen);
                  };

                  return (
                    <div key={item.label} className="space-y-1">
                      <button
                        onClick={toggleSub}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-bold text-slate-800 rounded-xl hover:bg-slate-50"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-slate-500 transition-transform ${
                            isMobileSubOpen ? "rotate-180 text-emerald-600" : ""
                          }`}
                        />
                      </button>

                      {isMobileSubOpen && (
                        <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-emerald-500 ml-3">
                          {dropdownItems.map((s) => (
                            <Link
                              key={s.name}
                              href={s.href}
                              onClick={(e) => handleNavClick(e, s.href)}
                              className="block py-2 text-xs font-medium text-slate-700 hover:text-emerald-600"
                            >
                              {s.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block px-3 py-2.5 text-sm font-bold rounded-xl ${
                      pathname === item.href
                        ? "text-emerald-700 bg-emerald-50"
                        : "text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsapp.replace(/\+/g, "")}?text=Hi%2C%20I%20am%20interested%20in%20Pragati%20EcoSolar%20services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSiteVisitOpen(true);
                }}
                className="w-full py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Free Visit</span>
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCalculatorOpen(true);
                }}
                className="w-full py-3 bg-slate-900 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Get Quote</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Calculator & Site Visit Modals */}
      <SolarCalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
      <SiteVisitModal isOpen={isSiteVisitOpen} onClose={() => setIsSiteVisitOpen(false)} />
    </>
  );
}
