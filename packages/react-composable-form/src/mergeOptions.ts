import type { ComposableFormOptions } from "./types";

export function mergeOptions(
  a: ComposableFormOptions,
  b: ComposableFormOptions,
): ComposableFormOptions {
  return {
    schema: b.schema ?? a.schema,
    layout: b.layout ?? a.layout,
    components(builder) {
      a.components?.(builder);
      b.components?.(builder);
      return builder;
    },
  };
}
