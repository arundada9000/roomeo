# Architecture

## Overview

Roomeo is a Next.js 16 App Router application with a PostgreSQL/PostGIS backend. The frontend uses React 19 with Leaflet for map rendering, Zustand for state management, and TailwindCSS 4 for styling.

---

## Data Flow

```
Browser
  │
  ├── Server Components (RSC)
  │     └── Fetch data directly via Prisma
  │
  ├── Server Actions
  │     └── getExploreListings(), getRooms()
  │         └── Prisma + PostGIS queries
  │
  ├── Client Components
  │     ├── Zustand Store (map-store.ts)
  │     │     ├── center, zoom, bounds
  │     │     ├── userLocation
  │     │     ├── selectedUnitId
  │     │     ├── filters (FilterState)
  │     │     └── viewMode
  │     │
  │     ├── explore-map.tsx (Leaflet Map)
  │     │     ├── L.divIcon markers (price + room icon)
  │     │     ├── PopupCard (image, amenities, actions)
  │     │     ├── user location dot
  │     │     └── MapEventHandler (syncs bounds → store)
  │     │
  │     ├── explore-content.tsx (Orchestrator)
  │     │     ├── Floating search bar + filter pills
  │     │     ├── Bottom sheet (draggable listing cards)
  │     │     └── FilterModal (full-screen filter overlay)
  │     │
  │     └── unit-listing-card.tsx (Reusable card)
  │           ├── Image with room-type icon fallback
  │           ├── Price, title, address, amenities
  │           └── Favorite button
  │
  └── API / Auth (Better Auth)
```

---

## State Management (Zustand)

The `useMapStore` holds all map-related UI state:

| State            | Purpose                                      |
|------------------|----------------------------------------------|
| `center`         | Current map center (`{lat, lng}`)            |
| `zoom`           | Current zoom level                           |
| `bounds`         | Visible viewport bounds (`N/S/E/W`)          |
| `userLocation`   | Device GPS location                          |
| `selectedUnitId` | Active marker/card ID                        |
| `filters`        | Active filter criteria (`FilterState`)       |
| `isFilterOpen`   | Filter panel visibility                      |
| `viewMode`       | `"map"` / `"list"` / `"split"`              |

---

## Component Hierarchy (Explore Page)

```
ExplorePageContent
├── Navbar
├── SearchBar + FilterPills
├── ExploreMap (dynamic import, SSR disabled)
│   ├── TileLayer (CartoDB light_all)
│   ├── MapEventHandler
│   ├── RecenterMap
│   ├── Marker[] (custom L.divIcon)
│   │   └── Popup → PopupCard
│   ├── Marker (user location)
│   └── Locate Me button
├── BottomSheet (draggable listing list)
│   └── UnitListingCard[]
└── FilterModal (full-screen overlay)
    ├── Price Range
    ├── Search Radius
    ├── Property Type
    ├── Amenities
    └── House Rules
```

---

## Key Design Decisions

1. **Map markers use `L.divIcon`** — allows custom HTML with room-type PNG icons + price pill. Avoids Leaflet's default marker icon.

2. **Room-type icons are static PNGs** — stored in `public/icons-for-rooms/`. Three variant sets available; `room-icons-1` is the active set. Icons are referenced by path string, not imported as React components (needed for Leaflet's raw HTML markers).

3. **Server Components + Client Components** — page shells are server components that fetch initial data; interactive UI is delegated to client components with `"use client"`.

4. **PostGIS-powered geospatial queries** — `getExploreListings()` in `explore/actions.ts` uses PostGIS `ST_DWithin` for radius-based filtering and bounding box queries.

5. **React 19 + Next.js 16** — the project uses React 19's concurrent features. Effects that call `setState` must be handled carefully (see `setTimeout(0)` pattern used throughout).
