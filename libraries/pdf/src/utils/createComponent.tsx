import { useMemo, type ComponentType } from "react";
import type { SVGPresentationAttributes } from "@react-pdf/types";
import type { PDFStyle } from "../atoms";
import { resolvePDFStyle, type ReactPDFStyle } from "./resolvePDFStyle";
import { registerDesignTokenFontsWithReactPDF } from "./registerFonts";

export function styled<Props>(
  Component: ComponentType<
    Props & { style?: ReactPDFStyle | SVGPresentationAttributes }
  >,
  {
    style: defaultStyle,
    sx: defaultSX,
    ...defaultProps
  }: Partial<PDFComponentProps<Props>> = {},
): ComponentType<PDFComponentProps<Props>> {
  return function StyledPDFComponent({
    style: inlineStyle,
    sx: inlineSX,
    ...props
  }) {
    const resolvedSX = useMemo(
      () => resolvePDFStyle({ ...defaultSX, ...inlineSX }),
      [inlineSX],
    );
    return (
      <Component
        {...defaultProps}
        {...(props as Props)}
        style={{ ...defaultStyle, ...resolvedSX, ...inlineStyle }}
      />
    );
  };
}

type PDFComponentProps<OriginalProps> = OriginalProps & {
  sx?: PDFStyle;
  style?: ReactPDFStyle;
};

// Calling this here is a bit ugly since it's a top level side effect,
// but it's the lesser evil than every consumer of @yas/pdf having to call it.
// Everything in @yas/pdf uses styled() so it's guaranteed to be called.
registerDesignTokenFontsWithReactPDF();
