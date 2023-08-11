import type { FormEvent, ComponentType } from "react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type { FormValidationMode, inferValue } from "./types/commonTypes";
import { createFieldComponentFactory } from "./createFieldComponentFactory";
import { FormContext } from "./FormContext";
import type {
  EmptyFormOptionsGenerics,
  FormOptionsBuilder,
  FormOptionsBuilderFactory,
} from "./FormOptionsBuilder";
import { emptyFormOptionsBuilder } from "./FormOptionsBuilder";
import type { FormStoreFor } from "./FormStore";
import { FormStore } from "./FormStore";
import type { AnyRCFGenerics, FormLayoutProps } from "./types/optionTypes";
import type { FieldInfo } from "./utils/determineFieldList";
import { determineFieldList } from "./utils/determineFieldList";
import type { AnyComponent } from "./types/utilityTypes";

export interface FormProps<G extends AnyRCFGenerics> {
  value?: inferValue<G["schema"]>;
  defaultValue?: inferValue<G["schema"]>;
  onChange?: (newValue: inferValue<G["schema"]>) => unknown;
  onSubmit?: (value: inferValue<G["schema"]>) => unknown;
  errors?: G["customExternalError"] | null; // null because some libraries like react-query use null for empty
  validateOn?: readonly FormValidationMode[];
}

export type inferFormValue<T> = T extends FormComponent<infer G>
  ? inferValue<G["schema"]>
  : never;

export type FormComponent<G extends AnyRCFGenerics = AnyRCFGenerics> =
  ComponentType<
    FormProps<G> & Omit<G["layoutProps"], keyof FormLayoutProps>
  > & {
    extend<NewG extends AnyRCFGenerics>(
      options: FormOptionsBuilderFactory<G, NewG>,
    ): FormComponent<NewG>;
  };

export function createForm<G extends AnyRCFGenerics = EmptyFormOptionsGenerics>(
  reduceOptions = passThrough as FormOptionsBuilderFactory<
    EmptyFormOptionsGenerics,
    G
  >,
): FormComponent<G> {
  return createFormImpl(reduceOptions(emptyFormOptionsBuilder));
}

function createFormImpl<G extends AnyRCFGenerics>(
  optionsBuilder: FormOptionsBuilder<G>,
): FormComponent<G> {
  const {
    schema,
    layout: Layout,
    namedComponents,
    typedComponents,
    externalErrorParser,
    modes: prebuiltModes,
    fieldSelector: selectFields,
  } = optionsBuilder.build();

  const fieldList = determineFieldList(schema);
  const resolveFieldComponents = createFieldComponentFactory(
    { namedComponents, typedComponents },
    fieldList,
  );

  const ComposableForm: FormComponent<G> = ((props) => {
    if ("value" in props && "defaultValue" in props) {
      throw new Error(
        "Cannot set both defaultValue and value, please use one or the other",
      );
    }

    const isControlledComponent = "value" in props;

    const {
      defaultValue,
      value: data = defaultValue ?? emptyObject,
      onChange,
      onSubmit,
      errors: externalErrors,
      validateOn: modes = prebuiltModes,
      ...layoutProps
    } = props;

    const [store] = useState(
      (): FormStoreFor<G> => new FormStore(schema, data, modes, fieldList),
    );

    const fieldValues = useSyncExternalStore(store.subscribe, () => store.data);

    const selectedFields = useMemo(
      () =>
        nullComponentFallbacks(
          selectFields(resolveFieldComponents(fieldValues), fieldValues),
          fieldList,
        ),
      [fieldValues],
    );

    const generalErrors = useSyncExternalStore(
      store.subscribe,
      () => store.generalErrors,
    );

    const fieldErrors = useSyncExternalStore(
      store.subscribe,
      () => store.fieldErrors,
    );

    useEffect(
      () => store.subscribeToSlice(() => store.data, onChange),
      [store, onChange],
    );

    useEffect(
      () => store.setExternalErrors(externalErrorParser(externalErrors)),
      [store, externalErrors],
    );

    useEffect(() => {
      if (isControlledComponent) {
        store.setData(data);
      }
    }, [data, store, isControlledComponent]);

    useEffect(() => store.setModes(modes), [modes]);

    const handleSubmit = useCallback(
      (e?: FormEvent) => {
        e?.preventDefault();
        store.handleSubmit();
        if (store.isLocallyValid) {
          onSubmit?.(store.data);
        }
      },
      [store],
    );

    const handleReset = useCallback(() => store.reset(), [store]);

    return (
      <FormContext.Provider value={store}>
        <Layout
          {...layoutProps}
          generalErrors={generalErrors}
          fieldErrors={fieldErrors}
          fieldValues={fieldValues}
          onSubmit={onSubmit}
          onChange={onChange}
          handleSubmit={handleSubmit}
          reset={handleReset}
          fields={selectedFields}
        />
      </FormContext.Provider>
    );
  }) as FormComponent<G>;

  ComposableForm.extend = (extend) => createFormImpl(extend(optionsBuilder));

  return ComposableForm;
}

const emptyObject = Object.freeze({});
const passThrough = <T extends any>(value: T) => value;

function nullComponentFallbacks<
  T extends Record<string, AnyComponent | undefined>,
>(record: T, fieldList: FieldInfo[]) {
  return Object.fromEntries(
    fieldList.map((info) => [
      info.componentName,
      record[info.componentName] ?? NullComponent,
    ]),
  ) as {
    [K in keyof T]: Exclude<T[K], null | undefined>;
  };
}

function NullComponent() {
  return null;
}
