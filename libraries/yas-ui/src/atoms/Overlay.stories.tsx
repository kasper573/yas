import type { Meta, StoryObj } from "@storybook/react";
import { Overlay } from "./Overlay";

export default {
  title: "atoms/Overlay",
  component: Overlay,
  tags: ["autodocs"],
} satisfies Meta<typeof Overlay>;

export const Default: StoryObj<typeof Overlay> = {};
