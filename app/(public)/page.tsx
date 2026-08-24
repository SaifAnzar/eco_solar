import React from "react";
import { Hero } from "@/components/hero/Hero";
import AboutSection from "@/components/home/AboutSection";
import MetricsStrip from "@/components/home/MetricsStrip";
import ServicesSection from "@/components/home/ServicesSection";
import DiscomLiaison from "@/components/home/DiscomLiaison";
import BrandLogos from "@/components/home/BrandLogos";
import FaqAccordion from "@/components/home/FaqAccordion";
import { getSiteSettings } from "@/lib/actions/admin-actions";

export const revalidate = 60; // Revalidate dynamic content every 60 seconds

export default async function HomePage() {
  const settingsRes = await getSiteSettings();
  const settings = settingsRes.data;

  return (
    <div className="w-full font-sans bg-[#FAFAFA]">
      {/* 1. HERO SECTION (With dynamic CMS headline, subline & isolated ROI calculator card) */}
      <Hero
        heroHeadline={settings?.heroHeadline}
        heroSubline={settings?.heroSubline}
        typewriterWords={settings?.typewriterWords}
      />

      {/* 2. ABOUT SECTION (Company credentials & core EPC values) */}
      <AboutSection />

      {/* 3. TRUST STRIP & BADGES (Dynamic CMS Metrics) */}
      <MetricsStrip
        systemsInstalled={settings?.systemsInstalled}
        capacityDelivered={settings?.capacityDelivered}
        discomZonesCovered={settings?.discomZonesCovered}
        epcScope={settings?.epcScope}
      />

      {/* 4. SERVICES OVERVIEW */}
      <ServicesSection />

      {/* 5. DISCOM LIAISON & ZONES */}
      <DiscomLiaison />

      {/* 6. TRUSTED BRAND PARTNERS SCROLLING LOGO MARQUEE */}
      <section className="py-8 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BrandLogos />
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <FaqAccordion />
    </div>
  );
}


