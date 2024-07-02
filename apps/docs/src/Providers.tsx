import { ModalStore, ModalContext, ModalOutlet } from "@yas/ui";
import type { ReactNode } from "react";
import { useMemo } from "react";

export function Providers({ children }: { children?: ReactNode }) {
  const modalStore = useMemo(() => new ModalStore(), []);
  return (
    <ModalContext.Provider value={modalStore}>
      {children}
      <ModalOutlet />
    </ModalContext.Provider>
  );
}
