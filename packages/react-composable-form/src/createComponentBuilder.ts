import type { ZodType } from "zod";
import type { AnyFormField, FormComponentBuilder } from "./types";

export function createComponentBuilder(
  typeMap: Map<ZodType, AnyFormField>,
  fieldMap: Map<string, AnyFormField>,
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
