import type { FieldProps } from "react-composable-form";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import type { ReactNode} from "react";
import { useId, useMemo } from "react";

export interface SelectOption<Value> {
  value: Value;
  label: ReactNode;
}

export type SingleSelectFieldProps<Value> = FieldProps<Value | undefined> & {
  options: SelectOption<Value>[];
};

export function SingleSelectField<Value>({
  options,
  name,
  value,
  errors = [],
  onChange,
  onBlur,
}: SingleSelectFieldProps<Value>) {
  const id = useId();
  const valueAsOptionIndex = useMemo(
    () => options.findIndex((o) => o.value === value),
    [value, options]
  );
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{name}</InputLabel>
      <Select
        labelId={id}
        value={valueAsOptionIndex ?? ""}
        label={name}
        error={errors.length > 0}
        onChange={(e) => onChange(options[e.target.value as number]?.value)}
        onBlur={onBlur}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={index}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {errors.length > 0 && (
        <FormHelperText error>{errors.join(", ")}</FormHelperText>
      )}
    </FormControl>
  );
}

export function valueOptions<Value>(values: Value[]): SelectOption<Value>[] {
  return values.map((value) => ({ value, label: `${value}` }));
}
