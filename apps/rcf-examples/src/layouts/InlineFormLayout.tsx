import { Button, Stack } from "@mui/material";
import type { FormLayoutProps } from "@yas/ui";

export function InlineFormLayout({ fields, handleSubmit }: FormLayoutProps) {
  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" gap={2}>
        {Object.values(fields).map((Component, index) => (
          <Component key={index} size="small" />
        ))}
        <Button type="submit" size="small" variant="contained">
          Submit
        </Button>
      </Stack>
    </form>
  );
}
