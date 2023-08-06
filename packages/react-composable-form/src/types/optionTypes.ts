import type { ComponentProps, ComponentType, FormEvent } from "react";
import type { TypedComponents } from "../utils/typedComponents";
import type { GetShapeFromSchema } from "../utils/getShapeFromSchema";
import type { AnyComponent, AnyProps, DictionaryGet } from "./utilityTypes";
import type {
  AnyError,
  FormErrorsParser,
  FieldErrors,
  FieldNames,
  FormSchema,
  FormValidationMode,
  inferValue,
  ValueType,
} from "./commonTypes";

export type AnyRCFGenerics = RCFGenerics<any, any, any, any, any, any, any>;

export type AnyRCFGenericsForFieldProps<FieldProps extends AnyProps> =
  RCFGenerics<FieldProps, any, any, any, any, any, any>;

/**
 * Generic type holder. Reused as a reliable single source of truth of common generics.
 */
export interface RCFGenerics<
  BaseFieldProps extends AnyProps,
  Schema extends FormSchema,
  LayoutProps extends AnyProps,
  ValidationMode extends FormValidationMode,
  Named extends NamedComponents,
  Typed extends TypedComponents,
  CustomExternalError,
> extends FieldComponents<Named, Typed> {
  schema: Schema;
  layoutProps: LayoutProps;
  mode: ValidationMode;
  baseFieldProps: BaseFieldProps;
  customExternalError: CustomExternalError;
}

export interface FormOptions<G extends AnyRCFGenerics>
  extends Pick<G, "namedComponents" | "typedComponents"> {
  schema: G["schema"];
  layout: FormLayoutFor<G>;
  mode: G["mode"];
  externalErrorParser: FormErrorsParser<G["customExternalError"], G["schema"]>;
}

export type FormLayoutFor<G extends AnyRCFGenerics> = ComponentType<
  FormLayoutProps<G["schema"], G> & G["layoutProps"]
>;

export interface FormLayoutProps<
  Schema extends FormSchema = FormSchema,
  Components extends FieldComponents = FieldComponents,
> {
  generalErrors: AnyError[];
  fieldErrors: FieldErrors<Schema>;
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
  onFocus?: () => unknown;
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
