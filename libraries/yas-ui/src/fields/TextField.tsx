import type { InputHTMLAttributes } from "react";
import { styled } from "@yas/style";
import type { FieldProps } from "../form/rcf";
import type { BaseFieldProps } from "../form/BaseField";
import { BaseField } from "../form/BaseField";
import { inputRecipe } from "./TextField.css";

export interface TextFieldProps
  extends FieldProps<string>,
    Pick<BaseFieldProps, "sx" | "style"> {
  type?: "text" | "number" | "password";
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "onFocus" | "onBlur" | "type"
  >;
}

export function TextField({
  value,
  onChange,
  type,
  inputProps,
  ...baseFieldProps
}: TextFieldProps) {
  return (
    <BaseField
      {...baseFieldProps}
      control={(id) => (
        <Input
          id={id}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          type={type}
          {...inputProps}
        />
      )}
    />
  );
}

const Input = styled("input", inputRecipe);
