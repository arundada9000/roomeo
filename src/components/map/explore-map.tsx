"use client";

import { useEffect, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import { Navigation } from "lucide-react";
import "leaflet/dist/leaflet.css";
import { useMapStore } from "@/stores/map-store";
import type { UnitCard } from "@/types";

const createMarkerIcon = (isSelected: boolean, priceStr: string) =>
  L.divIcon({
    className: "custom-marker bg-transparent border-0",
    html: `<div style="
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 6px 12px;
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
    ">${priceStr}</div>`,
    iconSize: [undefined as any, undefined as any], // auto size
    iconAnchor: [30, 16], // approximate center bottom
    popupAnchor: [0, -20],
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
          icon={createMarkerIcon(selectedUnitId === unit.id, formatPrice(unit.price, unit.currency))}
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
