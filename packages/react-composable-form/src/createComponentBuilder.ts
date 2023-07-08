import type { ZodType } from "zod";
import type { FormComponentBuilder, FormField } from "./types";

export function createComponentBuilder(
  typeMap: Map<ZodType, FormField>,
  fieldMap: Map<string, FormField>,
): FormComponentBuilder {
  const builder: FormComponentBuilder = {
    type(type, component) {
      typeMap.set(type, component);
      return builder;
    },
    field(name, component) {
      fieldMap.set(name, component);
      return builder;
    },
  };
  return builder;
}
