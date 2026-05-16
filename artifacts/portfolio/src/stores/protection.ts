import { create } from "zustand";

type ProtectionState = {
  isProtected: boolean;
  toggle: () => void;
};

const KEY = "portfolio-protection";

function getInitial(): boolean {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "false") return false;
  } catch {}
  return true;
}

function save(v: boolean) {
  try { localStorage.setItem(KEY, String(v)); } catch {}
}

export const useProtectionStore = create<ProtectionState>((set, get) => ({
  isProtected: getInitial(),
  toggle: () => {
    const next = !get().isProtected;
    save(next);
    set({ isProtected: next });
  },
}));
