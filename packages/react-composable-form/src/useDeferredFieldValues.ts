import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import type { FieldNames, FormSchema, inferValue } from "./types/commonTypes";
import type { FormStore } from "./FormStore";

// This exists to allow fields to only subscribe to all field values when they are actually used.
// Without it, all fields would re-render whenever any field changes, which is terrible for performance.

export function useDeferredFieldValues<Schema extends FormSchema>(
  allFieldNames: Map<FieldNames<Schema>, boolean>,
  store: FormStore<Schema>,
): inferValue<Schema> {
  const [, forceRefresh] = useReducer((n) => n + 1, 0);
  const [touchedFields] = useState(
    () => new Map<FieldNames<Schema>, (() => void) | undefined>(),
  );

  const unsubscribeAll = useCallback(
    ({ clearTouched }: { clearTouched?: boolean } = {}) => {
      for (const [fieldName, unsub] of touchedFields.entries()) {
        unsub?.();
        if (clearTouched) {
          touchedFields.delete(fieldName);
        } else {
          touchedFields.set(fieldName, undefined);
        }
      }
    },
    [touchedFields],
  );

  const valuesProxy = useMemo(
    () =>
      new Proxy({} as Record<PropertyKey, unknown>, {
        get(_, propertyName) {
          // In react development mode, all component properties are inspected,
          // which means the proxy will be triggered even if the property is not used by the form.
          // This means we must identify an intentional use of the proxy by looking for field names.
          const fieldName = propertyName as FieldNames<Schema>;
          if (!allFieldNames.get(fieldName)) {
            return _[propertyName]; // Returns standard object property values
          }

          // Subscribe to the field value if not already subscribed
          const subscription =
            touchedFields.get(fieldName) ??
            store.subscribeToSlice(() => store.data[fieldName], forceRefresh);

          // Mark field as touched and remember subscription
          touchedFields.set(fieldName, subscription);

          return store.data[fieldName];
        },
      }),
    [allFieldNames, store],
  );

  useEffect(() => {
    // Resubscribe to any touched fields when mounting.
    // This is only utilized when react triggers re-rendering during strict mode
    for (const [fieldName, isSubbed] of touchedFields.entries()) {
      if (!isSubbed) {
        touchedFields.set(
          fieldName,
          store.subscribeToSlice(() => store.data[fieldName], forceRefresh),
        );
      }
    }

    // Clear subscriptions when unmounting
    return () => unsubscribeAll();
  }, [unsubscribeAll, store, touchedFields]);

  // Clear subscriptions before each render so that the latest render controls which fields to subscribe to
  unsubscribeAll({ clearTouched: true });

  return valuesProxy;
}
