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

export type ConditionKey = keyof typeof conditionKeyMap;

export const conditionKeyMap = {
  // constrained name -> vanilla-extract style() call name
  "@media": "@media",
  "@supports": "@supports",
  "@container": "@container",
  selector: "selectors",
};

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
    Extract<ValueOf<Shorthands[ShorthandName]>, keyof Properties>
  >;
};

type ConstrainedPropertyInput<
  Conditions extends ConditionRecord,
  Properties extends PropertyDefinitionRecord,
  PropertyName extends keyof Properties,
> = WithConditions<
  inferPropertyValue<Properties[PropertyName]>,
  Exclude<Conditions, undefined>
>;

type inferPropertyValue<Definition> = Exclude<
  Definition extends readonly (infer DirectValue)[]
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
