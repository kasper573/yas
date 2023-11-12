import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";
import * as implementation from "./styleResolver";
import type {
  ConditionRecord,
  ConstrainedDefinition,
  PropertyDefinitionRecord,
  PropertyShorthandRecord,
  StyleResolver,
} from "./types";

const importName = "createStyleResolver" as const;

export function createStyleResolver<
  Conditions extends ConditionRecord,
  Properties extends PropertyDefinitionRecord,
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
