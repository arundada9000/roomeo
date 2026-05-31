# Components

**Repository:** [https://github.com/arundada9000/roomeo](https://github.com/arundada9000/roomeo)  
**Hosted at:** [https://roomeo.vercel.app](https://roomeo.vercel.app)

---

## Map Components (`src/components/map/`)

### `explore-map.tsx`

The Leaflet map component. Renders markers, popups, user location, and the locate-me button.

**Props:**
```typescript
interface ExploreMapProps {
  listings: UnitCard[];
}
```

**Key internals:**
- `createMarkerIcon(isSelected, priceStr, roomType)` — returns `L.divIcon` with room-type PNG + price pill
- `PopupCard` — rich popup with image, type badge, amenities, View Details + Directions
- `MapEventHandler` — syncs map bounds/center/zoom to Zustand store
- `RecenterMap` — animates map to new center when store changes
- `userLocationIcon` — blue dot with glow ring

**Marker styling:**
- Default: white background, blue text, room-type icon
- Selected: blue background, white text, room-type icon (scaled 1.05×)

---

### `filter-modal.tsx`

Full-screen bottom-sheet filter overlay (animated with Framer Motion).

**Props:**
```typescript
interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab?: string;
}
```

**Filter sections:**
- Price Range (min/max inputs)
- Search Radius (range slider, 1–50 km)
- Property Type (6 room-type buttons with icons)
- Amenities (9 toggle buttons)
- House Rules (6 toggle buttons)

**Pattern:** Uses local state that syncs to Zustand store on "Show Results" click.

---

## Listing Components (`src/components/listing/`)

### `unit-listing-card.tsx`

Reusable card used in the map bottom sheet and grid layouts.

**Props:**
```typescript
interface UnitListingCardProps {
  unit: UnitCard;
}
```

**Features:**
- Image with room-type icon fallback
- Favorite button (heart toggle)
- Price overlay (gradient bottom)
- Room type label with icon
- Address with map pin icon
- Amenity badges (Wifi, Parking, Bath, Furnished, Pets OK, Balcony, Kitchen)
- Selected state (ring highlight) synced with map store
- Link to `/units/[id]`

---

## Shared Components (`src/components/shared/`)

| Component       | Description                                      |
|-----------------|--------------------------------------------------|
| `Navbar`        | Responsive nav with auth-aware links              |
| `Footer`        | Site footer with links and branding               |
| `FilterPanel`   | Side drawer filter panel (used on smaller maps)   |
| `FavoriteButton`| Heart toggle with localStorage persistence        |
| `ShareButton`   | Copy link / share functionality                   |
| `ShareModal`    | Modal dialog for sharing                          |

---

## Admin Components (`src/components/admin/`)

| Component           | Description                          |
|---------------------|--------------------------------------|
| `admin-sidebar`     | Navigation sidebar for admin pages   |
| `admin-skeleton`    | Loading skeleton components          |
| `page-header`       | Reusable page header with title/desc |
| `charts/donut-chart`| Animated SVG donut chart             |

---

## UI Primitives (`src/components/ui/`)

Standard shadcn/ui components (Button, Card, Badge, Avatar, Dialog, Pagination, etc.) customized with the project's TailwindCSS theme.
