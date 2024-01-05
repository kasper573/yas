import { within, userEvent, waitFor } from "@storybook/testing-library";
import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentType } from "react";
import { useMemo } from "react";
import {
  ModalContext,
  ModalOutlet,
  ModalStore,
  useModal,
} from "../hooks/useModal";
import {
  Dialog as DialogImpl,
  DialogActions,
  DialogContent,
  DialogTitle,
  BaseDialog,
} from "./Dialog";
import { Button } from "./Button";
import { Text } from "./Text";

export default {
  title: "atoms/Dialog",
  component: () => null,
  tags: ["autodocs"],
} satisfies Meta;

export const OpenBaseDialog: StoryObj = {
  render: () => (
    // Since dialogs are rendered overlayed it has no inline size, so we need to
    // provide some minimum space for the docs preview in storybook to look good
    <div style={{ minWidth: 300, minHeight: 300 }}>
      <BaseDialog open>
        <DialogTitle>DialogTitle</DialogTitle>
        <DialogContent>
          <Text>DialogContent</Text>
        </DialogContent>
        <DialogActions>
          <Button>Action 1</Button>
          <Button variant="outlined">Action 2</Button>
        </DialogActions>
      </BaseDialog>
    </div>
  ),
};

export const CanSpawnDialog: StoryObj = {
  render: withModalContext(() => {
    const showDialog = useModal(DialogImpl);
    return (
      <button
        onClick={() =>
          showDialog({
            children: (
              <>
                <DialogTitle>DialogTitle</DialogTitle>
                <DialogContent>
                  <Text>DialogContent</Text>
                </DialogContent>
                <DialogActions>
                  <Button>Action 1</Button>
                  <Button variant="outlined">Action 2</Button>
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
  render: withModalContext(() => {
    const showDialog = useModal(({ resolve, ...props }) => (
      <DialogImpl {...props}>
        <DialogTitle>DialogTitle</DialogTitle>
        <DialogContent>
          <Text>DialogContent</Text>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => resolve()}>Close</Button>
          <Button variant="outlined">Action 2</Button>
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

function withModalContext<Props extends object>(
  Component: ComponentType<Props>,
) {
  return function WithDialogContext(props: Props) {
    const store = useMemo(() => new ModalStore(), []);
    return (
      <ModalContext.Provider value={store}>
        <Component {...props} />
        <ModalOutlet />
      </ModalContext.Provider>
    );
  };
}
