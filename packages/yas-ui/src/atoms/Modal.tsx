import { styled } from "@stitches/react";
import type { ComponentProps, ReactNode } from "react";
import type { ImperativeComponentProps } from "react-imperative-hook";
import { createImperative } from "react-imperative-hook";

export type ModalProps<Output = void> = ImperativeComponentProps<Output> & {
  children?: ReactNode;
};

export function Modal({
  open,
  children,
  onClose,
}: ComponentProps<typeof Dialog> & { onClose?: () => void }) {
  return (
    <>
      <Overlay open={open} onClick={onClose} />
      <Dialog role="dialog" open={open}>
        {children}
      </Dialog>
    </>
  );
}

export const {
  useInstanceSpawner: useModal,
  useComponentSpawner: useModals,
  Context: ModalContext,
  Outlet: ModalOutlet,
} = createImperative();

const Overlay = styled("div", {
  backgroundColor: "hsl(0 0% 0% / 0.5)",
  position: "fixed",
  inset: 0,
  transition: "opacity 150ms cubic-bezier(0.16, 1, 0.3, 1)",
  variants: {
    open: {
      true: { opacity: 1, pointerEvents: "auto" },
      false: { opacity: 0, pointerEvents: "none" },
    },
  },
});

const Dialog = styled("div", {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "450px",
  maxHeight: "85vh",
  padding: 25,
  transition: "opacity 150ms cubic-bezier(0.16, 1, 0.3, 1)",
  "&:focus": { outline: "none" },
  variants: {
    open: {
      true: { opacity: 1 },
      false: { display: 0 },
    },
  },
  defaultVariants: {
    open: false,
  },
});
