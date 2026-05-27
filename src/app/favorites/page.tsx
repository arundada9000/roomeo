"use client";

import { useEffect, useState, useMemo } from "react";
import Navbar from "@/components/shared/navbar";
import UnitListingCard from "@/components/listing/unit-listing-card";
import { Heart, Search, ArrowUpDown, Loader2 } from "lucide-react";
import Link from "next/link";
import type { UnitCard } from "@/types";

type SortKey = "price-asc" | "price-desc" | "newest" | "oldest" | "name";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<UnitCard[]>([]);
  const [mounted, setMounted] = useState(false);
  const [sort, setSort] = useState<SortKey>("newest");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      const saved = localStorage.getItem("roomeo_favorites");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setFavorites(parsed);
        } catch {
          // ignore
        }
      }
    }, 0);

    const handleFavoritesChange = () => {
      const saved = localStorage.getItem("roomeo_favorites");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setFavorites(parsed);
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener("roomeo_favorites_changed", handleFavoritesChange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("roomeo_favorites_changed", handleFavoritesChange);
    };
  }, []);

  const filtered = useMemo(() => {
    let list = [...favorites];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (u) =>
          u.title.toLowerCase().includes(q) ||
          u.property?.city?.toLowerCase().includes(q),
      );
    }

    return list.sort((a, b) => {
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "oldest":
          return aTime - bTime;
        case "name":
          return a.title.localeCompare(b.title);
        case "newest":
        default:
          return bTime - aTime;
      }
    });
  }, [favorites, sort, searchQuery]);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Saved Places
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground/80">
            {favorites.length} saved place{favorites.length !== 1 ? "s" : ""}.
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search saved places..."
                className="h-10 w-full rounded-xl border border-border/40 bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40"
              />
            </div>
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground/50" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="h-9 rounded-xl border border-border/40 bg-card px-3 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((unit) => (
              <UnitListingCard key={unit.id} unit={unit} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/50 py-24 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <Heart className="h-10 w-10 text-muted-foreground/30" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              {searchQuery ? "No matches found" : "No favorites yet"}
            </h3>
            <p className="mt-2 max-w-sm text-muted-foreground">
              {searchQuery
                ? `Nothing matching "${searchQuery}" in your saved places.`
                : "Explore listings and tap the heart icon to save places you love."}
            </p>
            <Link
              href="/explore"
              className="mt-6 flex h-11 items-center gap-2 rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md shadow-primary/20 transition-all hover:scale-[0.98] active:scale-95"
            >
              <Search className="h-4 w-4" />
              Explore Rooms
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
