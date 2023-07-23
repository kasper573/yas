import type { ZodObject } from "zod";
import type { ComponentType } from "react";
import { z } from "zod";
import type {
  FormOptions,
  inferComponents,
  inferLayoutProps,
  inferSchema,
} from "./types/commonTypes";
import type { AnyProps } from "./types/utilityTypes";
import type { FieldComponents } from "./types/commonTypes";
import type { FormLayoutProps } from "./types/commonTypes";

import type { FieldBuilderFactory } from "./createFieldBuilder";
import type { EmptyFieldComponents } from "./types/commonTypes";
import type { FormSchema } from "./types/commonTypes";

export type FormOptionsBuilderFactory<
  Input extends FormOptionsBuilder = FormOptionsBuilder,
  Output extends FormOptionsBuilder = FormOptionsBuilder,
> = (input: Input) => Output;

export type inferFactoryInput<T> = T extends FormOptionsBuilderFactory<
  infer Input,
  infer _
>
  ? Input
  : never;

export type inferFactoryOutput<T> = T extends FormOptionsBuilderFactory<
  infer _,
  infer Output
>
  ? Output
  : never;

export type inferFormOptions<T extends FormOptionsBuilder> = ReturnType<
  T["build"]
>;

export type inferFormOutputOptions<T> = inferFormOptions<inferFactoryOutput<T>>;

export type FormOptionsBuilderFor<Options extends FormOptions> =
  FormOptionsBuilder<
    inferSchema<Options>,
    inferLayoutProps<Options>,
    inferComponents<Options>
  >;

export class FormOptionsBuilder<
  Schema extends FormSchema = any,
  LayoutProps extends AnyProps = any,
  Components extends FieldComponents = any,
> {
  constructor(private options: FormOptions<Schema, LayoutProps, Components>) {}

  schema<NewSchema extends FormSchema>(schema: NewSchema) {
    return new FormOptionsBuilder<NewSchema, LayoutProps, Components>({
      ...this.options,
      schema,
    });
  }

  layout<NewLayoutProps extends AnyProps>(
    layout: ComponentType<FormLayoutProps<Schema, Components> & NewLayoutProps>,
  ) {
    return new FormOptionsBuilder<Schema, NewLayoutProps, Components>({
      ...this.options,
      layout,
    });
  }

  components<NewComponents extends FieldComponents>(
    newComponents: FieldBuilderFactory<Components, NewComponents>,
  ) {
    const { components: oldComponents } = this.options;
    return new FormOptionsBuilder<Schema, LayoutProps, NewComponents>({
      ...this.options,
      components: (builder) => newComponents(oldComponents(builder)),
    });
  }

  build() {
    return this.options;
  }
}

export const emptyFormOptionsBuilder = new FormOptionsBuilder<
  ZodObject<{}>,
  {},
  EmptyFieldComponents
>({
  schema: z.object({}),
  layout: NoLayout,
  components: (_) => _,
});

export type EmptyFormOptions = inferFormOptions<typeof emptyFormOptionsBuilder>;

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
