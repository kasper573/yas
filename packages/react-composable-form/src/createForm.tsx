import { useEffect, useMemo } from "react";
import { createFieldBuilder } from "./createFieldBuilder";
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
} from "./createFormOptionsBuilder";
import { emptyFormOptionsBuilder } from "./createFormOptionsBuilder";
import { Store } from "./Store";

export function createForm<G extends RCFGenerics>(
  reduceOptions: FormOptionsBuilderFactory<
    EmptyFormOptionsGenerics,
    G
  > = passThrough,
): FormComponent<G> {
  return createFormImpl(reduceOptions, emptyFormOptionsBuilder);
}

function createFormImpl<G extends RCFGenerics, PG extends RCFGenerics>(
  reduceOptions: FormOptionsBuilderFactory<PG, G>,
  initialOptionsBuilder: FormOptionsBuilder<PG>,
): FormComponent<G> {
  const optionsBuilder = reduceOptions(initialOptionsBuilder);
  const { schema, layout: Layout, components: build } = optionsBuilder.build();
  const { components } = build(createFieldBuilder());

  const ComposableForm: FormComponent<G> = (({
    value: data = empty,
    onChange,
    ...layoutProps
  }) => {
    const store = useMemo(
      () => new Store<FormState<G["schema"]>>({ data, errors: {} as never }),
      [],
    );

    useEffect(
      () => store.subscribe((state) => onChange?.(state.data)),
      [store, onChange],
    );

    useEffect(
      () => store.mutate((state) => (state.data = data)),
      [data, store],
    );

    const fields = useMemo(() => createFields(components, schema), [schema]);
    return (
      <FormContext.Provider value={store}>
        <Layout {...layoutProps} onChange={onChange} fields={fields} />
      </FormContext.Provider>
    );
  }) as FormComponent<G>;

  ComposableForm.extend = (extendOptions) =>
    createFormImpl(extendOptions, optionsBuilder);

  return ComposableForm;
}

const empty = Object.freeze({});
const passThrough = <T extends any>(value: T) => value;
