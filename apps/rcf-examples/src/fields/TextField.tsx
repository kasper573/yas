import type { FieldProps } from "react-composable-form";
import { TextField as MuiTextField } from "@mui/material";

export interface TextFieldProps extends FieldProps<string | undefined> {
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
      onChange={(e) => onChange(e.target.value || undefined)}
      type={password ? "password" : "text"}
      {...rest}
    />
  );
}
