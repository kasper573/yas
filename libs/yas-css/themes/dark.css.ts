import { createTheme } from "@vanilla-extract/css";
import { palette } from "../src/tokens";
import { themeVars } from "../src/themeVars.css";

export const dark: string = createTheme(themeVars, {
  color: {
    surfaceLight: palette.gray["700"],
    surfaceMain: palette.gray["800"],
    surfaceDark: palette.gray["900"],
    surfaceContrast: palette.gray["100"],
    primaryLight: palette.indigo["500"],
    primaryMain: palette.indigo["600"],
    primaryDark: palette.indigo["700"],
    primaryContrast: palette.indigo["100"],
    secondaryLight: palette.teal["500"],
    secondaryMain: palette.teal["600"],
    secondaryDark: palette.teal["700"],
    secondaryContrast: palette.teal["100"],
    successLight: palette.green["500"],
    successMain: palette.green["600"],
    successDark: palette.green["700"],
    successContrast: palette.green["100"],
    infoLight: palette.gray["500"],
    infoMain: palette.gray["600"],
    infoDark: palette.gray["700"],
    infoContrast: palette.gray["100"],
    warningLight: palette.yellow["500"],
    warningMain: palette.yellow["600"],
    warningDark: palette.yellow["700"],
    warningContrast: palette.yellow["100"],
    errorLight: palette.red["500"],
    errorMain: palette.red["600"],
    errorDark: palette.red["700"],
    errorContrast: palette.red["100"],
    divider: palette.black["87%"],
    dimmer: palette.black["50%"],
    highlight: palette.white["50%"],
  },
});
