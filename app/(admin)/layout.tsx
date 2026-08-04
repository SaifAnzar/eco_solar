import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin Panel | Pragati EcoSolar",
    template: "%s | Admin — Pragati EcoSolar",
  },
  robots: { index: false, follow: false },
};

export default function AdminGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
