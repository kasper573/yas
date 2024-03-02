import type { ImperativeComponentProps } from "react-async-modal-hook";
import { useLayoutEffect, type ComponentProps, useState } from "react";
import { styled } from "@yas/style";
import { Overlay } from "../components/Overlay";
import { useModalSustainer } from "../hooks/useModal";
import { clipperRecipe, drawerRecipe } from "./Drawer.css";

export interface DrawerProps<ResolutionValue = void>
  extends Omit<ComponentProps<typeof BaseDrawer>, "open" | "onClickAway">,
    ImperativeComponentProps<ResolutionValue | undefined> {}

export function Drawer<ResolutionValue>({
  instanceId,
  state,
  resolve,
  ...baseDrawerProps
}: DrawerProps<ResolutionValue>) {
  const [open, setOpen] = useState(false);
  const releaseDrawer = useModalSustainer({ instanceId });

  // Simple way to trigger css reflow.
  useLayoutEffect(() => {
    requestAnimationFrame(() => setOpen(state.type !== "resolved"));
  }, [state?.type]);

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
