import React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Tag, Calculator } from "lucide-react";

interface BlogArticleProps {
  params: Promise<{ category: string; slug: string }>;
}

const ARTICLES_DATA: Record<string, {
  title: string;
  category: string;
  date: string;
  author: string;
  content: string;
}> = {
  "pm-surya-ghar-odisha-guide": {
    title: "PM Surya Ghar Subsidy Guide for Odisha Homeowners 2026",
    category: "Government Policy",
    date: "August 3, 2026",
    author: "Pragati EcoSolar Technical Desk",
    content: `Under the PM Surya Ghar: Muft Bijli Yojana, Odisha residential homeowners can receive up to ₹78,000 in direct central government financial assistance.

Key Subsidy Breakdown:
• 1 kW System: ₹30,000 direct bank transfer
• 2 kW System: ₹60,000 direct bank transfer
• 3 kW to 10 kW Systems: ₹78,000 flat ceiling cap

Application & Processing Workflow:
1. Registration on National PM Surya Ghar Portal.
2. Technical feasibility approval from local DISCOM (TPCODL, TPNODL, TPSODL, TPWODL).
3. System installation by Pragati EcoSolar using Tier-1 ALMM listed modules.
4. Bi-directional net meter testing & commissioning certificate generation.
5. Subsidy disbursement into customer bank account within 30 days of commissioning.`,
  },
  "discom-net-metering-process": {
    title: "Understanding Odisha DISCOM Net-Metering Feasibility & Timelines",
    category: "DISCOM Net-Metering",
    date: "July 28, 2026",
    author: "Chief Solar Engineer, Patia HQ",
    content: `Net metering enables rooftop solar owners to export surplus electricity to the grid and claim energy credits on their monthly electricity bill.

Steps for DISCOM Net Metering Sync:
• Feasibility submission on unified DISCOM portal within 24 hours of order confirmation.
• Transformer capacity check by local DISCOM electrical inspector.
• Installation of bi-directional net meter with 0.5s class accuracy.
• Monthly billing adjustment: units exported are subtracted from units consumed.`,
  },
};

export async function generateMetadata({ params }: BlogArticleProps) {
  const { slug } = await params;
  const article = ARTICLES_DATA[slug];
  if (!article) return { title: "Solar Article | Pragati EcoSolar Knowledge Hub" };
  return {
    title: `${article.title} | Pragati EcoSolar Blog`,
    description: article.content.slice(0, 160),
  };
}

export default async function BlogArticlePage({ params }: BlogArticleProps) {
  const { category, slug } = await params;
  const article = ARTICLES_DATA[slug] || ARTICLES_DATA["pm-surya-ghar-odisha-guide"];

  return (
    <div className="bg-[#FAFAFA] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-xs font-mono text-slate-600 hover:text-slate-900 font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Solar Articles</span>
        </Link>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200 uppercase">
              {article.category}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight pt-2">
              {article.title}
            </h1>
            <div className="flex items-center space-x-4 text-xs font-mono text-slate-500 pt-1">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.author}</span>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line font-sans space-y-4">
            {article.content}
          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
            <Link
              href="/calculator"
              className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 font-mono"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Solar System Capacity & Subsidy</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
