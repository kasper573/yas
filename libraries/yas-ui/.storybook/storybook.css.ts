import type { Atoms } from "@yas/css";
import { globalStyle, style } from "@yas/css";

const surfaceStyle: Atoms = {
  background: "surfaceMain",
  color: "surfaceContrast",
};

export const pageContainer = style(surfaceStyle);

// Autodocs preview area
globalStyle(".docs-story", surfaceStyle);
