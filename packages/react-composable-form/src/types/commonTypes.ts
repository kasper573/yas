import type { AnyZodObject, output, ZodType } from "zod";

export type FormSchema = AnyZodObject;

export type FormValueType<T = any> = ZodType<T>;

export type FormError = unknown;

export type FormValidationMode = "change" | "blur" | "submit";

export type inferFormValue<Type extends FormValueType> = output<Type>;

export interface FormState<Schema extends FormSchema> {
  data: inferFormValue<Schema>;
  errors: FieldErrors<Schema>;
}

export type FieldNames<Schema extends FormSchema> = `${string &
  keyof Schema["shape"]}`;

export interface FieldState<Value> {
  value: Value;
  errors?: FormError[];
}

export type FieldErrors<Schema extends FormSchema> = Partial<
  Record<FieldNames<Schema>, FormError[]>
>;
