import type { ZodObject } from "zod";
import { z } from "zod";
import type { ComponentType } from "react";
import type {
  FieldNames,
  FormSchema,
  FormValidationMode,
  ValueType,
  FormErrorsParser,
  FormErrors,
  inferFieldValue,
  inferValue,
} from "./types/commonTypes";
import type {
  AnyProps,
  MakeOptional,
  OptionalArgIfEmpty,
} from "./types/utilityTypes";
import type { SetTypedComponent } from "./utils/typedComponents";
import { setTypedComponent } from "./utils/typedComponents";
import type {
  AnyRCFGenerics,
  ComposedFieldComponent,
  FormLayoutProps,
  FormOptions,
  RCFGenerics,
} from "./types/optionTypes";
import { withDefaultProps } from "./utils/withDefaultProps";
import type { InputFieldComponent } from "./types/optionTypes";
import type { FieldConditionsSelector } from "./types/optionTypes";
import type { FieldComponentGenerics } from "./types/optionTypes";
import type { AnyFieldProps } from "./types/optionTypes";

export type FormOptionsBuilderFactory<
  Input extends AnyRCFGenerics,
  Output extends AnyRCFGenerics,
> = (input: FormOptionsBuilder<Input>) => FormOptionsBuilder<Output>;

export class FormOptionsBuilder<G extends AnyRCFGenerics> {
  constructor(private options: FormOptions<G>) {}

  schema<NewSchema extends FormSchema>(
    schema: NewSchema,
  ): FormOptionsBuilder<
    RCFGenerics<
      G["baseFieldProps"],
      NewSchema,
      G["layoutProps"],
      G["components"],
      G["customExternalError"]
    >
  > {
    return new FormOptionsBuilder({
      ...this.options,
      schema,
    } as never);
  }

  // TODO rename to errorTransformer
  customExternalErrors<NewCustomError>(
    externalErrorParser: FormErrorsParser<NewCustomError, G["schema"]>,
  ): FormOptionsBuilder<
    RCFGenerics<
      G["baseFieldProps"],
      G["schema"],
      G["layoutProps"],
      G["components"],
      NewCustomError
    >
  > {
    return new FormOptionsBuilder({
      ...this.options,
      externalErrorParser,
    } as never);
  }

  layout<
    NewLayoutProps extends AnyProps = {},
    DefaultProps extends Partial<NewLayoutProps> = {},
  >(
    layout: ComponentType<
      FormLayoutProps<G["schema"], G["components"]> & NewLayoutProps
    >,
    defaultProps?: DefaultProps,
  ): FormOptionsBuilder<
    RCFGenerics<
      G["baseFieldProps"],
      G["schema"],
      MakeOptional<NewLayoutProps, keyof DefaultProps>,
      G["components"],
      G["customExternalError"]
    >
  > {
    if (defaultProps) {
      layout = withDefaultProps(layout, defaultProps);
    }
    return new FormOptionsBuilder({
      ...this.options,
      layout,
    } as never);
  }

  type<Type extends ValueType, AdditionalProps>(
    type: Type,
    component: InputFieldComponent<
      G["schema"],
      inferValue<Type>,
      AdditionalProps
    >,
    ...[initProps]: OptionalArgIfEmpty<
      Omit<AdditionalProps, keyof AnyFieldProps>
    >
  ): FormOptionsBuilder<
    RCFGenerics<
      G["baseFieldProps"],
      G["schema"],
      G["layoutProps"],
      {
        named: G["components"]["named"];
        typed: SetTypedComponent<
          G["components"]["typed"],
          inferValue<Type>,
          ComposedFieldComponent<G["schema"], inferValue<Type>, AdditionalProps>
        >;
      },
      G["customExternalError"]
    >
  > {
    const {
      components: { typed, named },
      ...rest
    } = this.options;
    if (initProps) {
      component = withDefaultProps(component, initProps as never);
    }
    return new FormOptionsBuilder({
      ...rest,
      components: {
        named,
        typed: setTypedComponent(typed, type, component),
      },
    } as never);
  }

  field<FieldName extends FieldNames<G["schema"]>, AdditionalProps>(
    name: FieldName,
    component: InputFieldComponent<
      G["schema"],
      inferFieldValue<G["schema"], FieldName>,
      AdditionalProps
    >,
    ...[initProps]: OptionalArgIfEmpty<
      Omit<AdditionalProps, keyof AnyFieldProps>
    >
  ): FormOptionsBuilder<
    RCFGenerics<
      G["baseFieldProps"],
      G["schema"],
      G["layoutProps"],
      {
        typed: G["components"]["typed"];
        named: Omit<G["components"]["named"], FieldName> &
          Record<
            FieldName,
            ComposedFieldComponent<
              G["schema"],
              inferFieldValue<G["schema"], FieldName>,
              AdditionalProps
            >
          >;
      },
      G["customExternalError"]
    >
  > {
    const {
      components: { named, typed },
      ...rest
    } = this.options;
    if (initProps) {
      component = withDefaultProps(component, initProps as never);
    }
    return new FormOptionsBuilder({
      ...rest,
      components: {
        typed,
        named: {
          ...named,
          [name]: component,
        },
      },
    } as never);
  }

  conditions(
    fieldConditionSelector: FieldConditionsSelector<G["schema"]>,
  ): FormOptionsBuilder<G> {
    return new FormOptionsBuilder({
      ...this.options,
      fieldConditionsSelector: fieldConditionSelector,
    } as never);
  }

  validateOn(...modes: FormValidationMode[]): FormOptionsBuilder<G> {
    return new FormOptionsBuilder({
      ...this.options,
      modes,
    } as never);
  }

  build(): FormOptions<G> {
    return this.options;
  }
}

export const emptyFormOptionsBuilder =
  new FormOptionsBuilder<EmptyFormOptionsGenerics>({
    schema: z.object({}),
    layout: NoLayout,
    components: { named: {}, typed: [] },
    fieldConditionsSelector: () => ({}),
    modes: ["submit"],
    externalErrorParser: (error) => ({
      general: error?.general ?? [],
      field: error?.field ?? {},
    }),
  });

export type EmptyFormOptionsGenerics = RCFGenerics<
  {},
  ZodObject<{}>,
  {},
  FieldComponentGenerics<{}, []>,
  Partial<FormErrors<ZodObject<{}>>> | undefined
>;

function NoLayout<
  Schema extends FormSchema,
  Components extends FieldComponentGenerics,
>({ fields }: FormLayoutProps<Schema, Components>) {
  return (
    <>
      {Object.values(fields).map((Component: ComponentType, index) => (
        <Component key={index} />
      ))}
    </>
  );
}
