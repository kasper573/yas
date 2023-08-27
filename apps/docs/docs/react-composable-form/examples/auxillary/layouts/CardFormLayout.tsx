import type { FormLayoutProps } from "../rcf";
import { Alert } from "../components/Alert";
import { Stack } from "../components/Stack";

export function CardFormLayout({
  fields,
  generalErrors,
  handleSubmit,
  reset,
  isLoading,
}: FormLayoutProps & { isLoading?: boolean }) {
  return (
    <form className="card" onSubmit={handleSubmit}>
      <Stack className="card__body">
        {Object.values(fields).map((Component, index) => (
          <Component key={index} />
        ))}
        {generalErrors.length > 0 && (
          <Alert variant="danger" className="card__footer">
            {generalErrors.join(", ")}
          </Alert>
        )}
      </Stack>
      <Stack className="card__footer" direction="row">
        <span style={{ flex: 1 }}>{isLoading && <>Loading...</>}</span>
        <button className="button button--secondary" onClick={reset}>
          Reset
        </button>
        <button className="button button--primary" disabled={isLoading}>
          Submit
        </button>
      </Stack>
    </form>
  );
}
