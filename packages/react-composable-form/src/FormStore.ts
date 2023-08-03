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

  get data(): inferValue<Schema> {
    return this._state.data;
  }

  get generalErrors(): AnyError[] {
    return this._state.generalErrors;
  }

  get fieldErrors(): FieldErrors<Schema> {
    return this._state.fieldErrors;
  }

  get isValid() {
    return !Object.values(this.fieldErrors).some((errors) => errors?.length);
  }

  constructor(
    public readonly schema: Schema,
    private _state: FormState<Schema>,
    private _mode: FormValidationMode,
  ) {}

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

  private validate<FieldName extends FieldNames<Schema>>(
    ...names: FieldName[]
  ) {
    this.mutate((draft) => {
      const { generalErrors, fieldErrors } = getFormErrors(
        this.schema,
        draft.data,
      );
      draft.generalErrors = generalErrors;
      if (names.length) {
        for (const name of names) {
          draft.fieldErrors[name] = fieldErrors[name];
        }
      } else {
        draft.fieldErrors = fieldErrors;
      }
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

function getFormErrors<Schema extends FormSchema>(
  schema: Schema,
  value: inferValue<Schema>,
): FormErrors<Schema> {
  const res = schema.safeParse(value);
  if (res.success) {
    return {
      generalErrors: [],
      fieldErrors: {},
    };
  }
  const { formErrors: generalErrors, fieldErrors } = res.error.flatten();
  return { generalErrors, fieldErrors } as FormErrors<Schema>;
}

export type StoreUnsubscriber = () => void;

export type StoreListener<Schema extends FormSchema> = (
  state: FormState<Schema>,
) => void;

interface FormErrors<Schema extends FormSchema> {
  generalErrors: AnyError[];
  fieldErrors: FieldErrors<Schema>;
}
