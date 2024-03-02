import type { z } from "@yas/validate";
import { type AnyZodObject } from "@yas/validate";
import type { UseFormProps } from "react-hook-form";
import { useForm as useFormImpl } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UseFormReturn as UseFormReturnImpl } from "react-hook-form";
import { useEffect } from "react";
import { useLatest } from "@yas/hooks";

export { createControllerProxy } from "hookform-controller-proxy";

/**
 * Zod specific react-hook-form/useForm
 */
export function useForm<Schema extends AnyZodObject>(
  schema: Schema,
  options?: Omit<UseFormProps<z.infer<Schema>>, "resolver">,
): UseFormReturn<Schema> {
  return useFormImpl({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
    ...options,
  });
}

export type UseFormReturn<Schema extends AnyZodObject> = UseFormReturnImpl<
  z.infer<Schema>
>;

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
