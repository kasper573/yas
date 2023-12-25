import { createThemeContract } from "@vanilla-extract/css";
import type { Properties as CSSProperties } from "csstype";

const color = {
  main: null,
  light: null,
  dark: null,
};

const colorWithFullContrast = {
  base: color,
  contrast: color,
};

const colorWithSimpleContrast = {
  ...color,
  contrast: null,
};

const transition = {
  beginAndEndOnScreen: null,
  enter: null,
  exit: null,
};

export type TypographyVariant = keyof typeof vars.typography;
export type TypographyStyle = {
  [K in keyof typeof typographyStyle]: Extract<CSSProperties[K], string>;
};

const typographyStyle = {
  fontFamily: null,
  fontSize: null,
  fontStyle: null,
  fontWeight: null,
  letterSpacing: null,
  lineHeight: null,
  opacity: null,
  color: null,
} satisfies Partial<Record<keyof CSSProperties, null>>;

export const vars = createThemeContract({
  color: {
    // Groups
    surface: colorWithSimpleContrast,
    primary: colorWithFullContrast,
    secondary: colorWithFullContrast,
    success: colorWithSimpleContrast,
    info: colorWithSimpleContrast,
    warning: colorWithSimpleContrast,
    error: colorWithSimpleContrast,
    // One-off
    divider: null,
    dimmer: null,
    highlight: null,
  },
  transitions: {
    emphasized: transition,
    standard: transition,
  },
  typography: {
    body: typographyStyle,
    body2: typographyStyle,
    caption: typographyStyle,
    hero: typographyStyle,
    h1: typographyStyle,
    h2: typographyStyle,
    h3: typographyStyle,
    h4: typographyStyle,
    h5: typographyStyle,
    h6: typographyStyle,
  },
});
