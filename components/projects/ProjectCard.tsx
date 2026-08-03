"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, ArrowRight, CheckCircle2, Zap } from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  categoryTag: string;
  location: string;
  statusBadge: string;
  capacity: string;
  units: string;
  annualSavings: string;
  image: string;
  alt: string;
  slug: string;
}

interface ProjectCardProps {
  project: ProjectItem;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [imgError, setImgError] = useState(false);
  const fallbackImage = "https://images.unsplash.com/photo-1611365892117-00ac5ef43c90?q=80&w=800&auto=format&fit=crop";

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group font-sans">
      <div>
        {/* 16:9 Image Frame */}
        <div className="aspect-video w-full overflow-hidden relative bg-slate-100">
          <img
            src={imgError ? fallbackImage : project.image}
            alt={project.alt || project.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-black/10"></div>

          {/* Clean Location Badge (Top Left) */}
          <div className="absolute top-3 left-3">
            <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{project.location}</span>
            </span>
          </div>

          {/* Status Badge (Top Right) */}
          <div className="absolute top-3 right-3">
            <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
              {project.statusBadge}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 space-y-3">
          {/* Category Sub-label */}
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
            {project.categoryTag}
          </span>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-600 transition-colors">
            {project.title}
          </h3>

          {/* Metrics Grid (2-Column Light Gray Box) */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 grid grid-cols-2 gap-2 text-xs font-mono">
            <div>
              <span className="text-slate-500 text-[10px] block">SYSTEM SIZE:</span>
              <strong className="text-slate-900 font-bold text-xs">{project.capacity}</strong>
            </div>
            <div>
              <span className="text-slate-500 text-[10px] block">EST. GENERATION:</span>
              <strong className="text-emerald-700 font-bold text-xs">{project.units}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-5 pt-0">
        <Link
          href={`/projects/${project.slug}`}
          className="w-full border border-slate-200 hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 group/btn"
        >
          <span>View Engineering Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
