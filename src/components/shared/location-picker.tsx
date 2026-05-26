"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { LocateFixed, Loader2, MapPin } from "lucide-react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

interface LocationPickerProps {
  location: { lat: number; lng: number };
  onChange: (loc: { lat: number; lng: number }) => void;
}

function LocationMarker({ location, onChange, setIsCurrentLocation }: LocationPickerProps & { setIsCurrentLocation: (v: boolean) => void }) {
  const map = useMap();

  useMapEvents({
    click(e) {
      onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
      setIsCurrentLocation(false);
    },
  });

  useEffect(() => {
    map.flyTo([location.lat, location.lng], map.getZoom(), { animate: true });
  }, [location.lat, location.lng, map]);

  return <Marker position={[location.lat, location.lng]} />;
}

export default function LocationPicker({ location, onChange }: LocationPickerProps) {
  const [isLocating, setIsLocating] = useState(false);
  const [isCurrentLocation, setIsCurrentLocation] = useState(false);

  const locateUser = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        onChange({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsCurrentLocation(true);
        setIsLocating(false);
      },
      (error) => {
        console.error(error);
        alert("Unable to retrieve your location. Please check your browser permissions.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  return (
    <div className="h-[300px] w-full overflow-hidden rounded-2xl border border-border/60 z-0 relative">
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={14}
        scrollWheelZoom={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker location={location} onChange={onChange} setIsCurrentLocation={setIsCurrentLocation} />
      </MapContainer>
      
      {/* Status Notice */}
      <div className="absolute top-2 left-2 z-[400] bg-background/95 backdrop-blur-md px-3 py-2 text-xs font-bold rounded-xl shadow-sm border border-border/50 text-foreground flex flex-col gap-1 max-w-[220px]">
        <span>Tap on the map to pin exact location</span>
        {isCurrentLocation && (
          <span className="flex items-center gap-1.5 text-primary">
            <MapPin className="h-3.5 w-3.5" />
            Showing your current location
          </span>
        )}
      </div>

      {/* Locate Me Button */}
      <button
        type="button"
        onClick={locateUser}
        disabled={isLocating}
        className="absolute bottom-4 right-4 z-[400] flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
        title="Find my location"
      >
        {isLocating ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <LocateFixed className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
