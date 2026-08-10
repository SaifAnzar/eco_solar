"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 font-sans border-t border-slate-800">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Overview */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center shrink-0 group">
              <img
                src="/logo-white.png"
                alt="Pragati EcoSolar"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              {SITE_CONFIG.subline}
            </p>

            <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-xs">
              <div className="text-[10px] font-mono uppercase font-bold text-amber-400">
                EMPANELLED ODISHA DISCOM ZONES:
              </div>
              <div className="grid grid-cols-2 gap-1 font-mono text-[11px] text-slate-300">
                <span>• TPCODL (Central)</span>
                <span>• TPNODL (North)</span>
                <span>• TPSODL (South)</span>
                <span>• TPWODL (West)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link href="/how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</Link></li>
              <li><Link href="/residential" className="hover:text-emerald-400 transition-colors">Residential Solar</Link></li>
              <li><Link href="/commercial" className="hover:text-emerald-400 transition-colors">Commercial & Industrial</Link></li>
              <li><Link href="/projects" className="hover:text-emerald-400 transition-colors">Projects Portfolio</Link></li>
              <li><Link href="/government-schemes" className="hover:text-emerald-400 transition-colors">Government Schemes</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Our EPC Solutions
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Solar EPC — On-Grid Systems</li>
              <li>• Solar EPC — Off-Grid Systems</li>
              <li>• Solar EPC — Hybrid Systems</li>
              <li>• Solar Water Pumping Systems</li>
              <li>• Solar Street Lighting Solutions</li>
              <li>• Net Metering & Subsidy Assistance</li>
              <li>• Operation & Maintenance (O&M)</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
              Registered Office
            </h4>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.contact.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href={`tel:${SITE_CONFIG.contact.phoneRaw}`} className="hover:text-emerald-400 font-mono">
                  {SITE_CONFIG.contact.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-emerald-400 font-mono">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{SITE_CONFIG.contact.workingHours}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Pragati EcoSolar. All rights reserved. Government Authorized PM Surya Ghar EPC Installer.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>TPCODL</span>
            <span>•</span>
            <span>TPNODL</span>
            <span>•</span>
            <span>TPSODL</span>
            <span>•</span>
            <span>TPWODL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
