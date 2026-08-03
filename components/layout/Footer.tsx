"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, CreditCard, Zap, Copy, Check } from "lucide-react";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText("86522167402");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="bg-[#0B132B] text-slate-300 border-t border-slate-800 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* 4-Column Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-4">
          
          {/* Column 1: Brand Authority */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="bg-white/95 p-2 rounded-xl border border-slate-700/80 shadow-md">
                <img
                  src="/logo.png"
                  alt="Pragati EcoSolar Official Logo"
                  className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                />
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed">
              Bhubaneswar’s leading premier Solar EPC contractor under the leadership of Managing Director Kalpna Sahoo. Turnkey rooftop solar, 100% net-metering liaison, and tier-1 hardware across Odisha.
            </p>

            <div>
              <div className="bg-slate-800/80 border border-slate-700/60 rounded-lg px-3 py-1.5 text-xs text-amber-400 font-medium inline-block">
                GSTIN: <strong className="text-white font-bold">21ABIFP1344D1ZS</strong>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Engineering Services
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Products & Hardware
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Projects Portfolio
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-white transition-colors">
                  Solar ROI Calculator
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Solar Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Odisha DISCOM Grid */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-bold font-mono">
              DISCOM Net-Metering
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full paper liaisoning & meter synchronization across all four utility regions:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <div className="p-2.5 bg-slate-800/60 border border-slate-700/60 rounded-lg flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-semibold text-[11px] font-mono">TPCODL (Central)</span>
              </div>
              <div className="p-2.5 bg-slate-800/60 border border-slate-700/60 rounded-lg flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-semibold text-[11px] font-mono">TPNODL (North)</span>
              </div>
              <div className="p-2.5 bg-slate-800/60 border border-slate-700/60 rounded-lg flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-semibold text-[11px] font-mono">TPSODL (South)</span>
              </div>
              <div className="p-2.5 bg-slate-800/60 border border-slate-700/60 rounded-lg flex items-center space-x-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="font-semibold text-[11px] font-mono">TPWODL (West)</span>
              </div>
            </div>
          </div>

          {/* Column 4: HQ & Official Bank Wire */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-white font-bold font-mono">
              Headquarters & Banking Info
            </h4>
            
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>HIG 42, Aryapalli, Patia, Bhubaneswar, Odisha – 751024</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+919124318222" className="hover:text-amber-400 font-medium font-mono">
                  +91 9124318222 / 9124679222
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <a href="mailto:solarbee.bbsr@gmail.com" className="hover:text-white font-mono">
                  solarbee.bbsr@gmail.com
                </a>
              </div>
            </div>

            {/* Official Bank Wire Container */}
            <div className="bg-slate-800/50 border border-slate-700/80 rounded-xl p-4 mt-3 space-y-1.5">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-1.5 text-xs">
                <span className="text-amber-400 font-bold uppercase tracking-wider text-[10px] flex items-center space-x-1 font-mono">
                  <CreditCard className="w-3.5 h-3.5 text-amber-400 inline" />
                  <span>OFFICIAL BANK WIRE (IDFC FIRST BANK)</span>
                </span>
              </div>

              <div className="flex justify-between text-xs text-slate-300 pt-1">
                <span className="text-slate-400">A/C Name:</span>
                <strong className="text-white font-semibold">PRAGATI ECOSOLAR</strong>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-300">
                <span className="text-slate-400">A/C No:</span>
                <div className="flex items-center space-x-1.5">
                  <strong className="text-emerald-400 font-bold font-mono">86522167402</strong>
                  <button
                    onClick={handleCopyAccount}
                    className="p-1 text-slate-400 hover:text-white transition-colors"
                    title="Copy Account Number"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between text-xs text-slate-300">
                <span className="text-slate-400">IFSC Code:</span>
                <strong className="text-white font-semibold font-mono">IDFB0060241</strong>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 space-y-3 md:space-y-0">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} Pragati EcoSolar. All rights reserved.</span>
            <span>•</span>
            <span className="text-slate-300 font-semibold">MD: Kalpna Sahoo</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/about" className="hover:text-slate-200 transition-colors">
              About Pragati
            </Link>
            <Link href="/contact" className="hover:text-slate-200 transition-colors">
              HQ Location Map
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
