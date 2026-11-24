export type FacilityKey =
  | "parking"
  | "oku"
  | "aircond"
  | "kuliahHall"
  | "wudhu"
  | "womenSpace"
  | "accessibleRoute";

export interface Mosque {
  /** Stable nationwide identifier — never changed by a local AJK. */
  id: string;
  /** Canonical / official name from the national registry. */
  name: string;
  /** Local display name set by the mosque AJK (e.g. "Masjid Al-Hidayah — Bukit Rimau"). */
  localName?: string;
  type: "masjid" | "surau";
  address: string;
  area: string;
  district: string;
  state: string;
  lat: number;
  lng: number;
  facilities: FacilityKey[];
  updatedAt: string;
}

export interface MosqueWithDistance extends Mosque {
  distanceM: number;
}

export type ProgramCategory = "kuliah" | "program" | "pengumuman";

export interface ProgramItem {
  id: string;
  title: string;
  category: ProgramCategory;
  mosque: string;
  startAt: string;
  endAt?: string;
  location: string;
  summary: string;
  poster?: string;
  official: boolean;
  tags: string[];
}

export type TauliahAuthority = "JAWI" | "JAIS" | "JAKIM" | "JAIN" | "MAIS" | "LAIN";

export interface Speaker {
  id: string;
  name: string;
  authorities: TauliahAuthority[];
  status: "aktif" | "digantung" | "tidak_disahkan";
  topics: string[];
  bio: string;
  location: string;
  photo?: string;
}

export type CommunityCategory = "niaga" | "sosial" | "sukarelawan";

export interface CommunityPost {
  id: string;
  category: CommunityCategory;
  title: string;
  body: string;
  author: string;
  area: string;
  postedAt: string;
  contact?: string;
  tags: string[];
}

export interface LectureDraft {
  title: string;
  date: string;
  mosque: string;
  posterUrl: string;
  notes: string;
}

export interface FacilityUpdateDraft {
  mosqueId: string;
  facilities: FacilityKey[];
  note: string;
}

export interface AnnouncementDraft {
  title: string;
  body: string;
  priority: "biasa" | "penting" | "segera";
  mosque: string;
}
