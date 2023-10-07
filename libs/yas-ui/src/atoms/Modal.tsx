import { createImperative } from "react-imperative-hook";
import type { ComponentProps } from "react";
import { styled, destructureVariantProps } from "@yas/css";
import { dialogRecipe, overlayRecipe } from "./Modal.css";

const Overlay = styled("div", overlayRecipe);
const Dialog = styled("dialog", dialogRecipe);

export function Modal({
  onClose,
  ...dialogProps
}: ComponentProps<typeof Dialog> & { onClose?: () => void }) {
  const [variantProps, remainingProps] = destructureVariantProps(
    dialogProps,
    dialogRecipe,
  );
  return (
    <>
      <Overlay {...variantProps} onClick={onClose} />
      <Dialog {...variantProps} {...remainingProps} />
    </>
  );
}

export const {
  usePredefinedSpawner: useModal,
  useInlineSpawner: useModals,
  Context: ModalContext,
  Outlet: ModalOutlet,
} = createImperative();
