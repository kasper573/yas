import { Button, Stack, Typography } from "@mui/material";
import type { FormLayoutProps } from "react-composable-form";
import type { ReactNode } from "react";

export function DefaultFormLayout({
  title,
  fields,
  handleSubmit,
}: FormLayoutProps & { title: ReactNode }) {
  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" sx={{ justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">{title}</Typography>
        <Stack direction="row" gap={2}>
          <Button variant="outlined">Reset</Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Stack>
      <Stack direction="column" gap={2}>
        {Object.values(fields).map((Component, index) => (
          <Component key={index} />
        ))}
      </Stack>
    </form>
  );
}
