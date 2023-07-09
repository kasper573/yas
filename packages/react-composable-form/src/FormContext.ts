import { createContext } from "react";
import type { AnyZodObject } from "zod";
import type { FormStore } from "./types";

export const FormContext = createContext<FormStore<AnyZodObject>>(
  new Proxy({} as FormStore<AnyZodObject>, {
    get() {
      throw new Error("FormContext not initialized");
    },
  }),
);
