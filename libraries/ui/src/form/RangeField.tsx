import { useId } from "react";
import { Stack } from "../layout/Stack";
import { FormControl, FormControlLabel, FormControlError } from "./FormControl";
import type { FieldProps } from "./types";

export type Range = [number, number];

export type RangeFieldProps<T extends Range> = FieldProps<T> & {
  min?: number;
  max?: number;
};

export function RangeField<T extends Range>({
  min = 0,
  max = 1,
  label,
  value: [fromValue, toValue] = [min, max] as T,
  onChange,
  error,
  ...rest
}: RangeFieldProps<T>) {
  const minId = useId();
  const maxId = useId();
  return (
    <>
      <FormControl {...rest}>
        <FormControlLabel htmlFor={minId}>{label} (from)</FormControlLabel>

        <Stack direction="row">
          <input
            id={minId}
            type="range"
            value={fromValue}
            onChange={(e) => onChange?.([e.target.valueAsNumber, toValue] as T)}
          />
          {fromValue}
        </Stack>
      </FormControl>

      <FormControl {...rest}>
        <FormControlLabel htmlFor={maxId}>{label} (to)</FormControlLabel>

        <Stack direction="row">
          <input
            id={maxId}
            type="range"
            value={toValue}
            onChange={(e) =>
              onChange?.([fromValue, e.target.valueAsNumber] as T)
            }
          />
          {toValue}
        </Stack>
      </FormControl>

      <FormControlError error={error} />
    </>
  );
}
