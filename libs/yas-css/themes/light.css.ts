import { createTheme } from "@vanilla-extract/css";
import { palette } from "../src/tokens";
import { themeVars } from "../src/themeVars.css";

export default createTheme(themeVars, {
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
    background: palette["gray-100"],
    paper: palette["gray-300"],
    text: palette.black,
    textContrast: palette.white,
    border: palette.black,
  },
});
