import type { AnyZodObject, output, ZodFirstPartyTypeKind, ZodType } from "zod";
import type { ComponentProps, ComponentType } from "react";
import type { FieldBuilderFactory } from "../createFieldBuilder";
import type {
  FormOptionsBuilderFactory,
  FormOptionsBuilder,
  FormOptionsBuilderFor,
  inferFormOptions,
} from "../createFormOptionsBuilder";
import type { Store } from "../Store";

import type { AnyComponent, AnyProps, TypeNameForType } from "./utilityTypes";

export interface FormOptions<
  Schema extends FormSchema = any,
  LayoutProps extends AnyProps = any,
  Components extends FieldComponents = any,
  ParentComponents extends FieldComponents = any,
> {
  schema: Schema;
  layout: ComponentType<FormLayoutProps<Schema, Components> & LayoutProps>;
  components: FieldBuilderFactory<ParentComponents, Components>;
}

export type inferSchema<Options extends FormOptions> =
  Options extends FormOptions<infer Schema> ? Schema : never;

export type inferLayoutProps<Options extends FormOptions> =
  Options extends FormOptions<any, infer LayoutProps> ? LayoutProps : never;

export type inferComponents<Options extends FormOptions> =
  Options extends FormOptions<any, any, infer Components> ? Components : never;

export type inferParentComponents<Options extends FormOptions> =
  Options extends FormOptions<any, any, any, infer ParentComponents>
    ? ParentComponents
    : never;

export type FormSchema = AnyZodObject;

export type FormValueType<T = any> = ZodType<T>;

export type inferFormValue<Type extends FormValueType> = output<Type>;

export type PrimitiveType = ZodFirstPartyTypeKind;

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

export type FormComponent<Options extends FormOptions> = ComponentType<
  ComposableFormProps<inferFormValue<inferSchema<Options>>> &
    Omit<inferLayoutProps<Options>, keyof FormLayoutProps>
> & {
  extend<NewOptions extends FormOptionsBuilder>(
    options: FormOptionsBuilderFactory<
      FormOptionsBuilderFor<Options>,
      NewOptions
    >,
  ): FormComponent<inferFormOptions<NewOptions>>;
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
