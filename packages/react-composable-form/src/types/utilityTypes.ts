import type { ZodFirstPartyTypeKind, ZodType } from "zod";
import type { ComponentType } from "react";

export type AnyProps = Record<string, any>;

export type AnyComponent = ComponentType<any>;

export type Replace<T, K extends keyof T, V> = {
  [P in keyof T]: P extends K ? V : T[P];
};

export type TypeNameForType<Type extends ZodType> =
  Type["_def"] extends ZodDefinitionWithTypeName
    ? Type["_def"]["typeName"]
    : never;

export type ZodDefinitionWithTypeName = {
  typeName: ZodFirstPartyTypeKind;
};
