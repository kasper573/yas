import { mapValues } from "@yas/design-tokens";
import { fontFaces } from "@yas/design-tokens/assets";
import { globalFontFace } from "@vanilla-extract/css";

// This is a vanilla extract representation of the font tokens
mapValues(fontFaces, (fonts, family) => {
  for (const font of fonts) {
    const { src: formats, fontStyle, fontWeight } = font;
    globalFontFace(family, {
      src: Object.entries(formats).map(
        ([format, url]) => `url(${url}) format("${format}")`,
      ),
      fontWeight,
      fontStyle,
      fontDisplay: "swap",
    });
  }
});
