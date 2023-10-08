import { createTheme, createThemeContract } from "@vanilla-extract/css";
import { palette } from "./tokens";

export const themeVars = createThemeContract({
  color: {
    primary: null,
    primaryDark: null,
    primaryDarkest: null,
    secondary: null,
    secondaryDark: null,
    secondaryDarkest: null,
    success: null,
    info: null,
    warning: null,
    error: null,
    textOnDark: null,
    textOnBright: null,
    border: null,
  },
});

const dark = createTheme(themeVars, {
  color: {
    primary: palette["blue-500"],
    primaryDark: palette["blue-700"],
    primaryDarkest: palette["blue-900"],
    secondary: palette["gray-500"],
    secondaryDark: palette["gray-700"],
    secondaryDarkest: palette["gray-900"],
    success: palette["green-500"],
    info: palette["blue-500"],
    warning: palette["yellow-500"],
    error: palette["red-500"],
    textOnDark: palette.white,
    textOnBright: palette.black,
    border: palette.black,
  },
});

const light = createTheme(themeVars, {
  color: {
    primary: palette["green-500"],
    primaryDark: palette["blue-700"],
    primaryDarkest: palette["blue-900"],
    secondary: palette["gray-500"],
    secondaryDark: palette["gray-700"],
    secondaryDarkest: palette["gray-900"],
    success: palette["green-500"],
    info: palette["blue-500"],
    warning: palette["yellow-500"],
    error: palette["red-500"],
    textOnDark: palette.white,
    textOnBright: palette.black,
    border: palette.black,
  },
});

export type ThemeName = keyof typeof themeClassNames;
export const themeClassNames = {
  dark,
  light,
};
