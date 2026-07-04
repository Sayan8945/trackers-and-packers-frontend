"use client";

import { useState } from "react";
import { APIProvider, Map, AdvancedMarker, InfoWindow } from "@vis.gl/react-google-maps";

/* ── Types ──────────────────────────────────────────────── */
interface City {
  name: string;
  state: string;
  lat: number;
  lng: number;
  isHQ?: boolean;
}

/* ── Eastern India service area ─────────────────────────── */
const CITIES: City[] = [
  // West Bengal — Primary market
  { name: "Siliguri", state: "West Bengal", lat: 26.7271, lng: 88.3953, isHQ: true },
  { name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639 },
  { name: "Howrah", state: "West Bengal", lat: 22.5958, lng: 88.2636 },
  { name: "Hooghly", state: "West Bengal", lat: 22.9072, lng: 88.3967 },
  { name: "Durgapur", state: "West Bengal", lat: 23.5204, lng: 87.3119 },
  { name: "Asansol", state: "West Bengal", lat: 23.6739, lng: 86.9524 },
  { name: "Kharagpur", state: "West Bengal", lat: 22.3460, lng: 87.2320 },
  { name: "Haldia", state: "West Bengal", lat: 22.0667, lng: 88.0697 },
  { name: "Bardhaman", state: "West Bengal", lat: 23.2324, lng: 87.8615 },
  { name: "Malda", state: "West Bengal", lat: 25.0108, lng: 88.1418 },
  { name: "Berhampur", state: "West Bengal", lat: 24.0990, lng: 88.2513 },
  { name: "Krishnanagar", state: "West Bengal", lat: 23.4020, lng: 88.5011 },
  { name: "Bankura", state: "West Bengal", lat: 23.2326, lng: 87.0753 },
  { name: "Purulia", state: "West Bengal", lat: 23.3339, lng: 86.3657 },
  { name: "Midnapore", state: "West Bengal", lat: 22.4259, lng: 87.3196 },
  { name: "Darjeeling", state: "West Bengal", lat: 27.0360, lng: 88.2627 },
  { name: "Jalpaiguri", state: "West Bengal", lat: 26.5425, lng: 88.7179 },
  { name: "Cooch Behar", state: "West Bengal", lat: 26.3452, lng: 89.4430 },
  { name: "Raiganj", state: "West Bengal", lat: 25.6210, lng: 88.1240 },
  { name: "Alipurduar", state: "West Bengal", lat: 26.4900, lng: 89.5300 },
  { name: "Dinhata", state: "West Bengal", lat: 26.1310, lng: 89.4680 },
  { name: "Mathabhanga", state: "West Bengal", lat: 26.3420, lng: 89.2110 },
  { name: "Mal Bazar", state: "West Bengal", lat: 26.8460, lng: 88.7200 },
  // Assam
  { name: "Guwahati", state: "Assam", lat: 26.1445, lng: 91.7362 },
  { name: "Silchar", state: "Assam", lat: 24.8333, lng: 92.7789 },
  { name: "Dibrugarh", state: "Assam", lat: 27.4728, lng: 94.9120 },
  { name: "Jorhat", state: "Assam", lat: 26.7509, lng: 94.2037 },
  { name: "Nagaon", state: "Assam", lat: 26.3478, lng: 92.6840 },
  // Bihar
  { name: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376 },
  { name: "Gaya", state: "Bihar", lat: 24.7955, lng: 85.0002 },
  { name: "Muzaffarpur", state: "Bihar", lat: 26.1197, lng: 85.3910 },
  { name: "Bhagalpur", state: "Bihar", lat: 25.2425, lng: 87.0150 },
  { name: "Purnia", state: "Bihar", lat: 25.7771, lng: 87.4753 },
  // Odisha
  { name: "Bhubaneswar", state: "Odisha", lat: 20.2961, lng: 85.8245 },
  { name: "Cuttack", state: "Odisha", lat: 20.4686, lng: 85.8830 },
  { name: "Rourkela", state: "Odisha", lat: 22.2604, lng: 84.8536 },
  { name: "Sambalpur", state: "Odisha", lat: 21.4669, lng: 83.9756 },
  { name: "Puri", state: "Odisha", lat: 19.8135, lng: 85.8312 },
  // Jharkhand
  { name: "Ranchi", state: "Jharkhand", lat: 23.3441, lng: 85.3096 },
  { name: "Jamshedpur", state: "Jharkhand", lat: 22.8046, lng: 86.2029 },
  { name: "Dhanbad", state: "Jharkhand", lat: 23.7957, lng: 86.4304 },
  { name: "Bokaro", state: "Jharkhand", lat: 23.6693, lng: 86.1511 },
];

const EASTERN_INDIA_CENTER = {
  lat: 26.7271,
  lng: 88.3953
};

/* ── Light map style id ─────────────────────────────────── */
// "roadmap" with custom styles applied via mapId (set in GCP console)
// or simply use default light roadmap

