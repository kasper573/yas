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
>(constrainedDefinition: Definition): StyleResolver<Definition> {
  const lookup = new Map<
    string,
    [PropertyDefinition, AnyConstrainedDefinition]
  >();

  const shorthands = new Map<string, readonly string[]>();

  for (const [propertyName, propertyDefinition] of Object.entries(
    constrainedDefinition.properties,
  )) {
    if (lookup.has(propertyName)) {
      throw new Error(`Duplicate property is not allowed: ${propertyName}`);
    }
    lookup.set(propertyName, [propertyDefinition, constrainedDefinition]);
  }
  if (constrainedDefinition.shorthands) {
    for (const [short, propertyNames] of Object.entries(
      constrainedDefinition.shorthands,
    )) {
      if (shorthands.has(short)) {
        throw new Error(`Duplicate shorthand is not allowed: ${short}`);
      }
      shorthands.set(short, propertyNames);
    }
  }

  const resolveStyle: StyleResolver = (constrainedStyle) => {
    const style = {} as Record<string, unknown>;
    const errors: Array<[string, string]> = [];

    for (const [propertyNameOrShorthand, propertyValue] of Object.entries(
      constrainedStyle,
    )) {
      if (propertyValue === undefined || propertyValue === null) {
        continue;
      }
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
      throw new Error(
        errors
          .map(([name, error]) => `Invalid property "${name}": ${error}`)
          .join("\n"),
      );
    }

    return style;
  };

  return resolveStyle;
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
