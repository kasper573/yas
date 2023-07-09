import type { ComponentProps } from "react";
import { useMemo } from "react";
import type { ZodType } from "zod";
import { Store } from "@yas/store";
import type { AnyZodObject } from "zod";
import { createComponentBuilder } from "./createComponentBuilder";
import type {
  AnyProps,
  ComposableForm,
  ComposableFormOptions,
  ComposableFormProps,
  FormState,
} from "./types";
import { createFields } from "./createFields";
import { FormContext } from "./FormContext";
import type { AnyFormField } from "./types";

export function createForm<
  Schema extends AnyZodObject,
  LayoutProps extends AnyProps,
>(
  options: ComposableFormOptions<Schema, LayoutProps>,
): ComposableForm<Schema, LayoutProps> {
  const { schema, layout: Layout, components: build } = options;

  const typeComponents = new Map<ZodType, AnyFormField>();
  const fieldComponents = new Map<string, AnyFormField>();

  build(createComponentBuilder(typeComponents, fieldComponents));

  function ComposableForm({
    data = empty,
    ...layoutProps
  }: ComposableFormProps<Schema> & LayoutProps) {
    const store = useMemo(
      () => new Store<FormState<Schema>>({ data, errors: {} as never }),
      [],
    );
    const fields = useMemo(
      () => createFields(typeComponents, fieldComponents, schema),
      [schema],
    );
    return (
      <FormContext.Provider value={store}>
        <Layout
          {...(layoutProps as ComponentProps<typeof Layout>)}
          fields={fields}
        />
      </FormContext.Provider>
    );
  }

  ComposableForm.extend = <
    NewSchema extends AnyZodObject,
    NewLayoutProps extends AnyProps,
  >(
    ext: ComposableFormOptions<NewSchema, NewLayoutProps>,
  ) =>
    createForm({
      schema: ext.schema ?? schema,
      layout: ext.layout ?? Layout,
      components(builder) {
        build(builder);
        ext.components?.(builder);
        return builder;
      },
    });

  return ComposableForm as ComposableForm<Schema, LayoutProps>;
}

const empty = Object.freeze({});
