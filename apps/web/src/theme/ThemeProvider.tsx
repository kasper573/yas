import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useCallback } from "react";
import { type ThemeName, useThemeNames } from "./index";
import { ThemeContext } from ".";

export function ThemeProvider({
  theme,
  setTheme,
  children,
}: {
  children?: ReactNode;
  theme: ThemeName;
  setTheme: Dispatch<SetStateAction<ThemeName>>;
}) {
  const themeNames = useThemeNames();
  const toggleTheme = useCallback(
    () => setTheme((theme) => themeNames.filter((t) => t !== theme)[0]),
    [setTheme, themeNames],
  );
  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}
