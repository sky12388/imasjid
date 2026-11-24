"use client";

import { useCallback, useState } from "react";

export interface Coordinates {
  lat: number;
  lng: number;
}

type GeoStatus = "idle" | "loading" | "success" | "error";

const DEMO_CENTER: Coordinates = { lat: 3.0738, lng: 101.5179 };

export function useGeolocation() {
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [status, setStatus] = useState<GeoStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [usingDemoCenter, setUsingDemoCenter] = useState(false);

  const requestLocation = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("error");
      setError("Penyemak imbas ini tidak menyokong ciri lokasi.");
      return;
    }

    setStatus("loading");
    setError(null);
    setUsingDemoCenter(false);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
        setStatus("success");
      },
      (geoError) => {
        setStatus("error");
        setError(
          geoError.code === geoError.PERMISSION_DENIED
            ? "Kebenaran lokasi ditolak. Anda boleh guna pusat contoh di bawah."
            : "Lokasi tidak dapat dikesan. Cuba semula atau guna pusat contoh."
        );
      },
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 300_000 }
    );
  }, []);

  const useDemoCenter = useCallback(() => {
    setCoords(DEMO_CENTER);
    setStatus("success");
    setUsingDemoCenter(true);
    setError(null);
  }, []);

  return { coords, status, error, usingDemoCenter, requestLocation, useDemoCenter };
}
