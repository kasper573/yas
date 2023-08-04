import type { AnyZodObject, ZodRawShape } from "zod";
import { ZodEffects, ZodObject } from "zod";
import type { FormSchema } from "../types/commonTypes";
import type { ValueType } from "../types/commonTypes";
import { getFirstPartyType } from "./isMatchingType";

export type GetShapeFromSchema<T extends ValueType> = T extends AnyZodObject
  ? T["shape"]
  : T extends ZodEffects<infer U>
  ? GetShapeFromSchema<U>
  : ZodRawShape;

export function getShapeFromSchema<Schema extends FormSchema>(
  type: FormSchema,
): GetShapeFromSchema<Schema> {
  while (type instanceof ZodEffects) {
    type = type.innerType();
  }
  if (!(type instanceof ZodObject)) {
    throw new Error(
      `Schema must be an object or effect chain that starts with an object, got ${getFirstPartyType(
        type,
      )}`,
    );
  }
  return type.shape;
}
