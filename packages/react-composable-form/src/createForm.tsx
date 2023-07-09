import { useMemo } from "react";
import type { ZodType } from "zod";
import { Store } from "@yas/store";
import type { AnyZodObject } from "zod";
import { mergeOptions } from "./mergeOptions";
import { createComponentBuilder } from "./createComponentBuilder";
import type {
  ComposableForm,
  ComposableFormOptions,
  ComposableFormProps,
  FormField,
  FormState,
} from "./types";
import { createFields } from "./createFields";
import type { FormLayoutProps } from "./types";
import { FormContext } from "./FormContext";
import type { FormLayout } from "./types";

export function createForm<
  Schema extends AnyZodObject,
  Layout extends FormLayout,
>(
  options: ComposableFormOptions<Schema, Layout> = {},
): ComposableForm<Schema, Layout> {
  const { schema, layout: Layout = NoLayout, components: build } = options;

  const typeComponents = new Map<ZodType, FormField>();
  const fieldComponents = new Map<string, FormField>();

  build?.(createComponentBuilder(typeComponents, fieldComponents));

  function ComposableForm({
    data = empty,
    ...layoutProps
  }: ComposableFormProps<Schema>) {
    const store = useMemo(() => new Store<FormState>({ data, errors: {} }), []);
    const fields = useMemo(
      () => createFields(typeComponents, fieldComponents, schema),
      [schema],
    );
    return (
      <FormContext.Provider value={store}>
        <Layout fields={fields} {...layoutProps} />
      </FormContext.Provider>
    );
  }

  const extend: ComposableForm<Schema, Layout>["extend"] = (extension) =>
    createForm(mergeOptions(options, extension));

  ComposableForm.extend = extend;

  return ComposableForm;
}

function NoLayout({ fields }: FormLayoutProps) {
  return (
    <>
      {Object.values(fields).map((Component, index) => (
        <Component key={index} />
      ))}
    </>
  );
}

const empty = Object.freeze({});
