import { useLayoutEffect, type ComponentProps, useState } from "react";
import { styled } from "@yas/style";
import type { ModalProps } from "../hooks/useModal";
import { useModalSustainer } from "../hooks/useModal";
import { Overlay } from "./Overlay";
import { clipperRecipe, drawerRecipe } from "./Drawer.css";

export interface DrawerProps<ResolutionValue = void>
  extends Omit<ComponentProps<typeof BaseDrawer>, "open" | "onClickAway">,
    ModalProps<ResolutionValue | undefined> {}

export function Drawer<ResolutionValue>({
  instanceId,
  open: inputOpen,
  resolve,
  ...baseDrawerProps
}: DrawerProps<ResolutionValue>) {
  const [open, setOpen] = useState(false);
  const releaseDrawer = useModalSustainer({ instanceId });

  // Simple way to trigger css reflow.
  useLayoutEffect(() => {
    requestAnimationFrame(() => setOpen(inputOpen));
  }, [inputOpen]);

  return (
    <BaseDrawer
      open={open}
      onTransitionEnd={!open ? releaseDrawer : undefined}
      onClickAway={() => resolve(undefined)}
      {...baseDrawerProps}
    />
  );
}

// The BaseDrawer represents the plain design,
// while the Drawer is its integration with react-async-modal-hook.

const Clipper = styled("div", clipperRecipe);
const DrawerPaper = styled("div", drawerRecipe);

export type BaseDrawerProps = ComponentProps<typeof DrawerPaper> & {
  onClickAway?: () => void;
};

export function BaseDrawer({
  open,
  onClickAway,
  ...paperProps
}: BaseDrawerProps) {
  return (
    <>
      <Overlay open={open} onClick={onClickAway} />
      <Clipper>
        <DrawerPaper open={open} {...paperProps} />
      </Clipper>
    </>
  );
}
