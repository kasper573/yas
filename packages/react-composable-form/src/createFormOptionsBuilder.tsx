import type { ZodObject } from "zod";
import type { ComponentType } from "react";
import { z } from "zod";
import type {
  FormOptions,
  inferComponents,
  inferLayoutProps,
  inferParentComponents,
  inferSchema,
} from "./types/commonTypes";
import type { AnyProps } from "./types/utilityTypes";
import type { FieldComponents } from "./types/commonTypes";
import type { FormLayoutProps } from "./types/commonTypes";

import type { FieldBuilderFactory } from "./createFieldBuilder";
import type { EmptyFieldComponents } from "./types/commonTypes";
import type { FormSchema } from "./types/commonTypes";

export type FormOptionsBuilderFactory<
  StartOptions extends FormOptions,
  OutputOptions extends FormOptions,
> = (
  builder: FormOptionsBuilderFor<StartOptions>,
) => FormOptionsBuilderFor<OutputOptions>;

export type FormOptionsBuilderFor<Options extends FormOptions> =
  FormOptionsBuilder<
    inferSchema<Options>,
    inferLayoutProps<Options>,
    inferComponents<Options>,
    inferParentComponents<Options>
  >;

export class FormOptionsBuilder<
  Schema extends FormSchema,
  LayoutProps extends AnyProps,
  Components extends FieldComponents,
  ParentComponents extends FieldComponents,
> {
  private constructor(
    private options: FormOptions<
      Schema,
      LayoutProps,
      Components,
      ParentComponents
    >,
  ) {}

  schema<NewSchema extends FormSchema>(schema: NewSchema) {
    return new FormOptionsBuilder<
      NewSchema,
      LayoutProps,
      Components,
      ParentComponents
    >({
      ...this.options,
      schema,
    });
  }

  layout<NewLayoutProps extends AnyProps>(
    layout: ComponentType<FormLayoutProps<Schema, Components> & NewLayoutProps>,
  ) {
    return new FormOptionsBuilder<
      Schema,
      NewLayoutProps,
      Components,
      ParentComponents
    >({
      ...this.options,
      layout,
    });
  }

  components<NewComponents extends FieldComponents>(
    newComponents: FieldBuilderFactory<Components, NewComponents>,
  ) {
    const { components: oldComponents } = this.options;
    return new FormOptionsBuilder<
      Schema,
      LayoutProps,
      NewComponents,
      ParentComponents
    >({
      ...this.options,
      components: (builder) => newComponents(oldComponents(builder)),
    });
  }

  build() {
    return this.options;
  }

  static readonly empty = new FormOptionsBuilder({
    schema: z.object({}),
    layout: NoLayout,
    components: (_) => _,
  }) as FormOptionsBuilderFor<EmptyFormOptions>;
}

export type EmptyFormOptions = FormOptions<
  ZodObject<{}>,
  {},
  EmptyFieldComponents,
  EmptyFieldComponents
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
