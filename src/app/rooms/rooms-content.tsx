"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, SlidersHorizontal, X, RotateCcw, MapPin, Home,
  ChevronDown, ArrowUpDown, Map,
} from "lucide-react";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";
import { Pagination } from "@/components/ui/pagination";
import FavoriteButton from "@/components/shared/favorite-button";
import type { RoomsResult, RoomsFilters } from "./actions";
import type { UnitCard } from "@/types";

const roomTypeOptions = [
  { value: "SINGLE_ROOM", label: "Single Room", icon: "Single_room.png" },
  { value: "DOUBLE_ROOM", label: "Double Room", icon: "Double_room.png" },
  { value: "SHARED_ROOM", label: "Shared Room", icon: "Shared_room.png" },
  { value: "FLAT", label: "Flat", icon: "Flat.png" },
  { value: "STUDIO", label: "Studio", icon: "Studio.png" },
  { value: "PG", label: "PG", icon: "PG_Hostel.png" },
];

const amenityFilters = [
  { key: "furnished", label: "Furnished" },
  { key: "attachedBath", label: "Attached Bath" },
  { key: "wifi", label: "WiFi" },
  { key: "parking", label: "Parking" },
  { key: "petFriendly", label: "Pet Friendly" },
  { key: "balcony", label: "Balcony" },
  { key: "kitchenAccess", label: "Kitchen" },
];

const ruleFilters = [
  { key: "bachelorFriendly", label: "Bachelor Friendly" },
  { key: "familyFriendly", label: "Family Friendly" },
  { key: "boysOnly", label: "Boys Only" },
  { key: "girlsOnly", label: "Girls Only" },
  { key: "availableNow", label: "Available Now" },
];

interface RoomsContentProps {
  initialData: RoomsResult;
  initialFilters: RoomsFilters;
}

const roomTypeIcons: Record<string, string> = {
  SINGLE_ROOM: "/icons-for-rooms/room-icons-1/Single_room.png",
  DOUBLE_ROOM: "/icons-for-rooms/room-icons-1/Double_room.png",
  SHARED_ROOM: "/icons-for-rooms/room-icons-1/Shared_room.png",
  FLAT: "/icons-for-rooms/room-icons-1/Flat.png",
  STUDIO: "/icons-for-rooms/room-icons-1/Studio.png",
  PG: "/icons-for-rooms/room-icons-1/PG_Hostel.png",
};

const roomTypeLabels: Record<string, string> = {
  SINGLE_ROOM: "Single Room",
  DOUBLE_ROOM: "Double Room",
  SHARED_ROOM: "Shared Room",
  FLAT: "Flat",
  STUDIO: "Studio",
  PG: "PG",
};

function PillButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border text-muted-foreground hover:border-border hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function UnitCard({ unit }: { unit: RoomsResult["units"][number] }) {
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: unit.currency || "INR",
    minimumFractionDigits: 0,
  }).format(unit.price);

  return (
    <div className="group rounded-2xl border border-border/50 bg-card shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
      <Link href={`/units/${unit.id}`} className="block">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-dim">
          {unit.media && unit.media.length > 0 ? (
            <img
              src={unit.media[0].url}
              alt={unit.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <img
                src={roomTypeIcons[unit.type] || roomTypeIcons.SINGLE_ROOM}
                alt=""
                className="h-8 w-8 object-contain opacity-30"
              />
            </div>
          )}
          <div className="absolute top-3 right-3 z-10">
            <FavoriteButton unit={unit as unknown as UnitCard} />
          </div>
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 pt-8">
            <span className="text-xl font-bold text-white tracking-tight drop-shadow-sm">
              {formattedPrice} <span className="text-sm font-normal text-white/80">/mo</span>
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/units/${unit.id}`}>
          <h3 className="text-base font-semibold text-foreground line-clamp-1 mb-1 group-hover:text-primary transition-colors">
            {unit.title}
          </h3>
        </Link>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground line-clamp-1 mb-3">
          <MapPin className="h-4 w-4 shrink-0 text-muted-foreground/70" />
          {unit.property.address}, {unit.property.city}
        </p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 font-medium">
            <img
              src={roomTypeIcons[unit.type] || roomTypeIcons.SINGLE_ROOM}
              alt=""
              className="h-3.5 w-3.5 object-contain rounded-sm"
            />
            {roomTypeLabels[unit.type] || unit.type.replace(/_/g, " ")}
          </span>
          {unit.furnished && (
            <span className="rounded-md bg-secondary px-2 py-0.5 font-medium">
              Furnished
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/explore?selected=${unit.id}`}
            className="flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-[11px] font-semibold text-primary transition-all hover:bg-primary/10 hover:border-primary/30 active:scale-95"
          >
            <Map className="h-3 w-3" />
            View on Map
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RoomsContent({ initialData, initialFilters }: RoomsContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(initialFilters.query ?? "");
  const [showFilters, setShowFilters] = useState(false);

  const updateParams = (patch: Partial<RoomsFilters>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(patch).forEach(([key, val]) => {
      if (val === undefined || val === null || val === "" || (Array.isArray(val) && val.length === 0)) {
        params.delete(key);
      } else if (Array.isArray(val)) {
        params.set(key, val.join(","));
      } else {
        params.set(key, String(val));
      }
    });
    params.delete("page");
    router.push(`/rooms?${params.toString()}`);
  };

  const toggleArrayFilter = (key: string, value: string) => {
    const current = (searchParams.get(key) ?? "").split(",").filter(Boolean);
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateParams({ [key]: updated.length > 0 ? updated.join(",") : undefined } as Partial<RoomsFilters>);
  };

  const toggleBooleanFilter = (key: string) => {
    const current = searchParams.get(key);
    updateParams({ [key]: current ? undefined : "true" } as Partial<RoomsFilters>);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    const keys = [
      "priceMin", "priceMax", "roomType", "furnished", "attachedBath",
      "wifi", "parking", "petFriendly", "balcony", "kitchenAccess",
      "bachelorFriendly", "familyFriendly", "boysOnly", "girlsOnly", "availableNow",
    ];
    keys.forEach((k) => {
      const v = searchParams.get(k);
      if (v) count += k === "roomType" ? v.split(",").length : 1;
    });
    return count;
  }, [searchParams]);

  const clearFilters = () => {
    const params = new URLSearchParams();
    const q = searchParams.get("query");
    if (q) params.set("query", q);
    router.push(`/rooms?${params.toString()}`);
  };

  const currentPage = Number(searchParams.get("page") ?? "1");

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Browse Rooms
          </h1>
          <p className="mt-1 text-sm text-muted-foreground/70">
            {initialData.total} listings found — use filters to narrow down your search.
          </p>
        </div>

        {/* Search & Sort Bar */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by title, city, or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") updateParams({ query: searchQuery || undefined });
              }}
              className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={searchParams.get("sort") ?? "newest"}
              onChange={(e) => updateParams({ sort: e.target.value as "newest" | "price_asc" | "price_desc" })}
              className="h-11 rounded-xl border border-border bg-background px-3 pr-8 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
            >
              <option value="newest">Newest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-all ${
                activeFilterCount > 0
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border text-foreground hover:bg-secondary"
              }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <AnimatePresence mode="wait">
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-64 shrink-0 space-y-6"
              >
                <div className="sticky top-24 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold text-foreground">Filters</h2>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                      >
                        <RotateCcw className="h-3 w-3" />
                        Reset
                      </button>
                    )}
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Price Range</h3>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        defaultValue={searchParams.get("priceMin") ?? ""}
                        onBlur={(e) => updateParams({ priceMin: e.target.value ? Number(e.target.value) : undefined })}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                      <span className="text-muted-foreground text-xs">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        defaultValue={searchParams.get("priceMax") ?? ""}
                        onBlur={(e) => updateParams({ priceMax: e.target.value ? Number(e.target.value) : undefined })}
                        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  {/* Room Type */}
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Room Type</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {roomTypeOptions.map((opt) => (
                        <PillButton
                          key={opt.value}
                          active={(searchParams.get("roomType") ?? "").includes(opt.value)}
                          onClick={() => toggleArrayFilter("roomType", opt.value)}
                        >
                          <img
                            src={`/icons-for-rooms/room-icons-1/${opt.icon}`}
                            alt=""
                            className="h-3.5 w-3.5 object-contain rounded-sm"
                          />
                          {opt.label}
                        </PillButton>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Amenities</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {amenityFilters.map((f) => (
                        <PillButton
                          key={f.key}
                          active={!!searchParams.get(f.key)}
                          onClick={() => toggleBooleanFilter(f.key)}
                        >
                          {f.label}
                        </PillButton>
                      ))}
                    </div>
                  </div>

                  {/* Rules / Preferences */}
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-2">Preferences</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {ruleFilters.map((f) => (
                        <PillButton
                          key={f.key}
                          active={!!searchParams.get(f.key)}
                          onClick={() => toggleBooleanFilter(f.key)}
                        >
                          {f.label}
                        </PillButton>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {initialData.units.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                  <Search className="h-8 w-8 text-muted-foreground/50" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">No listings found</h3>
                <p className="mt-1 text-sm text-muted-foreground/70 text-center max-w-sm">
                  Try adjusting your filters or search query to find more results.
                </p>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 active:scale-95"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Clear all filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground/60 font-medium">
                    Showing {initialData.units.length} of {initialData.total} results
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {initialData.units.map((unit) => (
                    <UnitCard key={unit.id} unit={unit} />
                  ))}
                </div>

                <div className="mt-8 border-t border-border/40 pt-6">
                  <Pagination
                    currentPage={initialData.currentPage}
                    totalPages={initialData.totalPages}
                    basePath="/rooms"
                    searchParams={Object.fromEntries(searchParams.entries())}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
