"use client";

import Navbar from "@/components/shared/navbar";
import { authClient } from "@/lib/auth-client";
import { User, LogOut, Settings, Bell, Home, Shield, ShieldCheck, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { promoteToAdmin, promoteToLandlord } from "./actions";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [isPromoting, startTransition] = useTransition();
  const [promoted, setPromoted] = useState<string | null>(null);

  if (isPending) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </main>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary mb-6">
            <User className="h-10 w-10 text-muted-foreground/40" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">Sign in to view your profile</h1>
          <p className="mt-2 text-muted-foreground max-w-sm">Manage your settings, view saved rooms, and more.</p>
          <Link href="/welcome" className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-primary px-8 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97]">
            Sign In
          </Link>
        </main>
      </div>
    );
  }

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const handlePromoteAdmin = () => {
    startTransition(async () => {
      await promoteToAdmin();
      setPromoted("ADMIN");
    });
  };

  const handlePromoteLandlord = () => {
    startTransition(async () => {
      await promoteToLandlord();
      setPromoted("LANDLORD");
    });
  };

  const menuItems = [
    {
      href: "/landlord",
      icon: Home,
      iconColor: "text-primary",
      iconBg: "bg-primary/10",
      title: "Landlord Dashboard",
      subtitle: "Manage your listed properties and units",
    },
    {
      href: "/admin",
      icon: Shield,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-500/10",
      title: "Admin Dashboard",
      subtitle: "Moderate listings and manage the platform",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="mx-auto w-full max-w-xl px-4 py-8 sm:px-6">
        
        {/* Profile Card */}
        <div className="mb-8 flex flex-col items-center text-center rounded-3xl border border-border/40 bg-card p-8 shadow-sm">
          <div className="flex h-20 w-20 overflow-hidden items-center justify-center rounded-full bg-accent text-2xl font-extrabold text-primary mb-4 border border-border/50 shadow-sm">
            {session.user.image ? (
              <img src={session.user.image} alt={session.user.name || "Profile"} className="h-full w-full object-cover" />
            ) : (
              session.user.name?.[0]?.toUpperCase() || <User className="h-9 w-9" />
            )}
          </div>
          <h2 className="text-xl font-extrabold text-foreground">{session.user.name}</h2>
          <p className="text-sm text-muted-foreground mt-1">{session.user.email}</p>
          {promoted && (
            <span className="mt-3 inline-block rounded-full bg-[#d2f4d6] px-3 py-1 text-xs font-semibold text-[#0d5916]">
              Role updated to {promoted} - refresh to see changes
            </span>
          )}
        </div>

        {/* Menu Items */}
        <div className="overflow-hidden rounded-3xl border border-border/40 bg-card shadow-sm mb-8">
          <div className="divide-y divide-border/40">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 p-5 transition-colors hover:bg-secondary/50"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${item.iconBg}`}>
                  <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground/50" />
              </Link>
            ))}

            <Link href="/profile/settings" className="flex w-full items-center gap-4 p-5 transition-colors hover:bg-secondary/50">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary">
                <Settings className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-foreground">Account Settings</h3>
                <p className="text-sm text-muted-foreground">Personal information and preferences</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground/50" />
            </Link>

            <button className="flex w-full items-center gap-4 p-5 transition-colors hover:bg-secondary/50">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary">
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-foreground">Notifications</h3>
                <p className="text-sm text-muted-foreground">Manage alerts and messages</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground/50" />
            </button>

            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-4 p-5 transition-colors hover:bg-destructive/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-destructive/10">
                <LogOut className="h-5 w-5 text-destructive" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-destructive">Sign Out</h3>
              </div>
            </button>
          </div>
        </div>

        {/* Dev Tools - Role Promotion */}
        <div className="rounded-3xl border border-dashed border-amber-500/30 bg-amber-500/5 p-6">
          <h3 className="text-sm font-bold text-amber-600 mb-1 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Developer Tools
          </h3>
          <p className="text-xs text-muted-foreground mb-4">Promote your account role for testing. This section will be removed in production.</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handlePromoteAdmin}
              disabled={isPromoting}
              className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-2.5 text-sm font-bold text-amber-700 transition-all hover:bg-amber-500/20 disabled:opacity-50 active:scale-95"
            >
              {isPromoting ? "Promoting..." : "Promote to Admin"}
            </button>
            <button
              onClick={handlePromoteLandlord}
              disabled={isPromoting}
              className="rounded-2xl border border-primary/30 bg-primary/10 px-5 py-2.5 text-sm font-bold text-primary transition-all hover:bg-primary/20 disabled:opacity-50 active:scale-95"
            >
              {isPromoting ? "Promoting..." : "Promote to Landlord"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
