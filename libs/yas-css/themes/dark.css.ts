import { createTheme } from "@vanilla-extract/css";
import { palette } from "../src/tokens";
import { themeVars } from "../src/themeVars.css";

export const dark: string = createTheme(themeVars, {
  color: {
    surfaceMain: palette["gray-900"],
    surfaceText: palette.white,
    surfaceOutline: palette["gray-300"],
    primaryMain: palette["blue-500"],
    primaryAlt1: palette["blue-700"],
    primaryAlt2: palette["blue-900"],
    primaryText: palette.white,
    primaryOutline: palette["blue-300"],
    secondaryMain: palette["green-500"],
    secondaryAlt1: palette["green-700"],
    secondaryAlt2: palette["green-900"],
    secondaryOutline: palette["green-300"],
    secondaryText: palette.white,
    disabledMain: palette["gray-700"],
    disabledOutline: palette["gray-500"],
    disabledText: palette["gray-500"],
    success: palette["green-500"],
    info: palette["blue-500"],
    warning: palette["yellow-500"],
    error: palette["red-500"],
    divider: palette.black,
    dimmer: "rgba(0, 0, 0, 0.5)",
  },
});
