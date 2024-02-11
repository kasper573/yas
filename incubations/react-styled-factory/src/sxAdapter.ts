import { merge } from "./merge";
import type { SXAdapter, SXAdapterOptions, SXLike } from "./types";

export function createSXAdapter<SX extends SXLike>(
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
