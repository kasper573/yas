import type { ConstrainedStyle } from "@yas/style";
import { globalStyle, style } from "@yas/style";

const surfaceStyle: ConstrainedStyle = {
  background: "surface.base.main",
  color: "surface.contrast.main",
};

export const pageContainer = style(surfaceStyle);

// Autodocs preview area
globalStyle(".docs-story", surfaceStyle);
