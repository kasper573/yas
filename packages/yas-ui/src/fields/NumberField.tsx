import type { KeyboardEvent } from "react";
import type { FieldProps } from "../form/rcf";
import type { TextFieldProps } from "./TextField";
import { TextField } from "./TextField";

export interface NumberFieldProps
  extends FieldProps<number>,
    Omit<TextFieldProps, keyof FieldProps<unknown> | "type"> {}

export function NumberField({
  value,
  onChange,
  onKeyDown,
  ...rest
}: NumberFieldProps) {
  return (
    <TextField
      {...rest}
      type="number"
      value={value?.toString()}
      onKeyDown={(e) => {
        preventExponent(e);
        onKeyDown?.(e);
      }}
      onChange={(text) => {
        const num = parseFloat(text ?? "");
        onChange?.(isNaN(num) ? undefined : num);
      }}
    />
  );
}

function preventExponent(e: KeyboardEvent<HTMLInputElement>) {
  if (e.key === "e") {
    e.preventDefault();
  }
}
