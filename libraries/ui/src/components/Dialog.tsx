import { useLayoutEffect, type ComponentProps, useState } from "react";
import { styled } from "@yas/style";

import type { ModalProps } from "../hooks/useModal";
import { useModalSustainer } from "../hooks/useModal";
import { Paper } from "./Paper";
import { Text } from "./Text";
import { Overlay } from "./Overlay";
import {
  dialogActions,
  dialogContent,
  dialogRecipe,
  dialogTitle,
} from "./Dialog.css";

export interface DialogProps<ResolutionValue = void>
  extends Omit<ComponentProps<typeof BaseDialog>, "open" | "onClickAway">,
    ModalProps<ResolutionValue | undefined> {}

export function Dialog<ResolutionValue>({
  instanceId,
  open: inputOpen,
  resolve,
  ...baseDialogProps
}: DialogProps<ResolutionValue>) {
  const [open, setOpen] = useState(false);
  const releaseDialog = useModalSustainer({ instanceId });

  // Simple way to trigger css reflow.
  useLayoutEffect(() => {
    requestAnimationFrame(() => setOpen(inputOpen));
  }, [inputOpen]);

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

export const DialogTitle = styled(Text, dialogTitle).attrs({
  intent: "h2",
});
export const DialogContent = styled("div", dialogContent);
export const DialogActions = styled("div", dialogActions);

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
