"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  countryMarkers,
  getRiskColor,
  CATEGORY_LABELS,
  type CountryMarker,
} from "./country-coordinates";
import { Badge } from "@/components/ui/badge";

const createMarkerIcon = (risk: CountryMarker["risk"]) => {
  const color = getRiskColor(risk);
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="position: relative;">
        <div style="
          position: absolute;
          width: 24px;
          height: 24px;
          background: ${color};
          opacity: 0.3;
          border-radius: 50%;
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          transform: translate(-50%, -50%);
        "></div>
        <div style="
          width: 12px;
          height: 12px;
          background: ${color};
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          transform: translate(-50%, -50%);
        "></div>
      </div>
    `,
    iconSize: [12, 12],
    iconAnchor: [0, 0],
  });
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "bg-destructive text-destructive-foreground";
    case "medium":
      return "bg-warning text-warning-foreground";
    case "low":
      return "bg-success text-success-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function WorldMap() {
  return (
    <MapContainer
      center={[20, 80]}
      zoom={2}
      minZoom={2}
      maxZoom={8}
      style={{ height: "100%", width: "100%", borderRadius: "0.5rem" }}
      scrollWheelZoom={true}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {countryMarkers.map((marker) => (
        <Marker
          key={marker.country}
          position={marker.coordinates}
          icon={createMarkerIcon(marker.risk)}
        >
          <Popup className="custom-popup">
            <div className="w-[280px]">
              {/* Header: Country name and risk badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-sm text-foreground">
                  {marker.country}
                </span>
                <div className="flex gap-2">
                  {/* Category */}
                  <Badge variant="secondary" className="text-xs">
                    {CATEGORY_LABELS[marker.category]}
                  </Badge>
                  <Badge className={getSeverityColor(marker.risk)}>
                    {marker.risk}
                  </Badge>
                </div>
              </div>

              {/* Title */}
              <div className="mb-1">
                <span className="text-xs font-medium text-foreground">
                  {marker.title}
                </span>
              </div>

              {/* Description */}
              <div className="mb-3">
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {marker.description}
                </p>
              </div>

              {/* Risk Score */}
              <div className="pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  Risk Score:{" "}
                </span>
                <span className="text-xs font-semibold text-primary">
                  {marker.riskScore} / 100
                </span>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
