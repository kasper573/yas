import { unsafe, themeVars } from "@yas/css";

const surfaceStyle = {
  background: themeVars.color.surfaceMain as string,
  color: themeVars.color.surfaceText as string,
};

export const pageContainer = unsafe.style(surfaceStyle);

// Autodocs preview area
unsafe.globalStyle(".docs-story", surfaceStyle);
