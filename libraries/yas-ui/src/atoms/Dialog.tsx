import { createImperative } from "react-imperative-hook";
import type { ComponentProps } from "react";
import { destructureVariantProps, styled } from "@yas/style";
import { dialogRecipe, overlayRecipe } from "./Dialog.css";

const Overlay = styled("div", overlayRecipe);
const Paper = styled("dialog", dialogRecipe).shouldForwardProp(
  ({ isVariant, name }) => !isVariant || name === "open",
);

export function Dialog({
  onClose,
  ...allProps
}: ComponentProps<typeof Paper> & { onClose?: () => void }) {
  const [variantProps, forwardedProps] = destructureVariantProps(
    allProps,
    dialogRecipe,
  );
  return (
    <>
      <Overlay {...variantProps} onClick={onClose} />
      <Paper {...variantProps} {...forwardedProps} />
    </>
  );
}

export const {
  usePredefinedSpawner: useDialog,
  useInlineSpawner: useDialogs,
  Context: DialogContext,
  Outlet: DialogOutlet,
} = createImperative();
