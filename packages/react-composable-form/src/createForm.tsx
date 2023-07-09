import { useMemo } from "react";
import type { ZodType } from "zod";
import { Store } from "@yas/store";
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

export function createForm(
  options: ComposableFormOptions = {},
): ComposableForm {
  const { schema, layout: Layout = NoLayout, components: build } = options;

  const typeComponents = new Map<ZodType, FormField>();
  const fieldComponents = new Map<string, FormField>();

  build?.(createComponentBuilder(typeComponents, fieldComponents));

  function ComposableForm({
    data = empty,
    ...layoutProps
  }: ComposableFormProps) {
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

  const extend: ComposableForm["extend"] = (extension) =>
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
