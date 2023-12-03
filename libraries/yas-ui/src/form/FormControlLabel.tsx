import type { HTMLAttributes, ReactNode } from "react";
import { useId } from "react";
import { styled } from "@yas/style";
import { Text } from "../atoms/Text";

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
        <Text as="label" asProps={{ htmlFor: id }} {...rest} />
        {control?.(id)}
      </>
    );
  },
);
