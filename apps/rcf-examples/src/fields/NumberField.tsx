import { TextField as MuiTextField } from "@mui/material";
import type { ComponentProps } from "react";
import type { FieldProps } from "../rcf";

export interface NumberFieldProps
  extends FieldProps<number>,
    Omit<
      ComponentProps<typeof MuiTextField>,
      "value" | "onChange" | "onFocus" | "onBlur" | "sx"
    > {}

export function NumberField({
  name,
  value,
  errors = [],
  onChange,
  required,
  ...rest
}: NumberFieldProps) {
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
