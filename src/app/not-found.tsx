import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container offline-card">
      <h1>404 — Halaman tidak dijumpai</h1>
      <p>Tautan mungkin telah berubah atau tersalah taip.</p>
      <Link href="/" className="btn btn-primary">
        Kembali ke laman utama
      </Link>
    </main>
  );
}
