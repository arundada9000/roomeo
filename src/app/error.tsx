"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8 flex h-32 w-32 items-center justify-center rounded-[2rem] bg-destructive/10 shadow-2xl shadow-destructive/5 border border-destructive/20">
        <div className="absolute inset-0 bg-destructive/10 rounded-[2rem] blur-xl" />
        <AlertTriangle className="h-14 w-14 text-destructive" />
      </div>

      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
        Something went wrong
      </h1>

      <p className="mx-auto mb-10 max-w-lg text-lg text-muted-foreground">
        We encountered an unexpected issue. Our team has been notified. Please try again or return to the home page.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">
        <button
          onClick={reset}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-8 text-sm font-bold text-foreground transition-all hover:bg-secondary hover:text-foreground active:scale-95"
        >
          <Home className="h-4 w-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
