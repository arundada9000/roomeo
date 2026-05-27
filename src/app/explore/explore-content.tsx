"use client";

import dynamic from "next/dynamic";
import { useState, useEffect, useTransition } from "react";
import { MapPin, Search, SlidersHorizontal, ChevronDown, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/shared/navbar";
import UnitListingCard from "@/components/listing/unit-listing-card";
import FilterModal from "@/components/map/filter-modal";
import { useMapStore } from "@/stores/map-store";
import { getExploreListings } from "./actions";
import type { UnitCard, FilterState, RoomType } from "@/types";

// Dynamically import map to avoid SSR issues with Leaflet
const ExploreMap = dynamic(() => import("@/components/map/explore-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-[#faf8ff]">
      <div className="flex flex-col items-center gap-2">
        <MapPin className="h-8 w-8 animate-pulse text-primary/40" />
      </div>
    </div>
  ),
});

const filterPills = [
  { id: "price", label: "Price", icon: ChevronDown },
  { id: "type", label: "Property Type", icon: ChevronDown },
  { id: "amenities", label: "Amenities", icon: ChevronDown },
  { id: "rules", label: "Rules", icon: ChevronDown },
];

interface ExplorePageContentProps {
  initialListings: UnitCard[];
  selectedUnitId?: string | null;
}

