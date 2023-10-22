import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";

export default {
  title: "atoms/Modal",
  component: Modal,
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export const Open: StoryObj<Meta<typeof Modal>> = {
  args: { children: "Hello World!", open: true },
};

export const Closed: StoryObj<Meta<typeof Modal>> = {
  args: { children: "Hello World!", open: true },
};
