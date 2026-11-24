import type {
  CommunityCategory,
  FacilityKey,
  ProgramCategory,
  TauliahAuthority,
} from "@/types";

export const FACILITY_LABELS: Record<FacilityKey, string> = {
  parking: "Parkir",
  oku: "Akses OKU",
  aircond: "Air-cond",
  kuliahHall: "Dewan kuliah",
  wudhu: "Tempat wudhu",
  womenSpace: "Ruang wanita",
  accessibleRoute: "Laluan mesra",
};

export const PROGRAM_LABELS: Record<ProgramCategory, string> = {
  kuliah: "Kuliah",
  program: "Program",
  pengumuman: "Pengumuman",
};

export const COMMUNITY_LABELS: Record<CommunityCategory, string> = {
  niaga: "Niaga Kariah",
  sosial: "Sosial",
  sukarelawan: "Sukarelawan",
};

export const TAULIAH_LABELS: Record<TauliahAuthority, string> = {
  JAWI: "JAWI",
  JAIS: "JAIS",
  JAKIM: "JAKIM",
  JAIN: "JAIN",
  MAIS: "MAIS",
  LAIN: "Pihak berkuasa lain",
};

export const SPEAKER_STATUS_LABELS = {
  aktif: "Tauliah aktif",
  digantung: "Semakan semula",
  tidak_disahkan: "Tidak disahkan",
} as const;
