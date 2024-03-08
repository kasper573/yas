import { fontFamilies, durations, easings, fontSizes } from "../src/tokens";
import type { TypographyStyle, themeTemplate } from "../src/variables";

const regular = (size: number): TypographyStyle => ({
  fontFamily: fontFamilies.default.name,
  fontSize: `${size}px`,
  fontWeight: "normal",
  fontStyle: "normal",
  lineHeight: `1.5em`,
  color: "inherit",
});

const header = (size: number): TypographyStyle => ({
  ...regular(size),
  fontWeight: "bold",
});

export const typography: Record<
  keyof typeof themeTemplate.typography,
  TypographyStyle
> = {
  body: regular(fontSizes["#2"]),
  body2: regular(fontSizes["#3"]),
  caption: {
    ...regular(fontSizes["#1"]),
    color: "color-mix(in srgb, currentColor 75%, transparent)",
  },
  hero: header(fontSizes["#9"]),
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
