import { env } from "../env";

// Should have no runtime dependencies to be as resilient as possible

export function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error?: unknown;
  resetErrorBoundary?: () => void;
}) {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        <ErrorTitle />
      </h2>
      <ErrorDetails error={error} />
      {resetErrorBoundary ? (
        <div style={styles.buttons}>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      ) : null}
    </div>
  );
}

export function ErrorTitle() {
  return (
    <>
      <span role="img" aria-label="sad face">
        😢
      </span>{" "}
      Oops, something went wrong!
    </>
  );
}

export function ErrorDetails({ error }: { error: unknown }) {
  return (
    <>
      <p>We are sorry for the inconvenience. Please try again later.</p>
      {env.showErrorDetails ? (
        <details style={styles.details}>
          <summary style={styles.detailsSummary}>Error Details</summary>
          <pre style={styles.detailsContent}>{errorToString(error)}</pre>
        </details>
      ) : null}
    </>
  );
}

function errorToString(error: unknown) {
  if (error instanceof Error) {
    return error.stack ?? error.message;
  }
  return String(error);
}

const border = "1px solid #ccc";
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "40vh",
    width: "100%",
  },
  title: { margin: 0 },
  buttons: { display: "flex", flexDirection: "row", gap: 10 },
  details: {
    marginTop: 20,
    width: 500,
    overflow: "auto",
    border,
    borderRadius: 8,
  },
  detailsSummary: {
    padding: 12,
    cursor: "pointer",
  },
  detailsContent: {
    borderTop: border,
    padding: 12,
    margin: 0,
  },
} as const;
