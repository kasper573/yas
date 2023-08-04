import {
  Alert,
  Button,
  CircularProgress,
  Fade,
  Stack,
  Typography,
} from "@mui/material";
import type { ReactNode } from "react";
import type { FormLayoutProps } from "../rcf";

export function BasicFormLayout({
  title,
  fields,
  generalErrors,
  handleSubmit,
  isLoading,
}: FormLayoutProps & { title: ReactNode; isLoading?: boolean }) {
  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" sx={{ justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">{title}</Typography>
        <Stack direction="row" gap={2} alignItems="center">
          <Fade in={isLoading}>
            <CircularProgress size={24} />
          </Fade>
          <Button variant="outlined">Reset</Button>
          <Button disabled={isLoading} type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Stack>
      <Stack direction="column" gap={2}>
        {Object.values(fields).map((Component, index) => (
          <Component key={index} />
        ))}
      </Stack>
      {generalErrors.length > 0 && (
        <Alert color="error" sx={{ mt: 2 }}>
          {generalErrors.join(", ")}
        </Alert>
      )}
    </form>
  );
}
