"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useTransition } from "react";
import { MapPin, List, Map as MapIcon, Columns2, Locate, Search } from "lucide-react";
import Navbar from "@/components/shared/navbar";
import UnitListingCard from "@/components/listing/unit-listing-card";
import FilterPanel from "@/components/shared/filter-panel";
import { useMapStore } from "@/stores/map-store";
import { getExploreListings } from "./actions";
import type { UnitCard } from "@/types";

// Dynamically import map to avoid SSR issues with Leaflet
const ExploreMap = dynamic(() => import("@/components/map/explore-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-secondary/30">
      <div className="flex flex-col items-center gap-2">
        <MapPin className="h-8 w-8 animate-pulse text-primary/40" />
        <span className="text-sm text-muted-foreground">Loading map...</span>
      </div>
    </div>
  ),
});

export default function ExplorePageContent({ initialListings }: { initialListings: UnitCard[] }) {
  const viewMode = useMapStore((s) => s.viewMode);
  const setViewMode = useMapStore((s) => s.setViewMode);
  const setCenter = useMapStore((s) => s.setCenter);
  const userLocation = useMapStore((s) => s.userLocation);
  const filters = useMapStore((s) => s.filters);
  const bounds = useMapStore((s) => s.bounds);
  const center = useMapStore((s) => s.center);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [listings, setListings] = useState<UnitCard[]>(initialListings);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Fetch data from server when filters change
  async function fetchListings() {
    setIsLoading(true);
    try {
      const data = await getExploreListings({
        ...filters,
        bounds: bounds || undefined,
        center: center || undefined,
        searchQuery,
      });
      setListings(data as unknown as UnitCard[]);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchListings();
  }, [filters, searchQuery, bounds]);

  const handleLocateMe = () => {
    if (userLocation) {
      setCenter(userLocation);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col bg-background overflow-hidden pb-14 md:pb-0">
      <div className="relative z-10">
        <Navbar />
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 border-b border-border/60 bg-card px-4 py-2.5">
        {/* Search */}
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search area, city, or landmark..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            id="explore-search"
          />
        </div>

        <FilterPanel />

        {/* Locate Me */}
        <button
          onClick={handleLocateMe}
          className="hidden h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:flex"
          aria-label="Locate me"
          id="explore-locate-me"
        >
          <Locate className="h-4 w-4" />
        </button>

        {/* View Toggles */}
        <div className="hidden items-center rounded-lg border border-border bg-card p-0.5 md:flex">
          {[
            { mode: "split" as const, icon: Columns2, label: "Split" },
            { mode: "map" as const, icon: MapIcon, label: "Map" },
            { mode: "list" as const, icon: List, label: "List" },
          ].map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                viewMode === mode
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={`${label} view`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Listing Panel */}
        {(viewMode === "list" || viewMode === "split") && (
          <div
            className={`overflow-y-auto border-r border-border/60 bg-background ${
              viewMode === "split" ? "w-full md:w-[420px]" : "w-full"
            }`}
          >
            <div className="px-4 py-3 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {listings.length}
                </span>{" "}
                rooms found
              </p>
              {isPending && <span className="text-xs text-muted-foreground">Updating...</span>}
            </div>
            <div
              className={`grid gap-3 px-4 pb-4 ${
                viewMode === "list"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              }`}
            >
              {listings.map((unit) => (
                <UnitListingCard key={unit.id} unit={unit} />
              ))}
              {listings.length === 0 && !isPending && (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground/30" />
                  <p className="mt-4 text-base font-medium text-foreground">
                    No rooms found
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try adjusting your filters or search area.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Map Panel */}
        {(viewMode === "map" || viewMode === "split") && (
          <div className="relative flex-1">
            <ExploreMap listings={listings} />

            {/* Mobile: Floating locate button */}
            <button
              onClick={handleLocateMe}
              className="absolute bottom-6 right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-card text-foreground shadow-lg border border-border transition-all hover:shadow-xl sm:hidden"
              aria-label="Locate me"
            >
              <Locate className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
