import type { Metadata } from "next";
import { CommunityHub } from "@/components/modules/CommunityHub";

export const metadata: Metadata = { title: "Hub Kariah" };

export default function CommunityPage() {
  return <CommunityHub />;
}
