"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Compass,
  ShieldCheck,
  HardHat,
  Zap,
  Wrench,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Check,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const steps = [
    {
      num: "01",
      shortLabel: "Site Survey",
      title: "Free Site Visit & Roof Survey",
      subtitle: "Zero-Cost Technical & Shading Assessment",
      desc: "Our solar engineer visits your location in Odisha to inspect your roof structure, measure shadow-free space, and check your monthly electric bills.",
      bullets: [
        "100% free site visit anywhere in Odisha",
        "Roof space measurement & shadow analysis",
        "Electricity bill audit to calculate solar plant size",
      ],
      icon: Calendar,
    },
    {
      num: "02",
      shortLabel: "System Design",
      title: "Custom Solar System Engineering",
      subtitle: "Storm-Resistant & Tailored Design",
      desc: "We design a custom solar layout engineered for your roof load, choosing optimal Tier-1 ALMM panels and cyclone-proof mounting structures.",
      bullets: [
        "3D rooftop solar layout & panel alignment",
        "Cyclone-resistant steel structure design (200 km/h wind rated)",
        "Itemized quotation with exact ROI & payback timeline",
      ],
      icon: Compass,
    },
    {
      num: "03",
      shortLabel: "Govt Approvals",
      title: "Govt Paperwork & Subsidy Sanction",
      subtitle: "Zero-Hassle Utility & Portal Approvals",
      desc: "Our team handles 100% of the paperwork on the PM Surya Ghar national portal and submits net-metering applications to your local DISCOM office.",
      bullets: [
        "National PM Surya Ghar portal registration within 24 hours",
        "DISCOM transformer load & feasibility approval",
        "Zero customer paperwork hassle — we manage everything",
      ],
      icon: ShieldCheck,
    },
    {
      num: "04",
      shortLabel: "Installation",
      title: "Fast Rooftop Installation",
      subtitle: "Certified Engineers & Safety Build",
      desc: "Trained in-house electrical and civil engineers execute the rooftop mounting, wiring, earthing pits, and lightning protection system.",
      bullets: [
        "Heavy hot-dip galvanized (HDG) steel frame fitting",
        "Tier-1 high-efficiency solar panel mounting",
        "Complete AC/DC distribution box wiring & safety earthing",
      ],
      icon: HardHat,
    },
    {
      num: "05",
      shortLabel: "Net Metering",
      title: "Net Metering & Grid Power On",
      subtitle: "Bi-Directional Meter & Official Inspection",
      desc: "We coordinate with DISCOM inspectors to install the bi-directional net meter and turn on your solar system to start earning bill credits.",
      bullets: [
        "Installation of government-approved DLMS net meter",
        "DISCOM official inspection & joint commissioning clearance",
        "System turn-on to start reducing monthly electric bills",
      ],
      icon: Zap,
    },
    {
      num: "06",
      shortLabel: "Subsidy & O&M",
      title: "Subsidy Credit & 25-Yr Care",
      subtitle: "Direct Bank Credit & Maintenance",
      desc: "We upload the commissioning report for direct central subsidy deposit into your bank account, and provide 25-year panel maintenance support.",
      icon: Wrench,
      bullets: [
        "Up to ₹78,000 subsidy deposited into your bank account",
        "Regular pure water panel cleaning & safety checkups",
        "25-year linear panel warranty & local Odisha service support",
      ],
    },
  ];

  // Auto-play horizontal road animation
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  const progressPercentage = (activeStep / (steps.length - 1)) * 100;
  const currentStepData = steps[activeStep];
  const StepIcon = currentStepData.icon;

  return (
    <div className="w-full font-sans bg-[#FAFAFA] text-slate-900 pb-16">
      
      {/* 1. HERO HEADER */}
      <section className="bg-slate-900 text-white py-14 sm:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold px-3.5 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full inline-block shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 inline mr-1.5" />
            YOUR SOLAR PROJECT ROADMAP
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            How Your Solar Installation Works
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Follow our step-by-step horizontal roadmap from initial free rooftop survey to net-meter grid power and direct bank subsidy.
          </p>
        </div>
      </section>

      {/* 2. HORIZONTAL ROADWAY ANIMATED STEPPER */}
      <section className="py-12 bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Top Controls Bar */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-amber-400 font-bold">
                STEP {currentStepData.num} OF 06
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-300 font-medium">{currentStepData.title}</span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-all"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{isPlaying ? "Pause Tour" : "Auto Play"}</span>
              </button>
            </div>
          </div>

          {/* HORIZONTAL ROADWAY TRACK */}
          <div className="relative pt-6 pb-8">
            
            {/* The Road Line Container */}
            <div className="relative w-full h-4 bg-slate-900 border border-slate-800 rounded-full overflow-hidden shadow-inner">
              {/* Dashed Road Line Center */}
              <div className="absolute inset-0 border-b border-dashed border-slate-700/60 top-1.5" />
              
              {/* Active Progress Bar */}
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-400 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {/* Roadway Nodes / Stations (6 Steps) */}
            <div className="absolute top-2 left-0 right-0 flex justify-between items-center px-1 sm:px-4 pointer-events-auto">
              {steps.map((s, index) => {
                const NodeIcon = s.icon;
                const isActive = activeStep === index;
                const isPassed = activeStep > index;

                return (
                  <div
                    key={s.num}
                    onClick={() => {
                      setActiveStep(index);
                      setIsPlaying(false);
                    }}
                    className="cursor-pointer flex flex-col items-center group relative"
                  >
                    {/* Node Circle Pin */}
                    <div
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center font-mono font-bold text-xs sm:text-sm transition-all duration-300 shadow-lg ${
                        isActive
                          ? "bg-emerald-500 text-slate-950 ring-4 ring-emerald-400/80 scale-125 z-20 shadow-emerald-500/50"
                          : isPassed
                          ? "bg-slate-800 text-emerald-400 border border-emerald-500/40"
                          : "bg-slate-900 text-slate-500 border border-slate-800 group-hover:border-slate-600"
                      }`}
                    >
                      {isPassed ? (
                        <Check className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <NodeIcon className={`w-5 h-5 ${isActive ? "text-slate-950" : ""}`} />
                      )}
                    </div>

                    {/* Step Label Below Node */}
                    <div className="mt-3 text-center hidden sm:block">
                      <span
                        className={`text-[11px] font-mono font-bold block transition-colors ${
                          isActive
                            ? "text-emerald-400"
                            : isPassed
                            ? "text-slate-300"
                            : "text-slate-500 group-hover:text-slate-400"
                        }`}
                      >
                        {s.num}. {s.shortLabel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* ACTIVE STEP SPOTLIGHT DISPLAY */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Top Glowing Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Title & Description */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl">
                    <StepIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
                      STEP {currentStepData.num} HIGHLIGHT
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {currentStepData.title}
                    </h2>
                  </div>
                </div>

                <p className="text-xs font-mono text-emerald-400 font-bold">
                  {currentStepData.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentStepData.desc}
                </p>
              </div>

              {/* Right Column: Key Deliverables Checklist */}
              <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-3">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  KEY DELIVERABLES IN THIS STEP:
                </span>
                <div className="space-y-2.5 text-xs text-slate-200 font-medium">
                  {currentStepData.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Controls */}
            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between gap-4">
              <button
                onClick={() => {
                  setActiveStep((prev) => (prev > 0 ? prev - 1 : steps.length - 1));
                  setIsPlaying(false);
                }}
                disabled={activeStep === 0}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                  activeStep === 0
                    ? "bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed"
                    : "bg-slate-800 hover:bg-slate-700 text-white border-slate-700"
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Step</span>
              </button>

              <div className="text-xs font-mono text-slate-400 hidden sm:block">
                Progress: <span className="text-emerald-400 font-bold">{Math.round(progressPercentage)}%</span>
              </div>

              <button
                onClick={() => {
                  setActiveStep((prev) => (prev + 1) % steps.length);
                  setIsPlaying(false);
                }}
                className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <span>{activeStep === steps.length - 1 ? "Start Project →" : "Next Step"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 3. MINIMALIST 6-STEP SUMMARY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full inline-block">
            COMPLETE ROADMAP AT A GLANCE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            6 Clear Steps to Solar Independence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((s, idx) => {
            const CardIcon = s.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={s.num}
                onClick={() => {
                  setActiveStep(idx);
                  setIsPlaying(false);
                }}
                className={`cursor-pointer bg-white border rounded-2xl p-6 space-y-4 shadow-sm transition-all duration-300 ${
                  isSelected
                    ? "ring-2 ring-emerald-500 border-emerald-500 shadow-md scale-[1.02]"
                    : "border-slate-200 hover:border-emerald-500/40 hover:shadow"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl font-extrabold text-amber-500 font-mono">
                    STEP {s.num}
                  </span>
                  <div className="p-2.5 bg-slate-900 text-emerald-400 rounded-xl">
                    <CardIcon className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{s.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{s.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-700 font-medium">
                  {s.bullets.map((b, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="truncate">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. CLOSING CTA */}
      <section className="py-16 bg-slate-900 text-white text-center border-t border-slate-800">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Start Step 1 with a Free Site Visit?</h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Book your zero-cost engineer rooftop survey today. We calculate your exact solar savings and manage all government paperwork.
          </p>
          <div className="flex justify-center gap-4 pt-2">
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
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Get Free Quote</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
