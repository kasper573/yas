import type { HTMLAttributes } from "react";
import { useId } from "react";
import type { FieldProps } from "../rcf";
import { Alert } from "../components/Alert";
import { Stack } from "../components/Stack";

export interface TextFieldProps
  extends FieldProps<string>,
    Omit<
      HTMLAttributes<HTMLDivElement>,
      "value" | "onChange" | "onFocus" | "onBlur" | "type"
    > {
  password?: boolean;
}

export function TextField({
  name,
  value,
  errors = [],
  onChange,
  onBlur,
  onFocus,
  password,
  required,
  fieldValues,
  ...rest
}: TextFieldProps) {
  const id = useId();
  return (
    <Stack {...rest}>
      <label htmlFor={id}>{name}</label>
      <input
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value || undefined)}
        onFocus={onFocus}
        onBlur={onBlur}
        type={password ? "password" : "text"}
      />
      {errors.length > 0 && <Alert variant="danger">{errors.join(", ")}</Alert>}
    </Stack>
  );
}
