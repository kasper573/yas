import type { ReactNode } from "react";
import { embedded } from "./Embedded.css";

export function Embedded({ children }: { children?: ReactNode }) {
  return <div className={embedded}>{children}</div>;
}
