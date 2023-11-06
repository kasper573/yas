import type { StyleRule } from "@vanilla-extract/css";
import { style } from "@vanilla-extract/css";
import type { AnyPropertySetDefinition } from "./defineProperties";
import type { ConstrainedStyle } from "./resolveStyle";
import { createStyleResolver, layerProperty } from "./resolveStyle";

export function createConstrained<
  Definitions extends AnyPropertySetDefinition[],
>(...definitions: Definitions): ConstrainedStyleFn<Definitions> {
  // We use unsafeUnwrap because we need to integrate with
  // the VanillaExtract build system that relies on exceptions

  const resolve = createStyleResolver(definitions)._unsafeUnwrap();
  return function createConstrainedStyle({ [layerProperty]: layer, ...rest }) {
    return style({
      [layerProperty]: layer ? resolve(layer)._unsafeUnwrap() : undefined,
      ...resolve(rest)._unsafeUnwrap(),
    } as StyleRule);
  };
}

export type ConstrainedStyleFn<Definitions extends AnyPropertySetDefinition[]> =
  (props: ConstrainedStyleWithLayer<Definitions>) => string;

type LayerAssociation<Definitions extends AnyPropertySetDefinition[]> = Partial<
  Record<typeof layerProperty, Record<string, ConstrainedStyle<Definitions>>>
>;

type ConstrainedStyleWithLayer<Definitions extends AnyPropertySetDefinition[]> =
  LayerAssociation<Definitions> & ConstrainedStyle<Definitions>;
