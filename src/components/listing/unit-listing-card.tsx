"use client";

import { useMemo } from "react";
import {
  Wifi,
  Car,
  Bath,
  Home,
  PawPrint,
  Trees,
  UtensilsCrossed,
  MapPin,
  Heart
} from "lucide-react";
import { useMapStore } from "@/stores/map-store";
import type { UnitCard, RoomType } from "@/types";
import Link from "next/link";
import FavoriteButton from "@/components/shared/favorite-button";

/* ─── Room Type Icons & Labels ─── */
const roomTypeIcons: Record<string, string> = {
  SINGLE_ROOM: "/icons-for-rooms/room-icons-1/Single_room.png",
  DOUBLE_ROOM: "/icons-for-rooms/room-icons-1/Double_room.png",
  SHARED_ROOM: "/icons-for-rooms/room-icons-1/Shared_room.png",
  FLAT: "/icons-for-rooms/room-icons-1/Flat.png",
  STUDIO: "/icons-for-rooms/room-icons-1/Studio.png",
  PG: "/icons-for-rooms/room-icons-1/PG_Hostel.png",
};

const roomTypeLabels: Record<RoomType, string> = {
  SINGLE_ROOM: "Single Room",
  DOUBLE_ROOM: "Double Room",
  SHARED_ROOM: "Shared Room",
  FLAT: "Flat",
  STUDIO: "Studio",
  PG: "PG",
};

/* ─── Amenity Badge Helper ─── */
function AmenityBadge({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

/* ─── Unit Listing Card ─── */
interface UnitListingCardProps {
  unit: UnitCard;
}

export default function UnitListingCard({ unit }: UnitListingCardProps) {
  const selectedUnitId = useMapStore((s) => s.selectedUnitId);
  const setSelectedUnitId = useMapStore((s) => s.setSelectedUnitId);
  const isSelected = selectedUnitId === unit.id;

  const amenities = useMemo(() => {
    const list: { icon: React.ElementType; label: string }[] = [];
    if (unit.wifi) list.push({ icon: Wifi, label: "WiFi" });
    if (unit.parking) list.push({ icon: Car, label: "Parking" });
    if (unit.attachedBath) list.push({ icon: Bath, label: "Bath" });
    if (unit.furnished) list.push({ icon: Home, label: "Furnished" });
    if (unit.petFriendly) list.push({ icon: PawPrint, label: "Pets OK" });
    if (unit.balcony) list.push({ icon: Trees, label: "Balcony" });
    if (unit.kitchenAccess) list.push({ icon: UtensilsCrossed, label: "Kitchen" });
    return list;
  }, [unit]);

  const formattedPrice = useMemo(
    () =>
      new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: unit.currency || "INR",
        minimumFractionDigits: 0,
      }).format(unit.price),
    [unit.price, unit.currency]
  );

  return (
    <Link
      href={`/units/${unit.id}`}
      className={`group block w-full text-left rounded-2xl bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
        isSelected
          ? "shadow-lg shadow-primary/10 ring-2 ring-primary"
          : "shadow-sm border border-border/50"
      }`}
      id={`unit-card-${unit.id}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-2xl bg-surface-dim">
        {unit.media && unit.media.length > 0 ? (
          <img
            src={unit.media[0].url}
            alt={unit.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <img
              src={roomTypeIcons[unit.type] || roomTypeIcons.SINGLE_ROOM}
              alt=""
              className="h-8 w-8 object-contain opacity-30"
            />
          </div>
        )}
        
        {/* Top Overlay: Heart & Type */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-2 z-10">
          <FavoriteButton unit={unit} />
        </div>
        
        {/* Bottom Overlay: Price */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 pt-8">
           <span className="text-xl font-bold text-white tracking-tight drop-shadow-sm">
             {formattedPrice} <span className="text-sm font-normal text-white/80">/mo</span>
           </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4">
        <h3 className="text-base font-semibold text-foreground line-clamp-1 mb-1">
          {unit.title}
        </h3>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground line-clamp-1 mb-3">
          <MapPin className="h-4 w-4 shrink-0 text-muted-foreground/70" />
          {unit.property.address}, {unit.property.city}
        </p>

        {/* Horizontal Divider */}
        <div className="h-px w-full bg-border/40 mb-3" />

        {/* Amenities Row */}
        <div className="flex items-center gap-3 text-sm text-foreground">
          <div className="flex items-center gap-1.5 font-medium">
             <img
               src={roomTypeIcons[unit.type] || roomTypeIcons.SINGLE_ROOM}
               alt=""
               className="h-4 w-4 object-contain rounded-sm"
             />
             {roomTypeLabels[unit.type]}
          </div>
          {unit.attachedBath && (
             <div className="flex items-center gap-1.5 font-medium">
                <Bath className="h-4 w-4 text-primary" />
                Bath
             </div>
          )}
          {unit.wifi && (
             <div className="flex items-center gap-1.5 font-medium">
                <Wifi className="h-4 w-4 text-primary" />
                Wi-Fi
             </div>
          )}
        </div>
      </div>
    </Link>
  );
}
