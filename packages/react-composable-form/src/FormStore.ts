import type { Draft } from "immer";
import { produce } from "immer";
import type {
  FieldNames,
  FormSchema,
  FormState,
  FormValidationMode,
  inferValue,
} from "./types/commonTypes";
import type { RCFGenerics } from "./types/optionTypes";
import type { FieldErrors } from "./types/commonTypes";
import type { AnyError } from "./types/commonTypes";
import type { FormErrors } from "./types/commonTypes";

export type FormStoreFor<G extends RCFGenerics> = FormStore<
  G["schema"],
  G["mode"]
>;

export class FormStore<
  Schema extends FormSchema,
  Mode extends FormValidationMode = FormValidationMode,
> {
  private _listeners = new Set<StoreListener<Schema>>();
  private _currentMutation?: { draft: Draft<FormState<Schema>> };
  private _state: FormState<Schema>;

  get data(): inferValue<Schema> {
    return this._state.data;
  }

  get generalErrors(): AnyError[] {
    return this._state.combinedErrors.general;
  }

  get fieldErrors(): FieldErrors<Schema> {
    return this._state.combinedErrors.field;
  }

  get isLocallyValid() {
    const { field, general } = this._state.localErrors;
    const hasLocalFieldErrors = Object.values(field).some((e) => e?.length);
    const hasLocalGeneralErrors = general.length > 0;
    return !hasLocalFieldErrors && !hasLocalGeneralErrors;
  }

  constructor(
    public readonly schema: Schema,
    initialData: inferValue<Schema>,
    private _mode: FormValidationMode,
  ) {
    this._state = {
      localErrors: emptyFormErrorState(),
      externalErrors: emptyFormErrorState(),
      combinedErrors: emptyFormErrorState(),
      data: initialData,
    };
  }

  resetData(data: inferValue<Schema>) {
    this.mutate((state) => {
      state.data = data;
    });
  }

  handleSubmit() {
    this.validate();
  }

  changeField<FieldName extends FieldNames<Schema>>(
    name: FieldName,
    value: inferValue<Schema>[FieldName],
  ) {
    this.mutate((draft) => {
      draft.data[name] = value;
      if (this._mode === "change") {
        this.validate(name);
      }
    });
  }

  blurField<FieldName extends FieldNames<Schema>>(name: FieldName) {
    if (this._mode === "blur") {
      this.validate(name);
    }
  }

  setExternalErrors(errors?: FormErrors<Schema>) {
    this.mutate((draft) => {
      draft.externalErrors.field = errors?.field ?? {};
      draft.externalErrors.general = errors?.general ?? [];
      this.updateCombinedFieldErrors();
    });
  }

  private updateCombinedFieldErrors() {
    this.mutate((draft) => {
      draft.combinedErrors.general = draft.localErrors.general.concat(
        draft.externalErrors.general,
      );
      draft.combinedErrors.field = {
        ...draft.localErrors.field,
        ...draft.externalErrors.field,
      };
    });
  }

  private validate<FieldName extends FieldNames<Schema>>(
    ...fieldNames: FieldName[]
  ) {
    this.mutate((draft) => {
      const localErrors = getFormErrorState(this.schema, draft.data);

      draft.localErrors.general = localErrors.general;

      if (fieldNames.length) {
        for (const name of fieldNames) {
          draft.localErrors.field[name] = localErrors.field[name];
        }
      } else {
        draft.localErrors.field = localErrors.field;
      }

      this.updateCombinedFieldErrors();
    });
  }

  private mutate(mutator: (state: FormState<Schema>) => void): void {
    if (this._currentMutation) {
      mutator(this._currentMutation.draft as FormState<Schema>);
      return;
    }

    const newState = produce(this._state, (draft) => {
      this._currentMutation = { draft };
      mutator(draft as FormState<Schema>);
      this._currentMutation = undefined;
    });

    this._state = newState;
    for (const listener of this._listeners) {
      listener(newState);
    }
  }

  subscribe = (listener: StoreListener<Schema>): StoreUnsubscriber => {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  };
}

function getFormErrorState<Schema extends FormSchema>(
  schema: Schema,
  value: inferValue<Schema>,
): FormErrors<Schema> {
  const res = schema.safeParse(value);
  if (res.success) {
    return emptyFormErrorState();
  }
  const { formErrors: general, fieldErrors: field } = res.error.flatten();
  return { general, field } as FormErrors<Schema>;
}

export type StoreUnsubscriber = () => void;

export type StoreListener<Schema extends FormSchema> = (
  state: FormState<Schema>,
) => void;

function emptyFormErrorState<Schema extends FormSchema>(): FormErrors<Schema> {
  return {
    general: [],
    field: {},
  };
}
