import { createRCF } from "react-composable-form";
import type { inferFieldProps, inferLayoutProps } from "react-composable-form";

export const createForm = createRCF();

export type FieldProps<Value> = inferFieldProps<typeof createForm, Value>;

export type FormLayoutProps = inferLayoutProps<typeof createForm>;
