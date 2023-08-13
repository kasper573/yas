import type { ComponentProps } from "react";
import { Children, Fragment } from "react";
import { Divider, Stack } from "@mui/material";

export function FieldGroup({
  children,
  ...props
}: ComponentProps<typeof Stack>) {
  return (
    <Stack spacing={2} {...props}>
      {Children.map(children, (child, index) => (
        <Fragment key={index}>
          {index > 0 && <Divider />}
          {child}
        </Fragment>
      ))}
    </Stack>
  );
}
