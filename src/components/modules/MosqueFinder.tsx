"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import {
  BookIcon,
  CarIcon,
  CheckIcon,
  PinIcon,
  SnowflakeIcon,
  WheelchairIcon,
} from "@/components/icons/Icons";
import { DEMO_MOSQUES } from "@/data/mock";
import { useGeolocation } from "@/hooks/useGeolocation";
import {
  formatDistance,
  formatRadius,
  haversineDistanceM,
  mapsUrl,
  RADIUS_OPTIONS,
} from "@/lib/geo";
import { formatDate } from "@/lib/format";
import { FACILITY_LABELS } from "@/lib/labels";
import { displayName, localityLabel } from "@/lib/mosque";
import type { FacilityKey, MosqueWithDistance } from "@/types";

const facilityIcons: Record<FacilityKey, ReactNode> = {
  parking: <CarIcon width={15} height={15} />,
  oku: <WheelchairIcon width={15} height={15} />,
  aircond: <SnowflakeIcon width={15} height={15} />,
  kuliahHall: <BookIcon width={15} height={15} />,
  wudhu: <CheckIcon width={15} height={15} />,
  womenSpace: <CheckIcon width={15} height={15} />,
  accessibleRoute: <WheelchairIcon width={15} height={15} />,
};

const facilityFilters: Array<FacilityKey | "all"> = [
  "all",
  "parking",
  "oku",
  "aircond",
  "kuliahHall",
  "womenSpace",
];

export function MosqueFinder() {
  const [radius, setRadius] = useState<number>(5000);
  const [facility, setFacility] = useState<FacilityKey | "all">("all");
  const { coords, status, error, usingDemoCenter, requestLocation, useDemoCenter } =
    useGeolocation();

  const results = useMemo<MosqueWithDistance[]>(() => {
    return DEMO_MOSQUES.map((mosque) => ({
      ...mosque,
      distanceM: coords
        ? haversineDistanceM(coords.lat, coords.lng, mosque.lat, mosque.lng)
        : 0,
    }))
      .filter((mosque) => {
        const matchesFacility = facility === "all" || mosque.facilities.includes(facility);
        const matchesRadius = !coords || mosque.distanceM <= radius;
        return matchesFacility && matchesRadius;
      })
      .sort((a, b) =>
        coords ? a.distanceM - b.distanceM : a.name.localeCompare(b.name)
      );
  }, [coords, radius, facility]);

  return (
    <>
      <div className="page-heading">
        <h1>Cari Masjid & Surau</h1>
        <p>Temukan tempat solat berhampiran anda bersama kemudahan yang tersedia.</p>
      </div>

      <div className="panel">
        <div className="controls">
          <button type="button" className="btn btn-primary" onClick={requestLocation}>
            <PinIcon width={20} height={20} />
            {status === "loading" ? "Mengesan..." : "Guna lokasi saya"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={useDemoCenter}>
            Guna pusat contoh
          </button>
        </div>

        {error && <div className="notice notice--warn">{error}</div>}
        {usingDemoCenter && (
          <div className="notice" style={{ marginTop: error ? "0.75rem" : 0 }}>
            Menggunakan pusat contoh Shah Alam. Tekan <strong>Guna lokasi saya</strong> untuk jarak
            sebenar.
          </div>
        )}
        {!coords && !usingDemoCenter && (
          <div className="notice" style={{ marginTop: error ? "0.75rem" : 0 }}>
            iMasjid digunakan di seluruh negara. Ini ialah senarai contoh nasional — tekan{" "}
            <strong>Guna lokasi saya</strong> untuk menyenaraikan masjid berdekatan anda.
          </div>
        )}

        <div style={{ marginTop: "1.25rem" }}>
          <h2 style={{ fontSize: "1.05rem", marginBottom: "0.6rem" }}>Jarak maksimum</h2>
          <div className="chip-row" role="group" aria-label="Pilih jarak maksimum">
            {RADIUS_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                className="chip"
                aria-pressed={radius === option}
                onClick={() => setRadius(option)}
              >
                {formatRadius(option)}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "1.25rem" }}>
          <h2 style={{ fontSize: "1.05rem", marginBottom: "0.6rem" }}>Kemudahan</h2>
          <div className="chip-row" role="group" aria-label="Tapis mengikut kemudahan">
            {facilityFilters.map((option) => (
              <button
                key={option}
                type="button"
                className="chip"
                aria-pressed={facility === option}
                onClick={() => setFacility(option)}
              >
                {option === "all" ? "Semua" : FACILITY_LABELS[option]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="stat-grid" style={{ marginTop: "1rem" }}>
        <div className="stat">
          <strong>{results.length}</strong>
          <span>hasil dijumpai</span>
        </div>
        <div className="stat">
          <strong>{coords ? formatRadius(radius) : "—"}</strong>
          <span>julat carian</span>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="empty-state">
          Tiada masjid dalam julat ini. Cuba besarkan jarak carian atau pilih kemudahan lain.
        </div>
      ) : (
        <div className="list">
          {results.map((mosque) => (
            <article className="list-item" key={mosque.id}>
              <div className="list-item__top">
                <div>
                  <h3>{displayName(mosque)}</h3>
                  <div className="meta" style={{ marginTop: "0.3rem" }}>
                    <span>
                      <PinIcon width={16} height={16} /> {localityLabel(mosque)}
                    </span>
                    {coords && <span>{formatDistance(mosque.distanceM)} dari anda</span>}
                  </div>
                </div>
                <span className="tag">{mosque.type === "masjid" ? "Masjid" : "Surau"}</span>
              </div>

              <p>{mosque.address}</p>

              <div className="tag-row">
                {mosque.facilities.map((item) => (
                  <span className="tag" key={item}>
                    {facilityIcons[item]} {FACILITY_LABELS[item]}
                  </span>
                ))}
              </div>

              <div className="meta">
                <span>Kemas kini: {formatDate(mosque.updatedAt)}</span>
              </div>

              <div className="form-actions">
                <a
                  className="btn btn-quiet"
                  href={mapsUrl(mosque.lat, mosque.lng, displayName(mosque))}
                  target="_blank"
                  rel="noreferrer"
                >
                  <PinIcon width={18} height={18} /> Buka peta
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="meta" style={{ marginTop: "1rem" }}>
        <Link href="/admin" style={{ color: "var(--emerald)" }}>
          AJK masjid: kemas kini maklumat kemudahan di portal pentadbiran →
        </Link>
      </p>
    </>
  );
}
