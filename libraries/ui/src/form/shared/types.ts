import type { ReactNode } from "react";
import type { Atoms } from "@yas/style";
import type {
  OptionalFieldProps as OptionalFieldPropsImpl,
  RequiredFieldProps as RequiredFieldPropsImpl,
} from "hookform-controller-proxy";

interface CustomFieldProps {
  isLoading?: boolean;
  label?: ReactNode;
  info?: ReactNode;
  size?: "small" | "medium";
  metrics?: Record<PropertyKey, number>;
  sx?: Atoms;
}

export type FieldProps<Value = unknown> =
  | RequiredFieldProps<Value>
  | OptionalFieldProps<Value>;

export interface RequiredFieldProps<Value>
  extends RequiredFieldPropsImpl<Value>,
    CustomFieldProps {}

export interface OptionalFieldProps<Value>
  extends OptionalFieldPropsImpl<Value>,
    CustomFieldProps {}
