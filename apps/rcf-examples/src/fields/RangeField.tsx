import { FormControl, FormHelperText, InputLabel, Slider } from "@mui/material";
import { useId } from "react";
import type { FieldProps } from "../rcf";

export interface RangeFieldProps extends FieldProps<[number, number]> {
  min: number;
  max: number;
}

export function RangeField({
  name,
  min,
  max,
  value = [min, max],
  errors = [],
  onChange,
  required,
  ...rest
}: RangeFieldProps) {
  const id = useId();
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{name}</InputLabel>
      <Slider
        value={value}
        onChange={() => {}}
        valueLabelDisplay="auto"
        getAriaLabel={name ? () => name : undefined}
        getAriaValueText={() => value.join(", ")}
        min={min}
        max={max}
        {...rest}
      />
      {errors.length > 0 && (
        <FormHelperText error>{errors.join(", ")}</FormHelperText>
      )}
    </FormControl>
  );
}
