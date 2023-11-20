import type { ImperativeComponentProps } from "react-imperative-hook";
import { createImperative } from "react-imperative-hook";
import { useLayoutEffect, type ComponentProps, useState } from "react";
import { styled } from "@yas/style";
import {
  dialogActionsRecipe,
  dialogContentRecipe,
  dialogRecipe,
  dialogTitleRecipe,
  overlayRecipe,
} from "./Dialog.css";
import { Paper } from "./Paper";
import { Text } from "./Text";

export interface DialogProps<ResolutionValue = void>
  extends Omit<ComponentProps<typeof BaseDialog>, "open" | "onClickAway">,
    ImperativeComponentProps<ResolutionValue | undefined> {}

export function Dialog<ResolutionValue>({
  instanceId,
  state,
  resolve,
  ...baseDialogProps
}: DialogProps<ResolutionValue>) {
  const [open, setOpen] = useState(false);
  const releaseDialog = useDialogSustainer({ instanceId });

  // Simple way to trigger css reflow.
  useLayoutEffect(() => {
    requestAnimationFrame(() => setOpen(state.type !== "resolved"));
  }, [state?.type]);

  return (
    <BaseDialog
      open={open}
      onTransitionEnd={!open ? releaseDialog : undefined}
      onClickAway={() => resolve(undefined)}
      {...baseDialogProps}
    />
  );
}

export const {
  useSpawnSustainer: useDialogSustainer,
  usePredefinedSpawner: useDialog,
  useInlineSpawner: useDialogs,
  Context: DialogContext,
  Outlet: DialogOutlet,
  Store: DialogStore,
} = createImperative();

// The BaseDialog represents the plain design,
// while the Dialog is its integration with react-imperative-hook.

const Overlay = styled("div", overlayRecipe);
const DialogPaper = styled(Paper, dialogRecipe).attrs({
  as: "dialog",
});

export const DialogTitle = styled(Text, dialogTitleRecipe).attrs({
  variant: "h2",
});
export const DialogContent = styled("div", dialogContentRecipe);
export const DialogActions = styled("div", dialogActionsRecipe);

function BaseDialog({
  open,
  onClickAway,
  ...paperProps
}: ComponentProps<typeof DialogPaper> & { onClickAway?: () => void }) {
  return (
    <>
      <Overlay open={open} onClick={onClickAway} />
      <DialogPaper open={open} {...paperProps} />
    </>
  );
}
