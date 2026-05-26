import type { Metadata } from "next";
import ExplorePageContent from "./explore-content";
import { getExploreListings } from "./actions";

export const metadata: Metadata = {
  title: "Explore Rooms & Flats",
  description:
    "Discover nearby rooms and flats on an interactive map. Filter by price, amenities, room type, and more.",
};

export default async function ExplorePage() {
  // Fetch initial generic listings (e.g. without bounds, or centered roughly at Kathmandu)
  const initialListings = await getExploreListings();
  
  return <ExplorePageContent initialListings={initialListings as any} />;
}
