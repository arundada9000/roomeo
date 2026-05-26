"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/shared/navbar";
import UnitListingCard from "@/components/listing/unit-listing-card";
import { Heart, Search } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("roomeo_favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing favorites", e);
      }
    }
  }, []);

  useEffect(() => {
    const onFocus = () => {
      const saved = localStorage.getItem("roomeo_favorites");
      if (saved) setFavorites(JSON.parse(saved));
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Saved Places
          </h1>
          <p className="mt-2 text-muted-foreground">
            Rooms and flats you've bookmarked for later.
          </p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorites.map((unit) => (
              <UnitListingCard key={unit.id} unit={unit} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center rounded-3xl border border-dashed border-border bg-card/50">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary mb-6">
              <Heart className="h-10 w-10 text-muted-foreground/30" />
            </div>
            <h3 className="text-xl font-bold text-foreground">No favorites yet</h3>
            <p className="mt-2 text-muted-foreground max-w-sm">
              Explore listings and tap the heart icon to save places you love.
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
