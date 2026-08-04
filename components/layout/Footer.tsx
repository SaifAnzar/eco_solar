import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 md:py-16 border-t border-slate-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        
        {/* Column 1: Brand Info */}
        <div>
          <img
            src="/logo-white.png"
            alt="Pragati EcoSolar"
            className="h-9 w-auto object-contain mb-4"
          />
          <p className="text-xs leading-relaxed text-slate-400">
            Pragati EcoSolar is Bhubaneswar's trusted solar installation company. We help homes and businesses switch to solar energy with zero hassle.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
            Quick Links
          </h4>
          <nav className="flex flex-col">
            <Link href="/services" className="text-xs hover:text-white transition-colors block mb-2.5">
              Solar Packages
            </Link>
            <Link href="/products" className="text-xs hover:text-white transition-colors block mb-2.5">
              Our Products
            </Link>
            <Link href="/projects" className="text-xs hover:text-white transition-colors block mb-2.5">
              Completed Projects
            </Link>
            <Link href="/calculator" className="text-xs hover:text-white transition-colors block mb-2.5">
              Savings Calculator
            </Link>
            <Link href="/contact" className="text-xs hover:text-white transition-colors block mb-2.5">
              Contact Us
            </Link>
          </nav>
        </div>

        {/* Column 3: Utility Network */}
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
            Utility Network
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-400 font-mono">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
              TPCODL — Central Odisha
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
              TPNODL — North Odisha
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
              TPSODL — South Odisha
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
              TPWODL — West Odisha
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div>
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
            Contact Us
          </h4>
          <ul className="space-y-3 text-xs text-slate-400">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                HIG 42, Aryapalli, Patia, Bhubaneswar, Odisha – 751024
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <a href="tel:+919124318222" className="hover:text-white transition-colors font-mono">
                +91 9124318222 / +91 9124679222
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <a href="mailto:solarbee.bbsr@gmail.com" className="hover:text-white transition-colors font-mono">
                solarbee.bbsr@gmail.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-slate-800/80 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <span>© {new Date().getFullYear()} Pragati EcoSolar. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link href="/about" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link href="/about" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
