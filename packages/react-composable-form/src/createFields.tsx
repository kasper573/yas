import type { AnyZodObject, ZodRawShape, ZodType } from "zod";
import { getFirstPartyType, normalizeType } from "@yas/zod";
import { memo, useCallback, useContext, useSyncExternalStore } from "react";
import type {
  FormField,
  FormFieldProps,
  FormFields,
  FormFieldWithDefaultProps,
} from "./types";
import { FormContext } from "./FormContext";

export function createFields(
  typeMap: Map<ZodType, FormField>,
  fieldMap: Map<string, FormField>,
  schema?: AnyZodObject,
): FormFields {
  return Object.entries((schema?.shape ?? {}) as ZodRawShape).reduce(
    (fields, [name, type]) => {
      const Component = fieldMap.get(name) ?? findMatchingType(typeMap, type);
      if (!Component) {
        throw new Error(
          `No component available for field "${name}" or type ${getFirstPartyType(
            type,
          )}`,
        );
      }
      fields[capitalize(name)] = enhanceFormField(Component, name);
      return fields;
    },
    {} as FormFields,
  );
}

function findMatchingType(map: Map<ZodType, FormField>, type: ZodType) {
  for (const [candidate, Component] of map.entries()) {
    if (isMatchingType(candidate, type)) {
      return Component;
    }
  }
}

function isMatchingType(a: ZodType, b: ZodType): boolean {
  if (a === b) {
    return true;
  }
  const n1 = normalizeType(a);
  const n2 = normalizeType(b);
  if (n1 === n2) {
    return true;
  }
  return getFirstPartyType(n1) === getFirstPartyType(n2);
}

function enhanceFormField(
  Component: FormField,
  name: string,
): FormFieldWithDefaultProps {
  function EnhancedFormField(props: Partial<FormFieldProps>) {
    const store = useContext(FormContext);
    const value = useSyncExternalStore(
      store.subscribe,
      () => store.state.data[name],
    );
    const errors = useSyncExternalStore(
      store.subscribe,
      () => store.state.errors[name],
    );
    const changeHandler = useCallback(
      (value: unknown) => {
        store.mutate((state) => {
          state.data[name] = value;
        });
      },
      [store],
    );
    return (
      <Component
        name={name}
        value={value}
        errors={errors}
        onChange={changeHandler}
        {...props}
      />
    );
  }
  return memo(EnhancedFormField);
}

function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}
