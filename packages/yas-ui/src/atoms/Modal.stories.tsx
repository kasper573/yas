import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentType, ReactNode } from "react";
import { within } from "@storybook/testing-library";
import { useMemo } from "react";
import { ComponentStore } from "react-imperative-hook";
import type { ModalProps } from "./Modal";
import { Modal, ModalContext, ModalOutlet, useModal, useModals } from "./Modal";
import { Button } from "./Button";

const meta = {
  title: "Modal",
  component: Modal,
  tags: [],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PredefinedDialogWithBuiltinMessage: Story = {
  render: withSetup(() => {
    const alert = useModal(Dialog);
    return <button onClick={() => alert()}>Open dialog</button>;
  }),
  async play({ canvasElement }) {
    (await within(canvasElement).findByText("Open dialog")).click();
    const dialog = await within(canvasElement).findByRole("dialog");
    await within(dialog).findByText("Built-in message");
  },
};

export const PredefinedDialogWithDefaultMessage: Story = {
  render: withSetup(() => {
    const alert = useModal(Dialog, { message: "Default message" });
    return <button onClick={() => alert()}>Open dialog</button>;
  }),
  async play({ canvasElement }) {
    (await within(canvasElement).findByText("Open dialog")).click();
    const dialog = await within(canvasElement).findByRole("dialog");
    await within(dialog).findByText("Default message");
  },
};

export const PredefinedDialogWithCustomMessage: Story = {
  render: withSetup(() => {
    const alert = useModal(Dialog, { message: "Default message" });
    return (
      <button onClick={() => alert({ message: "Custom message" })}>
        Open dialog
      </button>
    );
  }),
  async play({ canvasElement }) {
    (await within(canvasElement).findByText("Open dialog")).click();
    const dialog = await within(canvasElement).findByRole("dialog");
    await within(dialog).findByText("Custom message");
  },
};

export const InlineDialogWithBuiltinMessage: Story = {
  render: withSetup(() => {
    const showModal = useModals();
    return <button onClick={() => showModal(Dialog)}>Open dialog</button>;
  }),
  async play({ canvasElement }) {
    (await within(canvasElement).findByText("Open dialog")).click();
    const dialog = await within(canvasElement).findByRole("dialog");
    await within(dialog).findByText("Built-in message");
  },
};

export const InlineDialogWithCustomMessage: Story = {
  render: withSetup(() => {
    const showModal = useModals();
    return (
      <button onClick={() => showModal(Dialog, { message: "Custom message" })}>
        Open dialog
      </button>
    );
  }),
  async play({ canvasElement }) {
    (await within(canvasElement).findByText("Open dialog")).click();
    const dialog = await within(canvasElement).findByRole("dialog");
    await within(dialog).findByText("Custom message");
  },
};

function Dialog({
  state,
  message = "Built-in message",
  resolve,
}: Omit<ModalProps, "children"> & { message: ReactNode }) {
  return (
    <Modal open={state.type === "pending"} onClose={() => resolve()}>
      <p>{message}</p>
      <Button onClick={() => resolve()}>OK</Button>
    </Modal>
  );
}

function withSetup(Content: ComponentType) {
  return function ModalApp() {
    const store = useMemo(() => new ComponentStore(), []);
    return (
      <ModalContext.Provider value={store}>
        <Content />
        <ModalOutlet />
      </ModalContext.Provider>
    );
  };
}
