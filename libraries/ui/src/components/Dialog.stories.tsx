import { within, userEvent, waitFor } from "@yas/test/storybook";
import type { Meta, StoryObj } from "@yas/test/storybook";
import type { ComponentType } from "react";
import { styled } from "@yas/style";
import { useModal } from "../hooks/useModal";
import {
  Dialog as DialogImpl,
  DialogActions,
  DialogContent,
  DialogTitle,
  BaseDialog,
} from "./Dialog";

export default {
  component: () => null,
  tags: ["autodocs"],
} satisfies Meta;

export const OpenBaseDialog: StoryObj = {
  render: () => (
    <FixedSizeContainer>
      <BaseDialog open>
        <DialogTitle>DialogTitle</DialogTitle>
        <DialogContent>DialogContent</DialogContent>
        <DialogActions>
          <button>Action 1</button>
          <button>Action 2</button>
        </DialogActions>
      </BaseDialog>
    </FixedSizeContainer>
  ),
};

export const CanSpawnDialog: StoryObj = {
  render: withFixedSize(() => {
    const showDialog = useModal(DialogImpl);
    return (
      <button
        onClick={() =>
          showDialog({
            children: (
              <>
                <DialogTitle>DialogTitle</DialogTitle>
                <DialogContent>DialogContent</DialogContent>
                <DialogActions>
                  <button>Action 1</button>
                  <button>Action 2</button>
                </DialogActions>
              </>
            ),
          })
        }
      >
        Spawn dialog
      </button>
    );
  }),

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(await canvas.findByText("Spawn dialog"));
    const dialog = canvas.getByRole("dialog");
    await waitFor(function notAnimating() {
      return !dialog.getAnimations().length;
    });
  },
};

export const CanCloseSpawnedDialog: StoryObj = {
  render: withFixedSize(() => {
    const showDialog = useModal(({ resolve, ...props }) => (
      <DialogImpl {...props}>
        <DialogTitle>DialogTitle</DialogTitle>
        <DialogContent>DialogContent</DialogContent>
        <DialogActions>
          <button onClick={() => resolve()}>Close</button>
          <button>Action 2</button>
        </DialogActions>
      </DialogImpl>
    ));
    return <button onClick={() => showDialog()}>Spawn dialog</button>;
  }),

  play: async (context) => {
    const canvas = within(context.canvasElement);
    await CanSpawnDialog.play?.(context);
    await userEvent.click(canvas.getByRole("button", { name: "Close" }));
    await waitFor(function notPresent() {
      return !canvas.queryByRole("dialog");
    });
  },
};

function withFixedSize<Props extends object>(Component: ComponentType<Props>) {
  return function Container(props: Props) {
    return (
      <FixedSizeContainer>
        <Component {...props} />
      </FixedSizeContainer>
    );
  };
}

// Since dialogs are rendered overlayed it has no inline size, so we need to
// provide some minimum space for the docs preview in storybook to look good
const FixedSizeContainer = styled("div").attrs({
  style: {
    width: 300,
    height: 300,
  },
});
