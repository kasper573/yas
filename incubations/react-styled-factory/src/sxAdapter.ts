import type { CSSProperties } from "react";

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

function defaultSXMerger<T>(a?: T, b?: T): T | undefined {
  if (a === b) {
    return a;
  }
  return a && b ? { ...a, ...b } : a ?? b;
}

const defaultSXAdapter = {
  compile: () => undefined,
  merge: defaultSXMerger,
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
