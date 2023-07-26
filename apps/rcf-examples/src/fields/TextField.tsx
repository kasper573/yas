import { TextField as MuiTextField } from "@mui/material";
import type { FieldProps } from "../rcf";

export interface TextFieldProps extends FieldProps<string> {
  password?: boolean;
}

export function TextField({
  name,
  value,
  errors = [],
  onChange,
  password,
  ...rest
}: TextFieldProps) {
  return (
    <MuiTextField
      value={value ?? ""}
      label={name}
      error={errors.length > 0}
      helperText={errors.join(", ")}
      onChange={(e) => onChange?.(e.target.value || undefined)}
      type={password ? "password" : "text"}
      {...rest}
    />
  );
}
