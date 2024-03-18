import type { Meta, StoryObj } from "@yas/storybook";
import { CheckboxField } from "./CheckboxField";
import { withState } from "./shared/withState";

export default {
  component: CheckboxField,
  decorators: [withState],
} satisfies Meta<typeof CheckboxField>;

export const Default: StoryObj<typeof CheckboxField> = {
  args: {
    label: "CheckboxField",
  },
};
