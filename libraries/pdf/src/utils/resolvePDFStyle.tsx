import type { Style as ReactPDFStyle } from "@react-pdf/types";
import type { PDFStyle, StyleReducer } from "../atoms";
import { styleReducers } from "../atoms";

export function resolvePDFStyle(style: PDFStyle): ReactPDFStyle {
  const propertyNames = Object.keys(style) as Array<keyof PDFStyle>;
  const resolved = {} as ReactPDFStyle;
  for (const propertyName of propertyNames) {
    let value = style[propertyName];
    const reducer = styleReducers[
      propertyName as keyof typeof styleReducers
    ] as StyleReducer<unknown> | undefined;

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

export type { ReactPDFStyle };
