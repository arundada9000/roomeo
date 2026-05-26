"use client";

import Link from "next/link";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { motion } from "framer-motion";
import { Check, ArrowRight, Zap, Building2, Crown, Star, Sparkles, Wallet, HelpCircle } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    desc: "Perfect for tenants looking for their next room.",
    badge: null,
    features: [
      "Unlimited room searches",
      "Interactive map explorer",
      "Save favorite listings",
      "Direct landlord contact",
      "Basic filters",
    ],
    cta: "Get Started Free",
    ctaStyle: "border-2 border-border bg-card text-foreground hover:border-primary/50",
    icon: Zap,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500",
  },
  {
    name: "Landlord Pro",
    price: "999",
    desc: "For landlords who want maximum visibility and tools.",
    badge: "Most Popular",
    features: [
      "List unlimited properties",
      "Verified host badge",
      "Priority in search results",
      "Analytics dashboard",
      "Tenant screening tools",
      "Featured listing (1/month)",
      "Priority support",
    ],
    cta: "Start Free Trial",
    ctaStyle: "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105",
    icon: Building2,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "For property managers and agencies with large portfolios.",
    badge: null,
    features: [
      "Everything in Landlord Pro",
      "Bulk property upload",
      "Team member accounts",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "White-label options",
    ],
    cta: "Contact Sales",
    ctaStyle: "border-2 border-border bg-card text-foreground hover:border-primary/50",
    icon: Crown,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500",
  },
];

const faqs = [
  {
    q: "Is Roomeo really free for tenants?",
    a: "Yes! Tenants can search, save, and contact landlords completely free. We will never charge tenants a brokerage fee.",
  },
  {
    q: "Can I list properties without a paid plan?",
    a: "You can list up to 3 properties for free. The Landlord Pro plan unlocks unlimited listings and premium features.",
  },
  {
    q: "Is there a contract or commitment?",
    a: "No contracts. You can upgrade, downgrade, or cancel at any time. We believe in earning your loyalty, not locking you in.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept eSewa, Khalti, bank transfer, and international cards via Stripe for premium plans.",
  },
];

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative overflow-hidden py-28 sm:py-36">
        <div className="absolute inset-0 -z-10">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" as const }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-primary/[0.07] blur-[160px]"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
            className="absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-amber-500/[0.04] blur-[100px]"
          />
        </div>

        {/* Floating decorations */}
        <motion.div
          animate={{ y: [-12, 12, -12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
          className="absolute top-24 left-[10%] hidden lg:block"
        >
          <div className="h-16 w-16 rounded-2xl border border-primary/20 bg-primary/5 backdrop-blur-sm rotate-12 flex items-center justify-center shadow-xl shadow-primary/10">
            <Wallet className="h-7 w-7 text-primary/60" />
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
          className="absolute top-32 right-[12%] hidden lg:block"
        >
          <div className="h-14 w-14 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm flex items-center justify-center shadow-xl">
            <Crown className="h-6 w-6 text-amber-500/60" />
          </div>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <motion.div variants={fadeIn} className="flex justify-center mb-8">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 border border-primary/20 shadow-xl shadow-primary/10"
            >
              <Star className="h-10 w-10 text-primary" />
            </motion.div>
          </motion.div>
          <motion.span variants={fadeIn} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-5 py-2 text-sm font-semibold text-primary mb-6 shadow-lg shadow-primary/5">
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}>
              <Sparkles className="h-4 w-4" />
            </motion.span>
            Simple Pricing
          </motion.span>
          <motion.h1 variants={fadeIn} className="text-4xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl mb-6 leading-[0.95]">
            Plans that grow
            <br />
            <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
              with your needs.
            </span>
          </motion.h1>
          <motion.p variants={fadeIn} className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            Tenants search free, forever. Landlords get premium tools at an affordable price.
            No hidden fees. No brokerage. Just honest pricing.
          </motion.p>
        </motion.div>
      </section>

      {/* Plans */}
      <section className="pb-20 sm:pb-28">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8"
        >
          <div className="grid gap-8 lg:grid-cols-3 lg:items-start">
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeIn}
                whileHover={plan.badge ? { scale: 1.05, y: -8 } : { y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`relative rounded-3xl border p-8 sm:p-10 transition-all duration-300 group ${
                  plan.badge
                    ? "border-primary/40 bg-card shadow-2xl shadow-primary/10 scale-[1.02] lg:scale-105 z-10"
                    : "border-border/50 bg-card shadow-lg hover:shadow-xl hover:border-primary/20"
                }`}
              >
                {/* Subtle gradient glow behind card */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10" />

                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground shadow-lg shadow-primary/20">
                      {plan.badge}
                    </span>
                  </div>
                )}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl ${plan.iconBg} mb-6`}
                >
                  <plan.icon className={`h-6 w-6 ${plan.iconColor}`} />
                </motion.div>
                <h3 className="text-2xl font-black text-foreground mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-8">
                  {plan.price !== "Custom" ? (
                    <>
                      <span className="text-sm font-bold text-muted-foreground">NPR</span>
                      <span className="text-5xl font-black text-foreground">{plan.price}</span>
                      <span className="text-sm font-bold text-muted-foreground">/mo</span>
                    </>
                  ) : (
                    <span className="text-4xl font-black text-foreground">Custom</span>
                  )}
                </div>
                <ul className="space-y-3.5 mb-10">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-3 text-sm">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="font-medium text-foreground">{feat}</span>
                    </li>
                  ))}
                </ul>
                <button className={`flex h-14 w-full items-center justify-center rounded-2xl text-base font-bold transition-transform active:scale-95 ${plan.ctaStyle}`}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="py-28 sm:py-36 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-secondary/20" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-16">
            <motion.span variants={fadeIn} className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-4 py-1.5 text-sm font-semibold text-amber-500 mb-6">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </motion.span>
            <motion.h2 variants={fadeIn} className="text-3xl font-black tracking-tight text-foreground sm:text-5xl mb-4">
              Frequently Asked Questions
            </motion.h2>
            <motion.p variants={fadeIn} className="text-lg text-muted-foreground">
              Everything you need to know about our pricing.
            </motion.p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <motion.div
                key={faq.q}
                variants={fadeIn}
                whileHover={{ x: 4 }}
                className="rounded-3xl border border-border/50 bg-background p-6 sm:p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/20"
              >
                <h3 className="text-base font-bold text-foreground mb-2 flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  {faq.q}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed pl-8">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
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

          <h2 className="relative text-3xl font-black tracking-tight sm:text-5xl max-w-2xl mx-auto leading-tight mb-6">
            Ready to get started?
          </h2>
          <p className="relative mt-6 text-lg text-background/70 max-w-md mx-auto font-medium mb-10">
            Join thousands of tenants and landlords already using Roomeo.
          </p>
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/explore"
              className="group inline-flex h-14 items-center gap-3 rounded-full bg-primary px-10 text-base font-bold text-primary-foreground shadow-[0_0_40px_rgb(var(--primary)/0.4)] transition-all hover:scale-105 active:scale-95"
            >
              Start Exploring
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-14 items-center rounded-full border border-background/20 bg-background/5 backdrop-blur-sm px-10 text-base font-bold text-background transition-all hover:bg-background/10 active:scale-95"
            >
              Talk to Sales
            </Link>
          </div>
        </motion.div>
      </section>
      </main>
      <Footer />
    </>
  );
}
