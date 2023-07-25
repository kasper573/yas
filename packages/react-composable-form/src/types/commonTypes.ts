import type { AnyZodObject, output, ZodType } from "zod";

export type FormSchema = AnyZodObject;

export type ValueType<T = any> = ZodType<T>;

export type FormError = unknown;

export type FormValidationMode = "change" | "blur" | "submit";

export type inferValue<Type extends ValueType> = output<Type>;

export interface FormState<Schema extends FormSchema> {
  data: inferValue<Schema>;
  errors: FieldErrors<Schema>;
}

export type FieldNames<Schema extends FormSchema> = `${string &
  keyof Schema["shape"]}`;

export type FieldErrors<Schema extends FormSchema> = Partial<
  Record<FieldNames<Schema>, FormError[]>
>;
