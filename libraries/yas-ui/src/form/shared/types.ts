import type { ReactNode } from "react";
import type { ConstrainedStyleWithoutConditions } from "@yas/style";
import type {
  FieldRendererBaseProps,
  OptionalFieldRendererProps,
  RequiredFieldRendererProps,
} from "hookform-controller-proxy";

interface BaseFieldProps extends FieldRendererBaseProps {
  isLoading?: boolean;
  label?: ReactNode;
  info?: ReactNode;
  size?: "small" | "medium";
  metrics?: Record<PropertyKey, number>;
  sx?: ConstrainedStyleWithoutConditions;
}

export type FieldProps<Value = unknown> =
  | RequiredFieldProps<Value>
  | OptionalFieldProps<Value>;

export interface RequiredFieldProps<Value>
  extends BaseFieldProps,
    RequiredFieldRendererProps<Value> {}

export interface OptionalFieldProps<Value>
  extends BaseFieldProps,
    OptionalFieldRendererProps<Value> {}
