import type { FieldProps } from "react-composable-form";
import { TextField as MuiTextField } from "@mui/material";

export function NumberField({
  name,
  value,
  errors = [],
  onChange,
  onBlur,
}: FieldProps<number | undefined>) {
  return (
    <MuiTextField
      value={value ?? ""}
      label={name}
      error={errors.length > 0}
      helperText={errors.join(", ")}
      onBlur={onBlur}
      onChange={(e) => {
        const num = parseFloat(e.target.value);
        onChange(isNaN(num) ? undefined : num);
      }}
    />
  );
}
