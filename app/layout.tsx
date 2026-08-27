import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import WhatsAppWidget from "@/components/common/WhatsAppWidget";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pragatiecosolar.in"),
  title: {
    default: "Pragati EcoSolar | Rooftop Solar EPC Contractor Bhubaneswar, Odisha",
    template: "%s | Pragati EcoSolar",
  },
  description:
    "Premier Rooftop Solar EPC Contractor in Odisha (HIG 42, Aryapalli, Patia, Bhubaneswar). Turnkey 3 kW to 100 kW+ solar installations under PM Surya Ghar & C&I CAPEX/OPEX models. Full TPCODL, TPNODL, TPSODL & TPWODL Net-Metering Liaison.",
  icons: {
    icon: [
      { url: "/logo-p.png", type: "image/png" },
      { url: "/favicon-p.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/logo-p.png",
    apple: "/logo-p.png",
  },
  keywords: [
    "Pragati EcoSolar",
    "Solar EPC Bhubaneswar",
    "Rooftop Solar Odisha",
    "PM Surya Ghar Subsidy Odisha",
    "TPCODL Net Metering",
    "Solar Installer Patia Bhubaneswar",
    "Commercial Solar EPC Odisha",
    "Waaree Solar Dealer Bhubaneswar",
    "Adani Solar Dealer Odisha",
  ],
  authors: [{ name: "Pragati EcoSolar", url: "https://www.pragatiecosolar.in" }],
  creator: "MD Kalpna Sahoo",
  publisher: "Pragati EcoSolar",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.pragatiecosolar.in",
    siteName: "Pragati EcoSolar",
    title: "Pragati EcoSolar | Rooftop Solar EPC Contractor Bhubaneswar, Odisha",
    description:
      "Engineering High-Yield Rooftop Solar Systems across Odisha with 25-Year Performance Warranty & Full DISCOM Net-Metering Liaison.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200",
        width: 1200,
        height: 630,
        alt: "Pragati EcoSolar Rooftop Installation in Odisha",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pragati EcoSolar | Solar EPC Contractor Odisha",
    description: "High-yield rooftop solar EPC across Bhubaneswar, Cuttack & Odisha.",
    images: ["https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200"],
  },
  alternates: {
    canonical: "https://www.pragatiecosolar.in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// JSON-LD Schema Definitions
const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.pragatiecosolar.in/#organization",
      name: "Pragati EcoSolar",
      url: "https://www.pragatiecosolar.in",
      logo: "https://www.pragatiecosolar.in/favicon.ico",
      email: "solarbee.bbsr@gmail.com",
      telephone: "+91-9124318222",
      vatID: "21ABIFP1344D1ZS",
      address: {
        "@type": "PostalAddress",
        streetAddress: "HIG 42, Aryapalli, Patia",
        addressLocality: "Bhubaneswar",
        addressRegion: "Odisha",
        postalCode: "751024",
        addressCountry: "IN",
      },
      founder: {
        "@type": "Person",
        name: "Kalpna Sahoo",
        jobTitle: "Managing Director",
      },
    },
    {
      "@type": "SolarEnergyContractor",
      "@id": "https://www.pragatiecosolar.in/#localbusiness",
      name: "Pragati EcoSolar",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200",
      telephone: "+91-9124318222",
      email: "solarbee.bbsr@gmail.com",
      priceRange: "₹₹₹",
      address: {
        "@type": "PostalAddress",
        streetAddress: "HIG 42, Aryapalli, Patia",
        addressLocality: "Bhubaneswar",
        addressRegion: "Odisha",
        postalCode: "751024",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 20.3548,
        longitude: 85.8173,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
      areaServed: [
        "Bhubaneswar",
        "Cuttack",
        "Puri",
        "Khordha",
        "Sambalpur",
        "Berhampur",
        "Rourkela",
        "Balasore",
        "Odisha",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/logo-p.png?v=99" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo-p.png?v=99" />
        <link rel="shortcut icon" href="/logo-p.png?v=99" type="image/png" />
        <link rel="apple-touch-icon" href="/logo-p.png?v=99" />
      </head>
      <body className="min-h-full flex flex-col bg-[#FAFAFA] text-slate-900 selection:bg-[#D97706] selection:text-white font-sans">
        <Script
          id="json-ld-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true}>
          {children}
          <WhatsAppWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
