"use client";

import {
  getIdTokenResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { AJK_ROLES, auth, isFirebaseConfigured } from "@/lib/firebase";

interface Session {
  user: User;
  role: string;
}

export function AdminAuthGuard({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!auth) {
      setLoading(false);
      return;
    }

    return onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setSession(null);
        setLoading(false);
        return;
      }

      try {
        const token = await getIdTokenResult(user);
        setSession({ user, role: String(token.claims.role ?? "") });
      } catch {
        setSession({ user, role: "" });
      }
      setLoading(false);
    });
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!auth) return;
    setSubmitting(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Log masuk gagal. Semak emel dan kata laluan."
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSignOut() {
    if (!auth) return;
    await signOut(auth);
  }

  if (!isFirebaseConfigured || !auth) {
    return (
      <div className="notice notice--warn">
        <strong>Firebase belum dikonfigurasi.</strong>
        <p style={{ marginTop: "0.5rem" }}>
          Salin <code>.env.example</code> ke <code>.env.local</code>, isi nilai Firebase Web app,
          kemudian hidupkan Authentication → Email/Password. Rujuk <code>docs/DEPLOYMENT.md</code>.
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className="notice">Menyemak sesi AJK...</div>;
  }

  if (!session) {
    return (
      <div className="panel" style={{ maxWidth: 520, margin: "2rem auto" }}>
        <h2>Log masuk AJK / Pengerusi Kariah</h2>
        <p style={{ color: "var(--muted)", marginTop: "0.4rem" }}>
          Portal ini hanya untuk jawatankuasa masjid yang mempunyai akaun dan peranan sah.
        </p>
        <form className="form-grid" style={{ marginTop: "1.2rem" }} onSubmit={handleLogin}>
          <div className="field">
            <label htmlFor="admin-email">Emel</label>
            <input
              id="admin-email"
              className="input"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="admin-password">Kata laluan</label>
            <input
              id="admin-password"
              className="input"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {error && <div className="notice notice--warn">{error}</div>}
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Melog masuk..." : "Log masuk"}
          </button>
        </form>
      </div>
    );
  }

  const allowed = AJK_ROLES.includes(session.role as (typeof AJK_ROLES)[number]);

  if (!allowed) {
    return (
      <div className="notice notice--warn">
        <strong>Akaun ini tidak mempunyai akses AJK.</strong>
        <p style={{ marginTop: "0.4rem" }}>
          Peranan diperoleh: <code>{session.role || "tiada"}</code>. Hubungi pentadbir sistem
          untuk memberi custom claim <code>role: &quot;ajk&quot;</code>.
        </p>
        <button type="button" className="btn btn-quiet" style={{ marginTop: "1rem" }} onClick={handleSignOut}>
          Log keluar
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="admin-bar">
        <div>
          <strong>Disahkan sebagai AJK</strong>
          <span>{session.user.email}</span>
        </div>
        <button type="button" className="btn btn-quiet" onClick={handleSignOut}>
          Log keluar
        </button>
      </div>
      {children}
    </>
  );
}
