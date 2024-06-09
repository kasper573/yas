import type { Meta, StoryObj } from "@yas/test/storybook";
import { ThemeColors } from "./ThemeColors";

export default {
  component: ThemeColors,
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeColors>;

export const Default: StoryObj<Meta<typeof ThemeColors>> = {};
