# Development Guide

**Repository:** [https://github.com/arundada9000/roomeo](https://github.com/arundada9000/roomeo)  
**Hosted at:** [https://roomeo.vercel.app](https://roomeo.vercel.app)

---

## Prerequisites

- **Node.js** 20+ (project uses v24.14.1)
- **npm**
- **PostgreSQL 16+** with **PostGIS** extension

---

## Local Setup (Windows)

See [how-to-run.md](../how-to-run.md) for device-specific quick-start instructions.

### 1. Start PostgreSQL

```powershell
& "C:\Program Files\PostgreSQL\16\bin\pg_ctl.exe" start -D "C:\Program Files\PostgreSQL\16\data"
```

Or via service:
```powershell
Start-Service postgresql-x64-16
```

Verify PostGIS:
```powershell
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -d roomeo -c "SELECT PostGIS_Version();"
```

### 2. Install & Configure

```bash
cd D:\Programming\nextjs\room finder\roomeo
npm install
npx prisma db push
```

### 3. Seed the Database

```bash
npx prisma db seed
```

Creates sample properties, units (with photos), landlords, and users. See [seed-users.md](./seed-users.md) for credentials.

### 4. Start Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Script          | Command           | Description                          |
|-----------------|-------------------|--------------------------------------|
| `npm run dev`   | `next dev`        | Start development server             |
| `npm run build` | `next build`      | Production build                     |
| `npm start`     | `next start`      | Start production server              |
| `npm run lint`  | `eslint`          | Run ESLint on all files              |

---

## ESLint

The project uses ESLint 9 with flat config (`eslint.config.mjs`).

**Current status:** 0 errors, ~200 warnings (mostly `<img>` suggestions from `@next/next/no-img-element` and unused imports).

To lint only source code:
```bash
npx eslint src/ --quiet
```

To check specific file:
```bash
npx eslint src/components/map/explore-map.tsx
```

---

## Database Management

```bash
npx prisma db push          # Push schema to database
npx prisma generate         # Generate Prisma client
npx prisma studio           # Open Prisma Studio (web UI)
npx prisma db seed          # Run seed script
npx prisma db pull          # Pull schema from database
```

---

## Project Conventions

### File Naming
- Components: `kebab-case.tsx` (e.g., `explore-map.tsx`)
- Pages: `page.tsx` (Next.js App Router convention)
- Server Actions: `actions.ts` (co-located with page)
- Stores: `kebab-case.ts` (e.g., `map-store.ts`)

### Component Structure
- **Server Components** (no `"use client"`) — fetch data, render shell
- **Client Components** (`"use client"`) — interactive UI, hooks, event handlers

### State Management
- **Zustand** for map UI state (center, zoom, filters, selected unit)
- **URL search params** for rooms page filters
- **Local state** for transient UI (modals, dropdowns, form inputs)

### Styling
- TailwindCSS utility classes
- Color tokens from `globals.css` (CSS variables)
- shadcn/ui components with custom theme

### Icons
- **Lucide React** for UI icons (search, navigation, amenities)
- **Custom PNG icons** for room-type visuals (map markers, cards, filters)

---

## Author

Built by **Arun Neupane** ([@arundada9000](https://github.com/arundada9000)).  
CTO @ Sajilo Digital & Vice Secretary @ Code for Change Rupandehi.  
Portfolio: [arunneupane.netlify.app](https://arunneupane.netlify.app)

---

## Common Tasks

### Add a new filter option

1. Add field to `FilterState` in `src/types/index.ts`
2. Add field to Prisma `Unit` model if needed
3. Add toggle UI in `filter-modal.tsx` and `filter-panel.tsx`
4. Add filter logic in `getExploreListings()` and `getRooms()`

### Add a new room type

1. Add value to `RoomType` enum in `prisma/schema.prisma`
2. Add value to `RoomType` enum in `src/types/index.ts`
3. Add icon PNG to `public/icons-for-rooms/room-icons-1/`
4. Add mapping in all `roomTypeIcons` records across components
5. Add label in all `roomTypeLabels` records
6. Run `npx prisma db push` to update database

### Add a new page

1. Create directory under `src/app/` (e.g., `src/app/faq/`)
2. Add `page.tsx` (server or client component)
3. Add navigation link in `Navbar` or `Footer` as needed
4. Add route to [routes.md](./routes.md) documentation
