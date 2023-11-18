import type { HTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import { styled } from "@yas/style";

export type ControlFactory = (labelId: string) => ReactNode;

export interface FormControlLabelProps
  extends Omit<HTMLAttributes<HTMLLabelElement>, "children"> {
  control?: ControlFactory;
}

export const FormControlLabel = styled(
  ({ control, ...rest }: FormControlLabelProps) => {
    const id = useId();
    return (
      <>
        <label htmlFor={id} {...rest} />
        {control?.(id)}
      </>
    );
  },
);
