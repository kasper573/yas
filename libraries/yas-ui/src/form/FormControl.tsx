import { styled } from "@yas/style";
import type { ComponentProps } from "react";
import { Text } from "../atoms/Text";

export type FormControlProps = ComponentProps<typeof FormControl>;
export const FormControl = styled("div");

export type FormControlLabelProps = ComponentProps<typeof TextLabel> & {
  htmlFor?: string;
};

export function FormControlLabel({
  children,
  ...props
}: FormControlLabelProps) {
  if (children === null || children === undefined) {
    return null;
  }
  return <TextLabel {...props}>{children}</TextLabel>;
}

const TextLabel = Text.as("label");

export type FormControlErrorsProps = { errors?: unknown[] };
export function FormControlErrors({ errors }: FormControlErrorsProps) {
  if (!errors?.length) {
    return null;
  }
  return (
    <Text variant="caption" sx={{ color: "error.base.main", px: "#1" }}>
      {errors.join(", ")}
    </Text>
  );
}
