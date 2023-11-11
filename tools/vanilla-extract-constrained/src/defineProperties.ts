import type { Condition, Style } from "./resolveStyle";

export function defineProperties<Definition extends AnyPropertySetDefinition>(
  definition: Definition,
) {
  return definition;
}

export type AnyPropertySetDefinition = PropertySetDefinition<
  Record<string, Condition>,
  string,
  Record<string, PropertyDefinition>
>;

interface PropertySetDefinition<
  Conditions extends Record<string, Condition>,
  DefaultConditionName extends keyof Conditions,
  Properties extends Record<string, PropertyDefinition>,
> {
  conditions?: Conditions;
  defaultCondition?: DefaultConditionName;
  properties: Properties;
  shorthands?: Record<string, readonly string[]>;
}

export type PropertyDefinition<PropertyName extends keyof Style = keyof Style> =
  DirectPropertyOptions<PropertyName> | AliasedPropertyOptions<PropertyName>;

type DirectPropertyOptions<PropertyName extends keyof Style> =
  readonly Style[PropertyName][];

type AliasedPropertyOptions<
  PropertyName extends keyof Style,
  AcceptablePropertyValues extends Record<string, Style[PropertyName]> = Record<
    string,
    Style[PropertyName]
  >,
> = AcceptablePropertyValues;
