"use client";

import { useState, type FormEvent } from "react";
import { useAdminSession } from "@/components/admin/AdminAuthGuard";
import {
  CalendarIcon,
  CheckIcon,
  CommunityIcon,
  MosqueIcon,
  WheelchairIcon,
} from "@/components/icons/Icons";
import { DEMO_MOSQUES } from "@/data/mock";
import { FACILITY_LABELS } from "@/lib/labels";
import { mosqueOptions } from "@/lib/mosque";
import type {
  AnnouncementDraft,
  FacilityKey,
  FacilityUpdateDraft,
  LectureDraft,
} from "@/types";

const facilityKeys = Object.keys(FACILITY_LABELS) as FacilityKey[];

const emptyLecture: LectureDraft = {
  title: "",
  date: "",
  mosque: DEMO_MOSQUES[0].name,
  posterUrl: "",
  notes: "",
};

const emptyFacility: FacilityUpdateDraft = {
  mosqueId: DEMO_MOSQUES[0].id,
  facilities: [],
  note: "",
};

const emptyAnnouncement: AnnouncementDraft = {
  title: "",
  body: "",
  priority: "biasa",
  mosque: DEMO_MOSQUES[0].name,
};

interface RenameDraft {
  mosqueId: string;
  localName: string;
  area: string;
  district: string;
  state: string;
}

