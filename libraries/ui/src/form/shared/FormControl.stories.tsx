import type { Meta, StoryObj } from "@yas/storybook";
import * as components from "./FormControl";

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
