import { createTheme } from "@vanilla-extract/css";
import { palette } from "../src/tokens";
import { themeVars } from "../src/themeVars.css";

export const light: string = createTheme(themeVars, {
  color: {
    surfaceMain: palette["gray-100"],
    surfaceText: palette.black,
    surfaceOutline: palette["gray-700"],
    primaryMain: palette["blue-500"],
    primaryAlt1: palette["blue-700"],
    primaryAlt2: palette["blue-900"],
    primaryText: palette.white,
    primaryOutline: palette["blue-700"],
    secondaryMain: palette["green-500"],
    secondaryAlt1: palette["green-700"],
    secondaryAlt2: palette["green-900"],
    secondaryText: palette.white,
    secondaryOutline: palette["green-700"],
    disabledMain: palette["gray-300"],
    disabledOutline: palette["gray-400"],
    disabledText: palette["gray-400"],
    success: palette["green-500"],
    info: palette["blue-500"],
    warning: palette["yellow-500"],
    error: palette["red-500"],
    divider: palette.black,
    dimmer: "rgba(0, 0, 0, 0.5)",
  },
});
