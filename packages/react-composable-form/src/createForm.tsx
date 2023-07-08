import { useMemo } from "react";
import type { ZodType } from "zod";
import { mergeOptions } from "./mergeOptions";
import { createComponentBuilder } from "./createComponentBuilder";
import type {
  ComposableForm,
  ComposableFormOptions,
  ComposableFormProps,
  FormField,
} from "./types";
import { createFields } from "./createFields";
import type { FormLayoutProps } from "./types";

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
  }: ComposableFormProps) {
    const fields = useMemo(
      () => createFields(typeComponents, fieldComponents, schema),
      [schema],
    );
    return inlineLayout ? (
      inlineLayout({ fields })
    ) : (
      <DefaultLayout fields={fields} />
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
