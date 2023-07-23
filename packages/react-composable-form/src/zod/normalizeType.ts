import type { ZodType } from "zod";
import { ZodDefault, ZodEffects, ZodNullable, ZodOptional } from "zod";

export function normalizeType(type: ZodType): ZodType {
  while (
    type instanceof ZodEffects ||
    type instanceof ZodOptional ||
    type instanceof ZodNullable ||
    type instanceof ZodDefault
  ) {
    type = type instanceof ZodEffects ? type.innerType() : type._def.innerType;
  }
  return type;
}
