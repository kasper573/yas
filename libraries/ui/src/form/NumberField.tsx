import type { FieldProps } from "./types";
import { TextField } from "./TextField";

export type NumberFieldProps = FieldProps<number> & {
  readOnly?: boolean;
};

export function NumberField({
  value,
  onChange,
  required,
  ...rest
}: NumberFieldProps) {
  function tryEmitChangedValue(newValueAsText: string | undefined) {
    if (required) {
      if (newValueAsText !== undefined) {
        const newFloat = parseFloatSafe(newValueAsText);
        if (newFloat.ok) {
          onChange?.(newFloat.value);
        }
      }
    } else {
      const newFloat = parseFloatSafe(newValueAsText ?? "");
      onChange?.(newFloat.ok ? newFloat.value : undefined);
    }
  }

  return (
    <TextField
      {...rest}
      // This is a weird workaround for typescript generics.
      // There's probably a better way to do it, but it's not worth it here
      required={required as false}
      type="number"
      value={value?.toString()}
      onChange={tryEmitChangedValue}
    />
  );
}

function parseFloatSafe(text: string) {
  const value: number = parseFloat(text);
  if (isNaN(value)) {
    return { ok: false as const };
  }
  return { ok: true as const, value };
}
