import { createContext } from "react";
import type { FormStore } from "./FormStore";

export const FormContext = createContext<FormStore<any>>(
  new Proxy({} as FormStore<any>, {
    get() {
      throw new Error("FormContext not initialized");
    },
  }),
);
