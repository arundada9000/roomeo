"use client";

import Navbar from "@/components/shared/navbar";
import { authClient } from "@/lib/auth-client";
import { User, LogOut, Settings, Bell, Home, Shield, ShieldCheck } from "lucide-react";
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
          <User className="mb-4 h-16 w-16 text-muted-foreground/30" />
          <h1 className="text-2xl font-bold text-foreground">Sign in to view your profile</h1>
          <p className="mt-2 text-muted-foreground">Manage your settings, view saved rooms, and more.</p>
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

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">Profile</h1>
        
        {/* Profile Card */}
        <div className="mb-8 flex items-center gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
            {session.user.name?.[0]?.toUpperCase() || <User className="h-8 w-8" />}
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">{session.user.name}</h2>
            <p className="text-muted-foreground">{session.user.email}</p>
            {promoted && (
              <span className="mt-1 inline-block rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-medium text-green-600">
                Role updated to {promoted} — refresh to see changes
              </span>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="divide-y divide-border/60">
            <Link
              href="/landlord"
              className="flex items-center gap-4 p-4 transition-colors hover:bg-secondary"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Home className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">Landlord Dashboard</h3>
                <p className="text-sm text-muted-foreground">Manage your listed properties and units</p>
              </div>
            </Link>

            <Link
              href="/admin"
              className="flex items-center gap-4 p-4 transition-colors hover:bg-secondary"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">Admin Dashboard</h3>
                <p className="text-sm text-muted-foreground">Moderate listings and manage the platform</p>
              </div>
            </Link>

            <button className="flex w-full items-center gap-4 p-4 transition-colors hover:bg-secondary">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                <Settings className="h-5 w-5" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-foreground">Account Settings</h3>
                <p className="text-sm text-muted-foreground">Personal information and preferences</p>
              </div>
            </button>

            <button className="flex w-full items-center gap-4 p-4 transition-colors hover:bg-secondary">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                <Bell className="h-5 w-5" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-foreground">Notifications</h3>
                <p className="text-sm text-muted-foreground">Manage alerts and messages</p>
              </div>
            </button>

            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-4 p-4 transition-colors hover:bg-red-500/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                <LogOut className="h-5 w-5" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-red-500">Sign Out</h3>
              </div>
            </button>
          </div>
        </div>

        {/* Dev Tools — Role Promotion */}
        <div className="mt-8 rounded-2xl border border-dashed border-amber-500/30 bg-amber-500/5 p-6">
          <h3 className="text-sm font-semibold text-amber-600 mb-1 flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" />
            Developer Tools
          </h3>
          <p className="text-xs text-muted-foreground mb-4">Promote your account role for testing. This section will be removed in production.</p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handlePromoteAdmin}
              disabled={isPromoting}
              className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-500/20 disabled:opacity-50"
            >
              {isPromoting ? "Promoting..." : "Promote to Admin"}
            </button>
            <button
              onClick={handlePromoteLandlord}
              disabled={isPromoting}
              className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20 disabled:opacity-50"
            >
              {isPromoting ? "Promoting..." : "Promote to Landlord"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
