import { createImperative } from "react-imperative-hook";
import type { ComponentProps } from "react";
import { destructureVariantProps, styled } from "@yas/css";
import { dialogRecipe, overlayRecipe } from "./Modal.css";

const Overlay = styled("div", overlayRecipe);
const Dialog = styled("dialog", dialogRecipe).forwardProps(
  ({ isVariant, name }) => !isVariant || name === "open",
);

export function Modal({
  onClose,
  ...allProps
}: ComponentProps<typeof Dialog> & { onClose?: () => void }) {
  const [variantProps, forwardedProps] = destructureVariantProps(
    allProps,
    dialogRecipe,
  );
  return (
    <>
      <Overlay {...variantProps} onClick={onClose} />
      <Dialog {...variantProps} {...forwardedProps} />
    </>
  );
}

export const {
  usePredefinedSpawner: useModal,
  useInlineSpawner: useModals,
  Context: ModalContext,
  Outlet: ModalOutlet,
} = createImperative();
