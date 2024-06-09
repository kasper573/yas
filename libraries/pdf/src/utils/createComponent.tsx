import { useMemo, type ComponentType } from "react";
import type { SVGPresentationAttributes } from "@react-pdf/types";
import type { PDFStyle } from "../atoms";
import { resolvePDFStyle, type ReactPDFStyle } from "./resolvePDFStyle";

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
