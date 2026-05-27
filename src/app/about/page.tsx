"use client";

import Link from "next/link";
import { Shield, Users, MapPin, Zap, Heart, ArrowRight, Sparkles, Building2, Star, CheckCircle2, Globe, Rocket, Target, Eye } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

const values = [
  {
    icon: Shield,
    title: "Trust & Safety",
    desc: "Every landlord undergoes KYC verification. Every listing is manually reviewed before going live.",
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    glow: "shadow-green-500/5",
  },
  {
    icon: Zap,
    title: "Speed First",
    desc: "We obsess over performance. From search to booking, every interaction is designed to be instant.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    glow: "shadow-amber-500/5",
  },
  {
    icon: Heart,
    title: "Tenant-Centric",
    desc: "We build for tenants first. Zero brokerage, transparent pricing, and honest reviews - always.",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    glow: "shadow-rose-500/5",
  },
  {
    icon: MapPin,
    title: "Hyperlocal",
    desc: "We don't just list rooms - we map them. Interactive maps help you find the perfect neighborhood.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    glow: "shadow-blue-500/5",
  },
];

const stats = [
  { value: "10K+", label: "Active Listings", icon: Building2, color: "text-blue-500" },
  { value: "5K+", label: "Happy Tenants", icon: Users, color: "text-green-500" },
  { value: "500+", label: "Verified Hosts", icon: CheckCircle2, color: "text-purple-500" },
  { value: "50+", label: "Cities", icon: Globe, color: "text-orange-500" },
];

const team = [
  { name: "Arun Neupane", role: "Founder & CEO", initials: "AN", color: "from-primary to-blue-600" },
  { name: "Roomeo Team", role: "Engineering", initials: "RT", color: "from-blue-600 to-cyan-500" },
  { name: "Design Studio", role: "Product Design", initials: "DS", color: "from-purple-600 to-pink-500" },
];

const timeline = [
  { year: "2025", title: "The Idea", desc: "Frustrated by the rental experience in Nepal, Arun started sketching Roomeo.", icon: Target },
  { year: "2026", title: "Launch", desc: "Roomeo goes live with interactive maps, verified listings, and zero brokerage.", icon: Rocket },
  { year: "2026+", title: "Growth", desc: "Expanding to every major city in Nepal. Building the future of renting.", icon: Sparkles },
];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const floatAnimation = {
  y: [-12, 12, -12],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
};

const floatAnimationSlow = {
  y: [-8, 8, -8],
  transition: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
};

