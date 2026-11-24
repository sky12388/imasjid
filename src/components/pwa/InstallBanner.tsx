"use client";

import { CloseIcon } from "@/components/icons/Icons";
import { InstallButton } from "./InstallButton";
import { usePwaInstall } from "./PwaInstallProvider";

export function InstallBanner() {
  const { state, bannerDismissed, dismissBanner } = usePwaInstall();

  if (bannerDismissed) return null;
  if (state !== "installable" && state !== "ios-guide" && state !== "unsupported") {
    return null;
  }

  const isIos = state === "ios-guide";

  return (
    <aside className="install-banner" role="region" aria-label="Pasang aplikasi iMasjid">
      <div className="install-banner__copy">
        <strong>{isIos ? "Pasang pada skrin utama iPhone anda" : "Bawa iMasjid bersama anda"}</strong>
        <span>
          {isIos
            ? "Dua langkah mudah melalui Safari — tiada App Store."
            : "Pasang sekali, buka terus bila-bila masa, walaupun offline."}
        </span>
      </div>
      <InstallButton variant="banner" />
      <button
        type="button"
        className="install-banner__close"
        onClick={dismissBanner}
        aria-label="Tutup cadangan pasang"
      >
        <CloseIcon width={20} height={20} />
      </button>
    </aside>
  );
}
