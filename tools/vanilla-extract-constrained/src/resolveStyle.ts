import type { Result } from "@yas/result";
import { err, ok } from "@yas/result";
import type { CSSProperties } from "react";
import type { PropertyDefinition } from "./createConstrained";
import type { AnyConstrainedDefinition } from "./createConstrained";

export function createStyleResolver<
  Definition extends AnyConstrainedDefinition,
>(
  constrainedDefinition: Definition,
): Result<StyleResolver<Definition>, string> {
  const lookup = new Map<
    string,
    [PropertyDefinition, AnyConstrainedDefinition]
  >();

  const shorthands = new Map<string, readonly string[]>();

  for (const [propertyName, propertyDefinition] of Object.entries(
    constrainedDefinition.properties,
  )) {
    if (lookup.has(propertyName)) {
      return err(`Duplicate property is not allowed: ${propertyName}`);
    }
    lookup.set(propertyName, [propertyDefinition, constrainedDefinition]);
  }
  if (constrainedDefinition.shorthands) {
    for (const [short, propertyNames] of Object.entries(
      constrainedDefinition.shorthands,
    )) {
      if (shorthands.has(short)) {
        return err(`Duplicate shorthand is not allowed: ${short}`);
      }
      shorthands.set(short, propertyNames);
    }
  }

  const resolveStyle: StyleResolver<Definition> = (constrainedStyle) => {
    const style = {} as Record<string, unknown>;
    const errors: Array<[string, string]> = [];

    for (const [propertyNameOrShorthand, propertyValue] of Object.entries(
      constrainedStyle,
    )) {
      const propertyNames = shorthands.get(propertyNameOrShorthand) ?? [
        propertyNameOrShorthand,
      ];
      for (const propertyName of propertyNames) {
        const definitions = lookup.get(propertyName);
        if (!definitions?.length) {
          errors.push([propertyNameOrShorthand, "Unknown property"]);
          continue;
        }

        const [options, { conditions, defaultCondition }] = definitions;

        if (typeof propertyValue !== "object") {
          const res = resolveValue(options, propertyValue);
          if (res.isErr()) {
            errors.push([propertyName, res.error]);
            continue;
          }
          style[propertyName] = res.value;
          continue;
        }

        for (const [conditionName, conditionValue] of Object.entries(
          propertyValue,
        )) {
          const condition = conditions?.[conditionName];
          if (!condition) {
            errors.push([propertyName, `Unknown condition: ${conditionName}`]);
            continue;
          }

          const res = resolveValue(options, conditionValue);
          if (res.isErr()) {
            errors.push([propertyName, res.error]);
            continue;
          }

          if (defaultCondition === conditionName) {
            style[propertyName] = res.value;
          }

          for (const [conditionKey, conditionAlias] of Object.entries(
            condition,
          )) {
            assignPath(
              style,
              res.value,
              conditionKeyMap[conditionKey as ConditionKey],
              conditionAlias,
              propertyName,
            );
          }
        }
      }
    }

    if (errors.length) {
      return err(
        errors
          .map(([name, error]) => `Invalid property "${name}": ${error}`)
          .join("\n"),
      );
    }

    return ok(style);
  };

  return ok(resolveStyle);
}

function resolveValue<T>(options: PropertyDefinition, value: T) {
  if (Array.isArray(options)) {
    if (!options.includes(value as string)) {
      return err(
        `Invalid value ${value}. Must be one of: ${options.join(", ")}`,
      );
    }
    return ok(value);
  }
  if (!options.hasOwnProperty(value as string)) {
    return err(
      `Invalid value ${value}. Must be one of: ${Object.keys(options).join(
        ", ",
      )}`,
    );
  }
  return ok(options[value as keyof typeof options]);
}

function assignPath(
  style: Record<string, unknown>,
  value: unknown,
  ...path: string[]
) {
  let target = style;
  const lastIndex = path.length - 1;
  for (let i = 0; i < lastIndex; i++) {
    const key = path[i] as keyof typeof target;
    target = (target[key] ?? (target[key] = {})) as typeof target;
  }
  target[path[lastIndex]] = value;
}

type StyleResolver<Definition extends AnyConstrainedDefinition> = (
  constrainedStyle: ConstrainedStyle<Definition>,
) => Result<Style, string>;

export const layerProperty = "@layer" as const;

type ConditionKey = keyof typeof conditionKeyMap;
const conditionKeyMap = {
  // constrained name -> vanilla-extract style() call name
  "@media": "@media",
  "@supports": "@supports",
  "@container": "@container",
  selector: "selectors",
};

export type Style = CSSProperties;

export type Condition = Partial<Record<ConditionKey, string>>;

export type ConstrainedStyle<Definition extends AnyConstrainedDefinition> = {
  [PropertyName in keyof Style]?: ConstrainedPropertyInput<
    Definition,
    PropertyName
  >;
} & {
  // [ShorthandName in keyof Definition["shorthands"]]?: ConstrainedPropertyInput<
  //   Definition,
  //   Definition["shorthands"][ShorthandName][number]
  // >;
};

export type ConstrainedPropertyInput<
  Definition extends AnyConstrainedDefinition = AnyConstrainedDefinition,
  PropertyName extends keyof Style = keyof Style,
> = HasProperties<Definition["conditions"]> extends true
  ?
      | ConstrainedPropertyValue<Definition, PropertyName>
      | {
          [K in keyof Definition["conditions"]]?: ConstrainedPropertyValue<
            Definition,
            PropertyName
          >;
        }
  : ConstrainedPropertyValue<Definition, PropertyName>;

export type ConstrainedPropertyValue<
  Definition extends AnyConstrainedDefinition = AnyConstrainedDefinition,
  PropertyName extends keyof Style = keyof Style,
> = inferPropertyValue<Definition["properties"][PropertyName]>;

type inferPropertyValue<Definition extends PropertyDefinition> =
  Definition extends readonly (infer DirectValue)[]
    ? DirectValue
    : Definition extends Record<infer AliasName, unknown>
    ? AliasName
    : never;

type HasProperties<T> = keyof T extends never ? false : true;
