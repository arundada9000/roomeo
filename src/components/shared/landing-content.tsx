"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Search,
  Shield,
  ArrowRight,
  Building2,
  Star,
  CheckCircle2,
  Sparkles,
  Zap,
  SlidersHorizontal,
  Users,
  Wallet,
  PhoneCall,
  Flame,
  Heart
} from "lucide-react";

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* ─── Room showcase data ─── */
const showcaseRooms = [
  { src: "/rooms/room4.jpg", label: "Cozy Single", price: "NPR 8,000/mo" },
  { src: "/rooms/room1.jpg", label: "Modern Studio", price: "NPR 12,000/mo" },
  { src: "/rooms/room3.jpg", label: "Furnished Flat", price: "NPR 18,000/mo" },
];

/* ─── Premium Features Data ─── */
const features = [
  {
    icon: Zap,
    title: "Instant Booking",
    desc: "Skip the endless calls. See real-time availability and book your next home instantly.",
    colSpan: "md:col-span-2 md:row-span-2",
    bg: "bg-gradient-to-br from-primary/10 to-primary/5",
    border: "border-primary/20",
  },
  {
    icon: Shield,
    title: "Verified Hosts",
    desc: "Every landlord is KYC verified to ensure your safety.",
    colSpan: "col-span-1",
    bg: "bg-card",
    border: "border-border/50",
  },
  {
    icon: Wallet,
    title: "Zero Brokerage",
    desc: "Connect directly. No hidden fees or commissions.",
    colSpan: "col-span-1",
    bg: "bg-card",
    border: "border-border/50",
  },
];

