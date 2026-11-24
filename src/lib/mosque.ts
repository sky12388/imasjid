import type { Mosque } from "@/types";

/** The AJK-editable local label, falling back to the stable canonical name. */
export function displayName(mosque: Mosque): string {
  return mosque.localName?.trim() || mosque.name;
}

/** Full locality line used in nationwide searches. */
export function localityLabel(mosque: Mosque): string {
  return [mosque.area, mosque.district, mosque.state].filter(Boolean).join(", ");
}

export function mosqueOptions(mosques: Mosque[], managedIds?: string[]): Mosque[] {
  if (!managedIds || managedIds.length === 0) return mosques;
  return mosques.filter((mosque) => managedIds.includes(mosque.id));
}
