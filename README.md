# iMasjid

Standalone, mobile-first community mosque platform. One nationwide deployment that anyone can
browse; local AJK only rename and maintain their own masjid/surau record. Includes a public install
landing page plus a Next.js PWA that works from the phone home screen — no Play Store / App Store
required.

**Live production site:** https://imasjid-theta.vercel.app
**RGB showcase:** https://imasjid-theta.vercel.app/rgb

> **Boundary:** This project is 100% independent from `esolat-v6`. It does not import,
> call, deploy to, or share state with the kiosk system. See `docs/ARCHITECTURE.md`.

## Stack

- Next.js 15 (App Router, TypeScript)
- Plain CSS design system (high contrast, senior-friendly type scale)
- Custom service worker (`public/sw.js`) for offline app shell + schedule
- Firebase Auth for the AJK portal only (public browsing needs no login)
- Deploy target: Vercel (or Firebase Hosting) over HTTPS

## Quick start

```bash
cp .env.example .env.local   # optional: only needed for /admin
npm install
npm run dev
```

Open <http://localhost:3000>. The PWA install prompt only appears over HTTPS (or localhost)
in a browser that supports `beforeinstallprompt`.

## Routes

| Route | Purpose | Login |
| --- | --- | --- |
| `/` | Public landing + smart install CTA (Emerald theme) | No |
| `/rgb` | RGB + Islamic-architecture showcase landing | No |
| `/app` | Web-view home (browse immediately) | No |
| `/app/mosques` | Nearby mosque & surau finder | No |
| `/app/programs` | Kuliah, programs & announcements feed | No |
| `/app/speakers` | Accredited speaker directory | No |
| `/app/community` | Kariah community & business hub | No |
| `/app/schedule` | Offline-capable schedule | No |
| `/admin` | AJK / mosque committee portal | Yes (Firebase Auth + role claim) |
| `/offline` | Service worker offline fallback | No |

## Current scope

This is the scaffold: routing, design system, install flow, service worker, data shapes and
admin auth guard are in place. Module screens currently use clearly-labelled demo data;
wire them to Firestore / a CMS next. Forms in `/admin` are local-only demonstrations.

## Docs

- `docs/ARCHITECTURE.md` — decisions and system boundary
- `docs/PWA-INSTALL.md` — install prompt behaviour and test checklist
- `docs/DEPLOYMENT.md` — Vercel / Firebase setup and AJK role claims
