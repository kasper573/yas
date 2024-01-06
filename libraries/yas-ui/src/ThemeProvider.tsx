import type { Dispatch, ReactNode, RefObject, SetStateAction } from "react";
import { useCallback, useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { dark } from "@yas/style/themes/dark.css";
import { light } from "@yas/style/themes/light.css";
import { mediaQuery } from "./hooks/useMediaQuery";

export type ThemeName = keyof typeof themeClassNames;
const themeClassNames = { dark, light };
const themeNames = Object.keys(themeClassNames) as ThemeName[];

export interface ThemeProviderProps {
  children?: ReactNode;
  theme: ThemeName;
  setTheme: Dispatch<SetStateAction<ThemeName>>;
}

export function ThemeProvider({
  theme,
  setTheme,
  children,
}: ThemeProviderProps) {
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

export function ThemeInjector({ target }: { target: RefObject<HTMLElement> }) {
  const [themeName] = useTheme();
  const themeClassName = themeClassNames[themeName];
  useEffect(() => {
    const element = target.current;
    if (!element) {
      return;
    }
    element.classList.add(themeClassName);
    return () => element.classList.remove(themeClassName);
  }, [target, themeClassName]);
  return null;
}

export const getPreferredTheme = (): ThemeName =>
  mediaQuery("(prefers-color-scheme: dark)") ? "dark" : "light";

export const ThemeContext = createContext<[ThemeName, () => void]>([
  getPreferredTheme(),
  () => {},
]);

export function useTheme() {
  return useContext(ThemeContext);
}
