import type { FieldProps } from "../form/rcf";
import { BaseField } from "../form/BaseField";
import { Stack } from "../layout/Stack";

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
  ...rest
}: RangeFieldProps<T>) {
  return (
    <>
      <BaseField
        name={`${label} (from)`}
        {...rest}
        control={(id) => (
          <Stack direction="row">
            <input
              id={id}
              type="range"
              value={fromValue}
              onChange={(e) =>
                onChange?.([e.target.valueAsNumber, toValue] as T)
              }
            />
            {fromValue}
          </Stack>
        )}
      />
      <BaseField
        name={`${label} (to)`}
        {...rest}
        control={(id) => (
          <Stack direction="row">
            <input
              id={id}
              type="range"
              value={toValue}
              onChange={(e) =>
                onChange?.([fromValue, e.target.valueAsNumber] as T)
              }
            />
            {toValue}
          </Stack>
        )}
      />
    </>
  );
}
