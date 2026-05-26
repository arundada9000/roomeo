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
  IndianRupee,
} from "lucide-react";
import { useMapStore } from "@/stores/map-store";
import type { UnitCard, RoomType } from "@/types";

/* ─── Room Type Labels ─── */
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
    <button
      onClick={() => setSelectedUnitId(isSelected ? null : unit.id)}
      className={`group w-full text-left rounded-xl border bg-card p-4 transition-all duration-200 hover:shadow-md ${
        isSelected
          ? "border-primary/40 shadow-md shadow-primary/[0.06] ring-1 ring-primary/20"
          : "border-border/60 hover:border-border"
      }`}
      id={`unit-card-${unit.id}`}
    >
      {/* Image Placeholder / First media */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-secondary">
        {unit.media && unit.media.length > 0 ? (
          <img
            src={unit.media[0].url}
            alt={unit.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Home className="h-8 w-8 text-muted-foreground/40" />
          </div>
        )}
        {/* Price Badge */}
        <div className="absolute bottom-2 left-2 rounded-lg bg-background/90 px-2.5 py-1 text-sm font-bold text-foreground shadow-sm backdrop-blur-sm">
          <span className="flex items-center gap-0.5">
            {formattedPrice}
            <span className="text-xs font-normal text-muted-foreground">/mo</span>
          </span>
        </div>
        {/* Room Type Badge */}
        <div className="absolute right-2 top-2 rounded-md bg-primary/90 px-2 py-0.5 text-[11px] font-semibold text-primary-foreground shadow-sm">
          {roomTypeLabels[unit.type]}
        </div>
      </div>

      {/* Info */}
      <div className="mt-3">
        <h3 className="text-sm font-semibold text-foreground line-clamp-1">
          {unit.title}
        </h3>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground line-clamp-1">
          <MapPin className="h-3 w-3 shrink-0" />
          {unit.property.address}, {unit.property.city}
        </p>
      </div>

      {/* Amenities */}
      {amenities.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1">
          {amenities.slice(0, 4).map((a) => (
            <AmenityBadge key={a.label} icon={a.icon} label={a.label} />
          ))}
          {amenities.length > 4 && (
            <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              +{amenities.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Availability */}
      <div className="mt-3 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
            unit.isAvailable
              ? "bg-roomeo-success/10 text-roomeo-success"
              : "bg-muted text-muted-foreground"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              unit.isAvailable ? "bg-roomeo-success" : "bg-muted-foreground"
            }`}
          />
          {unit.isAvailable ? "Available" : "Occupied"}
        </span>
      </div>
    </button>
  );
}
