"use client";

import { useState, type FormEvent } from "react";
import { CommunityIcon, PinIcon } from "@/components/icons/Icons";
import { DEMO_COMMUNITY } from "@/data/mock";
import { formatDate } from "@/lib/format";
import { COMMUNITY_LABELS } from "@/lib/labels";
import type { CommunityCategory, CommunityPost } from "@/types";

const categories: CommunityCategory[] = ["niaga", "sosial", "sukarelawan"];

interface Draft {
  title: string;
  body: string;
  author: string;
  area: string;
  contact: string;
}

const emptyDraft: Draft = { title: "", body: "", author: "", area: "", contact: "" };

export function CommunityHub() {
  const [tab, setTab] = useState<CommunityCategory>("niaga");
  const [posts, setPosts] = useState<CommunityPost[]>(DEMO_COMMUNITY);
  const [formOpen, setFormOpen] = useState(false);
  const [draft, setDraft] = useState<Draft>(emptyDraft);

  const visible = posts.filter((post) => post.category === tab);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.title.trim() || !draft.body.trim()) return;

    const newPost: CommunityPost = {
      id: `local-${Date.now()}`,
      category: tab,
      title: draft.title.trim(),
      body: draft.body.trim(),
      author: draft.author.trim() || "Warga kariah",
      area: draft.area.trim() || "Kariah",
      contact: draft.contact.trim() || undefined,
      postedAt: new Date().toISOString(),
      tags: ["kariah", "cadangan"],
    };

    setPosts((current) => [newPost, ...current]);
    setDraft(emptyDraft);
    setFormOpen(false);
  }

  function update(field: keyof Draft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  return (
    <>
      <div className="page-heading">
        <h1>Hub Kariah</h1>
        <p>Papan kenar komuniti: niaga tempatan, aktiviti sosial dan sukarelawan.</p>
      </div>

      <div className="panel">
        <div className="chip-row" role="tablist" aria-label="Kategori hub kariah">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={tab === category}
              className="chip"
              onClick={() => setTab(category)}
            >
              {COMMUNITY_LABELS[category]}
            </button>
          ))}
        </div>
        <div className="form-actions" style={{ marginTop: "1rem" }}>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setFormOpen((open) => !open)}
          >
            {formOpen ? "Tutup borang" : "+ Cadangkan notis"}
          </button>
        </div>

        {formOpen && (
          <form className="form-grid" style={{ marginTop: "1.2rem" }} onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="community-title">Tajuk notis</label>
              <input
                id="community-title"
                className="input"
                value={draft.title}
                onChange={(event) => update("title", event.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="community-body">Butiran</label>
              <textarea
                id="community-body"
                className="textarea"
                value={draft.body}
                onChange={(event) => update("body", event.target.value)}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="community-author">Nama / kumpulan</label>
              <input
                id="community-author"
                className="input"
                value={draft.author}
                onChange={(event) => update("author", event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="community-area">Kawasan</label>
              <input
                id="community-area"
                className="input"
                value={draft.area}
                onChange={(event) => update("area", event.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="community-contact">Hubungan (pilihan)</label>
              <input
                id="community-contact"
                className="input"
                value={draft.contact}
                onChange={(event) => update("contact", event.target.value)}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Tambah ke papan kenar
              </button>
              <span className="meta">Disimpan pada sesi ini sahaja (demo).</span>
            </div>
          </form>
        )}
      </div>

      <div className="list" style={{ marginTop: "1rem" }}>
        {visible.length === 0 ? (
          <div className="empty-state">Belum ada notis dalam kategori ini.</div>
        ) : (
          visible.map((post) => (
            <article className="list-item" key={post.id}>
              <div className="list-item__top">
                <div>
                  <h3>
                    <CommunityIcon width={20} height={20} /> {post.title}
                  </h3>
                  <div className="meta" style={{ marginTop: "0.35rem" }}>
                    <span>Oleh {post.author}</span>
                    <span>
                      <PinIcon width={16} height={16} /> {post.area}
                    </span>
                    <span>{formatDate(post.postedAt)}</span>
                  </div>
                </div>
                <span className="tag">{COMMUNITY_LABELS[post.category]}</span>
              </div>
              <p>{post.body}</p>
              <div className="tag-row">
                {post.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>
              {post.contact && <p style={{ color: "var(--emerald)" }}>Hubungan: {post.contact}</p>}
            </article>
          ))
        )}
      </div>
    </>
  );
}
