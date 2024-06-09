import { styled } from "@yas/style";
import type { ComponentProps } from "react";
import { Text } from "../../components/Text";

export type FormControlProps = ComponentProps<typeof FormControl>;
export const FormControl = styled("div");

export type FormControlLabelProps = ComponentProps<typeof Text> & {
  htmlFor?: string;
};

export function FormControlLabel({
  children,
  ...props
}: FormControlLabelProps) {
  if (children === null || children === undefined) {
    return null;
  }
  return (
    <Text asChild {...props}>
      <label>{children}</label>
    </Text>
  );
}

export type FormControlErrorProps = { error?: string };
export function FormControlError({ error }: FormControlErrorProps) {
  if (error === undefined) {
    return null;
  }
  return (
    <Text intent="caption" sx={{ color: "error.base", px: "s" }}>
      {error}
    </Text>
  );
}
