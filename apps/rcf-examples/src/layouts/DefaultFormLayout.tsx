import { Button, Stack } from "@mui/material";
import type { FormLayoutProps } from "react-composable-form";

export function DefaultFormLayout({ fields, handleSubmit }: FormLayoutProps) {
  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="column" gap={2}>
        {Object.values(fields).map((Component, index) => (
          <Component key={index} />
        ))}
      </Stack>
      <Button type="submit">Submit</Button>
    </form>
  );
}
