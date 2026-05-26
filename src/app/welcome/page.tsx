"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Shield, Sparkles } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function WelcomePage() {
  return (
    <div className="relative flex min-h-dvh flex-col bg-background overflow-hidden">
      {/* ─── Hero Image Section ─── */}
      <div className="relative w-full flex-1 min-h-[45dvh] md:min-h-[55dvh]">
        {/* Image */}
        <Image
          src="/auth-hero.png"
          alt="Beautiful modern apartment interior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />

        {/* Top branding bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 pt-6 sm:px-8 sm:pt-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 backdrop-blur-sm shadow-lg overflow-hidden">
              <Image
                src="/logo.png"
                alt="Roomeo"
                width={44}
                height={44}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white drop-shadow-lg">
              ROOMEO
            </span>
          </div>
        </motion.div>

        {/* Floating badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-24 right-6 sm:top-28 sm:right-10 z-10"
        >
          <div className="flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 shadow-xl text-sm font-bold text-foreground">
            <Shield className="h-4 w-4 text-green-500" />
            Verified Listings
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-40 left-6 sm:top-44 sm:left-10 z-10"
        >
          <div className="flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-4 py-2 shadow-xl text-sm font-bold text-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            Map-First Discovery
          </div>
        </motion.div>
      </div>

      {/* ─── Bottom Content Card ─── */}
      <motion.div
        className="relative z-20 -mt-16 rounded-t-[2.5rem] bg-background px-6 pb-10 pt-10 sm:px-10 md:-mt-24"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        {/* Grab handle */}
        <motion.div
          custom={0}
          variants={fadeUp}
          className="mx-auto mb-8 h-1.5 w-12 rounded-full bg-border/60"
        />

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          className="text-[2rem] font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-[2.5rem] md:text-5xl"
        >
          Find Your Next Home,
          <br />
          <span className="bg-gradient-to-r from-primary via-[#0053db] to-primary bg-clip-text text-transparent">
            Instantly.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2}
          variants={fadeUp}
          className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Discover premium rooms and flats near you with live map discovery and smart filters.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          custom={3}
          variants={fadeUp}
          className="mt-8 flex flex-wrap gap-3"
        >
          {[
            { icon: MapPin, label: "Live Map Search" },
            { icon: Sparkles, label: "Smart Filters" },
            { icon: Shield, label: "Verified Rooms" },
          ].map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-4 py-2 text-sm font-semibold text-foreground"
            >
              <item.icon className="h-4 w-4 text-primary" />
              {item.label}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          custom={4}
          variants={fadeUp}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/signup"
            className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-primary px-8 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-[0.98] active:scale-95 sm:w-auto"
            id="welcome-get-started"
          >
            Get Started
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Sign In Link */}
        <motion.p
          custom={5}
          variants={fadeUp}
          className="mt-6 text-center text-sm text-muted-foreground sm:text-left"
        >
          Already a member?{" "}
          <Link
            href="/login"
            className="font-bold text-primary hover:underline underline-offset-4 transition-colors"
            id="welcome-sign-in"
          >
            Sign In
          </Link>
        </motion.p>

        {/* Trust footer */}
        <motion.div
          custom={6}
          variants={fadeUp}
          className="mt-12 flex items-center justify-center gap-4 border-t border-border/40 pt-8 text-xs text-muted-foreground sm:justify-start"
        >
          <span className="font-semibold">Find your perfect space. Effortlessly.</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
