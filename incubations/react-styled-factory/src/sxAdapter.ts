import type { CSSProperties } from "react";
import { merge } from "./merge";

export function normalizeSXAdapterOptions<SX>(
  options?: SXAdapterOptions<SX>,
): SXAdapter<SX> {
  if (typeof options === "function") {
    return {
      ...defaultSXAdapter,
      compile: options,
    };
  }
  return {
    ...defaultSXAdapter,
    ...options,
  };
}

const defaultSXAdapter = {
  compile: () => undefined,
  merge,
};

export type SXAdapterOptions<SX> = Partial<SXAdapter<SX>> | SXCompiler<SX>;

export interface SXAdapter<SX> {
  compile: SXCompiler<SX>;
  merge: SXMerger<SX>;
}

export type SXCompiler<SX> = (
  sx: SX,
) => CSSProperties | CSSClassName | undefined;

export type SXMerger<SX> = (a?: SX, b?: SX) => SX | undefined;

export type CSSClassName = string;
