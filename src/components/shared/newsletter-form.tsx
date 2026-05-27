"use client";

import { useState, useRef } from "react";
import { CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { subscribeNewsletter } from "@/app/actions/newsletter";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    const formData = new FormData();
    formData.set("email", email);

    const result = await subscribeNewsletter(formData);

    if (result?.error) {
      setStatus("error");
      setMessage(result.error);
    } else {
      setStatus("success");
      setMessage(result?.message || "Subscribed!");
      setEmail("");
    }

    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 4000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm font-bold text-foreground">
        Subscribe to our newsletter
      </p>
      <div className="flex items-center max-w-sm rounded-full border border-border/50 bg-secondary/30 p-1 shadow-sm transition-all focus-within:border-primary/50 focus-within:bg-background focus-within:shadow-md">
        <input
          ref={inputRef}
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={status === "loading"}
          className="w-full bg-transparent px-4 py-2.5 text-sm font-medium outline-none placeholder:text-muted-foreground disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading" || !email.trim()}
          className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground transition-all hover:scale-105 active:scale-95 shadow-md shadow-primary/20 disabled:opacity-50 disabled:hover:scale-100"
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : status === "success" ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            "Subscribe"
          )}
        </button>
      </div>
      {message && (
        <p
          className={`text-xs font-medium ${
            status === "error" ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
