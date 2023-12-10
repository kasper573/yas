import { styled } from "@yas/style";
import type { ComponentProps } from "react";
import { Text } from "../atoms/Text";

export type FormControlProps = ComponentProps<typeof FormControl>;
export const FormControl = styled("div");

export type FormControlLabelProps = ComponentProps<typeof Text> & {
  htmlFor?: string;
};

export function FormControlLabel({
  htmlFor,
  children,
  ...props
}: FormControlLabelProps) {
  if (children === null || children === undefined) {
    return null;
  }
  return (
    <Text as="label" asProps={{ htmlFor }} {...props}>
      {children}
    </Text>
  );
}

export type FormControlErrorsProps = { errors?: unknown[] };
export function FormControlErrors({ errors }: FormControlErrorsProps) {
  if (!errors?.length) {
    return null;
  }
  return (
    <Text variant="caption" sx={{ color: "error.main", px: "#1" }}>
      {errors.join(", ")}
    </Text>
  );
}
