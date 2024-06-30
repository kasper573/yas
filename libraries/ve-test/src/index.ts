import { lazy } from "react";

export * from "./Embedded";
export const Lazy = lazy(() =>
  import("./Lazy").then((m) => ({ default: m.Lazy })),
);
