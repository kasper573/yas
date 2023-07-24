import type { ZodObject } from "zod";
import { z } from "zod";
import type { ComponentType } from "react";
import type {
  FieldNames,
  FormSchema,
  FormValidationMode,
} from "./types/commonTypes";
import type { AnyProps, Replace } from "./types/utilityTypes";
import type { FormValueType, inferFormValue } from "./types/commonTypes";
import type { SetTypedComponent } from "./typedComponents";
import { setTypedComponent } from "./typedComponents";
import type {
  FieldComponents,
  FieldProps,
  FormLayoutProps,
  FormOptions,
  RCFGenerics,
} from "./types/optionTypes";

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

  type<
    Type extends FormValueType,
    ComponentProps extends FieldProps<inferFormValue<Type>>,
  >(type: Type, component: ComponentType<ComponentProps>) {
    type NewTypes = SetTypedComponent<
      G["typedComponents"],
      Type,
      ComponentType<ComponentProps>
    >;
    const { typedComponents, ...rest } = this.options;
    return new FormOptionsBuilder<Replace<G, "typedComponents", NewTypes>>({
      ...rest,
      typedComponents: setTypedComponent(typedComponents, type, component),
    });
  }

  field<
    FieldName extends FieldNames<G["schema"]>,
    ComponentProps extends FieldProps<inferFormValue<G["schema"]>[FieldName]>,
  >(name: FieldName, component: ComponentType<ComponentProps>) {
    type NewNamed = Omit<G["namedComponents"], FieldName> &
      Record<FieldName, ComponentType<ComponentProps>>;
    const { namedComponents, ...rest } = this.options;
    return new FormOptionsBuilder<Replace<G, "namedComponents", NewNamed>>({
      ...rest,
      namedComponents: {
        ...namedComponents,
        [name]: component,
      },
    });
  }

  validate<NewMode extends FormValidationMode>(validate: NewMode) {
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
