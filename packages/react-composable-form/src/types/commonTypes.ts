import type { output, ZodType } from "zod";

import type { GetShapeFromSchema } from "../utils/getShapeFromSchema";

export type FormSchema = ValueType;

export type ValueType<T = any> = ZodType<T>;

export type AnyError = unknown;

export type ErrorList = AnyError[];

export type FormValidationMode = "change" | "blur" | "submit";

export type inferValue<Type extends ValueType> = output<Type>;

export interface FormState<Schema extends FormSchema> {
  localErrors: FormErrors<Schema>;
  externalErrors: FormErrors<Schema>;
  combinedErrors: FormErrors<Schema>;
  data: inferValue<Schema>;
}

export type FieldNames<Schema extends FormSchema> = `${string &
  keyof GetShapeFromSchema<Schema>}`;

export type FieldErrors<Schema extends FormSchema> =
  // Falls back to anonymous record when no fields are specified to avoid defining as {} which would match any type
  keyof FieldNames<Schema> extends never
    ? Record<string, ErrorList>
    : { [K in FieldNames<Schema>]?: ErrorList };

export type FormErrorsParser<CustomError, Schema extends FormSchema> = (
  error: CustomError,
) => FormErrors<Schema>;

export interface FormErrors<Schema extends FormSchema> {
  general: ErrorList;
  field: FieldErrors<Schema>;
}
