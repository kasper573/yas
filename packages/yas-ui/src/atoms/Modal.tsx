import { createImperative } from "react-imperative-hook";
import type { ComponentProps } from "react";
import { styled, variantProps } from "@yas/css";
import { dialogRecipe, overlayRecipe } from "./Modal.css";

const Overlay = styled("div", overlayRecipe);
const Dialog = styled("dialog", dialogRecipe);

export function Modal({
  onClose,
  ...dialogProps
}: ComponentProps<typeof Dialog> & { onClose?: () => void }) {
  return (
    <>
      <Overlay {...variantProps(dialogProps, dialogRecipe)} onClick={onClose} />
      <Dialog {...dialogProps} />
    </>
  );
}

export const {
  usePredefinedSpawner: useModal,
  useInlineSpawner: useModals,
  Context: ModalContext,
  Outlet: ModalOutlet,
} = createImperative();
