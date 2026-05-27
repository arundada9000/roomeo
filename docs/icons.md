# Room-Type Icons

## Overview

Room-type icons are small PNG images displayed on map markers, listing cards, detail pages, filter buttons, and the hub page. They provide a quick visual identifier for the type of room/unit.

---

## Icon Files

Icons are stored in `public/icons-for-rooms/` with three variant sets:

```
public/icons-for-rooms/
├── room-icons-1/     ◄── ACTIVE SET (used in code)
│   ├── Single_room.png
│   ├── Double_room.png
│   ├── Shared_room.png
│   ├── Flat.png
│   ├── Studio.png
│   └── PG_Hostel.png
├── room-icons-2/     (3) suffixed variants
└── room-icons-3/     (2) suffixed variants
```

All 6 room types have icons in each set.

---

## Room Type Mapping

| RoomType Enum      | Icon File           | Display Label    |
|--------------------|---------------------|------------------|
| `SINGLE_ROOM`      | `Single_room.png`   | Single Room      |
| `DOUBLE_ROOM`      | `Double_room.png`   | Double Room      |
| `SHARED_ROOM`      | `Shared_room.png`   | Shared Room      |
| `FLAT`             | `Flat.png`          | Flat             |
| `STUDIO`           | `Studio.png`        | Studio           |
| `PG`               | `PG_Hostel.png`     | PG               |

---

## Where Icons Appear

| Location                    | Component                | Usage                                   |
|-----------------------------|--------------------------|-----------------------------------------|
| Map markers (Leaflet)       | `explore-map.tsx`        | 20×20 PNG + price in `L.divIcon`        |
| Map popup card              | `explore-map.tsx`        | Type badge + empty image fallback       |
| Unit listing card           | `unit-listing-card.tsx`  | Next to room type label, empty image    |
| Rooms listing page          | `rooms-content.tsx`      | Card type badge, empty image, filter    |
| Unit detail page            | `units/[id]/page.tsx`    | Type badge next to title                |
| Hub / landing page          | `hub/page.tsx`           | Hero section + recently added cards     |
| Filter modal (map)          | `filter-modal.tsx`       | Property type selection buttons         |
| Filter panel (sidebar)      | `filter-panel.tsx`       | Room type filter pills                  |
| Inline filter dropdown      | `explore-content.tsx`    | Property type inline filter             |

---

## Code Pattern

Each file defines a `roomTypeIcons` mapping:

```typescript
const roomTypeIcons: Record<string, string> = {
  SINGLE_ROOM: "/icons-for-rooms/room-icons-1/Single_room.png",
  DOUBLE_ROOM: "/icons-for-rooms/room-icons-1/Double_room.png",
  SHARED_ROOM: "/icons-for-rooms/room-icons-1/Shared_room.png",
  FLAT: "/icons-for-rooms/room-icons-1/Flat.png",
  STUDIO: "/icons-for-rooms/room-icons-1/Studio.png",
  PG: "/icons-for-rooms/room-icons-1/PG_Hostel.png",
};
```

Usage in JSX:
```tsx
<img src={roomTypeIcons[unit.type] || roomTypeIcons.SINGLE_ROOM} />
```

Usage in Leaflet HTML:
```typescript
html: `<img src="${roomTypeIcons[roomType]}" style="width:20px;height:20px" />${priceStr}`
```

---

## Adding New Icons

1. Add the PNG file to `public/icons-for-rooms/room-icons-1/`
2. Add the mapping in the `roomTypeIcons` record in each file that needs it (search for `roomTypeIcons` to find all locations)
3. The filename convention is `{TypeName}.png` — use underscores for multi-word types

---

## Switching Icon Sets

To use `room-icons-2` or `room-icons-3` instead, update the base path in each `roomTypeIcons` mapping from `room-icons-1` to `room-icons-2` or `room-icons-3` across all files.

Tip: Use a global find-and-replace for `room-icons-1` → `room-icons-2`.
