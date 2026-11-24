import Link from "next/link";
import type { Metadata } from "next";
import { MosqueIcon } from "@/components/icons/Icons";

export const metadata: Metadata = { title: "Tiada Sambungan" };

export default function OfflinePage() {
  return (
    <main className="container offline-card">
      <div className="brand-mark" style={{ margin: "0 auto 1.5rem", width: 64, height: 64 }}>
        <MosqueIcon width={34} height={34} />
      </div>
      <h1>Anda sedang luar talian</h1>
      <p>
        Sambungan internet tidak tersedia. Jadual yang telah dilawat sebelum ini masih boleh
        dibuka dari caching apl.
      </p>
      <div className="form-actions" style={{ justifyContent: "center" }}>
        <Link href="/app/schedule" className="btn btn-primary">
          Buka jadual cached
        </Link>
        <Link href="/" className="btn btn-secondary">
          Kembali ke laman utama
        </Link>
      </div>
    </main>
  );
}
