"use client";

import React from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <div className="w-full min-h-screen font-sans antialiased">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans antialiased">
      <AdminSidebar />
      <main className="flex-1 overflow-x-hidden p-6 sm:p-8 lg:p-10 max-w-7xl">
        {children}
      </main>
    </div>
  );
}
