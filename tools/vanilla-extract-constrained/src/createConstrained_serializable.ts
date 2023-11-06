import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";
import type { ConstrainedStyleFn } from "./createConstrained";
import type { AnyPropertySetDefinition } from "./defineProperties";
import * as implementation from "./createConstrained";

const importName = "createConstrained" as const;

export function createConstrained<
  Definitions extends AnyPropertySetDefinition[],
>(...args: Definitions): ConstrainedStyleFn<Definitions> {
  const constrainedStyleFn = implementation[importName](...args);

  addFunctionSerializer(constrainedStyleFn, {
    importPath: "vanilla-extract-constrained/src/createConstrained",
    importName,
    // We assert because our data type is generic and not compatible with the built-in type,
    // but is actually serializable at runtime.
    args: args as unknown as Serializable,
  });

  return constrainedStyleFn;
}

type Serializable = Parameters<typeof addFunctionSerializer>[1]["args"];
