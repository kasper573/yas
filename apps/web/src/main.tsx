import * as React from "react";
import { createRoot } from "react-dom/client";
import { resetStyles } from "@yas/ui";
import { App } from "./App";

resetStyles();

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  document.writeln("Could not find root element");
}
