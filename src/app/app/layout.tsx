import type { Metadata } from "next";
import Link from "next/link";
import { BottomNav } from "@/components/layout/BottomNav";
import { MosqueIcon } from "@/components/icons/Icons";

export const metadata: Metadata = {
  title: "Aplikasi iMasjid",
};

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container app-header__inner">
          <Link href="/app" className="brand" aria-label="iMasjid — utama aplikasi">
            <span className="brand-mark">
              <MosqueIcon width={24} height={24} />
            </span>
            <span className="brand-name">iMasjid</span>
          </Link>
          <Link href="/" className="btn btn-quiet">
            Laman Pasang
          </Link>
        </div>
      </header>
      <main className="container app-main">{children}</main>
      <BottomNav />
    </div>
  );
}
