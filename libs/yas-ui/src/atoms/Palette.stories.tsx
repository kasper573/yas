import type { Meta, StoryObj } from "@storybook/react";
import { Palette } from "./Palette";

export default {
  title: "atoms/Palette",
  component: Palette,
  tags: ["autodocs"],
} satisfies Meta<typeof Palette>;

export const Default: StoryObj<Meta<typeof Palette>> = {};
