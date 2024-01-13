import type { Meta, StoryObj } from "@storybook/react";
import { ColorSets } from "./ColorSets";

export default {
  component: ColorSets,
  tags: ["autodocs"],
} satisfies Meta<typeof ColorSets>;

export const Default: StoryObj<Meta<typeof ColorSets>> = {};
