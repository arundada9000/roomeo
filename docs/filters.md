# Filtering System

## Overview

Roomeo has two filter UIs that share the same underlying filter state:

1. **Explore page** — map-based with floating filter pills + full-screen FilterModal
2. **Rooms page** — sidebar filter panel with URL-bound filters

Both use the `FilterState` type from `src/types/index.ts`.

---

## FilterState

```typescript
interface FilterState {
  priceMin?: number;
  priceMax?: number;
  roomType?: RoomType[];
  furnished?: boolean;
  attachedBath?: boolean;
  wifi?: boolean;
  parking?: boolean;
  petFriendly?: boolean;
  balcony?: boolean;
  kitchenAccess?: boolean;
  bachelorFriendly?: boolean;
  familyFriendly?: boolean;
  boysOnly?: boolean;
  girlsOnly?: boolean;
  smokingAllowed?: boolean;
  waterIncluded?: boolean;
  powerIncluded?: boolean;
  availableNow?: boolean;
  radius?: number;      // km, for PostGIS ST_DWithin
  query?: string;       // free-text search
}
```

---

## Filter UIs

### Explore Page (`/explore`)

| Filter Location     | Component         | Behavior                              |
|---------------------|-------------------|---------------------------------------|
| Floating pills      | `explore-content` | Inline dropdown (Price, Type, etc.)   |
| Full-screen modal   | `filter-modal`    | All filters in a bottom-sheet overlay |
| Zustand store       | `map-store`       | Filters stored in `FilterState`       |

**Data flow:**
1. User adjusts filters → `setFilters()` updates Zustand store
2. `useEffect` in `explore-content` detects filter change
3. `getExploreListings()` is called with current filters + map bounds
4. Listings update → map markers + bottom sheet cards re-render

### Rooms Page (`/rooms`)

| Filter Location | Component        | Behavior                                  |
|-----------------|------------------|-------------------------------------------|
| Sidebar panel   | `rooms-content`  | URL-bound filter params (roomType, etc.)  |
| URL params      | `searchParams`   | All filters synced to URL query string    |

**Data flow:**
1. User adjusts filters → `updateParams()` updates URL
2. Page re-fetches data on URL change
3. Server action `getRooms()` parses filters from URL params

---

## Server Actions

### `getExploreListings()` (`src/app/explore/actions.ts`)

PostGIS-powered geospatial query:
- Applies price, roomType, amenity, and rule filters via Prisma `where`
- Uses `ST_DWithin` for radius filtering from user location
- Falls back to bounding box filtering when no radius set
- Returns `UnitCard[]`

### `getRooms()` (`src/app/rooms/actions.ts`)

Standard Prisma query:
- Applies all filter types via Prisma `where`
- Supports sorting (`newest`, `price_asc`, `price_desc`)
- Supports pagination (page-based)
- Returns `RoomsResult` with units, total count, and pagination info

---

## Room Type Filters

Room type filter buttons display the corresponding room-type icon (from `public/icons-for-rooms/`) to provide visual context:

- **Selected state**: Primary color background (or border), icon may invert to white
- **Unselected state**: Neutral background, colored icon

This pattern is consistent across all filter UIs (modal, sidebar, inline dropdown).
