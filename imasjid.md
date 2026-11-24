# iMasjid — Project Notes

_Last updated: 24 Nov 2026_

## Live links

- Main site: https://imasjid-theta.vercel.app
- RGB showcase: https://imasjid-theta.vercel.app/rgb
- Source: https://github.com/sky12388/imasjid

## What iMasjid is

- A **nationwide** community mosque platform for Malaysia. **Anyone can use it** — no login needed
  to browse.
- One deployment serves every masjid and surau in the country. Visitors see the mosques near them
  via browser geolocation (500 m – 10 km).
- **Completely independent from e-Solat / the kiosk system.** No shared code, data, secrets or
  deployment.
- Installed as a PWA directly from the website — no Play Store, no App Store, no app review.
- Branding on the RGB edition: **iMasjid by skywalker**.

## Language & copy rules (Malaysia)

- Malaysian users are comfortable mixing Malay with English. Use natural, everyday wording.
- Avoid jargon / literal translations such as **“geseran”** for “friction”.
  - Use **“Install dengan mudah”** instead of “Pasang tanpa geseran”.
  - “Pasang” is fine too; both are natural.
- Keep text large, clear and high-contrast — senior-friendly.
- Common terms to keep: masjid, surau, kariah, kuliah, tauliah, AJK, JAWI/JAIS/JAKIM.

## Nationwide data model

- Each mosque/surau has a **stable national `id`** and a canonical `name` that local AJK **never**
  change.
- A local AJK only updates:
  - `localName` — the display name shown to the public, e.g. “Surau Al-Hidayah — Bukit Rimau”
  - `area`, `district`, `state`
  - facilities, lecture posters and kariah announcements
- This is the “admin just rename the masjid/surau according to their location” rule.
- AJK access is scoped with a Firebase custom claim:
  ```js
  { role: "ajk", mosqueIds: ["masjid-tengku-kelah"] }
  ```
  Superadmin may omit `mosqueIds` to manage the whole country.
- Firestore security rules must repeat the same `role` + `mosqueIds` checks. The UI guard is only
  a UX convenience.

## Public routes

| Route | Purpose |
| --- | --- |
| `/` | Emerald landing + smart install CTA |
| `/rgb` | RGB Islamic-architecture showcase |
| `/app` | Web-view home |
| `/app/mosques` | Nearby masjid/surau finder |
| `/app/programs` | Kuliah, program & announcements |
| `/app/speakers` | Accredited speaker directory |
| `/app/community` | Kariah business/social/volunteer hub |
| `/app/schedule` | Offline-capable schedule |
| `/admin` | AJK portal (Firebase Auth) |
| `/offline` | Service worker fallback |

## PWA install behaviour

- Android/Chrome: `beforeinstallprompt` is captured before hydration → native install sheet.
- iOS Safari: no native prompt → 2-step guide **Share → Add to Home Screen**.
- Already installed (`standalone`): CTA becomes “Buka iMasjid”.
- Service worker caches the app shell and schedule for offline viewing.
- Deployment protection is **disabled** so the public can browse without Vercel login.

## Deployment

- Platform: Vercel, project `skywalker7/imasjid`, connected to GitHub `sky12388/imasjid`.
- Production URL is set via `NEXT_PUBLIC_SITE_URL`.
- Redeploy: `npx vercel --prod --yes` from this folder.
- Firebase Hosting was not used because the account hit its project-creation quota.

## Still to do

- Wire Firestore reads/writes and image upload for posters.
- Add Firebase Auth env vars to Vercel so `/admin` becomes functional.
- Connect an independent prayer-time source (not e-Solat).
- Verify speaker tauliah against official JAWI/JAIS/JAKIM data.
