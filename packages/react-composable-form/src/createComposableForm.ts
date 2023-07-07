import type { ComponentType } from "react";
import type { AnyZodObject, ZodType } from "zod";

export function createComposableForm(
  options: CreateComposableFormOptions = {},
): ComposableForm {
  return {} as ComposableForm;
}

export interface CreateComposableFormOptions {
  layout?: FormLayout;
  components?: FormComponentFactory;
}

export type ComposableFormProps = {
  schema?: AnyZodObject;
  children?: FormLayout;
};

export type ComposableForm = ComponentType<ComposableFormProps> & {
  extend(options: CreateComposableFormOptions): ComposableForm;
};

export type FormLayoutProps = {
  fields: Record<string, FormFieldWithEmbeddedDefaultProps>;
};

export type FormLayout = ComponentType<FormLayoutProps>;

export type FormFieldProps = { name: string };

export type FormField = ComponentType<FormFieldProps>;
export type FormFieldWithEmbeddedDefaultProps = ComponentType<
  Partial<FormFieldProps>
>;

export type FormComponentFactory = (
  builder: FormComponentBuilder,
) => FormComponentBuilder;

export type FormComponentBuilder = {
  type(type: ZodType, component: FormField): FormComponentBuilder;
  field(name: string, component: FormField): FormComponentBuilder;
};
