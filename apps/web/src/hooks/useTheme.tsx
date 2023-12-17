import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useCallback, useContext } from "react";

export type ThemeName = "dark" | "light";

export function useTheme() {
  return useContext(ThemeContext);
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
