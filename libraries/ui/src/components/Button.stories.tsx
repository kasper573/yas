import type { Meta, StoryObj } from "@yas/storybook";
import { Cross1Icon } from "@yas/icons";
import { Button } from "./Button";

export default {
  component: Button,
} satisfies Meta<typeof Button>;

export const Text: StoryObj<Meta<typeof Button>> = {
  args: { children: "Click me" },
};

export const Icon: StoryObj<Meta<typeof Button>> = {
  args: { icon: true, children: <Cross1Icon /> },
};
