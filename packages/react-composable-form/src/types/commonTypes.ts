import type { AnyZodObject, output, ZodType } from "zod";
import type { ComponentProps, ComponentType, FormEvent } from "react";
import type { FormOptionsBuilderFactory } from "../createFormOptions";
import type { TypedComponents } from "../typedComponents";
import type { AnyComponent, AnyProps, DictionaryGet } from "./utilityTypes";

export interface RCFGenerics<
  Schema extends FormSchema = any,
  LayoutProps extends AnyProps = any,
  ValidationMode extends FormValidationMode = any,
  Named extends NamedComponents = any,
  Typed extends TypedComponents = any,
> extends FieldComponents<Named, Typed> {
  schema: Schema;
  layoutProps: LayoutProps;
  validate: ValidationMode;
}

export type FormSchema = AnyZodObject;

export type FormValueType<T = any> = ZodType<T>;

export type FormError = unknown;

export type inferFormValue<Type extends FormValueType> = output<Type>;

export interface FormOptions<G extends RCFGenerics>
  extends Pick<G, "namedComponents" | "typedComponents"> {
  schema: G["schema"];
  layout: FormLayoutFor<G>;
  validate: G["validate"];
}

export type FormLayoutFor<G extends RCFGenerics> = ComponentType<
  FormLayoutProps<G["schema"], G> & G["layoutProps"]
>;

export type FormValidationMode = "change" | "blur" | "submit";

export interface ComposableFormProps<Value> {
  value?: Value;
  onChange?: (newValue: Value) => unknown;
  onSubmit?: (value: Value) => unknown;
}

export type FormComponent<G extends RCFGenerics> = ComponentType<
  ComposableFormProps<inferFormValue<G["schema"]>> &
    Omit<G["layoutProps"], keyof FormLayoutProps>
> & {
  extend<NewG extends RCFGenerics>(
    options: FormOptionsBuilderFactory<G, NewG>,
  ): FormComponent<NewG>;
};

export interface FormLayoutProps<
  Schema extends FormSchema = FormSchema,
  Components extends FieldComponents = EmptyFieldComponents,
> {
  fields: FieldComponentsPassedToLayout<Schema, Components>;
  handleSubmit: (e?: FormEvent) => unknown;
}

export interface FormFieldProps<Value = any> extends FieldState<Value> {
  name: string;
  onChange: (newValue: Value) => unknown;
  onBlur: () => unknown;
}

export type FormFieldFor<
  Schema extends FormSchema,
  FieldName extends string,
> = ComponentType<FormFieldProps<inferFormValue<Schema["shape"][FieldName]>>>;

export type FieldNames<Schema extends FormSchema> = `${string &
  keyof Schema["shape"]}`;

export interface FormState<Schema extends FormSchema> {
  data: inferFormValue<Schema>;
  errors: FormFieldErrors<Schema>;
}

export type FormFieldErrors<Schema extends FormSchema> = Partial<
  Record<FieldNames<Schema>, FormError[]>
>;

export interface FieldState<Value> {
  value: Value;
  errors: FormError[];
}

export type NamedComponents = Record<string, AnyComponent>;

export interface FieldComponents<
  Named extends NamedComponents = any,
  Typed extends TypedComponents = any,
> {
  namedComponents: Named;
  typedComponents: Typed;
}

export interface EmptyFieldComponents {
  namedComponents: {};
  typedComponents: [];
}

export type FieldComponentsPassedToLayout<
  Schema extends FormSchema,
  Components extends FieldComponents,
> = {
  [K in FieldNames<Schema> as Capitalize<K>]: ComponentType<
    Partial<InferFieldComponentProps<Components, K, Schema["shape"][K]>>
  >;
};

type InferFieldComponentProps<
  Components extends FieldComponents,
  FieldName extends string,
  Type extends FormValueType,
> = FieldName extends keyof Components["namedComponents"]
  ? ComponentProps<Components["namedComponents"][FieldName]>
  : DictionaryGet<
      InferredTypedComponents<Components["typedComponents"]>,
      inferFormValue<Type>
    >;

type InferredTypedComponents<T extends TypedComponents> = {
  [K in keyof T]: [
    type: inferFormValue<T[K][0]>,
    component: ComponentProps<T[K][1]>,
  ];
};
