import { TextField as MuiTextField } from "@mui/material";
import type { FieldProps } from "../rcf";

export function NumberField({
  name,
  value,
  errors = [],
  onChange,
  ...rest
}: FieldProps<number>) {
  return (
    <MuiTextField
      value={value ?? ""}
      label={name}
      error={errors.length > 0}
      helperText={errors.join(", ")}
      onChange={(e) => {
        const num = parseFloat(e.target.value);
        onChange?.(isNaN(num) ? undefined : num);
      }}
      {...rest}
    />
  );
}
