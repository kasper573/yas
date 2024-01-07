import { createTheme } from "@vanilla-extract/css";
import { vars } from "../src/vars.css";
import { palette } from "../src/tokens";
import { transitions, typography } from "./shared";

export const dark: string = createTheme(vars, {
  color: {
    surface: {
      base: {
        light: palette.gray["800"],
        main: palette.gray["900"],
        dark: palette.gray["950"],
      },
      contrast: {
        light: palette.gray["200"],
        main: palette.gray["100"],
        dark: palette.gray["50"],
      },
    },
    primary: {
      base: {
        light: palette.blue["400"],
        main: palette.blue["500"],
        dark: palette.blue["600"],
      },
      contrast: {
        light: palette.blue["900"],
        main: palette.blue["950"],
        dark: palette.blue["900"],
      },
    },
    secondary: {
      base: {
        light: palette.teal["400"],
        main: palette.teal["500"],
        dark: palette.teal["600"],
      },
      contrast: {
        light: palette.teal["900"],
        main: palette.teal["950"],
        dark: palette.teal["900"],
      },
    },
    success: {
      base: {
        light: palette.green["400"],
        main: palette.green["500"],
        dark: palette.green["600"],
      },
      contrast: {
        light: palette["gray"]["900"],
        main: palette["white"]["87%"],
        dark: palette["gray"]["800"],
      },
    },
    info: {
      base: {
        light: palette.gray["700"],
        main: palette.gray["800"],
        dark: palette.gray["900"],
      },
      contrast: {
        light: palette["gray"]["900"],
        main: palette["white"]["87%"],
        dark: palette["gray"]["800"],
      },
    },
    warning: {
      base: {
        light: palette.orange["400"],
        main: palette.orange["500"],
        dark: palette.orange["600"],
      },
      contrast: {
        light: palette["gray"]["900"],
        main: palette["white"]["87%"],
        dark: palette["gray"]["800"],
      },
    },
    error: {
      base: {
        light: palette.red["400"],
        main: palette.red["500"],
        dark: palette.red["600"],
      },
      contrast: {
        light: palette["gray"]["900"],
        main: palette["white"]["87%"],
        dark: palette["gray"]["800"],
      },
    },
    divider: palette.white["50%"],
    dimmer: palette.black["50%"],
    highlight: palette.white["50%"],
  },
  transitions,
  typography,
});
