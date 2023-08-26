import type { FormEvent, ComponentType } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { FormValidationMode, inferValue } from "./types/commonTypes";
import { createFieldComponentFactory } from "./createFieldComponentFactory";
import { FormContext } from "./FormContext";
import type {
  EmptyFormOptionsGenerics,
  FormOptionsBuilderFactory,
} from "./FormOptionsBuilder";
import {
  emptyFormOptionsBuilder,
  FormOptionsBuilder,
} from "./FormOptionsBuilder";
import type { FormStoreFor } from "./FormStore";
import { FormStore } from "./FormStore";
import type {
  AnyFormLayoutProps,
  AnyRCFGenerics,
  FormOptions,
} from "./types/optionTypes";
import { determineFields } from "./utils/determineFields";
import { useSyncIsomorphicStore } from "./useSyncIsomorphicStore";

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
    FormProps<G> & Omit<G["layoutProps"], keyof AnyFormLayoutProps>
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
  return createFormForOptions(
    FormOptionsBuilder.build(reduceOptions(emptyFormOptionsBuilder)),
  );
}

function createFormForOptions<G extends AnyRCFGenerics>(
  options: FormOptions<G>,
): FormComponent<G> {
  const {
    schema,
    layout: Layout,
    components,
    externalErrorParser,
    modes: prebuiltModes,
    fieldConditionsSelector,
  } = options;

  const fieldList = determineFields(schema, fieldConditionsSelector);
  const resolveFieldComponents = createFieldComponentFactory(
    components,
    fieldList,
  );

  function extractActiveFieldsData(allData: inferValue<G["schema"]>) {
    return fieldList.reduce((acc: Record<string, unknown>, field) => {
      if (field.isActive(allData)) {
        acc[field.name] = allData[field.name];
      }
      return acc;
    }, {});
  }

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

    const fieldValues = useSyncIsomorphicStore(
      store.subscribe,
      () => store.data,
    );

    const selectedFields = useMemo(
      () => resolveFieldComponents(fieldValues),
      [fieldValues],
    );

    const generalErrors = useSyncIsomorphicStore(
      store.subscribe,
      () => store.generalErrors,
    );

    const fieldErrors = useSyncIsomorphicStore(
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

    useEffect(() => store.setModes(modes), [store, modes]);

    const handleSubmit = useCallback(
      (e?: FormEvent) => {
        e?.preventDefault();
        store.handleSubmit();
        if (store.isLocallyValid) {
          onSubmit?.(extractActiveFieldsData(store.data));
        }
      },
      [store, onSubmit],
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

  ComposableForm.extend = (extend) =>
    createFormForOptions(
      FormOptionsBuilder.build(extend(new FormOptionsBuilder(options))),
    );

  return ComposableForm;
}

const emptyObject = Object.freeze({});
const passThrough = <T extends any>(value: T) => value;