export default function ExplorePageContent({ initialListings, selectedUnitId: initialSelectedId }: ExplorePageContentProps) {
  const setCenter = useMapStore((s) => s.setCenter);
  const setSelectedUnitId = useMapStore((s) => s.setSelectedUnitId);
  const userLocation = useMapStore((s) => s.userLocation);
  const filters = useMapStore((s) => s.filters);
  const bounds = useMapStore((s) => s.bounds);
  const center = useMapStore((s) => s.center);
  const selectedUnitId = useMapStore((s) => s.selectedUnitId);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [listings, setListings] = useState<UnitCard[]>(initialListings);
  const [isPending, startTransition] = useTransition();
  const [listMode, setListMode] = useState<"closed" | "peek" | "full">("peek");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeInlineFilter, setActiveInlineFilter] = useState<string | null>(null);

  const setFiltersStore = useMapStore((s) => s.setFilters);

  // Handle initial selected unit from URL query param
  useEffect(() => {
    if (initialSelectedId) {
      setSelectedUnitId(initialSelectedId);
      const unit = listings.find((u) => u.id === initialSelectedId);
      if (unit) {
        setCenter({ lat: unit.property.lat, lng: unit.property.lng });
      }
    }
  }, []); // only run on mount

  // Constants for inline filters
  const roomTypes = [
    { value: "SINGLE_ROOM", label: "Single Room" },
    { value: "FLAT", label: "Flat/Apartment" },
    { value: "STUDIO", label: "Studio" },
  ];
  
  const amenityOptions = [
    { key: "wifi", label: "WiFi" },
    { key: "furnished", label: "Furnished" },
    { key: "parking", label: "Parking" },
  ];

  // Fetch data from server when filters change
  async function fetchListings() {
    try {
      const data = await getExploreListings({
        ...filters,
        bounds: filters.radius ? undefined : (bounds || undefined), // ignore map bounds if radius filtering
        center: filters.radius && userLocation ? userLocation : (center || undefined),
        searchQuery,
      });
      setListings(data as unknown as UnitCard[]);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    }
  }

  useEffect(() => {
    fetchListings();
  }, [filters, searchQuery, bounds]);

  // Handle selected unit scrolling
  useEffect(() => {
    if (selectedUnitId) {
      const el = document.getElementById(`unit-card-${selectedUnitId}`);
      if (el) {
        setListMode((prev) => (prev === "closed" ? "peek" : prev));
        el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [selectedUnitId]);

  return (
    <div className="fixed inset-0 flex flex-col bg-[#faf8ff] overflow-hidden">
      
      {/* Top Navbar */}
      <div className="relative z-50">
         <Navbar />
      </div>

      {/* Floating Search & Filters Bar */}
      <div className="absolute top-[80px] left-0 right-0 z-40 px-4 pointer-events-none flex flex-col gap-3">
        {/* Search */}
        <div className="mx-auto w-full max-w-md pointer-events-auto">
          <div className="flex items-center gap-3 rounded-full bg-surface/90 px-4 py-3 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] backdrop-blur-xl border border-border/40">
            <Search className="h-5 w-5 text-primary" />
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search areas, cities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-foreground placeholder:text-muted-foreground focus:outline-none"
                id="explore-search"
              />
            </div>
            <button 
              onClick={() => setIsFilterModalOpen(true)}
              className="h-8 w-8 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center transition-colors hover:bg-primary/20"
            >
               <SlidersHorizontal className="h-4 w-4 text-primary" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="w-full max-w-[1280px] mx-auto pointer-events-auto relative">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1 px-1">
            {filterPills.map((pill) => (
              <button 
                key={pill.id}
                onClick={() => setActiveInlineFilter(activeInlineFilter === pill.id ? null : pill.id)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-transform active:scale-95 border ${
                  activeInlineFilter === pill.id 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-surface text-foreground shadow-sm shadow-black/5 border-border/60 hover:bg-secondary/50"
                }`}
              >
                {pill.label}
                <pill.icon className={`h-3.5 w-3.5 ${activeInlineFilter === pill.id ? "text-primary-foreground/80" : "text-muted-foreground"}`} />
              </button>
            ))}
          </div>

          {/* Inline Filter Dropdowns (Floating below pills) */}
          <AnimatePresence>
            {activeInlineFilter && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-2 left-1 z-50 bg-surface rounded-2xl shadow-xl border border-border/40 p-4 w-[280px]"
              >
                {activeInlineFilter === "price" && (
                  <div>
                     <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3">Price Range</h4>
                     <div className="flex items-center gap-2 mb-4">
                       <input 
                         type="number" placeholder="Min" 
                         value={filters.priceMin || ""}
                         onChange={e => setFiltersStore({ priceMin: parseInt(e.target.value) || undefined })}
                         className="w-1/2 p-2 rounded-lg border border-border/60 bg-background text-sm"
                       />
                       <span>-</span>
                       <input 
                         type="number" placeholder="Max" 
                         value={filters.priceMax || ""}
                         onChange={e => setFiltersStore({ priceMax: parseInt(e.target.value) || undefined })}
                         className="w-1/2 p-2 rounded-lg border border-border/60 bg-background text-sm"
                       />
                     </div>
                  </div>
                )}
                {activeInlineFilter === "type" && (
                  <div className="flex flex-col gap-2 mb-4">
                    {roomTypes.map(t => {
                      const isActive = filters.roomType?.includes(t.value as any);
                      return (
                        <button 
                          key={t.value}
                          onClick={() => {
                            const current = filters.roomType || [];
                            setFiltersStore({
                              roomType: isActive 
                                ? current.filter(x => x !== t.value)
                                : [...current, t.value as any]
                            });
                          }}
                          className={`text-left px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${isActive ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}
                        >
                          {t.label} {isActive && "✓"}
                        </button>
                      )
                    })}
                  </div>
                )}
                {activeInlineFilter === "amenities" && (
                  <div className="flex flex-col gap-2 mb-4">
                    {amenityOptions.map(t => {
                      const isActive = filters[t.key as keyof FilterState];
                      return (
                        <button 
                          key={t.key}
                          onClick={() => setFiltersStore({ [t.key]: !isActive })}
                          className={`text-left px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${isActive ? "bg-primary/10 text-primary" : "hover:bg-secondary"}`}
                        >
                          {t.label} {isActive && "✓"}
                        </button>
                      )
                    })}
                  </div>
                )}
                <div className="pt-3 border-t border-border/40 text-center">
                  <button 
                    onClick={() => { setActiveInlineFilter(null); setIsFilterModalOpen(true); }}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    Open Full Filter Menu
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Full Screen Map */}
      <div className="flex-1 w-full h-full relative z-0">
        <ExploreMap listings={listings} />
      </div>

      {/* Draggable Bottom Sheet Slider / Full Screen List */}
      <motion.div 
        className={`absolute bottom-0 left-0 right-0 z-40 ${listMode === "full" ? 'top-[80px] bg-[#faf8ff]' : ''}`}
        drag={listMode === "full" ? false : "y"}
        dragConstraints={{ top: 0 }}
        dragElastic={0.1}
        onDragEnd={(e, info) => {
          if (listMode === "full") return;
          if (info.offset.y > 50 || info.velocity.y > 300) {
            setListMode("closed");
          } else if (info.offset.y < -50 || info.velocity.y < -300) {
            setListMode("peek");
          }
        }}
        initial={false}
        animate={{ y: listMode === "full" ? 0 : (listMode === "peek" ? 0 : "calc(100% - 90px)") }}
        transition={{ type: "spring", bounce: 0, duration: 0.5 }}
      >
        <div className={`mx-auto w-full max-w-[1280px] bg-surface/95 backdrop-blur-xl rounded-t-[2.5rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.15)] pt-2 border border-border/60 ${listMode === "full" ? 'h-full flex flex-col pb-0' : 'pb-[100px]'}`}>
          
          {/* Draggable Header Area */}
          <div 
             className={`w-full pt-2 pb-5 px-6 flex flex-col items-center touch-none ${listMode !== "full" ? 'cursor-grab active:cursor-grabbing' : ''}`} 
             onClick={() => {
               if (listMode !== "full") setListMode(listMode === "closed" ? "peek" : "closed");
             }}
          >
            {listMode !== "full" && (
               <div className="h-1.5 w-14 rounded-full bg-outline-variant/60 hover:bg-outline-variant transition-colors mb-4" />
            )}
            
            <div className="w-full flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-foreground leading-tight tracking-tight">
                {listings.length} Results
              </h2>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setListMode(listMode === "full" ? "peek" : "full"); 
                }} 
                className="text-sm font-bold text-primary hover:text-primary-hover active:scale-95 transition-transform"
              >
                {listMode === "full" ? "Show map" : "View all"}
              </button>
            </div>
          </div>

          <div className={`${listMode === "full" ? 'flex-1 overflow-y-auto px-4 md:px-6 pb-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex overflow-x-auto gap-5 px-6 pb-4 snap-x snap-mandatory scrollbar-hide pointer-events-auto'}`}>
            {listings.map((unit) => (
              <div key={unit.id} id={`unit-card-${unit.id}`} className={listMode === "full" ? 'w-full' : 'min-w-[280px] w-[85%] sm:w-[320px] snap-center shrink-0'}>
                <UnitListingCard unit={unit} />
              </div>
            ))}
            {listings.length === 0 && (
               <div className="flex flex-col items-center justify-center w-full py-12">
                  <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <MapPin className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <p className="text-foreground font-bold">No results found.</p>
                  <p className="text-muted-foreground text-sm mt-1 text-center">Try adjusting your filters or searching a different area.</p>
               </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Floating Toggle Button (List/Map) */}
      <div className="absolute bottom-[110px] left-1/2 -translate-x-1/2 z-50">
        <AnimatePresence mode="wait">
          <motion.button
            key={listMode === "closed" ? "list" : "map"}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            onClick={() => {
              if (listMode === "closed") setListMode("peek");
              else if (listMode === "peek") setListMode("closed");
              else if (listMode === "full") setListMode("peek");
            }}
            className="flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-bold text-background shadow-xl hover:scale-105 active:scale-95 transition-transform pointer-events-auto"
          >
            {listMode === "closed" ? (
              <>
                <List className="h-4 w-4" /> List
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4" /> Map
              </>
            )}
          </motion.button>
        </AnimatePresence>
      </div>

      {/* Filter Modal */}
      <FilterModal 
        isOpen={isFilterModalOpen} 
        onClose={() => setIsFilterModalOpen(false)} 
      />

    </div>
  );
}
