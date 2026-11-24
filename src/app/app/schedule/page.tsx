import type { Metadata } from "next";
import Link from "next/link";
import { CalendarIcon, ClockIcon } from "@/components/icons/Icons";
import { DEMO_PROGRAMS } from "@/data/mock";
import { formatDateTime } from "@/lib/format";
import { PROGRAM_LABELS } from "@/lib/labels";

export const metadata: Metadata = { title: "Jadual Luar Talian" };

const prayerTimes = [
  { name: "Subuh", time: "06:12" },
  { name: "Zohor", time: "13:05" },
  { name: "Asar", time: "16:28" },
  { name: "Maghrib", time: "19:04" },
  { name: "Isyak", time: "20:18" },
];

export default function SchedulePage() {
  return (
    <>
      <div className="page-heading">
        <h1>Jadual Luar Talian</h1>
        <p>
          Halaman ini disimpan oleh service worker. Selepas dibuka sekali, ia masih boleh dibaca
          tanpa internet.
        </p>
      </div>

      <div className="notice notice--warn">
        Waktu solat di bawah ialah <strong>contoh paparan</strong> untuk scaffold ini. iMasjid tidak
        menarik data daripada sistem kiosk e-Solat. Sambungan sumber waktu solat akan dibuat
        secara berasingan.
      </div>

      <div className="panel" style={{ marginTop: "1rem" }}>
        <h2 style={{ fontSize: "1.25rem", marginBottom: "0.9rem" }}>Waktu solat hari ini</h2>
        <div className="list">
          {prayerTimes.map((prayer) => (
            <div className="list-item" key={prayer.name} style={{ gridTemplateColumns: "1fr auto" }}>
              <strong style={{ fontSize: "1.15rem" }}>{prayer.name}</strong>
              <span style={{ color: "var(--emerald)", fontWeight: 900 }}>{prayer.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel">
        <h2 style={{ fontSize: "1.25rem", marginBottom: "0.9rem" }}>
          <CalendarIcon width={22} height={22} /> Kuliah akan datang
        </h2>
        <div className="list">
          {DEMO_PROGRAMS.filter((item) => item.category === "kuliah").map((item) => (
            <div className="list-item" key={item.id}>
              <span className="tag tag--gold">{PROGRAM_LABELS[item.category]}</span>
              <h3>{item.title}</h3>
              <div className="meta">
                <span>
                  <ClockIcon width={16} height={16} /> {formatDateTime(item.startAt)}
                </span>
                <span>{item.mosque}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-actions" style={{ marginTop: "1rem" }}>
        <Link href="/app" className="btn btn-secondary">
          Kembali ke utama
        </Link>
      </div>
    </>
  );
}
