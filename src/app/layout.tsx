import type { Metadata, Viewport } from "next";
import { PwaInstallProvider } from "@/components/pwa/PwaInstallProvider";
import { ServiceWorkerRegister } from "@/components/pwa/ServiceWorkerRegister";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "iMasjid — Komuniti Masjid & Surau",
    template: "%s | iMasjid",
  },
  description:
    "Cari masjid berdekatan, ikut kuliah & program, semak direktori penceramah bertauliah dan hubungi komuniti kariah — terus dari skrin utama telefon anda.",
  applicationName: "iMasjid",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "ms_MY",
    url: "/",
    siteName: "iMasjid",
    title: "iMasjid — Komuniti Masjid & Surau",
    description:
      "Masjid berdekatan. Ilmu berterusan. Komuniti bersatu. Pasang terus ke skrin utama tanpa App Store.",
    images: [{ url: "/screenshots/home-mobile.png", width: 390, height: 844, alt: "iMasjid" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "iMasjid — Komuniti Masjid & Surau",
    description: "Pasang iMasjid terus dari web. Tiada App Store, tanpa pendaftaran.",
    images: ["/screenshots/home-mobile.png"],
  },
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "mobile-web-app-capable": "yes",
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  themeColor: "#04140f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ms">
      <body>
        {/* Capture the install event before React hydrates so an early-fired prompt is not lost. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();window.__imasjidInstallPrompt=e;});",
          }}
        />
        <PwaInstallProvider>
          <ServiceWorkerRegister />
          {children}
        </PwaInstallProvider>
      </body>
    </html>
  );
}
