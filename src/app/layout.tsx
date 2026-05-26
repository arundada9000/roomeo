import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import BottomNav from "@/components/shared/bottom-nav";
import ServiceWorkerRegistration from "@/components/shared/service-worker-registration";
import ScrollToTopButton from "@/components/shared/scroll-to-top-button";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Roomeo — Find Your Space Nearby",
    template: "%s | Roomeo",
  },
  description:
    "Discover nearby rooms and flats with real-time availability, smart filters, and map-first exploration. The fastest way to find your next room.",
  keywords: [
    "room finder",
    "flat finder",
    "nearby rooms",
    "rental",
    "PG",
    "map search",
    "roomeo",
  ],
  authors: [{ name: "Roomeo" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "Roomeo — Find Your Space Nearby",
    description:
      "Discover nearby rooms and flats with real-time availability, smart filters, and map-first exploration.",
    siteName: "Roomeo",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1080,
        height: 1920,
        alt: "Roomeo — Find Your Space Nearby",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roomeo — Find Your Space Nearby",
    description:
      "Discover nearby rooms and flats with real-time availability, smart filters, and map-first exploration.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/icons/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/icons/icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-256x256.png", sizes: "256x256", type: "image/png" },
      { url: "/icons/icon-384x384.png", sizes: "384x384", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/icons/icon-192x192.png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Roomeo",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
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
      className={`${inter.variable} ${GeistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground relative">
        {children}
        <BottomNav />
        <ScrollToTopButton />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
