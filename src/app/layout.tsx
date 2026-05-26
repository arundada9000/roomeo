import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import BottomNav from "@/components/shared/bottom-nav";
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
  openGraph: {
    title: "Roomeo — Find Your Space Nearby",
    description:
      "Discover nearby rooms and flats with real-time availability, smart filters, and map-first exploration.",
    siteName: "Roomeo",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roomeo — Find Your Space Nearby",
    description:
      "Discover nearby rooms and flats with real-time availability, smart filters, and map-first exploration.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
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
      </body>
    </html>
  );
}
