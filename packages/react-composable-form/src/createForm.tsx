import type { ComponentProps } from "react";
import { useEffect, useMemo } from "react";
import { createFieldBuilder } from "./createFieldBuilder";
import type {
  FormComponent,
  FormOptions,
  FormState,
} from "./types/commonTypes";
import { createFields } from "./createFields";
import { FormContext } from "./FormContext";
import type {
  FormOptionsBuilderFactory,
  EmptyFormOptions,
  FormOptionsBuilderFor,
} from "./createFormOptionsBuilder";
import { FormOptionsBuilder } from "./createFormOptionsBuilder";
import { Store } from "./Store";

export function createForm<Options extends FormOptions>(
  reduceOptions = passThrough as FormOptionsBuilderFactory<
    EmptyFormOptions,
    Options
  >,
): FormComponent<Options> {
  return createFormImpl(reduceOptions, FormOptionsBuilder.empty);
}

function createFormImpl<
  Options extends FormOptions,
  BaseOptions extends FormOptions,
>(
  reduceOptions: FormOptionsBuilderFactory<BaseOptions, Options>,
  initialOptionsBuilder: FormOptionsBuilderFor<BaseOptions>,
): FormComponent<Options> {
  type Schema = Options["schema"];

  const optionsBuilder = reduceOptions(initialOptionsBuilder);
  const { schema, layout: Layout, components: build } = optionsBuilder.build();
  const { components } = build(createFieldBuilder());

  const ComposableForm: FormComponent<Options> = (({
    value: data = empty,
    onChange,
    ...layoutProps
  }) => {
    const store = useMemo(
      () => new Store<FormState<Schema>>({ data, errors: {} as never }),
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
        <Layout
          {...(layoutProps as ComponentProps<typeof Layout>)}
          onChange={onChange}
          fields={fields}
        />
      </FormContext.Provider>
    );
  }) as FormComponent<Options>;

  ComposableForm.extend = (extendOptions) =>
    createFormImpl(extendOptions, optionsBuilder);

  return ComposableForm;
}

const empty = Object.freeze({});
const passThrough = <T extends any>(value: T) => value;
