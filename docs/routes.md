# Routes

## Public Pages

| Route              | Type       | Component                  | Description                |
|--------------------|------------|----------------------------|----------------------------|
| `/`                | RSC        | `app/page.tsx`             | Landing / welcome page     |
| `/explore`         | RSC + CC   | `app/explore/page.tsx`     | Map-first exploration      |
| `/rooms`           | RSC + CC   | `app/rooms/page.tsx`       | Grid listing with filters  |
| `/units/[id]`      | RSC        | `app/units/[id]/page.tsx`  | Unit detail page           |
| `/hub`             | RSC        | `app/hub/page.tsx`         | Dashboard (recent, stats)  |

## Auth Pages

| Route        | Type | Description            |
|--------------|------|------------------------|
| `/login`     | CC   | Sign in                |
| `/signup`    | CC   | Create account         |

## User Pages

| Route         | Type | Description              |
|---------------|------|--------------------------|
| `/profile`    | RSC  | Profile & settings       |
| `/favorites`  | CC   | Saved favorites          |

## Admin Pages (`/admin/*`)

| Route               | Description                    |
|---------------------|--------------------------------|
| `/admin`            | Dashboard with analytics      |
| `/admin/listings`   | Manage all listings           |
| `/admin/listings/[id]` | Listing detail & moderation |
| `/admin/landlords`  | Manage landlords              |
| `/admin/landlords/[id]` | Landlord detail           |
| `/admin/users`      | Manage users                  |
| `/admin/users/[id]` | User detail                   |
| `/admin/engagement` | Engagement analytics          |
| `/admin/contact`    | Contact inquiries             |
| `/admin/newsletter` | Newsletter management         |

## Landlord Pages (`/landlord/*`)

| Route                                       | Description              |
|---------------------------------------------|--------------------------|
| `/landlord`                                 | Dashboard                |
| `/landlord/new-property`                    | Create property          |
| `/landlord/properties`                      | List properties          |
| `/landlord/properties/[id]`                 | Property detail          |
| `/landlord/properties/[id]/new-unit`        | Add unit to property     |
| `/landlord/properties/[id]/units/[uid]/edit`| Edit unit                |

## Other Pages

| Route              | Description             |
|--------------------|-------------------------|
| `/welcome`         | Onboarding splash       |
| `/about`           | About page              |
| `/contact`         | Contact form            |
| `/blog`            | Blog listing            |
| `/blog/[slug]`     | Blog post               |
| `/pricing`         | Pricing plans           |
| `/careers`         | Careers page            |
| `/terms`           | Terms of service        |
| `/privacy`         | Privacy policy          |
| `/cookies`         | Cookie policy           |
| `/offline`         | Offline fallback page   |

## Public API Routes

| Route              | Description             |
|--------------------|-------------------------|
| `/api/auth/*`      | Better Auth endpoints   |
| `/api/upload`      | File upload             |
| `/sitemap`         | XML sitemap             |
| `/robots`          | robots.txt              |
| `/manifest`        | PWA manifest            |
