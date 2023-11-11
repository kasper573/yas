import type { StyleRule } from "@vanilla-extract/css";
import { style } from "@vanilla-extract/css";
import { unwrapUnsafeFor3rdPartyIntegration as unwrap } from "@yas/result";
import type { Condition, ConstrainedStyle, Style } from "./resolveStyle";
import { createStyleResolver, layerProperty } from "./resolveStyle";

export function createConstrained<Definition extends AnyConstrainedDefinition>(
  definition: Definition,
): ConstrainedStyleFn<Definition> {
  // We use unwrap because we need to integrate with
  // the VanillaExtract build system that relies on exceptions

  const resolve = unwrap(createStyleResolver(definition));
  return function createConstrainedStyle({ [layerProperty]: layer, ...rest }) {
    return style({
      [layerProperty]: layer ? unwrap(resolve(layer)) : undefined,
      ...unwrap(resolve(rest)),
    } as StyleRule);
  };
}

export type ConstrainedStyleFn<Definition extends AnyConstrainedDefinition> = (
  props: ConstrainedStyleWithLayer<Definition>,
) => string;

type ConstrainedStyleWithLayer<Definition extends AnyConstrainedDefinition> = {
  [K in typeof layerProperty]?: Record<string, ConstrainedStyle<Definition>>;
} & ConstrainedStyle<Definition>;

export type AnyConstrainedDefinition = ConstrainedDefinition<
  Record<string, Condition>,
  string,
  Record<string, PropertyDefinition>
>;

export interface ConstrainedDefinition<
  Conditions extends Record<string, Condition>,
  DefaultConditionName extends keyof Conditions,
  Properties extends Record<string, PropertyDefinition>,
> {
  conditions?: Conditions;
  defaultCondition?: DefaultConditionName;
  properties: Properties;
  shorthands?: Record<string, ReadonlyArray<keyof Style>>;
}

export type PropertyDefinition<PropertyName extends keyof Style = keyof Style> =
  DirectPropertyOptions<PropertyName> | AliasedPropertyOptions<PropertyName>;

export type DirectPropertyOptions<PropertyName extends keyof Style> =
  readonly Style[PropertyName][];

export type AliasedPropertyOptions<
  PropertyName extends keyof Style,
  AcceptablePropertyValues extends Record<string, Style[PropertyName]> = Record<
    string,
    Style[PropertyName]
  >,
> = AcceptablePropertyValues;
