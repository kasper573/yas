import { createRoot } from "react-dom/client";
import { StrictMode, Suspense, lazy } from "react";
const App = lazy(() => import("./App"));

const rootElement = document.getElementById("root");
if (rootElement && window.location.hash !== "#no-render") {
  createRoot(rootElement).render(
    <StrictMode>
      <Suspense fallback={<RootSuspenseFallback />}>
        <App />
      </Suspense>
    </StrictMode>,
  );
} else {
  document.writeln("Could not find root element");
}

// Should have no dependencies to ensure main loads quickly.
function RootSuspenseFallback() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="root-suspense-fallback"
    >
      <path
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity=".25"
      />
      <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z" />
    </svg>
  );
}
