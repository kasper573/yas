import type { ZodFirstPartyTypeKind, ZodType } from "zod";

export function getFirstPartyType(type: ZodType): ZodFirstPartyTypeKind {
  if ("typeName" in type._def) {
    return type._def.typeName as ZodFirstPartyTypeKind;
  }
  throw new Error(`Could not determine first party type`);
}
