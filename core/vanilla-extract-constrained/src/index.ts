import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";
import { createStyleResolver as createStyleResolverImpl } from "constrained-css";
export type { ConstrainedStyle, Style, StyleResolver } from "constrained-css";
export { all } from "constrained-css";

export const createStyleResolver: typeof createStyleResolverImpl = (
  definition,
) => {
  const resolver = createStyleResolverImpl(definition);

  addFunctionSerializer(resolver, {
    importPath: "vanilla-extract-constrained/src/styleResolver",
    importName: "createStyleResolver",
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
};

type Serializable = Parameters<typeof addFunctionSerializer>[1]["args"];
