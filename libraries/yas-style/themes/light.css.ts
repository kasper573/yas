import { createTheme } from "@vanilla-extract/css";
import { palette } from "../src/tokens";
import type { ThemeValues } from "../src/vars.css";
import { vars } from "../src/vars.css";
import { transitions, typography } from "./shared";

const values: ThemeValues = {
  color: {
    surface: {
      base: {
        light: palette.white["100%"],
        main: palette.gray["50"],
        dark: palette.gray["100"],
      },
      contrast: {
        light: palette.gray["950"],
        main: palette.gray["900"],
        dark: palette.gray["800"],
      },
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
      base: {
        light: palette.green["400"],
        main: palette.green["500"],
        dark: palette.green["600"],
      },
      contrast: {
        light: palette.green["50"],
        main: palette.green["100"],
        dark: palette.green["200"],
      },
    },
    info: {
      base: {
        light: palette.gray["100"],
        main: palette.gray["200"],
        dark: palette.gray["300"],
      },
      contrast: {
        light: palette.gray["600"],
        main: palette.gray["500"],
        dark: palette.gray["400"],
      },
    },
    warning: {
      base: {
        light: palette.orange["400"],
        main: palette.orange["500"],
        dark: palette.orange["600"],
      },
      contrast: {
        light: palette.orange["50"],
        main: palette.orange["100"],
        dark: palette.orange["200"],
      },
    },
    error: {
      base: {
        light: palette.red["400"],
        main: palette.red["500"],
        dark: palette.red["600"],
      },
      contrast: {
        light: palette.red["50"],
        main: palette.red["100"],
        dark: palette.red["200"],
      },
    },
    divider: palette.black["87%"],
    dimmer: palette.black["50%"],
    highlight: palette.white["50%"],
  },
  transitions,
  typography,
};

export const light: string = createTheme(vars, values);
