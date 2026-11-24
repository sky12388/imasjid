"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarIcon,
  CommunityIcon,
  HomeIcon,
  MosqueIcon,
  SpeakerIcon,
} from "@/components/icons/Icons";

const items = [
  { href: "/app", label: "Utama", icon: HomeIcon },
  { href: "/app/mosques", label: "Masjid", icon: MosqueIcon },
  { href: "/app/programs", label: "Kuliah", icon: CalendarIcon },
  { href: "/app/speakers", label: "Penceramah", icon: SpeakerIcon },
  { href: "/app/community", label: "Kariah", icon: CommunityIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="Navigasi aplikasi">
      {items.map(({ href, label, icon: Icon }) => {
        const active = href === "/app" ? pathname === href : pathname.startsWith(href);
        return (
          <Link key={href} href={href} className={active ? "active" : undefined} aria-current={active ? "page" : undefined}>
            <Icon width={24} height={24} />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
