import type { Meta, StoryObj } from "@yas/test/storybook";
import { ColorSets } from "./ColorSets";

export default {
  component: ColorSets,
  tags: ["autodocs"],
} satisfies Meta<typeof ColorSets>;

export const Default: StoryObj<Meta<typeof ColorSets>> = {};
