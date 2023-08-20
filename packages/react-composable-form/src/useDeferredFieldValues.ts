import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import type { FieldNames, FormSchema, inferValue } from "./types/commonTypes";
import type { FormStore } from "./FormStore";

// This exists to allow fields to only subscribe to all field values when they are actually used.
// Without it, all fields would re-render whenever any field changes, which is terrible for performance.

export function useDeferredFieldValues<Schema extends FormSchema>(
  allFieldNames: Map<FieldNames<Schema>, boolean>,
  store: FormStore<Schema>,
): inferValue<Schema> {
  const subscriptions = useRef({} as Record<FieldNames<Schema>, () => void>);
  const [, forceRefresh] = useReducer((n) => n + 1, 0);

  const clearSubscriptions = useCallback(() => {
    for (const key in subscriptions.current) {
      const fieldName = key as FieldNames<Schema>;
      subscriptions.current[fieldName]?.();
      delete subscriptions.current[fieldName];
    }
  }, []);

  const valuesProxy = useMemo(() => {
    function getFieldValue(fieldName: FieldNames<Schema>) {
      return store.data[fieldName];
    }

    return new Proxy({} as inferValue<Schema>, {
      get(_, propertyName) {
        // In react development mode, all component properties are inspected,
        // which means the proxy will be triggered even if the property is not used by the form.
        // This means we must identify an intentional use of the proxy by looking for field names.
        const fieldName = propertyName as FieldNames<Schema>;
        if (!allFieldNames.get(fieldName)) {
          return _[propertyName]; // Returns standard object property values
        }

        // Subscribe to the field if not already subscribed
        if (!subscriptions.current[fieldName]) {
          subscriptions.current[fieldName] = store.subscribeToSlice(
            () => getFieldValue(fieldName),
            forceRefresh,
          );
        }

        return getFieldValue(fieldName);
      },
    });
  }, [allFieldNames, store]);

  // Clear subscriptions when unmounting
  useEffect(() => clearSubscriptions, [clearSubscriptions]);

  // Clear subscriptions before each render so that the subscription record represents all current subscriptions
  clearSubscriptions();

  return valuesProxy;
}
