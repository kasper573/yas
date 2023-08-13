import {
  FormControl,
  FormHelperText,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useId } from "react";
import type { FieldProps } from "../rcf";

export type Range = [number, number];

export interface RangeFieldProps extends FieldProps<Range> {
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
      <Stack gap={1}>
        <Typography id={id}>{name}</Typography>
        <div>
          <Slider
            aria-labelledby={id}
            value={value}
            onChange={(e, newValue) => onChange?.(newValue as Range)}
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
        </div>
      </Stack>
    </FormControl>
  );
}
