import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";
import type {
  ConstrainedInlineStyleFn,
  ConstrainedStyleFn,
} from "./createConstrained";
import type { AnyConstrainedDefinition } from "./createConstrained";
import * as implementation from "./createConstrained";

const import1Name = "createConstrained" as const;
const import2Name = "createConstrainedInline" as const;

export function createConstrained<Definition extends AnyConstrainedDefinition>(
  definition: Definition,
): [ConstrainedStyleFn<Definition>, ConstrainedInlineStyleFn<Definition>] {
  const constrainedStyleFn = implementation[import1Name](definition);
  const constrainedStyleInlineFn = implementation[import2Name](definition);

  addFunctionSerializer(constrainedStyleFn, {
    importPath: "vanilla-extract-constrained/src/createConstrained",
    importName: import1Name,
    args: [definition] as unknown as Serializable,
  });

  addFunctionSerializer(constrainedStyleInlineFn, {
    importPath: "vanilla-extract-constrained/src/createConstrained",
    importName: import2Name,
    args: [definition] as unknown as Serializable,
  });

  return [constrainedStyleFn, constrainedStyleInlineFn];
}

type Serializable = Parameters<typeof addFunctionSerializer>[1]["args"];
