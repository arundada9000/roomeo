"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/shared/navbar";
import UnitListingCard from "@/components/listing/unit-listing-card";
import { Heart } from "lucide-react";

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

  // Update local state when a favorite is removed via the heart icon
  // Since UnitListingCard uses localStorage directly, we listen to a custom event or just let user refresh
  // For better UX, we'll poll or hook into an event, but for this demo a simple re-read on focus works.
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
      
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500 fill-red-500" />
            Your Favorites
          </h1>
          <p className="mt-2 text-muted-foreground">
            Rooms and flats you've saved for later.
          </p>
        </div>

        {favorites.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorites.map((unit) => (
              <UnitListingCard key={unit.id} unit={unit} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-border bg-card/50">
            <Heart className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold text-foreground">No favorites yet</h3>
            <p className="mt-2 text-muted-foreground max-w-sm">
              Explore listings and tap the heart icon to save places you love.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
