import type { Metadata } from "next";
import ExplorePageContent from "./explore-content";
import { getExploreListings } from "./actions";

export const metadata: Metadata = {
  title: "Explore Rooms & Flats",
  description:
    "Discover nearby rooms and flats on an interactive map. Filter by price, amenities, room type, and more.",
};

export default async function ExplorePage(props: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const searchParams = await props.searchParams;
  const selectedId = typeof searchParams.selected === "string" ? searchParams.selected : null;

  const initialListings = await getExploreListings();

  return (
    <ExplorePageContent
      initialListings={initialListings as any}
      selectedUnitId={selectedId}
    />
  );
}
