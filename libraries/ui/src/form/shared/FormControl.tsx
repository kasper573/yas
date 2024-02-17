import { styled } from "@yas/style";
import type { ComponentProps } from "react";
import { Text } from "../../components/Text";

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

export type FormControlErrorProps = { error?: string };
export function FormControlError({ error }: FormControlErrorProps) {
  if (error === undefined) {
    return null;
  }
  return (
    <Text variant="caption" sx={{ color: "error.base.main", px: "#1" }}>
      {error}
    </Text>
  );
}
