"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useMapStore } from "@/stores/map-store";
import { FilterState, RoomType } from "@/types";
import { useState, useEffect, useRef } from "react";

export default function FilterModal({ 
  isOpen, 
  onClose,
  activeTab = "price" 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  activeTab?: string;
}) {
  const filters = useMapStore((s) => s.filters);
  const setFilters = useMapStore((s) => s.setFilters);
  const resetFilters = useMapStore((s) => s.resetFilters);

  // Local state for the form
  const [localFilters, setLocalFilters] = useState<Partial<FilterState>>(filters);
  const prevOpenRef = useRef(isOpen);

  useEffect(() => {
    if (isOpen && !prevOpenRef.current) {
      setLocalFilters(filters);
    }
    prevOpenRef.current = isOpen;
  }, [isOpen, filters]);

  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    resetFilters();
    setLocalFilters({});
    onClose();
  };

  const toggleAmenity = (key: keyof FilterState) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleRoomType = (type: RoomType) => {
    setLocalFilters(prev => {
      const current = prev.roomType || [];
      if (current.includes(type)) {
        return { ...prev, roomType: current.filter(t => t !== type) };
      }
      return { ...prev, roomType: [...current, type] };
    });
  };

  const roomTypeIcons: Record<string, string> = {
    SINGLE_ROOM: "/icons-for-rooms/room-icons-1/Single_room.png",
    DOUBLE_ROOM: "/icons-for-rooms/room-icons-1/Double_room.png",
    SHARED_ROOM: "/icons-for-rooms/room-icons-1/Shared_room.png",
    FLAT: "/icons-for-rooms/room-icons-1/Flat.png",
    STUDIO: "/icons-for-rooms/room-icons-1/Studio.png",
    PG: "/icons-for-rooms/room-icons-1/PG_Hostel.png",
  };

  const roomTypes = [
    { value: RoomType.SINGLE_ROOM, label: "Single Room" },
    { value: RoomType.DOUBLE_ROOM, label: "Double Room" },
    { value: RoomType.SHARED_ROOM, label: "Shared Room" },
    { value: RoomType.FLAT, label: "Flat/Apartment" },
    { value: RoomType.STUDIO, label: "Studio" },
    { value: RoomType.PG, label: "PG" },
  ];

  const amenities = [
    { key: "wifi", label: "WiFi" },
    { key: "furnished", label: "Furnished" },
    { key: "attachedBath", label: "Attached Bath" },
    { key: "parking", label: "Parking" },
    { key: "petFriendly", label: "Pet Friendly" },
    { key: "balcony", label: "Balcony" },
    { key: "kitchenAccess", label: "Kitchen Access" },
    { key: "waterIncluded", label: "Water Included" },
    { key: "powerIncluded", label: "Power Included" },
  ];

  const rules = [
    { key: "bachelorFriendly", label: "Bachelor Friendly" },
    { key: "familyFriendly", label: "Family Friendly" },
    { key: "boysOnly", label: "Boys Only" },
    { key: "girlsOnly", label: "Girls Only" },
    { key: "smokingAllowed", label: "Smoking Allowed" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed bottom-0 left-0 right-0 z-[70] mx-auto max-w-2xl bg-surface rounded-t-3xl shadow-2xl flex flex-col max-h-[85vh]"
          >
            <div className="flex items-center justify-between p-6 border-b border-border/40">
              <h2 className="text-xl font-bold text-foreground tracking-tight">Filters</h2>
              <button 
                onClick={onClose}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Price Range */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Price Range</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-muted-foreground mb-1 block">Minimum</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                      <input 
                        type="number" 
                        value={localFilters.priceMin || ""}
                        onChange={(e) => setLocalFilters({ ...localFilters, priceMin: parseInt(e.target.value) || undefined })}
                        className="w-full rounded-xl border border-border/60 bg-background pl-8 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <span className="text-muted-foreground mt-5">-</span>
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-muted-foreground mb-1 block">Maximum</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                      <input 
                        type="number" 
                        value={localFilters.priceMax || ""}
                        onChange={(e) => setLocalFilters({ ...localFilters, priceMax: parseInt(e.target.value) || undefined })}
                        className="w-full rounded-xl border border-border/60 bg-background pl-8 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Any"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Radius Filter */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Search Radius</h3>
                  <span className="text-sm font-bold text-primary">{localFilters.radius ? `${localFilters.radius} km` : 'Anywhere'}</span>
                </div>
                <div className="flex items-center gap-4">
                   <input 
                     type="range" 
                     min="1" max="50" step="1"
                     value={localFilters.radius || 50}
                     onChange={(e) => {
                       const val = parseInt(e.target.value);
                       setLocalFilters({ ...localFilters, radius: val === 50 ? undefined : val });
                     }}
                     className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                   />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Filter rooms by distance from your current location. (Drag to far right for anywhere).</p>
              </div>

              {/* Property Type */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Property Type</h3>
                <div className="flex flex-wrap gap-2">
                  {roomTypes.map(type => {
                    const isSelected = localFilters.roomType?.includes(type.value);
                    return (
                      <button
                        key={type.value}
                        onClick={() => toggleRoomType(type.value)}
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                          isSelected 
                            ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20' 
                            : 'bg-background text-muted-foreground border-border/60 hover:border-primary/40'
                        }`}
                      >
                        <img
                          src={roomTypeIcons[type.value] || roomTypeIcons.SINGLE_ROOM}
                          alt=""
                          className="h-4 w-4 object-contain rounded-sm"
                          style={isSelected ? { filter: 'brightness(0) invert(1)' } : undefined}
                        />
                        {type.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {amenities.map(amenity => {
                    const isSelected = localFilters[amenity.key as keyof FilterState];
                    return (
                      <button
                        key={amenity.key}
                        onClick={() => toggleAmenity(amenity.key as keyof FilterState)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                          isSelected 
                            ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20' 
                            : 'bg-background text-muted-foreground border-border/60 hover:border-primary/40'
                        }`}
                      >
                        {amenity.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Rules */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">House Rules</h3>
                <div className="flex flex-wrap gap-2">
                  {rules.map(rule => {
                    const isSelected = localFilters[rule.key as keyof FilterState];
                    return (
                      <button
                        key={rule.key}
                        onClick={() => toggleAmenity(rule.key as keyof FilterState)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                          isSelected 
                            ? 'bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/20' 
                            : 'bg-background text-muted-foreground border-border/60 hover:border-primary/40'
                        }`}
                      >
                        {rule.label}
                      </button>
                    )
                  })}
                </div>
              </div>

            </div>

            <div className="p-6 border-t border-border/40 bg-surface flex gap-4 pb-safe md:pb-6 mb-[72px] md:mb-0">
              <button 
                onClick={handleReset}
                className="flex-1 py-3.5 rounded-2xl font-bold text-foreground border border-border/60 hover:bg-secondary/50 transition-colors"
              >
                Clear all
              </button>
              <button 
                onClick={handleApply}
                className="flex-1 py-3.5 rounded-2xl font-bold text-primary-foreground bg-primary shadow-md shadow-primary/20 transition-all hover:scale-[0.98] active:scale-95"
              >
                Show Results
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
