import type { Meta, StoryObj } from "@yas/test/storybook";
import { withState } from "../hooks/withState";
import { TextField } from "./TextField";

export default {
  component: TextField,
  decorators: [withState],
  tags: ["autodocs"],
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
