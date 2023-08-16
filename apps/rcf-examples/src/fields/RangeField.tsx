import {
  Box,
  FormControl,
  FormHelperText,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useId, useMemo } from "react";
import type { FieldProps } from "../rcf";

export type Range = [number, number];

export interface RangeFieldProps<T extends Range> extends FieldProps<T> {
  min?: number;
  max?: number;
}

export function RangeField<T extends Range>({
  name,
  min = 0,
  max = 1,
  value = [min, max] as T,
  errors = [],
  onChange,
  required,
  sx,
  ...rest
}: RangeFieldProps<T>) {
  const id = useId();
  const marks = useMemo(
    () => [
      { value: min, label: min },
      { value: max, label: max },
    ],
    [min, max],
  );
  return (
    <FormControl sx={sx} fullWidth>
      <Stack gap={1}>
        <Typography id={id}>{name}</Typography>
        <Box sx={{ px: 1 }}>
          <Slider
            sx={{ m: 0, mb: 1 }}
            aria-labelledby={id}
            value={value}
            onChange={(e, newValue) => onChange?.(newValue as T)}
            valueLabelDisplay="auto"
            getAriaLabel={name ? () => name : undefined}
            getAriaValueText={() => value.join(", ")}
            marks={marks}
            min={min}
            max={max}
            {...rest}
          />
        </Box>
      </Stack>
      {errors.length > 0 && (
        <FormHelperText error>{errors.join(", ")}</FormHelperText>
      )}
    </FormControl>
  );
}
