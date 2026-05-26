// ============================================================
// Shared TypeScript types for Roomeo
// ============================================================

export enum Role {
  ADMIN = "ADMIN",
  LANDLORD = "LANDLORD",
  USER = "USER",
}

export enum ListingStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export enum RoomType {
  SINGLE_ROOM = "SINGLE_ROOM",
  DOUBLE_ROOM = "DOUBLE_ROOM",
  SHARED_ROOM = "SHARED_ROOM",
  FLAT = "FLAT",
  STUDIO = "STUDIO",
  PG = "PG",
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface PropertySummary {
  id: string;
  title: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
}

export interface UnitCard {
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
  bachelorFriendly: boolean;
  familyFriendly: boolean;
  boysOnly: boolean;
  girlsOnly: boolean;
  smokingAllowed: boolean;
  waterIncluded: boolean;
  powerIncluded: boolean;
  property: PropertySummary;
  media: { id: string; url: string; type: string }[];
  createdAt: string;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface FilterState {
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
  radius?: number; // in km
  query?: string;
}
