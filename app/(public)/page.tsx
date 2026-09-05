import React from "react";
import { Hero } from "@/components/hero/Hero";
import VideoHero from "@/components/home/VideoHero";
// import AnimatedSolarHero from "@/components/home/AnimatedSolarHero"; // preserved — SVG engine hero
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
    <div className="w-full font-sans">
      {/* 1. VIDEO HERO — dual seamless crossfade video background */}
      <VideoHero />

      {/* PRESERVED: SVG animated hero (commented out) */}
      {/* <AnimatedSolarHero /> */}

      {/* PRESERVED: Original CMS Hero (commented out) */}
      {/* <Hero
        heroHeadline={settings?.heroHeadline}
        heroSubline={settings?.heroSubline}
        typewriterWords={settings?.typewriterWords}
      /> */}

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
      <BrandLogos />

      {/* 7. FAQ ACCORDION */}
      <FaqAccordion />
    </div>
  );
}


