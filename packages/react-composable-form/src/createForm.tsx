import type { ComponentProps } from "react";
import { useMemo } from "react";
import type { ZodType } from "zod";
import { Store } from "@yas/store";
import type { AnyZodObject } from "zod";
import { mergeOptions } from "./mergeOptions";
import { createComponentBuilder } from "./createComponentBuilder";
import type {
  AnyProps,
  ComposableForm,
  ComposableFormOptions,
  ComposableFormProps,
  FormField,
  FormState,
} from "./types";
import { createFields } from "./createFields";
import { FormContext } from "./FormContext";

export function createForm<
  Schema extends AnyZodObject,
  LayoutProps extends AnyProps,
>(
  options: ComposableFormOptions<Schema, LayoutProps>,
): ComposableForm<Schema, LayoutProps> {
  const { schema, layout: Layout, components: build } = options;

  const typeComponents = new Map<ZodType, FormField>();
  const fieldComponents = new Map<string, FormField>();

  build?.(createComponentBuilder(typeComponents, fieldComponents));

  function ComposableForm({
    data = empty,
    ...layoutProps
  }: ComposableFormProps<Schema, LayoutProps>) {
    const store = useMemo(() => new Store<FormState>({ data, errors: {} }), []);
    const fields = useMemo(
      () => createFields(typeComponents, fieldComponents, schema),
      [schema],
    );
    return (
      <FormContext.Provider value={store}>
        <Layout
          // Unfortunate assertion, but couldn't find a way to avoid it
          {...(layoutProps as ComponentProps<typeof Layout>)}
          fields={fields}
        />
      </FormContext.Provider>
    );
  }

  const extend: ComposableForm<Schema, LayoutProps>["extend"] = (extension) =>
    createForm(mergeOptions(options, extension));

  ComposableForm.extend = extend;

  return ComposableForm;
}

const empty = Object.freeze({});
