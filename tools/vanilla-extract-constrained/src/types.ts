import type { CSSProperties } from "react";

// Definition types

export type ConstrainedStyleFn<
  Conditions extends ConditionRecord,
  Properties extends PropertyDefinitionRecord,
  Shorthands extends PropertyShorthandRecord<Properties>,
> = (props: ConstrainedStyle<Conditions, Properties, Shorthands>) => string;

export interface ConstrainedDefinition<
  Conditions extends ConditionRecord,
  Properties extends PropertyDefinitionRecord,
  Shorthands extends PropertyShorthandRecord<Properties>,
> {
  conditions?: Conditions;
  defaultCondition?: keyof Conditions;
  properties: Properties;
  shorthands?: Shorthands;
}

export type PropertyShorthandRecord<
  Properties extends PropertyDefinitionRecord,
> = Record<string, Array<keyof Properties>>;

export type PropertyDefinitionRecord = Record<
  string,
  PropertyDefinition<unknown>
>;

export type PropertyDefinition<Value> =
  | readonly Value[] // Direct set of values
  | Record<string, Value>; // Aliased values

export type ConditionRecord = Record<string, Condition>;

export type ConditionKey = (typeof conditionKeys)[number];

// Must only contain the keys supported by style() from @vanilla-extract/css
export const conditionKeys = [
  "@media",
  "@supports",
  "@container",
  "@layer",
  "selectors",
] as const;

export type Style = CSSProperties;

type Condition = Partial<Record<ConditionKey, string>>;

// Constrained style types

export type StyleResolver<
  Conditions extends ConditionRecord,
  Properties extends PropertyDefinitionRecord,
  Shorthands extends PropertyShorthandRecord<Properties>,
> = (
  constrainedStyle: ConstrainedStyle<Conditions, Properties, Shorthands>,
) => Style;

type ConstrainedStyle<
  Conditions extends ConditionRecord,
  Properties extends PropertyDefinitionRecord,
  Shorthands extends PropertyShorthandRecord<Properties>,
> = {
  [PropertyName in keyof Properties]?: ConstrainedPropertyInput<
    Conditions,
    Properties,
    PropertyName
  >;
} & {
  [ShorthandName in keyof Shorthands]?: ConstrainedPropertyInput<
    Conditions,
    Properties,
    Shorthands[ShorthandName][number]
  >;
};

type ConstrainedPropertyInput<
  Conditions extends ConditionRecord,
  Properties extends PropertyDefinitionRecord,
  PropertyName extends keyof Properties,
> = WithConditions<
  ConstrainedPropertyValue<Properties[PropertyName]>,
  Exclude<Conditions, undefined>
>;

type WithConditions<
  T,
  Conditions extends Record<string, unknown>,
> = keyof Conditions extends never ? T : T | { [K in keyof Conditions]?: T };

type ConstrainedPropertyValue<Definition extends PropertyDefinition<unknown>> =
  Definition extends readonly (infer DirectValue)[]
    ? DirectValue
    : Definition extends Record<infer AliasName, unknown>
    ? AliasName
    : never;
