"use client";

import { useState } from "react";
import { Send, ArrowRight, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { submitContact } from "@/app/actions/contact";

const subjects = [
  "General Inquiry",
  "Support Request",
  "Partnership Proposal",
  "Report a Problem",
  "Feature Request",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setStatus("loading");
    setMessage("");

    const result = await submitContact(formData);

    if (result?.error) {
      setStatus("error");
      setMessage(result.error);
    } else {
      setStatus("success");
      setMessage("Thanks! We'll get back to you within 24 hours.");
      e.currentTarget.reset();
    }

    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 5000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      className="space-y-6 rounded-3xl border border-border/50 bg-background p-8 sm:p-12 shadow-xl"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-foreground mb-2">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Your name"
            disabled={status === "loading"}
            className="w-full rounded-2xl border border-border/50 bg-secondary/30 px-4 py-3.5 text-sm font-medium outline-none transition-all placeholder:text-muted-foreground focus:border-primary/50 focus:bg-background focus:ring-2 focus:ring-primary/10 disabled:opacity-50"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-foreground mb-2">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            disabled={status === "loading"}
            className="w-full rounded-2xl border border-border/50 bg-secondary/30 px-4 py-3.5 text-sm font-medium outline-none transition-all placeholder:text-muted-foreground focus:border-primary/50 focus:bg-background focus:ring-2 focus:ring-primary/10 disabled:opacity-50"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-bold text-foreground mb-2">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          disabled={status === "loading"}
          className="w-full rounded-2xl border border-border/50 bg-secondary/30 px-4 py-3.5 text-sm font-medium outline-none transition-all focus:border-primary/50 focus:bg-background focus:ring-2 focus:ring-primary/10 disabled:opacity-50"
        >
          <option value="">Select a subject</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-bold text-foreground mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Tell us what's on your mind..."
          disabled={status === "loading"}
          className="w-full rounded-2xl border border-border/50 bg-secondary/30 px-4 py-3.5 text-sm font-medium outline-none transition-all placeholder:text-muted-foreground focus:border-primary/50 focus:bg-background focus:ring-2 focus:ring-primary/10 resize-none disabled:opacity-50"
        />
      </div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium ${
            status === "error"
              ? "bg-red-500/10 text-red-600"
              : "bg-green-500/10 text-green-600"
          }`}
        >
          {status === "error" ? (
            <AlertCircle className="h-4 w-4 shrink-0" />
          ) : (
            <CheckCircle className="h-4 w-4 shrink-0" />
          )}
          {message}
        </motion.div>
      )}

      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileHover={{ scale: status === "loading" ? 1 : 0.99 }}
        whileTap={{ scale: status === "loading" ? 1 : 0.95 }}
        className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-primary text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:opacity-90 disabled:opacity-60"
      >
        {status === "loading" ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : status === "success" ? (
          <CheckCircle className="h-5 w-5" />
        ) : (
          <Send className="h-5 w-5" />
        )}
        {status === "loading"
          ? "Sending..."
          : status === "success"
          ? "Sent!"
          : "Send Message"}
        {status === "idle" && (
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        )}
      </motion.button>
    </motion.form>
  );
}
