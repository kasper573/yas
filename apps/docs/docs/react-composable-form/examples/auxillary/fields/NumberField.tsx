import type { HTMLAttributes } from "react";
import { useId } from "react";
import type { FieldProps } from "../rcf";
import { Alert } from "../components/Alert";
import { Stack } from "../components/Stack";

export interface NumberFieldProps
  extends FieldProps<number>,
    Omit<
      HTMLAttributes<HTMLDivElement>,
      "value" | "onChange" | "onFocus" | "onBlur" | "type"
    > {}

export function NumberField({
  name,
  value,
  errors = [],
  onChange,
  onFocus,
  onBlur,
  required,
  fieldValues,
  ...rest
}: NumberFieldProps) {
  const id = useId();
  return (
    <Stack {...rest}>
      <label htmlFor={id}>{name}</label>
      <input
        id={id}
        value={value ?? ""}
        onChange={(e) => {
          const num = parseFloat(e.target.value);
          onChange?.(isNaN(num) ? undefined : num);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        type="number"
      />
      {errors.length > 0 && <Alert variant="danger">{errors.join(", ")}</Alert>}
    </Stack>
  );
}
