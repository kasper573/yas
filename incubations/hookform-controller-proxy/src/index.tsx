import type { ReactElement } from "react";
import type {
  UseFormReturn,
  FieldErrors,
  FieldError,
  Path,
  FieldValues,
} from "react-hook-form";
import { Controller } from "react-hook-form";

export function createControllerProxyFactory<Meta>(
  /**
   * Used to automatically determine the value of the `required` rule for the react-hook-form/Controller.
   *
   * Will be called for each field that is rendered by the proxy.
   * The meta argument is any value you want, but is recommended to be i.e. the schema that was used to create the form.
   * The path will be the path to the field that is being rendered.
   * The function is expected to return a boolean indicating whether the field is required or not.
   */
  isRequired: (meta: Meta, path: readonly string[]) => boolean,
) {
  return function createControllerProxy<TFieldValues extends FieldValues>(
    form: UseFormReturn<TFieldValues>,
    meta: Meta,
    path: readonly string[] = emptyPath,
  ): FieldControllerFactories<TFieldValues> {
    return new Proxy(
      noop as unknown as FieldControllerFactories<TFieldValues>,
      {
        get(_, step) {
          return createControllerProxy(form, meta, [...path, String(step)]);
        },
        apply(_1, _2, [render]: [FieldRenderer<unknown>]) {
          const pathAsString = path.join(".") as Path<TFieldValues>;

          return (
            <Controller
              control={form.control}
              name={pathAsString}
              render={({ field, formState: { errors } }) => {
                const { onChange, onBlur, value } = field;
                const required = isRequired(meta, path);
                const error = flattenErrorMessages(
                  valueAtPath(errors, path) as FieldErrors,
                );
                return render({
                  value,
                  onChange,
                  onBlur,
                  onFocus: () => form.setFocus(pathAsString),
                  error,
                  // unfortunate assert just to make typescript happy,
                  // it works around some complicated generics not worth solving,
                  // and the assertion has no real problems in practice.
                  required: required as false,
                });
              }}
            />
          );
        },
      },
    );
  };
}

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
  [K in keyof Values]-?: FieldControllerFactory<Values[K]>;
};

type FieldControllerFactory<Value> = FieldControllerFactories<Value> & {
  (render: FieldRenderer<Value>): ReactElement;
};

interface FieldRenderer<Value> {
  (props: FieldPropsWithDerivedOptionality<Value>): ReactElement;
}

type FieldPropsWithDerivedOptionality<Value> = [undefined] extends [Value]
  ? OptionalFieldProps<Exclude<Value, undefined>>
  : RequiredFieldProps<Value>;
