# Roomeo

> Find your space nearby.

Discover nearby rooms and flats with real-time availability, smart filters, and map-first exploration.

---

## Quick Start

```bash
npm install                # Install dependencies
npx prisma db push         # Push database schema
npm run dev                # Start dev server at http://localhost:3000
```

See [docs/development.md](./docs/development.md) for full setup.

---

## Tech Stack

| Layer         | Technology                         |
|---------------|------------------------------------|
| Framework     | Next.js 16 (App Router)            |
| Language      | TypeScript (strict)                |
| Styling       | TailwindCSS 4                      |
| UI Library    | shadcn/ui + Base UI                |
| Database      | PostgreSQL 16+ / PostGIS           |
| ORM           | Prisma 7                           |
| Maps          | Leaflet + React Leaflet 5          |
| Auth          | Better Auth 1.x                    |
| State         | Zustand 5 + TanStack Query 5       |
| Animations    | Framer Motion 12                   |
| Icons         | Lucide React + Custom PNG icons    |

---

## Roles

| Role      | Capabilities                                                              |
|-----------|---------------------------------------------------------------------------|
| **Admin** | Manage users, landlords, listings; moderate content; view analytics       |
| **Landlord** | Create properties/units, upload media, manage availability             |
| **User**  | Browse map, filter rooms, save favorites, contact landlords               |

---

## Project Structure

```
roomeo/
├── prisma/                   # Database schema & seed
│   ├── schema.prisma         # Models: User, Property, Unit, Media, etc.
│   └── seed.ts               # Seed script with faker data
├── public/
│   ├── icons-for-rooms/      # Room-type PNG icons (3 variant sets)
│   ├── rooms/                # Sample room photos
│   └── uploads/              # User uploads
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── explore/          # Main map page (Leaflet + bottom sheet)
│   │   ├── rooms/            # Grid listing page with filters
│   │   ├── units/[id]/       # Unit detail page
│   │   ├── hub/              # Landing/dashboard page
│   │   ├── admin/            # Admin dashboard & management
│   │   ├── landlord/         # Landlord dashboard & property mgmt
│   │   └── ...
│   ├── components/
│   │   ├── map/              # Map components (explore-map, filter-modal)
│   │   ├── listing/          # Unit listing card
│   │   ├── shared/           # Navbar, Footer, FilterPanel, etc.
│   │   ├── admin/            # Admin-specific components
│   │   └── ui/               # shadcn/ui primitives
│   ├── stores/               # Zustand state stores
│   │   └── map-store.ts      # Map state, filters, view mode
│   ├── types/                # Shared TypeScript types & enums
│   └── lib/                  # Utilities (prisma, auth, etc.)
├── docs/                     # Documentation
│   ├── architecture.md       # System architecture
│   ├── components.md         # Component documentation
│   ├── data-model.md         # Database schema
│   ├── development.md        # Development setup guide
│   ├── filters.md            # Filtering system
│   ├── icons.md              # Room-type icons
│   ├── routes.md             # Route structure
│   └── seed-users.md         # Seed user credentials
└── design/                   # UI design references
```

---

## Key Pages

| Route               | Description                             |
|---------------------|-----------------------------------------|
| `/`                 | Landing page (welcome / hero)           |
| `/explore`          | Map-first exploration with bottom sheet |
| `/rooms`            | Grid listing with sidebar filters       |
| `/units/[id]`       | Unit detail with gallery & contact      |
| `/hub`              | Dashboard (recent listings, stats)      |
| `/admin`            | Admin dashboard                         |
| `/landlord`         | Landlord dashboard & property mgmt      |
| `/profile`          | User profile & settings                 |
| `/favorites`        | Saved favorites                         |

---

## License

Private — all rights reserved.
