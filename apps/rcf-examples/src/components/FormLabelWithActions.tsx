import type { ComponentProps, ReactNode } from "react";
import { FormLabel, styled } from "@mui/material";

export function FormLabelWithActions({
  sx,
  children,
  actions,
  ...props
}: ComponentProps<typeof FormLabel> & { actions?: ReactNode }) {
  return (
    <FormLabel sx={{ ...sx, position: "relative" }} {...props}>
      {children}
      <DockedToTheRight>{actions}</DockedToTheRight>
    </FormLabel>
  );
}

const DockedToTheRight = styled("div")`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;
