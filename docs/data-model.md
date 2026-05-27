# Data Model

## Schema (`prisma/schema.prisma`)

### Enums

```prisma
enum Role          { ADMIN, LANDLORD, USER }
enum ListingStatus { PENDING, APPROVED, REJECTED }
enum RoomType      { SINGLE_ROOM, DOUBLE_ROOM, SHARED_ROOM, FLAT, STUDIO, PG }
```

### Models

#### User
| Field          | Type     | Notes                       |
|----------------|----------|-----------------------------|
| id             | String   | `@id @default(cuid())`      |
| name           | String   |                             |
| email          | String   | `@unique`                   |
| emailVerified  | Boolean  | `@default(false)`           |
| image          | String?  | Avatar URL                  |
| role           | Role     | `@default(USER)`            |
| createdAt      | DateTime |                             |
| updatedAt      | DateTime | `@updatedAt`                |

Relations: sessions, accounts, properties (landlord), favorites, reviews, inquiries.

#### Property
| Field       | Type     | Notes                     |
|-------------|----------|---------------------------|
| id          | String   | `@id @default(cuid())`    |
| title       | String   |                           |
| address     | String   |                           |
| city        | String   |                           |
| state       | String   |                           |
| lat         | Float    | Latitude (PostGIS)        |
| lng         | Float    | Longitude (PostGIS)       |
| location    | Geography| PostGIS `Point`           |
| description | String?  |                           |
| landlordId  | String   | FK → User                 |
| createdAt   | DateTime |                           |
| updatedAt   | DateTime |                           |

Relations: landlord (User), units, media.

#### Unit
| Field            | Type          | Notes                     |
|------------------|---------------|---------------------------|
| id               | String        | `@id @default(cuid())`    |
| title            | String        |                           |
| description      | String?       |                           |
| type             | RoomType      |                           |
| price            | Float         |                           |
| currency         | String        | `@default("INR")`         |
| securityDeposit  | Float?        |                           |
| isAvailable      | Boolean       | `@default(true)`          |
| status           | ListingStatus | `@default(PENDING)`       |
| furnished        | Boolean       | `@default(false)`         |
| attachedBath     | Boolean       | `@default(false)`         |
| wifi             | Boolean       | `@default(false)`         |
| parking          | Boolean       | `@default(false)`         |
| petFriendly      | Boolean       | `@default(false)`         |
| balcony          | Boolean       | `@default(false)`         |
| kitchenAccess    | Boolean       | `@default(false)`         |
| waterIncluded    | Boolean       | `@default(false)`         |
| powerIncluded    | Boolean       | `@default(false)`         |
| bachelorFriendly | Boolean       | `@default(false)`         |
| familyFriendly   | Boolean       | `@default(false)`         |
| boysOnly         | Boolean       | `@default(false)`         |
| girlsOnly        | Boolean       | `@default(false)`         |
| smokingAllowed   | Boolean       | `@default(false)`         |
| propertyId       | String        | FK → Property             |
| createdAt        | DateTime      |                           |
| updatedAt        | DateTime      |                           |

Relations: property, media, favorites, reviews, inquiries.

#### Media
| Field    | Type     | Notes                     |
|----------|----------|---------------------------|
| id       | String   | `@id @default(cuid())`    |
| url      | String   | Image URL                 |
| type     | String   | `"image"` / `"video"`     |
| order    | Int      | Display order             |
| propertyId | String? | FK → Property (optional) |
| unitId   | String?  | FK → Unit (optional)      |

#### Favorite, Review, Inquiry
Standard relationship models connecting User ↔ Unit with relevant fields (rating, message, etc.).

---

## Shared TypeScript Types (`src/types/index.ts`)

### `UnitCard`
The primary data shape passed from server to client components:

```typescript
interface UnitCard {
  id: string;
  title: string;
  description: string | null;
  type: RoomType;
  price: number;
  currency: string;
  isAvailable: boolean;
  status: ListingStatus;
  furnished: boolean;
  attachedBath: boolean;
  wifi: boolean;
  parking: boolean;
  petFriendly: boolean;
  balcony: boolean;
  kitchenAccess: boolean;
  waterIncluded: boolean;
  powerIncluded: boolean;
  bachelorFriendly: boolean;
  familyFriendly: boolean;
  boysOnly: boolean;
  girlsOnly: boolean;
  smokingAllowed: boolean;
  property: PropertySummary;
  media: { id: string; url: string; type: string }[];
  createdAt: string;
}
```

### `FilterState`
Filters sent to server actions:

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
  radius?: number;
  query?: string;
}
```

### Other Types
- `MapBounds` — `{ north, south, east, west }` for viewport-based fetching
- `Coordinates` — `{ lat, lng }`
- `PropertySummary` — lightweight property data embedded in `UnitCard`
