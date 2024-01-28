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

const emptyPath: ReadonlyArray<string> = Object.freeze([]);
const noop = () => {};

export type FieldControllerFactories<Values> = {
  [K in keyof Values]-?: FieldControllerFactory<Values[K]>;
};

export type FieldControllerFactory<Value> = FieldControllerFactories<Value> & {
  (render: FieldRenderer<Value>): ReactElement;
};

export interface FieldRenderer<Value> {
  (props: FieldRendererProps<Value>): ReactElement;
}

export type FieldRendererProps<Value> = [undefined] extends [Value]
  ? OptionalFieldRendererProps<Exclude<Value, undefined>>
  : RequiredFieldRendererProps<Value>;

export interface FieldRendererBaseProps {
  onBlur?: () => unknown;
  onFocus?: () => unknown;
  error?: string;
}

export interface OptionalFieldRendererProps<Value>
  extends FieldRendererBaseProps {
  value?: Value;
  onChange?: (value?: Value) => unknown;
  required?: false;
}

export interface RequiredFieldRendererProps<Value>
  extends FieldRendererBaseProps {
  value: Value;
  onChange: (value: Value) => unknown;
  required: true;
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
