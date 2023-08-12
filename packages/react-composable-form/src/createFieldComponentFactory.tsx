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
import type { FieldInfo } from "./utils/determineFields";

export function createFieldComponentFactory<G extends AnyRCFGenerics>(
  components: Pick<G, keyof FieldComponents>,
  fieldList: FieldInfo<G["schema"]>[],
) {
  const enhancedComponents = fieldList.reduce((map, field) => {
    const Component =
      components.namedComponents[field.name] ??
      getTypedComponent(components.typedComponents, field.type);

    const EnhancedComponent = enhanceFieldComponent(
      Component ?? createMissingFieldComponent(field.name, field.type),
      field.name,
      field.type,
    );

    return map.set(field, EnhancedComponent);
  }, new Map<FieldInfo<G["schema"]>, FieldFor<G["schema"]>>());

  /**
   * Resolves the enhanced components that should be active for the given values.
   */
  return function resolveFieldComponents(values: inferValue<G["schema"]>) {
    const resolved = {} as FieldComponentsPassedToLayout<G["schema"], G>;
    for (const [field, component] of enhancedComponents.entries()) {
      // @ts-expect-error Typescript won't allow using Capitalized as key, which is silly, so we ignore it.
      resolved[field.componentName] = field.isActive(values)
        ? component
        : NullComponent;
    }
    return resolved;
  };
}

function enhanceFieldComponent<
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

    const changeHandler: Props["onChange"] = useCallback(
      (newValue: typeof value) => {
        store.changeField(name, newValue);
      },
      [store],
    );

    const blurHandler: Props["onBlur"] = useCallback(
      () => store.blurField(name),
      [store],
    );

    const focusHandler: Props["onFocus"] = useCallback(
      () => store.focusField(name),
      [store],
    );

    return (
      <Component
        name={name}
        value={value}
        errors={errors}
        required={required}
        onChange={changeHandler}
        onBlur={blurHandler}
        onFocus={focusHandler}
        {...props}
      />
    );
  });
}

function createMissingFieldComponent(name: string, type: ValueType) {
  // Missing field component errors are thrown when the component is rendered, not when the form is built.
  // This is to allow partially complete forms, used to extend into the final form that is actually rendered.
  return function MissingFieldComponent() {
    throw new Error(
      `No component available for field "${name}" or type ${getFirstPartyType(
        type,
      )}`,
    );
  };
}

function NullComponent() {
  return null;
}
