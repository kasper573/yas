import { addFunctionSerializer } from "@vanilla-extract/css/functionSerializer";
import type { AnyConstrainedDefinition } from "./types";
import * as implementation from "./styleResolver";
import type { StyleResolver } from "./types";

const importName = "createStyleResolver" as const;

export function createStyleResolver<
  Definition extends AnyConstrainedDefinition,
>(definition: Definition): StyleResolver<Definition> {
  const resolver = implementation[importName](definition);

  addFunctionSerializer(resolver, {
    importPath: "vanilla-extract-constrained/src/resolveStyle",
    importName,
    args: [definition] as unknown as Serializable,
  });

  return resolver;
}

type Serializable = Parameters<typeof addFunctionSerializer>[1]["args"];
