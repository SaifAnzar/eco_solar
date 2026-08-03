"use client";

import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight, Award } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12 md:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Minimalist Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>EXECUTED SOLAR EPC PROJECTS | ODISHA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Proven Engineering Across Odisha
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Real residential, commercial, and agricultural solar installations completed across Bhubaneswar, Cuttack, Puri, Sambalpur, and Rourkela.
          </p>
        </div>

        {/* Explicit 3-Column Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* CARD 1: Residential Rooftop System */}
          <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="aspect-video w-full overflow-hidden relative bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?q=80&w=800&auto=format&fit=crop"
                  alt="Rooftop solar panel installation on residential concrete home in Patia Bhubaneswar Odisha"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-black/10"></div>
                <div className="absolute top-3 left-3">
                  <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Patia, Bhubaneswar</span>
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                    TPCODL Net-Metered
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                  RESIDENTIAL SOLAR EPC
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-600 transition-colors">
                  10 kW Residential Rooftop System
                </h3>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px] block">SYSTEM SIZE:</span>
                    <strong className="text-slate-900 font-bold text-xs">10 kW TOPCon</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">EST. GENERATION:</span>
                    <strong className="text-emerald-700 font-bold text-xs">~1,200 Units/Mo</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0">
              <Link
                href="/projects/patia-residential-10kw"
                className="w-full border border-slate-200 hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>View Engineering Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* CARD 2: Commercial Warehouse EPC */}
          <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="aspect-video w-full overflow-hidden relative bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1548337138-e87d889cc369?q=80&w=800&auto=format&fit=crop"
                  alt="Commercial industrial rooftop solar power plant setup in Cuttack Odisha"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-black/10"></div>
                <div className="absolute top-3 left-3">
                  <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Phulnakhara, Cuttack</span>
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                    80% AD Tax Benefits
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                  COMMERCIAL & INDUSTRIAL
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-600 transition-colors">
                  50 kW Commercial Warehouse EPC
                </h3>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px] block">SYSTEM SIZE:</span>
                    <strong className="text-slate-900 font-bold text-xs">50 kW MonoPERC</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">EST. GENERATION:</span>
                    <strong className="text-emerald-700 font-bold text-xs">~6,000 Units/Mo</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0">
              <Link
                href="/projects/cuttack-commercial-50kw"
                className="w-full border border-slate-200 hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>View Engineering Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* CARD 3: PM-KUSUM Solar Water Pump */}
          <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="aspect-video w-full overflow-hidden relative bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=800&auto=format&fit=crop"
                  alt="Agricultural PM-KUSUM solar water pump installation on farmland in Pipili Puri"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-black/10"></div>
                <div className="absolute top-3 left-3">
                  <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Pipili, Puri</span>
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
                    PM-KUSUM Approved
                  </span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                  AGRICULTURAL IRRIGATION
                </span>
                <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-600 transition-colors">
                  7.5 HP PM-KUSUM Solar Water Pump
                </h3>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 text-[10px] block">SYSTEM SIZE:</span>
                    <strong className="text-slate-900 font-bold text-xs">7.5 HP Controller</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px] block">EST. GENERATION:</span>
                    <strong className="text-emerald-700 font-bold text-xs">100% Daylight Pumping</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 pt-0">
              <Link
                href="/projects/puri-agricultural-7hp"
                className="w-full border border-slate-200 hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
              >
                <span>View Engineering Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* Impact Banner */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-mono uppercase text-emerald-700 font-bold tracking-wider">
              PROVEN PERFORMANCE TRACK RECORD
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              400+ Turnkey Rooftop Installations Handed Over
            </h3>
            <p className="text-xs text-slate-600 max-w-xl">
              100% DISCOM net-metering approval record across TPCODL, TPNODL, TPSODL, and TPWODL utilities with Tier-1 ALMM hardware.
            </p>
          </div>

          <a
            href="tel:+919124318222"
            className="px-6 py-3 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-colors font-mono shrink-0"
          >
            Speak to Project Head (+91 9124318222)
          </a>
        </div>

      </div>
    </div>
  );
}
