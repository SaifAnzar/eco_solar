import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, MapPin, CheckCircle2, Wind, Zap, UserCheck, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Pragati EcoSolar | Managing Director Kalpna Sahoo",
  description: "Learn about Pragati EcoSolar's leadership under MD Kalpna Sahoo in Patia, Bhubaneswar, and coastal Odisha cyclone-resilient structural engineering standards.",
};

export default function AboutPage() {
  const standards = [
    {
      title: "150 km/h Wind-Load MMS Structural Engineering",
      description: "Odisha experiences frequent coastal tropical storms and cyclones. We construct custom Hot-Dip Galvanized Module Mounting Structures (MMS) with 80-micron zinc coating and heavy-gauge steel anchors.",
      icon: Wind,
    },
    {
      title: "IS 3043 Chemical Maintenance-Free Earthing",
      description: "Electrical safety is non-negotiable. Every system features separate chemical earthing pits for AC, DC, and Lightning Arrestor circuits using bentonite compound backfill.",
      icon: Zap,
    },
    {
      title: "UV-Resistant & Flame-Retardant XLPO Cabling",
      description: "We exclusively deploy Polycab and KEI cross-linked polyolefin (XLPO) solar DC cables designed for 1500V system voltage and 25 years of extreme sunlight exposure.",
      icon: ShieldCheck,
    },
    {
      title: "Tier-1 ALMM Module & Inverter Selection",
      description: "Only MNRE ALMM listed solar PV modules from Waaree and Adani (TOPCon / MonoPERC) combined with Statcon or Sunora dual MPPT grid-tied inverters are deployed.",
      icon: Award,
    },
  ];

  return (
    <div className="bg-[#FAFAFA]">
      
      {/* Hero Header */}
      <section className="relative py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full inline-block">
              ABOUT PRAGATI ECOSOLAR
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Odisha’s Trusted Solar EPC Engineering Authority
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Headquartered at HIG 42, Aryapalli, Patia, Bhubaneswar under the leadership of Managing Director <strong className="text-slate-900">Kalpna Sahoo</strong>, Pragati EcoSolar is dedicated to delivering high-yield, hurricane-resilient rooftop solar systems across Odisha.
            </p>
          </div>
        </div>
      </section>

      {/* Profile & Leadership Overview */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Engineering Rigor Meets Local Utility Mastery
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              Pragati EcoSolar was established to solve the core challenges faced by solar adopters in Odisha: erratic DISCOM approval delays, sub-standard structural mounting in cyclone-prone coastal weather, and lack of post-installation maintenance.
            </p>

            <p className="text-sm text-slate-600 leading-relaxed">
              Our in-house team of electrical engineers, civil structural designers, and regulatory liaison officers manage the complete lifecycle—from initial 3D shadow analysis to final bi-directional meter synchronization with TPCODL, TPNODL, TPSODL, and TPWODL.
            </p>

            <div className="p-6 bg-white border border-slate-200 rounded-2xl space-y-3 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">MD Kalpna Sahoo</h4>
                  <span className="text-xs font-mono text-slate-500">Managing Director, Pragati EcoSolar</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 italic leading-relaxed">
                &ldquo;Our commitment is clear: zero compromise on structural safety, 100% DISCOM net-metering compliance, and maximum kilowatt-hour solar generation for 25 years.&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-8 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              Key Corporate Specifications
            </h3>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Company Name:</span>
                <strong className="text-slate-900">Pragati EcoSolar</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Managing Director:</span>
                <strong className="text-amber-700">Kalpna Sahoo</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">GST Registration:</span>
                <strong className="text-slate-900">21ABIFP1344D1ZS</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">Headquarters Address:</span>
                <strong className="text-slate-900 text-right">HIG 42, Aryapalli, Patia, Bhubaneswar – 751024</strong>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">Banker:</span>
                <strong className="text-emerald-700">IDFC FIRST BANK (A/C: 86522167402)</strong>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Engineering Standards */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-700 font-bold px-3 py-1 bg-amber-50 border border-amber-200 rounded-full inline-block">
              TECHNICAL EXCELLENCE
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Coastal Odisha Engineering Standards
            </h2>
            <p className="text-slate-600 text-sm">
              Why Pragati EcoSolar installations withstand high humidity, coastal salinity, and cyclone winds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {standards.map((std, idx) => {
              const Icon = std.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAFAFA] p-8 rounded-3xl border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4 shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-2xl bg-white border border-slate-200 text-emerald-600 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {std.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {std.description}
                  </p>
                  <div className="pt-2 flex items-center space-x-2 text-[11px] text-amber-700 font-mono font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Verified Quality Inspection Protocol</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          CORE TEAM
      ═══════════════════════════════════════════════ */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-bold px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full inline-block">
            OUR PEOPLE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet the Core Team
          </h2>
          <p className="text-sm text-slate-500 max-w-xl mx-auto">
            The dedicated professionals behind every solar installation, subsidy claim, and customer smile across Odisha.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: "Kalpna Sahoo",
              designation: "Managing Director",
              photo: "/kalpana sahoo.jpeg",
              accent: "bg-amber-50 border-amber-200 text-amber-700",
              badge: "Leadership",
            },
            {
              name: "Akash Kumar Behera",
              designation: "General Manager",
              photo: "/akash kumar behera.jpeg",
              accent: "bg-emerald-50 border-emerald-200 text-emerald-700",
              badge: "Operations",
            },
            {
              name: "Pratap Kumar Das",
              designation: "Operation Head",
              photo: "/Pratap kumar das.jpeg",
              accent: "bg-emerald-50 border-emerald-200 text-emerald-700",
              badge: "Operations",
            },
            {
              name: "Monalisa Dalai",
              designation: "Business Development Manager",
              photo: "/Monalisa Dalai.jpeg",
              accent: "bg-sky-50 border-sky-200 text-sky-700",
              badge: "Growth",
            },
            {
              name: "Arpita Biswal",
              designation: "Customer Relationship Manager",
              photo: "/Arpita biswal.jpeg",
              accent: "bg-violet-50 border-violet-200 text-violet-700",
              badge: "Customer Care",
            },
            {
              name: "Banti Jena",
              designation: "Customer Relationship Manager",
              photo: "/Banty jena.jpeg",
              accent: "bg-violet-50 border-violet-200 text-violet-700",
              badge: "Customer Care",
            },
          ].map((member) => (
            <div
              key={member.name}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
            >
              {/* Photo */}
              <div className="aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <span
                  className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border mb-3 ${member.accent}`}
                >
                  {member.badge}
                </span>
                <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                  {member.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {member.designation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 text-center md:text-left shadow-xl">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white">Ready to switch your property to clean solar power?</h3>
            <p className="text-xs text-slate-400">Get a detailed engineering quotation & DISCOM net-meter feasibility check in Patia, Bhubaneswar.</p>
          </div>
          <Link
            href="/contact"
            className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center space-x-2 shrink-0 font-mono"
          >
            <span>Book Site Feasibility Survey</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
