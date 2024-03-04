import type { Properties as CSSProperties } from "csstype";

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

export type PropertyDefinition<
  Value,
  Args extends readonly never[] = never[],
> =
  | readonly Value[] // Direct set of values
  | Record<string, Value> // Aliased values
  | ((...args: Args) => Value); // Functional values

export type ConditionRecord = Record<string, Condition>;

export type ConditionKey = (typeof conditionKeys)[number];

export type RootConditionKey = (typeof rootConditionKeys)[number];

export const rootConditionKeys = [
  "@layer",
  "selectors",
] satisfies ConditionKey[];

// Must only contain the keys supported by style() from @vanilla-extract/css
export const conditionKeys = [
  "@media",
  "@supports",
  "@container",
  "@layer",
  "selectors",
] as const;

export type Style = CSSProperties<string | number> & {
  [K in ConditionKey]?: Record<
    string,
    Record<string, string | number | undefined>
  >;
};

type Condition = Partial<Record<ConditionKey, string>>;

// Constrained style types

export type StyleResolver<
  Conditions extends ConditionRecord,
  Properties extends PropertyDefinitionRecord,
  Shorthands extends PropertyShorthandRecord<Properties>,
> = (
  constrainedStyle: ConstrainedStyle<Conditions, Properties, Shorthands>,
) => Style;

export type ConstrainedStyle<
  Conditions extends ConditionRecord,
  Properties extends PropertyDefinitionRecord,
  Shorthands extends PropertyShorthandRecord<Properties>,
> = ConstrainedStyleImpl<Conditions, Properties, Shorthands> & {
  [K in RootConditionKey]?: Record<
    string,
    ConstrainedStyleImpl<{}, Properties, Shorthands>
  >;
};

export type CSSVariable =
  | `var(--${string})`
  | `var(--${string}, ${string | number})`;

export type CSSVariableValue = string;

export type CSSVariables = Record<CSSVariable, CSSVariableValue>;

type ConstrainedStyleImpl<
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
} & {
  vars?: CSSVariables;
};

type ConstrainedPropertyInput<
  Conditions extends ConditionRecord,
  Properties extends PropertyDefinitionRecord,
  PropertyName extends keyof Properties,
> = WithConditions<
  CSSVariable | ConstrainedPropertyValue<Properties[PropertyName]>,
  Exclude<Conditions, undefined>
>;

type WithConditions<
  T,
  Conditions extends Record<string, unknown>,
> = keyof Conditions extends never ? T : T | { [K in keyof Conditions]?: T };

type ConstrainedPropertyValue<Definition extends PropertyDefinition<unknown>> =
  Definition extends (...args: infer Args) => infer R
    ? AllowPlainValueIfSingleArg<Args>
    : Definition extends readonly (infer DirectValue)[]
      ? DirectValue
      : Definition extends Record<infer AliasName, unknown>
        ? AliasName
        : never;

type AllowPlainValueIfSingleArg<Args extends unknown[]> =
  IsOnlyFirstArgRequired<Args> extends true ? Args[0] | Args : Args;

type IsOnlyFirstArgRequired<Args extends unknown[]> = Args extends [
  infer First,
  ...infer Rest,
]
  ? First extends undefined
    ? false
    : CompactTuple<Rest>["length"] extends 0
      ? true
      : false
  : false;

type CompactTuple<T extends unknown[]> = T extends [infer First, ...infer Rest]
  ? First extends undefined
    ? CompactTuple<Rest>
    : [First, ...CompactTuple<Rest>]
  : [];
