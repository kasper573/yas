import { createContext } from "react";
import type { FormStore } from "./types/commonTypes";

export const FormContext = createContext<FormStore>(
  new Proxy({} as FormStore, {
    get() {
      throw new Error("FormContext not initialized");
    },
  }),
);
