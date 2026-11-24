"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  CheckIcon,
  CloseIcon,
  DownloadIcon,
  ShareIcon,
} from "@/components/icons/Icons";
import { usePwaInstall } from "./PwaInstallProvider";

type Variant = "hero" | "banner" | "compact";

interface InstallButtonProps {
  variant?: Variant;
  className?: string;
}

export function InstallButton({ variant = "hero", className = "" }: InstallButtonProps) {
  const { state, isIosSafari, promptInstall } = usePwaInstall();
  const [guide, setGuide] = useState<"ios" | "generic" | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!guide) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setGuide(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [guide]);

  const handleNativeInstall = useCallback(async () => {
    setBusy(true);
    const outcome = await promptInstall();
    setBusy(false);
    if (outcome === "unavailable") setGuide("generic");
  }, [promptInstall]);

  const classes = `install-btn install-btn--${variant} ${className}`.trim();

  if (state === "installed") {
    return (
      <Link href="/app" className={`${classes} install-btn--installed`}>
        <CheckIcon className="install-btn__icon" />
        <span>Buka iMasjid</span>
      </Link>
    );
  }

  if (state === "ios-guide") {
    return (
      <>
        <button type="button" className={`${classes} install-btn--primary`} onClick={() => setGuide("ios")}>
          <ShareIcon className="install-btn__icon" />
          <span>Pasang di iPhone / iPad</span>
        </button>
        {guide === "ios" && (
          <IosGuideModal isSafari={isIosSafari} onClose={() => setGuide(null)} />
        )}
      </>
    );
  }

  if (state === "installable") {
    return (
      <button
        type="button"
        className={`${classes} install-btn--primary`}
        onClick={handleNativeInstall}
        disabled={busy}
      >
        <DownloadIcon className="install-btn__icon" />
        <span>{busy ? "Memasang..." : "Pasang Aplikasi iMasjid"}</span>
      </button>
    );
  }

  if (state === "checking") {
    return (
      <button type="button" className={`${classes} install-btn--muted`} disabled>
        <span>Semak keserasian...</span>
      </button>
    );
  }

  return (
    <>
      <button type="button" className={`${classes} install-btn--muted`} onClick={() => setGuide("generic")}>
        <DownloadIcon className="install-btn__icon" />
        <span>Cara pasang apl</span>
      </button>
      {guide === "generic" && <GenericGuideModal onClose={() => setGuide(null)} />}
    </>
  );
}

function GuideShell({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="guide-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-guide-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="guide-modal__header">
          <h2 id="install-guide-title">{title}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Tutup panduan">
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function IosGuideModal({ isSafari, onClose }: { isSafari: boolean; onClose: () => void }) {
  return (
    <GuideShell title="Pasang di iPhone / iPad" onClose={onClose}>
      <p className="guide-modal__intro">
        Pasang terus dari laman web — <strong>tiada App Store</strong> diperlukan.
      </p>

      <ol className="guide-steps">
        <li className="guide-step">
          <span className="guide-step__number">1</span>
          <div className="guide-step__body">
            <h3>Tekan ikon Kongsi</h3>
            <p>
              Ikon ini berada di bahagian bawah Safari — segi empat dengan anak panah ke atas.
            </p>
            <div className="guide-step__visual" aria-hidden="true">
              <ShareIcon width={30} height={30} />
            </div>
          </div>
        </li>
        <li className="guide-step">
          <span className="guide-step__number">2</span>
          <div className="guide-step__body">
            <h3>Pilih “Tambah ke Skrin Utama”</h3>
            <p>
              Tatal ke bawah menu kongsi, tekan <strong>Tambah ke Skrin Utama</strong>, kemudian
              sahkan. Ikon iMasjid akan muncul di skrin utama anda.
            </p>
            <div className="guide-step__visual guide-step__visual--label" aria-hidden="true">
              + Tambah ke Skrin Utama
            </div>
          </div>
        </li>
      </ol>

      {!isSafari && (
        <p className="guide-note">
          Anda nampaknya menggunakan penyemak imbas selain Safari. Sila buka semula laman ini
          dalam <strong>Safari</strong> untuk melihat pilihan Tambah ke Skrin Utama.
        </p>
      )}

      <button type="button" className="btn btn-primary guide-modal__done" onClick={onClose}>
        Faham, teruskan
      </button>
    </GuideShell>
  );
}

function GenericGuideModal({ onClose }: { onClose: () => void }) {
  return (
    <GuideShell title="Cara pasang iMasjid" onClose={onClose}>
      <p className="guide-modal__intro">
        Penyemak imbas ini tidak menghantar prompt pasang automatik. Anda masih boleh menambah
        iMasjid ke skrin utama secara manual.
      </p>
      <ol className="guide-steps">
        <li className="guide-step">
          <span className="guide-step__number">1</span>
          <div className="guide-step__body">
            <h3>Buka menu penyemak imbas</h3>
            <p>Tekan ikon tiga titik atau ikon kunci di sebelah alamat laman.</p>
          </div>
        </li>
        <li className="guide-step">
          <span className="guide-step__number">2</span>
          <div className="guide-step__body">
            <h3>Pilih “Pasang apl” / “Tambah ke Skrin Utama”</h3>
            <p>Ikon iMasjid akan ditambah ke skrin utama telefon anda.</p>
          </div>
        </li>
      </ol>
      <button type="button" className="btn btn-primary guide-modal__done" onClick={onClose}>
        Faham
      </button>
    </GuideShell>
  );
}
