"use client";

import Link from "next/link";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Eye, Lock, UserCheck, Database, Fingerprint, Bell, Sparkles, ArrowRight } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const sections = [
  {
    icon: Eye,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    title: "1. Information We Collect",
    content: "We collect information you provide directly to us when you:",
    items: [
      "Create an account (name, email, phone number)",
      "Verify your identity (government ID, selfie)",
      "List a property (address, photos, pricing)",
      "Communicate with other users or our support team",
      "Use location services to find rooms near you",
    ],
  },
  {
    icon: Database,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    title: "2. How We Use Your Information",
    content: "We use the collected information to:",
    items: [
      "Provide, maintain, and improve our services",
      "Process transactions and send related information",
      "Verify the identity of landlords and tenants",
      "Send support and administrative messages",
      "Monitor and prevent fraud, spam, and abuse",
      "Personalize your experience and recommend properties",
    ],
  },
  {
    icon: UserCheck,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    title: "3. Information Sharing",
    content: "We do not sell your personal information. We may share information as follows:",
    items: [
      "With other users: Limited info (name, verified status) is shared when you message or book.",
      "With service providers: We share data with vendors who perform services on our behalf (e.g., identity verification).",
      "For legal reasons: If required by law, subpoena, or to protect our rights and the safety of users.",
    ],
  },
  {
    icon: Lock,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    title: "4. Data Security",
    content: "We implement industry-standard security measures to protect your data:",
    items: [
      "Encryption of data in transit (HTTPS/TLS) and at rest",
      "Regular security audits and vulnerability assessments",
      "Access controls limiting employee access on a need-to-know basis",
      "Secure password hashing using modern cryptographic algorithms",
    ],
  },
  {
    icon: Fingerprint,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    title: "5. Your Rights",
    content: "You have the following rights regarding your personal data:",
    items: [
      "Access and download a copy of all personal data we hold about you",
      "Update or correct inaccurate information from your account settings",
      "Request deletion of your account and all associated personal data",
      "Opt out of non-essential communications at any time",
      "Withdraw consent for location tracking via your browser or device settings",
    ],
  },
  {
    icon: Bell,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    title: "6. Data Retention",
    content: null,
    paragraph: "We retain your personal information for as long as your account is active or as needed to provide you services. If you delete your account, we will delete your personal data within 30 days, except where we are required to retain it for legal, tax, or regulatory purposes.",
  },
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
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-green-500/[0.06] blur-[160px]"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
              className="absolute right-1/3 top-1/4 h-[300px] w-[300px] rounded-full bg-primary/[0.04] blur-[100px]"
            />
          </div>

          {/* Floating decorative elements */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
            className="absolute top-24 right-[12%] hidden lg:block"
          >
            <div className="h-14 w-14 rounded-2xl border border-green-500/20 bg-green-500/5 backdrop-blur-sm rotate-12 flex items-center justify-center shadow-xl">
              <Lock className="h-6 w-6 text-green-500/60" />
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" as const }}
            className="absolute bottom-32 left-[10%] hidden lg:block"
          >
            <div className="h-12 w-12 rounded-xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm -rotate-6 flex items-center justify-center shadow-xl">
              <Eye className="h-5 w-5 text-blue-500/60" />
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
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="flex h-20 w-20 items-center justify-center rounded-3xl bg-green-500/10 border border-green-500/20 shadow-xl shadow-green-500/10"
              >
                <ShieldCheck className="h-10 w-10 text-green-500" />
              </motion.div>
            </motion.div>
            <motion.span variants={fadeIn} className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1.5 text-sm font-semibold text-green-500 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Your data is safe with us
            </motion.span>
            <motion.h1 variants={fadeIn} className="text-4xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl mb-6 leading-[0.95]">
              Privacy{" "}
              <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                Policy
              </span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
              We believe in complete transparency about how we handle your data.
              Last updated: May 1, 2026
            </motion.p>
          </motion.div>
        </section>

        {/* ─── Content Sections ─── */}
        <section className="pb-28 sm:pb-36">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8"
          >
            <div className="space-y-8">
              {sections.map((section) => (
                <motion.div
                  key={section.title}
                  variants={fadeIn}
                  whileHover={{ x: 4 }}
                  className={`rounded-3xl border ${section.border} bg-card p-8 sm:p-10 shadow-sm transition-all hover:shadow-lg group`}
                >
                  <div className="flex items-start gap-5 mb-5">
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${section.bg}`}
                    >
                      <section.icon className={`h-6 w-6 ${section.color}`} />
                    </motion.div>
                    <h2 className="text-xl font-black text-foreground pt-2">{section.title}</h2>
                  </div>

                  {section.content && (
                    <p className="text-muted-foreground leading-relaxed mb-4 pl-[68px]">{section.content}</p>
                  )}

                  {section.paragraph && (
                    <p className="text-muted-foreground leading-relaxed pl-[68px]">{section.paragraph}</p>
                  )}

                  {section.items && (
                    <ul className="space-y-3 pl-[68px]">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${section.bg.replace('/10', '')} shrink-0`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}

              {/* Contact CTA */}
              <motion.div
                variants={fadeIn}
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-background p-8 sm:p-10 border border-green-500/20 shadow-lg"
              >
                <motion.div
                  animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
                  className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-green-500/10 blur-[60px]"
                />
                <div className="relative z-10">
                  <h2 className="text-xl font-black text-foreground mb-4">Questions about your data?</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg">
                    If you have any questions or concerns about this Privacy Policy, our team is always here to help.
                  </p>
                  <Link
                    href="/contact"
                    className="group inline-flex h-12 items-center gap-2 rounded-full bg-green-500 px-6 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:scale-105 active:scale-95"
                  >
                    <Mail className="h-4 w-4" />
                    Contact Privacy Team
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
