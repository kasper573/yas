import { render as originalRender } from "@testing-library/react";
import { StrictMode } from "react";

export function silenceErrorLogs() {
  const original = console.error;
  console.error = () => {};
  return () => {
    console.error = original;
  };
}

export function render(element: JSX.Element) {
  return originalRender(<StrictMode>{element}</StrictMode>);
}
