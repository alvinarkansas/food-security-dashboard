"use client";

import dynamic from "next/dynamic";

const WorldMap = dynamic(
  () => import("./world-map").then((mod) => mod.WorldMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-muted/20 rounded-lg">
        <div className="text-muted-foreground text-sm">Loading map...</div>
      </div>
    ),
  }
);

export function MapContainer() {
  return <WorldMap />;
}
