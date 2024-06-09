import { tokens } from "@yas/design-tokens";
import type { Properties } from "csstype";

export function cssForTypography(name: keyof tokens.Typography) {
  const v = tokens.typography[name];
  return compact({
    margin: 0,
    fontFamily: v.font_family,
    fontSize: px(v.font_size),
    lineHeight: px(v.line_height),
  } satisfies Properties);
}

export function cssForParagraphSpacing(name: keyof tokens.Typography) {
  const v = tokens.typography[name];
  return compact({
    marginBlockStart: px(v.paragraph_spacing),
    marginBlockEnd: px(v.paragraph_spacing),
  } satisfies Properties);
}

function px(value?: number | null) {
  return value !== undefined && value !== null ? `${value}px` : undefined;
}

function compact<T extends object>(input: T): T {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined),
  ) as T;
}
