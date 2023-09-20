import { createImperative } from "react-imperative-hook";
import type { ComponentProps } from "react";
import { styled } from "../styling/css";
import { dialogRecipe, overlayRecipe } from "./Modal.css";

const Overlay = styled("div", overlayRecipe);
const Dialog = styled("dialog", dialogRecipe);

export function Modal({
  onClose,
  variants,
  ...dialogProps
}: ComponentProps<typeof Dialog> & { onClose?: () => void }) {
  return (
    <>
      <Overlay variants={variants} onClick={onClose} />
      <Dialog variants={variants} {...dialogProps} />
    </>
  );
}

export const {
  usePredefinedSpawner: useModal,
  useInlineSpawner: useModals,
  Context: ModalContext,
  Outlet: ModalOutlet,
} = createImperative();
