import type { Result } from "@yas/result";
import { ok, err, unwrapUnsafe_useWithCaution } from "@yas/result";
import type {
  ConditionRecord,
  ConstrainedDefinition,
  ConstrainedStyle,
  PropertyDefinitionRecord,
  PropertyShorthandRecord,
  Style,
} from "./types";
import {
  rootConditionKeys,
  type PropertyDefinition,
  type StyleResolver,
} from "./types";

export function createStyleResolver<
  Conditions extends ConditionRecord,
  Properties extends StrictPropertyDefinitionRecord,
  Shorthands extends PropertyShorthandRecord<Properties>,
>(
  definition: ConstrainedDefinition<Conditions, Properties, Shorthands>,
): StyleResolver<Conditions, Properties, Shorthands> {
  return createStyleResolverImpl(definition);
}

// We only apply this stricter constraint in the outermost scope to avoid
// blowing up the type system with excess variants in the internal
// implementation code (where it's not needed anyqway).
export type StrictPropertyDefinitionRecord = {
  [K in keyof Style]?: PropertyDefinition<Style[K]>;
};

function createStyleResolverImpl<
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

    for (const [propertyNameOrShorthand, propertyInput] of Object.entries(
      constrainedStyle,
    )) {
      if (propertyInput === undefined || propertyInput === null) {
        continue;
      }

      const propertyNames = (shorthands?.[propertyNameOrShorthand] ?? [
        propertyNameOrShorthand,
      ]) as Array<keyof Properties>;

      for (const propertyName of propertyNames) {
        if (passThroughProperties.includes(propertyName)) {
          style[propertyName] = propertyInput;
          continue;
        }

        const propertyDefinition = properties[propertyName];
        if (!propertyDefinition) {
          errors.push([propertyNameOrShorthand, "Unknown property"]);
          continue;
        }

        if (!isPlainObject(propertyInput)) {
          const res = resolvePropertyStyle(
            propertyName,
            propertyDefinition,
            propertyInput,
          );

          if (res.isErr()) {
            errors.push([propertyName, res.error]);
            continue;
          }
          Object.assign(style, res.value);
          continue;
        }

        for (const [conditionName, conditionValue] of Object.entries(
          propertyInput,
        )) {
          const condition = conditions?.[conditionName];
          if (!condition) {
            errors.push([propertyName, `Unknown condition: ${conditionName}`]);
            continue;
          }

          const res = resolvePropertyStyle(
            propertyName,
            propertyDefinition,
            conditionValue,
          );

          if (res.isErr()) {
            errors.push([propertyName, res.error]);
            continue;
          }

          if (defaultCondition === conditionName) {
            Object.assign(style, res.value);
          }

          for (const [conditionKey, conditionAlias] of Object.entries(
            condition,
          )) {
            for (const [cssPropertyName, cssValue] of Object.entries(
              res.value,
            )) {
              assignPath(
                style,
                [conditionKey, conditionAlias, cssPropertyName],
                cssValue,
              );
            }
          }
        }
      }
    }

    if (errors.length) {
      unwrapUnsafe_useWithCaution(
        err(
          errors
            .map(
              ([name, error]) => `Invalid property "${String(name)}": ${error}`,
            )
            .join("\n"),
        ),
      );
    }

    return style;
  }

  function consumeRootConditions(
    constrainedStyle: ConstrainedStyle<Conditions, Properties, Shorthands>,
    targetStyle: Record<PropertyKey, unknown>,
  ) {
    for (const conditionKey of rootConditionKeys) {
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

const passThroughProperties: PropertyKey[] = ["containerName"];

/**
 * Use this as the value for a property to indicate that it can be any CSS value.)
 */
export function all<T>(): T[] {
  // We use a symbol to represent this at runtime, but assert as the expected type
  // to be able to optimally infer only the values for the specified properties.
  // This heavily reduces the number of type variants that gets generated.
  return anyCssValueIdentifier as unknown as T[];
}

export function multi<Aliases extends string>(
  aliasedStyles: Record<Aliases, Style>,
): Record<Aliases, Style> {
  return { ...aliasedStyles, [multiIdentifier]: true };
}

// Can unfortunately not be a symbol because it needs to be serializable for some integrations.
const anyCssValueIdentifier = "___any_css_value___" as const;
const multiIdentifier = "___multiple_styles___" as const;

function resolvePropertyStyle<Value>(
  propertyName: PropertyKey,
  def: PropertyDefinition<Value>,
  input: unknown,
): Result<Style, string> {
  if (Object.is(def, anyCssValueIdentifier)) {
    return ok({ [propertyName]: input });
  }

  if (multiIdentifier in def) {
    return ok(def[input as keyof typeof def] as unknown as Style);
  }

  if (typeof def === "function") {
    let res;
    try {
      const args = Array.isArray(input) ? input : [input];
      res = def(...(args as Parameters<typeof def>));
    } catch (e) {
      return err(
        `Could not resolve functional value ${JSON.stringify(input)}:\n\n${e}`,
      );
    }
    return ok({ [propertyName]: res });
  }

  if (Array.isArray(def)) {
    if (!def.includes(input as string)) {
      return err(`Invalid value ${input}. Must be one of: ${def.join(", ")}`);
    }
    return ok({ [propertyName]: input });
  }

  if (!def.hasOwnProperty(input as string)) {
    return err(
      `Invalid value ${input}. Must be one of: ${Object.keys(def).join(", ")}`,
    );
  }

  return ok({ [propertyName]: def[input as keyof typeof def] });
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