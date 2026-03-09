import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Temer Properties | Premium Real Estate in Addis Ababa, Ethiopia",
  description:
    "Find luxury apartments, villas, and condos in Addis Ababa. Temer Properties offers premium real estate with 10,000+ happy residents. Affordable pricing, prime locations, and trusted quality since 2015.",
  keywords: [
    "Addis Ababa real estate",
    "Ethiopia real estate",
    "Temer Properties",
    "luxury apartments Addis Ababa",
    "buy property Ethiopia",
    "condos Addis Ababa",
    "villas Addis Ababa",
    "real estate investment Ethiopia",
  ],
  authors: [{ name: "Temer Properties" }],
  openGraph: {
    title: "Temer Properties | Premium Real Estate in Addis Ababa",
    description:
      "Discover handpicked luxury properties in Addis Ababa. Trusted by 10,000+ residents. Apartments, villas & condos with flexible payment plans.",
    url: "https://temerproperties.com",
    siteName: "Temer Properties",
    locale: "en_ET",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Temer Properties | Premium Real Estate in Addis Ababa",
    description:
      "Luxury apartments, villas & condos in Addis Ababa. Trusted by 10,000+ residents.",
  },
  alternates: {
    canonical: "https://temerproperties.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/images/Logo.jpg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/images/Logo.jpg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/images/Logo.jpg",
        type: "image/jpg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  other: {
    "geo.region": "ET-AA",
    "geo.placename": "Addis Ababa",
    "geo.position": "9.0192;38.7525",
    ICBM: "9.0192, 38.7525",
  },
};

export const viewport: Viewport = {
  themeColor: "#3a7d44",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
