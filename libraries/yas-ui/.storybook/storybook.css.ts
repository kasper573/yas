import type { ConstrainedStyle } from "@yas/style";
import { globalStyle, style } from "@yas/style";

const surfaceStyle: ConstrainedStyle = {
  background: "surfaceMain",
  color: "surfaceContrast",
};

export const pageContainer = style(surfaceStyle);

// Autodocs preview area
globalStyle(".docs-story", surfaceStyle);
