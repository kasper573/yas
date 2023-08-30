import type { HTMLAttributes } from "react";
import { useId } from "react";
import clsx from "clsx";
import type { FieldProps } from "../rcf";
import { Alert } from "../components/Alert";
import { Stack } from "../components/Stack";
import styles from "./TextField.module.scss";

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
  className,
  type,
  ...rest
}: TextFieldProps) {
  const id = useId();
  return (
    <Stack className={clsx(styles.textField, className)} {...rest}>
      <label htmlFor={id}>{name}</label>
      <input
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
