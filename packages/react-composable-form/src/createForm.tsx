import type { FormEvent } from "react";
import { useCallback, useEffect, useMemo } from "react";
import type {
  FormComponent,
  FormState,
  RCFGenerics,
} from "./types/commonTypes";
import { createFields } from "./createFields";
import { FormContext } from "./FormContext";
import type {
  FormOptionsBuilderFactory,
  EmptyFormOptionsGenerics,
  FormOptionsBuilder,
} from "./createFormOptions";
import { emptyFormOptionsBuilder } from "./createFormOptions";
import type { FormStoreFor } from "./FormStore";
import { FormStore } from "./FormStore";

export function createForm<G extends RCFGenerics>(
  reduceOptions = passThrough as FormOptionsBuilderFactory<
    EmptyFormOptionsGenerics,
    G
  >,
): FormComponent<G> {
  return createFormImpl(reduceOptions, emptyFormOptionsBuilder);
}

function createFormImpl<G extends RCFGenerics, PG extends RCFGenerics>(
  reduceOptions: FormOptionsBuilderFactory<PG, G>,
  initialOptionsBuilder: FormOptionsBuilder<PG>,
): FormComponent<G> {
  type FS = FormState<G["schema"]>;

  const optionsBuilder = reduceOptions(initialOptionsBuilder);
  const {
    schema,
    layout: Layout,
    namedComponents,
    typedComponents,
    validate,
  } = optionsBuilder.build();
  const fields = createFields({ namedComponents, typedComponents }, schema);

  const ComposableForm: FormComponent<G> = (({
    value: data = empty,
    onChange,
    onSubmit,
    ...layoutProps
  }) => {
    const store: FormStoreFor<G> = useMemo(
      () =>
        new FormStore(schema, { data, errors: {} as FS["errors"] }, validate),
      [],
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
          onSubmit={onSubmit}
          onChange={onChange}
          handleSubmit={handleSubmit}
          fields={fields}
        />
      </FormContext.Provider>
    );
  }) as FormComponent<G>;

  ComposableForm.extend = (extendOptions) =>
    createFormImpl(extendOptions, optionsBuilder);

  return ComposableForm;
}

const empty = Object.freeze({});
const passThrough = <T extends any>(value: T) => value;
