import type { Meta } from "@storybook/react";
import type { StrictStoryObj } from "../../.storybook/StrictStoryObj";
import { TextField } from "./TextField";
import { withState } from "./shared/withState";

export default {
  component: TextField,
  decorators: [withState],
  tags: ["autodocs"],
} satisfies Meta<typeof TextField>;

export const Default: StrictStoryObj<typeof TextField> = {
  args: {
    label: "TextField",
    inputProps: {
      placeholder: "Placeholder",
    },
  },
};

export const WithDefaultValue: StrictStoryObj<typeof TextField> = {
  args: {
    value: "Default",
  },
};

export const WithError: StrictStoryObj<typeof TextField> = {
  args: {
    error: "Something went wrong",
  },
};

export const Clearable: StrictStoryObj<typeof TextField> = {
  args: {
    clearable: true,
  },
};

export const Loading: StrictStoryObj<typeof TextField> = {
  args: {
    isLoading: true,
  },
};
