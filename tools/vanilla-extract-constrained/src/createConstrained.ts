import type { StyleRule } from "@vanilla-extract/css";
import { style } from "@vanilla-extract/css";
import { unwrapUnsafeFor3rdPartyIntegration as unwrap } from "@yas/result";
import type { AnyPropertySetDefinition } from "./defineProperties";
import type { ConstrainedStyle } from "./resolveStyle";
import { createStyleResolver, layerProperty } from "./resolveStyle";

export function createConstrained<
  Definitions extends AnyPropertySetDefinition[],
>(...definitions: Definitions): ConstrainedStyleFn<Definitions> {
  // We use unwrap because we need to integrate with
  // the VanillaExtract build system that relies on exceptions

  const resolve = unwrap(createStyleResolver(definitions));
  return function createConstrainedStyle({ [layerProperty]: layer, ...rest }) {
    return style({
      [layerProperty]: layer ? unwrap(resolve(layer)) : undefined,
      ...unwrap(resolve(rest)),
    } as StyleRule);
  };
}

export type ConstrainedStyleFn<Definitions extends AnyPropertySetDefinition[]> =
  (props: ConstrainedStyleWithLayer<Definitions>) => string;

type ConstrainedStyleWithLayer<Definitions extends AnyPropertySetDefinition[]> =
  {
    [K in typeof layerProperty]?: Record<string, ConstrainedStyle<Definitions>>;
  } & ConstrainedStyle<Definitions>;
