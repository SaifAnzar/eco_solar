import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";

export const metadata = {
  title: "Solar Insights & Odisha Net Metering Blog | Pragati EcoSolar",
  description: "Read technical guides on PM Surya Ghar subsidies, TPCODL net-metering rules, 80% Accelerated Depreciation, and solar rooftop sizing in Odisha.",
};

export default function BlogPage() {
  const posts = [
    {
      title: "PM Surya Ghar Subsidy Guide for Odisha Homeowners 2026",
      excerpt: "Step-by-step breakdown of direct bank transfer subsidies (₹30,000 for 1kW, ₹60,000 for 2kW, ₹78,000 for 3–10kW) in Bhubaneswar & Cuttack.",
      date: "Aug 2026",
      category: "Government Policy",
    },
    {
      title: "Understanding Odisha DISCOM Net-Metering Feasibility & Timelines",
      excerpt: "How TPCODL, TPNODL, TPSODL, and TPWODL inspect transformer loads and test bi-directional net meters within 15–30 days.",
      date: "Jul 2026",
      category: "DISCOM Net-Metering",
    },
    {
      title: "How Commercial Solar Achieves 80% Accelerated Depreciation in Odisha",
      excerpt: "Save corporate income tax while reducing factory electricity bills by 70% with 600W TOPCon bifacial modules.",
      date: "Jun 2026",
      category: "Commercial EPC",
    },
  ];

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold px-3.5 py-1 bg-amber-50 border border-amber-200 rounded-full inline-block">
            SOLAR KNOWLEDGE BASE & ARTICLES
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Odisha Rooftop Solar Engineering Blog
          </h1>
          <p className="text-slate-600 text-sm">
            Expert insights on net metering, PM Surya Ghar subsidies, hardware selection, and ROI analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 uppercase">
                  {post.category}
                </span>
                <h2 className="text-xl font-bold text-slate-900">{post.title}</h2>
                <p className="text-xs text-slate-600 leading-relaxed">{post.excerpt}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>{post.date}</span>
                <span className="text-emerald-700 font-bold flex items-center space-x-1 cursor-pointer">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
