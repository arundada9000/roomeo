"use client";

import { useEffect, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMapStore } from "@/stores/map-store";
import type { UnitCard } from "@/types";

/* ─── Custom Marker Icon ─── */
const createMarkerIcon = (isSelected: boolean) =>
  L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: ${isSelected ? "36px" : "28px"};
      height: ${isSelected ? "36px" : "28px"};
      border-radius: 50% 50% 50% 0;
      background: ${isSelected ? "#2563EB" : "#3B82F6"};
      border: 3px solid white;
      transform: rotate(-45deg);
      box-shadow: 0 4px 12px rgba(37,99,235,0.35);
      transition: all 0.2s ease;
    "></div>`,
    iconSize: isSelected ? [36, 36] : [28, 28],
    iconAnchor: isSelected ? [18, 36] : [14, 28],
    popupAnchor: [0, -30],
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
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
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
        () => {
          // User denied geolocation — use default center
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  }, [setUserLocation]);

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
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      <MapEventHandler />

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
          icon={createMarkerIcon(selectedUnitId === unit.id)}
          eventHandlers={{
            click: () => setSelectedUnitId(unit.id),
          }}
        >
          <Popup>
            <div className="min-w-[200px] p-1">
              <p className="text-sm font-semibold text-foreground">
                {unit.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {unit.property.address}
              </p>
              <p className="text-sm font-bold text-primary mt-1">
                {formatPrice(unit.price, unit.currency)}/mo
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
