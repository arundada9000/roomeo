import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your personal Roomeo dashboard — recent listings, saved favorites, and account overview.",
};
import {
  Home, MapPin, Building2, TrendingUp, Sparkles,
  ArrowRight, Heart, Bell,
} from "lucide-react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

const roomTypeIcons: Record<string, string> = {
  SINGLE_ROOM: "/icons-for-rooms/room-icons-1/Single_room.png",
  DOUBLE_ROOM: "/icons-for-rooms/room-icons-1/Double_room.png",
  SHARED_ROOM: "/icons-for-rooms/room-icons-1/Shared_room.png",
  FLAT: "/icons-for-rooms/room-icons-1/Flat.png",
  STUDIO: "/icons-for-rooms/room-icons-1/Studio.png",
  PG: "/icons-for-rooms/room-icons-1/PG_Hostel.png",
};

export default async function HubPage() {
  const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);

  const [recentListings, totalListings, totalCities, recentFavCount] = await Promise.all([
    prisma.unit.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      take: 8,
      include: {
        property: { select: { title: true, city: true, address: true, lat: true, lng: true } },
        media: { take: 1 },
      },
    }),
    prisma.unit.count({ where: { status: "APPROVED" } }),
    prisma.property.findMany({ select: { city: true }, distinct: ["city"] }).then((r) => r.length),
    prisma.favorite.count(),
  ]);

  const ownFavCount = session
    ? await prisma.favorite.count({ where: { userId: session.user.id } })
    : null;

  const heroListing = recentListings[0] ?? null;
  const restListings = recentListings.slice(1, 7);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
              {session ? `Hey, ${session.user.name.split(" ")[0]}` : "Welcome to Roomeo"}
            </h1>
          </div>
          <p className="text-muted-foreground/80 text-sm max-w-xl">
            {session
              ? "Here&apos;s what&apos;s new - freshly listed rooms, platform updates, and your activity at a glance."
              : "Discover your next space. Browse rooms, save favorites, and connect with landlords."}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-border/30 bg-card p-4 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary mb-2">
              <Home className="h-4 w-4" />
            </div>
            <p className="text-xl font-extrabold text-foreground tracking-tight">{totalListings}</p>
            <p className="text-[11px] text-muted-foreground/60 font-medium mt-0.5">Listings</p>
          </div>
          <div className="rounded-2xl border border-border/30 bg-card p-4 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 mb-2">
              <MapPin className="h-4 w-4" />
            </div>
            <p className="text-xl font-extrabold text-foreground tracking-tight">{totalCities}</p>
            <p className="text-[11px] text-muted-foreground/60 font-medium mt-0.5">Cities</p>
          </div>
          <div className="rounded-2xl border border-border/30 bg-card p-4 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500/10 text-rose-600 mb-2">
              <Heart className="h-4 w-4" />
            </div>
            <p className="text-xl font-extrabold text-foreground tracking-tight">{ownFavCount ?? "-"}</p>
            <p className="text-[11px] text-muted-foreground/60 font-medium mt-0.5">Your Favs</p>
          </div>
          <div className="rounded-2xl border border-border/30 bg-card p-4 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600 mb-2">
              <TrendingUp className="h-4 w-4" />
            </div>
            <p className="text-xl font-extrabold text-foreground tracking-tight">{recentFavCount}</p>
            <p className="text-[11px] text-muted-foreground/60 font-medium mt-0.5">Total Favs</p>
          </div>
        </div>

        {/* Hero listing */}
        {heroListing && (
          <div className="mb-10 overflow-hidden rounded-3xl border border-border/30 bg-card shadow-sm">
            <Link href={`/units/${heroListing.id}`} className="group block">
              <div className="grid md:grid-cols-5">
                <div className="relative md:col-span-2 aspect-[4/3] md:aspect-auto overflow-hidden">
                  {heroListing.media[0] ? (
                    <img
                      src={heroListing.media[0].url}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary/30">
                      <Home className="h-12 w-12 text-muted-foreground/30" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 rounded-full bg-primary px-3 py-1 text-[10px] font-bold text-primary-foreground shadow-sm">
                    Just Added
                  </div>
                </div>
                <div className="flex flex-col justify-center p-6 md:col-span-3">
                  <div className="space-y-2">
                    <p className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-primary">
                      <img
                        src={roomTypeIcons[heroListing.type] || roomTypeIcons.SINGLE_ROOM}
                        alt=""
                        className="h-4 w-4 object-contain rounded-sm"
                      />
                      {heroListing.type.replace(/_/g, " ")}
                    </p>
                    <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {heroListing.title}
                    </h2>
                    <p className="text-sm text-muted-foreground/70 line-clamp-2">
                      {heroListing.description}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
                      <MapPin className="h-3 w-3" />
                      {heroListing.property.address}, {heroListing.property.city}
                    </div>
                    <div className="pt-2 flex items-center gap-4">
                      <span className="text-2xl font-extrabold text-foreground tracking-tight">
                        Rs. {heroListing.price.toLocaleString("en-IN")}
                        <span className="text-sm font-medium text-muted-foreground/60">/mo</span>
                      </span>
                      <span className="flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                        View Details <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Recently Added Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              Recently Added
            </h2>
            <Link
              href="/rooms"
              className="text-xs font-semibold text-primary hover:underline underline-offset-2 flex items-center gap-1"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {restListings.map((unit) => (
              <Link
                key={unit.id}
                href={`/units/${unit.id}`}
                className="group rounded-2xl border border-border/30 bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-flex items-center gap-1 rounded-lg bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    <img
                      src={roomTypeIcons[unit.type] || roomTypeIcons.SINGLE_ROOM}
                      alt=""
                      className="h-3 w-3 object-contain rounded-sm"
                    />
                    {unit.type.replace(/_/g, " ")}
                  </span>
                  <span className="text-[10px] text-muted-foreground/40">
                    {new Date(unit.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                  {unit.title}
                </h3>
                <p className="text-xs text-muted-foreground/60 line-clamp-2 mb-3 leading-relaxed">
                  {unit.description}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground/50 mb-3">
                  <MapPin className="h-3 w-3 shrink-0" />
                  {unit.property.city}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base font-extrabold text-foreground tracking-tight">
                    Rs. {unit.price.toLocaleString("en-IN")}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all">
                    View <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Info / Announcement Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-border/30 bg-gradient-to-br from-primary/5 to-primary/[0.02] p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
              <Building2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-1">Are you a landlord?</h3>
            <p className="text-sm text-muted-foreground/70 leading-relaxed">
              List your properties for free and reach thousands of tenants looking for their next space.
            </p>
            <Link
              href="/landlord"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-2"
            >
              Start listing <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="rounded-2xl border border-border/30 bg-card p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 mb-3">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-foreground mb-1">Tips & Updates</h3>
            <p className="text-sm text-muted-foreground/70 leading-relaxed">
              Check out our blog for rental tips, city guides, and platform updates to make the most of Roomeo.
            </p>
            <Link
              href="/blog"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline underline-offset-2"
            >
              Read blog <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Join section for non-logged-in users */}
        {!session && (
          <div className="mt-10 rounded-3xl bg-gradient-to-br from-primary to-blue-600 p-8 text-center text-white shadow-xl shadow-primary/20">
            <h2 className="text-2xl font-extrabold tracking-tight">Start your search</h2>
            <p className="mt-2 text-white/80 text-sm max-w-md mx-auto">
              Create an account to save favorites, contact landlords, and get personalized recommendations.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Link
                href="/signup"
                className="inline-flex h-11 items-center rounded-2xl bg-white px-8 text-sm font-bold text-primary shadow-lg transition-all hover:scale-[0.97] active:scale-95"
              >
                Get Started
              </Link>
              <Link
                href="/login"
                className="inline-flex h-11 items-center rounded-2xl border border-white/30 px-8 text-sm font-bold text-white transition-all hover:bg-white/10"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
