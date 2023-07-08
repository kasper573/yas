import type { AnyZodObject, ZodType } from "zod";
import type { ComponentType } from "react";

export interface ComposableFormOptions {
  schema?: AnyZodObject;
  layout?: FormLayout;
  components?: FormComponentFactory;
}

export type ComposableFormProps = {
  schema?: AnyZodObject;
  children?: InlineFormLayout;
};

export type ComposableForm = ComponentType<ComposableFormProps> & {
  extend(options: ComposableFormOptions): ComposableForm;
};

/**
 * Not a ComponentType to be able to be used as non-memoized inline render prop
 */
export type InlineFormLayout = (props: FormLayoutProps) => JSX.Element;

export type FormLayoutProps = {
  fields: FormFields;
};

export type FormLayout = ComponentType<FormLayoutProps>;

export type FormFieldProps = { name: string };

export type FormFields = Record<string, FormFieldWithEmbeddedDefaultProps>;
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
