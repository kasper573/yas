import type { ComponentProps, ComponentType, FormEvent } from "react";
import type { TypedComponents } from "../typedComponents";
import type { AnyComponent, AnyProps, DictionaryGet } from "./utilityTypes";
import type {
  FieldNames,
  AnyError,
  FormSchema,
  FormValidationMode,
  ValueType,
  inferValue,
  FormErrors,
} from "./commonTypes";
import type { GetShapeFromSchema } from "./commonTypes";

/**
 * Generic type holder. Reused as a reliable single source of truth of common generics.
 */
export interface RCFGenerics<
  BaseFieldProps extends AnyProps = any,
  Schema extends FormSchema = any,
  LayoutProps extends AnyProps = any,
  ValidationMode extends FormValidationMode = any,
  Named extends NamedComponents = any,
  Typed extends TypedComponents = any,
> extends FieldComponents<Named, Typed> {
  schema: Schema;
  layoutProps: LayoutProps;
  mode: ValidationMode;
  baseFieldProps: BaseFieldProps;
}

export interface FormOptions<G extends RCFGenerics>
  extends Pick<G, "namedComponents" | "typedComponents"> {
  schema: G["schema"];
  layout: FormLayoutFor<G>;
  mode: G["mode"];
}

export type FormLayoutFor<G extends RCFGenerics> = ComponentType<
  FormLayoutProps<G["schema"], G> & G["layoutProps"]
>;

export interface FormLayoutProps<
  Schema extends FormSchema = FormSchema,
  Components extends FieldComponents = FieldComponents,
> extends Pick<FormErrors<Schema>, "generalErrors"> {
  fields: FieldComponentsPassedToLayout<Schema, Components>;
  handleSubmit: (e?: FormEvent) => unknown;
}

export type InputFieldComponent<
  Type extends ValueType,
  AdditionalProps,
> = ComponentType<FieldProps<inferValue<Type>> & AdditionalProps>;

export type ComposedFieldComponent<
  Type extends ValueType,
  AdditionalProps,
> = ComponentType<Partial<FieldProps<inferValue<Type>> & AdditionalProps>>;

export interface FieldProps<Value = any> {
  name?: string;
  value?: Value;
  required?: boolean;
  errors?: AnyError[];
  onChange?: (newValue?: Value) => unknown;
  onBlur?: () => unknown;
}

export type FieldFor<
  Schema extends FormSchema,
  FieldName extends string,
> = ComponentType<
  FieldProps<inferValue<GetShapeFromSchema<Schema>[FieldName]>>
>;

export type NamedComponents = Record<string, AnyComponent>;

export interface FieldComponents<
  Named extends NamedComponents = any,
  Typed extends TypedComponents = any,
> {
  namedComponents: Named;
  typedComponents: Typed;
}

export type FieldComponentsForProps<BaseFieldProps> = FieldComponents<
  Record<string, ComponentType<BaseFieldProps>>,
  [ValueType, ComponentType<BaseFieldProps>][]
>;

export type FieldComponentsPassedToLayout<
  Schema extends FormSchema,
  Components extends FieldComponents,
> = {
  [K in FieldNames<Schema> as Capitalize<K>]: ComponentType<
    Partial<
      InferFieldComponentProps<Components, K, GetShapeFromSchema<Schema>[K]>
    >
  >;
};

type InferFieldComponentProps<
  Components extends FieldComponents,
  FieldName extends string,
  Type extends ValueType,
> = FieldName extends keyof Components["namedComponents"]
  ? ComponentProps<Components["namedComponents"][FieldName]>
  : DictionaryGet<
      InferredTypedComponents<Components["typedComponents"]>,
      inferValue<Type>
    >;

type InferredTypedComponents<T extends TypedComponents> = {
  [K in keyof T]: [
    type: inferValue<T[K][0]>,
    component: ComponentProps<T[K][1]>,
  ];
};
