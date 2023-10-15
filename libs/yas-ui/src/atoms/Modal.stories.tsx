import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { useState } from "react";
import { Modal } from "./Modal";

export default {
  title: "atoms/Modal",
  component: Modal,
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export const Default: StoryObj<Meta<typeof Modal>> = {
  args: { children: "Hello World!", open: true },
};

export const CanOnlySeeContentWhenOpen: StoryObj<Meta<typeof Modal>> = {
  args: { children: "Hello World!" },
  render() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Modal open={open}>Hello World</Modal>
        <button onClick={() => setOpen(true)}>Show</button>
      </>
    );
  },
  async play({ canvasElement }) {
    const canvas = within(canvasElement);
    expect(canvas.getByText("Hello World")).not.toBeVisible();
    await userEvent.click(canvas.getByRole("button"));
    expect(canvas.getByText("Hello World")).toBeVisible();
  },
};
