import type { CSSProperties } from "react";
import { merge } from "./merge";

export function normalizeSXAdapterOptions<SX extends SXLike>(
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

export type SXAdapterOptions<SX extends SXLike> =
  | Partial<SXAdapter<SX>>
  | SXCompiler<SX>;

export interface SXAdapter<SX extends SXLike> {
  compile: SXCompiler<SX>;
  merge: SXMerger<SX>;
}

export type SXCompiler<SX extends SXLike> = (
  sx: SX,
) => CSSProperties | ClassName | undefined;

export type SXMerger<SX extends SXLike> = (a?: SX, b?: SX) => SX | undefined;

export type SXLike = Record<string, unknown>;

type ClassName = string;
