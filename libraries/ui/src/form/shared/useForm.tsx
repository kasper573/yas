import type { z } from "@yas/validate";
import { type AnyZodObject } from "@yas/validate";
import type { FieldValues, Resolver, UseFormProps } from "react-hook-form";
import { useForm as useFormImpl } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormReturn as UseFormReturn } from "react-hook-form";
import { useEffect } from "react";
import { useLatest } from "@yas/hooks";

export { createControllerProxy } from "hookform-controller-proxy";

/**
 * react-hook-form/useForm encapsulation with project defaults
 */
export function useForm<Values extends FieldValues>(
  options?: UseFormProps<Values>,
): UseFormReturn<Values> {
  return useFormImpl({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    ...options,
  });
}

/**
 * Zod specific react-hook-form/useForm
 */
export function useSchemaForm<Schema extends AnyZodObject>(
  schema: Schema,
  options?: Omit<UseFormProps<z.infer<Schema>>, "resolver">,
): UseSchemaFormReturn<Schema> {
  return useForm({
    resolver: (zodResolver as (s: unknown) => Resolver<z.infer<Schema>>)(
      schema,
    ),
    ...options,
  });
}

export type UseSchemaFormReturn<Schema extends AnyZodObject> = UseFormReturn<
  z.infer<Schema>
>;

/**
 * Subscribe to form changes
 */
export function useFormChanges<Schema extends AnyZodObject>(
  form: UseSchemaFormReturn<Schema>,
  onChange?: (values: z.infer<Schema>) => void,
) {
  const latestOnChange = useLatest(onChange);
  useEffect(() => {
    const sub = form.watch((values) => latestOnChange.current?.(values));
    return () => sub.unsubscribe();
  }, [form, latestOnChange]);
}
