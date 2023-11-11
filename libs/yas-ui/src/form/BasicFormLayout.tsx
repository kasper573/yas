import type { ReactNode } from "react";
import { Alert } from "../atoms/Alert";
import { Stack } from "../layout/Stack";
import { Button } from "../atoms/Button";
import { Text } from "../atoms/Text";
import { CircularProgress } from "../atoms/CircularProgress";
import type { FormLayoutProps } from "./rcf";

export function BasicFormLayout({
  title,
  fields,
  generalErrors,
  handleSubmit,
  reset,
  isLoading,
}: FormLayoutProps & { title: ReactNode; isLoading?: boolean }) {
  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={2}>
        <Stack direction="row" align="center" gap={2}>
          <Text variant="h2">{title}</Text>
          <Stack direction="row" gap={2} align="center">
            {isLoading && <CircularProgress />}
            <Button variant="outlined" onClick={reset}>
              Reset
            </Button>
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
          <Alert color="error">{generalErrors.join(", ")}</Alert>
        )}
      </Stack>
    </form>
  );
}
