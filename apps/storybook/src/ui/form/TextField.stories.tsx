import type { Meta, StoryObj } from "@storybook/react";
import { TextField } from "@yas/ui";
import { withState } from "../withState";

export default {
  component: TextField,
  decorators: [withState],
} satisfies Meta<typeof TextField>;

export const Default: StoryObj<typeof TextField> = {
  args: {
    label: "TextField",
    inputProps: {
      placeholder: "Placeholder",
    },
  },
};

export const WithDefaultValue: StoryObj<typeof TextField> = {
  args: {
    value: "Default",
  },
};

export const WithError: StoryObj<typeof TextField> = {
  args: {
    error: "Something went wrong",
  },
};

export const Clearable: StoryObj<typeof TextField> = {
  args: {
    clearable: true,
  },
};

export const Loading: StoryObj<typeof TextField> = {
  args: {
    isLoading: true,
  },
};
