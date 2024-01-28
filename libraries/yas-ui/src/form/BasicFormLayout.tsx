import type { ReactNode } from "react";
import { Alert } from "../components/Alert";
import { Stack } from "../layout/Stack";
import { Button } from "../components/Button";
import { Text } from "../components/Text";
import { CircularProgress } from "../components/CircularProgress";

export function BasicFormLayout({
  title,
  children,
  generalErrors,
  handleSubmit,
  reset,
  isLoading,
}: {
  reset?: () => void;
  children?: ReactNode;
  generalErrors?: string[];
  handleSubmit?: () => void;
  title: ReactNode;
  isLoading?: boolean;
}) {
  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="#2">
        <Stack direction="row" align="center" gap="#2">
          <Text variant="h2">{title}</Text>
          {isLoading ? <CircularProgress /> : null}
          <Button variant="outlined" onClick={reset}>
            Reset
          </Button>
          <Button disabled={isLoading} type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
        <Stack direction="column" gap="#2">
          {children}
        </Stack>
        {!!generalErrors?.length && (
          <Alert color="error">
            <Text>{generalErrors?.join(", ")}</Text>
          </Alert>
        )}
      </Stack>
    </form>
  );
}
