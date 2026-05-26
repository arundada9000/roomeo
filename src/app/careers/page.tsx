"use client";

import Link from "next/link";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight, Zap, Heart, Users, Code2, Rocket, Sparkles, Send, Globe, Coffee } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const openings = [
  {
    title: "Senior Frontend Engineer",
    team: "Engineering",
    location: "Kathmandu / Remote",
    type: "Full-time",
    desc: "Build and ship premium user experiences across our tenant and landlord platforms using Next.js, React, and TypeScript.",
    color: "border-blue-500/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    title: "Product Designer",
    team: "Design",
    location: "Kathmandu / Remote",
    type: "Full-time",
    desc: "Design intuitive, beautiful interfaces that help thousands of users find their next home effortlessly.",
    color: "border-purple-500/20",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
  },
  {
    title: "Backend Engineer",
    team: "Engineering",
    location: "Remote",
    type: "Full-time",
    desc: "Architect and scale our APIs, database systems, and real-time features using Node.js, Prisma, and PostgreSQL.",
    color: "border-green-500/20",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500",
  },
  {
    title: "Growth & Marketing Lead",
    team: "Marketing",
    location: "Butwal / Remote",
    type: "Full-time",
    desc: "Drive user acquisition, brand awareness, and community growth across Nepal's major cities.",
    color: "border-amber-500/20",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
  },
];

