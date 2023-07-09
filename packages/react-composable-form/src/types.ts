import type { AnyZodObject, ZodType } from "zod";
import type { ComponentType } from "react";
import type { Store } from "@yas/store";
import type { output } from "zod";

export interface ComposableFormOptions<
  Schema extends AnyZodObject,
  AdditionalLayoutProps extends AnyProps,
> {
  schema: Schema;
  layout: ComponentType<FormLayoutProps<Schema> & AdditionalLayoutProps>;
  components: FormComponentFactory;
}

export type ComposableFormProps<Schema extends AnyZodObject> = {
  data?: output<Schema>;
};

export type ComposableForm<
  Schema extends AnyZodObject,
  AdditionalLayoutProps extends AnyProps,
> = ComponentType<
  ComposableFormProps<Schema> &
    Omit<AdditionalLayoutProps, keyof FormLayoutProps>
> & {
  extend<NewSchema extends AnyZodObject, NewLayoutProps extends AnyProps>(
    options: Partial<ComposableFormOptions<NewSchema, NewLayoutProps>>,
  ): ComposableForm<
    Fallback<NewSchema, Schema>,
    Fallback<NewLayoutProps, AdditionalLayoutProps>
  >;
};

export type FormLayoutProps<Schema extends AnyZodObject = AnyZodObject> = {
  fields: FieldComponentsPassedToLayout<Schema>;
};

export interface FormFieldProps<Type extends ZodType> extends FieldState<Type> {
  name: string;
  onChange: (newValue: output<Type>) => unknown;
}

export type AnyFormField = ComponentType<FormFieldProps<ZodType>>;

export type FormFieldFor<
  Schema extends AnyZodObject,
  FieldName extends string,
> = ComponentType<FormFieldProps<Schema["shape"][FieldName]>>;

export type FieldComponentsPassedToLayout<Schema extends AnyZodObject> = {
  [K in FieldNames<Schema> as Capitalize<K>]: ComponentType<
    Partial<FormFieldProps<Schema["shape"][K]>>
  >;
};

export type FormComponentFactory = (
  builder: FormComponentBuilder,
) => FormComponentBuilder;

export type FormComponentBuilder = {
  type<Type extends ZodType>(
    type: Type,
    component: ComponentType<FormFieldProps<Type>>,
  ): FormComponentBuilder;
  field(
    name: string,
    component: ComponentType<FormFieldProps<ZodType>>,
  ): FormComponentBuilder;
};

export type FormStore<Schema extends AnyZodObject> = Store<FormState<Schema>>;
export type FieldNames<Schema extends AnyZodObject> = `${string &
  keyof Schema["shape"]}`;

export interface FormState<Schema extends AnyZodObject> {
  data: output<Schema>;
  errors: Record<FieldNames<Schema>, unknown[]>;
}

export interface FieldState<Type extends ZodType> {
  value: output<Type>;
  errors: unknown[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyProps = Record<string, any>;

export type Fallback<A, B> = IsNever<A> extends true ? B : A;

export type IsNever<T> = [T] extends [never] ? true : false;
