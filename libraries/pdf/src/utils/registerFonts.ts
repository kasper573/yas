import { Font } from "@react-pdf/renderer";
import { mapValues, tokens } from "@yas/design-tokens";

export function registerDesignTokenFontsWithReactPDF() {
  mapValues(tokens.fontFaces, (fonts, family) => {
    Font.register({
      family,
      fonts: fonts.map(({ src, ...rest }) => ({
        src: src.truetype, // react-pdf only supports ttf
        ...rest,
      })),
    });
  });
}
