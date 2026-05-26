"use client";

import Link from "next/link";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { motion } from "framer-motion";
import { FileText, ArrowRight, ShieldAlert, Scale, Users, Building2, Handshake, Gavel, Sparkles, AlertTriangle } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const sections = [
  {
    icon: Scale,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    title: "1. Using Roomeo",
    content: "Roomeo acts as a marketplace connecting landlords with potential tenants. We do not own, manage, or control the properties listed on our platform.",
    items: [
      "You must be at least 18 years old to use the platform.",
      "You are responsible for keeping your account credentials secure.",
      "You agree not to scrape, hack, or disrupt the platform.",
      "You agree to provide accurate information in your profile and listings.",
    ],
  },
  {
    icon: Building2,
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    title: "2. Landlord Responsibilities",
    content: "If you list a property on Roomeo, you agree that:",
    items: [
      "You have the legal right to list and rent the property.",
      "The information, photos, and pricing provided are accurate and truthful.",
      "You will comply with all local housing, zoning, and safety laws.",
      "You will not discriminate against tenants based on race, gender, religion, or nationality.",
      "You will respond to inquiries in a timely and professional manner.",
    ],
  },
  {
    icon: Users,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    title: "3. Tenant Responsibilities",
    content: "If you use Roomeo to find a property, you agree that:",
    items: [
      "You will communicate respectfully with landlords.",
      "Any lease or agreement you sign is directly between you and the landlord. Roomeo is not a party to the lease.",
      "You will verify the property in person before transferring any deposit outside the platform.",
    ],
  },
  {
    icon: Gavel,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    title: "4. Liability & Dispute Resolution",
    content: null,
    paragraph: "Roomeo provides the platform \"as-is\". We are not responsible for the condition of properties, the actions of users, or any disputes that arise between landlords and tenants. Any disputes must be resolved directly between the parties involved or through appropriate local legal channels.",
  },
  {
    icon: Handshake,
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    title: "5. Modifications to Terms",
    content: null,
    paragraph: "We reserve the right to modify these Terms at any time. When we do, we will update the \"Last Updated\" date at the top of this page and notify registered users via email. Your continued use of Roomeo after changes are posted constitutes your acceptance of the modified Terms.",
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
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-blue-500/[0.06] blur-[160px]"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
              className="absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-purple-500/[0.04] blur-[100px]"
            />
          </div>

          {/* Floating decorative icons */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
            className="absolute top-28 right-[14%] hidden lg:block"
          >
            <div className="h-14 w-14 rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm rotate-12 flex items-center justify-center shadow-xl">
              <Scale className="h-6 w-6 text-blue-500/60" />
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" as const }}
            className="absolute bottom-28 left-[10%] hidden lg:block"
          >
            <div className="h-12 w-12 rounded-xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm -rotate-6 flex items-center justify-center shadow-xl">
              <Gavel className="h-5 w-5 text-amber-500/60" />
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
                className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-500/10 border border-blue-500/20 shadow-xl shadow-blue-500/10"
              >
                <FileText className="h-10 w-10 text-blue-500" />
              </motion.div>
            </motion.div>
            <motion.span variants={fadeIn} className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-500 mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Transparent & Fair
            </motion.span>
            <motion.h1 variants={fadeIn} className="text-4xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl mb-6 leading-[0.95]">
              Terms of{" "}
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Service
              </span>
            </motion.h1>
            <motion.p variants={fadeIn} className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
              Clear rules that protect both tenants and landlords.
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

              {/* Important Notice */}
              <motion.div
                variants={fadeIn}
                className="rounded-3xl border border-destructive/20 bg-destructive/5 p-6 sm:p-8 shadow-sm flex items-start gap-4"
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
                >
                  <AlertTriangle className="h-6 w-6 text-destructive shrink-0 mt-0.5" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-destructive mb-2">Important Notice</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Please read these Terms carefully. By accessing or using the Roomeo platform, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree, you may not use our services.
                  </p>
                </div>
              </motion.div>

              {/* Section Cards */}
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
                className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-background p-8 sm:p-10 border border-blue-500/20 shadow-lg"
              >
                <motion.div
                  animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
                  className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/10 blur-[60px]"
                />
                <div className="relative z-10">
                  <h2 className="text-xl font-black text-foreground mb-4">Questions about these Terms?</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg">
                    Our support team is happy to clarify any section of these Terms of Service.
                  </p>
                  <Link
                    href="/contact"
                    className="group inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                  >
                    Contact Support
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
