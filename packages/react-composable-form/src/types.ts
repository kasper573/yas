import type { AnyZodObject, ZodType } from "zod";
import type { ComponentType } from "react";
import type { Store } from "@yas/store";
import type { output } from "zod";

export interface ComposableFormOptions<
  Schema extends AnyZodObject,
  LayoutProps extends AnyProps,
> {
  schema: Schema;
  layout: FormLayout<LayoutProps>;
  components: FormComponentFactory;
}

export type ComposableFormProps<
  Schema extends AnyZodObject,
  LayoutProps extends AnyProps,
> = LayoutProps & {
  data?: output<Schema>;
};

export type ComposableForm<
  Schema extends AnyZodObject,
  LayoutProps extends AnyProps,
> = ComponentType<ComposableFormProps<Schema, LayoutProps>> & {
  extend<NewSchema extends AnyZodObject, NewLayoutProps extends AnyProps>(
    options: Partial<ComposableFormOptions<NewSchema, NewLayoutProps>>,
  ): ComposableForm<
    Fallback<NewSchema, Schema>,
    Fallback<NewLayoutProps, LayoutProps>
  >;
};

export type FormLayoutProps<AdditionalProps extends AnyProps = AnyProps> = {
  fields: FormFields;
} & AdditionalProps;

export type FormLayout<AdditionalProps extends AnyProps> = ComponentType<
  FormLayoutProps<AdditionalProps>
>;

export interface FormFieldProps extends FieldState {
  name: string;
  onChange: (newValue: unknown) => unknown;
}

export type FormFields = Record<string, FormFieldWithDefaultProps>;
export type FormField = ComponentType<FormFieldProps>;

export type FormFieldWithDefaultProps = ComponentType<Partial<FormFieldProps>>;

export type FormComponentFactory = (
  builder: FormComponentBuilder,
) => FormComponentBuilder;

export type FormComponentBuilder = {
  type(type: ZodType, component: FormField): FormComponentBuilder;
  field(name: string, component: FormField): FormComponentBuilder;
};

export type FormStore = Store<FormState>;

export interface FormState {
  data: Record<string, unknown>;
  errors: Record<string, unknown[]>;
}

export interface FieldState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  errors: unknown[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyProps = Record<string, any>;

type Fallback<A, B> = IsNever<A> extends true ? B : A;

type IsNever<T> = [T] extends [never] ? true : false;
