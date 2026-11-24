import type { Metadata } from "next";
import { ProgramFeed } from "@/components/modules/ProgramFeed";

export const metadata: Metadata = { title: "Kuliah & Program" };

export default function ProgramsPage() {
  return <ProgramFeed />;
}
