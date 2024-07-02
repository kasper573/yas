import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { dark } from "@yas/style/themes/dark.css";
import { App } from "./App";
import "./style.css";

document.documentElement.classList.add(dark);

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