export default function LandingContent() {
  return (
    <div className="relative">
      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden pb-32">
        {/* Background effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/[0.05] via-background to-background" />
          <div className="absolute left-1/2 top-0 -z-10 h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-primary/[0.05] blur-[160px]" />
        </div>

        <div className="mx-auto max-w-[1280px] px-4 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pt-36">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — Text Content */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div custom={0} variants={fadeUp}>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/[0.06] px-4 py-1.5 text-sm font-semibold text-primary backdrop-blur-sm shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                  <Flame className="h-4 w-4 text-orange-500" />
                  #1 Rated Room Finder
                </span>
              </motion.div>

              <motion.h1
                custom={1}
                variants={fadeUp}
                className="mt-7 text-[2.75rem] font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4rem]"
              >
                Find your perfect
                <br />
                space,{" "}
                <span className="bg-gradient-to-r from-primary via-[#2563eb] to-primary bg-clip-text text-transparent drop-shadow-sm">
                  instantly.
                </span>
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp}
                className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
              >
                Explore verified rooms, flats, and PG accommodations around you with interactive maps and zero brokerage fees.
              </motion.p>

              {/* CTA */}
              <motion.div custom={3} variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/explore"
                  className="group flex h-14 items-center gap-3 rounded-2xl bg-primary px-8 text-base font-bold text-primary-foreground shadow-[0_8px_30px_rgb(var(--primary)/0.3)] transition-all duration-300 hover:shadow-[0_8px_40px_rgb(var(--primary)/0.4)] hover:-translate-y-0.5 active:scale-95"
                  id="hero-cta-find"
                >
                  <Search className="h-5 w-5" />
                  Explore Near Me
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/landlord"
                  className="flex h-14 items-center gap-3 rounded-2xl border-2 border-border bg-card px-8 text-base font-bold text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/[0.02] active:scale-95 shadow-sm"
                  id="hero-cta-list"
                >
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  List Property
                </Link>
              </motion.div>

              {/* Trust */}
              <motion.div custom={4} variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-muted-foreground">
                <span className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full border border-border/40">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  Verified listings
                </span>
                <span className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full border border-border/40">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  4.9/5 Rating
                </span>
                <span className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full border border-border/40">
                  <Zap className="h-4 w-4 text-primary" />
                  Zero Brokerage
                </span>
              </motion.div>
            </motion.div>

            {/* Right — Room Image Showcase */}
            <motion.div initial="hidden" animate="visible" variants={scaleIn} className="relative hidden lg:block h-[500px]">
              
              {/* Main Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 rounded-full blur-[100px] -z-10" />

              {/* Main central image */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] aspect-[4/5] overflow-hidden rounded-[2rem] shadow-2xl shadow-primary/20 border-4 border-background group z-20">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <Image
                  src="/rooms/room4.jpg"
                  alt="Premium room listing"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <span className="inline-flex items-center gap-1.5 rounded-2xl bg-white/20 backdrop-blur-md px-4 py-2 text-sm font-extrabold text-white border border-white/20 shadow-xl">
                    NPR 12,000 <span className="text-white/70 text-xs font-semibold">/ mo</span>
                  </span>
                </div>
              </div>

              {/* Top Left Floating Image */}
              <motion.div
                initial={{ opacity: 0, x: -50, y: -50, rotate: -10 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: -6 }}
                transition={{ delay: 0.5, duration: 1, type: "spring" }}
                className="absolute top-4 left-0 w-48 aspect-square overflow-hidden rounded-[2rem] shadow-2xl border-4 border-background z-10 group"
              >
                <Image src="/rooms/room1.jpg" alt="Cozy room" fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="200px" />
              </motion.div>

              {/* Bottom Right Floating Image */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: 50, rotate: 10 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 6 }}
                transition={{ delay: 0.7, duration: 1, type: "spring" }}
                className="absolute bottom-0 right-4 w-56 aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl border-4 border-background z-30 group"
              >
                <Image src="/rooms/room3.jpg" alt="Modern flat" fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="250px" />
                <div className="absolute top-3 right-3 z-20">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-xl">
                    <Heart className="h-4 w-4" />
                  </span>
                </div>
              </motion.div>

              {/* Floating Profile/Review Card */}
              <motion.div
                initial={{ opacity: 0, x: 50, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-16 -right-6 w-56 overflow-hidden rounded-3xl border border-border/40 bg-background/90 backdrop-blur-2xl shadow-2xl z-40 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-sm">
                    SK
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-3 w-3 fill-amber-500" />
                      <Star className="h-3 w-3 fill-amber-500" />
                      <Star className="h-3 w-3 fill-amber-500" />
                      <Star className="h-3 w-3 fill-amber-500" />
                      <Star className="h-3 w-3 fill-amber-500" />
                    </div>
                    <p className="text-xs font-medium text-foreground mt-0.5">Found in 2 days!</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Verified Host Card */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 30 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: 1.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-16 -left-8 overflow-hidden rounded-full border border-border/40 bg-background/90 backdrop-blur-xl shadow-xl z-40 px-4 py-2.5 flex items-center gap-2"
              >
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-sm font-bold text-foreground">Verified Host</span>
              </motion.div>

            </motion.div>
          </div>

          {/* Mobile Room Showcase (horizontal scroll) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 flex gap-4 overflow-x-auto pb-4 lg:hidden scrollbar-hide"
          >
            {showcaseRooms.map((room) => (
              <div key={room.label} className="min-w-[240px] overflow-hidden rounded-3xl border border-border/40 bg-card shadow-lg">
                <div className="relative h-40">
                  <Image src={room.src} alt={room.label} fill className="object-cover" sizes="240px" />
                </div>
                <div className="px-4 py-3">
                  <p className="text-sm font-bold text-foreground">{room.label}</p>
                  <p className="text-xs text-primary font-bold mt-1">{room.price}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FLOATING STATS (Glassmorphism)
      ═══════════════════════════════════════════ */}
      <section className="relative z-20 -mt-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1000px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40 rounded-3xl overflow-hidden backdrop-blur-2xl shadow-2xl border border-border/60"
          >
            {[
              { value: "10K+", label: "Active Listings", glow: "text-blue-500" },
              { value: "5K+", label: "Happy Tenants", glow: "text-green-500" },
              { value: "500+", label: "Verified Hosts", glow: "text-purple-500" },
              { value: "50+", label: "Cities Covered", glow: "text-orange-500" },
            ].map((stat, i) => (
              <motion.div key={stat.label} custom={i} variants={fadeUp} className="bg-background/80 p-8 text-center backdrop-blur-xl">
                <p className={`text-4xl font-black tracking-tight ${stat.glow} drop-shadow-sm`}>{stat.value}</p>
                <p className="mt-2 text-sm font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PREMIUM FEATURES (Bento Grid)
      ═══════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 relative">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl mb-4">
              Designed for a better living experience
            </h2>
            <p className="text-lg text-muted-foreground">
              We've completely reimagined how you find and rent spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative overflow-hidden rounded-[2rem] p-8 border ${feat.border} ${feat.bg} shadow-lg transition-transform hover:-translate-y-1 ${feat.colSpan}`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background shadow-sm border border-border/50 mb-6">
                  <feat.icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{feat.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed max-w-md">
                  {feat.desc}
                </p>
                
                {/* Decorative blob */}
                {i === 0 && (
                  <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-primary/10 rounded-full blur-3xl" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          MASSIVE CTA
      ═══════════════════════════════════════════ */}
      <section className="pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <motion.div
            className="relative overflow-hidden rounded-[3rem] bg-foreground text-background p-12 text-center sm:p-24 shadow-2xl shadow-foreground/20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Animated Glows */}
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/40 blur-[128px]" />
            <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-500/30 blur-[128px]" />

            <h2 className="relative text-4xl font-black tracking-tight sm:text-6xl max-w-3xl mx-auto leading-tight">
              Ready to find your next home?
            </h2>
            <p className="relative mt-6 text-xl text-background/70 max-w-xl mx-auto font-medium">
              Join thousands of tenants and landlords experiencing the future of renting.
            </p>
            <div className="relative mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/explore"
                className="group flex h-16 items-center gap-3 rounded-full bg-primary px-10 text-lg font-bold text-primary-foreground shadow-[0_0_40px_rgb(var(--primary)/0.4)] transition-all hover:scale-105 active:scale-95"
                id="cta-explore"
              >
                Start Exploring
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/landlord"
                className="flex h-16 items-center gap-3 rounded-full border-2 border-background/20 px-10 text-lg font-bold text-background transition-all hover:bg-background/10 active:scale-95"
                id="cta-list-property"
              >
                List Your Property
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
