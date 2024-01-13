import type { Meta, StoryObj } from "@storybook/react";
import * as components from "./FormControl";

export default {
  title: "form/FormControl",
  component: () => null,
  tags: ["autodocs"],
} satisfies Meta;

export const FormControlLabel: StoryObj<typeof components.FormControlLabel> = {
  render: (props) => <components.FormControlLabel {...props} />,
  args: {
    children: "FormControlLabel",
  },
};

export const FormControlErrors: StoryObj<typeof components.FormControlErrors> =
  {
    render: (props) => <components.FormControlErrors {...props} />,
    args: {
      errors: ["Error 1", "Error 2"],
    },
  };
