import { Font } from "@react-pdf/renderer";
import { mapValues } from "@yas/design-tokens";
import { fontFaces } from "@yas/design-tokens/assets";

export function registerDesignTokenFontsWithReactPDF() {
  mapValues(fontFaces, (fonts, family) => {
    Font.register({
      family,
      fonts: fonts.map(({ src, ...rest }) => ({
        src: src.truetype, // react-pdf only supports ttf
        ...rest,
      })),
    });
  });
}
