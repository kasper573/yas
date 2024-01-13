import { useId } from "react";
import { Stack } from "../layout/Stack";
import {
  FormControl,
  FormControlLabel,
  FormControlErrors,
} from "./shared/FormControl";
import type { FieldProps } from "./shared/rcf";

export type Range = [number, number];

export interface RangeFieldProps<T extends Range> extends FieldProps<T> {
  min?: number;
  max?: number;
}

export function RangeField<T extends Range>({
  min = 0,
  max = 1,
  name,
  label = name,
  value: [fromValue, toValue] = [min, max] as T,
  onChange,
  errors,
  fieldValues,
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

      <FormControlErrors errors={errors} />
    </>
  );
}
