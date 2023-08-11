import type { ZodObject } from "zod";
import { z } from "zod";
import type { ComponentType } from "react";
import type {
  FieldNames,
  FormSchema,
  FormValidationMode,
  ValueType,
  inferValue,
  FormErrorsParser,
  FormErrors,
} from "./types/commonTypes";
import type {
  AnyProps,
  OptionalArgIfEmpty,
  Replace,
} from "./types/utilityTypes";
import type { SetTypedComponent } from "./utils/typedComponents";
import { setTypedComponent } from "./utils/typedComponents";
import type {
  AnyRCFGenerics,
  ComposedFieldComponent,
  FieldComponents,
  FieldProps,
  FormLayoutProps,
  FormOptions,
  RCFGenerics,
} from "./types/optionTypes";
import { withDefaultProps } from "./utils/withDefaultProps";
import type { InputFieldComponent } from "./types/optionTypes";
import type { FieldSelector } from "./types/optionTypes";

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

  layout<NewLayoutProps extends AnyProps = {}>(
    layout: ComponentType<FormLayoutProps<G["schema"], G> & NewLayoutProps>,
  ) {
    return new FormOptionsBuilder<Replace<G, "layoutProps", NewLayoutProps>>({
      ...this.options,
      layout,
    });
  }

  type<Type extends ValueType, AdditionalProps>(
    type: Type,
    component: InputFieldComponent<Type, AdditionalProps>,
    ...[initProps]: OptionalArgIfEmpty<Omit<AdditionalProps, keyof FieldProps>>
  ) {
    type NewTypes = SetTypedComponent<
      G["typedComponents"],
      Type,
      ComposedFieldComponent<Type, AdditionalProps>
    >;
    const { typedComponents, ...rest } = this.options;
    if (initProps) {
      component = withDefaultProps(component, initProps as never);
    }
    return new FormOptionsBuilder<Replace<G, "typedComponents", NewTypes>>({
      ...rest,
      typedComponents: setTypedComponent(
        typedComponents,
        type,
        component,
      ) as NewTypes,
    });
  }

  field<FieldName extends FieldNames<G["schema"]>, AdditionalProps>(
    name: FieldName,
    component: InputFieldComponent<
      G["schema"]["shape"][FieldName],
      AdditionalProps
    >,
    ...[initProps]: OptionalArgIfEmpty<Omit<AdditionalProps, keyof FieldProps>>
  ) {
    type NewNamed = Omit<G["namedComponents"], FieldName> &
      Record<
        FieldName,
        ComposedFieldComponent<
          inferValue<G["schema"]>[FieldName],
          AdditionalProps
        >
      >;
    const { namedComponents, ...rest } = this.options;
    if (initProps) {
      component = withDefaultProps(component, initProps as never);
    }
    return new FormOptionsBuilder<Replace<G, "namedComponents", NewNamed>>({
      ...rest,
      namedComponents: {
        ...namedComponents,
        [name]: component,
      },
    } as never);
  }

  conditionals(fieldSelector: FieldSelector<G>) {
    return new FormOptionsBuilder<G>({
      ...this.options,
      fieldSelector,
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
    namedComponents: {},
    typedComponents: [],
    fieldSelector: (fields) => fields,
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
  {},
  [],
  Partial<FormErrors<ZodObject<{}>>> | undefined
>;

function NoLayout<
  Schema extends FormSchema,
  Components extends FieldComponents,
>({ fields }: FormLayoutProps<Schema, Components>) {
  return (
    <>
      {Object.values(fields).map((Component, index) => (
        <Component key={index} />
      ))}
    </>
  );
}
