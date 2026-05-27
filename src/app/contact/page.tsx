"use client";

import Link from "next/link";
import { Mail, MapPin, MessageCircle, Clock, ArrowRight, Phone, Send, Sparkles, Headphones } from "lucide-react";

import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { ContactForm } from "@/components/shared/contact-form";
import { motion } from "framer-motion";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    desc: "For general inquiries, partnerships, or support.",
    detail: "arunneupane0000@gmail.com",
    action: "mailto:arunneupane0000@gmail.com",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: Phone,
    title: "Call Us",
    desc: "Get instant help from our support team.",
    detail: "+977 9811420975",
    action: "tel:+9779811420975",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    desc: "Drop by our office during working hours.",
    detail: "Butwal, Lumbini, Nepal",
    action: "#",
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    icon: Clock,
    title: "Response Time",
    desc: "We aim to respond to all queries quickly.",
    detail: "Within 24 hours",
    action: "#",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

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
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-primary/[0.07] blur-[160px]"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
              className="absolute right-1/3 top-1/4 h-[300px] w-[300px] rounded-full bg-blue-500/[0.05] blur-[120px]"
            />
          </div>

          {/* Floating decorative elements */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
            className="absolute top-24 right-[12%] hidden lg:block"
          >
            <div className="h-14 w-14 rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm rotate-12 flex items-center justify-center shadow-xl">
              <Mail className="h-6 w-6 text-blue-500/60" />
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" as const }}
            className="absolute bottom-28 left-[10%] hidden lg:block"
          >
            <div className="h-12 w-12 rounded-xl border border-green-500/20 bg-green-500/5 backdrop-blur-sm -rotate-6 flex items-center justify-center shadow-xl">
              <MapPin className="h-5 w-5 text-green-500/60" />
            </div>
          </motion.div>
          <motion.div
            animate={{ y: [-12, 12, -12] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
            className="absolute top-32 left-[8%] hidden lg:block"
          >
            <div className="h-16 w-16 rounded-full border border-purple-500/15 bg-purple-500/5 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <Phone className="h-6 w-6 text-purple-500/50" />
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
                <Headphones className="h-10 w-10 text-primary" />
              </motion.div>
            </motion.div>
            <motion.span variants={fadeIn} className="inline-flex items-center gap-2 rounded-full bg-primary/[0.06] border border-primary/20 px-5 py-2 text-sm font-semibold text-primary mb-6 shadow-lg shadow-primary/5">
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
              >
                <Sparkles className="h-4 w-4" />
              </motion.span>
              We&apos;re Here to Help
            </motion.span>
            <motion.h1 variants={fadeIn} className="text-4xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl mb-6 leading-[0.95]">
              Get in{" "}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Touch
              </span>
            </motion.h1>
            <motion.p variants={fadeIn} className="mx-auto max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Have a question, feedback, or partnership proposal? We&apos;d love to hear from you.
              Our team is always ready to help.
            </motion.p>
          </motion.div>
        </section>

        {/* ─── Contact Methods ─── */}
        <section className="pb-20 sm:pb-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8"
          >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {contactMethods.map((method) => (
                <motion.a
                  variants={fadeIn}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  key={method.title}
                  href={method.action}
                  className={`group rounded-3xl border ${method.border} bg-card p-8 shadow-lg hover:shadow-xl transition-shadow`}
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${method.bg} mb-6`}
                  >
                    <method.icon className={`h-6 w-6 ${method.color}`} />
                  </motion.div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{method.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{method.desc}</p>
                  <p className="text-sm font-bold text-primary">{method.detail}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─── Contact Form ─── */}
        <section className="py-28 sm:py-36 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-secondary/20" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
              className="text-center mb-12"
            >
              <motion.span variants={fadeIn} className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-semibold text-blue-500 mb-6">
                <Send className="h-4 w-4" />
                Send a Message
              </motion.span>
              <motion.h2 variants={fadeIn} className="text-3xl font-black tracking-tight text-foreground sm:text-5xl mb-4">
                Drop Us a Line
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-muted-foreground">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </motion.p>
            </motion.div>

            <ContactForm />
          </div>
        </section>

        {/* ─── Map Section ─── */}
        <section className="py-28 sm:py-36">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8"
          >
            <div className="text-center mb-12">
              <motion.span variants={fadeIn} className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1.5 text-sm font-semibold text-green-500 mb-6">
                <MapPin className="h-4 w-4" />
                Our Location
              </motion.span>
              <motion.h2 variants={fadeIn} className="text-3xl font-black tracking-tight text-foreground sm:text-5xl mb-4">
                Find Our Office
              </motion.h2>
              <motion.p variants={fadeIn} className="text-lg text-muted-foreground">
                Located in the heart of Butwal, Lumbini Province.
              </motion.p>
            </div>
            <motion.div
              variants={fadeIn}
              className="relative h-[400px] w-full overflow-hidden rounded-3xl border border-border/50 bg-secondary/30 shadow-xl"
            >
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=83.44%2C27.66%2C83.48%2C27.70&layer=mapnik"
                className="h-full w-full border-0"
                loading="lazy"
                title="Roomeo Office Location"
              />
            </motion.div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
