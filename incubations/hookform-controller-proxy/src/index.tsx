import type { ReactElement } from "react";
import type {
  FieldErrors,
  FieldError,
  FieldValues,
  Control,
} from "react-hook-form";
import { Controller } from "react-hook-form";

export function createControllerProxy<TFieldValues extends FieldValues>(
  control: Control<TFieldValues>,
): FieldControllerFactories<TFieldValues> {
  return createControllerProxyImpl(control, emptyPath);
}

function createControllerProxyImpl<TFieldValues extends FieldValues>(
  control: Control<TFieldValues>,
  path: readonly string[],
): FieldControllerFactories<TFieldValues> {
  return new Proxy(noop as unknown as FieldControllerFactories<TFieldValues>, {
    get(_, step) {
      return createControllerProxyImpl(control, [...path, String(step)]);
    },
    apply(_1, _2, [render]) {
      const pathAsString = path.join(".");
      const isOptional = pathAsString.endsWith(optionalIndicator);
      const name = isOptional ? pathAsString.slice(0, -1) : pathAsString;

      return (
        <Controller<FieldValues>
          control={control as Control<FieldValues>}
          name={name}
          render={({ field, formState: { errors } }) => {
            const { onChange, onBlur, value } = field;
            const error = flattenErrorMessages(
              valueAtPath(errors, path) as FieldErrors,
            );
            return render({
              value,
              name,
              onChange,
              onBlur,
              error,
              // unfortunate assert just to make typescript happy,
              // it works around some complicated generics not worth solving,
              // and the assertion has no real problems in practice.
              required: !isOptional as false,
            });
          }}
        />
      );
    },
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
  onChange: (value: Value) => unknown;
  required: true;
}

/**
 * Props for a field whose value is optional
 */
export interface OptionalFieldProps<Value> extends BaseFieldProps {
  value?: Value;
  onChange?: (value?: Value) => unknown;
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

function valueAtPath(object: unknown, path: readonly string[]): unknown {
  return path.reduce(
    (acc, key) => (acc as Record<string, unknown>)?.[key],
    object,
  );
}

function flattenErrorMessages(
  errors: FieldErrors | FieldError,
): string | undefined {
  if (!errors) {
    return;
  }
  if ("message" in errors) {
    return (errors as FieldError).message;
  }
  return Object.values(errors).map(flattenErrorMessages).join("\n");
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

interface OptionalFieldRenderer<Value> {
  (props: OptionalFieldProps<Exclude<Value, undefined>>): ReactElement;
}

interface RequiredFieldRenderer<Value> {
  (props: RequiredFieldProps<Value>): ReactElement;
}

type OptionalKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];

type RequiredKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? never : K;
}[keyof T];
