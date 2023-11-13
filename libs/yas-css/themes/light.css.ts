import { createTheme } from "@vanilla-extract/css";
import { palette } from "../src/tokens";
import { themeVars } from "../src/themeVars.css";

export const light: string = createTheme(themeVars, {
  color: {
    surfaceLight: palette.gray["100"],
    surfaceMain: palette.gray["200"],
    surfaceDark: palette.gray["300"],
    surfaceContrast: palette.gray["900"],
    primaryLight: palette.indigo["200"],
    primaryMain: palette.indigo["300"],
    primaryDark: palette.indigo["400"],
    primaryContrast: palette.indigo["700"],
    secondaryLight: palette.teal["200"],
    secondaryMain: palette.teal["300"],
    secondaryDark: palette.teal["400"],
    secondaryContrast: palette.teal["700"],
    successLight: palette.green["200"],
    successMain: palette.green["300"],
    successDark: palette.green["400"],
    successContrast: palette.green["700"],
    infoLight: palette.gray["200"],
    infoMain: palette.gray["300"],
    infoDark: palette.gray["400"],
    infoContrast: palette.gray["700"],
    warningLight: palette.yellow["200"],
    warningMain: palette.yellow["300"],
    warningDark: palette.yellow["400"],
    warningContrast: palette.yellow["700"],
    errorLight: palette.red["200"],
    errorMain: palette.red["300"],
    errorDark: palette.red["400"],
    errorContrast: palette.red["700"],
    divider: palette.black["87%"],
    dimmer: palette.black["50%"],
    highlight: palette.white["50%"],
  },
});
