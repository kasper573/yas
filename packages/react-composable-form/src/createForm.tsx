import type { FormEvent, ComponentType } from "react";
import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";
import type { inferValue } from "./types/commonTypes";
import { createFields } from "./createFields";
import { FormContext } from "./FormContext";
import type {
  EmptyFormOptionsGenerics,
  FormOptionsBuilder,
  FormOptionsBuilderFactory,
} from "./FormOptionsBuilder";
import { emptyFormOptionsBuilder } from "./FormOptionsBuilder";
import type { FormStoreFor } from "./FormStore";
import { FormStore } from "./FormStore";
import type { FormLayoutProps, RCFGenerics } from "./types/optionTypes";

export interface FormProps<Value> {
  value?: Value;
  onChange?: (newValue: Value) => unknown;
  onSubmit?: (value: Value) => unknown;
}

export type inferFormValue<T> = T extends FormComponent<infer G>
  ? inferValue<G["schema"]>
  : never;

export type FormComponent<G extends RCFGenerics> = ComponentType<
  FormProps<inferValue<G["schema"]>> &
    Omit<G["layoutProps"], keyof FormLayoutProps>
> & {
  extend<NewG extends RCFGenerics>(
    options: FormOptionsBuilderFactory<G, NewG>,
  ): FormComponent<NewG>;
};

export function createForm<G extends RCFGenerics>(
  reduceOptions = passThrough as FormOptionsBuilderFactory<
    EmptyFormOptionsGenerics,
    G
  >,
): FormComponent<G> {
  return createFormImpl(reduceOptions(emptyFormOptionsBuilder));
}

function createFormImpl<G extends RCFGenerics>(
  options: FormOptionsBuilder<G>,
): FormComponent<G> {
  const {
    schema,
    layout: Layout,
    namedComponents,
    typedComponents,
    mode,
  } = options.build();

  const fields = createFields({ namedComponents, typedComponents }, schema);

  const ComposableForm: FormComponent<G> = (({
    defaultValue,
    value: data = defaultValue ?? empty,
    onChange,
    onSubmit,
    ...layoutProps
  }) => {
    if (defaultValue !== undefined && data !== defaultValue) {
      throw new Error(
        "Cannot set both defaultValue and value, please use one or the other",
      );
    }

    const store: FormStoreFor<G> = useMemo(
      () =>
        new FormStore(
          schema,
          { data, generalErrors: [], fieldErrors: {} },
          mode,
        ),
      [],
    );

    const generalErrors = useSyncExternalStore(
      store.subscribe,
      () => store.state.generalErrors,
    );

    const fieldErrors = useSyncExternalStore(
      store.subscribe,
      () => store.state.fieldErrors,
    );

    useEffect(
      () => store.subscribe(() => onChange?.(store.state.data)),
      [store, onChange],
    );

    useEffect(() => store.resetData(data), [data, store]);

    const handleSubmit = useCallback(
      (e?: FormEvent) => {
        e?.preventDefault();
        store.handleSubmit();
        if (store.isValid) {
          onSubmit?.(store.state.data);
        }
      },
      [store],
    );

    return (
      <FormContext.Provider value={store}>
        <Layout
          {...layoutProps}
          generalErrors={generalErrors}
          fieldErrors={fieldErrors}
          onSubmit={onSubmit}
          onChange={onChange}
          handleSubmit={handleSubmit}
          fields={fields}
        />
      </FormContext.Provider>
    );
  }) as FormComponent<G>;

  ComposableForm.extend = (extend) => createFormImpl(extend(options));

  return ComposableForm;
}

const empty = Object.freeze({});
const passThrough = <T extends any>(value: T) => value;
