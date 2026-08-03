import React from "react";
import Link from "next/link";
import { MapPin, CheckCircle2, Clock, ArrowRight, Award, Phone, Zap, Home, Building2, Sprout } from "lucide-react";

const projects = [
  {
    id: "patia-residential-10kw",
    status: "completed",
    type: "Home Solar",
    icon: Home,
    location: "Patia, Bhubaneswar",
    discom: "TPCODL",
    size: "10 kW",
    generation: "~1,200 Units/Month",
    subsidy: "₹78,000",
    badge: "PM Surya Ghar",
    title: "10 kW Residential Rooftop System",
    desc: "Complete rooftop solar installation for a family home in Patia. Government subsidy claimed and net meter activated.",
    href: "/projects/patia-residential-10kw",
  },
  {
    id: "cuttack-commercial-50kw",
    status: "completed",
    type: "Office & Factory",
    icon: Building2,
    location: "Phulnakhara, Cuttack",
    discom: "TPCODL",
    size: "50 kW",
    generation: "~6,000 Units/Month",
    subsidy: "80% Tax Saving",
    badge: "C&I Solar",
    title: "50 kW Commercial Warehouse Solar",
    desc: "Industrial rooftop solar plant for a warehouse. Electricity bill reduced by 75%. Tax benefits availed in year one.",
    href: "/projects/cuttack-commercial-50kw",
  },
  {
    id: "puri-agricultural-7hp",
    status: "completed",
    type: "Farm Solar Pump",
    icon: Sprout,
    location: "Pipili, Puri",
    discom: "TPCODL",
    size: "7.5 HP Pump",
    generation: "Full Daylight Pumping",
    subsidy: "90% Govt Subsidy",
    badge: "PM-KUSUM",
    title: "7.5 HP Solar Water Pump for Farmer",
    desc: "Solar-powered irrigation pump installed for a paddy farmer under PM-KUSUM. Zero electricity or diesel cost for water supply.",
    href: "/projects/puri-agricultural-7hp",
  },
  {
    id: "bbsr-residential-5kw",
    status: "completed",
    type: "Home Solar",
    icon: Home,
    location: "Nayapalli, Bhubaneswar",
    discom: "TPCODL",
    size: "5 kW",
    generation: "~600 Units/Month",
    subsidy: "₹78,000",
    badge: "PM Surya Ghar",
    title: "5 kW Residential Rooftop System",
    desc: "Rooftop solar for a 2BHK home in Nayapalli. Monthly bill dropped from ₹3,500 to under ₹400.",
    href: "/projects/bbsr-residential-5kw",
  },
  {
    id: "sambalpur-school-25kw",
    status: "completed",
    type: "Office & Factory",
    icon: Building2,
    location: "Sambalpur City",
    discom: "TPWODL",
    size: "25 kW",
    generation: "~3,000 Units/Month",
    subsidy: "80% Tax Saving",
    badge: "Institutional Solar",
    title: "25 kW School Rooftop Solar Plant",
    desc: "Solar system installed on a private school rooftop in Sambalpur. Annual electricity savings of over ₹2.4 Lakhs.",
    href: "/projects/sambalpur-school-25kw",
  },
  {
    id: "balasore-residential-3kw",
    status: "completed",
    type: "Home Solar",
    icon: Home,
    location: "Balasore Town",
    discom: "TPNODL",
    size: "3 kW",
    generation: "~360 Units/Month",
    subsidy: "₹78,000",
    badge: "PM Surya Ghar",
    title: "3 kW Home Solar — First in TPNODL",
    desc: "One of the first PM Surya Ghar installations in Balasore district. Full subsidy disbursed within 45 days.",
    href: "/projects/balasore-residential-3kw",
  },
  {
    id: "berhampur-factory-100kw",
    status: "in-progress",
    type: "Office & Factory",
    icon: Building2,
    location: "Berhampur, Ganjam",
    discom: "TPSODL",
    size: "100 kW",
    generation: "~12,000 Units/Month",
    subsidy: "80% Tax Saving",
    badge: "Large C&I",
    title: "100 kW Factory Solar Plant",
    desc: "Large-scale solar installation for a manufacturing unit. DISCOM approval received. Installation underway.",
    href: "/projects/berhampur-factory-100kw",
  },
  {
    id: "rourkela-residential-8kw",
    status: "in-progress",
    type: "Home Solar",
    icon: Home,
    location: "Rourkela, Sundargarh",
    discom: "TPWODL",
    size: "8 kW",
    generation: "~960 Units/Month",
    subsidy: "₹78,000",
    badge: "PM Surya Ghar",
    title: "8 kW Residential Rooftop System",
    desc: "Home solar installation in progress. Panels mounted, inverter connected. Net meter application submitted.",
    href: "/projects/rourkela-residential-8kw",
  },
  {
    id: "koraput-pump-5hp",
    status: "in-progress",
    type: "Farm Solar Pump",
    icon: Sprout,
    location: "Koraput District",
    discom: "TPSODL",
    size: "5 HP Pump",
    generation: "Full Daylight Pumping",
    subsidy: "90% Govt Subsidy",
    badge: "PM-KUSUM",
    title: "5 HP Solar Irrigation Pump",
    desc: "PM-KUSUM solar pump installation for tribal farming community. Subsidy approved. Installation in final stage.",
    href: "/projects/koraput-pump-5hp",
  },
];

