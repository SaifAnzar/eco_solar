"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getSiteSettings } from "@/lib/actions/admin-actions";

export interface SiteSettings {
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  workingHours: string;
  heroHeadline: string;
  heroSubline: string;
  systemsInstalled: string;
  capacityDelivered: string;
  discomZonesCovered: string;
  epcScope: string;
  typewriterWords: string[];
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  heroHeadline:
    "Odisha's Trusted Solar EPC Partner — Powering Homes & Businesses with On-Grid, Off-Grid & Hybrid Solutions",
  heroSubline:
    "Government-authorized installer under PM Surya Ghar Muft Bijli Yojana, empanelled across all four Odisha DISCOMs. From design to commissioning — we handle it all.",
  contactAddress: "HIG/42, Aryapalli, Patia, Bhubaneswar, Odisha 751024",
  contactPhone: "+91 91243 18222",
  contactEmail: "solarbee.bbsr@gmail.com",
  workingHours: "Mon – Sat: 9:30 AM – 6:30 PM",
  systemsInstalled: "500+",
  capacityDelivered: "5+ MW",
  discomZonesCovered: "4 Zones",
  epcScope: "100% EPC",
  typewriterWords: [
    "On-Grid, Off-Grid & Hybrid Solutions.",
    "Powering Homes & Businesses.",
    "PM Surya Ghar Subsidy Authorized.",
    "Save Up to 90% Electricity Bills.",
  ],
};

const SiteSettingsContext = createContext<{
  settings: SiteSettings;
  refreshSettings: () => Promise<void>;
}>({
  settings: DEFAULT_SITE_SETTINGS,
  refreshSettings: async () => {},
});

export function SiteSettingsProvider({
  initialSettings,
  children,
}: {
  initialSettings?: Partial<SiteSettings> | null;
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<SiteSettings>({
    ...DEFAULT_SITE_SETTINGS,
    ...(initialSettings || {}),
  });

  const fetchSettings = async () => {
    try {
      const res = await getSiteSettings();
      if (res.success && res.data) {
        setSettings((prev) => ({
          ...prev,
          contactAddress: res.data.contactAddress || prev.contactAddress,
          contactPhone: res.data.contactPhone || prev.contactPhone,
          contactEmail: res.data.contactEmail || prev.contactEmail,
          workingHours: res.data.workingHours || prev.workingHours,
          heroHeadline: res.data.heroHeadline || prev.heroHeadline,
          heroSubline: res.data.heroSubline || prev.heroSubline,
          systemsInstalled: res.data.systemsInstalled || prev.systemsInstalled,
          capacityDelivered: res.data.capacityDelivered || prev.capacityDelivered,
          discomZonesCovered: res.data.discomZonesCovered || prev.discomZonesCovered,
          epcScope: res.data.epcScope || prev.epcScope,
          typewriterWords:
            Array.isArray(res.data.typewriterWords) && res.data.typewriterWords.length > 0
              ? res.data.typewriterWords
              : prev.typewriterWords,
        }));
      }
    } catch (e) {
      console.warn("Notice loading SiteSettings in Context:", e);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <SiteSettingsContext.Provider value={{ settings, refreshSettings: fetchSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
