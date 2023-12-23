import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useCallback, useContext } from "react";

import { useQuery } from "@tanstack/react-query";
export type ThemeName = keyof typeof themeStyleLoaders;

export function useTheme() {
  return useContext(ThemeContext);
}

const themeStyleLoaders = {
  dark: () => import("@yas/style/themes/dark.css").then((m) => m.dark),
  light: () => import("@yas/style/themes/light.css").then((m) => m.light),
};

export function useThemeClassName() {
  const [themeName] = useTheme();
  const { data: themeClassName } = useQuery(
    ["theme", themeName],
    themeStyleLoaders[themeName],
  );
  return themeClassName;
}

export function ThemeProvider({
  theme,
  setTheme,
  children,
}: {
  children?: ReactNode;
  theme: ThemeName;
  setTheme: Dispatch<SetStateAction<ThemeName>>;
}) {
  const toggleTheme = useCallback(
    () => setTheme((theme) => (theme === "dark" ? "light" : "dark")),
    [setTheme],
  );
  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export const ThemeContext = createContext<[ThemeName, () => void]>([
  "light",
  () => {},
]);
