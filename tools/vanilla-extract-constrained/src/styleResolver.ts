import { ok, err } from "@yas/result";
import type { ConditionKey } from "./types";
import {
  type PropertyDefinition,
  type AnyConstrainedDefinition,
  type StyleResolver,
  conditionKeyMap,
} from "./types";

export function createStyleResolver<
  Definition extends AnyConstrainedDefinition,
>({
  properties,
  conditions,
  defaultCondition,
  shorthands,
}: Definition): StyleResolver<Definition> {
  const propertyLookup = new Map<string, PropertyDefinition>();

  for (const [propertyName, propertyDefinition] of Object.entries(properties)) {
    if (propertyLookup.has(propertyName)) {
      throw new Error(`Duplicate property is not allowed: ${propertyName}`);
    }
    propertyLookup.set(propertyName, propertyDefinition);
  }

  return function resolveStyle(constrainedStyle) {
    const style = {} as Record<string, unknown>;
    const errors: Array<[string, string]> = [];

    for (const [propertyNameOrShorthand, propertyValue] of Object.entries(
      constrainedStyle,
    )) {
      if (propertyValue === undefined || propertyValue === null) {
        continue;
      }
      const propertyNames = shorthands?.[propertyNameOrShorthand] ?? [
        propertyNameOrShorthand,
      ];
      for (const propertyName of propertyNames) {
        const propertyDefinition = propertyLookup.get(propertyName);
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
          .map(([name, error]) => `Invalid property "${name}": ${error}`)
          .join("\n"),
      );
    }

    return style;
  };
}

function resolveValue<T>(options: PropertyDefinition, value: T) {
  if (options === true) {
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
