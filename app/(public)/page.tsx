import React from "react";
import { Hero } from "@/components/hero/Hero";
import AboutSection from "@/components/home/AboutSection";
import MetricsStrip from "@/components/home/MetricsStrip";
import ServicesSection from "@/components/home/ServicesSection";
import DiscomLiaison from "@/components/home/DiscomLiaison";
import HardwarePartners from "@/components/home/HardwarePartners";
import FaqAccordion from "@/components/home/FaqAccordion";
import { getSiteSettings } from "@/lib/actions/admin-actions";

export const revalidate = 60; // Revalidate dynamic content every 60 seconds

export default async function HomePage() {
  const settingsRes = await getSiteSettings();
  const settings = settingsRes.data;

  return (
    <div className="w-full font-sans bg-[#FAFAFA]">
      {/* 1. HERO SECTION (With dynamic CMS subline & isolated ROI calculator card) */}
      <Hero heroSubline={settings?.heroSubline} />

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

      {/* 6. HARDWARE STANDARDS & EPC COMPLIANCE */}
      <HardwarePartners />

      {/* 7. FAQ ACCORDION */}
      <FaqAccordion />
    </div>
  );
}
