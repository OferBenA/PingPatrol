import { create } from "zustand";

type ThemeStoreType = {
	theme: "dark" | "light";
	toggleTheme: () => void;
};

export const useThemeStore = create<ThemeStoreType>((set) => ({
	theme: "dark",
	toggleTheme: () => {
		set((state) => ({theme: state.theme == 'dark'? 'light' : 'dark' }));
	},
}));
