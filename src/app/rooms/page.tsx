import type { Metadata } from "next";
import RoomsContent from "./rooms-content";
import { getRooms } from "./actions";
import type { RoomsFilters } from "./actions";
import type { RoomType } from "@prisma/client";

export const metadata: Metadata = {
  title: "Browse Rooms & Flats",
  description:
    "Search and filter through all available rooms, flats, and PG accommodations. Sort by price and view on map.",
};

function parseFilters(searchParams: Record<string, string | string[] | undefined>): RoomsFilters {
  const filters: RoomsFilters = {};

  if (typeof searchParams.query === "string") filters.query = searchParams.query;
  if (typeof searchParams.priceMin === "string") filters.priceMin = Number(searchParams.priceMin);
  if (typeof searchParams.priceMax === "string") filters.priceMax = Number(searchParams.priceMax);

  if (typeof searchParams.roomType === "string") {
    filters.roomType = searchParams.roomType.split(",").filter(Boolean) as RoomType[];
  }

  const booleans = [
    "furnished", "attachedBath", "wifi", "parking", "petFriendly",
    "balcony", "kitchenAccess", "bachelorFriendly", "familyFriendly",
    "boysOnly", "girlsOnly", "availableNow",
  ] as const;
  for (const key of booleans) {
    if (typeof searchParams[key] === "string") (filters as Record<string, unknown>)[key] = true;
  }

  if (typeof searchParams.sort === "string" && ["newest", "price_asc", "price_desc"].includes(searchParams.sort)) {
    filters.sort = searchParams.sort as "newest" | "price_asc" | "price_desc";
  }

  if (typeof searchParams.page === "string") filters.page = Number(searchParams.page);

  return filters;
}

export default async function RoomsPage(props: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const searchParams = await props.searchParams;
  const filters = parseFilters(searchParams);
  const data = await getRooms(filters);

  return <RoomsContent initialData={data} initialFilters={filters} />;
}
