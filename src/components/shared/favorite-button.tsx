"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import type { UnitCard } from "@/types";

export default function FavoriteButton({ unit, className }: { unit: UnitCard, className?: string }) {
  const [isSaved, setIsSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("roomeo_favorites");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.find((u: any) => u.id === unit.id)) {
          setIsSaved(true);
        }
      } catch (e) {}
    }
  }, [unit.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // prevent navigation if inside a Link
    e.stopPropagation();

    const saved = localStorage.getItem("roomeo_favorites");
    let parsed = [];
    if (saved) {
      try { parsed = JSON.parse(saved); } catch (e) {}
    }

    if (isSaved) {
      parsed = parsed.filter((u: any) => u.id !== unit.id);
      setIsSaved(false);
    } else {
      parsed.push(unit);
      setIsSaved(true);
    }

    localStorage.setItem("roomeo_favorites", JSON.stringify(parsed));
    
    // Dispatch a custom event in case favorites page is open in another tab or we want to listen to it
    window.dispatchEvent(new Event("roomeo_favorites_changed"));
  };

  if (!mounted) {
    return (
      <button className={className || "flex h-8 w-8 items-center justify-center rounded-full bg-background/50 backdrop-blur-md text-foreground transition-colors hover:bg-background/90"}>
        <Heart className="h-4 w-4" />
      </button>
    );
  }

  return (
    <button 
      onClick={toggleFavorite}
      className={className || "flex h-8 w-8 items-center justify-center rounded-full bg-background/50 backdrop-blur-md text-foreground transition-colors hover:bg-background/90 active:scale-95"}
    >
      <Heart className={`h-4 w-4 transition-colors ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
    </button>
  );
}
