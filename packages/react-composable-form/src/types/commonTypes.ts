import type {
  AnyZodObject,
  output,
  ZodAny,
  ZodFirstPartyTypeKind,
  ZodType,
} from "zod";
import type { ComponentProps, ComponentType } from "react";
import type { Store } from "@yas/store";
import type { FieldBuilderFactory } from "../createFieldBuilder";
import type { FormOptionsBuilderFactory } from "../createFormOptionsBuilder";
import type { AnyComponent, AnyProps, TypeNameForType } from "./utilityTypes";

export interface FormOptions<
  Schema extends AnyZodObject = any,
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

export type PrimitiveType = ZodFirstPartyTypeKind;

export type FieldComponents = {
  types: Partial<Record<PrimitiveType, AnyComponent>>;
  fields: Record<string, AnyComponent>;
};

export type EmptyFieldComponents = {
  types: {};
  fields: {};
};

export type NoFieldComponents = {
  types: {};
  fields: {};
};

export type ComposableFormProps<Schema extends AnyZodObject> = {
  data?: output<Schema>;
};

export type FormComponent<Options extends FormOptions> = ComponentType<
  ComposableFormProps<inferSchema<Options>> &
    Omit<inferLayoutProps<Options>, keyof FormLayoutProps>
> & {
  extend<NewOptions extends FormOptions>(
    options: FormOptionsBuilderFactory<Options, NewOptions>,
  ): FormComponent<NewOptions>;
};

export type FormLayoutProps<
  Schema extends AnyZodObject = AnyZodObject,
  Components extends FieldComponents = NoFieldComponents,
> = {
  fields: FieldComponentsPassedToLayout<Schema, Components>;
};

export interface FormFieldProps<Type extends ZodType = ZodAny>
  extends FieldState<Type> {
  name: string;
  onChange: (newValue: output<Type>) => unknown;
}

export type FormFieldFor<
  Schema extends AnyZodObject,
  FieldName extends string,
> = ComponentType<FormFieldProps<Schema["shape"][FieldName]>>;

export type FieldComponentsPassedToLayout<
  Schema extends AnyZodObject,
  Components extends FieldComponents,
> = {
  [K in FieldNames<Schema> as Capitalize<K>]: ComponentType<
    Partial<InferFieldComponentProps<Components, K, Schema["shape"][K]>>
  >;
};

type InferFieldComponentProps<
  Components extends FieldComponents,
  FieldName extends string,
  Type extends ZodType,
> = FieldName extends keyof Components["fields"]
  ? ComponentProps<Components["fields"][FieldName]>
  : TypeNameForType<Type> extends keyof Components["types"]
  ? ComponentProps<
      Exclude<Components["types"][TypeNameForType<Type>], undefined>
    >
  : never;

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
