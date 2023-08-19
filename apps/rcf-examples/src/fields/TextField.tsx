import { TextField as MuiTextField } from "@mui/material";
import type { ComponentProps, ReactNode } from "react";
import type { FieldProps } from "../rcf";

export interface TextFieldProps
  extends FieldProps<string>,
    Omit<
      ComponentProps<typeof MuiTextField>,
      "value" | "onChange" | "onFocus" | "onBlur" | "sx"
    > {
  password?: boolean;
  helperText?: ReactNode;
}

export function TextField({
  name,
  value,
  errors = [],
  onChange,
  password,
  helperText,
  required,
  ...rest
}: TextFieldProps) {
  return (
    <MuiTextField
      value={value ?? ""}
      label={name}
      error={errors.length > 0}
      helperText={errors.join(", ") || helperText}
      onChange={(e) => onChange?.(e.target.value || undefined)}
      type={password ? "password" : "text"}
      {...rest}
    />
  );
}
