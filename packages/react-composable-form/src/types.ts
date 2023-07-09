import type { AnyZodObject, ZodType } from "zod";
import type { ComponentProps, ComponentType } from "react";
import type { Store } from "@yas/store";
import type { output } from "zod";

export interface ComposableFormOptions<
  Schema extends AnyZodObject,
  Layout extends FormLayout,
> {
  schema?: Schema;
  layout?: Layout;
  components?: FormComponentFactory;
}

export type ComposableFormProps<Schema extends AnyZodObject> = {
  data?: output<Schema>;
};

export type ComposableForm<
  Schema extends AnyZodObject,
  Layout extends FormLayout,
> = ComponentType<
  ComposableFormProps<Schema> &
    MakePartial<ComponentProps<Layout>, keyof FormLayoutProps>
> & {
  extend<NewSchema extends AnyZodObject, NewLayout extends FormLayout>(
    options: ComposableFormOptions<NewSchema, NewLayout>,
  ): ComposableForm<NewSchema, NewLayout>;
};

export type FormLayoutProps = {
  fields: FormFields;
};

export type FormLayout = ComponentType<FormLayoutProps>;

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

type MakePartial<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
