import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import LandingContent from "@/components/shared/landing-content";

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
