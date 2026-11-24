import type { Metadata } from "next";
import { MosqueFinder } from "@/components/modules/MosqueFinder";

export const metadata: Metadata = { title: "Cari Masjid & Surau" };

export default function MosquesPage() {
  return <MosqueFinder />;
}
