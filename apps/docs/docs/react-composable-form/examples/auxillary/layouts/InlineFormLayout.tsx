import type { FormLayoutProps } from "../rcf";
import { Alert } from "../components/Alert";
import { Stack } from "../components/Stack";

export function InlineFormLayout({
  fields,
  generalErrors,
  handleSubmit,
}: FormLayoutProps) {
  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" align="end">
        {Object.values(fields).map((Component, index) => (
          <Component key={index} />
        ))}
        <div>
          <button className="button button--primary" type="submit">
            Submit
          </button>
        </div>
      </Stack>
      {generalErrors.length > 0 && (
        <Alert variant="danger">{generalErrors.join(", ")}</Alert>
      )}
    </form>
  );
}
