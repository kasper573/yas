import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useCallback, useContext } from "react";
import { dark } from "@yas/style/themes/dark.css";
import { light } from "@yas/style/themes/light.css";

export type ThemeName = keyof typeof themeClassNames;
const themeClassNames = { dark, light };
const themeNames = Object.keys(themeClassNames) as ThemeName[];

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeClassName() {
  const [themeName] = useTheme();
  return themeClassNames[themeName];
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
    () => setTheme((theme) => themeNames.filter((t) => t !== theme)[0]),
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
