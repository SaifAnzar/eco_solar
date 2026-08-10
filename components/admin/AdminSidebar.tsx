"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Mail,
  Calculator,
  Handshake,
  FileText,
  Package,
  FolderKanban,
  Award,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

interface AdminSidebarProps {
  adminEmail?: string;
}

export function AdminSidebar({ adminEmail }: AdminSidebarProps) {
  const pathname = usePathname();

  const primaryNavItems = [
    {
      label: "Dashboard Overview",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      label: "Calculator Quotations",
      href: "/admin/leads",
      icon: Users,
      badge: "DISCOM Filters",
    },
    {
      label: "Contact Inquiries",
      href: "/admin/contact-leads",
      icon: Mail,
      badge: "Site Visits",
    },
    {
      label: "Calculator Config",
      href: "/admin/calculator",
      icon: Calculator,
      badge: "Benchmark Rates",
    },
    {
      label: "Franchise & Dealer",
      href: "/admin/partnerships",
      icon: Handshake,
      badge: "Applications",
    },
  ];

  const cmsNavItems = [
    {
      label: "Hero & Site Copy",
      href: "/admin/site-content",
      icon: FileText,
      badge: "CMS 1",
    },
    {
      label: "Solar Packages",
      href: "/admin/packages",
      icon: Package,
      badge: "CMS 3",
    },
    {
      label: "Projects Portfolio",
      href: "/admin/projects",
      icon: FolderKanban,
      badge: "CMS 4",
    },
    {
      label: "Services & Schemes",
      href: "/admin/services-schemes",
      icon: Award,
      badge: "CMS 5",
    },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col shrink-0 border-r border-slate-800 font-sans sticky top-0 h-screen overflow-y-auto z-40">
      {/* Brand Header with Official White Logo */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2 group">
          <img
            src="/logo-white.png"
            alt="Pragati EcoSolar"
            className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Nav Section */}
      <nav className="p-4 space-y-6 flex-1">
        {/* Original Setup Group */}
        <div className="space-y-1.5">
          <div className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
            QUOTATIONS &amp; LEADS
          </div>
          {primaryNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                      isActive ? "bg-emerald-800 text-emerald-100" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* New Feature Settings Group */}
        <div className="space-y-1.5 pt-2 border-t border-slate-800">
          <div className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
            WEBSITE CMS SETTINGS
          </div>
          {cmsNavItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                      isActive ? "bg-emerald-800 text-emerald-100" : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Public Site Quick Link */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        {adminEmail && (
          <div className="px-3 py-1.5 text-[10px] font-mono text-slate-400 truncate border-b border-slate-800 pb-2">
            Logged in: <strong className="text-emerald-400">{adminEmail}</strong>
          </div>
        )}

        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[11px] space-y-1">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ROI Calculator Preserved</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Calculator logic &amp; postal lookup strictly isolated.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all border border-slate-700"
        >
          <span>View Public Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
        </Link>
      </div>
    </aside>
  );
}

export default AdminSidebar;
