import type { ComponentType, ReactNode } from "react";
import { render as renderReact } from "@testing-library/react";

export function setupTest() {
  function render(Content: ComponentType) {
    function Wrapper({ children }: { children?: ReactNode }) {
      return <>{children}</>;
    }

    return renderReact(<Content />, { wrapper: Wrapper });
  }

  return { render };
}
