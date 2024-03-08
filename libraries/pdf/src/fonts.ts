import { Font } from "@react-pdf/renderer";
import type { FontWeight } from "@react-pdf/types";
import { tokens } from "@yas/design-system";

export function registerReactPDFFonts() {
  for (const { name, fonts } of Object.values(tokens.fontFamilies)) {
    Font.register({
      family: name,
      fonts: fonts.map(({ src, fontStyle, fontWeight }) => ({
        src: src.ttf,
        fontStyle,
        fontWeight: fontWeight as FontWeight,
      })),
    });
  }
}
