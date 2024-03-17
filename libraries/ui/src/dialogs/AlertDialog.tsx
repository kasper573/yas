import type { ReactNode } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  type DialogProps,
} from "../molecules/Dialog";
import { Button } from "../components/Button";

export interface AlertDialogProps extends Omit<DialogProps, "title"> {
  title: ReactNode;
  message: ReactNode;
}

export function AlertDialog({ title, message, ...props }: AlertDialogProps) {
  const { resolve } = props;
  return (
    <Dialog {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button onClick={() => resolve(undefined)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
