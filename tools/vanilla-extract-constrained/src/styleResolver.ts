import { ok, err } from "@yas/result";
import type {
  ConditionKey,
  ConditionRecord,
  ConstrainedDefinition,
  PropertyDefinitionRecord,
  PropertyShorthandRecord,
} from "./types";
import {
  type PropertyDefinition,
  type StyleResolver,
  conditionKeyMap,
} from "./types";

export function createStyleResolver<
  Conditions extends ConditionRecord,
  Properties extends PropertyDefinitionRecord,
  Shorthands extends PropertyShorthandRecord<Properties>,
>({
  properties,
  conditions,
  defaultCondition,
  shorthands,
}: ConstrainedDefinition<Conditions, Properties, Shorthands>): StyleResolver<
  Conditions,
  Properties,
  Shorthands
> {
  return function resolveStyle(constrainedStyle) {
    const style = {} as Record<PropertyKey, unknown>;
    const errors: Array<[PropertyKey, string]> = [];

    for (const [propertyNameOrShorthand, propertyValue] of Object.entries(
      constrainedStyle,
    )) {
      if (propertyValue === undefined || propertyValue === null) {
        continue;
      }
      const propertyNames = (shorthands?.[propertyNameOrShorthand] ?? [
        propertyNameOrShorthand,
      ]) as Array<keyof Properties>;
      for (const propertyName of propertyNames) {
        const propertyDefinition = properties[propertyName];
        if (!propertyDefinition) {
          errors.push([propertyNameOrShorthand, "Unknown property"]);
          continue;
        }

        if (typeof propertyValue !== "object") {
          const res = resolveValue(propertyDefinition, propertyValue);
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

          const res = resolveValue(propertyDefinition, conditionValue);
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
      throw new Error(
        errors
          .map(
            ([name, error]) => `Invalid property "${String(name)}": ${error}`,
          )
          .join("\n"),
      );
    }

    return style;
  };
}

export const anyCssValue = Symbol("any_css_value");

function resolveValue<T>(options: PropertyDefinition<T>, value: T) {
  if (Object.is(options, anyCssValue)) {
    return ok(value);
  }
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
  ...path: PropertyKey[]
) {
  let target = style;
  const lastIndex = path.length - 1;
  for (let i = 0; i < lastIndex; i++) {
    const key = path[i] as keyof typeof target;
    target = (target[key] ?? (target[key] = {})) as typeof target;
  }
  target[path[lastIndex] as keyof typeof target] = value;
}
