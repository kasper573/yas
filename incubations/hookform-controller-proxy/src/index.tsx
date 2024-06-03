import { type ReactElement } from "react";
import type { Path, PathValue } from "react-hook-form";
import {
  type FieldErrors,
  type FieldError,
  type FieldValues,
  type UseFormReturn,
  useFormState,
} from "react-hook-form";

export function createControllerProxy<TFieldValues extends FieldValues>(
  form: UseFormReturn<TFieldValues>,
): FieldControllerFactories<TFieldValues> {
  return createControllerProxyImpl(form, emptyPath);
}

function createControllerProxyImpl<TFieldValues extends FieldValues>(
  form: UseFormReturn<TFieldValues>,
  path: readonly string[],
): FieldControllerFactories<TFieldValues> {
  return new Proxy(noop as unknown as FieldControllerFactories<TFieldValues>, {
    get(_, step) {
      return createControllerProxyImpl(form, [...path, String(step)]);
    },
    apply(_1, _2, [render]) {
      const pathAsString = path.join(".");
      const isOptional = pathAsString.endsWith(optionalIndicator);
      const name = isOptional ? pathAsString.slice(0, -1) : pathAsString;

      return (
        <FieldController
          form={form}
          name={name as Path<TFieldValues>}
          render={render}
          required={!isOptional}
        />
      );
    },
  });
}

/**
 * Identical to react-hook-form's Controller component, with a few exceptions:
 *
 * - Subscribes to nested fields when the name is not referring to a leaf field.
 * - Flattens nested errors to a single string.
 */
export function FieldController<
  TFieldValues extends FieldValues,
  Name extends Path<TFieldValues>,
>({
  form,
  name,
  render,
  required,
}: {
  form: UseFormReturn<TFieldValues>;
  name: Name;
  render: FieldRenderer<PathValue<TFieldValues, Name>>;
  required?: boolean;
}) {
  const { errors, isValid } = useFormState({ control: form.control, name });
  const error = !isValid ? flattenErrors(errors) : undefined;
  const value = form.watch(name);
  const reg = form.control.register(name);

  const onBlur = () => reg.onBlur({ type: "blur", target: { value, name } });

  const onChange = (value?: PathValue<TFieldValues, Name>) =>
    reg.onChange({ type: "change", target: { value, name } });

  return render({
    value,
    name,
    onChange,
    onBlur,
    error,
    required,
  });
}

const optionalIndicator = "$" as const;
type WithOptionalIndicator<K> = `${K & string}${typeof optionalIndicator}`;

/**
 * Props for the components you intend to use with the controller proxy.
 * Is a smart union that will automatically provide the correct optionality based on the `required` prop.
 */
export type FieldProps<Value = unknown> =
  | RequiredFieldProps<Value>
  | OptionalFieldProps<Value>;

/**
 * Props for a field whose value is required
 */
export interface RequiredFieldProps<Value> extends BaseFieldProps {
  value: Value;
  onChange?: (value: Value) => unknown;
  required: true;
}

/**
 * Props for a field whose value is optional
 */
export interface OptionalFieldProps<Value> extends BaseFieldProps {
  value?: Exclude<Value, null | undefined>;
  onChange?: (value?: Exclude<Value, null | undefined>) => unknown;
  required?: false;
}

/**
 * Props that are expected to be available on all field components regardless of optionality
 */
export interface BaseFieldProps {
  onBlur?: () => unknown;
  onFocus?: () => unknown;
  error?: string;
  name?: string;
}

function flattenErrors(errors?: FieldErrors | FieldError): string | undefined {
  if (!errors) {
    return;
  }
  if ("message" in errors) {
    return (errors as FieldError).message;
  }
  return Object.values(errors).map(flattenErrors).join("\n");
}

const emptyPath: ReadonlyArray<string> = Object.freeze([]);
const noop = () => {};

type FieldControllerFactories<Values> = {
  [K in OptionalKeys<Values> as WithOptionalIndicator<K>]-?: FieldControllerFactory<
    Values[K],
    OptionalFieldRenderer<Values[K]>
  >;
} & {
  [K in RequiredKeys<Values>]-?: FieldControllerFactory<
    Values[K],
    RequiredFieldRenderer<Values[K]>
  >;
};

type FieldControllerFactory<Value, Renderer> =
  FieldControllerFactories<Value> & {
    (render: Renderer): ReactElement;
  };

interface FieldRenderer<Value> {
  (props: FieldProps<Value>): ReactElement;
}

interface RequiredFieldRenderer<Value> {
  (props: RequiredFieldProps<Value>): ReactElement;
}

interface OptionalFieldRenderer<Value> {
  (props: OptionalFieldProps<Exclude<Value, undefined>>): ReactElement;
}

interface RequiredFieldRenderer<Value> {
  (props: RequiredFieldProps<Value>): ReactElement;
}

type OptionalKeys<T> = {
  [K in keyof T]-?: IsNullish<T[K]> extends true ? K : never;
}[keyof T];

type IsNullish<T> = undefined extends T ? true : null extends T ? true : false;

type RequiredKeys<T> = Exclude<keyof T, OptionalKeys<T>>;
