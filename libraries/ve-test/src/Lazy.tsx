import type { ReactNode } from "react";
import { lazy } from "./Lazy.css";

export function Lazy({ children }: { children?: ReactNode }) {
  return <div className={lazy}>{children}</div>;
}
