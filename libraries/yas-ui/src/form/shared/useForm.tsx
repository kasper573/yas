import type { z } from "@yas/validate";
import { typeAtPath, type AnyZodObject } from "@yas/validate";
import type { UseFormProps } from "react-hook-form";
import { useForm as useFormImpl } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormReturn as UseFormReturnImpl } from "react-hook-form";
import type { FieldControllerFactories } from "hookform-controller-proxy";
import { createControllerProxyFactory } from "hookform-controller-proxy";
import { useEffect, useMemo } from "react";
import { useLatest } from "@yas/hooks";

/**
 * Zod specific react-hook-form/useForm
 */
export function useForm<Schema extends AnyZodObject>(
  schema: Schema,
  options?: Omit<UseFormProps<z.infer<Schema>>, "resolver">,
): UseFormReturn<Schema> {
  const form = useFormImpl({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
    ...options,
  });
  return useMemo(() => ({ ...form, schema }), [form, schema]);
}

export type UseFormReturn<Schema extends AnyZodObject> = UseFormReturnImpl<
  z.infer<Schema>
> & {
  schema: Schema;
};

/**
 * Subscribe to form changes
 */
export function useFormChanges<Schema extends AnyZodObject>(
  form: UseFormReturn<Schema>,
  onChange?: (values: z.infer<Schema>) => void,
) {
  const latestOnChange = useLatest(onChange);
  useEffect(() => {
    const sub = form.watch((values) => latestOnChange.current?.(values));
    return () => sub.unsubscribe();
  }, [form, latestOnChange]);
}

/**
 * Syntax sugar for an easier way of rendering react-hook-form/Controller elements
 */
export function useFieldControllers<Schema extends AnyZodObject>(
  form: UseFormReturn<Schema>,
): FieldControllerFactories<z.infer<Schema>> {
  return createControllerProxy(form, form.schema);
}

const createControllerProxy = createControllerProxyFactory(
  (schema: AnyZodObject, path) => !typeAtPath(schema, path)?.isOptional(),
);
