import { style } from "@vanilla-extract/css";
import { unwrapUnsafeFor3rdPartyIntegration as unwrap } from "@yas/result";
import type { Condition, ConstrainedStyle, Style } from "./resolveStyle";
import { createStyleResolver } from "./resolveStyle";

export function createConstrained<Definition extends AnyConstrainedDefinition>(
  definition: Definition,
): ConstrainedStyleFn<Definition> {
  // We use unwrap because we need to integrate with
  // the VanillaExtract build system that relies on exceptions

  const resolve = unwrap(createStyleResolver(definition));
  return function createConstrainedStyle(constrainedStyle) {
    return style(unwrap(resolve(constrainedStyle)));
  };
}

export type ConstrainedStyleFn<Definition extends AnyConstrainedDefinition> = (
  props: ConstrainedStyle<Definition>,
) => string;

export type AnyConstrainedDefinition = ConstrainedDefinition<
  Record<string, Condition>,
  string,
  Record<string, PropertyDefinition>,
  Record<string, string>
>;

export type inferShorthands<T> = T extends ConstrainedDefinition<
  Record<string, Condition>,
  string,
  Record<string, PropertyDefinition>,
  infer Shorthands
>
  ? Shorthands
  : never;

export interface ConstrainedDefinition<
  Conditions extends Record<string, Condition>,
  DefaultConditionName extends keyof Conditions,
  Properties extends Record<string, PropertyDefinition>,
  Shorthands extends Record<string, keyof Properties>,
> {
  conditions?: Conditions;
  defaultCondition?: DefaultConditionName;
  properties: Properties;
  shorthands?: {
    [ShorthandName in keyof Shorthands]: readonly Shorthands[ShorthandName][];
  };
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
