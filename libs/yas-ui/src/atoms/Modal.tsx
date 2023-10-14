import { createImperative } from "react-imperative-hook";
import type { ComponentProps } from "react";
import { styled } from "@yas/css";
import { dialogRecipe, overlayRecipe } from "./Modal.css";

const Overlay = styled("div", overlayRecipe);
const Dialog = styled("dialog", dialogRecipe);

export function Modal({
  onClose,
  open,
  ...remainingProps
}: ComponentProps<typeof Dialog> & { onClose?: () => void }) {
  return (
    <>
      <Overlay open={open} onClick={onClose} />
      <Dialog open={open} {...remainingProps} />
    </>
  );
}

export const {
  usePredefinedSpawner: useModal,
  useInlineSpawner: useModals,
  Context: ModalContext,
  Outlet: ModalOutlet,
} = createImperative();
