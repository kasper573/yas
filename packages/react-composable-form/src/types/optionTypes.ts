import type { ComponentProps, ComponentType, FormEvent } from "react";
import type { TypedComponents } from "../typedComponents";
import type { AnyComponent, DictionaryGet, AnyProps } from "./utilityTypes";
import type {
  FieldNames,
  FieldState,
  FormSchema,
  FormValidationMode,
  FormValueType,
  inferFormValue,
} from "./commonTypes";

/**
 * Generic type holder. Reused as a reliable single source of truth of common generics.
 */
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

export interface FormOptions<G extends RCFGenerics>
  extends Pick<G, "namedComponents" | "typedComponents"> {
  schema: G["schema"];
  layout: FormLayoutFor<G>;
  validate: G["validate"];
}

export type FormLayoutFor<G extends RCFGenerics> = ComponentType<
  FormLayoutProps<G["schema"], G> & G["layoutProps"]
>;

export interface FormLayoutProps<
  Schema extends FormSchema = FormSchema,
  Components extends FieldComponents = FieldComponents,
> {
  fields: FieldComponentsPassedToLayout<Schema, Components>;
  handleSubmit: (e?: FormEvent) => unknown;
}

export interface FieldProps<Value = any> extends FieldState<Value> {
  name: string;
  onChange: (newValue: Value) => unknown;
  onBlur: () => unknown;
}

export type FieldFor<
  Schema extends FormSchema,
  FieldName extends string,
> = ComponentType<FieldProps<inferFormValue<Schema["shape"][FieldName]>>>;

export type NamedComponents = Record<string, AnyComponent>;

export interface FieldComponents<
  Named extends NamedComponents = any,
  Typed extends TypedComponents = any,
> {
  namedComponents: Named;
  typedComponents: Typed;
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
