import type { Metadata } from "next";
import { SpeakerDirectory } from "@/components/modules/SpeakerDirectory";

export const metadata: Metadata = { title: "Direktori Penceramah" };

export default function SpeakersPage() {
  return <SpeakerDirectory />;
}
