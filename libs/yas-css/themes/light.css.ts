import { createTheme } from "@vanilla-extract/css";
import { palette } from "../src/tokens";
import { themeVars } from "../src/themeVars.css";

export const light: string = createTheme(themeVars, {
  color: {
    surfaceLight: palette.gray["100"],
    surfaceMain: palette.gray["200"],
    surfaceDark: palette.gray["300"],
    surfaceContrast: palette.gray["900"],
    primaryBaseLight: palette.blue["600"],
    primaryBaseMain: palette.blue["700"],
    primaryBaseDark: palette.blue["800"],
    primaryContrastLight: palette.blue["50"],
    primaryContrastMain: palette.blue["100"],
    primaryContrastDark: palette.blue["200"],
    secondaryBaseLight: palette.teal["600"],
    secondaryBaseMain: palette.teal["700"],
    secondaryBaseDark: palette.teal["800"],
    secondaryContrastLight: palette.teal["50"],
    secondaryContrastMain: palette.teal["100"],
    secondaryContrastDark: palette.teal["200"],
    successLight: palette.green["400"],
    successMain: palette.green["500"],
    successDark: palette.green["600"],
    successContrast: palette["white"]["87%"],
    infoLight: palette.gray["400"],
    infoMain: palette.gray["500"],
    infoDark: palette.gray["600"],
    infoContrast: palette["white"]["87%"],
    warningLight: palette.orange["400"],
    warningMain: palette.orange["500"],
    warningDark: palette.orange["600"],
    warningContrast: palette["white"]["87%"],
    errorLight: palette.red["400"],
    errorMain: palette.red["500"],
    errorDark: palette.red["600"],
    errorContrast: palette["white"]["87%"],
    divider: palette.black["87%"],
    dimmer: palette.black["50%"],
    highlight: palette.white["50%"],
  },
});
