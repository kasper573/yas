import type { Result } from "@yas/result";
import { err, ok } from "@yas/result";
import type { CSSProperties } from "react";
import type {
  AnyPropertySetDefinition,
  PropertyDefinition,
} from "./defineProperties";

export function createStyleResolver<
  Definitions extends AnyPropertySetDefinition[],
>(definitions: Definitions): Result<StyleResolver<Definitions>, string> {
  const definitionLookup = new Map<
    string,
    [PropertyDefinition, AnyPropertySetDefinition]
  >();

  for (const definition of definitions) {
    for (const [name, propertyDef] of Object.entries(definition.properties)) {
      if (definitionLookup.has(name)) {
        return err(`Duplicate property is not allowed: ${name}`);
      }
      definitionLookup.set(name, [propertyDef, definition]);
    }
  }

  const resolveStyle: StyleResolver<Definitions> = (constrainedStyle) => {
    const style = {} as Record<string, unknown>;

    for (const [propertyName, propertyValue] of Object.entries(
      constrainedStyle,
    )) {
      const definition = definitionLookup.get(propertyName);
      if (!definition) {
        return err(`No definition found for property ${propertyName}`);
      }
      const [options, { conditions, defaultCondition }] = definition;
      if (typeof propertyValue === "object") {
        for (const [conditionName, conditionValue] of Object.entries(
          propertyValue,
        )) {
          const condition = conditions[conditionName];
          if (!condition) {
            return err(
              `Invalid condition ${conditionName} for property ${propertyName}`,
            );
          }
          const res = resolveValue(options, conditionValue);
          if (res.isErr()) {
            return res.mapErr(
              (err) => `Error for property ${propertyName}: ${err}`,
            );
          }
          if (defaultCondition === conditionName) {
            style[propertyName] = res.value;
          }
          const logs: unknown[] = [];
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
          if (logs.length > 0) {
            return err(JSON.stringify(logs, null, 2));
          }
        }
      } else {
        const res = resolveValue(options, propertyValue);
        if (res.isErr()) {
          return res.mapErr(
            (err) => `Error for property ${propertyName}: ${err}`,
          );
        }
        style[propertyName] = res.value;
      }
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
