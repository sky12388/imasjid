# iMasjid — Architecture Decision Record

## Status

Scaffold accepted. Project lives at `/home/ma/Documents/imasjid`, a sibling of `esolat-v6`.

## Decision: nationwide, open-to-all platform

iMasjid is **not** a single-mosjid app. One national deployment serves every masjid and surau:

- Anyone can browse any mosque, program, speaker or kariah notice without an account.
- Each mosque/surau has a stable national `id` and canonical `name` that local AJK never edit.
- A local AJK only sets `localName`, `area`, `district`, `state` and facility details for their own
  record — effectively "renaming the masjid/surau according to their location".
- Distance filtering happens in the visitor's browser, so the same nationwide dataset works for
  someone in Johor and someone in Selangor.
- AJK access is scoped with a `mosqueIds` custom claim; an account can only manage the mosques
  listed there. Superadmins may leave it empty to manage all.

## Decision: full decoupling from e-Solat

iMasjid is a separate Next.js application with its own package manifest, git history, deployment,
Firebase project and data store. It does **not**:

- import code from `esolat-v6`;
- read `kiosk-config.json`, JAKIM zone data, prayer-schedule utilities or kiosk assets;
- connect to the kiosk remote-control, broadcast or watchdog services;
- share a deployment target, environment secret or domain with the kiosk system.

The only resemblance is visual language (dark, high-contrast, emerald), which is intentional for
community familiarity. Prayer times shown in `/app/schedule` are **demo placeholders** until a
dedicated, independently-sourced schedule adapter is chosen.

## Why a PWA instead of native store apps

- No Play Store / App Store review friction for a small community rollout.
- One codebase for Android, iOS and desktop, served over HTTPS from Vercel or Firebase Hosting.
- `beforeinstallprompt` gives Android/Chrome a one-tap native install sheet.
- iOS Safari cannot use `beforeinstallprompt`, so the landing page detects iOS and shows the
  two-step Share → Add to Home Screen guide automatically.
- Service worker keeps the schedule and previously visited pages available offline.

## Application layers

```
src/app/                    App Router pages
  page.tsx                  Public landing + install CTA
  app/                      Public web view + MVP modules (no auth)
  admin/                    AJK portal (Firebase Auth + role claim)
  offline/                  Service worker fallback
src/components/
  pwa/                      Install provider, button, iOS guide, banner, SW registration
  modules/                  Mosque finder, program feed, speaker directory, community hub
  admin/                    Auth guard
  layout/, icons/           Shared shell UI
src/hooks/                  Geolocation
src/lib/                    Firebase, geo math, labels, formatting
src/data/mock.ts            Clearly-labelled demo data
public/
  manifest.json             Full PWA manifest
  sw.js                     App shell + offline caching
  icons/, screenshots/      Generated install assets
scripts/                    Reproducible icon/screenshot generators
```

## Data model direction

Current screens are read-only over `src/data/mock.ts`. The intended production wiring is:

- **Firestore** collections: `mosques`, `programs`, `speakers`, `communityPosts`, `announcements`.
- Public reads via client SDK with restrictive security rules (published items only).
- Writes only from `/admin` after Firebase Auth custom claim check (`role` ∈ `ajk|admin|superadmin`).
- Speaker tauliah status is advisory in the UI; authoritative verification stays with JAWI/JAIS/JAKIM.

## Security notes

- Role is taken from the Firebase ID token custom claim, not from a client-side field.
- The guard is a UX gate; Firestore security rules must repeat the same role check server-side.
- Geolocation coordinates never leave the browser; distance filtering is local.
- No kiosk credentials or e-Solat secrets are referenced anywhere in this repository.
