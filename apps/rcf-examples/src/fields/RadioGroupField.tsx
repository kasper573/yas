import {
  FormControl,
  FormHelperText,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import type { ReactNode } from "react";
import { useId, useMemo } from "react";
import type { FieldProps } from "../rcf";

export interface RadioGroupOption<Value> {
  value: Value;
  label: ReactNode;
}

export interface RadioGroupFieldProps<Value> extends FieldProps<Value> {
  options: RadioGroupOption<Value>[];
}

export function RadioGroupField<Value>({
  options,
  name,
  value,
  errors = [],
  onChange,
  ...rest
}: RadioGroupFieldProps<Value>) {
  const id = useId();
  const valueAsOptionIndex = useMemo(
    () => options.findIndex((o) => o.value === value),
    [value, options],
  );
  return (
    <FormControl fullWidth error={errors.length > 0}>
      <FormLabel id={id}>{name}</FormLabel>
      <RadioGroup
        value={valueAsOptionIndex !== -1 ? valueAsOptionIndex : ""}
        onChange={(e) =>
          onChange?.(options[e.target.value as unknown as number]?.value)
        }
        aria-labelledby={id}
        name={name}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            control={<Radio />}
            label={option.label}
            value={index}
          />
        ))}
      </RadioGroup>
      {errors.length > 0 && (
        <FormHelperText error>{errors.join(", ")}</FormHelperText>
      )}
    </FormControl>
  );
}
