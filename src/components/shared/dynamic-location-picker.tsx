"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import Leaflet so it doesn't break SSR
const DynamicLocationPicker = dynamic(() => import("./location-picker"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full rounded-2xl bg-secondary/30 flex items-center justify-center border border-border/60">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        <p className="text-xs font-bold text-muted-foreground">Loading Map...</p>
      </div>
    </div>
  ),
});

export default DynamicLocationPicker;
