import type { Metadata } from "next";
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
import { GeometricPattern, IslamicArchitecture } from "@/components/rgb/IslamicArt";
import styles from "./rgb.module.css";

export const metadata: Metadata = {
  title: "iMasjid RGB — Senibina Islam",
  description:
    "Versi paparan RGB iMasjid dengan ilham senibina Islam: kubah, menara, gerbang lengkung dan corak geometri.",
};

const features = [
  {
    icon: <MosqueIcon width={28} height={28} />,
    title: "Masjid & Surau",
    text: "Cari rumah ibadah dalam julat 500 m hingga 10 km bersama tag kemudahan kariah.",
    href: "/app/mosques",
  },
  {
    icon: <CalendarIcon width={28} height={28} />,
    title: "Kuliah & Program",
    text: "Kuliah, program dan pengumuman rasmi masjid dalam satu feed yang mudah diimbas.",
    href: "/app/programs",
  },
  {
    icon: <SpeakerIcon width={28} height={28} />,
    title: "Penceramah Bertauliah",
    text: "Semakan pantas status tauliah JAWI, JAIS, JAKIM dan topik kepakaran.",
    href: "/app/speakers",
  },
  {
    icon: <CommunityIcon width={28} height={28} />,
    title: "Hub Kariah",
    text: "Papan kenar niaga tempatan, aktiviti sosial dan peluang sukarelawan komuniti.",
    href: "/app/community",
  },
];

const architecturePoints = [
  {
    title: "Kubah & menara",
    text: "Siluet kubah dan menara menjadi rangka visual halaman — melambangkan masjid sebagai pusat komuniti.",
  },
  {
    title: "Gerbang lengkung",
    text: "Arka pada bahagian bawah artwork diilhamkan gerbang masuk masjid — ruang terbuka untuk semua.",
  },
  {
    title: "Corak geometri",
    text: "Bintang lapan dan tessellation Arabesque mengulang latar, memberi irama tanpa mengganggu kebolehbacaan.",
  },
  {
    title: "Cahaya RGB",
    text: "Merah, hijau dan biru dipancarkan pada kubah dan menara untuk identiti digital yang moden tetapi tetap Islami.",
  },
];

const steps = [
  {
    title: "Android / Chrome",
    text: "Tekan butang pasang; helaian pemasangan asli akan muncul terus dari penyemak imbas.",
  },
  {
    title: "iPhone / Safari",
    text: "Panduan Share → Add to Home Screen dipaparkan secara automatik apabila peranti iOS dikesan.",
  },
  {
    title: "Terus digunakan",
    text: "Ikon iMasjid muncul di skrin utama seperti apl biasa — jadual juga kekal boleh dibaca offline.",
  },
];

export default function RgbShowcasePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand} aria-label="iMasjid — laman utama">
            <span className={styles.brandMark}>
              <MosqueIcon width={27} height={27} />
            </span>
            <span>
              <span className={styles.brandName}>iMasjid</span>
              <span className={styles.brandTag}>by skywalker</span>
            </span>
          </Link>
          <nav className={styles.nav} aria-label="Navigasi paparan RGB">
            <a href="#ciri">Ciri</a>
            <a href="#senibina">Senibina</a>
            <a href="#pasang">Pasang</a>
            <Link href="/" className={styles.navBtn}>
              Tema Emerald
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroArt}>
            <IslamicArchitecture idPrefix="hero-arch" />
          </div>
          <div className={styles.heroOverlay} />
          <div className={styles.heroInner}>
            <span className={styles.eyebrow}>
              <PinIcon width={16} height={16} /> Reka bentuk RGB · Ilham senibina Islam
            </span>
            <h1>
              Masjid berdekatan.
              <br />
              <span className={styles.gradientText}>Ilmu berterusan.</span>
              <br />
              Komuniti bersatu.
            </h1>
            <p className={styles.heroLead}>
              Warna baharu untuk platform yang sama. Kubah, gerbang lengkung dan corak geometri
              Islam bertemu palet merah–hijau–biru dalam satu pengalaman yang tetap besar, jelas
              dan mesra warga emas.
            </p>
            <div className={styles.heroActions}>
              <InstallButton variant="hero" />
              <Link href="/app" className={styles.btnGhost}>
                Buka Terus (Web View)
              </Link>
            </div>
            <div className={styles.heroTrust}>
              <span>Tanpa App Store</span>
              <span>Tanpa pendaftaran</span>
              <span>Sedia luar talian</span>
            </div>
          </div>
        </section>

        <section className={styles.section} id="ciri">
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Empat tonggak komuniti, satu warna baharu</h2>
            <p className={styles.sectionLead}>
              Fungsinya kekal sama seperti edisi Emerald — hanya pembentangan visualnya yang
              menggunakan aksen RGB dan tekstur senibina Islam.
            </p>
            <div className={styles.featureGrid}>
              {features.map((feature) => (
                <Link key={feature.href} href={feature.href} className={styles.featureCard}>
                  <span className={styles.featureIcon}>{feature.icon}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section} id="senibina">
          <div className={styles.archSection}>
            <div className={styles.artFrame}>
              <GeometricPattern idPrefix="section-geo" />
              <span className={styles.artCaption}>Bintang lapan · Arabesque · Cahaya RGB</span>
            </div>
            <div>
              <h2 className={styles.sectionTitle}>Senibina Islam, dibawa ke skrin anda</h2>
              <p className={styles.sectionLead}>
                Setiap elemen halaman ini diilhamkan daripada bentuk yang sudah lama akrab dengan
                ruang solat kita, kemudian diterjemahkan semula dalam bahasa digital.
              </p>
              <div className={styles.pointList}>
                {architecturePoints.map((point) => (
                  <div className={styles.point} key={point.title}>
                    <span className={styles.pointDot} />
                    <div>
                      <h3>{point.title}</h3>
                      <p>{point.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section} id="pasang">
          <div className={styles.sectionInner}>
            <h2 className={styles.sectionTitle}>Install dengan mudah</h2>
            <p className={styles.sectionLead}>
              Sama seperti edisi Emerald, anda boleh pasang terus dari laman web ini — pada Android
              mahupun iPhone.
            </p>
            <div className={styles.steps}>
              {steps.map((step, index) => (
                <div className={styles.step} key={step.title}>
                  <span className={styles.stepNum}>{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.ctaBand}>
          <div>
            <h2>Jadikan iMasjid sebahagian dari skrin utama anda</h2>
            <p>Satu tekan pada Android, dua langkah pada iOS. Tiada kedai aplikasi, tiada akaun.</p>
          </div>
          <div className={styles.ctaActions}>
            <InstallButton variant="compact" />
            <Link href="/app" className={styles.btnGhost}>
              Buka Web View
            </Link>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>© {new Date().getFullYear()} iMasjid by skywalker · Edisi RGB senibina Islam.</span>
          <span>
            <Link href="/">Kembali ke tema Emerald</Link> ·{" "}
            <Link href="/admin">Portal AJK</Link>
          </span>
        </div>
      </footer>

      <InstallBanner />
    </div>
  );
}
