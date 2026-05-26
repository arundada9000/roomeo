# Roomeo

> Find your space nearby.

Discover nearby rooms and flats with real-time availability, smart filters, and map-first exploration.

---

## Prerequisites

- **Node.js** 20+
- **npm**
- **PostgreSQL 16+** with **PostGIS** extension

---

## Setup

### 1. Clone & install dependencies

```bash
git clone <repo-url> roomeo
cd roomeo
npm install
```

### 2. Start PostgreSQL with PostGIS

**Option A — Docker (recommended)**

```bash
docker run --name roomeo-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=roomeo \
  -p 5432:5432 \
  -d postgis/postgis
```

**Option B — Manual install**

1. Install [PostgreSQL 16](https://www.postgresql.org/download/)
2. Install [PostGIS](https://download.osgeo.org/postgis/windows/) for your PostgreSQL version
3. Create a database named `roomeo`
4. Enable PostGIS:
   ```sql
   CREATE EXTENSION postgis;
   ```

### 3. Configure environment

Copy or edit `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/roomeo?schema=public"
BETTER_AUTH_SECRET=<generate-a-random-string>
BETTER_AUTH_URL=http://localhost:3000
```

Generate a secret key:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Push database schema

```bash
npx prisma db push
```

This creates all tables (`User`, `Property`, `Unit`, `Media`, `Favorite`, `Review`, `Inquiry`) and enables the PostGIS extension.

---

## Running

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build && npm start
```

---

## Project structure

```
src/
  app/           # Next.js App Router pages & layouts
  components/    # UI, shared, map, listing, form components
  features/      # Feature modules (auth, listings, maps, search, etc.)
  server/        # DB client, API routes, services
  hooks/         # Custom React hooks
  stores/        # Zustand stores
  lib/           # Utilities (prisma client, auth, etc.)
  types/         # TypeScript types
prisma/
  schema.prisma  # Database schema
```

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | TailwindCSS 4 |
| UI Library | shadcn/ui + Base UI |
| Database | PostgreSQL + PostGIS |
| ORM | Prisma 7 |
| Maps | Leaflet + React Leaflet |
| Auth | Better Auth |
| State | Zustand + TanStack Query |
| Forms | React Hook Form + Zod |
| Animations | Framer Motion |
| Icons | Lucide |
| Font | Inter + Geist |

---

## Roles

- **Admin** — manage users, landlords, listings; moderation & analytics
- **Landlord** — create properties/units, upload media, manage availability
- **User** — search nearby rooms on map, filter, save favorites, contact landlords

---

## Local setup (this device — Windows)

Quick-start for this machine:

```
Location:    D:\Programming\nextjs\room finder\roomeo
PostgreSQL:  C:\Program Files\PostgreSQL\16\ (running, password: postgres)
Database:    roomeo (PostGIS enabled)
Node:        v24.14.1
```

```powershell
# 1. Start PostgreSQL (if not running)
& "C:\Program Files\PostgreSQL\16\bin\pg_ctl.exe" start -D "C:\Program Files\PostgreSQL\16\data"

# 2. Verify PostGIS
& "C:\Program Files\PostgreSQL\16\bin\psql.exe" -U postgres -d roomeo -c "SELECT PostGIS_Version();"

# 3. Push schema
cd "D:\Programming\nextjs\room finder\roomeo"
npx prisma db push

# 4. Start dev server
npm run dev
```

Open `http://localhost:3000`.

> Don't commit `.env` — it contains secrets. The `pg/` and `pgdata/` folders are already gitignored.
