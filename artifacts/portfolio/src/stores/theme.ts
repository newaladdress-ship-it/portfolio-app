import { create } from "zustand";
import { Theme, getTheme, setTheme } from "@/lib/theme";

type ThemeState = {
  theme: Theme;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: getTheme(),
  toggleTheme: () => {
    const next: Theme = get().theme === "dark" ? "light" : "dark";
    setTheme(next);
    set({ theme: next });
  },
}));
