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
  Replace,
} from "./types/utilityTypes";
import type { SetTypedComponent } from "./utils/typedComponents";
import { setTypedComponent } from "./utils/typedComponents";
import type {
  AnyRCFGenerics,
  ComposedFieldComponent,
  FieldProps,
  FormLayoutProps,
  FormOptions,
  RCFGenerics,
} from "./types/optionTypes";
import { withDefaultProps } from "./utils/withDefaultProps";
import type { InputFieldComponent } from "./types/optionTypes";
import type { FieldConditionsSelector } from "./types/optionTypes";
import type { FieldComponentGenerics } from "./types/optionTypes";

export type FormOptionsBuilderFactory<
  Input extends AnyRCFGenerics,
  Output extends AnyRCFGenerics,
> = (input: FormOptionsBuilder<Input>) => FormOptionsBuilder<Output>;

export class FormOptionsBuilder<G extends AnyRCFGenerics> {
  constructor(private options: FormOptions<G>) {}

  schema<NewSchema extends FormSchema>(schema: NewSchema) {
    return new FormOptionsBuilder<Replace<G, "schema", NewSchema>>({
      ...this.options,
      schema,
    });
  }

  // TODO rename to errorTransformer
  customExternalErrors<NewCustomError>(
    externalErrorParser: FormErrorsParser<NewCustomError, G["schema"]>,
  ) {
    return new FormOptionsBuilder<
      Replace<G, "customExternalError", NewCustomError>
    >({
      ...this.options,
      externalErrorParser,
    });
  }

  layout<
    NewLayoutProps extends AnyProps = {},
    DefaultProps extends Partial<NewLayoutProps> = {},
  >(
    layout: ComponentType<
      FormLayoutProps<G["schema"], G["components"]> & NewLayoutProps
    >,
    defaultProps?: DefaultProps,
  ) {
    if (defaultProps) {
      layout = withDefaultProps(layout, defaultProps);
    }
    type NewLayoutPropsWithDefaultsConsidered = MakeOptional<
      NewLayoutProps,
      keyof DefaultProps
    >;
    return new FormOptionsBuilder<
      Replace<G, "layoutProps", NewLayoutPropsWithDefaultsConsidered>
    >({
      ...this.options,
      layout: layout as never,
    });
  }

  type<Type extends ValueType, AdditionalProps>(
    type: Type,
    component: InputFieldComponent<inferValue<Type>, AdditionalProps>,
    ...[initProps]: OptionalArgIfEmpty<Omit<AdditionalProps, keyof FieldProps>>
  ) {
    type NewTyped = SetTypedComponent<
      G["components"]["typed"],
      inferValue<Type>,
      ComposedFieldComponent<inferValue<Type>, AdditionalProps>
    >;
    type NewComponents = Replace<G["components"], "typed", NewTyped>;
    type NewG = Replace<G, "components", NewComponents>;
    const {
      components: { typed, named },
      ...rest
    } = this.options;
    if (initProps) {
      component = withDefaultProps(component, initProps as never);
    }
    return new FormOptionsBuilder<NewG>({
      ...rest,
      components: {
        named,
        typed: setTypedComponent(typed, type, component),
      },
    });
  }

  field<FieldName extends FieldNames<G["schema"]>, AdditionalProps>(
    name: FieldName,
    component: InputFieldComponent<
      inferFieldValue<G["schema"], FieldName>,
      AdditionalProps
    >,
    ...[initProps]: OptionalArgIfEmpty<Omit<AdditionalProps, keyof FieldProps>>
  ) {
    type NewNamed = Omit<G["components"]["named"], FieldName> &
      Record<
        FieldName,
        ComposedFieldComponent<
          inferFieldValue<G["schema"], FieldName>,
          AdditionalProps
        >
      >;
    type NewComponents = Replace<G["components"], "named", NewNamed>;
    type NewG = Replace<G, "components", NewComponents>;
    const {
      components: { named, typed },
      ...rest
    } = this.options;
    if (initProps) {
      component = withDefaultProps(component, initProps as never);
    }
    return new FormOptionsBuilder<NewG>({
      ...rest,
      components: {
        typed,
        named: {
          ...named,
          [name]: component,
        },
      },
    });
  }

  conditions(fieldConditionSelector: FieldConditionsSelector<G["schema"]>) {
    return new FormOptionsBuilder<G>({
      ...this.options,
      fieldConditionsSelector: fieldConditionSelector,
    });
  }

  validateOn(...modes: FormValidationMode[]) {
    return new FormOptionsBuilder({
      ...this.options,
      modes,
    });
  }

  build() {
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
