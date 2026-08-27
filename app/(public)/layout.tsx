import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SiteVisitModalGlobal } from "@/components/common/SiteVisitModal";
import { SiteSettingsProvider } from "@/components/common/SiteSettingsContext";
import { getSiteSettings } from "@/lib/actions/admin-actions";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settingsRes = await getSiteSettings();
  const initialSettings = settingsRes?.data || null;

  return (
    <SiteSettingsProvider initialSettings={initialSettings}>
      <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-[#D97706] selection:text-white">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <SiteVisitModalGlobal />
      </div>
    </SiteSettingsProvider>
  );
}