const completedCount = projects.filter((p) => p.status === "completed").length;
const inProgressCount = projects.filter((p) => p.status === "in-progress").length;

export default function ProjectsPage() {
  return (
    <div className="bg-[#FAFAFA] min-h-screen py-12 md:py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>COMPLETED SOLAR PROJECTS · ODISHA</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Installed Solar Projects
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Real solar installations completed for homes, offices, and farms across Odisha. Every project is backed by meter approval and long-term warranty.
          </p>
        </div>

        {/* Status Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-extrabold text-slate-900">{projects.length}</div>
            <div className="text-xs text-slate-500 mt-0.5 font-semibold">Total Projects</div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl font-extrabold text-emerald-700">{completedCount}</div>
            <div className="text-xs text-emerald-600 mt-0.5 font-semibold">Completed ✓</div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center shadow-sm col-span-2 sm:col-span-1">
            <div className="text-2xl font-extrabold text-amber-700">{inProgressCount}</div>
            <div className="text-xs text-amber-600 mt-0.5 font-semibold">In Progress</div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => {
            const Icon = project.icon;
            const isDone = project.status === "completed";

            return (
              <div
                key={project.id}
                className={`bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 flex flex-col ${
                  isDone ? "border-slate-200" : "border-amber-200/80"
                }`}
              >
                {/* Card Top: Status + Type */}
                <div className={`flex items-center justify-between px-5 pt-5 pb-4 border-b ${isDone ? "border-slate-100" : "border-amber-100"}`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2 rounded-lg ${isDone ? "bg-slate-100" : "bg-amber-50"}`}>
                      <Icon className={`w-4 h-4 ${isDone ? "text-slate-600" : "text-amber-600"}`} />
                    </div>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">
                      {project.type}
                    </span>
                  </div>
                  {/* Status Badge */}
                  {isDone ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
                      <CheckCircle2 className="w-3 h-3" />
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold">
                      <Clock className="w-3 h-3" />
                      In Progress
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="px-5 py-4 space-y-3 flex-1">
                  <div>
                    <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider mb-1">
                      {project.badge}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      {project.desc}
                    </p>
                  </div>

                  {/* Key Details Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Location</div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-500 shrink-0" />
                        {project.location}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">DISCOM Zone</div>
                      <div className="text-xs font-bold text-slate-800 mt-0.5 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-500 shrink-0" />
                        {project.discom}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">System Size</div>
                      <div className="text-xs font-bold text-emerald-700 mt-0.5">{project.size}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Benefit</div>
                      <div className="text-xs font-bold text-emerald-700 mt-0.5">{project.subsidy}</div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-5 pb-5">
                  <Link
                    href={project.href}
                    className="w-full border border-slate-200 hover:bg-slate-900 hover:text-white text-slate-700 text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <span>View Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <div className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider mb-1">
              400+ Projects Across Odisha
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Want Solar for Your Home or Business?
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md">
              Our team handles everything — design, installation, meter approval, and subsidy claim. Call us for a free site visit.
            </p>
          </div>
          <a
            href="tel:+919124318222"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition-colors shrink-0"
          >
            <Phone className="w-4 h-4" />
            Call +91 9124318222
          </a>
        </div>

      </div>
    </div>
  );
}
