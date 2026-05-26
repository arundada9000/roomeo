"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  Search,
  Shield,
  Zap,
  SlidersHorizontal,
  Map,
  Star,
  ArrowRight,
  Building2,
  Users,
  CheckCircle2,
  Wifi,
  Car,
  Bath,
  Home,
} from "lucide-react";

/* ─── Animation Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ─── Feature Cards Data ─── */
const features = [
  {
    icon: Map,
    title: "Map-First Discovery",
    description: "Explore rooms on an interactive live map. See what's available around you in real time.",
  },
  {
    icon: Zap,
    title: "Instant Search",
    description: "Lightning-fast filtering. Find the perfect room in seconds with smart, powerful filters.",
  },
  {
    icon: Shield,
    title: "Verified Listings",
    description: "Every listing is reviewed and verified by our team before going live. No scams, no fakes.",
  },
  {
    icon: SlidersHorizontal,
    title: "Advanced Filters",
    description: "Filter by price, amenities, room type, distance, and 20+ other criteria to find your match.",
  },
  {
    icon: Building2,
    title: "Detailed Listings",
    description: "High-quality photos, videos, amenity lists, pricing breakdowns, and neighborhood insights.",
  },
  {
    icon: Users,
    title: "Direct Contact",
    description: "Connect directly with verified landlords. No middlemen, no hidden fees.",
  },
];

/* ─── How It Works Steps ─── */
const steps = [
  {
    step: "01",
    title: "Search Nearby",
    description: "Open the map or type your area. Roomeo detects your location and shows rooms around you.",
  },
  {
    step: "02",
    title: "Filter & Compare",
    description: "Apply smart filters — price, amenities, room type, distance — to narrow down your options.",
  },
  {
    step: "03",
    title: "Contact & Move In",
    description: "Found the one? Contact the landlord directly, schedule a visit, and move in.",
  },
];

/* ─── Stats ─── */
const stats = [
  { value: "10K+", label: "Active Listings" },
  { value: "5K+", label: "Happy Tenants" },
  { value: "500+", label: "Verified Landlords" },
  { value: "50+", label: "Cities" },
];

/* ─── Sample Amenity Chips ─── */
const sampleAmenities = [
  { icon: Wifi, label: "WiFi" },
  { icon: Car, label: "Parking" },
  { icon: Bath, label: "Attached Bath" },
  { icon: Home, label: "Furnished" },
];

export default function LandingContent() {
  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.06] via-background to-background" />
          <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/[0.08] blur-[120px]" />
          <div className="absolute right-0 top-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-accent/[0.06] blur-[100px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {/* Badge */}
            <motion.div custom={0} variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.08] px-4 py-1.5 text-sm font-medium text-primary">
                <MapPin className="h-3.5 w-3.5" />
                Map-first room discovery
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="mt-8 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Find your next room{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                nearby
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              custom={2}
              variants={fadeUp}
              className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl"
            >
              Explore verified rooms and flats around you with live maps, smart
              filters, and real-time availability.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              custom={3}
              variants={fadeUp}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Link
                href="/explore"
                className="group flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-[#1D4ED8] hover:shadow-xl hover:shadow-primary/30"
                id="hero-cta-find"
              >
                <Search className="h-4.5 w-4.5" />
                Find Rooms
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/landlord"
                className="flex h-12 items-center gap-2 rounded-full border border-border px-7 text-base font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-primary/[0.04]"
                id="hero-cta-list"
              >
                <Building2 className="h-4.5 w-4.5 text-muted-foreground" />
                List Your Property
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              custom={4}
              variants={fadeUp}
              className="mt-12 flex items-center justify-center gap-6 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-roomeo-success" />
                Verified listings
              </span>
              <span className="hidden h-4 w-px bg-border sm:block" />
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-roomeo-warning" />
                4.8 rating
              </span>
              <span className="hidden h-4 w-px bg-border sm:block" />
              <span className="hidden items-center gap-1.5 sm:flex">
                <Zap className="h-4 w-4 text-primary" />
                Instant results
              </span>
            </motion.div>
          </motion.div>

          {/* ─── Hero Search Preview Card ─── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="mx-auto mt-16 max-w-2xl"
          >
            <div className="rounded-2xl border border-border/80 bg-card p-2 shadow-xl shadow-black/[0.04]">
              <div className="flex items-center gap-3 rounded-xl bg-secondary/50 px-4 py-3.5">
                <Search className="h-5 w-5 text-muted-foreground" />
                <span className="text-base text-muted-foreground">
                  Search by area, city, or landmark...
                </span>
                <div className="ml-auto flex items-center gap-2">
                  <span className="hidden rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-muted-foreground sm:block">
                    <MapPin className="mr-1 inline-block h-3 w-3" />
                    Near me
                  </span>
                </div>
              </div>
              {/* Amenity Chips */}
              <div className="mt-2 flex flex-wrap gap-2 px-2 pb-2">
                {sampleAmenities.map((a) => (
                  <span
                    key={a.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground"
                  >
                    <a.icon className="h-3.5 w-3.5" />
                    {a.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS SECTION
      ═══════════════════════════════════════════ */}
      <section className="border-y border-border/60 bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={fadeUp}
                className="text-center"
              >
                <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURES SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28" id="features">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.span
              custom={0}
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-wider text-primary"
            >
              Why Roomeo
            </motion.span>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Everything you need to find your perfect space
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="mt-4 text-lg text-muted-foreground"
            >
              Roomeo combines spatial intelligence, verified data, and beautiful
              design to make room hunting effortless.
            </motion.p>
          </motion.div>

          <motion.div
            className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                variants={fadeUp}
                className="group relative rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.04]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/[0.08] text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          HOW IT WORKS SECTION
      ═══════════════════════════════════════════ */}
      <section className="border-t border-border/60 bg-secondary/30 py-20 sm:py-28" id="how-it-works">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            <motion.span
              custom={0}
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-wider text-primary"
            >
              How It Works
            </motion.span>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Find your room in 3 simple steps
            </motion.h2>
          </motion.div>

          <motion.div
            className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                custom={i}
                variants={fadeUp}
                className="relative text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-lg font-bold shadow-lg shadow-primary/20">
                  {step.step}
                </div>
                {/* Connector line (hidden on last item and mobile) */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[calc(50%+40px)] top-7 hidden h-px w-[calc(100%-80px)] bg-gradient-to-r from-primary/30 to-transparent md:block" />
                )}
                <h3 className="mt-6 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-accent p-10 text-center sm:p-16"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          >
            {/* Decorative circles */}
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

            <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to find your perfect space?
            </h2>
            <p className="relative mt-4 text-lg text-white/80">
              Join thousands of people who found their ideal room with Roomeo.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/explore"
                className="group flex h-12 items-center gap-2 rounded-full bg-white px-7 text-base font-semibold text-primary shadow-lg transition-all hover:shadow-xl"
                id="cta-explore"
              >
                <Search className="h-4.5 w-4.5" />
                Start Exploring
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/landlord"
                className="flex h-12 items-center gap-2 rounded-full border border-white/30 px-7 text-base font-semibold text-white transition-all hover:bg-white/10"
                id="cta-list-property"
              >
                List Your Property
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
