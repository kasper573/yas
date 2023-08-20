import { createRoot } from "react-dom/client";
import { resetStyles } from "@yas/ui";
import { StrictMode } from "react";
import { App } from "./App";

resetStyles();

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
} else {
  document.writeln("Could not find root element");
}
