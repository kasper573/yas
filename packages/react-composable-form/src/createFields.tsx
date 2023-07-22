import type { AnyZodObject, ZodRawShape, ZodType } from "zod";
import { getFirstPartyType, normalizeType } from "@yas/zod";
import type { ComponentProps, ComponentType } from "react";
import { memo, useCallback, useContext, useSyncExternalStore } from "react";
import type {
  FieldComponentsPassedToLayout,
  FormStore,
  FormFieldFor,
  FieldComponents,
} from "./types/commonTypes";
import { FormContext } from "./FormContext";
import type { FieldNames } from "./types/commonTypes";
import { determinePrimitiveType } from "./createFieldBuilder";

export function createFields<
  Schema extends AnyZodObject,
  Components extends FieldComponents,
>(
  components: Components,
  schema: Schema,
): FieldComponentsPassedToLayout<Schema, Components> {
  return Object.entries(schema.shape as ZodRawShape).reduce(
    (fields, [name, type]) => {
      const Component =
        components.fields[name] ??
        components.types[determinePrimitiveType(type)];
      if (!Component) {
        throw new Error(
          `No component available for field "${name}" or type ${getFirstPartyType(
            type,
          )}`,
        );
      }
      (fields as Record<string, ComponentType>)[capitalize(name)] =
        enhanceFormField(Component, name as FieldNames<Schema>);
      return fields;
    },
    {} as FieldComponentsPassedToLayout<Schema, FieldComponents>,
  );
}

function enhanceFormField<
  Schema extends AnyZodObject,
  FieldName extends FieldNames<Schema>,
>(Component: FormFieldFor<Schema, FieldName>, name: FieldName) {
  type Props = ComponentProps<FormFieldFor<Schema, FieldName>>;
  return memo(function EnhancedFormField(props: Partial<Props>) {
    const store: FormStore<Schema> = useContext(FormContext);
    const value = useSyncExternalStore(
      store.subscribe,
      () => store.state.data[name],
    );
    const errors = useSyncExternalStore(
      store.subscribe,
      () => store.state.errors[name],
    );
    const changeHandler = useCallback(
      (newValue: typeof value) => {
        store.mutate((state) => {
          state.data[name] = newValue;
        });
      },
      [store],
    );
    return (
      <Component
        name={name}
        value={value}
        errors={errors}
        onChange={changeHandler as Props["onChange"]}
        {...props}
      />
    );
  });
}

function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
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
