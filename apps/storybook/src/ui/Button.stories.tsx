import type { Meta, StoryObj } from "@storybook/react";
import { CheckIcon } from "@yas/icons";
import { Button } from "@yas/ui";

export default {
  component: Button,
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
