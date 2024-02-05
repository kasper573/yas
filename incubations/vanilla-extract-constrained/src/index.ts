import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";
import { createStyleResolver as createStyleResolverImpl } from "./styleResolver";
export type { ConstrainedStyle, Style, StyleResolver } from "./types";
export { all, multi } from "./styleResolver";

export const createStyleResolver: typeof createStyleResolverImpl = (
  definition,
) => {
  const resolver = createStyleResolverImpl(definition);

  addFunctionSerializer(resolver, {
    importPath: "vanilla-extract-constrained/styleResolver",
    importName: "createStyleResolver",
    args: [definition] as unknown as Serializable,
  });

  for (const value of Object.values(definition.properties)) {
    if (typeof value === "function") {
      addFunctionSerializer(value, {
        importPath: "vanilla-extract-constrained/functionEvaluator",
        importName: "functionEvaluator",
        args: [value.toString() as unknown as Serializable],
      });
    }
  }

  return resolver;
};

type Serializable = Parameters<typeof addFunctionSerializer>[1]["args"];
