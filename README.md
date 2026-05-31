# Roomeo

> Find your space nearby.

[![GitHub](https://img.shields.io/badge/GitHub-arundada9000/roomeo-181717?style=flat-square&logo=github)](https://github.com/arundada9000/roomeo)
[![Vercel](https://img.shields.io/badge/Live-roomeo.vercel.app-000000?style=flat-square&logo=vercel)](https://roomeo.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-6d28d9?style=flat-square)](./LICENSE)

Discover nearby rooms and flats with real-time availability, smart filters, and map-first exploration.

---

**Repository:** [https://github.com/arundada9000/roomeo](https://github.com/arundada9000/roomeo)  
**Hosted at:** [https://roomeo.vercel.app](https://roomeo.vercel.app)

---

## Author

**Arun Neupane** — Full-Stack Developer from Butwal, Nepal

| | |
|---|---|
| Portfolio | [arunneupane.netlify.app](https://arunneupane.netlify.app) |
| GitHub | [@arundada9000](https://github.com/arundada9000) |
| LinkedIn | [arundada9000](https://linkedin.com/in/arundada9000) |
| Email | arunneupane0000@gmail.com |
| CTO @ | [Sajilo Digital](https://sajilodigital.com.np) |
| Vice Secretary @ | [Code for Change Rupandehi](https://codeforchangenepal.com) |

---

## Quick Start

```bash
npm install                # Install dependencies
npx prisma db push         # Push database schema
npm run dev                # Start dev server at http://localhost:3000
```

See [how-to-run.md](./how-to-run.md) for device-specific setup or [docs/development.md](./docs/development.md) for full guide.

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
| `/`                 | Landing page                            |
| `/welcome`          | Onboarding splash                      |
| `/explore`          | Map-first exploration with bottom sheet |
| `/rooms`            | Grid listing with sidebar filters       |
| `/units/[id]`       | Unit detail with gallery & contact      |
| `/login`            | Sign in                                 |
| `/signup`           | Create account                          |
| `/hub`              | Dashboard (recent listings, stats)      |
| `/profile`          | User profile & settings                 |
| `/profile/settings` | Account settings                        |
| `/favorites`        | Saved favorites                         |
| `/about`            | About page                              |
| `/contact`          | Contact form                            |
| `/blog`             | Blog listing                            |
| `/blog/[slug]`      | Blog post                               |
| `/pricing`          | Pricing plans                           |
| `/careers`          | Careers page                            |
| `/terms`            | Terms of service                        |
| `/privacy`          | Privacy policy                          |
| `/cookies`          | Cookie policy                           |
| `/admin`            | Admin dashboard                         |
| `/landlord`         | Landlord dashboard & property mgmt      |

---

## License

MIT — see [LICENSE](./LICENSE).

---

**Repository:** [https://github.com/arundada9000/roomeo](https://github.com/arundada9000/roomeo)  
**Hosted at:** [https://roomeo.vercel.app](https://roomeo.vercel.app)

---

## Author

<div align="center">

Built by **Arun Neupane**

[![Portfolio](https://img.shields.io/badge/Portfolio-arunneupane.netlify.app-6d28d9?style=flat-square&logo=netlify&logoColor=white)](https://arunneupane.netlify.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-arundada9000-0077B5?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/arundada9000)
[![GitHub](https://img.shields.io/badge/GitHub-arundada9000-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/arundada9000)
[![Email](https://img.shields.io/badge/Email-arunneupane0000@gmail.com-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:arunneupane0000@gmail.com)

</div>
