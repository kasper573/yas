import type { FieldProps } from "react-composable-form";
import { TextField as MuiTextField } from "@mui/material";

export function TextField({
  name,
  value,
  errors = [],
  onChange,
  onBlur,
}: FieldProps<string | undefined>) {
  return (
    <MuiTextField
      value={value ?? ""}
      label={name}
      error={errors.length > 0}
      helperText={errors.join(", ")}
      onChange={(e) => onChange(e.target.value || undefined)}
      onBlur={onBlur}
    />
  );
}