/* ── Fallback states ────────────────────────────────────── */
function MapSkeleton() {
  return (
    <div className="relative w-full h-[350px] lg:h-[500px] rounded-3xl overflow-hidden">
      <div className="animate-pulse bg-slate-100 rounded-3xl w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-[3px] border-brand-red/30 border-t-brand-red rounded-full animate-spin" />
          <span className="text-gray-400 text-sm">Loading map…</span>
        </div>
      </div>
    </div>
  );
}

function NoApiKey() {
  return (
    <div className="w-full h-[350px] lg:h-[500px] rounded-3xl bg-slate-100 border border-slate-200 flex items-center justify-center">
      <div className="text-center p-8 max-w-sm">
        <div className="w-14 h-14 bg-amber-100 border border-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">⚠️</div>
        <h3 className="text-gray-800 font-bold text-lg mb-2">Google Maps API Key Not Configured</h3>
        <p className="text-gray-500 text-sm leading-relaxed">
          Add your key to{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs text-brand-red">.env.local</code>{" "}
          as{" "}
          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs text-brand-red">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>
        </p>
      </div>
    </div>
  );
}

/* ── Custom pin component ───────────────────────────────── */
function CityPin({ isHQ }: { isHQ: boolean }) {
  return (
    <div
      style={{
        width: isHQ ? 20 : 12,
        height: isHQ ? 20 : 12,
        borderRadius: "50%",
        background: isHQ ? "#E11D48" : "#3b82f6",
        border: `${isHQ ? 3 : 2}px solid #fff`,
        boxShadow: isHQ
          ? "0 0 0 4px rgba(225,29,72,0.25), 0 2px 8px rgba(0,0,0,0.25)"
          : "0 1px 4px rgba(0,0,0,0.2)",
        cursor: "pointer",
        transition: "transform 0.15s ease",
      }}
    />
  );
}

/* ── Inner map — rendered only when API key is present ──── */
function MapContent() {
  const [activeCity, setActiveCity] = useState<City | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = searchQuery
    ? CITIES.filter(
      c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.state.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : CITIES;

  return (
    <div className="relative">
      {/* Search bar */}
      <div className="absolute top-3 left-3 right-3 z-10 pointer-events-none">
        <div className="relative max-w-xs pointer-events-auto">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search city or state…"
            className="w-full h-9 pl-9 pr-8 bg-white/95 backdrop-blur border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-red/40 shadow-sm transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Map */}
      <Map
        style={{ width: "100%", height: "500px", borderRadius: "1.5rem" }}
        defaultCenter={EASTERN_INDIA_CENTER}
        defaultZoom={8}
        gestureHandling="cooperative"
        disableDefaultUI
        zoomControl
        mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
        mapTypeId="roadmap"
        onClick={() => setActiveCity(null)}
        className="rounded-3xl overflow-hidden shadow-xl lg:h-[500px] h-[350px]"
      >
        {filtered.map(city => (
          <AdvancedMarker
            key={city.name}
            position={{ lat: city.lat, lng: city.lng }}
            title={`${city.name}, ${city.state}`}
            onClick={() => setActiveCity(city)}
          >
            <CityPin isHQ={!!city.isHQ} />
          </AdvancedMarker>
        ))}

        {activeCity && (
          <InfoWindow
            position={{ lat: activeCity.lat, lng: activeCity.lng }}
            onCloseClick={() => setActiveCity(null)}
            pixelOffset={[0, -16]}
          >
            <div style={{ padding: "6px 4px", minWidth: "120px", fontFamily: "inherit" }}>
              <p style={{ fontWeight: 700, fontSize: "13px", color: "#0f172a", margin: 0 }}>
                {activeCity.name}
              </p>
              <p style={{ color: "#64748b", fontSize: "11px", margin: "2px 0 0" }}>
                {activeCity.state}
              </p>
              {activeCity.isHQ && (
                <span style={{
                  display: "inline-block", marginTop: 5,
                  background: "rgba(225,29,72,0.1)", color: "#E11D48",
                  fontSize: "10px", fontWeight: 700, padding: "2px 8px",
                  borderRadius: "999px", border: "1px solid rgba(225,29,72,0.2)",
                }}>
                  Head Office
                </span>
              )}
            </div>
          </InfoWindow>
        )}
      </Map>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-3 bg-white/90 backdrop-blur border border-gray-100 rounded-xl px-3 py-2 shadow-sm">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-brand-red border-2 border-white shadow-sm" />
          <span className="text-[11px] text-gray-600 font-medium">Siliguri (HQ)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-blue-400 border-2 border-white shadow-sm" />
          <span className="text-[11px] text-gray-600">Service Cities</span>
        </div>
      </div>
    </div>
  );
}

/* ── Exported component ─────────────────────────────────── */
export default function IndiaCoverageMap() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === "YOUR_GOOGLE_MAPS_API_KEY_HERE") {
    return <NoApiKey />;
  }

  return (
    <APIProvider apiKey={apiKey}>
      <MapContent />
    </APIProvider>
  );
}
