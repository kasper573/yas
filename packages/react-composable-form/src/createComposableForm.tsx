import { useMemo } from "react";
import type { ZodType } from "zod";
import { mergeOptions } from "./mergeOptions";
import { createBuilder } from "./createBuilder";
import type {
  ComposableForm,
  ComposableFormOptions,
  ComposableFormProps,
  FormField,
} from "./types";
import { deriveFormFields } from "./deriveFormFields";
import type { FormLayoutProps } from "./types";

export function createComposableForm(
  options: ComposableFormOptions = {},
): ComposableForm {
  const {
    schema: defaultSchema,
    layout: DefaultLayout = NoLayout,
    components: build,
  } = options;

  const typeComponents = new Map<ZodType, FormField>();
  const fieldComponents = new Map<string, FormField>();

  build?.(createBuilder(typeComponents, fieldComponents));

  function ComposableForm({
    schema = defaultSchema,
    children: inlineLayout,
  }: ComposableFormProps) {
    const fields = useMemo(
      () => deriveFormFields(typeComponents, fieldComponents, schema),
      [schema],
    );
    return inlineLayout ? (
      inlineLayout({ fields })
    ) : (
      <DefaultLayout fields={fields} />
    );
  }

  ComposableForm.extend = (extension: ComposableFormOptions): ComposableForm =>
    createComposableForm(mergeOptions(options, extension));

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
