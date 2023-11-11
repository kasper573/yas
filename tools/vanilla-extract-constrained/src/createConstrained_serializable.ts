import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";
import type { ConstrainedStyleFn } from "./createConstrained";
import type { AnyConstrainedDefinition } from "./createConstrained";
import * as implementation from "./createConstrained";

const importName = "createConstrained" as const;

export function createConstrained<Definition extends AnyConstrainedDefinition>(
  definition: Definition,
): ConstrainedStyleFn<Definition> {
  const constrainedStyleFn = implementation[importName](definition);

  addFunctionSerializer(constrainedStyleFn, {
    importPath: "vanilla-extract-constrained/src/createConstrained",
    importName,
    // We assert because our data type is generic and not compatible with the built-in type,
    // but is actually serializable at runtime.
    args: [definition] as unknown as Serializable,
  });

  return constrainedStyleFn;
}

type Serializable = Parameters<typeof addFunctionSerializer>[1]["args"];
