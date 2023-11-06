import type { Result } from "@yas/result";
import { err, ok } from "@yas/result";
import type { CSSProperties } from "react";
import type {
  AnyPropertySetDefinition,
  PropertyDefinition,
} from "./defineProperties";

export function createStyleResolver<
  Definitions extends AnyPropertySetDefinition[],
>(
  propertySetDefinitions: Definitions,
): Result<StyleResolver<Definitions>, string> {
  const lookup = new Map<
    string,
    [PropertyDefinition, AnyPropertySetDefinition]
  >();

  const shorthands = new Map<string, readonly string[]>();

  for (const propertySetDef of propertySetDefinitions) {
    for (const [name, propertyDef] of Object.entries(
      propertySetDef.properties,
    )) {
      if (lookup.has(name)) {
        return err(`Duplicate property is not allowed: ${name}`);
      }
      lookup.set(name, [propertyDef, propertySetDef]);
    }
    if (propertySetDef.shorthands) {
      for (const [short, propertyNames] of Object.entries(
        propertySetDef.shorthands,
      )) {
        if (shorthands.has(short)) {
          return err(`Duplicate shorthand is not allowed: ${short}`);
        }
        shorthands.set(short, propertyNames);
      }
    }
  }

  function getOperationsForPropertyNameOrShorthand(
    propertyNameOrShorthand: string,
  ) {
    lookup.get(propertyNameOrShorthand);
  }

  const resolveStyle: StyleResolver<Definitions> = (constrainedStyle) => {
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
          const condition = conditions[conditionName];
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
  return ok(options[value as string]);
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

type StyleResolver<Definitions extends AnyPropertySetDefinition[]> = (
  constrainedStyle: ConstrainedStyle<Definitions>,
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

export type ConstrainedStyle<Definitions extends AnyPropertySetDefinition[]> = {
  [PropertyName in keyof Style]: ConstrainedPropertyValue<
    Definitions,
    PropertyName
  >;
};

type ConstrainedPropertyValue<
  Definitions = AnyPropertySetDefinition[],
  PropertyName extends keyof Style = keyof Style,
> = Definitions extends [AnyPropertySetDefinition, ...infer Rest]
  ? Definitions[0]["properties"] extends Record<PropertyName, infer Options>
    ? OptionUnion<Definitions[0]["properties"][PropertyName]>
    : ConstrainedPropertyValue<Rest, PropertyName>
  : never;

type OptionUnion<Options> = Options extends readonly (infer DirectValue)[]
  ? DirectValue
  : Options extends Record<infer AliasName, unknown>
  ? AliasName
  : never;
