"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface Window {
    __imasjidInstallPrompt?: BeforeInstallPromptEvent;
  }
}

export type InstallState =
  | "checking"
  | "installable"
  | "ios-guide"
  | "installed"
  | "unsupported";

type PromptOutcome = "accepted" | "dismissed" | "unavailable";

interface PwaInstallContextValue {
  state: InstallState;
  isIos: boolean;
  isIosSafari: boolean;
  promptInstall: () => Promise<PromptOutcome>;
  bannerDismissed: boolean;
  dismissBanner: () => void;
}

const PwaInstallContext = createContext<PwaInstallContextValue | null>(null);
const BANNER_DISMISSED_KEY = "imasjid:install-banner-dismissed";

function detectEnvironment() {
  if (typeof window === "undefined") {
    return { standalone: false, isIos: false, isIosSafari: false };
  }

  const ua = navigator.userAgent;
  const isIos =
    /iP(hone|od|ad)/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isIosSafari =
    isIos && /Safari/.test(ua) && !/(CriOS|FxiOS|EdgiOS|OPiOS|MicroMessenger)/.test(ua);
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;

  return { standalone, isIos, isIosSafari };
}

export function PwaInstallProvider({ children }: { children: ReactNode }) {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [state, setState] = useState<InstallState>("checking");
  const [isIos, setIsIos] = useState(false);
  const [isIosSafari, setIsIosSafari] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    const env = detectEnvironment();
    setIsIos(env.isIos);
    setIsIosSafari(env.isIosSafari);

    try {
      setBannerDismissed(window.localStorage.getItem(BANNER_DISMISSED_KEY) === "1");
    } catch {
      // Private browsing can block localStorage — ignore and keep the banner.
    }

    if (env.standalone) {
      setState("installed");
      return;
    }

    if (env.isIos) {
      // iOS Safari has no beforeinstallprompt; show the manual 2-step guide.
      setState("ios-guide");
      return;
    }

    // An inline script in the root layout may have captured the event before hydration.
    const earlyPrompt = window.__imasjidInstallPrompt;
    if (earlyPrompt) {
      deferredPrompt.current = earlyPrompt;
      setState("installable");
    }

    let fallbackTimer: number | undefined;

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      const promptEvent = event as BeforeInstallPromptEvent;
      deferredPrompt.current = promptEvent;
      window.__imasjidInstallPrompt = promptEvent;
      setState("installable");
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
    };

    const onAppInstalled = () => {
      deferredPrompt.current = null;
      window.__imasjidInstallPrompt = undefined;
      setState("installed");
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    fallbackTimer = window.setTimeout(() => {
      setState((current) => (current === "checking" ? "unsupported" : current));
    }, 4000);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
    };
  }, []);

  const promptInstall = useCallback(async (): Promise<PromptOutcome> => {
    const event = deferredPrompt.current;
    if (!event) return "unavailable";

    await event.prompt();
    const choice = await event.userChoice;
    deferredPrompt.current = null;
    window.__imasjidInstallPrompt = undefined;

    if (choice.outcome === "accepted") setState("installed");
    return choice.outcome;
  }, []);

  const dismissBanner = useCallback(() => {
    setBannerDismissed(true);
    try {
      window.localStorage.setItem(BANNER_DISMISSED_KEY, "1");
    } catch {
      // Ignore storage failures.
    }
  }, []);

  const value = useMemo<PwaInstallContextValue>(
    () => ({ state, isIos, isIosSafari, promptInstall, bannerDismissed, dismissBanner }),
    [state, isIos, isIosSafari, promptInstall, bannerDismissed, dismissBanner]
  );

  return <PwaInstallContext.Provider value={value}>{children}</PwaInstallContext.Provider>;
}

export function usePwaInstall(): PwaInstallContextValue {
  const context = useContext(PwaInstallContext);
  if (!context) {
    throw new Error("usePwaInstall must be used inside <PwaInstallProvider>");
  }
  return context;
}
