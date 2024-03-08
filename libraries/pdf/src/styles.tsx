import { flattened } from "flattened";
import type { Style as ReactPDFStyle } from "@react-pdf/types";
import { tokens } from "@yas/design-system";
import { values as theme } from "@yas/design-system/themes/light";

export function resolvePDFStyle(style: PDFStyle): ReactPDFStyle {
  const propertyNames = Object.keys(style) as Array<keyof PDFStyle>;
  const resolved = {} as ReactPDFStyle;
  for (const propertyName of propertyNames) {
    let value = style[propertyName];
    const reducer = customStyles[propertyName as keyof typeof customStyles] as
      | StyleReducer<unknown>
      | undefined;

    if (reducer) {
      value = reducer(value);
    }

    if (typeof value !== "object") {
      value = { [propertyName]: value };
    }

    Object.assign(resolved, value);
  }
  return resolved;
}

const fontFamilyNames = Object.fromEntries(
  Object.entries(tokens.fontFamilies).map(([key, value]) => [key, value.name]),
) as Record<keyof typeof tokens.fontFamilies, string>;

const color = aliases(flattened(theme.color));
const space = aliases(tokens.spaces);
const fontFamily = aliases(fontFamilyNames);
const radius = aliases(tokens.radii);
const typography = (value: keyof typeof theme.typography): ReactPDFStyle => {
  const { fontWeight, color, ...rest } = theme.typography[value];
  return {
    fontWeight: fontWeight as ReactPDFStyle["fontWeight"],
    color: color === "inherit" ? undefined : color,
    ...rest,
  };
};

const customStyles = {
  fontFamily,
  color,
  backgroundColor: color,
  borderColor: color,
  borderTopColor: color,
  borderLeftColor: color,
  borderRightColor: color,
  borderBottomColor: color,
  textDecorationColor: color,
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
  typography,
} satisfies AnyStyleReducers;

type StyleReducers = typeof customStyles;
type CustomStyles = {
  [K in keyof StyleReducers]?: Parameters<StyleReducers[K]>[0];
};

export type PDFStyle = CustomStyles & Omit<ReactPDFStyle, keyof CustomStyles>;

type AnyStyleReducers = Record<string, StyleReducer<never>>;

type StyleReducer<Input> = (value: Input) => CSSValue | Partial<ReactPDFStyle>;

type CSSValue = string | number | undefined;

function aliases<const Aliases extends Record<PropertyKey, unknown>>(
  aliases: Aliases,
) {
  return function resolveAlias<Key extends keyof Aliases>(
    aliasName: Key,
  ): Aliases[Key] {
    return aliases[aliasName];
  };
}
