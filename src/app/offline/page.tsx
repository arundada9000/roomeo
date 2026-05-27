import type { Metadata } from "next";
import { WifiOff } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You're Offline",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-secondary">
        <WifiOff className="h-10 w-10 text-muted-foreground" />
      </div>
      <h1 className="mt-6 text-2xl font-bold text-foreground">You&apos;re offline</h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground/80">
        Check your connection and try again. Cached pages are still available.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 active:scale-[0.97]"
      >
        Try again
      </Link>
    </div>
  );
}
