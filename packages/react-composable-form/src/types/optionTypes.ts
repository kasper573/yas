import type { ComponentProps, ComponentType, FormEvent } from "react";
import type { TypedComponents } from "../typedComponents";
import type {
  AnyComponent,
  DictionaryGet,
  AnyProps,
  HasRequiredProps,
} from "./utilityTypes";
import type {
  FieldNames,
  FormSchema,
  FormValidationMode,
  FormValueType,
  inferFormValue,
} from "./commonTypes";
import type { FormError } from "./commonTypes";
import type { MakeOptional } from "./utilityTypes";

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
  mode: ValidationMode;
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
> {
  fields: FieldComponentsPassedToLayout<Schema, Components>;
  handleSubmit: (e?: FormEvent) => unknown;
}

export type FieldProps<Value = any> = OptionalityRelativeFieldProps<Value> & {
  name: string;
  onBlur: () => unknown;
  errors?: FormError[];
};

export type FieldInitProps<ComponentProps> = Omit<
  ComponentProps,
  keyof FieldProps
>;

export type FieldInitPropsArgs<ComponentProps> = HasRequiredProps<
  FieldInitProps<ComponentProps>
> extends true
  ? [initProps: FieldInitProps<ComponentProps>]
  : [initProps?: FieldInitProps<ComponentProps>];

export type WithInitProps<ComponentProps, InitInitialProps> = MakeOptional<
  ComponentProps,
  keyof InitInitialProps
>;

export type OptionalityRelativeFieldProps<Value> =
  | ({ required: true } & FieldValueProps<Value>)
  | ({ required: false } & FieldValueProps<Value | undefined>);

export type FieldValueProps<Value> = {
  value: Value;
  onChange: (newValue: Value) => unknown;
};

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
