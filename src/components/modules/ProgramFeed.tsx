"use client";

import { useMemo, useState } from "react";
import { CalendarIcon, ClockIcon, PinIcon } from "@/components/icons/Icons";
import { DEMO_PROGRAMS } from "@/data/mock";
import { formatDateTime } from "@/lib/format";
import { PROGRAM_LABELS } from "@/lib/labels";
import type { ProgramCategory } from "@/types";

const filters: Array<ProgramCategory | "all"> = ["all", "kuliah", "program", "pengumuman"];

export function ProgramFeed() {
  const [category, setCategory] = useState<ProgramCategory | "all">("all");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return DEMO_PROGRAMS.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesQuery =
        !needle ||
        [item.title, item.mosque, item.summary, ...item.tags]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      return matchesCategory && matchesQuery;
    }).sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());
  }, [category, query]);

  return (
    <>
      <div className="page-heading">
        <h1>Kuliah & Program</h1>
        <p>Kuliah, program kariah dan pengumuman rasmi masjid dalam satu senarai.</p>
      </div>

      <div className="panel">
        <div className="controls">
          <input
            className="input search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari tajuk, masjid atau topik..."
            aria-label="Cari kuliah dan program"
          />
        </div>
        <div className="chip-row" role="group" aria-label="Tapis kategori program">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className="chip"
              aria-pressed={category === filter}
              onClick={() => setCategory(filter)}
            >
              {filter === "all" ? "Semua" : PROGRAM_LABELS[filter]}
            </button>
          ))}
        </div>
      </div>

      <div className="stat-grid" style={{ marginTop: "1rem" }}>
        <div className="stat">
          <strong>{results.length}</strong>
          <span>entri dipaparkan</span>
        </div>
        <div className="stat">
          <strong>
            {DEMO_PROGRAMS.filter((item) => item.official).length}
          </strong>
          <span>pengumuman rasmi</span>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="empty-state">Tiada program sepadan dengan carian anda.</div>
      ) : (
        <div className="list">
          {results.map((item) => (
            <article className="list-item" key={item.id}>
              <div className="list-item__top">
                <div>
                  <span className="tag tag--gold">{PROGRAM_LABELS[item.category]}</span>
                  <h3 style={{ marginTop: "0.6rem" }}>{item.title}</h3>
                </div>
                {item.official && <span className="tag">Rasmi masjid</span>}
              </div>

              <p>{item.summary}</p>

              <div className="meta">
                <span>
                  <CalendarIcon width={16} height={16} /> {formatDateTime(item.startAt)}
                </span>
                <span>
                  <ClockIcon width={16} height={16} /> {item.location}
                </span>
                <span>
                  <PinIcon width={16} height={16} /> {item.mosque}
                </span>
              </div>

              <div className="tag-row">
                {item.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    #{tag}
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
