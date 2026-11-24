"use client";

import { useState, type FormEvent } from "react";
import {
  CalendarIcon,
  CheckIcon,
  CommunityIcon,
  WheelchairIcon,
} from "@/components/icons/Icons";
import { DEMO_MOSQUES } from "@/data/mock";
import { FACILITY_LABELS } from "@/lib/labels";
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

export default function AdminPage() {
  const [lecture, setLecture] = useState<LectureDraft>(emptyLecture);
  const [facility, setFacility] = useState<FacilityUpdateDraft>(emptyFacility);
  const [announcement, setAnnouncement] = useState<AnnouncementDraft>(emptyAnnouncement);
  const [message, setMessage] = useState<string | null>(null);

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
        <p>Kemas kini kuliah, kemudahan dan pengumuman kariah untuk dilihat oleh umum.</p>
      </div>

      {message && <div className="notice">{message}</div>}

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
              {DEMO_MOSQUES.map((mosque) => (
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
              {DEMO_MOSQUES.map((mosque) => (
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
              {DEMO_MOSQUES.map((mosque) => (
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
