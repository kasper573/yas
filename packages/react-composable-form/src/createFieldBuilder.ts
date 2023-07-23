import type { ComponentType } from "react";
import type {
  FieldComponents,
  FormFieldProps,
  FormValueType,
  inferFormValue,
} from "./types/commonTypes";
import type { TypeNameForType } from "./types/utilityTypes";
import { determinePrimitiveType } from "./zod/determinePrimitiveType";

export function createFieldBuilder<Components extends FieldComponents>(
  components: Components = emptyComponents as Components,
): FieldBuilder<Components> {
  const { types, fields } = components;

  // "as never" assertions to avoid generic subtype constraint errors
  // The type definition makes external use safe, and the code below is minimal enough to not be a problem

  return {
    type(type, component) {
      return createFieldBuilder({
        types: {
          ...types,
          [determinePrimitiveType(type)]: component,
        },
        fields,
      }) as never;
    },
    field(name, component) {
      return createFieldBuilder({
        types,
        fields: {
          ...fields,
          [name]: component,
        },
      }) as never;
    },
    components,
  };
}

const emptyComponents = { fields: {}, types: {} } satisfies FieldComponents;

export type FieldBuilderFactory<
  InputComponents extends FieldComponents,
  OutputComponents extends FieldComponents,
> = (builder: FieldBuilder<InputComponents>) => FieldBuilder<OutputComponents>;

export type FieldBuilder<Components extends FieldComponents> = {
  type<
    Type extends FormValueType,
    ComponentProps extends FormFieldProps<inferFormValue<Type>>,
  >(
    type: Type,
    component: ComponentType<ComponentProps>,
  ): FieldBuilder<{
    types: Components["types"] &
      Record<TypeNameForType<Type>, ComponentType<ComponentProps>>;
    fields: Components["fields"];
  }>;
  field<FieldName extends string, ComponentProps extends FormFieldProps>(
    name: FieldName,
    component: ComponentType<ComponentProps>,
  ): FieldBuilder<{
    types: Components["types"];
    fields: Components["fields"] &
      Record<FieldName, ComponentType<ComponentProps>>;
  }>;
  readonly components: Components;
};
