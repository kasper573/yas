import { createTheme } from "@vanilla-extract/css";
import { palette, transitions } from "../src/tokens";
import { vars } from "../src/vars.css";

export const light: string = createTheme(vars, {
  color: {
    surface: {
      light: palette.gray["100"],
      main: palette.gray["200"],
      dark: palette.gray["300"],
      contrast: palette.gray["900"],
    },
    primary: {
      base: {
        light: palette.blue["600"],
        main: palette.blue["700"],
        dark: palette.blue["800"],
      },
      contrast: {
        light: palette.blue["50"],
        main: palette.blue["100"],
        dark: palette.blue["200"],
      },
    },
    secondary: {
      base: {
        light: palette.teal["600"],
        main: palette.teal["700"],
        dark: palette.teal["800"],
      },
      contrast: {
        light: palette.teal["50"],
        main: palette.teal["100"],
        dark: palette.teal["200"],
      },
    },
    success: {
      light: palette.green["400"],
      main: palette.green["500"],
      dark: palette.green["600"],
      contrast: palette["white"]["87%"],
    },
    info: {
      light: palette.gray["400"],
      main: palette.gray["500"],
      dark: palette.gray["600"],
      contrast: palette["white"]["87%"],
    },
    warning: {
      light: palette.orange["400"],
      main: palette.orange["500"],
      dark: palette.orange["600"],
      contrast: palette["white"]["87%"],
    },
    error: {
      light: palette.red["400"],
      main: palette.red["500"],
      dark: palette.red["600"],
      contrast: palette["white"]["87%"],
    },
    divider: palette.black["87%"],
    dimmer: palette.black["50%"],
    highlight: palette.white["50%"],
  },
  transitions,
});
