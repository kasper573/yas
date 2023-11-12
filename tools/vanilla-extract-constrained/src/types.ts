import type { CSSProperties } from "react";

// Definition types

export type ConstrainedStyleFn<Definition extends AnyConstrainedDefinition> = (
  props: ConstrainedStyle<Definition>,
) => string;

export type AnyConstrainedDefinition = ConstrainedDefinition<
  Record<string, Condition>,
  string,
  Record<string, PropertyDefinition>,
  Record<string, string[]>
>;

export interface ConstrainedDefinition<
  Conditions extends Record<string, Condition>,
  DefaultConditionName extends keyof Conditions,
  Properties extends PropertyDefinitionRecord,
  Shorthands extends Record<string, Array<keyof Properties>>,
> {
  conditions?: Conditions;
  defaultCondition?: DefaultConditionName;
  properties: Properties;
  shorthands?: Shorthands;
}

export type PropertyDefinitionRecord = {
  [PropertyName in keyof Style]?: PropertyDefinition<PropertyName>;
};

export type PropertyDefinition<PropertyName extends keyof Style = keyof Style> =

    | typeof anyCssValue
    | DirectPropertyOptions<PropertyName>
    | AliasedPropertyOptions<PropertyName>;

export type DirectPropertyOptions<PropertyName extends keyof Style> =
  readonly Style[PropertyName][];

export type AliasedPropertyOptions<
  PropertyName extends keyof Style,
  AcceptablePropertyValues extends Record<string, Style[PropertyName]> = Record<
    string,
    Style[PropertyName]
  >,
> = AcceptablePropertyValues;

export const anyCssValue = true as const;

export type ConditionKey = keyof typeof conditionKeyMap;
export const conditionKeyMap = {
  // constrained name -> vanilla-extract style() call name
  "@media": "@media",
  "@supports": "@supports",
  "@container": "@container",
  selector: "selectors",
};

export type Style = CSSProperties;

export type Condition = Partial<Record<ConditionKey, string>>;

// Constrained style types

export type StyleResolver<Definition extends AnyConstrainedDefinition> = (
  constrainedStyle: ConstrainedStyle<Definition>,
) => Style;

export type ConstrainedStyle<Definition extends AnyConstrainedDefinition> = {
  [PropertyName in keyof Definition["properties"]]?: ConstrainedPropertyInput<
    Definition,
    PropertyName
  >;
} & {
  [ShorthandName in keyof Definition["shorthands"]]?: ConstrainedPropertyInput<
    Definition,
    Extract<
      ValueOf<Definition["shorthands"][ShorthandName]>,
      keyof Definition["properties"]
    >
  >;
};

type ConstrainedPropertyInput<
  Definition extends AnyConstrainedDefinition,
  PropertyName extends keyof Definition["properties"],
> = WithConditions<
  inferPropertyValue<
    Definition["properties"][PropertyName],
    Access<Style, PropertyName>
  >,
  Exclude<Definition["conditions"], undefined>
>;

type inferPropertyValue<
  Definition extends PropertyDefinition,
  FallbackValue,
> = Exclude<
  Definition extends typeof anyCssValue
    ? FallbackValue
    : Definition extends readonly (infer DirectValue)[]
    ? DirectValue
    : Definition extends Record<infer AliasName, unknown>
    ? AliasName
    : never,
  undefined
>;

// Utility types

type WithConditions<
  T,
  Conditions extends Record<string, unknown>,
> = keyof Conditions extends never ? T : T | { [K in keyof Conditions]?: T };

type ValueOf<T> = T[keyof T];

type Access<T, K> = K extends keyof T ? T[K] : never;
