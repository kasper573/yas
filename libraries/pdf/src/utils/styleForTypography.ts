import { tokens } from "@yas/design-tokens";
import { pxToPt, percentage } from "../atoms";
import type { ReactPDFStyle } from "./resolvePDFStyle";

export const styleForTypography = (
  name: keyof tokens.Typography,
): ReactPDFStyle => {
  const text = tokens.typography[name];
  return {
    fontFamily: text.font_family,
    fontSize: pxToPt(text.font_size),
    lineHeight: percentage(text.font_size, text.line_height),
  };
};
