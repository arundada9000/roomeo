import type { Metadata } from "next";
import ExplorePageContent from "./explore-content";
import { getExploreListings } from "./actions";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Explore Rooms & Flats",
  description:
    "Discover nearby rooms and flats on an interactive map. Filter by price, amenities, room type, and more.",
};

export default async function ExplorePage(props: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const searchParams = await props.searchParams;
  const selectedId = typeof searchParams.selected === "string" ? searchParams.selected : null;

  const [initialListings, selectedUnit] = await Promise.all([
    getExploreListings(),
    selectedId
      ? prisma.unit.findUnique({
          where: { id: selectedId },
          select: { id: true, property: { select: { lat: true, lng: true } } },
        })
      : null,
  ]);

  return (
    <ExplorePageContent
      initialListings={initialListings as any}
      selectedUnitId={selectedId}
      selectedUnitCenter={selectedUnit ? { lat: selectedUnit.property.lat, lng: selectedUnit.property.lng } : null}
    />
  );
}
