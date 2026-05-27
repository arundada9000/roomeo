"use client";

import { useEffect, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import {
  Navigation, MapPin, Home, Bath, Wifi, Car,
  ExternalLink, Sparkles, ChevronRight,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import { useMapStore } from "@/stores/map-store";
import type { UnitCard, RoomType } from "@/types";

const roomTypeIcons: Record<string, string> = {
  SINGLE_ROOM: "/icons-for-rooms/room-icons-1/Single_room.png",
  DOUBLE_ROOM: "/icons-for-rooms/room-icons-1/Double_room.png",
  SHARED_ROOM: "/icons-for-rooms/room-icons-1/Shared_room.png",
  FLAT: "/icons-for-rooms/room-icons-1/Flat.png",
  STUDIO: "/icons-for-rooms/room-icons-1/Studio.png",
  PG: "/icons-for-rooms/room-icons-1/PG_Hostel.png",
};

const roomTypeLabels: Record<RoomType | string, string> = {
  SINGLE_ROOM: "Single Room",
  DOUBLE_ROOM: "Double Room",
  SHARED_ROOM: "Shared Room",
  FLAT: "Flat",
  STUDIO: "Studio",
  PG: "PG",
};

const createMarkerIcon = (isSelected: boolean, priceStr: string, roomType: string) =>
  L.divIcon({
    className: "custom-marker bg-transparent border-0",
    html: `<div style="
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 4px 14px 4px 8px;
      border-radius: 999px;
      background: ${isSelected ? "#004ac6" : "#ffffff"};
      color: ${isSelected ? "#ffffff" : "#004ac6"};
      font-weight: 600;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border: 1px solid ${isSelected ? "#004ac6" : "#e1e2ed"};
      transition: all 0.2s ease;
      transform: scale(${isSelected ? 1.05 : 1});
      font-family: var(--font-sans);
    "><img src="${roomTypeIcons[roomType] || roomTypeIcons.SINGLE_ROOM}" style="width: 20px; height: 20px; object-fit: contain; border-radius: 3px;" />${priceStr}</div>`,
    iconSize: undefined as unknown as L.PointExpression,
    iconAnchor: [30, 16],
    popupAnchor: [0, -24],
  });

const userLocationIcon = L.divIcon({
  className: "user-location-marker",
  html: `<div style="
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #2563EB;
    border: 3px solid white;
    box-shadow: 0 0 0 8px rgba(37,99,235,0.15), 0 2px 8px rgba(37,99,235,0.3);
  "></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

/* ─── Map Event Handler ─── */
function MapEventHandler() {
  const setBounds = useMapStore((s) => s.setBounds);
  const setCenter = useMapStore((s) => s.setCenter);
  const setZoom = useMapStore((s) => s.setZoom);

  useMapEvents({
    moveend: (e) => {
      const map = e.target;
      const b = map.getBounds();
      setBounds({
        north: b.getNorth(),
        south: b.getSouth(),
        east: b.getEast(),
        west: b.getWest(),
      });
      const c = map.getCenter();
      setCenter({ lat: c.lat, lng: c.lng });
      setZoom(map.getZoom());
    },
  });

  return null;
}

/* ─── Recenter Helper ─── */
function RecenterMap({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    if (isNaN(center[0]) || isNaN(center[1])) return;
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
}

/* ─── Popup Card Component ─── */
interface PopupCardProps {
  unit: UnitCard;
  formatPrice: (price: number, currency: string) => string;
}

function PopupCard({ unit, formatPrice }: PopupCardProps) {
  const amenities: { icon: React.ElementType; label: string }[] = [];
  if (unit.furnished) amenities.push({ icon: Home, label: "Furnished" });
  if (unit.attachedBath) amenities.push({ icon: Bath, label: "Bath" });
  if (unit.wifi) amenities.push({ icon: Wifi, label: "WiFi" });
  if (unit.parking) amenities.push({ icon: Car, label: "Parking" });

  const destLat = unit.property.lat;
  const destLng = unit.property.lng;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${destLat},${destLng}`;

  return (
    <div className="relative overflow-hidden" style={{ margin: -2 }}>
      {/* Image */}
      <div className="relative h-28 w-full overflow-hidden bg-surface-dim rounded-t-xl">
        {unit.media && unit.media.length > 0 ? (
          <img
            src={unit.media[0].url}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
            <img
              src={roomTypeIcons[unit.type] || roomTypeIcons.SINGLE_ROOM}
              alt=""
              className="h-8 w-8 object-contain opacity-40"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Type Badge + Price Overlay */}
        <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-bold text-foreground shadow-sm">
            <img
              src={roomTypeIcons[unit.type] || roomTypeIcons.SINGLE_ROOM}
              alt=""
              className="h-3.5 w-3.5 object-contain rounded-sm"
            />
            {roomTypeLabels[unit.type] || unit.type.replace(/_/g, " ")}
          </span>
          <span className="text-base font-extrabold text-white drop-shadow-md">
            {formatPrice(unit.price, unit.currency)}<span className="text-xs font-medium text-white/80">/mo</span>
          </span>
        </div>

        {/* Available Badge */}
        {unit.isAvailable && (
          <div className="absolute top-2 right-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
            Available
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-3 pt-2.5 pb-3">
        {/* Title + Location */}
        <h3 className="text-sm font-bold text-foreground leading-snug line-clamp-1">
          {unit.title}
        </h3>
        <p className="flex items-center gap-1 text-[11px] text-muted-foreground/70 mt-0.5 line-clamp-1">
          <MapPin className="h-3 w-3 shrink-0 text-primary/60" />
          {unit.property.address}, {unit.property.city}
        </p>

        {/* Amenity Pills */}
        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {amenities.map((a) => (
              <span
                key={a.label}
                className="inline-flex items-center gap-1 rounded-md bg-secondary/60 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground"
              >
                <a.icon className="h-3 w-3" />
                {a.label}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-3">
          <Link
            href={`/units/${unit.id}`}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-primary py-2 text-[11px] font-bold text-white shadow-sm transition-all hover:bg-primary/90 active:scale-[0.97]"
          >
            View Details <ChevronRight className="h-3 w-3" />
          </Link>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 rounded-lg border border-border/60 bg-background px-3 py-2 text-[11px] font-bold text-foreground transition-all hover:bg-secondary active:scale-[0.97]"
          >
            <ExternalLink className="h-3 w-3" />
            Directions
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Map Component ─── */
interface ExploreMapProps {
  listings: UnitCard[];
}

export default function ExploreMap({ listings }: ExploreMapProps) {
  const center = useMapStore((s) => s.center);
  const zoom = useMapStore((s) => s.zoom);
  const userLocation = useMapStore((s) => s.userLocation);
  const selectedUnitId = useMapStore((s) => s.selectedUnitId);
  const setSelectedUnitId = useMapStore((s) => s.setSelectedUnitId);
  const setUserLocation = useMapStore((s) => s.setUserLocation);
  const mapRef = useRef<L.Map | null>(null);

  // Detect user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => {},
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  }, [setUserLocation]);

  const locateUser = () => {
    if (navigator.geolocation && mapRef.current) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const latlng = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setUserLocation(latlng);
          mapRef.current?.flyTo([latlng.lat, latlng.lng], 15, { animate: true, duration: 1.5 });
        },
        () => { alert("Location access denied or unavailable."); },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  };

  const formatPrice = useCallback((price: number, currency: string) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
      minimumFractionDigits: 0,
    }).format(price);
  }, []);

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      className="h-full w-full rounded-none"
      ref={mapRef}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      <MapEventHandler />

      {/* Recenter when store center changes */}
      <RecenterMap center={[center.lat, center.lng]} zoom={zoom} />

      {/* User Location Marker */}
      {userLocation && (
        <Marker
          position={[userLocation.lat, userLocation.lng]}
          icon={userLocationIcon}
        >
          <Popup>
            <span className="text-sm font-medium">You are here</span>
          </Popup>
        </Marker>
      )}

      {/* Listing Markers */}
      {listings.map((unit) => (
        <Marker
          key={unit.id}
          position={[unit.property.lat, unit.property.lng]}
          icon={createMarkerIcon(selectedUnitId === unit.id, formatPrice(unit.price, unit.currency), unit.type)}
          eventHandlers={{
            click: () => setSelectedUnitId(unit.id),
          }}
        >
          <Popup
            className="roomeo-map-popup"
            maxWidth={320}
            minWidth={280}
          >
            <PopupCard unit={unit} formatPrice={formatPrice} />
          </Popup>
        </Marker>
      ))}

      {/* Locate Me Floating Button */}
      <div className="absolute top-[160px] md:top-36 right-4 z-[400]">
        <button
          onClick={locateUser}
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface/90 backdrop-blur-xl shadow-lg border border-border/40 text-primary hover:bg-surface active:scale-95 transition-all"
        >
          <Navigation className="h-6 w-6" />
        </button>
      </div>

    </MapContainer>
  );
}
