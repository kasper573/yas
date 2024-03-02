import { createContext } from "react";
import type { ModalStore } from "./ModalStore";

export const ModalContext = createContext(
  new Proxy({} as ModalStore, {
    get() {
      throw new Error("You must define a ModalContext.Provider");
    },
  }),
);
