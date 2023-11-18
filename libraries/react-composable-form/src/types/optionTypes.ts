import type { ComponentProps, ComponentType, FormEvent } from "react";
import type { TypedComponents } from "../utils/typedComponents";
import type { GetTypedComponent } from "../utils/typedComponents";
import type { TypedComponentTuple } from "../utils/typedComponents";
import type { AnyComponent, AnyProps } from "./utilityTypes";
import type {
  FormError,
  FormErrorsParser,
  FieldErrors,
  FieldNames,
  FormSchema,
  FormValidationMode,
  inferValue,
  inferFieldValue,
  ValueType,
} from "./commonTypes";

export type AnyRCFGenerics = RCFGenerics<any, any, any, any, any>;

export type AnyRCFGenericsForFieldProps<FieldProps extends AnyProps> =
  RCFGenerics<FieldProps, any, any, any, any>;

/**
 * Generic type holder. Reused as a reliable single source of truth of common generics.
 */
export interface RCFGenerics<
  BaseFieldProps extends AnyProps,
  Schema extends FormSchema,
  LayoutProps extends AnyProps,
  Components extends FieldComponentGenerics,
  CustomExternalError,
> {
  schema: Schema;
  layoutProps: LayoutProps;
  baseFieldProps: BaseFieldProps;
  customExternalError: CustomExternalError;
  components: Components;
}

export interface FormOptions<G extends AnyRCFGenerics> {
  schema: G["schema"];
  layout: FormLayoutFor<G>;
  modes: FormValidationMode[];
  externalErrorParser: FormErrorsParser<G["customExternalError"], G["schema"]>;
  fieldConditionsSelector: FieldConditionsSelector<G["schema"]>;
  components: FieldComponentRegistry<G["components"]>;
}

export type FieldConditionsSelector<Schema extends FormSchema> = (
  fieldValues: inferValue<Schema>,
) => FieldConditions<Schema>;

export type FieldConditions<Schema extends FormSchema> = {
  [K in FieldNames<Schema>]?: boolean;
};

export type FormLayoutFor<G extends AnyRCFGenerics> = ComponentType<
  FormLayoutProps<G["schema"], G["components"]> & G["layoutProps"]
>;

export type AnyFormLayoutProps = FormLayoutProps<any, any>;

export interface FormLayoutProps<
  Schema extends FormSchema,
  Components extends FieldComponentGenerics,
  AnonymousFields extends boolean = false,
> {
  generalErrors: FormError[];
  fieldErrors: FieldErrors<Schema>;
  fieldValues: inferValue<Schema>;
  fields: AnonymousFields extends true
    ? AnonymousFieldComponentsPassedToLayout<Schema, Components>
    : FieldComponentsPassedToLayout<Schema, Components>;
  handleSubmit: (e?: FormEvent) => unknown;
  reset: () => unknown;
}

export type InputFieldComponent<
  Schema extends FormSchema,
  Value,
  AdditionalProps,
> = ComponentType<FieldProps<Value, inferValue<Schema>> & AdditionalProps>;

export type ComposedFieldComponent<
  Schema extends FormSchema,
  Value,
  AdditionalProps,
> = ComponentType<
  Partial<FieldProps<Value, inferValue<Schema>> & AdditionalProps>
>;

export type FieldPropNamesNotAvailableInDefaults = Exclude<
  keyof FieldProps,
  FieldPropNamesAvailableInDefaults
>;

export type FieldPropNamesAvailableInDefaults = keyof Pick<
  FieldProps,
  "onChange" | "onBlur" | "onFocus" | "value"
>;

export interface FieldProps<Value = unknown, FieldValues = unknown> {
  name?: string;
  value?: Value;
  required?: boolean;
  fieldValues?: FieldValues;
  errors?: FormError[];
  onChange?: (newValue?: Value) => unknown;
  onBlur?: () => unknown;
  onFocus?: () => unknown;
}

export type FieldFor<
  Schema extends FormSchema,
  FieldName extends FieldNames<Schema> = FieldNames<Schema>,
> = ComponentType<
  FieldProps<inferFieldValue<Schema, FieldName>, inferValue<Schema>>
>;

export type NamedComponents = Record<string, AnyComponent>;

export interface FieldComponentGenerics<
  Named extends NamedComponents = any,
  Typed extends TypedComponents = any,
> {
  named: Named;
  typed: Typed;
}

export interface FieldComponentRegistry<G extends FieldComponentGenerics> {
  named: G["named"];
  typed: TypedComponentRegistry<G["typed"]>;
}

export type TypedComponentRegistry<Tuples extends TypedComponents> = {
  [K in keyof Tuples]: TypedComponentRegistryEntry<Tuples[K]>;
};

export type TypedComponentRegistryEntry<Tuple extends TypedComponentTuple> = [
  ValueType<Tuple[0]>,
  Tuple[1],
];

export type FieldComponentsForProps<BaseFieldProps extends AnyProps> =
  FieldComponentGenerics<
    Record<string, ComponentType<BaseFieldProps>>,
    TypedComponents<BaseFieldProps>
  >;

export type FieldComponentsPassedToLayout<
  Schema extends FormSchema,
  Components extends FieldComponentGenerics,
> = {
  [K in FieldNames<Schema> as Capitalize<K>]: ComponentPassedToLayout<
    Schema,
    Components,
    K
  >;
};

export type AnonymousFieldComponentsPassedToLayout<
  Schema extends FormSchema,
  Components extends FieldComponentGenerics,
> = Record<
  string,
  ComponentPassedToLayout<Schema, Components, FieldNames<Schema>>
>;

type ComponentPassedToLayout<
  Schema extends FormSchema,
  Components extends FieldComponentGenerics,
  FieldName extends string,
> = ComponentType<
  Partial<
    FieldName extends keyof Components["named"]
      ? ComponentProps<Components["named"][FieldName]>
      : inferComponentProps<
          GetTypedComponent<
            Components["typed"],
            inferFieldValue<Schema, FieldName>
          >
        >
  >
>;

type inferComponentProps<T> = T extends AnyComponent ? ComponentProps<T> : T;
