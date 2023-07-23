import type { ZodObject } from "zod";
import { z } from "zod";
import type { ComponentType } from "react";
import type {
  EmptyFieldComponents,
  FieldComponents,
  FormLayoutProps,
  FormOptions,
  FormSchema,
  FormValidationMode,
  RCFGenerics,
} from "./types/commonTypes";
import type { AnyProps, Replace } from "./types/utilityTypes";
import type { FieldBuilderFactory } from "./createFieldBuilder";

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
    layout: ComponentType<
      FormLayoutProps<G["schema"], G["components"]> & NewLayoutProps
    >,
  ) {
    return new FormOptionsBuilder<Replace<G, "layoutProps", NewLayoutProps>>({
      ...this.options,
      layout,
    });
  }

  components<NewComponents extends FieldComponents>(
    newComponents: FieldBuilderFactory<G["components"], NewComponents>,
  ) {
    const { components: oldComponents } = this.options;
    return new FormOptionsBuilder<Replace<G, "components", NewComponents>>({
      ...this.options,
      components: (builder) => newComponents(oldComponents(builder)),
    });
  }

  validate<NewMode extends FormValidationMode>(validate: NewMode) {
    return new FormOptionsBuilder<Replace<G, "validate", NewMode>>({
      ...this.options,
      validate,
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
    components: (_) => _,
    validate: "submit",
  });

export type EmptyFormOptionsGenerics = RCFGenerics<
  ZodObject<{}>,
  {},
  EmptyFieldComponents,
  EmptyFieldComponents,
  "submit"
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
