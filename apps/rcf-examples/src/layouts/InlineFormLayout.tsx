import { Button, Stack } from "@mui/material";
import type { FormLayoutProps } from "react-composable-form";

export function InlineFormLayout({ fields, handleSubmit }: FormLayoutProps) {
  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" gap={2}>
        {Object.values(fields).map((Component, index) => (
          <Component key={index} />
        ))}
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Stack>
    </form>
  );
}
