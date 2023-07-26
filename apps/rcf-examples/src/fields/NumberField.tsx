import { TextField as MuiTextField } from "@mui/material";
import type { FieldProps } from "../rcf";

export function NumberField({
  name,
  value,
  errors = [],
  onChange,
  onBlur,
  size,
}: FieldProps<number>) {
  return (
    <MuiTextField
      size={size}
      value={value ?? ""}
      label={name}
      error={errors.length > 0}
      helperText={errors.join(", ")}
      onBlur={onBlur}
      onChange={(e) => {
        const num = parseFloat(e.target.value);
        onChange?.(isNaN(num) ? undefined : num);
      }}
    />
  );
}
