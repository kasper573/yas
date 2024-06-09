import type { Meta, StoryObj } from "@yas/test/storybook";
import { CheckIcon } from "@yas/icons";
import { Button } from "./Button";

export default {
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export const Default: StoryObj<Meta<typeof Button>> = {
  args: { children: "Click me" },
};

export const WithLeftIcon: StoryObj<Meta<typeof Button>> = {
  args: {
    children: (
      <>
        <CheckIcon />
        Click me
      </>
    ),
  },
};

export const WithRightIcon: StoryObj<Meta<typeof Button>> = {
  args: {
    children: (
      <>
        Click me
        <CheckIcon />
      </>
    ),
  },
};
