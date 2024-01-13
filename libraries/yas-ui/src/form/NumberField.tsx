import type { FieldProps } from "./shared/rcf";
import type { TextFieldProps } from "./TextField";
import { TextField } from "./TextField";

export interface NumberFieldProps
  extends FieldProps<number>,
    Omit<TextFieldProps, keyof FieldProps<unknown> | "type"> {}

export function NumberField({ value, onChange, ...rest }: NumberFieldProps) {
  return (
    <TextField
      {...rest}
      type="number"
      value={value?.toString()}
      onChange={(text) => {
        const num = parseFloat(text ?? "");
        onChange?.(isNaN(num) ? undefined : num);
      }}
    />
  );
}
