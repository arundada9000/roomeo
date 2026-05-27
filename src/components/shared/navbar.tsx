"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Search, Heart, User, LogOut, Bell, Building, Settings, ChevronDown } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Hub", href: "/hub" },
  { label: "List Property", href: "/landlord" },
];

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();

  return (
    <header suppressHydrationWarning className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/50">
      <nav className="mx-auto flex h-[76px] w-full max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo Section */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 group" id="navbar-logo">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-lg shadow-primary/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary/20 overflow-hidden border border-border/50">
              <Image 
                src="/icons/icon-192x192.png" 
                alt="Roomeo Logo" 
                width={44} 
                height={44} 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-foreground">
              Roomeo
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Actions (Visible when md:hidden) */}
        <div className="flex md:hidden items-center gap-3">
          <Link 
            href="/explore" 
            className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/80 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Search className="h-5 w-5" />
          </Link>
          
          {session ? (
            <Link href="/profile" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm transition-transform active:scale-95 font-bold">
               {session.user.name?.[0]?.toUpperCase() || <User className="h-5 w-5" />}
            </Link>
          ) : (
            <Link href="/welcome" className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/80 text-muted-foreground border border-border/50 shadow-sm transition-transform active:scale-95">
               <User className="h-5 w-5" />
            </Link>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          {/* Global Search Bar Button */}
          <Link
            href="/explore"
            className="group flex h-12 w-[320px] items-center gap-3 rounded-full border border-border/50 bg-secondary/30 px-5 text-sm font-medium text-muted-foreground transition-all hover:border-primary/40 hover:bg-background hover:shadow-md hover:shadow-primary/5"
            id="navbar-search"
          >
            <Search className="h-4 w-4 text-primary" />
            <span className="flex-1 text-left">Search destinations...</span>
            <span className="flex h-6 items-center rounded-md bg-background px-2 text-[10px] font-bold shadow-sm border border-border/50 group-hover:bg-secondary">
              ⌘K
            </span>
          </Link>

          <div className="h-6 w-px bg-border/60 mx-1" />

          {/* Notifications / Favorites */}
          {session && (
            <Link
              href="/favorites"
              className="relative flex h-12 w-12 items-center justify-center rounded-full border border-transparent text-muted-foreground transition-all hover:bg-secondary hover:text-primary active:scale-95"
              aria-label="Favorites"
              id="navbar-favorites"
            >
              <Heart className="h-5 w-5" />
            </Link>
          )}

          {/* User Profile / Auth */}
          {isPending ? (
            <div className="h-12 w-32 animate-pulse rounded-full bg-secondary/60" />
          ) : session ? (
            <div className="relative group">
              <button className="flex h-12 items-center gap-3 rounded-full border border-border/50 bg-secondary/30 pl-2 pr-4 text-sm font-bold text-foreground transition-all hover:border-primary/30 hover:bg-background hover:shadow-md">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                  {session.user.name?.[0]?.toUpperCase() || <User className="h-4 w-4" />}
                </div>
                <span>{session.user.name?.split(" ")[0]}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:rotate-180" />
              </button>

              {/* Animated Dropdown */}
              <div className="absolute right-0 top-[calc(100%+0.5rem)] w-64 origin-top-right rounded-2xl border border-border/40 bg-background/95 p-2 opacity-0 shadow-2xl backdrop-blur-xl transition-all duration-200 invisible translate-y-2 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 z-50">
                {/* User Header */}
                <div className="flex flex-col px-4 py-3 border-b border-border/40 mb-2">
                  <span className="font-bold text-foreground">{session.user.name}</span>
                  <span className="text-xs font-medium text-muted-foreground truncate">{session.user.email}</span>
                </div>

                <div className="flex flex-col gap-1">
                  {(session.user as { role?: string }).role === "ADMIN" ? (
                    <Link href="/admin" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                      <Building className="h-4 w-4 text-primary" />
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link href="/landlord" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                      <Building className="h-4 w-4 text-primary" />
                      Landlord Dashboard
                    </Link>
                  )}
                  <Link href="/profile" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                    <Settings className="h-4 w-4" />
                    Account Settings
                  </Link>
                  <Link href="/favorites" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
                    <Heart className="h-4 w-4" />
                    Saved Rooms
                  </Link>
                </div>

                <div className="my-2 h-px bg-border/40" />

                <button
                  onClick={() => authClient.signOut()}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-destructive/80 transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/welcome"
              className="flex h-12 items-center gap-2 rounded-full bg-primary px-8 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-[0.98] hover:bg-primary/90 active:scale-95"
              id="navbar-signin"
            >
              <User className="h-4 w-4" />
              <span>Sign In / Join</span>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
