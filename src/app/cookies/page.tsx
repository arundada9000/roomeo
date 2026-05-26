"use client";

import Link from "next/link";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { motion } from "framer-motion";
import { Cookie, Shield, Settings, ArrowRight, BarChart3, Globe, Trash2, ToggleLeft, Sparkles, Info } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const cookieTypes = [
  {
    icon: Shield,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    title: "Essential Cookies",
    required: true,
    desc: "Required for basic functionality like authentication, session management, and security. These cannot be disabled as they are necessary for the site to function.",
  },
  {
    icon: Settings,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    title: "Preference Cookies",
    required: false,
    desc: "These remember your preferences such as language, theme (dark/light mode), and location settings so you don't have to re-enter them each time.",
  },
  {
    icon: BarChart3,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    title: "Analytics Cookies",
    required: false,
    desc: "Help us understand how visitors use our platform — which pages are most popular, where users encounter issues, and how we can improve. All data is anonymized.",
  },
];

const thirdParty = [
  { name: "OpenStreetMap / Leaflet", purpose: "Interactive map rendering", icon: Globe },
  { name: "better-auth", purpose: "Secure authentication sessions", icon: Shield },
  { name: "Vercel Analytics", purpose: "Anonymous usage statistics", icon: BarChart3 },
];

const managementSteps = [
  "View and delete existing cookies",
  "Block third-party cookies",
  "Block cookies from specific sites",
  "Block all cookies",
  "Delete all cookies when you close your browser",
];

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">

        {/* ─── Premium Hero ─── */}
        <section className="relative overflow-hidden py-28 sm:py-36">
          <div className="absolute inset-0 -z-10">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: "easeOut" as const }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-amber-500/[0.06] blur-[160px]"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
              className="absolute right-1/4 top-1/3 h-[250px] w-[250px] rounded-full bg-orange-500/[0.04] blur-[100px]"
            />
          </div>

          {/* Floating decorative cookies */}
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
            className="absolute top-24 right-[12%] hidden lg:block"
          >
            <div className="h-14 w-14 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <Cookie className="h-6 w-6 text-amber-500/60" />
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [-8, 8, -8], rotate: [0, -8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" as const }}
            className="absolute bottom-32 left-[10%] hidden lg:block"
          >
            <div className="h-12 w-12 rounded-xl border border-purple-500/20 bg-purple-500/5 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <Settings className="h-5 w-5 text-purple-500/60" />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8 text-center relative z-10"
          >
            <motion.div variants={fadeIn} className="flex justify-center mb-8">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }}
                className="flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-500/10 border border-amber-500/20 shadow-xl shadow-amber-500/10"
              >
                <Cookie className="h-10 w-10 text-amber-500" />
              </motion.div>
            </motion.div>
            <motion.span variants={fadeIn} className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-sm font-semibold text-amber-600 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Minimal & Transparent
            </motion.span>
            <motion.h1 variants={fadeIn} className="text-4xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl mb-6 leading-[0.95]">
              Cookie{" "}
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Policy
              </span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
              We use cookies thoughtfully and sparingly to give you the best experience.
              Last updated: May 1, 2026
            </motion.p>
          </motion.div>
        </section>

        {/* ─── Content ─── */}
        <section className="pb-28 sm:pb-36">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8"
          >
            <div className="space-y-8">

              {/* What Are Cookies */}
              <motion.div
                variants={fadeIn}
                className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6 sm:p-8 shadow-sm flex items-start gap-4"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }}
                >
                  <Info className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">What Are Cookies?</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Cookies are small text files stored on your device when you visit a website. They help websites
                    remember your preferences, keep you logged in, and understand how you interact with the platform.
                  </p>
                </div>
              </motion.div>

              {/* Cookie Types */}
              <motion.div variants={fadeIn}>
                <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3">
                  <ToggleLeft className="h-6 w-6 text-primary" />
                  Types of Cookies We Use
                </h2>
                <div className="space-y-4">
                  {cookieTypes.map((cookie) => (
                    <motion.div
                      key={cookie.title}
                      whileHover={{ x: 4 }}
                      className={`rounded-3xl border ${cookie.border} bg-card p-6 sm:p-8 shadow-sm transition-all hover:shadow-lg group`}
                    >
                      <div className="flex items-start gap-4">
                        <motion.div
                          whileHover={{ rotate: 15, scale: 1.15 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${cookie.bg}`}
                        >
                          <cookie.icon className={`h-6 w-6 ${cookie.color}`} />
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-bold text-foreground">{cookie.title}</h3>
                            {cookie.required && (
                              <span className="text-[10px] font-bold bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full uppercase tracking-wider">Required</span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{cookie.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Third Party */}
              <motion.div
                variants={fadeIn}
                className="rounded-3xl border border-border/50 bg-card p-8 sm:p-10 shadow-sm"
              >
                <h2 className="text-xl font-black text-foreground mb-6 flex items-center gap-3">
                  <Globe className="h-5 w-5 text-primary" />
                  Third-Party Services
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We use a limited number of trusted third-party services that may set cookies on your device:
                </p>
                <div className="space-y-4">
                  {thirdParty.map((tp) => (
                    <div key={tp.name} className="flex items-center gap-4 p-3 rounded-2xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <tp.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-foreground">{tp.name}</p>
                        <p className="text-xs text-muted-foreground">{tp.purpose}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Managing Cookies */}
              <motion.div
                variants={fadeIn}
                className="rounded-3xl border border-border/50 bg-card p-8 sm:p-10 shadow-sm"
              >
                <h2 className="text-xl font-black text-foreground mb-4 flex items-center gap-3">
                  <Trash2 className="h-5 w-5 text-rose-500" />
                  Managing Your Cookies
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  You can control and delete cookies through your browser settings. Most browsers allow you to:
                </p>
                <ul className="space-y-3 mb-5">
                  {managementSteps.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15">
                  <p className="text-xs text-muted-foreground leading-relaxed flex items-start gap-2">
                    <Info className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    Blocking essential cookies will prevent you from logging in and using core features of Roomeo.
                  </p>
                </div>
              </motion.div>

              {/* Contact CTA */}
              <motion.div
                variants={fadeIn}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-background p-8 sm:p-10 border border-amber-500/20 shadow-lg"
              >
                <motion.div
                  animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
                  className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-500/10 blur-[60px]"
                />
                <div className="relative z-10">
                  <h2 className="text-xl font-black text-foreground mb-4">Questions about cookies?</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg">
                    If you have any questions about our use of cookies, please don&apos;t hesitate to reach out.
                  </p>
                  <Link
                    href="/contact"
                    className="group inline-flex h-12 items-center gap-2 rounded-full bg-amber-500 px-6 text-sm font-bold text-white shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
                  >
                    Get in Touch
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
