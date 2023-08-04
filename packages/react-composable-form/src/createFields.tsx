import type { ComponentProps, ComponentType } from "react";
import {
  memo,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type { FieldNames, FormSchema, ValueType } from "./types/commonTypes";
import { FormContext } from "./FormContext";
import type { FormStore } from "./FormStore";
import { getTypedComponent } from "./utils/typedComponents";
import type {
  FieldComponents,
  FieldComponentsPassedToLayout,
  FieldFor,
} from "./types/optionTypes";
import { getFirstPartyType } from "./utils/isMatchingType";
import { getShapeFromSchema } from "./utils/getShapeFromSchema";

export function createFields<
  Schema extends FormSchema,
  Components extends FieldComponents,
>(
  components: Components,
  schema: Schema,
): FieldComponentsPassedToLayout<Schema, Components> {
  return Object.entries(getShapeFromSchema(schema)).reduce(
    (fields, [name, type]) => {
      const Component =
        components.namedComponents[name] ??
        getTypedComponent(components.typedComponents, type);

      (fields as Record<string, ComponentType>)[capitalize(name)] =
        enhanceFormField(
          Component ?? createFallbackComponent(name, type),
          name as FieldNames<Schema>,
        );
      return fields;
    },
    {} as FieldComponentsPassedToLayout<Schema, Components>,
  );
}

function createFallbackComponent(name: string, type: ValueType) {
  // Missing field component errors are thrown when the component is rendered, not when the form is built.
  // This is to allow partially complete forms, used to extend into the final form that is actually rendered.
  return function FallbackFieldComponent() {
    throw new Error(
      `No component available for field "${name}" or type ${getFirstPartyType(
        type,
      )}`,
    );
  };
}

function enhanceFormField<
  Schema extends FormSchema,
  FieldName extends FieldNames<Schema>,
>(Component: FieldFor<Schema, FieldName>, name: FieldName) {
  type Props = ComponentProps<FieldFor<Schema, FieldName>>;
  return memo(function EnhancedFormField(props: Partial<Props>) {
    const store: FormStore<Schema> = useContext(FormContext);
    const required = useMemo(
      () => !getShapeFromSchema(store.schema)[name].isOptional(),
      [store],
    );
    const value = useSyncExternalStore(store.subscribe, () => store.data[name]);
    const errors = useSyncExternalStore(
      store.subscribe,
      () => store.fieldErrors[name],
    );
    const changeHandler = useCallback(
      (newValue: typeof value) => {
        store.changeField(name, newValue);
      },
      [store],
    );
    const blurHandler = useCallback(() => store.blurField(name), [store]);
    return (
      <Component
        name={name}
        value={value}
        errors={errors}
        required={required}
        onChange={changeHandler as Props["onChange"]}
        onBlur={blurHandler as Props["onBlur"]}
        {...props}
      />
    );
  });
}

function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}
