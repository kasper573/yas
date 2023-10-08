import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";

export default {
  title: "Modal",
  component: Modal,
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export const Default: StoryObj<Meta<typeof Modal>> = {
  args: { children: "Hello World!" },
};
