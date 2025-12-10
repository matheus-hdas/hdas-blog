import { create } from "zustand";
import { Theme } from "@/types";

export type ThemeState = {
  theme: Theme;
};

export type ThemeActions = {
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeState & ThemeActions>((set) => ({
  theme: "light",
  setTheme: (theme) => set({ theme }),
}));
