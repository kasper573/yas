import { createTheme } from "@vanilla-extract/css";
import { palette } from "../src/tokens";
import { themeVars } from "../src/themeVars.css";

export const light: string = createTheme(themeVars, {
  color: {
    surfaceMain: palette["gray-100"],
    surfaceText: palette.black,
    primaryMain: palette["blue-500"],
    primaryAlt1: palette["blue-700"],
    primaryAlt2: palette["blue-900"],
    primaryText: palette.white,
    secondaryMain: palette["gray-500"],
    secondaryAlt1: palette["gray-700"],
    secondaryAlt2: palette["gray-900"],
    secondaryText: palette.white,
    success: palette["green-500"],
    info: palette["blue-500"],
    warning: palette["yellow-500"],
    error: palette["red-500"],
    border: palette.black,
  },
});
