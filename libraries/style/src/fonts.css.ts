import { globalFontFace } from "@vanilla-extract/css";
import { tokens } from "@yas/design-system";

// Since the design system is the single source of truth for font family names,
// we must use globalFontFace since it's the only way to specify a font family name with VE
for (const { fonts, name } of Object.values(tokens.fontFamilies)) {
  for (const { fontStyle, fontWeight, src } of fonts) {
    globalFontFace(name, {
      src: `url(${src.woff2}) format('woff2')`,
      fontWeight,
      fontStyle,
    });
  }
}
