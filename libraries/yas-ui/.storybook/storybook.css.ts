import type { Atoms } from "@yas/style";
import { globalStyle, style } from "@yas/style";

const surfaceStyle: Atoms = {
  background: "surfaceMain",
  color: "surfaceContrast",
};

export const pageContainer = style(surfaceStyle);

// Autodocs preview area
globalStyle(".docs-story", surfaceStyle);
