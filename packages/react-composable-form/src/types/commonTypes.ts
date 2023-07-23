import type { AnyZodObject, output, ZodFirstPartyTypeKind, ZodType } from "zod";
import type { ComponentProps, ComponentType } from "react";
import type { FieldBuilderFactory } from "../createFieldBuilder";
import type { FormOptionsBuilderFactory } from "../createFormOptionsBuilder";
import type { Store } from "../Store";

import type { AnyComponent, AnyProps, TypeNameForType } from "./utilityTypes";

export interface RCFGenerics<
  Schema extends FormSchema = any,
  LayoutProps extends AnyProps = any,
  Components extends FieldComponents = any,
  ParentComponents extends FieldComponents = any,
  ValidationMode extends FormValidationMode = any,
> {
  schema: Schema;
  layoutProps: LayoutProps;
  components: Components;
  parentComponents: ParentComponents;
  validate: ValidationMode;
}

export interface FormOptions<G extends RCFGenerics> {
  schema: G["schema"];
  layout: FormLayoutFor<G>;
  components: FieldBuilderFactory<G["parentComponents"], G["components"]>;
  validate: G["validate"];
}

export type FormLayoutFor<G extends RCFGenerics> = ComponentType<
  FormLayoutProps<G["schema"], G["components"]> & G["layoutProps"]
>;

export type FormSchema = AnyZodObject;

export type FormValueType<T = any> = ZodType<T>;

export type inferFormValue<Type extends FormValueType> = output<Type>;

export type PrimitiveType = ZodFirstPartyTypeKind;

export type FormValidationMode = "immediate" | "change" | "blur" | "submit";

export interface FieldComponents {
  types: Partial<Record<PrimitiveType, AnyComponent>>;
  fields: Record<string, AnyComponent>;
}

export interface EmptyFieldComponents {
  types: {};
  fields: {};
}

export interface NoFieldComponents {
  types: {};
  fields: {};
}

export interface ComposableFormProps<Value> {
  value?: Value;
  onChange?: (newValue: Value) => unknown;
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
  Components extends FieldComponents = NoFieldComponents,
> {
  fields: FieldComponentsPassedToLayout<Schema, Components>;
}

export interface FormFieldProps<Value = any> extends FieldState<Value> {
  name: string;
  onChange: (newValue: Value) => unknown;
}

export type FormFieldFor<
  Schema extends FormSchema,
  FieldName extends string,
> = ComponentType<FormFieldProps<inferFormValue<Schema["shape"][FieldName]>>>;

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
> = FieldName extends keyof Components["fields"]
  ? ComponentProps<Components["fields"][FieldName]>
  : TypeNameForType<Type> extends keyof Components["types"]
  ? ComponentProps<
      Exclude<Components["types"][TypeNameForType<Type>], undefined>
    >
  : never;

export type FormStore<Schema extends FormSchema = FormSchema> = Store<
  FormState<Schema>
>;

export type FieldNames<Schema extends FormSchema> = `${string &
  keyof Schema["shape"]}`;

export interface FormState<Schema extends FormSchema> {
  data: inferFormValue<Schema>;
  errors: Record<FieldNames<Schema>, unknown[]>;
}

export interface FieldState<Value> {
  value: Value;
  errors: unknown[];
}