const pulseGlow = {
  scale: [1, 1.05, 1],
  opacity: [0.5, 0.8, 0.5],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">

        {/* ═══════════════════════════════════════════
            PREMIUM HERO SECTION
        ═══════════════════════════════════════════ */}
        <section className="relative overflow-hidden py-28 sm:py-36 lg:py-44">
          {/* Animated background effects */}
          <div className="absolute inset-0 -z-10">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" as const }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-primary/[0.07] blur-[160px]"
            />
            <motion.div
              animate={pulseGlow}
              className="absolute right-1/4 top-1/4 h-[400px] w-[400px] rounded-full bg-blue-500/[0.05] blur-[120px]"
            />
            <motion.div
              animate={pulseGlow}
              className="absolute left-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-purple-500/[0.04] blur-[100px]"
            />
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--foreground-rgb,0,0,0),0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--foreground-rgb,0,0,0),0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          {/* Floating geometric elements */}
          <motion.div
            animate={floatAnimation}
            className="absolute top-20 left-[10%] hidden lg:block"
          >
            <div className="h-16 w-16 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm rotate-12 flex items-center justify-center shadow-xl shadow-primary/10">
              <Building2 className="h-7 w-7 text-primary/60" />
            </div>
          </motion.div>

          <motion.div
            animate={floatAnimationSlow}
            className="absolute top-32 right-[12%] hidden lg:block"
          >
            <div className="h-14 w-14 rounded-full border border-green-500/20 bg-green-500/5 backdrop-blur-sm flex items-center justify-center shadow-xl shadow-green-500/10">
              <Shield className="h-6 w-6 text-green-500/60" />
            </div>
          </motion.div>

          <motion.div
            animate={floatAnimation}
            className="absolute bottom-32 left-[15%] hidden lg:block"
          >
            <div className="h-12 w-12 rounded-xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm -rotate-6 flex items-center justify-center shadow-xl shadow-amber-500/10">
              <Star className="h-5 w-5 text-amber-500/60" />
            </div>
          </motion.div>

          <motion.div
            animate={floatAnimationSlow}
            className="absolute bottom-24 right-[8%] hidden lg:block"
          >
            <div className="h-20 w-20 rounded-3xl border border-purple-500/15 bg-purple-500/5 backdrop-blur-sm rotate-6 flex items-center justify-center shadow-xl shadow-purple-500/10">
              <Heart className="h-8 w-8 text-purple-500/50" />
            </div>
          </motion.div>

          {/* Floating card - review snippet */}
          <motion.div
            initial={{ opacity: 0, x: 60, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute top-24 right-[6%] hidden xl:block"
          >
            <motion.div animate={floatAnimationSlow}>
              <div className="rounded-2xl border border-border/40 bg-background/80 backdrop-blur-xl shadow-2xl p-4 w-56">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">SK</div>
                  <div>
                    <p className="text-xs font-bold text-foreground">Suresh K.</p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-2.5 w-2.5 text-amber-500 fill-amber-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">&quot;Found my room in 2 days. No brokerage. Amazing!&quot;</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating card - stats snippet */}
          <motion.div
            initial={{ opacity: 0, x: -60, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute bottom-28 left-[5%] hidden xl:block"
          >
            <motion.div animate={floatAnimation}>
              <div className="rounded-2xl border border-border/40 bg-background/80 backdrop-blur-xl shadow-2xl p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-black text-foreground">500+</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Verified Hosts</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center relative z-10"
          >
            <motion.span
              variants={fadeIn}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-5 py-2 text-sm font-semibold text-primary mb-8 shadow-lg shadow-primary/5 backdrop-blur-sm"
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.span>
              Our Story
            </motion.span>

            <motion.h1
              variants={fadeIn}
              className="text-5xl font-black tracking-tight text-foreground sm:text-7xl lg:text-8xl leading-[0.95]"
            >
              Rethinking how
              <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Nepal finds home.
                </span>
                {/* Animated underline */}
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
                  className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-primary/60 via-blue-500/60 to-purple-600/60 rounded-full origin-left"
                />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed"
            >
              Roomeo was born from a simple frustration: finding a room in Nepal shouldn&apos;t require calling
              dozens of brokers, paying hidden fees, or settling for unseen spaces. We&apos;re building
              the platform we wished existed.
            </motion.p>

            <motion.div variants={fadeIn} className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/explore"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-[0_8px_30px_rgb(var(--primary)/0.3)] transition-all duration-300 hover:shadow-[0_12px_40px_rgb(var(--primary)/0.4)] hover:-translate-y-0.5 active:scale-95"
              >
                Explore Rooms
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/careers"
                className="inline-flex h-14 items-center gap-3 rounded-full border-2 border-border bg-card px-8 text-base font-bold text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-primary/[0.02] active:scale-95 shadow-sm"
              >
                Join Our Team
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════
            STATS (Glassmorphism floating bar)
        ═══════════════════════════════════════════ */}
        <section className="relative z-20 -mt-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1000px]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
              className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/40 rounded-3xl overflow-hidden backdrop-blur-2xl shadow-2xl border border-border/60"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeIn}
                  whileHover={{ scale: 1.02 }}
                  className="bg-background/80 p-8 text-center backdrop-blur-xl group cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex justify-center mb-3"
                  >
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </motion.div>
                  <p className={`text-3xl sm:text-4xl font-black tracking-tight ${stat.color}`}>{stat.value}</p>
                  <p className="mt-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            MISSION SECTION
        ═══════════════════════════════════════════ */}
        <section className="py-28 sm:py-36">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={stagger}
              >
                <motion.span variants={fadeIn} className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-500 mb-6">
                  <Target className="h-4 w-4" />
                  Our Mission
                </motion.span>
                <motion.h2 variants={fadeIn} className="text-3xl font-black tracking-tight text-foreground sm:text-5xl mb-8 leading-tight">
                  Everyone deserves a safe,{" "}
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                    affordable
                  </span>{" "}
                  place to live.
                </motion.h2>
                <motion.p variants={fadeIn} className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Roomeo connects tenants directly with verified landlords - cutting out middlemen,
                  eliminating brokerage fees, and making the entire process transparent from search
                  to move-in.
                </motion.p>
                <motion.p variants={fadeIn} className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Whether you&apos;re a student arriving in Kathmandu for the first time, a young professional
                  relocating to Pokhara, or a family looking for a bigger space - Roomeo makes it effortless.
                </motion.p>
                <motion.div variants={fadeIn}>
                  <Link
                    href="/explore"
                    className="group inline-flex items-center gap-2 text-sm font-bold text-primary"
                  >
                    Start exploring now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </motion.div>

              {/* Timeline */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={stagger}
                className="space-y-6"
              >
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.year}
                    variants={fadeIn}
                    whileHover={{ x: 8 }}
                    className="group flex gap-5 rounded-3xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/30"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <motion.div
                        whileHover={{ rotate: 15, scale: 1.15 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 shrink-0"
                      >
                        <item.icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      {i < timeline.length - 1 && (
                        <div className="w-px flex-1 bg-border/50" />
                      )}
                    </div>
                    <div className="pt-1">
                      <span className="text-xs font-black text-primary uppercase tracking-widest">{item.year}</span>
                      <h3 className="text-lg font-bold text-foreground mt-1 mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            VALUES SECTION (Bento-style)
        ═══════════════════════════════════════════ */}
        <section className="py-28 sm:py-36 relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 -z-10 bg-secondary/20" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="text-center mb-16"
            >
              <motion.span variants={fadeIn} className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-4 py-1.5 text-sm font-semibold text-rose-500 mb-6">
                <Eye className="h-4 w-4" />
                Our Values
              </motion.span>
              <motion.h2 variants={fadeIn} className="text-3xl font-black tracking-tight text-foreground sm:text-5xl mb-4">
                What We Stand For
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-muted-foreground max-w-xl mx-auto">
                These aren&apos;t just words on a wall. They shape every feature we build and every decision we make.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {values.map((v) => (
                <motion.div
                  key={v.title}
                  variants={fadeIn}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`group rounded-3xl border ${v.border} bg-background p-8 shadow-lg ${v.glow} hover:shadow-xl transition-shadow`}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${v.bg} mb-6`}
                  >
                    <v.icon className={`h-7 w-7 ${v.color}`} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            TEAM SECTION
        ═══════════════════════════════════════════ */}
        <section className="py-28 sm:py-36">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="text-center mb-16"
            >
              <motion.span variants={fadeIn} className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-1.5 text-sm font-semibold text-purple-500 mb-6">
                <Users className="h-4 w-4" />
                Our Team
              </motion.span>
              <motion.h2 variants={fadeIn} className="text-3xl font-black tracking-tight text-foreground sm:text-5xl mb-4">
                The People Behind Roomeo
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-muted-foreground max-w-xl mx-auto">
                A small team with big ambitions, working from Nepal to transform the rental experience.
              </motion.p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="flex flex-wrap justify-center gap-8"
            >
              {team.map((member) => (
                <motion.div
                  key={member.name}
                  variants={fadeIn}
                  whileHover={{ y: -12, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex flex-col items-center rounded-3xl border border-border/50 bg-card p-10 shadow-lg hover:shadow-xl transition-shadow w-72"
                >
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    className={`flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${member.color} text-white text-3xl font-black mb-6 shadow-xl`}
                  >
                    {member.initials}
                  </motion.div>
                  <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                  <p className="text-sm font-semibold text-muted-foreground mt-1">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            CTA SECTION (Dark, immersive)
        ═══════════════════════════════════════════ */}
        <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[3rem] bg-foreground text-background p-12 text-center sm:p-24 shadow-2xl"
          >
            {/* Animated glows */}
            <motion.div
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
              className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/40 blur-[128px]"
            />
            <motion.div
              animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as const }}
              className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-blue-500/30 blur-[128px]"
            />

            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-12 right-12 opacity-20"
            >
              <Sparkles className="h-8 w-8" />
            </motion.div>

            <h2 className="relative text-4xl font-black tracking-tight sm:text-6xl max-w-3xl mx-auto leading-tight">
              Join us in reshaping rentals.
            </h2>
            <p className="relative mt-6 text-xl text-background/70 max-w-xl mx-auto font-medium">
              Whether you&apos;re looking for a room or listing one - Roomeo is designed for you.
            </p>
            <div className="relative mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/explore"
                className="group flex h-16 items-center gap-3 rounded-full bg-primary px-10 text-lg font-bold text-primary-foreground shadow-[0_0_40px_rgb(var(--primary)/0.4)] transition-all hover:scale-105 active:scale-95"
              >
                Start Exploring
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/landlord"
                className="flex h-16 items-center gap-3 rounded-full border-2 border-background/20 px-10 text-lg font-bold text-background transition-all hover:bg-background/10 active:scale-95"
              >
                List Your Property
              </Link>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
