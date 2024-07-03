import type { Meta, StoryObj } from "@storybook/react";
import * as components from "@yas/ui";

export default {
  component: () => null,
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
    error: "Error",
  },
};
