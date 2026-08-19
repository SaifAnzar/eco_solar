"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Shield, SunMedium, Bell, User, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminNavbarProps {
  adminEmail?: string;
}

export function AdminNavbar({ adminEmail = "admin@pragatiecosolar.in" }: AdminNavbarProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = resolvedTheme || theme;

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 sticky top-0 z-50 transition-colors duration-200">
      <div className="overflow-x-auto min-w-full flex items-center justify-between gap-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
        
        {/* Brand & Page Info */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-sm">
            <SunMedium className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm tracking-tight whitespace-nowrap">
                Pragati EcoSolar
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 uppercase tracking-wider whitespace-nowrap">
                Admin Console
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
              Executive Solar Control Panel
            </p>
          </div>
        </div>

        {/* Center Navigation Shortcuts (Scrollable on Zoom) */}
        <nav className="flex items-center gap-1 shrink-0">
          <Link
            href="/admin"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              pathname === "/admin" || pathname === "/admin/dashboard"
                ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/contact-leads"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              pathname === "/admin/contact-leads"
                ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Inquiries
          </Link>
          <Link
            href="/admin/partnerships"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              pathname === "/admin/partnerships"
                ? "bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Partnerships
          </Link>
        </nav>

        {/* Right Actions: Theme Toggle & Admin User Profile */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Light / Dark Mode Toggle Button */}
          {mounted && (
            <button
              onClick={toggleTheme}
              type="button"
              aria-label="Toggle Light and Dark Theme"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer hover:scale-105 active:scale-95"
              title={`Switch to ${currentTheme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {currentTheme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300" />
              )}
            </button>
          )}

          {/* Admin User Profile Tag */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold text-xs shadow-sm">
              {adminEmail.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate max-w-[140px]">
                {adminEmail}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Super Administrator
              </p>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
