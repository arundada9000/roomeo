import type { Metadata } from "next";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import LandingContent from "@/components/shared/landing-content";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <LandingContent />
      </main>
      <Footer />
    </>
  );
}
