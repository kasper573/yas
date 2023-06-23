import { createStitches } from "@stitches/react";

export const { styled, css, globalCss, theme } = createStitches({
  media: {
    bp1: "(min-width: 640px)",
    bp2: "(min-width: 768px)",
    bp3: "(min-width: 1024px)",
  },
  theme: {
    colors: {
      gray: "hsl(206,10%,76%)",
      blue: "hsl(206,100%,50%)",
      blueDark: "hsl(206,100%,30%)",
      blueDarker: "hsl(206,100%,20%)",
      white: "hsl(0,0%,100%)",
    },
    space: {
      1: "5px",
      2: "10px",
      3: "15px",
    },
    fontSizes: {
      1: "12px",
      2: "13px",
      3: "15px",
    },
    fonts: {
      mono: "Söhne Mono, menlo, monospace",
    },
    fontWeights: {},
    lineHeights: {},
    letterSpacings: {},
    sizes: {},
    borderWidths: {},
    borderStyles: {},
    radii: {
      1: "5px",
      2: "10px",
      3: "15px",
    },
    shadows: {},
    zIndices: {},
    transitions: {},
  },
});
