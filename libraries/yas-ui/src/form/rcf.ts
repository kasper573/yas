import { createRCF } from "react-composable-form";
import type { inferFieldProps, inferLayoutProps } from "react-composable-form";
import type { ReactNode } from "react";
import type { ConstrainedStyleWithoutConditions } from "@yas/style";

interface SharedFieldProps {
  isLoading?: boolean;
  label?: ReactNode;
  info?: ReactNode;
  metrics?: Map<unknown, number>;
  sx?: ConstrainedStyleWithoutConditions;
}

export const createForm = createRCF<SharedFieldProps>();

export type FieldProps<Value> = inferFieldProps<typeof createForm, Value>;

export type FormLayoutProps = inferLayoutProps<typeof createForm>;
