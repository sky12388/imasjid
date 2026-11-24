"use client";

import { useMemo, useState } from "react";
import { PinIcon, SpeakerIcon } from "@/components/icons/Icons";
import { DEMO_SPEAKERS } from "@/data/mock";
import { SPEAKER_STATUS_LABELS, TAULIAH_LABELS } from "@/lib/labels";
import type { TauliahAuthority } from "@/types";

const authorityFilters: Array<TauliahAuthority | "all"> = [
  "all",
  "JAWI",
  "JAIS",
  "JAKIM",
  "JAIN",
  "MAIS",
];

export function SpeakerDirectory() {
  const [query, setQuery] = useState("");
  const [authority, setAuthority] = useState<TauliahAuthority | "all">("all");
  const [activeOnly, setActiveOnly] = useState(false);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return DEMO_SPEAKERS.filter((speaker) => {
      const matchesAuthority = authority === "all" || speaker.authorities.includes(authority);
      const matchesStatus = !activeOnly || speaker.status === "aktif";
      const matchesQuery =
        !needle ||
        [speaker.name, speaker.bio, speaker.location, ...speaker.topics]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      return matchesAuthority && matchesStatus && matchesQuery;
    });
  }, [query, authority, activeOnly]);

  return (
    <>
      <div className="page-heading">
        <h1>Direktori Penceramah</h1>
        <p>Semak status tauliah dan cari penceramah mengikut topik atau negeri.</p>
      </div>

      <div className="panel">
        <div className="controls">
          <input
            className="input search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari nama, topik atau negeri..."
            aria-label="Cari penceramah"
          />
          <label className="check">
            <input
              type="checkbox"
              checked={activeOnly}
              onChange={(event) => setActiveOnly(event.target.checked)}
            />
            Tauliah aktif sahaja
          </label>
        </div>

        <div className="chip-row" role="group" aria-label="Tapis mengikut tauliah">
          {authorityFilters.map((option) => (
            <button
              key={option}
              type="button"
              className="chip"
              aria-pressed={authority === option}
              onClick={() => setAuthority(option)}
            >
              {option === "all" ? "Semua tauliah" : TAULIAH_LABELS[option]}
            </button>
          ))}
        </div>
      </div>

      <div className="notice" style={{ marginTop: "1rem" }}>
        Status tauliah dipaparkan untuk rujukan awam. Semakan rasmi hendaklah dibuat terus dengan
        pihak berkuasa agama negeri masing-masing.
      </div>

      {results.length === 0 ? (
        <div className="empty-state" style={{ marginTop: "1rem" }}>
          Tiada penceramah sepadan dengan carian anda.
        </div>
      ) : (
        <div className="list" style={{ marginTop: "1rem" }}>
          {results.map((speaker) => (
            <article className="list-item" key={speaker.id}>
              <div className="list-item__top">
                <div>
                  <h3>
                    <SpeakerIcon width={20} height={20} /> {speaker.name}
                  </h3>
                  <div className="meta" style={{ marginTop: "0.35rem" }}>
                    <span>
                      <PinIcon width={16} height={16} /> {speaker.location}
                    </span>
                  </div>
                </div>
                <span
                  className={
                    speaker.status === "aktif"
                      ? "tag"
                      : speaker.status === "digantung"
                        ? "tag tag--gold"
                        : "tag tag--danger"
                  }
                >
                  {SPEAKER_STATUS_LABELS[speaker.status]}
                </span>
              </div>

              <p>{speaker.bio}</p>

              <div className="tag-row">
                {speaker.authorities.map((item) => (
                  <span className="tag tag--gold" key={item}>
                    Tauliah {TAULIAH_LABELS[item]}
                  </span>
                ))}
                {speaker.topics.map((topic) => (
                  <span className="tag" key={topic}>
                    {topic}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
