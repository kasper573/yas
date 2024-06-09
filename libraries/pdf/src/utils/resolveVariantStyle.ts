import type { PDFStyle } from "../atoms";
import { resolvePDFStyle, type ReactPDFStyle } from "./resolvePDFStyle";

export function defineVariants<const T extends AnyVariantsDefinition>(
  variants: T,
): T {
  return variants;
}

export function resolveVariantStyle<Definition extends AnyVariantsDefinition>(
  variants: Definition,
  selections: VariantSelections<Definition>,
  defaultSelections?: VariantSelections<Definition>,
): ReactPDFStyle {
  type VariantName = keyof Definition;
  type VariantSelection = keyof Definition[VariantName];

  const style: PDFStyle = {};
  for (const key in variants) {
    const variantName = key as VariantName;
    const selection: VariantSelection | undefined =
      (selections[variantName] as VariantSelection) ??
      (defaultSelections?.[variantName] as VariantSelection);

    if (selection !== undefined) {
      const styleToAdd = variants[variantName][selection];
      if (styleToAdd) {
        Object.assign(style, styleToAdd);
      }
    }
  }
  return resolvePDFStyle(style);
}

export type AnyVariantsDefinition = Record<string, Record<string, PDFStyle>>;

export type VariantSelections<T extends AnyVariantsDefinition> = Partial<{
  [K in keyof T]: InterpretBooleanStrings<keyof T[K]>;
}>;

type InterpretBooleanStrings<T> = T extends "true" | "false" ? boolean : T;
