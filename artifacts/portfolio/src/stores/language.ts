import { create } from "zustand";

export type Locale = "en" | "fr" | "ja";

type LanguageState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  cycleLocale: () => void;
};

const STORAGE_KEY = "portfolio-locale";
const ORDER: Locale[] = ["en", "fr", "ja"];

function getInitial(): Locale {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "fr" || v === "ja") return v;
  } catch {}
  return "en";
}

function save(locale: Locale) {
  try { localStorage.setItem(STORAGE_KEY, locale); } catch {}
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  locale: getInitial(),
  setLocale: (locale) => { save(locale); set({ locale }); },
  cycleLocale: () => {
    const next = ORDER[(ORDER.indexOf(get().locale) + 1) % ORDER.length];
    save(next);
    set({ locale: next });
  },
}));