const perks = [
  { icon: Zap, title: "Fast-Paced Culture", desc: "Ship features weekly. No bureaucracy, just building.", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  { icon: Heart, title: "Health Benefits", desc: "Comprehensive health insurance for you and your family.", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/20" },
  { icon: Globe, title: "Remote-First", desc: "Work from anywhere in Nepal. Office available in Butwal.", color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  { icon: Code2, title: "Latest Tech Stack", desc: "Next.js, TypeScript, Prisma, PostgreSQL — the best tools.", color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
  { icon: Users, title: "Small Team, Big Impact", desc: "Your work directly affects thousands of users every day.", color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { icon: Coffee, title: "Flexible Hours", desc: "We care about output, not hours clocked. Set your own schedule.", color: "text-cyan-500", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
];

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">

        {/* ─── Premium Hero ─── */}
        <section className="relative overflow-hidden py-28 sm:py-36 lg:py-44">
          <div className="absolute inset-0 -z-10">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" as const }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-primary/[0.07] blur-[160px]"
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
              className="absolute right-1/3 top-1/4 h-[350px] w-[350px] rounded-full bg-purple-500/[0.05] blur-[120px]"
            />
          </div>

          {/* Floating elements */}
          <motion.div
            animate={{ y: [-12, 12, -12] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
            className="absolute top-24 left-[10%] hidden lg:block"
          >
            <div className="h-16 w-16 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm rotate-12 flex items-center justify-center shadow-xl shadow-primary/10">
              <Code2 className="h-7 w-7 text-primary/60" />
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
            className="absolute top-32 right-[12%] hidden lg:block"
          >
            <div className="h-14 w-14 rounded-full border border-purple-500/20 bg-purple-500/5 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <Rocket className="h-6 w-6 text-purple-500/60" />
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" as const }}
            className="absolute bottom-28 right-[8%] hidden lg:block"
          >
            <div className="h-12 w-12 rounded-xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm -rotate-6 flex items-center justify-center shadow-xl">
              <Zap className="h-5 w-5 text-amber-500/60" />
            </div>
          </motion.div>

          {/* Floating hiring count card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute top-28 right-[6%] hidden xl:block"
          >
            <motion.div animate={{ y: [-8, 8, -8] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}>
              <div className="rounded-2xl border border-border/40 bg-background/80 backdrop-blur-xl shadow-2xl p-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-lg font-black text-foreground">{openings.length}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Open Roles</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

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
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.span>
              We&apos;re Hiring
            </motion.span>

            <motion.h1 variants={fadeIn} className="text-5xl font-black tracking-tight text-foreground sm:text-7xl lg:text-8xl leading-[0.95]">
              Build the future of
              <br />
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
                renting in Nepal.
              </span>
            </motion.h1>

            <motion.p variants={fadeIn} className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Join a passionate team that&apos;s transforming how people find homes. We&apos;re small, scrappy,
              and shipping fast — and we need talented people to grow with us.
            </motion.p>

            <motion.div variants={fadeIn} className="mt-10">
              <a
                href="#positions"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-[0_8px_30px_rgb(var(--primary)/0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgb(var(--primary)/0.4)] active:scale-95"
              >
                View Open Positions
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ─── Perks (Bento grid) ─── */}
        <section className="py-28 sm:py-36 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-secondary/20" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8"
          >
            <div className="text-center mb-16">
              <motion.span variants={fadeIn} className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-4 py-1.5 text-sm font-semibold text-rose-500 mb-6">
                <Heart className="h-4 w-4" />
                Why Roomeo
              </motion.span>
              <motion.h2 variants={fadeIn} className="text-3xl font-black tracking-tight text-foreground sm:text-5xl mb-4">
                Why Work at Roomeo?
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-muted-foreground max-w-xl mx-auto">
                We take care of our team so they can take care of our users.
              </motion.p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {perks.map((perk) => (
                <motion.div
                  key={perk.title}
                  variants={fadeIn}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`rounded-3xl border ${perk.border} bg-background p-8 shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${perk.bg} mb-6`}
                  >
                    <perk.icon className={`h-6 w-6 ${perk.color}`} />
                  </motion.div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{perk.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{perk.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── Open Positions ─── */}
        <section id="positions" className="py-28 sm:py-36 scroll-mt-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8"
          >
            <div className="text-center mb-16">
              <motion.span variants={fadeIn} className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-500 mb-6">
                <Briefcase className="h-4 w-4" />
                Open Roles
              </motion.span>
              <motion.h2 variants={fadeIn} className="text-3xl font-black tracking-tight text-foreground sm:text-5xl mb-4">
                Open Positions
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-muted-foreground max-w-xl mx-auto">
                Don&apos;t see a role that fits? Send us your resume at{" "}
                <span className="font-bold text-primary">careers@roomeo.com</span>
              </motion.p>
            </div>

            <div className="space-y-5">
              {openings.map((job) => (
                <motion.div
                  key={job.title}
                  variants={fadeIn}
                  whileHover={{ x: 6, scale: 1.01 }}
                  className={`group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border ${job.color} bg-card p-6 sm:p-8 shadow-sm transition-all hover:shadow-xl`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${job.iconBg}`}>
                        <Briefcase className={`h-5 w-5 ${job.iconColor}`} />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">{job.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 pl-[52px]">{job.desc}</p>
                    <div className="flex flex-wrap gap-2 pl-[52px]">
                      <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-muted-foreground">
                        <Briefcase className="h-3 w-3" /> {job.team}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-bold text-muted-foreground">
                        <Clock className="h-3 w-3" /> {job.type}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md shadow-primary/10 shrink-0"
                  >
                    <Send className="h-4 w-4" />
                    Apply Now
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            className="relative mx-auto max-w-[1000px] overflow-hidden rounded-[3rem] bg-foreground text-background p-12 text-center sm:p-20 shadow-2xl"
          >
            <motion.div
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
              className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/40 blur-[128px]"
            />
            <motion.div
              animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" as const }}
              className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-purple-500/30 blur-[128px]"
            />

            <h2 className="relative text-3xl font-black tracking-tight sm:text-5xl max-w-2xl mx-auto leading-tight">
              Ready to make an impact?
            </h2>
            <p className="relative mt-6 text-lg text-background/70 max-w-md mx-auto font-medium">
              Help us build the platform that&apos;s changing how Nepal finds home.
            </p>
            <div className="relative mt-10">
              <a
                href="mailto:careers@roomeo.com"
                className="group inline-flex h-14 items-center gap-3 rounded-full bg-primary px-8 text-base font-bold text-primary-foreground shadow-[0_0_40px_rgb(var(--primary)/0.4)] transition-all hover:scale-105 active:scale-95"
              >
                <Send className="h-5 w-5" />
                Send Your Resume
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
