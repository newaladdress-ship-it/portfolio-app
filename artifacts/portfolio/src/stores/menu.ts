import { create } from "zustand";

type MenuState = {
  isOpen: boolean;
  showMenu: () => void;
  hideMenu: () => void;
  toggleMenu: () => void;
};

export const useMenu = create<MenuState>((set) => ({
  isOpen: false,
  showMenu: () => set({ isOpen: true }),
  hideMenu: () => set({ isOpen: false }),
  toggleMenu: () => set((prev) => ({ isOpen: !prev.isOpen })),
}));
