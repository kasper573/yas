import type { ZodObject } from "zod";
import { z } from "zod";
import type { ComponentType } from "react";
import type {
  FieldNames,
  FormSchema,
  FormValidationMode,
  ValueType,
  inferValue,
} from "./types/commonTypes";
import type {
  AnyProps,
  OptionalArgIfEmpty,
  Replace,
} from "./types/utilityTypes";
import type { SetTypedComponent } from "./typedComponents";
import { setTypedComponent } from "./typedComponents";
import type {
  ComposedFieldComponent,
  FieldComponents,
  FieldProps,
  FormLayoutProps,
  FormOptions,
  RCFGenerics,
} from "./types/optionTypes";
import { withDefaultProps } from "./withDefaultProps";
import type { InputFieldComponent } from "./types/optionTypes";

export type FormOptionsBuilderFactory<
  Input extends RCFGenerics,
  Output extends RCFGenerics,
> = (input: FormOptionsBuilder<Input>) => FormOptionsBuilder<Output>;

export class FormOptionsBuilder<G extends RCFGenerics> {
  constructor(private options: FormOptions<G>) {}

  schema<NewSchema extends FormSchema>(schema: NewSchema) {
    return new FormOptionsBuilder<Replace<G, "schema", NewSchema>>({
      ...this.options,
      schema,
    });
  }

  layout<NewLayoutProps extends AnyProps>(
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
    });
  }

  validateOn<NewMode extends FormValidationMode>(validate: NewMode) {
    return new FormOptionsBuilder<Replace<G, "mode", NewMode>>({
      ...this.options,
      mode: validate,
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
    mode: "submit",
  });

export type EmptyFormOptionsGenerics = RCFGenerics<
  ZodObject<{}>,
  {},
  "submit",
  {},
  []
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