export default function AdminPage() {
  const { mosqueIds } = useAdminSession();
  const scopedMosques = mosqueOptions(DEMO_MOSQUES, mosqueIds);

  const [lecture, setLecture] = useState<LectureDraft>(emptyLecture);
  const [facility, setFacility] = useState<FacilityUpdateDraft>(emptyFacility);
  const [announcement, setAnnouncement] = useState<AnnouncementDraft>(emptyAnnouncement);
  const [message, setMessage] = useState<string | null>(null);
  const [rename, setRename] = useState<RenameDraft>(() => {
    const first = scopedMosques[0];
    return {
      mosqueId: first?.id ?? "",
      localName: "",
      area: first?.area ?? "",
      district: first?.district ?? "",
      state: first?.state ?? "",
    };
  });

  function saved(label: string) {
    setMessage(`${label} diterima (demo). Sambungan Firestore akan disediakan seterusnya.`);
  }

  function submitLecture(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saved("Poster kuliah");
    setLecture(emptyLecture);
  }

  function submitFacility(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saved("Kemas kini kemudahan");
    setFacility(emptyFacility);
  }

  function submitAnnouncement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saved("Pengumuman kariah");
    setAnnouncement(emptyAnnouncement);
  }

  function submitRename(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saved("Nama & lokasi masjid");
    setRename((current) => ({ ...current, localName: "", area: "", district: "", state: "" }));
  }

  function toggleFacility(key: FacilityKey) {
    setFacility((current) => ({
      ...current,
      facilities: current.facilities.includes(key)
        ? current.facilities.filter((item) => item !== key)
        : [...current.facilities, key],
    }));
  }

  return (
    <>
      <div className="page-heading">
        <h1>Portal AJK Masjid</h1>
        <p>
          iMasjid digunakan di seluruh negara. AJK hanya menyesuaikan nama paparan dan maklumat
          masjid / surau lokal mereka — ID nasional kekal tidak berubah.
        </p>
      </div>

      {message && <div className="notice">{message}</div>}

      <div className="panel" style={{ marginTop: "1rem" }}>
        <h2>
          <MosqueIcon width={22} height={22} /> Nama & Lokasi Masjid / Surau
        </h2>
        <p style={{ color: "var(--muted)", marginTop: "0.4rem" }}>
          Nama paparan ini yang dilihat orang awam dalam carian berdekatan. Nama rasmi dan ID
          nasional tidak diubah oleh AJK tempatan.
        </p>
        <form className="form-grid" style={{ marginTop: "1.2rem" }} onSubmit={submitRename}>
          <div className="field">
            <label htmlFor="rename-mosque">Masjid / surau anda</label>
            <select
              id="rename-mosque"
              className="select"
              value={rename.mosqueId}
              onChange={(event) => setRename({ ...rename, mosqueId: event.target.value })}
            >
              {scopedMosques.map((mosque) => (
                <option key={mosque.id} value={mosque.id}>
                  {mosque.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="rename-local">Nama paparan tempatan</label>
            <input
              id="rename-local"
              className="input"
              value={rename.localName}
              onChange={(event) => setRename({ ...rename, localName: event.target.value })}
              placeholder="Contoh: Masjid Al-Hidayah — Bukit Rimau"
            />
          </div>
          <div className="field">
            <label htmlFor="rename-area">Kawasan / bandar</label>
            <input
              id="rename-area"
              className="input"
              value={rename.area}
              onChange={(event) => setRename({ ...rename, area: event.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="rename-district">Daerah</label>
            <input
              id="rename-district"
              className="input"
              value={rename.district}
              onChange={(event) => setRename({ ...rename, district: event.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="rename-state">Negeri</label>
            <input
              id="rename-state"
              className="input"
              value={rename.state}
              onChange={(event) => setRename({ ...rename, state: event.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            <CheckIcon width={18} height={18} /> Simpan nama & lokasi
          </button>
        </form>
      </div>

      <div className="panel" style={{ marginTop: "1rem" }}>
        <h2>
          <CalendarIcon width={22} height={22} /> Poster & Kuliah
        </h2>
        <form className="form-grid" style={{ marginTop: "1.2rem" }} onSubmit={submitLecture}>
          <div className="field">
            <label htmlFor="lecture-title">Tajuk kuliah</label>
            <input
              id="lecture-title"
              className="input"
              value={lecture.title}
              onChange={(event) => setLecture({ ...lecture, title: event.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="lecture-date">Tarikh & masa</label>
            <input
              id="lecture-date"
              className="input"
              type="datetime-local"
              value={lecture.date}
              onChange={(event) => setLecture({ ...lecture, date: event.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="lecture-mosque">Masjid / surau</label>
            <select
              id="lecture-mosque"
              className="select"
              value={lecture.mosque}
              onChange={(event) => setLecture({ ...lecture, mosque: event.target.value })}
            >
              {scopedMosques.map((mosque) => (
                <option key={mosque.id} value={mosque.name}>
                  {mosque.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="lecture-poster">URL poster (pilihan)</label>
            <input
              id="lecture-poster"
              className="input"
              type="url"
              value={lecture.posterUrl}
              onChange={(event) => setLecture({ ...lecture, posterUrl: event.target.value })}
              placeholder="https://..."
            />
          </div>
          <div className="field">
            <label htmlFor="lecture-notes">Nota ringkas</label>
            <textarea
              id="lecture-notes"
              className="textarea"
              value={lecture.notes}
              onChange={(event) => setLecture({ ...lecture, notes: event.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            <CheckIcon width={18} height={18} /> Simpan kuliah
          </button>
        </form>
      </div>

      <div className="panel">
        <h2>
          <WheelchairIcon width={22} height={22} /> Kemudahan Masjid
        </h2>
        <form className="form-grid" style={{ marginTop: "1.2rem" }} onSubmit={submitFacility}>
          <div className="field">
            <label htmlFor="facility-mosque">Masjid / surau</label>
            <select
              id="facility-mosque"
              className="select"
              value={facility.mosqueId}
              onChange={(event) => setFacility({ ...facility, mosqueId: event.target.value })}
            >
              {scopedMosques.map((mosque) => (
                <option key={mosque.id} value={mosque.id}>
                  {mosque.name}
                </option>
              ))}
            </select>
          </div>
          <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
            <legend style={{ fontWeight: 800, marginBottom: "0.6rem" }}>Kemudahan tersedia</legend>
            <div className="check-grid">
              {facilityKeys.map((key) => (
                <label className="check" key={key}>
                  <input
                    type="checkbox"
                    checked={facility.facilities.includes(key)}
                    onChange={() => toggleFacility(key)}
                  />
                  {FACILITY_LABELS[key]}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="field">
            <label htmlFor="facility-note">Nota kemas kini</label>
            <input
              id="facility-note"
              className="input"
              value={facility.note}
              onChange={(event) => setFacility({ ...facility, note: event.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            <CheckIcon width={18} height={18} /> Simpan kemudahan
          </button>
        </form>
      </div>

      <div className="panel">
        <h2>
          <CommunityIcon width={22} height={22} /> Pengumuman Segera Kariah
        </h2>
        <form className="form-grid" style={{ marginTop: "1.2rem" }} onSubmit={submitAnnouncement}>
          <div className="field">
            <label htmlFor="announcement-mosque">Masjid / surau</label>
            <select
              id="announcement-mosque"
              className="select"
              value={announcement.mosque}
              onChange={(event) => setAnnouncement({ ...announcement, mosque: event.target.value })}
            >
              {scopedMosques.map((mosque) => (
                <option key={mosque.id} value={mosque.name}>
                  {mosque.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="announcement-priority">Tahap keutamaan</label>
            <select
              id="announcement-priority"
              className="select"
              value={announcement.priority}
              onChange={(event) =>
                setAnnouncement({
                  ...announcement,
                  priority: event.target.value as AnnouncementDraft["priority"],
                })
              }
            >
              <option value="biasa">Biasa</option>
              <option value="penting">Penting</option>
              <option value="segera">Segera</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="announcement-title">Tajuk pengumuman</label>
            <input
              id="announcement-title"
              className="input"
              value={announcement.title}
              onChange={(event) => setAnnouncement({ ...announcement, title: event.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="announcement-body">Butiran</label>
            <textarea
              id="announcement-body"
              className="textarea"
              value={announcement.body}
              onChange={(event) => setAnnouncement({ ...announcement, body: event.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            <CheckIcon width={18} height={18} /> Terbitkan pengumuman
          </button>
        </form>
      </div>

      <div className="notice notice--warn" style={{ marginTop: "1rem" }}>
        Borang di atas adalah demonstrasi UI. Tiada data ditulis ke Firestore lagi dalam scaffold ini.
      </div>
    </>
  );
}
