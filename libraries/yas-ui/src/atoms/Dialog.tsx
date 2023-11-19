import { createImperative } from "react-imperative-hook";
import type { ComponentProps } from "react";
import { destructureVariantProps, styled } from "@yas/style";
import { dialogRecipe, overlayRecipe } from "./Dialog.css";
import { Paper } from "./Paper";

const Overlay = styled("div", overlayRecipe);
const DialogPaper = styled(Paper, dialogRecipe);
//.attrs({ as: "dialog" })
//.shouldForwardProp(({ isVariant, name }) => !isVariant || name === "open");

export function Dialog({
  onClose,
  ...allProps
}: ComponentProps<typeof DialogPaper> & { onClose?: () => void }) {
  const [variantProps, forwardedProps] = destructureVariantProps(
    allProps,
    dialogRecipe,
  );
  return (
    <>
      <Overlay {...variantProps} onClick={onClose} />
      <DialogPaper {...variantProps} {...forwardedProps} />
    </>
  );
}

export const {
  usePredefinedSpawner: useDialog,
  useInlineSpawner: useDialogs,
  Context: DialogContext,
  Outlet: DialogOutlet,
} = createImperative();
