"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import { useMapStore } from "@/stores/map-store";
import { RoomType } from "@/types";

const roomTypeIcons: Record<string, string> = {
  SINGLE_ROOM: "/icons-for-rooms/room-icons-1/Single_room.png",
  DOUBLE_ROOM: "/icons-for-rooms/room-icons-1/Double_room.png",
  SHARED_ROOM: "/icons-for-rooms/room-icons-1/Shared_room.png",
  FLAT: "/icons-for-rooms/room-icons-1/Flat.png",
  STUDIO: "/icons-for-rooms/room-icons-1/Studio.png",
  PG: "/icons-for-rooms/room-icons-1/PG_Hostel.png",
};

const roomTypeOptions: { value: RoomType; label: string }[] = [
  { value: RoomType.SINGLE_ROOM, label: "Single Room" },
  { value: RoomType.DOUBLE_ROOM, label: "Double Room" },
  { value: RoomType.SHARED_ROOM, label: "Shared Room" },
  { value: RoomType.FLAT, label: "Flat" },
  { value: RoomType.STUDIO, label: "Studio" },
  { value: RoomType.PG, label: "PG" },
];

const amenityFilters = [
  { key: "furnished" as const, label: "Furnished" },
  { key: "attachedBath" as const, label: "Attached Bath" },
  { key: "wifi" as const, label: "WiFi" },
  { key: "parking" as const, label: "Parking" },
  { key: "petFriendly" as const, label: "Pet Friendly" },
  { key: "balcony" as const, label: "Balcony" },
  { key: "kitchenAccess" as const, label: "Kitchen" },
  { key: "waterIncluded" as const, label: "Water Included" },
  { key: "powerIncluded" as const, label: "Power Included" },
];

const ruleFilters = [
  { key: "bachelorFriendly" as const, label: "Bachelor Friendly" },
  { key: "familyFriendly" as const, label: "Family Friendly" },
  { key: "boysOnly" as const, label: "Boys Only" },
  { key: "girlsOnly" as const, label: "Girls Only" },
  { key: "smokingAllowed" as const, label: "Smoking Allowed" },
  { key: "availableNow" as const, label: "Available Now" },
];

export default function FilterPanel() {
  const filters = useMapStore((s) => s.filters);
  const setFilters = useMapStore((s) => s.setFilters);
  const resetFilters = useMapStore((s) => s.resetFilters);
  const isFilterOpen = useMapStore((s) => s.isFilterOpen);
  const setFilterOpen = useMapStore((s) => s.setFilterOpen);

  const [localPriceMin, setLocalPriceMin] = useState<string>(
    filters.priceMin?.toString() || ""
  );
  const [localPriceMax, setLocalPriceMax] = useState<string>(
    filters.priceMax?.toString() || ""
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.priceMin) count++;
    if (filters.priceMax) count++;
    if (filters.roomType && filters.roomType.length > 0) count++;
    amenityFilters.forEach((f) => {
      if (filters[f.key]) count++;
    });
    ruleFilters.forEach((f) => {
      if (filters[f.key as keyof typeof filters]) count++;
    });
    return count;
  }, [filters]);

  const toggleAmenity = (key: string) => {
    const current = filters[key as keyof typeof filters];
    setFilters({ [key]: current ? undefined : true });
  };

  const toggleRoomType = (type: RoomType) => {
    const current = filters.roomType || [];
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    setFilters({ roomType: updated.length > 0 ? updated : undefined });
  };

  const applyPriceFilter = () => {
    setFilters({
      priceMin: localPriceMin ? Number(localPriceMin) : undefined,
      priceMax: localPriceMax ? Number(localPriceMax) : undefined,
    });
  };

  return (
    <>
      {/* Filter Toggle Button */}
      <button
        onClick={() => setFilterOpen(!isFilterOpen)}
        className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
          activeFilterCount > 0
            ? "border-primary/30 bg-primary/[0.06] text-primary"
            : "border-border bg-card text-foreground hover:border-border"
        }`}
        id="filter-toggle"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters
        {activeFilterCount > 0 && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Filter Panel Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            {/* Backdrop (mobile) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setFilterOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed bottom-0 left-0 top-16 z-50 w-80 overflow-y-auto border-r border-border bg-card shadow-xl md:relative md:top-0 md:z-auto md:shadow-none"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card px-4 py-3">
                <h2 className="text-base font-semibold text-foreground">Filters</h2>
                <div className="flex items-center gap-2">
                  {activeFilterCount > 0 && (
                    <button
                      onClick={() => {
                        resetFilters();
                        setLocalPriceMin("");
                        setLocalPriceMax("");
                      }}
                      className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <RotateCcw className="h-3 w-3" />
                      Reset
                    </button>
                  )}
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    aria-label="Close filters"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-6 p-4">
                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Price Range</h3>
                  <div className="mt-3 flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={localPriceMin}
                      onChange={(e) => setLocalPriceMin(e.target.value)}
                      onBlur={applyPriceFilter}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      id="filter-price-min"
                    />
                    <span className="text-muted-foreground">-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={localPriceMax}
                      onChange={(e) => setLocalPriceMax(e.target.value)}
                      onBlur={applyPriceFilter}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      id="filter-price-max"
                    />
                  </div>
                </div>

                {/* Room Type */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Room Type</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {roomTypeOptions.map((opt) => {
                      const isActive = filters.roomType?.includes(opt.value);
                      return (
                        <button
                          key={opt.value}
                          onClick={() => toggleRoomType(opt.value)}
                          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                            isActive
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-muted-foreground hover:border-border hover:text-foreground"
                          }`}
                        >
                          <img
                            src={roomTypeIcons[opt.value] || roomTypeIcons.SINGLE_ROOM}
                            alt=""
                            className="h-3.5 w-3.5 object-contain rounded-sm"
                          />
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Amenities</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {amenityFilters.map((f) => {
                      const isActive = !!filters[f.key];
                      return (
                        <button
                          key={f.key}
                          onClick={() => toggleAmenity(f.key)}
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                            isActive
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-muted-foreground hover:border-border hover:text-foreground"
                          }`}
                        >
                          {f.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Rules */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Preferences</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ruleFilters.map((f) => {
                      const isActive = !!filters[f.key as keyof typeof filters];
                      return (
                        <button
                          key={f.key}
                          onClick={() => toggleAmenity(f.key)}
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                            isActive
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border text-muted-foreground hover:border-border hover:text-foreground"
                          }`}
                        >
                          {f.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
