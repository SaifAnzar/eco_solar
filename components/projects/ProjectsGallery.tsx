"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Play,
  Camera,
  Video as VideoIcon,
  Layers,
  Calendar,
  Zap,
  ArrowRight,
  ShieldCheck,
  Building2,
  Home,
  Sun,
  Eye,
  Sparkles,
} from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Video from "yet-another-react-lightbox/plugins/video";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

import { SITE_CONFIG } from "@/config/site";
import { LocalProjectItem } from "@/lib/get-local-projects";

interface ProjectsGalleryProps {
  initialProjects: LocalProjectItem[];
}

export default function ProjectsGallery({ initialProjects }: ProjectsGalleryProps) {
  const [mediaTab, setMediaTab] = useState<"all" | "photo" | "video">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

  // Counts for media tab badges
  const totalCount = initialProjects.length;
  const photoCount = useMemo(() => initialProjects.filter((p) => p.type === "photo").length, [initialProjects]);
  const videoCount = useMemo(() => initialProjects.filter((p) => p.type === "video").length, [initialProjects]);

  // Filtered dataset
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((item) => {
      const matchMedia = mediaTab === "all" || item.type === mediaTab;
      const matchCat = categoryFilter === "All" || item.category === categoryFilter;
      return matchMedia && matchCat;
    });
  }, [initialProjects, mediaTab, categoryFilter]);

  // Construct Lightbox slide items dynamically
  const lightboxSlides = useMemo(() => {
    return filteredProjects.map((p) => {
      if (p.type === "video" && p.videoUrl) {
        return {
          type: "video" as const,
          title: p.title,
          description: `${p.capacity} • ${p.location} | ${p.description}`,
          width: 1280,
          height: 720,
          poster: p.thumbnail,
          sources: [
            {
              src: p.videoUrl,
              type: "video/mp4",
            },
          ],
        };
      }

      return {
        src: p.thumbnail,
        title: p.title,
        description: `${p.capacity} • ${p.location} | ${p.description}`,
      };
    });
  }, [filteredProjects]);

  return (
    <div className="w-full font-sans bg-[#FAFAFA] text-slate-900 min-h-screen">
      {/* 1. HEADER & HERO */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-radial-gradient-light opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10">
          
          {/* Gradient Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>OUR WORK IN ACTION</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Real Solar Installations Across Odisha
          </h1>

          {/* Subline */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore our completed residential, commercial, and institutional projects directly from our site archives.
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-300 border-t border-slate-800/80 max-w-3xl mx-auto">
            <div className="flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-400" />
              <span><strong>{SITE_CONFIG.stats.systemsInstalled}</strong> Systems Installed</span>
            </div>
            <div className="hidden sm:block text-slate-700">•</div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span><strong>{SITE_CONFIG.stats.capacityDelivered}</strong> Total Capacity</span>
            </div>
            <div className="hidden sm:block text-slate-700">•</div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span><strong>4 DISCOM Zones</strong> Empanelled</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* 2. FILTER TABS ("All", "Photos", "Videos") & CATEGORY SELECTOR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200">
          
          {/* Media Type Tabs: All, Photos, Videos */}
          <div className="flex items-center bg-slate-200/70 p-1.5 rounded-2xl shadow-inner border border-slate-300/50 w-full sm:w-auto justify-center">
            <button
              onClick={() => setMediaTab("all")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                mediaTab === "all"
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/50"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All</span>
              <span className={`px-2 py-0.5 text-[10px] rounded-full font-mono font-bold ${
                mediaTab === "all" ? "bg-amber-400 text-slate-950" : "bg-slate-300 text-slate-700"
              }`}>
                {totalCount}
              </span>
            </button>

            <button
              onClick={() => setMediaTab("photo")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                mediaTab === "photo"
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/50"
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Photos</span>
              <span className={`px-2 py-0.5 text-[10px] rounded-full font-mono font-bold ${
                mediaTab === "photo" ? "bg-amber-400 text-slate-950" : "bg-slate-300 text-slate-700"
              }`}>
                {photoCount}
              </span>
            </button>

            <button
              onClick={() => setMediaTab("video")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                mediaTab === "video"
                  ? "bg-slate-900 text-white shadow-md"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/50"
              }`}
            >
              <VideoIcon className="w-3.5 h-3.5" />
              <span>Videos</span>
              <span className={`px-2 py-0.5 text-[10px] rounded-full font-mono font-bold ${
                mediaTab === "video" ? "bg-amber-400 text-slate-950" : "bg-slate-300 text-slate-700"
              }`}>
                {videoCount}
              </span>
            </button>
          </div>

          {/* Category Filter Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {["All", "Residential", "Commercial", "Industrial", "Institutional"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  categoryFilter === cat
                    ? "bg-emerald-600 text-white shadow-sm font-bold"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3. PRODUCTIVE & STYLISH MEDIA CARDS GRID */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl p-8 space-y-3">
            <p className="text-sm font-bold text-slate-700">No project media found matching the selected filters.</p>
            <button
              onClick={() => {
                setMediaTab("all");
                setCategoryFilter("All");
              }}
              className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((item, idx) => {
              const isVideo = item.type === "video";

              return (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(idx)}
                  className="group cursor-pointer bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col"
                >
                  {/* Fixed Aspect Ratio Media Container */}
                  <div
                    className={`w-full overflow-hidden bg-slate-950 relative ${
                      isVideo ? "aspect-video" : "aspect-[4/3]"
                    }`}
                  >
                    {/* Lazy-loaded Next.js Image Thumbnail */}
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Dark Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                      <span className="px-2.5 py-1 bg-slate-900/90 backdrop-blur-md text-amber-400 text-[10px] font-mono font-bold rounded-lg border border-slate-700/80 shadow-md">
                        {item.capacity}
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-mono font-bold rounded shadow-md">
                        {item.discom}
                      </span>
                    </div>

                    {/* Centered Glassmorphism Play Button Overlay for Videos */}
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="relative flex items-center justify-center">
                          <span className="absolute w-14 h-14 rounded-full bg-emerald-500/40 animate-ping pointer-events-none" />
                          <div className="relative w-14 h-14 rounded-full bg-slate-900/70 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:bg-emerald-600 transition-all duration-300">
                            <Play className="w-6 h-6 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Photo View Overlay Icon for Photos */}
                    {!isVideo && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                        <div className="p-3 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/30 text-white shadow-xl">
                          <Eye className="w-5 h-5" />
                        </div>
                      </div>
                    )}

                    {/* Bottom Floating Location & Title Overlay on Media */}
                    <div className="absolute bottom-3 left-3 right-3 text-white z-10 space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{item.location}</span>
                      </div>
                      <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-emerald-300 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Bottom Meta Description */}
                  <div className="p-4 bg-white flex-1 flex flex-col justify-between space-y-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded font-bold text-slate-700 uppercase">
                        {item.category}
                      </span>
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        {isVideo ? "Watch Video" : "View Photo"} →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 4. LIGHTBOX POPUP INTEGRATION */}
        <Lightbox
          open={lightboxIndex >= 0}
          close={() => setLightboxIndex(-1)}
          index={lightboxIndex}
          slides={lightboxSlides}
          plugins={[Captions, Video]}
          video={{
            controls: true,
            autoPlay: true,
            playsInline: true,
          }}
        />

        {/* 5. FOOTER CALL TO ACTION */}
        <div className="mt-16 p-8 sm:p-12 bg-slate-900 text-white rounded-3xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-slate-800">
          <div className="space-y-3 text-center lg:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              START YOUR SOLAR TRANSFORMATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Want a High-Yield Solar Plant like These?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Get an engineer site survey, load calculation, and custom subsidy proposal anywhere in Odisha.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0 justify-center">
            <Link
              href="/contact?type=site-visit"
              className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Free Site Visit</span>
            </Link>
            <Link
              href="/contact?type=quote"
              className="py-3.5 px-6 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-2"
            >
              <span>Get Custom Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}
