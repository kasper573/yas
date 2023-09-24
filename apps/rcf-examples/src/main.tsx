import { createRoot } from "react-dom/client";
import { StrictMode } from "react";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <div>Hello World</div>
  </StrictMode>,
);
