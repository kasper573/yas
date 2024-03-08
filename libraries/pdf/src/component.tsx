import { useMemo, type ComponentType, type ReactNode } from "react";
import type { BaseProps } from "@react-pdf/types";
import { resolvePDFStyle, type PDFStyle } from "./styles";

export function styled<Props>(
  Component: ComponentType<Props>,
  {
    style: defaultStyle,
    ...defaultProps
  }: Partial<PDFComponentProps<Props>> = {},
): ComponentType<PDFComponentProps<Props>> {
  return function Constrained({ style: inlineStyle, ...props }) {
    const resolvedStyle = useMemo(
      () => resolvePDFStyle({ ...defaultStyle, ...inlineStyle }),
      [inlineStyle],
    );
    return (
      <Component
        {...defaultProps}
        {...(props as Props)}
        style={resolvedStyle}
      />
    );
  };
}

type PDFComponentProps<OriginalProps> = Omit<
  Omit<OriginalProps, keyof BaseProps> & BaseProps,
  "style" | "children"
> & {
  style?: PDFStyle;
  children?: ReactNode;
};
