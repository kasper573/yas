import { flattened } from "flattened";
import { mapValues, tokens } from "@yas/design-tokens";
import * as theme from "@yas/design-tokens/themes/light"; // PDFs will always use the light theme only
import type { ReactPDFStyle } from "./utils/resolvePDFStyle";
import { styleForTypography } from "./utils/styleForTypography";

const numericDefaults = {
  none: 0,
};

// The atoms that our PDF package uses
const fontFamily = aliases(tokens.text.family);
const color = aliases(flattened(theme.color));
const space = aliases({ ...tokens.space, ...numericDefaults }, pxToPt);
const radius = aliases({ ...tokens.radius, ...numericDefaults }, pxToPt);
const border = aliases(
  { ...mapValues(tokens.borders, (b) => b.width), ...numericDefaults },
  pxToPt,
);

// Since our tokens are based off pixels we need to adjust them to PDF compatible units

export function pxToPt(px?: number) {
  return px !== undefined ? px * 0.75 : undefined;
}

export function percentage(a: number, b = a) {
  return `${(b * 100) / a}%`;
}

/**
 * These properties will be available as the "sx" prop on all PDF components.
 */
export const styleReducers = {
  fontFamily,
  color,
  backgroundColor: color,
  borderColor: color,
  borderTopColor: color,
  borderLeftColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  textDecorationColor: color,
  borderWidth: border,
  borderTopWidth: border,
  borderLeftWidth: border,
  borderRightWidth: border,
  borderBottomWidth: border,
  borderTop: border,
  borderRight: border,
  borderBottom: border,
  borderLeft: border,
  borderRadius: radius,
  borderTopLeftRadius: radius,
  borderTopRightRadius: radius,
  borderBottomLeftRadius: radius,
  borderBottomRightRadius: radius,
  gap: space,
  rowGap: space,
  columnGap: space,
  margin: space,
  marginTop: space,
  marginBottom: space,
  marginLeft: space,
  marginHorizontal: space,
  marginRight: space,
  marginVertical: space,
  padding: space,
  paddingTop: space,
  paddingBottom: space,
  paddingLeft: space,
  paddingHorizontal: space,
  paddingRight: space,
  paddingVertical: space,
  typography: styleForTypography,
} satisfies AnyStyleReducers;

type StyleReducers = typeof styleReducers;
type CustomStyles = {
  [K in keyof StyleReducers]?: Parameters<StyleReducers[K]>[0];
};

export type PDFStyle = CustomStyles & Omit<ReactPDFStyle, keyof CustomStyles>;

type AnyStyleReducers = { [key: string]: StyleReducer<never> };

export type StyleReducer<Input> = (
  value: Input,
) => CSSValue | Partial<ReactPDFStyle>;

type CSSValue = string | number | undefined;

function aliases<const Aliases extends Record<PropertyKey, V>, V>(
  aliases: Aliases,
  transform = (value: V): V => value,
) {
  return function resolveAlias<Key extends keyof Aliases>(
    aliasName: Key,
  ): Aliases[Key] {
    return transform(aliases[aliasName]) as Aliases[Key];
  };
}
