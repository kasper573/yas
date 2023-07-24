import type { ZodRawShape } from "zod";
import type { ComponentProps, ComponentType } from "react";
import { memo, useCallback, useContext, useSyncExternalStore } from "react";
import type {
  FieldComponents,
  FieldComponentsPassedToLayout,
  FieldNames,
  FormFieldFor,
  FormSchema,
  FormValueType,
} from "./types/commonTypes";
import { FormContext } from "./FormContext";
import type { FormStore } from "./FormStore";
import { describeType, getTypedComponent } from "./typedComponents";

export function createFields<
  Schema extends FormSchema,
  Components extends FieldComponents,
>(
  components: Components,
  schema: Schema,
): FieldComponentsPassedToLayout<Schema, Components> {
  return Object.entries(schema.shape as ZodRawShape).reduce(
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

function createFallbackComponent(name: string, type: FormValueType) {
  // Missing field component errors are thrown when the component is rendered, not when the form is built.
  // This is to allow partially complete forms, used to extend into the final form that is actually rendered.
  return function FallbackFieldComponent() {
    throw new Error(
      `No component available for field "${name}" or type ${describeType(
        type,
      )}`,
    );
  };
}

function enhanceFormField<
  Schema extends FormSchema,
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
      () => store.state.errors[name] ?? emptyArrayAsT(),
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
        onChange={changeHandler as Props["onChange"]}
        onBlur={blurHandler as Props["onBlur"]}
        {...props}
      />
    );
  });
}

const emptyArray = Object.freeze([]);
function emptyArrayAsT<T>(): T[] {
  return emptyArray as unknown as T[];
}

function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}
