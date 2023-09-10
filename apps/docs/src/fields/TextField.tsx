import type { HTMLAttributes } from "react";
import { useId } from "react";
import type { FieldProps } from "../rcf";
import { Alert } from "../components/Alert";
import { Stack } from "../components/Stack";
import * as styles from "./TextField.css";

export interface TextFieldProps
  extends FieldProps<string>,
    Omit<
      HTMLAttributes<HTMLInputElement>,
      "value" | "onChange" | "onFocus" | "onBlur" | "type"
    > {
  type?: "text" | "number" | "password";
}

export function TextField({
  name,
  value,
  errors = [],
  onChange,
  onBlur,
  onFocus,
  required,
  fieldValues,
  type,
  ...rest
}: TextFieldProps) {
  const id = useId();
  return (
    <Stack {...rest}>
      <label htmlFor={id}>{name}</label>
      <input
        className={styles.input}
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        type={type}
      />
      {errors.length > 0 && <Alert variant="danger">{errors.join(", ")}</Alert>}
    </Stack>
  );
}
