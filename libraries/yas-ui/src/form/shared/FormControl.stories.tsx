import type { Meta, StoryObj } from "@storybook/react";
import * as components from "./FormControl";

export default {
  component: () => null,
  tags: ["autodocs"],
} satisfies Meta;

export const FormControlLabel: StoryObj<typeof components.FormControlLabel> = {
  render: (props) => <components.FormControlLabel {...props} />,
  args: {
    children: "FormControlLabel",
  },
};

export const FormControlErrors: StoryObj<typeof components.FormControlError> = {
  render: (props) => <components.FormControlError {...props} />,
  args: {
    error: ["Error 1", "Error 2"],
  },
};
