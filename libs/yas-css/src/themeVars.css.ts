import { createThemeContract } from "@vanilla-extract/css";

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
    text: null,
    textContrast: null,
    background: null,
    paper: null,
    border: null,
  },
});
