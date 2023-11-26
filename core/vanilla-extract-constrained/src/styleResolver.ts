import { ok, err } from "@yas/result";
import type {
  ConditionRecord,
  ConstrainedDefinition,
  ConstrainedStyle,
  PropertyDefinitionRecord,
  PropertyShorthandRecord,
  Style,
} from "./types";
import {
  conditionKeys,
  type PropertyDefinition,
  type StyleResolver,
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
  function resolveStyle(
    constrainedStyle: ConstrainedStyle<Conditions, Properties, Shorthands>,
  ): Style {
    const style = {} as Record<PropertyKey, unknown>;
    const errors: Array<[PropertyKey, string]> = [];

    consumeRootConditions(constrainedStyle, style);

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
        if (passThroughProperties.includes(propertyName)) {
          style[propertyName] = propertyValue;
          continue;
        }
        const propertyDefinition = properties[propertyName];
        if (!propertyDefinition) {
          errors.push([propertyNameOrShorthand, "Unknown property"]);
          continue;
        }

        if (!isPlainObject(propertyValue)) {
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
              [conditionKey, conditionAlias, propertyName],
              res.value,
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
  }

  function consumeRootConditions(
    constrainedStyle: ConstrainedStyle<Conditions, Properties, Shorthands>,
    targetStyle: Record<PropertyKey, unknown>,
  ) {
    for (const conditionKey of conditionKeys) {
      const condition = constrainedStyle[conditionKey];
      if (!condition) {
        continue;
      }
      delete constrainedStyle[conditionKey];
      for (const [conditionValue, constrainedConditionStyle] of Object.entries(
        condition,
      )) {
        const conditionStyle = resolveStyle(constrainedConditionStyle);
        for (const [propertyName, propertyValue] of Object.entries(
          conditionStyle,
        )) {
          assignPath(
            targetStyle,
            [conditionKey, conditionValue, propertyName],
            propertyValue,
          );
        }
      }
    }
  }

  return resolveStyle;
}

// Can unfortunately not be a symbol because it needs to be serializable.
export const anyCssValue = "___placeholder_for_any_css_value___" as const;
const passThroughProperties: PropertyKey[] = ["containerName"];

function resolveValue<T>(options: PropertyDefinition<T>, value: T) {
  if (Object.is(options, anyCssValue)) {
    return ok(value);
  }
  if (typeof options === "function") {
    if (!Array.isArray(value)) {
      return err(
        `Invalid functional value ${value}. Must be an array of args to pass to property function.`,
      );
    }
    let res;
    try {
      res = options(...(value as Parameters<typeof options>));
    } catch (e) {
      return err(
        `Could not resolve functional value ${JSON.stringify(value)}:\n\n${e}`,
      );
    }
    return ok(res);
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
  path: PropertyKey[],
  value: unknown,
) {
  let target = style;
  const lastIndex = path.length - 1;
  for (let i = 0; i < lastIndex; i++) {
    const key = path[i] as keyof typeof target;
    target = (target[key] ?? (target[key] = {})) as typeof target;
  }
  target[path[lastIndex] as keyof typeof target] = value;
}

function isPlainObject<T>(value: T): value is T & Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof Date)
  );
}
