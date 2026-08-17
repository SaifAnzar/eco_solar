import React from "react";
import type { Metadata } from "next";
import PartnerApplicationForm from "@/components/forms/PartnerApplicationForm";
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  MapPin,
  Truck,
  Megaphone,
  Wrench,
  Award,
  Building2,
  Package,
  CheckCircle2,
  HelpCircle,
  PhoneCall,
  ArrowRight,
  Zap,
  Users,
  Store,
  DollarSign,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Partner Program — Franchise & Dealership | Pragati EcoSolar Odisha",
  description:
    "Become a Pragati EcoSolar Franchise Outlet or Certified Channel Dealer in Odisha. High ROI, exclusive territorial rights, Tier-1 material procurement, and complete commissioning support.",
  keywords: [
    "Solar Franchise Odisha",
    "Solar Dealership Bhubaneswar",
    "Solar Business Partnership Cuttack",
    "Solar Distributorship Odisha",
    "PM Surya Ghar Partner",
  ],
};

export default function FranchisePage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-16 pb-20 sm:pt-20 sm:pb-28">
        {/* Glow backdrop effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 font-bold text-xs uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-pulse" />
              <span>Odisha&apos;s Premier Solar Partner Program</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-slate-100">
              Build a High-Profit Solar Business in Your District with{" "}
              <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
                Pragati EcoSolar
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
              Join Odisha&apos;s fastest-growing solar EPC &amp; retail network. Get exclusive territorial rights, Tier-1 factory pricing, marketing support, and 100% project commissioning assistance.
            </p>

            {/* Quick Metrics */}
            <div className="pt-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-slate-800/80">
              <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">30%–45%</div>
                <div className="text-xs font-semibold text-slate-400 mt-1">Target Annual ROI</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">100%</div>
                <div className="text-xs font-semibold text-slate-400 mt-1">Territory Protection</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
                <div className="text-2xl sm:text-3xl font-black text-blue-400">500+</div>
                <div className="text-xs font-semibold text-slate-400 mt-1">Sites Installed in Odisha</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl">
                <div className="text-2xl sm:text-3xl font-black text-purple-400">4 DISCOMs</div>
                <div className="text-xs font-semibold text-slate-400 mt-1">Government Empanelled</div>
              </div>
            </div>

            {/* Scroll Anchor Button */}
            <div className="pt-4 flex justify-center">
              <a
                href="#apply-form"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-amber-500/25 transition-all hover:scale-105"
              >
                <span>Apply for Partner License</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Key Benefits Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
            Why Partner With Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            6 Unmatched Advantages of Pragati EcoSolar Partnership
          </h2>
          <p className="text-sm sm:text-base text-slate-500">
            Everything you need to run a profitable clean-energy enterprise without heavy technical overhead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Benefit 1 */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">High ROI &amp; Profit Margins</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Earn attractive margins on turnkey EPC solar contracts (residential &amp; C&amp;I) plus recurring profits from equipment supply and AMC services.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Exclusive Territorial Rights</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Secure exclusive district/city territory rights. No cannibalization from other dealers — all local inbound leads in your zone are routed directly to you.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Tier-1 Material Procurement</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Access top ALMM-listed solar panels, hybrid inverters, galvanized mounting structures &amp; copper cables at negotiated wholesale factory rates.
            </p>
          </div>

          {/* Benefit 4 */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Megaphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Co-Op Marketing &amp; Lead Support</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              We run targeted Meta &amp; Google ad campaigns in your district, supply branded store signage, marketing brochures, and verified consumer leads.
            </p>
          </div>

          {/* Benefit 5 */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Commissioning &amp; Engineering Assistance</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Our central engineering team prepares 3D CAD rooftop layouts, single-line diagrams (SLD), structural stability reports, and handles net-metering approvals.
            </p>
          </div>

          {/* Benefit 6 */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Govt Subsidy Fast-Tracking</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Seamlessly process PM Surya Ghar Muft Bijli Yojana subsidies (up to ₹78,000) and Odisha state top-up grants directly for your retail clients.
            </p>
          </div>

        </div>
      </section>

      {/* 3. Partnership Models Comparison */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              Select Your Model
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Two Flexible Ways to Join Our Network
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Choose the partnership tier that matches your investment capacity and retail footprint.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Model 1: Franchise Outlet */}
            <div className="bg-slate-950 border-2 border-amber-500/60 rounded-3xl p-8 relative flex flex-col justify-between shadow-2xl">
              <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 text-[10px] font-black uppercase px-3 py-1 rounded-full">
                Most Popular
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
                    <Building2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Franchise Outlet</h3>
                    <p className="text-xs text-amber-400 font-semibold">Exclusive Retail Showroom &amp; Regional Hub</p>
                  </div>
                </div>

                <div className="space-y-3 border-t border-b border-slate-800 py-4 text-xs font-medium">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Initial Investment Range:</span>
                    <span className="font-bold text-amber-400 text-sm">₹5 Lakhs – ₹10 Lakhs+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Commercial Space Mandate:</span>
                    <span className="font-bold text-white">200 – 500 Sq. Ft.</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Territory Scope:</span>
                    <span className="font-bold text-white">Exclusive District / Sub-Division</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Break-even:</span>
                    <span className="font-bold text-emerald-400">4 – 6 Months</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Key Program Inclusions:</div>
                  <ul className="space-y-2 text-xs text-slate-400">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Branded interior setup, 3D display mockups &amp; working solar kit</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Dedicated technical engineer assigned for your site installations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Direct DISCOM net-metering portal access &amp; subsidy queue prioritization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Comprehensive sales, technical, and installer staff training</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href="#apply-form"
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Apply for Franchise Outlet</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Model 2: Certified Channel Dealer */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between shadow-xl">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
                    <Package className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Certified Channel Dealer</h3>
                    <p className="text-xs text-emerald-400 font-semibold">Wholesale Distribution &amp; Referral Partner</p>
                  </div>
                </div>

                <div className="space-y-3 border-t border-b border-slate-800 py-4 text-xs font-medium">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Initial Investment Range:</span>
                    <span className="font-bold text-emerald-400 text-sm">₹2 Lakhs – ₹5 Lakhs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Commercial Space Mandate:</span>
                    <span className="font-bold text-white">No Showroom Mandatory</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Territory Scope:</span>
                    <span className="font-bold text-white">Non-Exclusive Regional Area</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Target Break-even:</span>
                    <span className="font-bold text-emerald-400">1 – 3 Months</span>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Key Program Inclusions:</div>
                  <ul className="space-y-2 text-xs text-slate-400">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Factory-direct pricing on ALMM modules, hybrid inverters &amp; street lights</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Zero inventory burden option for lead referrals and EPC handover</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Digital sales kit, product catalogs, and price matrix sheets</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Fast commission payouts on verified solar project conversions</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href="#apply-form"
                  className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <span>Apply for Channel Dealership</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Eligibility & Requirements */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
              Criteria
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Partner Eligibility &amp; Requirements
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              We look for passionate business partners who are committed to clean energy adoption in Odisha.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3">
              <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center font-bold">
                <Store className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Commercial Space</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                For Franchise tier: Minimum 200 – 500 sq. ft. ground floor or main road commercial space suitable for customer walk-ins and product displays.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Background &amp; Expertise</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Preference for entrepreneurs, electrical hardware dealers, HVAC/battery shop owners, civil/electrical contractors, or sales professionals.
              </p>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-800 rounded-xl flex items-center justify-center font-bold">
                <DollarSign className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">Capital Commitment</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Liquid capital for initial display inventory, store branding, working capital, and local marketing activities based on your selected tier.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Embedded Partner Application Form Section */}
      <section id="apply-form" className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <PartnerApplicationForm />
      </section>

      {/* 6. FAQ Section */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Everything you need to know about starting your Pragati EcoSolar partnership.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
              How long does it take to launch a Franchise Outlet?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 pl-6 leading-relaxed">
              Once your application is approved and agreement signed, our team completes store branding, inventory dispatch, and staff onboarding within 15 to 21 business days.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
              Is there a monthly royalty fee?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 pl-6 leading-relaxed">
              No! We operate on a zero-royalty partnership model. All profits from equipment sales and EPC margins remain entirely with you.
            </p>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-2">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
              Who handles technical solar design and DISCOM net metering?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 pl-6 leading-relaxed">
              Pragati EcoSolar&apos;s central engineering wing handles all technical designs, SLDs, DISCOM portal filings (TPCODL, TPNODL, TPSODL, TPWODL), and net-meter approvals.
            </p>
          </div>
        </div>
      </section>

      {/* Direct Contact CTA Footer */}
      <section className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold">Have Specific Questions Before Applying?</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Speak directly with our Franchise Expansion Desk for Odisha.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+919124318222"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Expansion Team: +91 91243 18222</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
