import { createRCF } from "react-composable-form";
import type { inferFieldProps, inferLayoutProps } from "react-composable-form";
import type { SxProps } from "@mui/material";

interface BaseFieldProps {
  size?: "small" | "medium";
  sx?: SxProps;
}

// The form factory is created with a generic type with the props that all field components must implement.
// If you have no props conventions you want to enforce, you don't have to use the generic type.
// This pattern is required for reliable type safety with a single source of truth.
export const createForm = createRCF<BaseFieldProps>();

export type FieldProps<Value> = inferFieldProps<typeof createForm, Value>;

export type FormLayoutProps = inferLayoutProps<typeof createForm>;
