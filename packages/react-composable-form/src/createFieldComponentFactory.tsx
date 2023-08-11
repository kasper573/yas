import type { ComponentProps } from "react";
import { memo, useCallback, useContext, useSyncExternalStore } from "react";
import type {
  FieldNames,
  FormSchema,
  inferValue,
  ValueType,
} from "./types/commonTypes";
import { FormContext } from "./FormContext";
import type { FormStore } from "./FormStore";
import { getTypedComponent } from "./utils/typedComponents";
import type {
  AnyRCFGenerics,
  FieldComponents,
  FieldComponentsPassedToLayout,
  FieldFor,
} from "./types/optionTypes";
import { getFirstPartyType } from "./utils/isMatchingType";
import type { FieldInfo } from "./utils/determineFieldList";

export function createFieldComponentFactory<G extends AnyRCFGenerics>(
  components: Pick<G, keyof FieldComponents>,
  fieldList: FieldInfo<G["schema"]>[],
) {
  const resolveFieldComponents = createSchemaInterpreter(
    fieldList,
    ({ componentName, fieldName, fieldType }) => {
      const Component =
        components.namedComponents[fieldName] ??
        getTypedComponent(components.typedComponents, fieldType);

      const EnhancedComponent = enhanceFormField(
        Component ?? createFallbackComponent(fieldName, fieldType),
        fieldName,
        fieldType,
      );
      return [componentName, EnhancedComponent];
    },
  );

  function createSchemaInterpreter<
    Schema extends FormSchema,
    K extends string,
    V,
  >(
    fields: FieldInfo<Schema>[],
    createEntry: <FieldName extends FieldNames<Schema>>(
      info: FieldInfo<Schema, FieldName>,
    ) => [K, V],
  ) {
    const memo = new Map<FieldInfo<Schema>, [K, V]>();
    return function getMappedValues(values: inferValue<Schema>): Record<K, V> {
      const mappedValues = {} as Record<K, V>;
      for (const field of fields) {
        let entry = memo.get(field);
        if (!entry) {
          entry = createEntry(field);
          memo.set(field, entry);
        }
        if (field.isActive(values)) {
          mappedValues[entry[0]] = entry[1];
        }
      }
      return mappedValues;
    };
  }

  return resolveFieldComponents as unknown as (
    values: inferValue<G["schema"]>,
  ) => FieldComponentsPassedToLayout<G["schema"], G>;
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
>(Component: FieldFor<Schema, FieldName>, name: FieldName, type: ValueType) {
  type Props = ComponentProps<FieldFor<Schema, FieldName>>;
  const required = !type.isOptional();
  return memo(function EnhancedFormField(props: Partial<Props>) {
    const store: FormStore<Schema> = useContext(FormContext);
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
    const focusHandler = useCallback(() => store.focusField(name), [store]);
    return (
      <Component
        name={name}
        value={value}
        errors={errors}
        required={required}
        onChange={changeHandler as Props["onChange"]}
        onBlur={blurHandler as Props["onBlur"]}
        onFocus={focusHandler as Props["onFocus"]}
        {...props}
      />
    );
  });
}
