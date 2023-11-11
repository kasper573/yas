import type { CSSProperties } from "react";

export type ConstrainedStyleFn<Definition extends AnyConstrainedDefinition> = (
  props: ConstrainedStyle<Definition>,
) => string;

export type ConstrainedInlineStyleFn<
  Definition extends AnyConstrainedDefinition,
> = (props: ConstrainedStyle<Definition>) => Style;

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

    | DirectPropertyOptions<PropertyName>
    | AliasedPropertyOptions<PropertyName>
    | true;

export type DirectPropertyOptions<PropertyName extends keyof Style> =
  readonly Style[PropertyName][];

export type AliasedPropertyOptions<
  PropertyName extends keyof Style,
  AcceptablePropertyValues extends Record<string, Style[PropertyName]> = Record<
    string,
    Style[PropertyName]
  >,
> = AcceptablePropertyValues;

export type StyleResolver<
  Definition extends AnyConstrainedDefinition = AnyConstrainedDefinition,
> = (constrainedStyle: ConstrainedStyle<Definition>) => Style;

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

export type ConstrainedStyle<
  Definition extends AnyConstrainedDefinition = AnyConstrainedDefinition,
> = {
  [PropertyName in keyof Style]?: ConstrainedPropertyInput<
    Definition,
    PropertyName
  >;
} & {
  [K in keyof inferShorthands<Definition>]?: ConstrainedPropertyInput<
    Definition,
    Extract<inferShorthands<Definition>[K], keyof Style>
  >;
};

type ConstrainedPropertyInput<
  Definition extends AnyConstrainedDefinition,
  PropertyName extends keyof Style,
> = WithConditions<
  inferPropertyValue<Definition["properties"], PropertyName>,
  Exclude<Definition["conditions"], undefined>
>;

type inferPropertyValue<
  Properties extends Record<string, PropertyDefinition>,
  PropertyName extends keyof Style,
> = Exclude<
  Properties[PropertyName] extends true
    ? any
    : Properties[PropertyName] extends readonly (infer DirectValue)[]
    ? DirectValue
    : Properties[PropertyName] extends Record<infer AliasName, unknown>
    ? AliasName
    : never,
  undefined
>;

type WithConditions<
  T,
  Conditions extends Record<string, unknown>,
> = keyof Conditions extends never ? T : T | { [K in keyof Conditions]?: T };
