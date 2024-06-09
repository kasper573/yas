import { tokens } from "@yas/design-tokens";
import { pxToPt, percentage } from "../atoms";
import type { ReactPDFStyle } from "./resolvePDFStyle";

export const styleForTypography = (
  name: keyof tokens.Typography,
): ReactPDFStyle => {
  const text = tokens.typography[name];
  const lineHeight: number =
    text.line_height.unit === "AUTO"
      ? text.font_size * 1.5
      : Number(text.line_height);

  return {
    fontFamily: text.font_family,
    fontSize: pxToPt(text.font_size),
    lineHeight: percentage(text.font_size, lineHeight),
  };
};
