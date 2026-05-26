"use client";
import { useState } from "react";

import Link from "next/link";
import { MapPin, Search, Heart, User, LogOut } from "lucide-react";
import AuthModal from "@/components/auth/auth-modal";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { label: "Explore", href: "/explore" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "List Property", href: "/landlord" },
];

export default function Navbar() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group" id="navbar-logo">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-transform duration-200 group-hover:scale-105">
            <MapPin className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Roomeo
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/explore"
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:shadow-sm"
            id="navbar-search"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
            <span>Search rooms</span>
          </Link>
          <Link
            href="/favorites"
            className="flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Favorites"
            id="navbar-favorites"
          >
            <Heart className="h-5 w-5" />
          </Link>
          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-full bg-secondary" />
          ) : session ? (
            <div className="relative group/user">
              <button className="flex h-10 items-center gap-2 rounded-full border border-border px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {session.user.name?.[0]?.toUpperCase() || <User className="h-3 w-3" />}
                </div>
                <span>{session.user.name?.split(" ")[0]}</span>
              </button>
              <div className="absolute right-0 top-full mt-2 hidden w-48 flex-col overflow-hidden rounded-xl border border-border bg-card py-1 shadow-xl group-hover/user:flex">
                <div className="px-4 py-2 text-xs text-muted-foreground border-b border-border/60">
                  {session.user.email}
                </div>
                <button
                  onClick={() => authClient.signOut()}
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary hover:text-red-500"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="flex h-10 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[#1D4ED8]"
              id="navbar-signin"
            >
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </nav>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </header>
  );
}
