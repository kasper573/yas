import { globalStyle, style, theme } from "@yas/style";

const surfaceStyle = {
  background: theme.color.surface.base,
  color: theme.color.surface.face,
};

export const pageContainer = style(surfaceStyle);

// Autodocs preview area
globalStyle(".docs-story", surfaceStyle);
