import type { FallbackProps } from "react-error-boundary";

// Should have no runtime dependencies to be as resilient as possible

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        <span role="img" aria-label="sad face">
          😢
        </span>{" "}
        Oops, something went wrong!
      </h2>
      <p>We are sorry for the inconvenience. Please try again later.</p>
      <div style={styles.buttons}>
        <button onClick={resetErrorBoundary}>Try again</button>
        <a href="/">Back to home page</a>
      </div>
      <details style={styles.details}>
        <summary style={styles.detailsSummary}>Error Details</summary>
        <pre style={styles.detailsContent}>{error.stack ?? error.message}</pre>
      </details>
    </div>
  );
}

const border = "1px solid #ccc";
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
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
