import { fonts, durations, easings, fontSizes } from "../src/tokens";
import type { TypographyStyle, vars } from "../src/vars.css";

const regular = (size: number): TypographyStyle => ({
  fontFamily: fonts.default,
  fontSize: `${size}px`,
  fontWeight: "normal",
  fontStyle: "normal",
  letterSpacing: "normal",
  lineHeight: `1.5em`,
});

const header = (size: number): TypographyStyle => ({
  ...regular(size),
  fontWeight: "bold",
});

export const typography: Record<keyof typeof vars.typography, TypographyStyle> =
  {
    body: regular(fontSizes["#2"]),
    body2: regular(fontSizes["#3"]),
    caption: regular(fontSizes["#1"]),
    button: regular(fontSizes["#2"]),
    h1: header(fontSizes["#6"]),
    h2: header(fontSizes["#5"]),
    h3: header(fontSizes["#4"]),
    h4: header(fontSizes["#3"]),
    h5: header(fontSizes["#2"]),
    h6: header(fontSizes["#1"]),
  };

export const transitions = {
  emphasized: {
    beginAndEndOnScreen: `${durations.long2} ${easings.emphasized}`,
    enter: `${durations.medium4} ${easings.emphasizedDecelerate}`,
    exit: `${durations.short4} ${easings.emphasizedAccelerate}`,
  },
  standard: {
    beginAndEndOnScreen: `${durations.medium2} ${easings.standard}`,
    enter: `${durations.medium1} ${easings.standardDecelerate}`,
    exit: `${durations.short4} ${easings.standardAccelerate}`,
  },
};
