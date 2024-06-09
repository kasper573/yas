import type { Meta, StoryObj } from "@yas/test/storybook";
import { Overlay } from "./Overlay";

export default {
  component: Overlay,
  tags: ["autodocs"],
} satisfies Meta<typeof Overlay>;

export const Default: StoryObj<typeof Overlay> = {};
