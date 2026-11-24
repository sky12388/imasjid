# Deployment

## Current production deployment

- **Platform:** Vercel (project `skywalker7/imasjid`, connected to `sky12388/imasjid`)
- **Live URL:** https://imasjid-theta.vercel.app
- **RGB showcase:** https://imasjid-theta.vercel.app/rgb
- `NEXT_PUBLIC_SITE_URL` is set to the live URL; deployment protection (SSO) is disabled so anyone
  nationwide can browse.

Redeploy with `npx vercel --prod --yes` from this folder.

## 1. Prepare the repo

The folder is standalone — no monorepo config and no e-Solat dependency.

```bash
cd /home/ma/Documents/imasjid
git init
git add .
git commit -m "feat: scaffold iMasjid PWA and install landing"
```

Push to a new remote (e.g. `sky12388/imasjid`) — do **not** push into `skywalker.esolat`.

## 2. Vercel (recommended)

- Import the new repository; framework is auto-detected as Next.js.
- Build command: `npm run build`; output: `.next`.
- Add the `NEXT_PUBLIC_*` Firebase variables from `.env.example`.
- Add `NEXT_PUBLIC_SITE_URL=https://your-domain.example`.
- Deploy over HTTPS — service workers and install prompts do not work over plain HTTP.

## 3. Firebase Hosting alternative

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```

Use the existing Next.js build through Firebase Web Frameworks (or a Cloud Function/Cloud Run
container). Set `"rewrites": [{ "source": "**", "destination": "/" }]` for App Router client
navigation, and ensure `/sw.js` is served with `Cache-Control: public, max-age=0, must-revalidate`.

## 4. Firebase Auth + AJK roles

1. Firebase console → **Authentication → Sign-in method** → enable **Email/Password**.
2. Create AJK accounts (or use the Admin SDK to import them).
3. Grant the custom claim via Admin SDK / a trusted Cloud Function:

```js
await admin.auth().setCustomUserClaims(uid, {
  role: "ajk",
  mosqueIds: ["masjid-tengku-kelah"], // only this mosque may be renamed/updated
});
```

Allowed roles are `ajk`, `admin`, `superadmin` (see `src/lib/firebase.ts`). The client guard reads
`role` and `mosqueIds` from `getIdTokenResult(user).claims`; the same checks **must** be repeated in
Firestore rules. A superadmin may omit `mosqueIds` to manage the whole national directory.

AJK users should only change a mosque's `localName`, `area`, `district`, `state` and facilities.
The stable national `id` and canonical `name` are read-only.

Example rule sketch:

```rules
function isAjk() {
  return request.auth != null &&
         request.auth.token.role in ['ajk', 'admin', 'superadmin'];
}

function manages(id) {
  return request.auth.token.role == 'superadmin' ||
         (request.auth.token.mosqueIds is list &&
          id in request.auth.token.mosqueIds);
}

match /programs/{id} {
  allow read: if resource.data.published == true;
  allow write: if isAjk() && manages(resource.data.mosqueId);
}
```

## 5. Post-deploy verification

- Run Lighthouse PWA audit (installable, service worker, manifest, icons).
- Check `/manifest.json` returns `application/manifest+json` or `application/json`.
- Check `/sw.js` is not served with an aggressive cache.
- Test install flow on a real Android Chrome and a real iOS Safari device.
- Confirm public routes remain browseable with Auth disabled / signed out.

## 6. Known scaffold gaps

- Firestore reads/wires, image upload for posters, and push notifications are not implemented.
- Speaker tauliah verification needs an official data source or manual AJK attestation.
- Prayer times are demo values; choose an independent source when ready.
