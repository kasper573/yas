import { createThemeContract } from "@vanilla-extract/css";

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
});
