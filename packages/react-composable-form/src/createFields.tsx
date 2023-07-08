import type { AnyZodObject, ZodRawShape, ZodType } from "zod";
import { getFirstPartyType, normalizeType } from "@yas/zod";
import type {
  FormField,
  FormFieldProps,
  FormFields,
  FormFieldWithEmbeddedDefaultProps,
} from "./types";

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
      fields[capitalize(name)] = embedDefaultProps(Component, name);
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

function embedDefaultProps(
  Component: FormField,
  name: string,
): FormFieldWithEmbeddedDefaultProps {
  return function FormFieldWithDefaultProps(props: Partial<FormFieldProps>) {
    return <Component name={name} {...props} />;
  };
}

function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}
