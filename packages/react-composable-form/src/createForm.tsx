import { useMemo } from "react";
import type { ZodType } from "zod";
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
import { Store } from "./Store";

export function createForm(
  options: ComposableFormOptions = {},
): ComposableForm {
  const {
    schema: defaultSchema,
    layout: DefaultLayout = NoLayout,
    components: build,
  } = options;

  const typeComponents = new Map<ZodType, FormField>();
  const fieldComponents = new Map<string, FormField>();

  build?.(createComponentBuilder(typeComponents, fieldComponents));

  function ComposableForm({
    schema = defaultSchema,
    children: inlineLayout,
    data = empty,
  }: ComposableFormProps) {
    const store = useMemo(() => new Store<FormState>({ data, errors: {} }), []);
    const fields = useMemo(
      () => createFields(typeComponents, fieldComponents, schema),
      [schema],
    );
    return (
      <FormContext.Provider value={store}>
        {inlineLayout ? (
          inlineLayout({ fields })
        ) : (
          <DefaultLayout fields={fields} />
        )}
      </FormContext.Provider>
    );
  }

  ComposableForm.extend = (extension: ComposableFormOptions): ComposableForm =>
    createForm(mergeOptions(options, extension));

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

const empty = {};
