import type { ImperativeComponentProps } from "react-async-modal-hook";
import { useLayoutEffect, type ComponentProps, useState } from "react";
import { styled } from "@yas/style";

import { Paper } from "../components/Paper";
import { Text } from "../components/Text";
import { Overlay } from "../components/Overlay";
import { useModalSustainer } from "../hooks/useModal";
import {
  dialogActionsRecipe,
  dialogContentRecipe,
  dialogRecipe,
  dialogTitleRecipe,
} from "./Dialog.css";

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
  const releaseDialog = useModalSustainer({ instanceId });

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

// The BaseDialog represents the plain design,
// while the Dialog is its integration with react-async-modal-hook.

const DialogPaper = styled(Paper, dialogRecipe).attrs({
  role: "dialog",
});

export const DialogTitle = styled(Text, dialogTitleRecipe).attrs({
  variant: "h2",
});
export const DialogContent = styled("div", dialogContentRecipe);
export const DialogActions = styled("div", dialogActionsRecipe);

export function BaseDialog({
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
