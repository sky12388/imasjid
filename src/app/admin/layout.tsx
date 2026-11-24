import type { Metadata } from "next";
import Link from "next/link";
import { AdminAuthGuard } from "@/components/admin/AdminAuthGuard";
import { MosqueIcon } from "@/components/icons/Icons";

export const metadata: Metadata = {
  title: "Portal AJK",
  description: "Portal pentadbiran jawatankuasa masjid iMasjid.",
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="app-shell" style={{ paddingBottom: "2rem" }}>
      <header className="app-header">
        <div className="container app-header__inner">
          <Link href="/admin" className="brand" aria-label="Portal AJK iMasjid">
            <span className="brand-mark">
              <MosqueIcon width={24} height={24} />
            </span>
            <span className="brand-name">Portal AJK</span>
          </Link>
          <Link href="/app" className="btn btn-quiet">
            Kembali ke apl
          </Link>
        </div>
      </header>
      <main className="container app-main">
        <AdminAuthGuard>{children}</AdminAuthGuard>
      </main>
    </div>
  );
}
