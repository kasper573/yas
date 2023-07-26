import type { AnyZodObject, output, ZodEffects, ZodType } from "zod";
import type { ZodRawShape } from "zod/lib/types";

export type FormSchema = ValueType;

export type ValueType<T = any> = ZodType<T>;

export type FormError = unknown;

export type FormValidationMode = "change" | "blur" | "submit";

export type inferValue<Type extends ValueType> = output<Type>;

export interface FormState<Schema extends FormSchema> {
  data: inferValue<Schema>;
  errors: FieldErrors<Schema>;
}

export type GetShapeFromSchema<T extends ValueType> = T extends AnyZodObject
  ? T["shape"]
  : T extends ZodEffects<infer U>
  ? GetShapeFromSchema<U>
  : ZodRawShape;

export type FieldNames<Schema extends FormSchema> = `${string &
  keyof GetShapeFromSchema<Schema>}`;

export type FieldErrors<Schema extends FormSchema> = Partial<
  Record<FieldNames<Schema>, FormError[]>
>;
