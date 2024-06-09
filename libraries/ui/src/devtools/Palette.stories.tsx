import type { Meta, StoryObj } from "@yas/test/storybook";
import { Palette } from "./Palette";

export default {
  component: Palette,
  tags: ["autodocs"],
} satisfies Meta<typeof Palette>;

export const Default: StoryObj<Meta<typeof Palette>> = {};
