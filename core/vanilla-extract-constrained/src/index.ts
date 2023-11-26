import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";
import * as implementation from "./styleResolver";
import type {
  ConditionRecord,
  PropertyShorthandRecord,
  PropertyDefinition,
  Style,
  StyleResolver,
  ConstrainedDefinition,
} from "./types";
export type { ConstrainedStyle, Style, StyleResolver } from "./types";

const importName = "createStyleResolver" as const;

export function createStyleResolver<
  Conditions extends ConditionRecord,
  Properties extends StrictPropertyDefinitionRecord,
  Shorthands extends PropertyShorthandRecord<Properties>,
>(
  definition: ConstrainedDefinition<Conditions, Properties, Shorthands>,
): StyleResolver<Conditions, Properties, Shorthands> {
  const resolver = implementation[importName](definition);

  addFunctionSerializer(resolver, {
    importPath: "vanilla-extract-constrained/src/styleResolver",
    importName,
    args: [definition] as unknown as Serializable,
  });

  for (const value of Object.values(definition.properties)) {
    if (typeof value === "function") {
      addFunctionSerializer(value, {
        importPath: "vanilla-extract-constrained/src/functionEvaluator",
        importName: "functionEvaluator",
        args: [value.toString() as unknown as Serializable],
      });
    }
  }

  return resolver;
}

/**
 * Use this as the value for a property to indicate that it can be any CSS value.)
 */
export function all<T>(): T[] {
  // We use a symbol to represent this at runtime, but assert as the expected type
  // to be able to optimally infer only the values for the specified properties.
  // This heavily reduces the number of type variants that gets generated.
  return implementation.anyCssValue as unknown as T[];
}

type Serializable = Parameters<typeof addFunctionSerializer>[1]["args"];

// We only apply this stricter constraint in the outermost scope to avoid
// blowing up the type system with a million variants in the internal
// implementation code (where it's not needed anyqway).
type StrictPropertyDefinitionRecord = {
  [K in keyof Style]?: PropertyDefinition<Style[K]>;
};
