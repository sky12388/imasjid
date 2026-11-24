# PWA install behaviour

## Landing page flow (`/`)

`PwaInstallProvider` is mounted in the root layout and listens once for:

- `beforeinstallprompt` (Chromium/Android) — the event is stored and the CTA becomes
  **Pasang Aplikasi iMasjid**. Clicking it calls `event.prompt()` and awaits `userChoice`.
- `appinstalled` — the CTA changes to **Buka iMasjid**.

On iOS, `beforeinstallprompt` is never fired. The provider detects iOS via user agent / touch
platform and switches to `ios-guide`, which opens a two-step modal:

1. Tap the **Share** icon in Safari.
2. Choose **Add to Home Screen**.

If the visitor is on iOS but not Safari (Chrome, Firefox, etc.), the modal adds a note asking them
to reopen the page in Safari. If the app is already running in `display-mode: standalone`, the
install UI is replaced with a direct open link.

When a browser cannot install at all, the CTA falls back to a generic "menu → Pasang apl / Tambah
ke Skrin Utama" guide rather than hiding the option.

The bottom banner repeats the CTA but can be dismissed; the choice is stored in
`localStorage["imasjid:install-banner-dismissed"]`.

## Service worker

`public/sw.js` uses three caches:

| Cache | Content | Strategy |
| --- | --- | --- |
| `imasjid-v1-shell` | `/`, `/app`, `/app/schedule`, `/offline`, manifest, core icons | precache on install |
| `imasjid-v1-runtime` | navigations, Next.js chunks, CSS, fonts | network-first for pages, cache-first for static assets |
| `imasjid-v1-images` | icons, posters, screenshots | cache-first |

Bump `CACHE_VERSION` when changing the app shell; old caches are purged on `activate`.
Registration only happens in production, or locally when `?sw` is present in the query string,
to avoid stale cached chunks during `next dev`.

## Test checklist

Android / Chrome:

- [ ] Visit HTTPS origin; install banner appears after the `beforeinstallprompt` event.
- [ ] Tap install → native sheet opens → icon appears on home screen.
- [ ] Launch icon → app opens in standalone mode without browser chrome.
- [ ] Open `/app/schedule`, go offline, reload → schedule still readable.

iOS / Safari:

- [ ] Visit HTTPS origin; CTA says **Pasang di iPhone / iPad**.
- [ ] Tap CTA → modal shows Share → Add to Home Screen with large visuals.
- [ ] Add to Home Screen → icon launches standalone app.
- [ ] Buka Terus (Web View) works without any install prompt.

Accessibility:

- [ ] All CTA tap targets ≥ 46px; hero CTA ≥ 68px.
- [ ] Modal is keyboard dismissible with Escape and has `role="dialog"`.
- [ ] Focus ring is visible (gold outline) on every interactive element.
- [ ] Body text starts at 17–18px; no information conveyed by colour alone.
