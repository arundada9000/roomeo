import { create } from "zustand";
import type { FilterState, MapBounds, Coordinates } from "@/types";

interface MapStore {
  // Current map center & zoom
  center: Coordinates;
  zoom: number;
  setCenter: (center: Coordinates) => void;
  setZoom: (zoom: number) => void;

  // Visible map bounds (for viewport-based fetching)
  bounds: MapBounds | null;
  setBounds: (bounds: MapBounds) => void;

  // User's live location
  userLocation: Coordinates | null;
  setUserLocation: (loc: Coordinates | null) => void;

  // Selected listing on map
  selectedUnitId: string | null;
  setSelectedUnitId: (id: string | null) => void;

  // Filter state
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;

  // UI state
  isFilterOpen: boolean;
  setFilterOpen: (open: boolean) => void;
  viewMode: "map" | "list" | "split";
  setViewMode: (mode: "map" | "list" | "split") => void;
}

const defaultFilters: FilterState = {};

// Default center: Kathmandu, Nepal
const DEFAULT_CENTER: Coordinates = { lat: 27.7172, lng: 85.324 };

export const useMapStore = create<MapStore>((set) => ({
  center: DEFAULT_CENTER,
  zoom: 13,
  setCenter: (center) => set({ center }),
  setZoom: (zoom) => set({ zoom }),

  bounds: null,
  setBounds: (bounds) => set({ bounds }),

  userLocation: null,
  setUserLocation: (userLocation) => set({ userLocation }),

  selectedUnitId: null,
  setSelectedUnitId: (selectedUnitId) => set({ selectedUnitId }),

  filters: defaultFilters,
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: defaultFilters }),

  isFilterOpen: false,
  setFilterOpen: (isFilterOpen) => set({ isFilterOpen }),
  viewMode: "split",
  setViewMode: (viewMode) => set({ viewMode }),
}));
