import type { ComponentType } from "react";
import { memo, useCallback, useContext } from "react";
import type {
  FieldNames,
  FormSchema,
  inferFieldValue,
  inferValue,
  ValueType,
} from "./types/commonTypes";
import { FormContext } from "./FormContext";
import type { FormStore } from "./FormStore";
import { getTypedComponent } from "./utils/typedComponents";
import type {
  AnyRCFGenerics,
  FieldComponentRegistry,
  FieldComponentsPassedToLayout,
  FieldFor,
  FieldProps,
  MemoEqualityFn,
} from "./types/optionTypes";
import { getFirstPartyType } from "./utils/isMatchingType";
import type { FieldInfo } from "./utils/determineFields";
import { useDeferredFieldValues } from "./useDeferredFieldValues";
import { useSyncIsomorphicStore } from "./useSyncIsomorphicStore";

export function createFieldComponentFactory<G extends AnyRCFGenerics>(
  components: FieldComponentRegistry<G["components"]>,
  fieldList: FieldInfo<G["schema"]>[],
  propsAreEqual?: MemoEqualityFn,
) {
  const allFieldNames = fieldList.reduce(
    (map, field) => map.set(field.name, true),
    new Map<FieldNames<G["schema"]>, true>(),
  );
  const enhancedComponents = fieldList.reduce((map, field) => {
    const Component =
      components.named[field.name] ??
      getTypedComponent(components.typed, field.type);

    const EnhancedComponent = memo(
      enhanceFieldComponent(
        Component ?? createMissingFieldComponent(field.name, field.type),
        field.name,
        field.type,
        allFieldNames,
      ),
      propsAreEqual,
    );

    return map.set(field, EnhancedComponent);
  }, new Map<FieldInfo<G["schema"]>, FieldFor<G["schema"]>>());

  /**
   * Resolves the enhanced components that should be active for the given values.
   */
  return function resolveFieldComponents(values: inferValue<G["schema"]>) {
    const resolved = {} as Record<string, ComponentType>;
    for (const [field, component] of enhancedComponents.entries()) {
      resolved[field.componentName] = field.isActive(values)
        ? component
        : NullComponent;
    }
    return resolved as FieldComponentsPassedToLayout<
      G["schema"],
      G["components"]
    >;
  };
}

function enhanceFieldComponent<
  Schema extends FormSchema,
  FieldName extends FieldNames<Schema>,
>(
  Component: FieldFor<Schema, FieldName>,
  name: FieldName,
  type: ValueType,
  allFieldNames: Map<FieldNames<Schema>, boolean>,
) {
  type Props = FieldProps<inferFieldValue<Schema, FieldName>>;
  const required = !type.isOptional();

  return function EnhancedFormField({
    onFocus,
    onChange,
    onBlur,
    ...props
  }: Partial<Props>) {
    console.log("rendering field", name);
    const store: FormStore<Schema> = useContext(FormContext);
    const value = useSyncIsomorphicStore(
      store.subscribe,
      () => store.data[name],
    );
    const fieldValues = useDeferredFieldValues(allFieldNames, store);
    const errors = useSyncIsomorphicStore(
      store.subscribe,
      () => store.fieldErrors[name],
    );

    const changeHandler: Props["onChange"] = useCallback(
      (newValue: typeof value) => {
        store.changeField(name, newValue);
        onChange?.(newValue);
      },
      [store, onChange],
    );

    const blurHandler: Props["onBlur"] = useCallback(() => {
      store.blurField(name);
      onBlur?.();
    }, [store, onBlur]);

    const focusHandler: Props["onFocus"] = useCallback(() => {
      store.focusField(name);
      onFocus?.();
    }, [store, onFocus]);

    return (
      <Component
        name={name}
        value={value}
        errors={errors}
        required={required}
        onChange={changeHandler}
        onBlur={blurHandler}
        onFocus={focusHandler}
        fieldValues={fieldValues}
        {...props}
      />
    );
  };
}

function createMissingFieldComponent(name: string, type: ValueType) {
  const errorMessage = `No component available for field "${name}" or type ${getFirstPartyType(
    type,
  )}`;
  return function MissingFieldComponent() {
    return <span>{errorMessage}</span>;
  };
}

function NullComponent() {
  return null;
}
