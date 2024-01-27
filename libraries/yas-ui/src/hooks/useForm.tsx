import {
  typeAtPath,
  type AnyZodObject,
  type infer as inferFieldValues,
} from "@yas/validate";
import type { UseFormProps } from "react-hook-form";
import { useForm as useFormImpl } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormReturn as UseFormReturnImpl } from "react-hook-form";
import { createControllerProxyFactory } from "hookform-controller-proxy";

/**
 * Zod specific react-hook-form/useForm
 */
export function useForm<Schema extends AnyZodObject>(
  schema: Schema,
  options?: Omit<UseFormProps<inferFieldValues<Schema>>, "resolver">,
): UseFormReturn<Schema> {
  const form = useFormImpl({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
    ...options,
  });
  return { ...form, schema };
}

/**
 * Syntax sugar for an easier way of rendering react-hook-form/Controller elements
 */
export function useFieldControllers<Schema extends AnyZodObject>(
  form: ReturnType<typeof useForm<Schema>>,
) {
  return createControllerProxy(form, form.schema);
}

export type UseFormReturn<Schema extends AnyZodObject> = UseFormReturnImpl<
  inferFieldValues<Schema>
> & {
  schema: Schema;
};

const createControllerProxy = createControllerProxyFactory(
  (schema: AnyZodObject, path) => !typeAtPath(schema, path)?.isOptional(),
);
