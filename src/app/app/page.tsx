import Link from "next/link";
import {
  ArrowRightIcon,
  CalendarIcon,
  ChevronRightIcon,
  CommunityIcon,
  MosqueIcon,
  PinIcon,
  SpeakerIcon,
  ClockIcon,
} from "@/components/icons/Icons";
import { DEMO_COMMUNITY, DEMO_MOSQUES, DEMO_PROGRAMS, DEMO_SPEAKERS } from "@/data/mock";

const modules = [
  {
    href: "/app/mosques",
    icon: <MosqueIcon width={28} height={28} />,
    title: "Masjid & Surau Berdekatan",
    text: "Cari dalam julat 500 m – 10 km, lengkap dengan tag kemudahan.",
  },
  {
    href: "/app/programs",
    icon: <CalendarIcon width={28} height={28} />,
    title: "Kuliah & Program",
    text: "Kuliah, program dan pengumuman rasmi kariah masjid.",
  },
  {
    href: "/app/speakers",
    icon: <SpeakerIcon width={28} height={28} />,
    title: "Direktori Penceramah",
    text: "Semak tauliah JAWI, JAIS, JAKIM dan topik kepakaran.",
  },
  {
    href: "/app/community",
    icon: <CommunityIcon width={28} height={28} />,
    title: "Hub Kariah",
    text: "Papan kenar niaga, sosial dan peluang sukarelawan tempatan.",
  },
];

export default function AppHomePage() {
  return (
    <>
      <div className="page-heading">
        <h1>Assalamualaikum 👋</h1>
        <p>Selamat datang ke iMasjid. Semua maklumat komuniti ada di sini — tanpa log masuk.</p>
      </div>

      <div className="stat-grid">
        <div className="stat">
          <strong>{DEMO_MOSQUES.length}</strong>
          <span>Masjid & surau dalam senarai</span>
        </div>
        <div className="stat">
          <strong>{DEMO_PROGRAMS.length}</strong>
          <span>Kuliah & program akan datang</span>
        </div>
        <div className="stat">
          <strong>{DEMO_SPEAKERS.length}</strong>
          <span>Penceramah dalam direktori</span>
        </div>
        <div className="stat">
          <strong>{DEMO_COMMUNITY.length}</strong>
          <span>Notis hub kariah</span>
        </div>
      </div>

      <div className="feature-grid">
        {modules.map((module) => (
          <Link key={module.href} href={module.href} className="feature-card">
            <span className="feature-card__icon">{module.icon}</span>
            <h3>{module.title}</h3>
            <p>{module.text}</p>
            <span className="meta" style={{ marginTop: "0.9rem", color: "var(--emerald)" }}>
              Buka <ChevronRightIcon width={18} height={18} />
            </span>
          </Link>
        ))}
      </div>

      <div className="panel" style={{ marginTop: "1rem" }}>
        <div className="list-item__top">
          <div>
            <h2>
              <ClockIcon width={22} height={22} /> Jadual luar talian
            </h2>
            <p style={{ marginTop: "0.4rem" }}>
              Jadual kuliah dan solat kekal boleh dibaca walaupun tiada internet selepas apl
              dibuka sekali.
            </p>
          </div>
          <Link href="/app/schedule" className="btn btn-secondary">
            Lihat jadual <ArrowRightIcon width={18} height={18} />
          </Link>
        </div>
      </div>

      <div className="notice notice--warn" style={{ marginTop: "1rem" }}>
        <strong>Peringkat scaffold:</strong> senarai di atas menggunakan data contoh. Sambungan
        Firestore / CMS dan pengesahan tauliah akan disambungkan pada fasa seterusnya.
      </div>

      <div className="meta" style={{ marginTop: "1rem" }}>
        <span>
          <PinIcon width={16} height={16} /> Lokasi hanya digunakan dalam penyemak imbas anda
        </span>
      </div>
    </>
  );
}
