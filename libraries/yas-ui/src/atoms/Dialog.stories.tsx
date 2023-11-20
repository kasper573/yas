import { within, userEvent, waitFor } from "@storybook/testing-library";
import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps, ComponentType } from "react";
import { useMemo } from "react";
import {
  Dialog as DialogImpl,
  DialogActions,
  DialogContent,
  DialogContext,
  DialogOutlet,
  DialogStore,
  DialogTitle,
  useDialog,
} from "./Dialog";
import { Button } from "./Button";
import { Text } from "./Text";

export default {
  title: "atoms/Dialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof DialogImpl>;

export const Default: StoryObj<Meta<typeof DialogImpl>> = {
  args: {
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
    state: { type: "pending" },
    resolve: () => {},
  },
};

export const CanSpawn: StoryObj<Meta<typeof DialogImpl>> = {
  render: withDialogContext(() => {
    const showDialog = useDialog(DialogImpl);
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

export const CanClose: StoryObj<Meta<typeof DialogImpl>> = {
  render: withDialogContext(() => {
    const showDialog = useDialog(({ resolve, ...props }) => (
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
    await CanSpawn.play?.(context);
    await userEvent.click(canvas.getByRole("button", { name: "Close" }));
    await waitFor(function notPresent() {
      return !canvas.queryByRole("dialog");
    });
  },
};

function withDialogContext<Props extends object>(
  Component: ComponentType<Props>,
) {
  return function WithDialogContext(props: Props) {
    const store = useMemo(() => new DialogStore(), []);
    return (
      <DialogContext.Provider value={store}>
        <Component {...props} />
        <DialogOutlet />
      </DialogContext.Provider>
    );
  };
}

// Since dialogs are rendered overlayed it has no inline size, so we need to
// provide some minimum space for the docs preview in storybook to look good
function Dialog(props: ComponentProps<typeof DialogImpl>) {
  return (
    <div style={{ minWidth: 300, minHeight: 300 }}>
      <DialogImpl {...props} />
    </div>
  );
}
