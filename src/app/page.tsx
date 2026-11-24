import Link from "next/link";
import {
  CalendarIcon,
  CommunityIcon,
  MosqueIcon,
  PinIcon,
  SpeakerIcon,
} from "@/components/icons/Icons";
import { InstallBanner } from "@/components/pwa/InstallBanner";
import { InstallButton } from "@/components/pwa/InstallButton";

const features = [
  {
    icon: <MosqueIcon width={28} height={28} />,
    title: "Cari Masjid & Surau",
    text: "Senarai dalam lingkungan 500 m hingga 10 km bersama tag kemudahan seperti parkir dan akses OKU.",
    href: "/app/mosques",
  },
  {
    icon: <CalendarIcon width={28} height={28} />,
    title: "Kuliah & Program",
    text: "Jadual kuliah, program kariah dan pengumuman rasmi masjid dalam satu senarai yang mudah dibaca.",
    href: "/app/programs",
  },
  {
    icon: <SpeakerIcon width={28} height={28} />,
    title: "Direktori Penceramah",
    text: "Semak status tauliah JAWI, JAIS, JAKIM dan cari penceramah mengikut topik yang anda minati.",
    href: "/app/speakers",
  },
  {
    icon: <CommunityIcon width={28} height={28} />,
    title: "Hub Kariah",
    text: "Papan kenar niaga tempatan, aktiviti sosial dan peluang sukarelawan dalam komuniti anda.",
    href: "/app/community",
  },
];

export default function LandingPage() {
  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <Link href="/" className="brand" aria-label="iMasjid — laman utama">
            <span className="brand-mark">
              <MosqueIcon width={27} height={27} />
            </span>
            <span>
              <span className="brand-name">iMasjid</span>
              <span className="brand-tag">komuniti</span>
            </span>
          </Link>
          <nav className="header-actions" aria-label="Navigasi utama">
            <Link href="/admin" className="btn btn-quiet">
              Portal AJK
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero container">
          <span className="hero__eyebrow">
            <PinIcon width={16} height={16} /> Untuk komuniti masjid & surau
          </span>
          <h1>
            Masjid berdekatan.
            <br />
            <span className="accent">Ilmu berterusan.</span>
            <br />
            Komuniti bersatu.
          </h1>
          <p className="hero__lead">
            Cari tempat solat, ikut kuliah, semak penceramah bertauliah dan dapatkan berita
            kariah. Semua dalam satu aplikasi ringan yang terus dipasang pada telefon anda.
          </p>
          <div className="hero__actions">
            <InstallButton variant="hero" />
            <Link href="/app" className="btn btn-secondary">
              Buka Terus (Web View)
            </Link>
          </div>
          <div className="hero__trust">
            <span>Tiada App Store / Play Store</span>
            <span>Tiada pendaftaran untuk melayari</span>
            <span>Boleh diguna luar talian</span>
          </div>
        </section>

        <section className="section container" id="ciri">
          <div className="section-heading">
            <div>
              <h2>Semua yang anda perlukan, dekat dengan anda</h2>
              <p>Direka besar, jelas dan mudah ditekan — sesuai untuk semua peringkat umur.</p>
            </div>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <Link key={feature.href} href={feature.href} className="feature-card">
                <span className="feature-card__icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section container" id="pasang">
          <div className="section-heading">
            <div>
              <h2>Pasang dalam masa kurang dari seminit</h2>
              <p>Apl dipasang terus daripada laman web ini. Tiada muat turun besar, tiada akaun.</p>
            </div>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <span className="step-card__number">1</span>
              <h3>Android / Chrome</h3>
              <p>
                Tekan butang <strong>Pasang Aplikasi iMasjid</strong>. Jika muncul popup, sahkan
                dengan memilih <strong>Pasang</strong>.
              </p>
            </div>
            <div className="step-card">
              <span className="step-card__number">2</span>
              <h3>iPhone / iPad</h3>
              <p>
                Tekan ikon <strong>Kongsi</strong> di Safari, kemudian pilih{" "}
                <strong>Tambah ke Skrin Utama</strong>. Butang di atas akan menunjukkan panduan
                bergambar secara automatik.
              </p>
            </div>
            <div className="step-card">
              <span className="step-card__number">3</span>
              <h3>Terus guna</h3>
              <p>
                Ikon iMasjid muncul di skrin utama seperti apl biasa. Buka tanpa perlu menaip
                alamat web lagi, dan jadual kekal boleh dilihat walaupun offline.
              </p>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="callout">
            <div>
              <strong> Mahu melihat dahulu sebelum pasang?</strong>
              <p>Buka versi web sepenuhnya. Semua maklumat awam boleh dilayari tanpa log masuk.</p>
            </div>
            <Link href="/app" className="btn btn-secondary">
              Buka Terus (Web View)
            </Link>
          </div>
        </div>
      </main>

      <footer className="site-footer">
        <div className="container site-footer__inner">
          <span>© {new Date().getFullYear()} iMasjid · Platform komuniti masjid & surau.</span>
          <span>
            Dibina secara berasingan daripada sistem kiosk · Data demo untuk peringkat scaffold.
          </span>
        </div>
      </footer>

      <InstallBanner />
    </>
  );
}
