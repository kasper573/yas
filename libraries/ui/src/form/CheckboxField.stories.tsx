import type { Meta, StoryObj } from "@yas/test/storybook";
import { withState } from "../hooks/withState";
import { CheckboxField } from "./CheckboxField";

export default {
  component: CheckboxField,
  decorators: [withState],
  tags: ["autodocs"],
} satisfies Meta<typeof CheckboxField>;

export const Default: StoryObj<typeof CheckboxField> = {
  args: {
    label: "CheckboxField",
  },
};
