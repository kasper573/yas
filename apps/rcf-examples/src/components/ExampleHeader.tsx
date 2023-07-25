import { Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

export interface ExampleHeaderProps {
  title: ReactNode;
  children?: ReactNode;
}

export function ExampleHeader({ title, children }: ExampleHeaderProps) {
  return (
    <Stack direction="row" sx={{ justifyContent: "space-between", mb: 3 }}>
      <Typography variant="h4">{title}</Typography>
      <Stack direction="row" gap={2}>
        {children}
      </Stack>
    </Stack>
  );
}
